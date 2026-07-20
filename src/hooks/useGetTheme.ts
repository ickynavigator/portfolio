import { useSyncExternalStore } from "react";

import { ThemeSwitcherSubscriber } from "~/lib/theme";

const themeSwitcherSubscriber = new ThemeSwitcherSubscriber();

const useGetTheme = () => {
  return useSyncExternalStore(
    themeSwitcherSubscriber.subscribe,
    themeSwitcherSubscriber.getIsDark,
    themeSwitcherSubscriber.getIsDark_server,
  );
};

export default useGetTheme;
