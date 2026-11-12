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

const RUST_KEYWORDS = new Set(
  "as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while yield".split(
    " ",
  ),
);

const RUST_BUILTINS = new Set(
  "String Vec Option Some None Result Ok Err Box Rc RefCell Arc Mutex HashMap HashSet i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 bool char str println format vec".split(
    " ",
  ),
);

const JAVA_KEYWORDS = new Set(
  "abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while true false null".split(
    " ",
  ),
);

const JAVA_BUILTINS = new Set(
  "String Integer Long Double Boolean Character List Map Set ArrayList HashMap HashSet Optional Stream Collectors Function Predicate Consumer Supplier CompletableFuture ExecutorService Executors TimeUnit LocalDate LocalTime LocalDateTime Instant Duration Period DateTimeFormatter ZonedDateTime ZoneId Arrays Collections IntStream System Math Object Override".split(
    " ",
  ),
);

function highlightCLike(
  source: string,
  keywords: Set<string>,
  builtins: Set<string>,
): string {
  let output = "";
  let index = 0;
  let lastWord = "";

  while (index < source.length) {
    const character = source[index];

    if (source.startsWith("//", index)) {
      let end = source.indexOf("\n", index);
      if (end === -1) end = source.length;
      output += `<span class="tok-comment">${escapeHtml(source.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (source.startsWith("/*", index)) {
      let end = source.indexOf("*/", index + 2);
      end = end === -1 ? source.length : end + 2;
      output += `<span class="tok-comment">${escapeHtml(source.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    const charLiteral = source.slice(index).match(/^'(?:\\.|[^'\\])'/);
    if (
      character === '"' ||
      (charLiteral && !/[A-Za-z_]/.test(source[index - 1] ?? ""))
    ) {
      const isChar = Boolean(charLiteral);
      let end = index + 1;
      while (end < source.length) {
        if (source[end] === "\\") {
          end += 2;
          continue;
        }
        if (source[end] === (isChar ? "'" : '"')) {
          end += 1;
          break;
        }
        if (!isChar && source[end] === "\n") break;
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
      if (keywords.has(word)) tokenClass = "tok-keyword";
      else if (builtins.has(word)) tokenClass = "tok-builtin";
      else if (
        lastWord === "fn" ||
        lastWord === "class" ||
        lastWord === "interface"
      )
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
        .match(/^(?:0[xX][\da-fA-F_]+|0[bB][01_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/);
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
        "->",
        "::",
        "&&",
        "||",
        "+=",
        "-=",
        "*=",
        "/=",
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
  if (language === "rust") {
    return highlightCLike(code, RUST_KEYWORDS, RUST_BUILTINS);
  }
  if (language === "java") {
    return highlightCLike(code, JAVA_KEYWORDS, JAVA_BUILTINS);
  }
  if (language === "shell") return highlightShell(code);
  return escapeHtml(code);
}
