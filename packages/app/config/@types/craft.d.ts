type CraftElement = {
  id: number;
  label: string;
  siteId: number;
  status: string;
  url?: string;
  hasThumb: boolean;
};

type ToastOptions = {
  details?: string | JQuery | HTMLElement;
  icon?: string;
  iconLabel?: string;
};

declare namespace Craft {
  function createElementSelectorModal(
    elementType: string,
    settings: {
      multiSelect?: boolean;
      sources?: string | string[];
      criteria?: Record<string, unknown>;
      storageKey?: string;
      onSelect: (elements: Array<CraftElement>) => void;
    },
  ): Promise<void>;

  function t(category: string, message: string, params?: Record<string, string>): string;

  function getCpUrl(path: string): string;

  function getActionUrl(action: string): string;

  type CpScreenSlideoutSettings = {
    params?: Record<string, string | number>;
  };

  class CpScreenSlideout {
    constructor(action: string, settings?: CpScreenSlideoutSettings);
    on(event: "submit" | "close", handler: () => void): void;
  }

  type ElementEditorSettings = {
    elementId: number;
    canonicalId: number;
    draftId: number | null;
    siteId: number;
  };

  class ElementEditor {
    settings: ElementEditorSettings;
    ensureIsDraftOrRevision(onlyIfChanged?: boolean): Promise<void>;
    checkForm(force?: boolean, saveDraft?: boolean | null): Promise<void>;
  }

  const cp: {
    displaySuccess(message: string, options?: ToastOptions): void;
    displayNotice(message: string, options?: ToastOptions): void;
    displayError(message: string, options?: ToastOptions): void;
  };

  const csrfTokenName: string;
  const csrfTokenValue: string;
}

declare namespace Garnish {
  type MenuBtnOptions = {
    onOptionSelect?: (target: HTMLElement) => void;
  };

  class MenuBtn {
    constructor(target: Element, options?: MenuBtnOptions);
    showMenu(): void;
  }
}

interface JQuery {
  datepicker(...args: unknown[]): JQuery;
}
