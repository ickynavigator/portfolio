import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export function formatDateWithLocalized(date: string) {
  return dayjs(date).format("ll");
}

export default dayjs;
