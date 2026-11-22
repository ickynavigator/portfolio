export type Theme =
  (typeof ThemeSwitcherBase.enum)[keyof typeof ThemeSwitcherBase.enum];

export class ThemeSwitcherBase {
  static DEFAULT_THEME = "dark";
  static enum = { DARK: "dark", LIGHT: "light", SYSTEM: "system" } as const;
  static validateTheme(theme: unknown): Theme {
    switch (theme) {
      case ThemeSwitcherBase.enum.DARK:
      case ThemeSwitcherBase.enum.LIGHT:
      case ThemeSwitcherBase.enum.SYSTEM:
        return theme;
      default:
        return ThemeSwitcherBase.enum.SYSTEM;
    }
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
    return ThemeSwitcherBase.validateTheme(
      localStorage.getItem(this.STORAGE_KEY),
    );
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

export class ThemeSwitcherEvent extends CustomEvent<{ theme: Theme }> {
  static readonly EVENT_NAME = "themechange";
  constructor(theme: Theme) {
    super(ThemeSwitcherEvent.EVENT_NAME, { detail: { theme } });
  }
  dispatch() {
    document.dispatchEvent(this);
  }
}
