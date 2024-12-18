import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export function getReadingTime(
  textLength: number,
  wordsPerMinute = 200,
  averageWordLength = 5,
) {
  const estimatedWordCount = textLength / averageWordLength;
  const readingTime = estimatedWordCount / wordsPerMinute;
  return dayjs.duration(readingTime, "minutes").humanize();
}

export default dayjs;
