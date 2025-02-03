// eslint-disable-next-line unused-imports/no-unused-vars
namespace WakatimeTypes {
  export type Range =
    | "last_7_days"
    | "last_30_days"
    | "last_6_months"
    | "last_year"
    | "all_time";

  export interface WakaTimeStats {
    data: {
      /** total coding activity, excluding "Other" language, as seconds for the given range of time */
      total_seconds: number;
      /** total coding activity as seconds for the given range of time */
      total_seconds_including_other_language: number;
      /** total coding activity, excluding "Other" language, as human readable string */
      human_readable_total: string;
      /** total coding activity as human readable string */
      human_readable_total_including_other_language: string;
      /** average coding activity per day as seconds for the given range of time, excluding Other language */
      daily_average: number;
      /** average coding activity per day as seconds for the given range of time */
      daily_average_including_other_language: number;
      /** daily average as human readable string, excluding Other language */
      human_readable_daily_average: string;
      /** daily average as human readable string */
      human_readable_daily_average_including_other_language: string;
      categories: Array<{
        /** name of category, for ex: Coding or Debugging */
        name: string;
        /** total coding activity as seconds */
        total_seconds: number;
        /** percent of time spent in this category */
        percent: number;
        /** total coding activity for this category in digital clock format */
        digital: string;
        /** total coding activity in human readable format */
        text: string;
        /** hours portion of coding activity for this category */
        hours: number;
        /** minutes portion of coding activity for this category */
        minutes: number;
      }>;
      projects: Array<{
        /** project name */
        name: string;
        /** total coding activity as seconds */
        total_seconds: number;
        /** percent of time spent in this project */
        percent: number;
        /** total coding activity for this project in digital clock format */
        digital: string;
        /** total coding activity in human readable format */
        text: string;
        /** hours portion of coding activity for this project */
        hours: number;
        /** minutes portion of coding activity for this project */
        minutes: number;
      }>;
      languages: Array<{
        /** language name */
        name: string;
        /** total coding activity spent in this language as seconds */
        total_seconds: number;
        /** percent of time spent in this language */
        percent: number;
        /** total coding activity for this language in digital clock format */
        digital: string;
        /** total coding activity in human readable format */
        text: string;
        /** hours portion of coding activity for this language */
        hours: number;
        /** minutes portion of coding activity for this language */
        minutes: number;
        /** seconds portion of coding activity for this language */
        seconds: number;
      }>;
      editors: Array<{
        /** editor name */
        name: string;
        /** total coding activity spent in this editor as seconds */
        total_seconds: number;
        /** percent of time spent in this editor */
        percent: number;
        /** total coding activity for this editor in digital clock format */
        digital: string;
        /** total coding activity in human readable format */
        text: string;
        /** hours portion of coding activity for this editor */
        hours: number;
        /** minutes portion of coding activity for this editor */
        minutes: number;
        /** seconds portion of coding activity for this editor */
        seconds: number;
      }>;
      operating_systems: Array<{
        /** os name */
        name: string;
        /** total coding activity spent in this os as seconds */
        total_seconds: number;
        /** percent of time spent in this os */
        percent: number;
        /** total coding activity for this os in digital clock format */
        digital: string;
        /** total coding activity in human readable format */
        text: string;
        /** hours portion of coding activity for this os */
        hours: number;
        /** minutes portion of coding activity for this os */
        minutes: number;
        /** seconds portion of coding activity for this os */
        seconds: number;
      }>;
      dependencies: Array<{
        /** dependency name */
        name: string;
        /** total coding activity spent in this dependency as seconds */
        total_seconds: number;
        /** percent of time spent in this dependency */
        percent: number;
        /** total coding activity for this dependency in digital clock format */
        digital: string;
        /** total coding activity in human readable format */
        text: string;
        /** hours portion of coding activity for this dependency */
        hours: number;
        /** minutes portion of coding activity for this dependency */
        minutes: number;
        /** seconds portion of coding activity for this dependency */
        seconds: number;
      }>;
      machines: Array<{
        /** machine hostname and ip address */
        name: string;
        /** unique id of this machine */
        machine_name_id: string;
        /** total coding activity spent on this machine as seconds */
        total_seconds: number;
        /** percent of time spent on this machine */
        percent: number;
        /** total coding activity for this machine in digital clock format */
        digital: string;
        /** total coding activity in human readable format */
        text: string;
        /** hours portion of coding activity for this machine */
        hours: number;
        /** minutes portion of coding activity for this machine */
        minutes: number;
        /** seconds portion of coding activity for this machine */
        seconds: number;
      }>;
      best_day: {
        /** day with most coding time logged as Date string in YEAR-MONTH-DAY format */
        date: string;
        /** total coding activity for this day in human readable format */
        text: string;
        /** number of seconds of coding activity, including other language, for this day */
        total_seconds: number;
      };
      /** time range of these stats */
      range: string;
      /** time range as human readable string */
      human_readable_range: string;
      /** number of days in this range with no coding time logged */
      holidays: number;
      /** number of days in this range */
      days_including_holidays: number;
      /** number of days in this range excluding days with no coding time logged */
      days_minus_holidays: number;
      /** status of these stats in the cache */
      status: string;
      /** percent these stats have finished updating in the background */
      percent_calculated: number;
      /** true if these stats are being updated in the background */
      is_already_updating: boolean;
      /** true if this user's coding activity is publicly visible */
      is_coding_activity_visible: boolean;
      /** true if this user's language stats are publicly visible */
      is_language_usage_visible: boolean;
      /** true if this user's editor stats are publicly visible */
      is_editor_usage_visible: boolean;
      /** true if this user's category stats are publicly visible */
      is_category_usage_visible: boolean;
      /** true if this user's operating system stats are publicly visible */
      is_os_usage_visible: boolean;
      /** true if these stats got stuck while processing and will be recalculated in the background */
      is_stuck: boolean;
      /** true if these stats include the current day; normally false except range "all_time" */
      is_including_today: boolean;
      /** true if these stats are up to date; when false, stats are missing or from an old time range and will be refreshed soon */
      is_up_to_date: boolean;
      /** start of this time range as ISO 8601 UTC datetime */
      start: string;
      /** end of this time range as ISO 8601 UTC datetime */
      end: string;
      /** timezone used in Olson Country/Region format */
      timezone: string;
      /** value of the user's keystroke timeout setting in minutes */
      timeout: number;
      /** status of the user's writes_only setting */
      writes_only: boolean;
      /** unique id of this user */
      user_id: string;
      /** public username for this user */
      username: string;
      /** time when these stats were created in ISO 8601 format */
      created_at: string;
      /** time when these stats were last updated in ISO 8601 format */
      modified_at: string;
    };
  }
}
