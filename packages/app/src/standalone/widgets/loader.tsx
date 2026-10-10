import type { ComponentType } from "react";
import ReactDOM from "react-dom/client";

const mounted = new WeakSet<HTMLElement>();

type WidgetComponent<C extends object> = ComponentType<{ config: C }>;

export const registerLoader = <C extends object>(
  widgetName: string,
  Component: WidgetComponent<C>,
): void => {
  const mountWidget = (container: HTMLElement): void => {
    if (mounted.has(container)) {
      return;
    }

    const configElement = container.querySelector<HTMLScriptElement>("[data-config]");
    const rootElement = container.querySelector<HTMLElement>("[data-root]");
    if (!configElement?.textContent || !rootElement) {
      console.error(`Widget ${widgetName}: Missing config or root element`, container);
      return;
    }

    mounted.add(container);
    container.dataset.mounted = "true";

    const config = JSON.parse(configElement.textContent) as C;
    const root = ReactDOM.createRoot(rootElement);

    root.render(<Component config={config} />);
  };

  const startObserver = (): void => {
    scanForWidgets();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches(`[data-calendar-widget="${widgetName}"]`)) {
            mountWidget(node);
          }

          scanForWidgets(node);
        });
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  const scanForWidgets = (root: ParentNode = document): void => {
    root
      .querySelectorAll<HTMLElement>(`[data-calendar-widget="${widgetName}"]:not([data-mounted])`)
      .forEach(mountWidget);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
};
