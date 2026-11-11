import type { CodeLanguage } from "@/lib/chapters";

const PYTHON_KEYWORDS = new Set(
  "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case".split(
    " ",
  ),
);

const PYTHON_BUILTINS = new Set(
  "abs all any bool bytes callable chr dict enumerate filter float format frozenset getattr hasattr int isinstance issubclass iter len list map max min next object open ord print range repr reversed round set sorted str sum tuple type zip Exception ExceptionGroup BaseException ValueError TypeError KeyError IndexError AttributeError RuntimeError".split(
    " ",
  ),
);

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[character];
  });

function highlightPython(source: string): string {
  let output = "";
  let index = 0;
  let lastWord = "";

  while (index < source.length) {
    const character = source[index];

    if (character === "#") {
      let end = source.indexOf("\n", index);
      if (end === -1) end = source.length;
      output += `<span class="tok-comment">${escapeHtml(source.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (character === '"' || character === "'") {
      const triple = source.startsWith(character.repeat(3), index);
      let end = index + (triple ? 3 : 1);
      while (end < source.length) {
        if (source[end] === "\\") {
          end += 2;
          continue;
        }
        if (triple && source.startsWith(character.repeat(3), end)) {
          end += 3;
          break;
        }
        if (!triple && source[end] === character) {
          end += 1;
          break;
        }
        if (!triple && source[end] === "\n") break;
        end += 1;
      }
      output += `<span class="tok-string">${escapeHtml(source.slice(index, end))}</span>`;
      index = end;
      lastWord = "";
      continue;
    }

    if (/[A-Za-z_]/.test(character)) {
      let end = index + 1;
      while (end < source.length && /[A-Za-z0-9_]/.test(source[end])) end += 1;
      const word = source.slice(index, end);
      let tokenClass = "";
      if (PYTHON_KEYWORDS.has(word)) tokenClass = "tok-keyword";
      else if (PYTHON_BUILTINS.has(word)) tokenClass = "tok-builtin";
      else if (lastWord === "def" || lastWord === "class")
        tokenClass = "tok-function";
      output += tokenClass
        ? `<span class="${tokenClass}">${escapeHtml(word)}</span>`
        : escapeHtml(word);
      lastWord = word;
      index = end;
      continue;
    }

    if (/[0-9]/.test(character)) {
      const match = source
        .slice(index)
        .match(
          /^(?:0[xX][\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?j?)/,
        );
      const token = match ? match[0] : character;
      output += `<span class="tok-number">${escapeHtml(token)}</span>`;
      index += token.length;
      lastWord = "";
      continue;
    }

    if ("+-*/%=<>&|^~".includes(character)) {
      const pair = source.slice(index, index + 2);
      const token = [
        "==",
        "!=",
        "<=",
        ">=",
        ":=",
        "->",
        "**",
        "//",
        "<<",
        ">>",
      ].includes(pair)
        ? pair
        : character;
      output += `<span class="tok-operator">${escapeHtml(token)}</span>`;
      index += token.length;
      lastWord = "";
      continue;
    }

    output += escapeHtml(character);
    if (!/\s/.test(character)) lastWord = "";
    index += 1;
  }

  return output;
}

function highlightShell(source: string): string {
  return source
    .split("\n")
    .map((line) => {
      const commentIndex = line.indexOf("#");
      if (commentIndex === -1) return escapeHtml(line);
      const code = escapeHtml(line.slice(0, commentIndex));
      const comment = escapeHtml(line.slice(commentIndex));
      return `${code}<span class="tok-comment">${comment}</span>`;
    })
    .join("\n");
}

export function highlightCode(code: string, language: CodeLanguage): string {
  if (language === "python") return highlightPython(code);
  if (language === "shell") return highlightShell(code);
  return escapeHtml(code);
}
