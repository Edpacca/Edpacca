// https://icons8.com/icon/set/code-language/color
export const LANG_LOGO_COLORS: Record<string, string> = {
  "CSS" : "#4db6ac",
  "SCSS": "#f06292",
  "HTML": "#e65100",
  "JS": "#fdd400",
  "TS": "#1976d2",
  "Svelte": "#ff3f00",
  "Java": "#7925c7",
  "Docker": "#0288d0",
  "Django": "#004d40",
  "Python": "#007c01",
  "Lua": "#135cb0",
  "C": "#283592",
  "C++": "#283592",
  "C#": "#546e7a",
  "Bash": "#434345",
  "Makefile": "#272727",
}

export function getLangShortName(fullName: string) {
  switch (fullName) {
    case "Shell":
      return "Bash";
    case "TypeScript":
      return "TS";
    case "JavaScript":
      return "JS";
    case "Dockerfile":
      return "Docker";
    default:
      return fullName;
  }
}

export const EXTERNAL_CODE_LANGS: Record<string, number> = {
    "Python": 8,
    "Django": 3,
    "TS": 3,
    "Svelte": 3,
    "Docker": 3,
    "Bash": 6,
    "Java": 6,
    "SCSS": 1,
    "C++": 4
}

export const STATIC_LANG_DATA: Record<string, number>[] = [
    {
      Svelte: 6450,
      CSS: 877,
      HTML: 390,
      TypeScript: 294,
      JavaScript: 207
    },
    { 'C++': 21132 },
    { 'C#': 29237 },
    { C: 50772, Python: 5930, Makefile: 750 },
    {
      Svelte: 205600,
      TypeScript: 56390,
      CSS: 11181,
      HTML: 336,
      JavaScript: 207
    },
    { JavaScript: 52566 },
    {
      Svelte: 29498,
      TypeScript: 24139,
      HTML: 481,
      CSS: 409,
      JavaScript: 207
    },
    { JavaScript: 7216, CSS: 2113, HTML: 1724 },
    { JavaScript: 2739, CSS: 2427, HTML: 369 },
    { TypeScript: 92850, SCSS: 7236, HTML: 657, Shell: 40 },
    {
      Svelte: 11264,
      CSS: 3305,
      TypeScript: 1912,
      JavaScript: 1147,
      HTML: 607
    },
    {
      Svelte: 4573,
      JavaScript: 2183,
      HTML: 482,
      CSS: 146,
      TypeScript: 104
    },
    { 'C#': 70762 },
    { 'C#': 8048, C: 1646, Python: 482 },
    { 'C#': 29913 },
    { Java: 62578 },
    {
      CSS: 96560,
      SCSS: 74749,
      HTML: 67126,
      Svelte: 37439,
      JavaScript: 18686,
      TypeScript: 18296
    },
    { CSS: 526, JavaScript: 326 },
    { 'C#': 43293 },
    {
      TypeScript: 22048,
      Svelte: 16197,
      JavaScript: 2082,
      CSS: 718,
      HTML: 488
    },
    { 'C#': 190563 },
    { TypeScript: 220150, SCSS: 35949, Dockerfile: 731, HTML: 557 },
    { Lua: 161975 },
    { 'C#': 22490 },
    {
      JavaScript: 1392308,
      Svelte: 10925,
      TypeScript: 6900,
      CSS: 1448,
      HTML: 396
    },
    { 'C#': 110783, HTML: 42053, 'ASP.NET': 101 },
    { 'C#': 19401, TypeScript: 10265, HTML: 1721, CSS: 205 },
    { 'C#': 16591 }
  ]