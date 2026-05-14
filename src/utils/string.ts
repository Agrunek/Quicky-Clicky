export type ClassNameDictionary<T extends string> = { [key in T]: string };

export const tw = (styles: TemplateStringsArray) => styles.join('');
