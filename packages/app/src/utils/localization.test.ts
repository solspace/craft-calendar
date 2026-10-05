import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getCalendarTranslations, getDateLocale, getDatePickerTranslations } from "./localization";

const pluginRoot = resolve(import.meta.dirname, "../../../plugin/src");
const appRoot = resolve(import.meta.dirname, "..");
const literal = String.raw`(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")`;
const decode = (value: string) => value.slice(1, -1).replace(/\\(['"\\])/g, "$1");
const read = (path: string) => readFileSync(path, "utf8");
const catalog = (language: string): Record<string, string> => {
  const entries = [
    ...read(`${pluginRoot}/translations/${language}/calendar.php`).matchAll(
      new RegExp(`(${literal})\\s*=>\\s*(${literal})`, "g"),
    ),
  ].map((match): [string, string] => [decode(match[1]), decode(match[2])]);
  expect(new Set(entries.map(([key]) => key)).size).toBe(entries.length);
  return Object.fromEntries(entries);
};
const english = catalog("en");
const files = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (
      ["translations", "external", "codepack", "app", "event-builder"].includes(entry.name) &&
      directory.includes("plugin")
    )
      return [];
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
const tokens = (value: string, pattern: RegExp) =>
  [...value.matchAll(pattern)].map(([token]) => token).sort();

// These labels are identifiers, product names, or words legitimately shared with English.
const sharedWords: Record<string, string[]> = {
  de: [
    "Calendar",
    "Slug",
    "Mo",
    "Fr",
    "Sa",
    "April",
    "August",
    "September",
    "November",
    "Name",
    "Agenda",
    "Apr",
    "Aug",
    "Express Forms",
    "Freeform",
    "Craft Discord",
    "Jan",
    "Jul",
    "Jun",
    "Link",
    "Newsletter",
    "Nov",
    "Position",
    "Sep",
    "Stack Exchange",
    "Templates",
    "Community",
    "Feb",
    "Support",
    "in {months}",
  ],
  nl: [
    "Week",
    "Slug",
    "April",
    "September",
    "November",
    "December",
    "Handle",
    "Routes",
    "in {months}",
    "Agenda",
    "Apr",
    "Aug",
    "Express Forms",
    "Freeform",
    "Craft Discord",
    "Feb",
    "Jan",
    "Jul",
    "Jun",
    "Link",
    "Nov",
    "Sep",
    "Site",
    "Stack Exchange",
    "Community",
  ],
  fr: [
    "Calendar",
    "Slug",
    "Date",
    "Description",
    "Routes",
    "Sa",
    "occurrence",
    "occurrences",
    "Agenda",
    "Express Forms",
    "Freeform",
    "Position",
    "Site",
    "Stack Exchange",
    "Community",
  ],
  it: [
    "Calendar",
    "Slug",
    "Novembre",
    "Agenda",
    "Express Forms",
    "Freeform",
    "Link",
    "Newsletter",
    "No",
    "Handle",
    "Sa",
    "Stack Exchange",
    "Community",
  ],
};

describe("control-panel translation catalogs", () => {
  for (const language of ["de", "nl", "fr", "it"]) {
    it(`${language} covers every English key with matching placeholders and markup`, () => {
      const messages = catalog(language);
      expect(Object.keys(messages).sort()).toEqual(Object.keys(english).sort());
      for (const [key, value] of Object.entries(messages)) {
        expect(value.trim(), `${language}: ${key}`).not.toBe("");
        expect(tokens(value, /\{[\w]+\}/g), `${language}: ${key}`).toEqual(
          tokens(key, /\{[\w]+\}/g),
        );
        expect(tokens(value, /<[^>]+>/g), `${language}: ${key}`).toEqual(tokens(key, /<[^>]+>/g));
        if (value === key)
          expect(sharedWords[language], `${language}: untranslated ${key}`).toContain(key);
      }
    });
  }

  it("keeps the en-US compatibility catalog mapped to English", () => {
    expect(read(`${pluginRoot}/translations/en-US/calendar.php`)).toContain("'/en/calendar.php'");
  });

  it("registers literal PHP, Twig, and legacy JavaScript translation calls", () => {
    const keys = new Set<string>();
    for (const path of files(pluginRoot)) {
      if (!/\.(php|twig|html|js)$/.test(path)) continue;
      const source = read(path);
      const patterns = [
        new RegExp(`(?:Calendar|self)::t\\(\\s*(${literal})`, "g"),
        new RegExp(`(${literal})\\s*\\|\\s*t\\(['"]calendar['"]`, "g"),
        new RegExp(`Craft.t\\(['"]calendar['"]\\s*,\\s*(${literal})`, "g"),
        new RegExp(`translate\\(\\s*(${literal})`, "g"),
      ];
      for (const pattern of patterns)
        for (const match of source.matchAll(pattern)) keys.add(decode(match[1]));
      if (path.endsWith("Validator.php")) {
        for (const match of source.matchAll(
          new RegExp(`\\$errors\\[[^\\n]+\\]\\[\\]\\s*=\\s*(${literal})`, "g"),
        ))
          keys.add(decode(match[1]));
      }
      if (path.includes("/templates/resources/")) {
        for (const match of source.matchAll(
          new RegExp(`(?:title|description|label|linkText):\\s*(?:\\[\\s*)?(${literal})`, "g"),
        ))
          keys.add(decode(match[1]));
      }
    }
    expect([...keys].filter((key) => !(key in english))).toEqual([]);
  });

  it("registers React translation calls and static control/option labels", () => {
    const keys = new Set<string>();
    const addLiterals = (node?: ts.Node) => {
      if (!node) return;
      if (ts.isStringLiteralLike(node) && node.text) keys.add(node.text);
      else if (ts.isConditionalExpression(node)) {
        addLiterals(node.whenTrue);
        addLiterals(node.whenFalse);
      }
    };
    for (const path of files(appRoot)) {
      if (!/\.tsx?$/.test(path) || /\.(test|styles|theme)\./.test(path)) continue;
      const source = ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true);
      const visit = (node: ts.Node) => {
        if (ts.isCallExpression(node)) {
          if (node.expression.getText(source) === "translate") addLiterals(node.arguments[0]);
          if (
            node.expression.getText(source) === "Craft.t" &&
            node.arguments[0]?.getText(source).match(/^['"]calendar['"]$/)
          )
            addLiterals(node.arguments[1]);
        }
        if (ts.isPropertyAssignment(node) && node.name.getText(source) === "label")
          addLiterals(node.initializer);
        if (
          ts.isJsxAttribute(node) &&
          ts.isIdentifier(node.name) &&
          ["label", "title", "description", "actionLabel", "popoverTitle"].includes(node.name.text)
        ) {
          if (node.initializer && ts.isStringLiteral(node.initializer))
            addLiterals(node.initializer);
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
    expect([...keys].filter((key) => !(key in english))).toEqual([]);
  });
});

describe("control-panel locale wiring", () => {
  afterEach(() => vi.unstubAllGlobals());

  it.each([
    "en-US",
    "en-GB",
    "de-DE",
    "nl-NL",
    "fr-FR",
    "it-IT",
  ])("formats dates using %s", (language) => {
    vi.stubGlobal("document", { documentElement: { lang: language } });
    expect(getDateLocale().code).toBe(
      language.startsWith("en") ? language : language.split("-")[0],
    );
    expect(getDatePickerTranslations().locale).toBe(getDateLocale());
    expect(getCalendarTranslations().locale).toBe(language);
  });

  it("uses translated date-picker and calendar text with substitutions", () => {
    vi.stubGlobal("Craft", {
      t: (_category: string, key: string, params: Record<string, unknown>) =>
        `translated:${key.replace(/\{(\w+)\}/g, (_, name) => String(params[name]))}`,
    });
    expect(getDatePickerTranslations().timeCaption).toBe("translated:Time");
    expect(getCalendarTranslations().allDayText).toBe("translated:All Day");
    expect(getCalendarTranslations().moreLinkText(3)).toBe("translated:+3 more");
  });
});
