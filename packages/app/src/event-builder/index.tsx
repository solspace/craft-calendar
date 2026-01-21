import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { EventBuilder } from "./event-builder";
import { createEventBuilderStore } from "./store/store";
import type { BuilderConfig } from "./types";

const mounted = new WeakSet<HTMLElement>();

const mountEventBuilder = (container: HTMLElement): void => {
  if (mounted.has(container)) {
    return;
  }

  mounted.add(container);
  container.dataset.eventBuilderMounted = "true";
  const json = JSON.parse(container.querySelector("script[data-event-builder-config]").textContent);
  const config = json as BuilderConfig;

  console.log(config);

  const store = createEventBuilderStore(config);
  const root = ReactDOM.createRoot(container);

  root.render(
    <Provider store={store}>
      <EventBuilder />
    </Provider>,
  );
};

const scanForBuilders = (root: ParentNode = document): void => {
  root
    .querySelectorAll<HTMLElement>("[data-event-builder]:not([data-event-builder-mounted])")
    .forEach(mountEventBuilder);
};

const startObserver = (): void => {
  scanForBuilders();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        if (node.matches("[data-event-builder]")) {
          mountEventBuilder(node);
        }

        scanForBuilders(node);
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
