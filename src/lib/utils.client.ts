export class ComponentBase extends HTMLElement {
  $booleanish(value: unknown) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.trim() === "true";
    return false;
  }

  $debouncer<T extends unknown[]>(func: (...args: T) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const debounced = function (this: unknown, ...args: T) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };

    debounced.cancel = function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    return debounced;
  }

  $bindCheckbox(_elements: Element | Element[] | null, datasetKey: string) {
    let elements;

    if (Array.isArray(_elements)) {
      elements = _elements;
    } else {
      elements = [_elements];
    }

    elements
      .filter((element) => element != null)
      .forEach((el) => {
        if (el instanceof HTMLInputElement) {
          el.checked = this.$booleanish(this.dataset[datasetKey]);

          el.addEventListener("click", (e) => {
            if (!(e.target instanceof HTMLInputElement)) return;
            const boolean = this.$booleanish(e.target.checked);
            this.dataset[datasetKey] = boolean.toString();
          });
        }
      });
  }
}
