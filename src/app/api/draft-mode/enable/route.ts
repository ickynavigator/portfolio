import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { draftMode } from 'next/headers';
import env from '~/env';
import { client } from '~/lib/sanity/client';

export async function GET(request: Request) {
  const clientWithToken = client.withConfig({ token: env.SANITY_API_READ_TOKEN });

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(clientWithToken, request.url);

  if (!isValid) {
    return new Response('Invalid Secret', { status: 401 });
  }

  draftMode().enable();

  return Response.redirect(new URL(redirectTo, request.url));
}
