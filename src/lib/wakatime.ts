import dayjs from "dayjs";
import z from "zod";

const WAKATIME_EMBEDS = {
  DAYS_7:
    "https://wakatime.com/share/@ickynavigator/49b2ad27-4df0-4289-8b51-8890106e47fc.json",
  DAYS_365:
    "https://wakatime.com/share/@ickynavigator/d8b00654-da22-4438-80d8-63bf9cfcbdcf.json",
  ALL_TIME:
    "https://wakatime.com/share/@ickynavigator/baeb9f60-e229-46e2-bced-518590dc3865.json",
};

export type WakatimeRange = keyof typeof WAKATIME_EMBEDS;

interface WakatimeEmbedData {
  data: z.infer<typeof wakatimeLanguageSchema>[];
}

interface WakatimeDataOptions {
  range?: WakatimeRange;
}
export async function getWakatimeData(options: WakatimeDataOptions) {
  const range = options.range ?? "DAYS_7";
  const selected = WAKATIME_EMBEDS[range];
  let start, end, rangeLabel: string;

  switch (range) {
    case "DAYS_7": {
      start = dayjs().subtract(7, "day");
      end = dayjs();
      rangeLabel = "last 7 days";
      break;
    }
    case "DAYS_365": {
      start = dayjs().subtract(365, "day");
      end = dayjs();
      rangeLabel = "last 365 days";
      break;
    }
    case "ALL_TIME": {
      start = dayjs(0);
      end = dayjs();
      rangeLabel = "all time";
      break;
    }
  }

  const res = await fetch(selected);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json<WakatimeEmbedData>();

  return {
    data: json.data,
    start,
    end,
    rangeLabel,
  };
}

export const wakatimeLanguageSchema = z.object({
  name: z.string(),
  percent: z.number(),
  color: z.string(),
  decimal: z.string(),
  digital: z.string(),
  hours: z.number(),
  minutes: z.number(),
  text: z.string(),
  total_seconds: z.number(),
});
