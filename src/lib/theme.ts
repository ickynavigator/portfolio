import * as z from "zod";

export type Theme = z.infer<typeof ThemeSwitcherBase.themes>;

export class ThemeSwitcherBase {
  static DEFAULT_THEME = "dark";
  static themes = z.enum({
    DARK: "dark",
    LIGHT: "light",
    SYSTEM: "system",
  });
  static validateTheme(theme: unknown): Theme {
    return ThemeSwitcherBase.themes
      .default("system")
      .catch("system")
      .parse(theme);
  }
}

export interface ThemeSwitcherStore {
  getTheme(): Theme;
  setTheme(theme: Theme): void;
  removeTheme(): void;
  subscribe(onChange: () => void): () => void;
}

export class ThemeSwitcherStoreLocalStorage implements ThemeSwitcherStore {
  STORAGE_KEY = "theme";
  getTheme() {
    const storedTheme = localStorage.getItem(this.STORAGE_KEY);
    return ThemeSwitcherBase.validateTheme(storedTheme);
  }
  setTheme(theme: Theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
  }
  removeTheme() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
  subscribe(onChange: () => void) {
    const event = window.matchMedia("(prefers-color-scheme: dark)");

    event.addEventListener("change", onChange);
    return () => {
      event.removeEventListener("change", onChange);
    };
  }
}

export class ThemeSwitcherEvent {
  static EVENT_NAME = "themechange";
  event: CustomEvent<{ theme: Theme }>;
  constructor(theme: Theme) {
    this.event = new CustomEvent("themechange", { detail: { theme } });
  }
  dispatch() {
    document.dispatchEvent(this.event);
  }
}

export class ThemeSwitcherSubscriber {
  subscribe(onChange: () => void) {
    document.addEventListener(ThemeSwitcherEvent.EVENT_NAME, onChange);
    return () => {
      document.removeEventListener(ThemeSwitcherEvent.EVENT_NAME, onChange);
    };
  }

  getIsDark() {
    return document.documentElement.classList.contains(
      ThemeSwitcherBase.themes.enum.DARK,
    );
  }

  getIsDark_server() {
    return true;
  }
}
