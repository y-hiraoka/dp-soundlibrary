interface Env {
  SOUNDLIBRARY_PUBLIC_BUCKET_DOMAIN: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const bucketURL = new URL(context.request.url);

  bucketURL.hostname = context.env.SOUNDLIBRARY_PUBLIC_BUCKET_DOMAIN;

  const request = new Request(bucketURL, context.request);

  const originResponse = await fetch(request);

  const edgeResponse = new Response(originResponse.body, originResponse);

  edgeResponse.headers.set("Cache-Control", "no-cache");

  return edgeResponse;
};
