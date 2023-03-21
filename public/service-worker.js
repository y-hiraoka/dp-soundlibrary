// @ts-check
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
// @ts-expect-error JavaScript 許さない
const selfScope = self;

selfScope.navigator.onLine;

const CACHE_KEYS = {
  sounds: `sounds-v1`,
  resources: `resources-v1`,
};

selfScope.addEventListener("install", (event) => {
  console.log("Service Worker installed.");

  const promises = Promise.all([
    selfScope.skipWaiting(),
    caches
      .open(CACHE_KEYS.resources)
      .then((cache) => cache.addAll(["/", "/about", "/favorites"])),
  ]);

  event.waitUntil(promises);
});

selfScope.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");

  const promises = Promise.all([
    selfScope.clients.claim(),
    // 使わなくなったキャッシュを削除する
    caches
      .keys()
      .then((cacheNames) =>
        cacheNames.filter((key) => !Object.values(CACHE_KEYS).includes(key))
      )
      .then((unusedCacheKeys) =>
        Promise.all(unusedCacheKeys.map((key) => caches.delete(key)))
      ),
  ]);

  event.waitUntil(promises);
});

// リクエストに応じてキャッシュを返す
selfScope.addEventListener("fetch", (event) => {
  // /sounds/以下のリクエストに対してはキャッシュから取得する
  if (event.request.url.startsWith(self.location.origin + "/sounds/")) {
    event.respondWith(
      caches.open(CACHE_KEYS.sounds).then(async (cache) => {
        const cached = await cache.match(event.request);

        if (cached) {
          return cached;
        }

        const response = await fetch(event.request.clone());
        if (response.ok) {
          cache.put(event.request, response.clone());
        }
        return response;
      })
    );
    return;
  }

  const requestURL = new URL(event.request.url);

  if (requestURL.origin === selfScope.location.origin) {
    event.respondWith(
      caches.open(CACHE_KEYS.resources).then(async (cache) => {
        if (navigator.onLine) {
          // オンライン中は常に最新のレスポンスをキャッシュに格納しておく
          const response = await fetch(event.request.clone());
          cache.put(event.request, response.clone());
          return response;
        } else {
          // オフライン中はキャッシュを探して、なければ諦める
          const cachedResponse = await cache.match(event.request);
          return cachedResponse ?? fetch(event.request);
        }
      })
    );
    return;
  }

  // その他のリクエストに対しては通常通りネットワークから取得する
  event.respondWith(fetch(event.request));
});
