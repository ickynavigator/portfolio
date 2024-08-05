import env from '~/env';

export const getBaseURL = () => {
  const publicURL = env.NEXT_PUBLIC_SITE_URL;
  if (publicURL) return new URL(publicURL);

  // If the public URL is not set, use the Vercel URL
  return new URL(`https://${env.VERCEL_URL}`);
};
