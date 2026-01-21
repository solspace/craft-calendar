type CraftElement = {
  id: number;
  label: string;
  siteId: number;
  status: string;
  url?: string;
  hasThumb: boolean;
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
