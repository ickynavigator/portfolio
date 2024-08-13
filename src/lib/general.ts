import env from '~/env';
import { dayjs } from '~/lib/date';

export const getBaseURL = () => {
  const publicURL = env.NEXT_PUBLIC_SITE_URL;
  if (publicURL) return new URL(publicURL);

  // If the public URL is not set, use the Vercel URL
  return new URL(`https://${env.VERCEL_URL}`);
};

export const getReadingTime = (textLength: number, wordsPerMinute = 200) => {
  const averageWordLength = 5;

  const estimatedWordCount = textLength / averageWordLength;

  const readingTime = (estimatedWordCount / wordsPerMinute) * 60;

  return dayjs.duration(readingTime, 'seconds').humanize();
};
