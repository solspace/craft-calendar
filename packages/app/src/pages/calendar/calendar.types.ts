export type DatePickerPosition = {
  top: number;
  left: number;
};

export type CustomButtonInput = {
  text: string;
  icon?: string;
  click: (event: MouseEvent, element: HTMLElement) => void;
};
