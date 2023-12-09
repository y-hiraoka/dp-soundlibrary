import { PagesFunction, R2Bucket, Response } from "@cloudflare/workers-types";

interface Env {
  SOUNDLIBRARY_BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env, "version" | "fileName"> = async (context) => {
  if (
    typeof context.params.version !== "string" ||
    typeof context.params.fileName !== "string"
  ) {
    return new Response("Bad Request", { status: 400 });
  }

  const file = await context.env.SOUNDLIBRARY_BUCKET.get(
    `sounds/${context.params.version}/${context.params.fileName}`,
  );

  if (file === null) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(file.body);
};
