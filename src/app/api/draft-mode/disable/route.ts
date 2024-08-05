import { draftMode } from 'next/headers';

export function GET(request: Request) {
  draftMode().disable();

  return Response.redirect(new URL('/', request.url));
}
