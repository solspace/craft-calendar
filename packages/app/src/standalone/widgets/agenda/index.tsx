import { AgendaWidget } from "@widgets/agenda/agenda";
import ReactDOM from "react-dom/client";
import type { AgendaWidgetConfig } from "./agenda.types";

const mounted = new WeakSet<HTMLElement>();

const mountAgendaWidget = (container: HTMLElement): void => {
  if (mounted.has(container)) {
    return;
  }

  const configElement = container.querySelector<HTMLScriptElement>("[data-config]");
  const rootElement = container.querySelector<HTMLElement>("[data-root]");
  if (!configElement?.textContent || !rootElement) {
    console.error("AgendaWidget: Missing config or root element", container);
    return;
  }

  mounted.add(container);
  container.dataset.mounted = "true";

  const config = JSON.parse(configElement.textContent) as AgendaWidgetConfig;
  const root = ReactDOM.createRoot(rootElement);

  root.render(<AgendaWidget config={config} />);
};

const startObserver = (): void => {
  scanForWidgets();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        if (node.matches(`[data-calendar-widget="agenda"]`)) {
          mountAgendaWidget(node);
        }

        scanForWidgets(node);
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startObserver);
} else {
  startObserver();
}

const scanForWidgets = (root: ParentNode = document): void => {
  root
    .querySelectorAll<HTMLElement>(`[data-calendar-widget="agenda"]:not([data-mounted])`)
    .forEach(mountAgendaWidget);
};
