import {
  ThemeSwitcherBase,
  ThemeSwitcherEvent,
  ThemeSwitcherStoreLocalStorage,
  type Theme,
  type ThemeSwitcherStore,
} from "~/lib/theme";
import { ComponentBase } from "~/lib/utils.client";

export class ThemeSwitcher extends ComponentBase {
  store: ThemeSwitcherStore = new ThemeSwitcherStoreLocalStorage();

  connectedCallback() {
    this.$initialize();
  }

  $initialize() {
    const storedTheme = this.store.getTheme();
    let ignoreSystemTheme =
      storedTheme != null && storedTheme !== ThemeSwitcherBase.enum.SYSTEM;

    this.store.subscribe(() => {
      if (ignoreSystemTheme) return;
      this.$updateTheme(ThemeSwitcherBase.enum.SYSTEM);
    });

    this.querySelectorAll(
      "input[value='light'],input[value='dark'],input[value='system']",
    ).forEach((node) => {
      if (!(node instanceof HTMLInputElement)) return;
      if (node.value == storedTheme) node.checked = true;

      node.addEventListener("change", (event) => {
        if (!(event.target instanceof HTMLInputElement)) return;
        if (!(typeof event.target?.value === "string")) return;

        const selectedTheme = ThemeSwitcherBase.validateTheme(
          event.target.value,
        );

        switch (selectedTheme) {
          case ThemeSwitcherBase.enum.LIGHT:
          case ThemeSwitcherBase.enum.DARK: {
            this.store.setTheme(selectedTheme);
            ignoreSystemTheme = true;
            break;
          }
          case ThemeSwitcherBase.enum.SYSTEM: {
            this.store.removeTheme();
            ignoreSystemTheme = false;
            break;
          }
          default: {
            break;
          }
        }

        this.$updateTheme(selectedTheme);
      });
    });

    this.$updateTheme(storedTheme);
  }

  /**
   * @param incomingTheme {"light" | "dark" | "system"}
   */
  $updateTheme(incomingTheme: Theme) {
    let _incomingTheme = incomingTheme ?? ThemeSwitcherBase.DEFAULT_THEME;

    if (incomingTheme == ThemeSwitcherBase.enum.SYSTEM) {
      _incomingTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? ThemeSwitcherBase.enum.DARK
        : ThemeSwitcherBase.enum.LIGHT;
    }

    switch (_incomingTheme) {
      case ThemeSwitcherBase.enum.LIGHT: {
        document.documentElement.classList.remove(ThemeSwitcherBase.enum.DARK);
        break;
      }
      case ThemeSwitcherBase.enum.DARK: {
        document.documentElement.classList.add(ThemeSwitcherBase.enum.DARK);
        break;
      }
    }

    document.querySelectorAll("[data-group='meta-theming']").forEach((node) => {
      const theme = node.getAttribute(`data-${_incomingTheme}`);
      if (theme) node.setAttribute("content", theme);
    });

    new ThemeSwitcherEvent(_incomingTheme).dispatch();
  }
}
