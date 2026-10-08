export const findElementEditor = (node: HTMLElement | null): Craft.ElementEditor | undefined => {
  const jQuery = (window as typeof window & { jQuery?: JQueryStatic }).jQuery;
  if (!node || !jQuery) {
    return undefined;
  }

  return jQuery(node).closest("form").data("elementEditor");
};

/** Save pending schedule changes into the draft before editing any of its occurrences. */
export const getDraftEventId = async (node: HTMLElement | null): Promise<number> => {
  const editor = findElementEditor(node);
  if (!editor) {
    throw new Error("The event editor is unavailable.");
  }

  await editor.ensureIsDraftOrRevision();
  await editor.checkForm(false, true);

  return editor.settings.elementId;
};
