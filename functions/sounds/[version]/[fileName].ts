interface Env {
  SOUNDLIBRARY_PUBLIC_BUCKET_DOMAIN: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const bucketURL = new URL(context.request.url);

  bucketURL.hostname = context.env.SOUNDLIBRARY_PUBLIC_BUCKET_DOMAIN;

  return fetch(bucketURL, {
    headers: context.request.headers,
  });
};
