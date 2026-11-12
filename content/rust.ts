import type { LanguageBook } from "@/lib/language-books";

export const rustBook: LanguageBook = {
  id: "rust",
  title: "Rust",
  subtitle: "系统、所有权与并发",
  description:
    "从 Cargo、类型与所有权出发，走到结构体、trait、错误处理、并发和一个命令行项目。按官方书的核心路线重新整理，尽量让每个概念都能落成可读的代码。",
  language: "Rust",
  level: "入门到进阶",
  sourceName: "The Rust Programming Language",
  sourceUrl: "https://doc.rust-lang.org/book/",
  sourceNote:
    "参考 Rust 官方书与标准库文档独立整理。官方书采用 MIT / Apache-2.0 双许可；本手册不替代原书。",
  parts: [
    {
      id: "foundation",
      title: "语言基础",
      eyebrow: "FOUNDATION",
      description: "工具链、类型、控制流，以及 Rust 最核心的所有权模型。",
    },
    {
      id: "abstraction",
      title: "抽象与组织",
      eyebrow: "ABSTRACTION",
      description: "用模块、集合、错误处理、泛型和 trait 组织真正的程序。",
    },
    {
      id: "systems",
      title: "系统与项目",
      eyebrow: "SYSTEMS",
      description: "智能指针、并发、测试，以及把知识收束成一个命令行工具。",
    },
  ],
  chapters: [
    {
      slug: "getting-started",
      number: "01",
      title: "工具链与第一个程序",
      partId: "foundation",
      minutes: 9,
      lede: "安装 rustup，认识 Cargo 的目录结构，然后编译并运行第一个 Rust 程序。",
      sections: [
        {
          id: "toolchain",
          heading: "一次装好工具链",
          html: `
            <p>Rust 的官方安装器是 <code>rustup</code>。它同时管理编译器 <code>rustc</code>、包管理与构建工具 <code>cargo</code>、格式化工具 <code>rustfmt</code> 和静态检查工具 <code>clippy</code>。</p>
            <p>安装完成后，先在终端确认版本：</p>
          `,
          code: [
            {
              lang: "shell",
              label: "终端 · 检查工具链",
              code: `rustup --version
rustc --version
cargo --version`,
            },
          ],
        },
        {
          id: "cargo-new",
          heading: "用 Cargo 创建项目",
          html: `
            <p><code>cargo new</code> 会生成一个可执行 crate：<code>Cargo.toml</code> 描述项目与依赖，<code>src/main.rs</code> 是程序入口。</p>
            <p>Rust 源文件以 <code>.rs</code> 结尾。入口函数固定叫 <code>main</code>；表达式末尾的分号表示丢弃返回值，而 <code>println!</code> 是宏，末尾带感叹号。</p>
          `,
          code: [
            {
              lang: "shell",
              label: "终端 · 新建与运行",
              code: `cargo new hello_rust
cd hello_rust
cargo run`,
            },
            {
              lang: "rust",
              label: "src/main.rs",
              code: `fn main() {
    let name = "Rust";
    println!("你好，{name}！");
}`,
            },
          ],
        },
        {
          id: "cargo-workflow",
          heading: "日常使用的四个命令",
          html: `
            <ul>
              <li><code>cargo check</code>：只做类型检查，不生成最终二进制，速度最快。</li>
              <li><code>cargo build</code>：编译到 <code>target/debug/</code>。</li>
              <li><code>cargo run</code>：编译并运行。</li>
              <li><code>cargo build --release</code>：开启优化，用于交付。</li>
            </ul>
            <p>从今天开始，尽量让 Cargo 管理所有构建，而不是直接调用 <code>rustc</code>。</p>
          `,
          code: [
            {
              lang: "shell",
              label: "终端 · 构建流程",
              code: `cargo check
cargo run
cargo build --release
./target/release/hello_rust`,
            },
          ],
        },
      ],
      takeaways: [
        "rustup 管理工具链，cargo 管理项目生命周期。",
        "程序入口是 fn main；println! 是宏而不是普通函数。",
        "先把 cargo check / run / build --release 养成习惯。",
      ],
    },
    {
      slug: "variables-and-control-flow",
      number: "02",
      title: "变量、类型与控制流",
      partId: "foundation",
      minutes: 12,
      lede: "变量默认不可变；类型通常可以由编译器推导。用 if、loop、while 和 for 表达控制流。",
      sections: [
        {
          id: "variables",
          heading: "不可变是默认值",
          html: `
            <p>Rust 的 <code>let</code> 默认创建不可变变量。需要修改时加 <code>mut</code>，这会让“这里会发生状态变化”在类型层面变得显眼。</p>
            <p><strong>遮蔽</strong>（shadowing）是另一个概念：用新的 <code>let</code> 绑定同名变量，旧值被遮住，但变量可以被赋予不同类型。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "变量与遮蔽",
              code: `fn main() {
    let count = 1;
    let count = count + 1; // 新的绑定，遮蔽旧值
    let message = count.to_string();
    println!("{message}");

    let mut score = 10;
    score += 5;
    println!("score = {score}");
}`,
            },
          ],
        },
        {
          id: "types",
          heading: "标量类型与复合类型",
          html: `
            <p>常用标量类型有整数 <code>i32</code>/<code>u64</code>、浮点 <code>f64</code>、布尔 <code>bool</code>、字符 <code>char</code>。复合类型常见的是元组与数组：元组允许元素类型不同，数组要求长度和类型固定。</p>
            <p>类型推断不是魔法。边界不清楚时，显式标注能让编译器更早帮你检查。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "类型与解构",
              code: `fn main() {
    let width: u32 = 12;
    let ratio = 0.75; // 推断为 f64
    let pair = (width, ratio);
    let (w, r) = pair;
    let numbers = [1, 2, 3, 4];

    println!("{w} × {r}, first = {}", numbers[0]);
}`,
            },
          ],
        },
        {
          id: "control-flow",
          heading: "控制流也是表达式",
          html: `
            <p><code>if</code>、<code>match</code>、块都可以产生值。循环支持 <code>loop</code>、<code>while</code> 和 <code>for</code>；遍历集合时优先用 <code>for</code>，它不需要手动管理索引。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "if 与 for",
              code: `fn main() {
    let limit = 5;
    let label = if limit > 3 { "large" } else { "small" };

    for n in 1..=limit {
        let parity = if n % 2 == 0 { "even" } else { "odd" };
        println!("{n}: {parity}");
    }

    let mut remaining = 3;
    while remaining > 0 {
        remaining -= 1;
    }
    println!("{label}, done");
}`,
            },
          ],
        },
      ],
      takeaways: [
        "默认不可变；需要改变时才写 mut。",
        "shadowing 允许同名新绑定，也允许改变类型。",
        "if 和块是表达式，for 是遍历集合的首选。",
      ],
    },
    {
      slug: "ownership-and-borrowing",
      number: "03",
      title: "所有权与借用",
      partId: "foundation",
      minutes: 14,
      lede: "谁拥有数据、谁可以借用、借用持续多久。理解这三件事，就理解了 Rust 的核心约束。",
      sections: [
        {
          id: "move",
          heading: "所有权、移动与克隆",
          html: `
            <p>每个值都有一个所有者。所有者离开作用域时，值被释放。把 <code>String</code> 赋给另一个变量会<strong>移动</strong>所有权，旧变量不能再使用。</p>
            <p>如果确实需要两份独立数据，用 <code>clone</code> 明确复制。像整数这样的简单类型实现了 <code>Copy</code>，赋值相当于复制，不会移动。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "移动与复制",
              code: `fn main() {
    let original = String::from("ownership");
    let moved = original;
    // println!("{original}"); // 编译错误：值已经被移动

    let copied = 42;
    let another = copied;
    println!("{moved}, {copied}, {another}");

    let cloned = moved.clone();
    println!("{cloned}");
}`,
            },
          ],
        },
        {
          id: "borrow",
          heading: "借用比移动更常见",
          html: `
            <p>函数不需要取得所有权时，传引用即可。不可变引用 <code>&T</code> 可以同时存在多个；可变引用 <code>&mut T</code> 在同一作用域内只能有一个，而且不能与不可变引用同时使用。</p>
            <p>这些规则避免了数据竞争，也逼你提前想清楚数据的读写边界。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "不可变借用",
              code: `fn byte_len(text: &str) -> usize {
    text.len()
}

fn main() {
    let title = String::from("The Rust Book");
    let len = byte_len(&title);
    println!("{title}: {len} bytes");
}`,
            },
            {
              lang: "rust",
              label: "可变借用",
              code: `fn append_mark(text: &mut String) {
    text.push_str(" ✔");
}

fn main() {
    let mut note = String::from("所有权");
    append_mark(&mut note);
    println!("{note}");
}`,
            },
          ],
        },
        {
          id: "rules",
          heading: "记住这三条规则",
          html: `
            <ul>
              <li>值只有一个所有者；所有者离开作用域，值被释放。</li>
              <li>可以同时存在多个不可变引用。</li>
              <li>可变引用必须独占；不能与任何其他引用同时存在。</li>
            </ul>
            <p>遇到借用错误时，不要先找“怎么绕过编译器”。先找出两个引用同时需要数据的真实原因，再调整作用域或数据结构。</p>
          `,
        },
      ],
      takeaways: [
        "String 赋值默认是移动；需要两份数据时显式 clone。",
        "传引用而不是传所有权，是 Rust 的常见习惯。",
        "可变借用必须独占，这条规则是内存安全的基础。",
      ],
    },
    {
      slug: "structs-and-enums",
      number: "04",
      title: "结构体、枚举与模式匹配",
      partId: "foundation",
      minutes: 13,
      lede: "用结构体给数据命名，用枚举表达“几种可能”，再用 match 把所有分支处理完整。",
      sections: [
        {
          id: "structs",
          heading: "结构体与方法",
          html: `
            <p>结构体把相关字段组织成一个有名字的值。<code>impl</code> 块可以定义方法；第一个参数是 <code>&self</code> 时表示只借用当前实例。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "结构体与 impl",
              code: `struct Book {
    title: String,
    chapters: u32,
}

impl Book {
    fn new(title: &str, chapters: u32) -> Self {
        Self {
            title: title.to_string(),
            chapters,
        }
    }

    fn label(&self) -> String {
        format!("{} · {} 章", self.title, self.chapters)
    }
}

fn main() {
    let book = Book::new("Rust", 10);
    println!("{}", book.label());
}`,
            },
          ],
        },
        {
          id: "enums",
          heading: "枚举表达状态",
          html: `
            <p>枚举的每个变体可以携带不同类型的数据。和结构体一样，枚举也可以拥有方法。<code>Option&lt;T&gt;</code> 是标准库最重要的枚举之一：它不是“空值”，而是把“可能没有”写进类型。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "enum 与 match",
              code: `enum ReadingState {
    NotStarted,
    Reading { chapter: u32 },
    Finished,
}

fn describe(state: &ReadingState) -> String {
    match state {
        ReadingState::NotStarted => "还没有开始".into(),
        ReadingState::Reading { chapter } => format!("正在读第 {chapter} 章"),
        ReadingState::Finished => "已经读完".into(),
    }
}

fn main() {
    let state = ReadingState::Reading { chapter: 4 };
    println!("{}", describe(&state));
}`,
            },
            {
              lang: "rust",
              label: "Option 与 if let",
              code: `fn find_word(words: &[&str], target: &str) -> Option<usize> {
    words.iter().position(|word| *word == target)
}

fn main() {
    let words = ["rust", "ownership", "borrow"];
    if let Some(index) = find_word(&words, "borrow") {
        println!("found at {index}");
    } else {
        println!("not found");
    }
}`,
            },
          ],
        },
        {
          id: "match",
          heading: "match 必须穷尽",
          html: `
            <p><code>match</code> 要求覆盖所有可能分支，编译器会替你检查遗漏。它不是一段更长的 <code>switch</code>，而是把数据的所有形状摊开，让每个分支都被认真对待。</p>
            <p>匹配时尽量使用具体变体，避免过早用 <code>_</code> 把新状态吞掉；否则以后扩展枚举时，编译器就帮不上忙了。</p>
          `,
        },
      ],
      takeaways: [
        "用结构体命名相关字段，用 impl 把行为放到数据旁边。",
        "Option 把“可能没有”编码进类型系统。",
        "match 的穷尽性检查是重构时的安全网。",
      ],
    },
    {
      slug: "modules-and-errors",
      number: "05",
      title: "模块、包与错误处理",
      partId: "abstraction",
      minutes: 12,
      lede: "用 crate 和模块组织边界，用 Result 把可恢复错误交给调用者，用 panic 处理真正的程序错误。",
      sections: [
        {
          id: "modules",
          heading: "crate、模块与可见性",
          html: `
            <p>一个 crate 是编译单元，一个 package 可以包含多个 crate。模块用 <code>mod</code> 定义，默认私有；<code>pub</code> 控制对外可见性，<code>use</code> 只是引入路径，不改变可见性。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "模块与 use",
              code: `mod library {
    pub mod books {
        pub fn count() -> usize {
            3
        }
    }

    pub fn describe() -> String {
        format!("{} 本书", books::count())
    }
}

use library::describe;

fn main() {
    println!("{}", describe());
}`,
            },
          ],
        },
        {
          id: "result",
          heading: "Result 与 ? 运算符",
          html: `
            <p>可恢复错误返回 <code>Result&lt;T, E&gt;</code>；不可恢复的程序错误才使用 <code>panic!</code>。在返回 <code>Result</code> 的函数里，<code>?</code> 会在遇到 <code>Err</code> 时提前返回，并把错误交给调用者。</p>
            <p>不要为了“看起来干净”而在库函数里直接 <code>unwrap</code>。让调用者知道可能失败，是接口设计的一部分。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "读取文件并传播错误",
              code: `use std::fs;
use std::io;

fn line_count(path: &str) -> Result<usize, io::Error> {
    let content = fs::read_to_string(path)?;
    Ok(content.lines().count())
}

fn main() {
    match line_count("notes.txt") {
        Ok(count) => println!("{count} lines"),
        Err(error) => eprintln!("读取失败: {error}"),
    }
}`,
            },
          ],
        },
        {
          id: "custom-errors",
          heading: "为领域定义错误",
          html: `
            <p>当错误需要被调用者区分时，可以为错误建立枚举并实现 <code>Display</code> 与 <code>std::error::Error</code>。小型程序也可以先用 <code>Box&lt;dyn Error&gt;</code> 汇总不同错误，等接口稳定后再细化。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "返回统一错误",
              code: `fn parse_positive(text: &str) -> Result<u32, String> {
    let value: u32 = text
        .parse()
        .map_err(|_| format!("不是数字: {text}"))?;

    if value == 0 {
        return Err("必须是正整数".into());
    }
    Ok(value)
}`,
            },
          ],
        },
      ],
      takeaways: [
        "模块默认私有，pub 是刻意公开的边界。",
        "可恢复错误用 Result；panic 留给程序确实无法继续的情况。",
        "? 让错误向上传播，而不是在每一层重复判断。",
      ],
    },
    {
      slug: "collections-and-iterators",
      number: "06",
      title: "集合、闭包与迭代器",
      partId: "abstraction",
      minutes: 13,
      lede: "Vec、String、HashMap 是日常最常用的集合；闭包和迭代器让数据变换保持组合性。",
      sections: [
        {
          id: "collections",
          heading: "三种常用集合",
          html: `
            <p><code>Vec&lt;T&gt;</code> 是可变长度数组；<code>String</code> 是 UTF-8 字符串；<code>HashMap&lt;K, V&gt;</code> 保存键值对。Rust 的所有权规则同样适用于集合：元素被移入集合后，原变量不再拥有它。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "Vec、String 与 HashMap",
              code: `use std::collections::HashMap;

fn main() {
    let mut books = vec!["Python", "Rust"];
    books.push("Java 8");
    println!("{} books", books.len());

    let mut scores = HashMap::new();
    scores.insert("Rust", 10);
    scores.entry("Rust").and_modify(|score| *score += 1);
    scores.entry("Java").or_insert(8);

    for (name, score) in &scores {
        println!("{name}: {score}");
    }
}`,
            },
          ],
        },
        {
          id: "closures",
          heading: "闭包会捕获环境",
          html: `
            <p>闭包是能捕获周围变量的匿名函数。捕获方式可以是不可变借用、可变借用或取得所有权；编译器通常能根据使用方式推断。需要把闭包传进线程等场景时，用 <code>move</code> 明确转移捕获变量的所有权。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "闭包捕获",
              code: `fn main() {
    let factor = 3;
    let scale = |value: i32| value * factor;
    println!("{}", scale(7));

    let mut count = 0;
    let mut tick = || count += 1;
    tick();
    tick();
    println!("{count}");
}`,
            },
          ],
        },
        {
          id: "iterators",
          heading: "迭代器是惰性的",
          html: `
            <p><code>map</code>、<code>filter</code> 等适配器不会立刻执行，直到遇到 <code>collect</code>、<code>sum</code>、<code>for_each</code> 这样的消费操作。除非有明确理由，否则优先返回迭代器而不是中间的 <code>Vec</code>。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "迭代器管道",
              code: `fn main() {
    let values = vec![1, 2, 3, 4, 5, 6];

    let doubled: Vec<i32> = values
        .iter()
        .filter(|value| **value % 2 == 0)
        .map(|value| value * 2)
        .collect();

    let total: i32 = doubled.iter().sum();
    println!("{doubled:?}, total = {total}");
}`,
            },
          ],
        },
      ],
      takeaways: [
        "集合拥有元素时要遵守所有权规则。",
        "闭包可以借用或取得环境中的变量；跨线程时关注 move。",
        "迭代器适配器惰性执行，消费时才会产生结果。",
      ],
    },
    {
      slug: "generics-traits-lifetimes",
      number: "07",
      title: "泛型、trait 与生命周期",
      partId: "abstraction",
      minutes: 14,
      lede: "用泛型消除重复，用 trait 描述共享行为，用生命周期标注引用之间的关系。",
      sections: [
        {
          id: "generics",
          heading: "泛型：对类型抽象",
          html: `
            <p>泛型让同一个函数或结构体服务多种类型，同时保留静态类型检查。调用时才确定具体类型，编译器再为需要的组合生成代码。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "泛型函数",
              code: `fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
    let mut largest = items[0];
    for &item in items {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    println!("{}", largest(&[3, 9, 2, 7]));
    println!("{}", largest(&['a', 'z', 'k']));
}`,
            },
          ],
        },
        {
          id: "traits",
          heading: "trait：描述共享行为",
          html: `
            <p>trait 定义一组方法签名，可以选择提供默认实现。它既可以用于静态分发（泛型约束），也可以通过 trait object 做动态分发。设计接口时，先问“调用者只需要什么能力”，再决定 trait 的范围。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "trait 与实现",
              code: `trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("文章：{}", self.title)
    }
}

fn print_summary(item: &impl Summary) {
    println!("{}", item.summarize());
}

fn main() {
    let article = Article {
        title: "所有权".into(),
    };
    print_summary(&article);
}`,
            },
          ],
        },
        {
          id: "lifetimes",
          heading: "生命周期：引用的有效期",
          html: `
            <p>生命周期参数描述引用之间“谁至少活多久”的关系。大多数情况下编译器会推断；只有在返回引用、结构体持有引用等边界上，才需要显式标注。</p>
            <p>生命周期不是运行时机制，它只在编译期验证引用不会超出被引用数据。不要为了避免标注而过早 <code>clone</code>；先理解关系。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "返回引用的生命周期",
              code: `fn longest<'a>(left: &'a str, right: &'a str) -> &'a str {
    if left.len() >= right.len() {
        left
    } else {
        right
    }
}

fn main() {
    let a = String::from("ownership");
    let b = String::from("borrow");
    println!("{}", longest(&a, &b));
}`,
            },
          ],
        },
      ],
      takeaways: [
        "泛型让类型参数化，trait 让能力参数化。",
        "trait 是接口设计工具，不要把所有方法都塞进一个巨型 trait。",
        "生命周期描述引用关系，目标是让编译期证明安全。",
      ],
    },
    {
      slug: "smart-pointers-and-threads",
      number: "08",
      title: "智能指针与并发",
      partId: "systems",
      minutes: 13,
      lede: "Box 把数据放到堆上，Rc 允许共享所有权，Arc 与 Mutex 把共享带到多个线程。",
      sections: [
        {
          id: "pointers",
          heading: "Box、Rc 与 RefCell",
          html: `
            <p><code>Box&lt;T&gt;</code> 提供堆分配和固定大小；递归类型必须通过间接层确定大小。<code>Rc&lt;T&gt;</code> 提供单线程内的共享所有权，计数归零时释放。<code>RefCell&lt;T&gt;</code> 把借用检查从编译期推迟到运行期，适合明确的内部可变性场景。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "用 Box 定义递归类型",
              code: `enum Tree {
    Leaf(i32),
    Branch(Box<Tree>, Box<Tree>),
}

fn sum(tree: &Tree) -> i32 {
    match tree {
        Tree::Leaf(value) => *value,
        Tree::Branch(left, right) => sum(left) + sum(right),
    }
}

fn main() {
    let tree = Tree::Branch(
        Box::new(Tree::Leaf(2)),
        Box::new(Tree::Leaf(3)),
    );
    println!("{}", sum(&tree));
}`,
            },
          ],
        },
        {
          id: "threads",
          heading: "线程与共享状态",
          html: `
            <p><code>thread::spawn</code> 创建线程，<code>move</code> 闭包把所需数据移入线程。<code>Arc&lt;Mutex&lt;T&gt;&gt;</code> 是跨线程共享可变状态的常见组合：Arc 负责共享所有权，Mutex 保证同一时刻只有一个线程修改数据。</p>
            <p>锁的作用域越短越好。持有锁期间做 I/O 或调用未知代码，容易把速度问题变成等待问题。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "Arc 与 Mutex",
              code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = Vec::new();

    for _ in 0..4 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut value = counter.lock().unwrap();
            *value += 1;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("{}", *counter.lock().unwrap());
}`,
            },
          ],
        },
        {
          id: "send-sync",
          heading: "Send 与 Sync",
          html: `
            <p>Rust 用两个标记 trait 描述线程安全：<code>Send</code> 表示值可以移动到另一个线程，<code>Sync</code> 表示引用可以安全地跨线程共享。大多数类型自动实现；<code>Rc</code> 不是线程安全的，所以跨线程共享用 <code>Arc</code>。</p>
            <p>并发设计的重点不是“能不能编译”，而是“临界区是否足够小、是否真的需要共享”。</p>
          `,
        },
      ],
      takeaways: [
        "Box 解决递归类型和堆分配，Rc 提供单线程共享。",
        "Arc + Mutex 是跨线程共享可变状态的基础组合。",
        "缩短锁的持有时间，比增加更多锁更重要。",
      ],
    },
    {
      slug: "testing-and-tooling",
      number: "09",
      title: "测试、文档与发布",
      partId: "systems",
      minutes: 11,
      lede: "把边界写进测试，用 clippy 和 rustfmt 守住一致性，再用文档与示例说明公共接口。",
      sections: [
        {
          id: "tests",
          heading: "单元测试就在文件里",
          html: `
            <p>Rust 把测试当作语言的一部分。<code>#[cfg(test)]</code> 让测试模块只在测试构建时编译；<code>#[test]</code> 标记测试函数；<code>assert_eq!</code> 在失败时打印两边值。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "src/lib.rs",
              code: `pub fn add(left: i32, right: i32) -> i32 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds_numbers() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn handles_negative_numbers() {
        assert_eq!(add(-2, 1), -1);
    }
}`,
            },
          ],
        },
        {
          id: "quality",
          heading: "把检查放进日常",
          html: `
            <p><code>cargo fmt</code> 统一格式，<code>cargo clippy</code> 检查常见错误和风格问题，<code>cargo test</code> 跑测试，<code>cargo doc</code> 生成文档。能在本地一条命令完成的检查，不要留给上线后才发现。</p>
          `,
          code: [
            {
              lang: "shell",
              label: "终端 · 质量检查",
              code: `cargo fmt --check
cargo clippy -- -D warnings
cargo test
cargo doc --open`,
            },
          ],
        },
        {
          id: "docs",
          heading: "注释解释设计，而不是重复代码",
          html: `
            <p>用 <code>///</code> 写公共 API 文档，用 <code>//!</code> 写模块级说明。文档里的 Rust 代码块会被 <code>cargo test</code> 当作示例测试，这能防止文档与实现渐渐脱节。</p>
            <p>内部注释更应该解释“为什么这样取舍”“这里有什么不变量”，而不是逐行翻译代码。</p>
          `,
        },
      ],
      takeaways: [
        "测试写在同文件里，公共行为也要有集成测试。",
        "把 fmt、clippy、test 变成提交前的固定动作。",
        "文档注释应该记录接口契约与示例。",
      ],
    },
    {
      slug: "cli-project",
      number: "10",
      title: "最终项目：命令行检索工具",
      partId: "systems",
      minutes: 16,
      lede: "把参数、文件读取、错误传播和输出组合起来，写一个类似 grep 的小工具。",
      sections: [
        {
          id: "requirements",
          heading: "先把需求写小",
          html: `
            <p>目标：接收一个关键词和一个文件路径，逐行输出包含关键词的内容，并带上行号。输入错误时返回非零退出码；读取失败时给出可读的错误信息。</p>
            <p>第一版只使用标准库，避免在还没理解生命周期和错误处理时引入复杂的参数解析依赖。等核心逻辑稳定，再考虑用 clap 改进命令行体验。</p>
          `,
          code: [
            {
              lang: "shell",
              label: "目标用法",
              code: `cargo run -- ownership notes.txt
cargo run -- rust src/main.rs`,
            },
          ],
        },
        {
          id: "implementation",
          heading: "拆成 main 与 run",
          html: `
            <p><code>main</code> 只负责解析参数、调用逻辑和决定退出方式；<code>run</code> 返回 <code>Result</code>，让错误可以通过 <code>?</code> 向上传播。这样核心逻辑可以独立测试。</p>
          `,
          code: [
            {
              lang: "rust",
              label: "src/main.rs",
              code: `use std::env;
use std::error::Error;
use std::fs;
use std::process;

fn search<'a>(query: &str, contents: &'a str) -> Vec<(usize, &'a str)> {
    contents
        .lines()
        .enumerate()
        .filter(|(_, line)| line.contains(query))
        .map(|(index, line)| (index + 1, line))
        .collect()
}

fn run(query: &str, path: &str) -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string(path)?;
    for (line_number, line) in search(query, &contents) {
        println!("{line_number}: {line}");
    }
    Ok(())
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 3 {
        eprintln!("用法: cargo run -- <关键词> <文件>");
        process::exit(2);
    }

    if let Err(error) = run(&args[1], &args[2]) {
        eprintln!("搜索失败: {error}");
        process::exit(1);
    }
}`,
            },
          ],
        },
        {
          id: "next-steps",
          heading: "下一轮可以加什么",
          html: `
            <ul>
              <li>加入 <code>--ignore-case</code> 和 <code>--invert-match</code>，练习参数组合。</li>
              <li>把 <code>search</code> 抽到 <code>lib.rs</code>，为它写单元测试。</li>
              <li>用 <code>std::path::Path</code> 支持目录遍历，并处理非 UTF-8 文件名。</li>
              <li>最后再考虑引入 clap、anyhow 等 crate，而不是一开始就依赖它们。</li>
            </ul>
            <p>这个项目的重点不是功能多少，而是把所有权、错误处理、迭代器和模块边界放进同一个真实程序里。</p>
          `,
        },
      ],
      takeaways: [
        "main 负责决定程序如何结束，run 负责返回错误。",
        "先用标准库把核心逻辑写清楚，再评估依赖。",
        "真实项目的下一步，应该由测试与使用反馈决定。",
      ],
    },
  ],
};
