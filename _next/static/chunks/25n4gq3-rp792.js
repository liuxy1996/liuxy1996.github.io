(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,48303,e=>{"use strict";var t=e.i(43476),n=e.i(22016),a=e.i(18566),r=e.i(71645),i=e.i(57675),o=e.i(1209),s=e.i(79295);let c=[{id:"rust",title:"Rust",subtitle:"系统、所有权与并发",description:"从 Cargo、类型与所有权出发，走到结构体、trait、错误处理、并发和一个命令行项目。按官方书的核心路线重新整理，尽量让每个概念都能落成可读的代码。",language:"Rust",level:"入门到进阶",sourceName:"The Rust Programming Language",sourceUrl:"https://doc.rust-lang.org/book/",sourceNote:"参考 Rust 官方书与标准库文档独立整理。官方书采用 MIT / Apache-2.0 双许可；本手册不替代原书。",parts:[{id:"foundation",title:"语言基础",eyebrow:"FOUNDATION",description:"工具链、类型、控制流，以及 Rust 最核心的所有权模型。"},{id:"abstraction",title:"抽象与组织",eyebrow:"ABSTRACTION",description:"用模块、集合、错误处理、泛型和 trait 组织真正的程序。"},{id:"systems",title:"系统与项目",eyebrow:"SYSTEMS",description:"智能指针、并发、测试，以及把知识收束成一个命令行工具。"}],chapters:[{slug:"getting-started",number:"01",title:"工具链与第一个程序",partId:"foundation",minutes:9,lede:"安装 rustup，认识 Cargo 的目录结构，然后编译并运行第一个 Rust 程序。",sections:[{id:"toolchain",heading:"一次装好工具链",html:`
            <p>Rust 的官方安装器是 <code>rustup</code>。它同时管理编译器 <code>rustc</code>、包管理与构建工具 <code>cargo</code>、格式化工具 <code>rustfmt</code> 和静态检查工具 <code>clippy</code>。</p>
            <p>安装完成后，先在终端确认版本：</p>
          `,code:[{lang:"shell",label:"终端 · 检查工具链",code:`rustup --version
rustc --version
cargo --version`}]},{id:"cargo-new",heading:"用 Cargo 创建项目",html:`
            <p><code>cargo new</code> 会生成一个可执行 crate：<code>Cargo.toml</code> 描述项目与依赖，<code>src/main.rs</code> 是程序入口。</p>
            <p>Rust 源文件以 <code>.rs</code> 结尾。入口函数固定叫 <code>main</code>；表达式末尾的分号表示丢弃返回值，而 <code>println!</code> 是宏，末尾带感叹号。</p>
          `,code:[{lang:"shell",label:"终端 · 新建与运行",code:`cargo new hello_rust
cd hello_rust
cargo run`},{lang:"rust",label:"src/main.rs",code:`fn main() {
    let name = "Rust";
    println!("你好，{name}！");
}`}]},{id:"cargo-workflow",heading:"日常使用的四个命令",html:`
            <ul>
              <li><code>cargo check</code>：只做类型检查，不生成最终二进制，速度最快。</li>
              <li><code>cargo build</code>：编译到 <code>target/debug/</code>。</li>
              <li><code>cargo run</code>：编译并运行。</li>
              <li><code>cargo build --release</code>：开启优化，用于交付。</li>
            </ul>
            <p>从今天开始，尽量让 Cargo 管理所有构建，而不是直接调用 <code>rustc</code>。</p>
          `,code:[{lang:"shell",label:"终端 · 构建流程",code:`cargo check
cargo run
cargo build --release
./target/release/hello_rust`}]}],takeaways:["rustup 管理工具链，cargo 管理项目生命周期。","程序入口是 fn main；println! 是宏而不是普通函数。","先把 cargo check / run / build --release 养成习惯。"]},{slug:"variables-and-control-flow",number:"02",title:"变量、类型与控制流",partId:"foundation",minutes:12,lede:"变量默认不可变；类型通常可以由编译器推导。用 if、loop、while 和 for 表达控制流。",sections:[{id:"variables",heading:"不可变是默认值",html:`
            <p>Rust 的 <code>let</code> 默认创建不可变变量。需要修改时加 <code>mut</code>，这会让“这里会发生状态变化”在类型层面变得显眼。</p>
            <p><strong>遮蔽</strong>（shadowing）是另一个概念：用新的 <code>let</code> 绑定同名变量，旧值被遮住，但变量可以被赋予不同类型。</p>
          `,code:[{lang:"rust",label:"变量与遮蔽",code:`fn main() {
    let count = 1;
    let count = count + 1; // 新的绑定，遮蔽旧值
    let message = count.to_string();
    println!("{message}");

    let mut score = 10;
    score += 5;
    println!("score = {score}");
}`}]},{id:"types",heading:"标量类型与复合类型",html:`
            <p>常用标量类型有整数 <code>i32</code>/<code>u64</code>、浮点 <code>f64</code>、布尔 <code>bool</code>、字符 <code>char</code>。复合类型常见的是元组与数组：元组允许元素类型不同，数组要求长度和类型固定。</p>
            <p>类型推断不是魔法。边界不清楚时，显式标注能让编译器更早帮你检查。</p>
          `,code:[{lang:"rust",label:"类型与解构",code:`fn main() {
    let width: u32 = 12;
    let ratio = 0.75; // 推断为 f64
    let pair = (width, ratio);
    let (w, r) = pair;
    let numbers = [1, 2, 3, 4];

    println!("{w} \xd7 {r}, first = {}", numbers[0]);
}`}]},{id:"control-flow",heading:"控制流也是表达式",html:`
            <p><code>if</code>、<code>match</code>、块都可以产生值。循环支持 <code>loop</code>、<code>while</code> 和 <code>for</code>；遍历集合时优先用 <code>for</code>，它不需要手动管理索引。</p>
          `,code:[{lang:"rust",label:"if 与 for",code:`fn main() {
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
}`}]}],takeaways:["默认不可变；需要改变时才写 mut。","shadowing 允许同名新绑定，也允许改变类型。","if 和块是表达式，for 是遍历集合的首选。"]},{slug:"ownership-and-borrowing",number:"03",title:"所有权与借用",partId:"foundation",minutes:14,lede:"谁拥有数据、谁可以借用、借用持续多久。理解这三件事，就理解了 Rust 的核心约束。",sections:[{id:"move",heading:"所有权、移动与克隆",html:`
            <p>每个值都有一个所有者。所有者离开作用域时，值被释放。把 <code>String</code> 赋给另一个变量会<strong>移动</strong>所有权，旧变量不能再使用。</p>
            <p>如果确实需要两份独立数据，用 <code>clone</code> 明确复制。像整数这样的简单类型实现了 <code>Copy</code>，赋值相当于复制，不会移动。</p>
          `,code:[{lang:"rust",label:"移动与复制",code:`fn main() {
    let original = String::from("ownership");
    let moved = original;
    // println!("{original}"); // 编译错误：值已经被移动

    let copied = 42;
    let another = copied;
    println!("{moved}, {copied}, {another}");

    let cloned = moved.clone();
    println!("{cloned}");
}`}]},{id:"borrow",heading:"借用比移动更常见",html:`
            <p>函数不需要取得所有权时，传引用即可。不可变引用 <code>&T</code> 可以同时存在多个；可变引用 <code>&mut T</code> 在同一作用域内只能有一个，而且不能与不可变引用同时使用。</p>
            <p>这些规则避免了数据竞争，也逼你提前想清楚数据的读写边界。</p>
          `,code:[{lang:"rust",label:"不可变借用",code:`fn byte_len(text: &str) -> usize {
    text.len()
}

fn main() {
    let title = String::from("The Rust Book");
    let len = byte_len(&title);
    println!("{title}: {len} bytes");
}`},{lang:"rust",label:"可变借用",code:`fn append_mark(text: &mut String) {
    text.push_str(" ✔");
}

fn main() {
    let mut note = String::from("所有权");
    append_mark(&mut note);
    println!("{note}");
}`}]},{id:"rules",heading:"记住这三条规则",html:`
            <ul>
              <li>值只有一个所有者；所有者离开作用域，值被释放。</li>
              <li>可以同时存在多个不可变引用。</li>
              <li>可变引用必须独占；不能与任何其他引用同时存在。</li>
            </ul>
            <p>遇到借用错误时，不要先找“怎么绕过编译器”。先找出两个引用同时需要数据的真实原因，再调整作用域或数据结构。</p>
          `}],takeaways:["String 赋值默认是移动；需要两份数据时显式 clone。","传引用而不是传所有权，是 Rust 的常见习惯。","可变借用必须独占，这条规则是内存安全的基础。"]},{slug:"structs-and-enums",number:"04",title:"结构体、枚举与模式匹配",partId:"foundation",minutes:13,lede:"用结构体给数据命名，用枚举表达“几种可能”，再用 match 把所有分支处理完整。",sections:[{id:"structs",heading:"结构体与方法",html:`
            <p>结构体把相关字段组织成一个有名字的值。<code>impl</code> 块可以定义方法；第一个参数是 <code>&self</code> 时表示只借用当前实例。</p>
          `,code:[{lang:"rust",label:"结构体与 impl",code:`struct Book {
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
        format!("{} \xb7 {} 章", self.title, self.chapters)
    }
}

fn main() {
    let book = Book::new("Rust", 10);
    println!("{}", book.label());
}`}]},{id:"enums",heading:"枚举表达状态",html:`
            <p>枚举的每个变体可以携带不同类型的数据。和结构体一样，枚举也可以拥有方法。<code>Option&lt;T&gt;</code> 是标准库最重要的枚举之一：它不是“空值”，而是把“可能没有”写进类型。</p>
          `,code:[{lang:"rust",label:"enum 与 match",code:`enum ReadingState {
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
}`},{lang:"rust",label:"Option 与 if let",code:`fn find_word(words: &[&str], target: &str) -> Option<usize> {
    words.iter().position(|word| *word == target)
}

fn main() {
    let words = ["rust", "ownership", "borrow"];
    if let Some(index) = find_word(&words, "borrow") {
        println!("found at {index}");
    } else {
        println!("not found");
    }
}`}]},{id:"match",heading:"match 必须穷尽",html:`
            <p><code>match</code> 要求覆盖所有可能分支，编译器会替你检查遗漏。它不是一段更长的 <code>switch</code>，而是把数据的所有形状摊开，让每个分支都被认真对待。</p>
            <p>匹配时尽量使用具体变体，避免过早用 <code>_</code> 把新状态吞掉；否则以后扩展枚举时，编译器就帮不上忙了。</p>
          `}],takeaways:["用结构体命名相关字段，用 impl 把行为放到数据旁边。","Option 把“可能没有”编码进类型系统。","match 的穷尽性检查是重构时的安全网。"]},{slug:"modules-and-errors",number:"05",title:"模块、包与错误处理",partId:"abstraction",minutes:12,lede:"用 crate 和模块组织边界，用 Result 把可恢复错误交给调用者，用 panic 处理真正的程序错误。",sections:[{id:"modules",heading:"crate、模块与可见性",html:`
            <p>一个 crate 是编译单元，一个 package 可以包含多个 crate。模块用 <code>mod</code> 定义，默认私有；<code>pub</code> 控制对外可见性，<code>use</code> 只是引入路径，不改变可见性。</p>
          `,code:[{lang:"rust",label:"模块与 use",code:`mod library {
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
}`}]},{id:"result",heading:"Result 与 ? 运算符",html:`
            <p>可恢复错误返回 <code>Result&lt;T, E&gt;</code>；不可恢复的程序错误才使用 <code>panic!</code>。在返回 <code>Result</code> 的函数里，<code>?</code> 会在遇到 <code>Err</code> 时提前返回，并把错误交给调用者。</p>
            <p>不要为了“看起来干净”而在库函数里直接 <code>unwrap</code>。让调用者知道可能失败，是接口设计的一部分。</p>
          `,code:[{lang:"rust",label:"读取文件并传播错误",code:`use std::fs;
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
}`}]},{id:"custom-errors",heading:"为领域定义错误",html:`
            <p>当错误需要被调用者区分时，可以为错误建立枚举并实现 <code>Display</code> 与 <code>std::error::Error</code>。小型程序也可以先用 <code>Box&lt;dyn Error&gt;</code> 汇总不同错误，等接口稳定后再细化。</p>
          `,code:[{lang:"rust",label:"返回统一错误",code:`fn parse_positive(text: &str) -> Result<u32, String> {
    let value: u32 = text
        .parse()
        .map_err(|_| format!("不是数字: {text}"))?;

    if value == 0 {
        return Err("必须是正整数".into());
    }
    Ok(value)
}`}]}],takeaways:["模块默认私有，pub 是刻意公开的边界。","可恢复错误用 Result；panic 留给程序确实无法继续的情况。","? 让错误向上传播，而不是在每一层重复判断。"]},{slug:"collections-and-iterators",number:"06",title:"集合、闭包与迭代器",partId:"abstraction",minutes:13,lede:"Vec、String、HashMap 是日常最常用的集合；闭包和迭代器让数据变换保持组合性。",sections:[{id:"collections",heading:"三种常用集合",html:`
            <p><code>Vec&lt;T&gt;</code> 是可变长度数组；<code>String</code> 是 UTF-8 字符串；<code>HashMap&lt;K, V&gt;</code> 保存键值对。Rust 的所有权规则同样适用于集合：元素被移入集合后，原变量不再拥有它。</p>
          `,code:[{lang:"rust",label:"Vec、String 与 HashMap",code:`use std::collections::HashMap;

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
}`}]},{id:"closures",heading:"闭包会捕获环境",html:`
            <p>闭包是能捕获周围变量的匿名函数。捕获方式可以是不可变借用、可变借用或取得所有权；编译器通常能根据使用方式推断。需要把闭包传进线程等场景时，用 <code>move</code> 明确转移捕获变量的所有权。</p>
          `,code:[{lang:"rust",label:"闭包捕获",code:`fn main() {
    let factor = 3;
    let scale = |value: i32| value * factor;
    println!("{}", scale(7));

    let mut count = 0;
    let mut tick = || count += 1;
    tick();
    tick();
    println!("{count}");
}`}]},{id:"iterators",heading:"迭代器是惰性的",html:`
            <p><code>map</code>、<code>filter</code> 等适配器不会立刻执行，直到遇到 <code>collect</code>、<code>sum</code>、<code>for_each</code> 这样的消费操作。除非有明确理由，否则优先返回迭代器而不是中间的 <code>Vec</code>。</p>
          `,code:[{lang:"rust",label:"迭代器管道",code:`fn main() {
    let values = vec![1, 2, 3, 4, 5, 6];

    let doubled: Vec<i32> = values
        .iter()
        .filter(|value| **value % 2 == 0)
        .map(|value| value * 2)
        .collect();

    let total: i32 = doubled.iter().sum();
    println!("{doubled:?}, total = {total}");
}`}]}],takeaways:["集合拥有元素时要遵守所有权规则。","闭包可以借用或取得环境中的变量；跨线程时关注 move。","迭代器适配器惰性执行，消费时才会产生结果。"]},{slug:"generics-traits-lifetimes",number:"07",title:"泛型、trait 与生命周期",partId:"abstraction",minutes:14,lede:"用泛型消除重复，用 trait 描述共享行为，用生命周期标注引用之间的关系。",sections:[{id:"generics",heading:"泛型：对类型抽象",html:`
            <p>泛型让同一个函数或结构体服务多种类型，同时保留静态类型检查。调用时才确定具体类型，编译器再为需要的组合生成代码。</p>
          `,code:[{lang:"rust",label:"泛型函数",code:`fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
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
}`}]},{id:"traits",heading:"trait：描述共享行为",html:`
            <p>trait 定义一组方法签名，可以选择提供默认实现。它既可以用于静态分发（泛型约束），也可以通过 trait object 做动态分发。设计接口时，先问“调用者只需要什么能力”，再决定 trait 的范围。</p>
          `,code:[{lang:"rust",label:"trait 与实现",code:`trait Summary {
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
}`}]},{id:"lifetimes",heading:"生命周期：引用的有效期",html:`
            <p>生命周期参数描述引用之间“谁至少活多久”的关系。大多数情况下编译器会推断；只有在返回引用、结构体持有引用等边界上，才需要显式标注。</p>
            <p>生命周期不是运行时机制，它只在编译期验证引用不会超出被引用数据。不要为了避免标注而过早 <code>clone</code>；先理解关系。</p>
          `,code:[{lang:"rust",label:"返回引用的生命周期",code:`fn longest<'a>(left: &'a str, right: &'a str) -> &'a str {
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
}`}]}],takeaways:["泛型让类型参数化，trait 让能力参数化。","trait 是接口设计工具，不要把所有方法都塞进一个巨型 trait。","生命周期描述引用关系，目标是让编译期证明安全。"]},{slug:"smart-pointers-and-threads",number:"08",title:"智能指针与并发",partId:"systems",minutes:13,lede:"Box 把数据放到堆上，Rc 允许共享所有权，Arc 与 Mutex 把共享带到多个线程。",sections:[{id:"pointers",heading:"Box、Rc 与 RefCell",html:`
            <p><code>Box&lt;T&gt;</code> 提供堆分配和固定大小；递归类型必须通过间接层确定大小。<code>Rc&lt;T&gt;</code> 提供单线程内的共享所有权，计数归零时释放。<code>RefCell&lt;T&gt;</code> 把借用检查从编译期推迟到运行期，适合明确的内部可变性场景。</p>
          `,code:[{lang:"rust",label:"用 Box 定义递归类型",code:`enum Tree {
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
}`}]},{id:"threads",heading:"线程与共享状态",html:`
            <p><code>thread::spawn</code> 创建线程，<code>move</code> 闭包把所需数据移入线程。<code>Arc&lt;Mutex&lt;T&gt;&gt;</code> 是跨线程共享可变状态的常见组合：Arc 负责共享所有权，Mutex 保证同一时刻只有一个线程修改数据。</p>
            <p>锁的作用域越短越好。持有锁期间做 I/O 或调用未知代码，容易把速度问题变成等待问题。</p>
          `,code:[{lang:"rust",label:"Arc 与 Mutex",code:`use std::sync::{Arc, Mutex};
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
}`}]},{id:"send-sync",heading:"Send 与 Sync",html:`
            <p>Rust 用两个标记 trait 描述线程安全：<code>Send</code> 表示值可以移动到另一个线程，<code>Sync</code> 表示引用可以安全地跨线程共享。大多数类型自动实现；<code>Rc</code> 不是线程安全的，所以跨线程共享用 <code>Arc</code>。</p>
            <p>并发设计的重点不是“能不能编译”，而是“临界区是否足够小、是否真的需要共享”。</p>
          `}],takeaways:["Box 解决递归类型和堆分配，Rc 提供单线程共享。","Arc + Mutex 是跨线程共享可变状态的基础组合。","缩短锁的持有时间，比增加更多锁更重要。"]},{slug:"testing-and-tooling",number:"09",title:"测试、文档与发布",partId:"systems",minutes:11,lede:"把边界写进测试，用 clippy 和 rustfmt 守住一致性，再用文档与示例说明公共接口。",sections:[{id:"tests",heading:"单元测试就在文件里",html:`
            <p>Rust 把测试当作语言的一部分。<code>#[cfg(test)]</code> 让测试模块只在测试构建时编译；<code>#[test]</code> 标记测试函数；<code>assert_eq!</code> 在失败时打印两边值。</p>
          `,code:[{lang:"rust",label:"src/lib.rs",code:`pub fn add(left: i32, right: i32) -> i32 {
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
}`}]},{id:"quality",heading:"把检查放进日常",html:`
            <p><code>cargo fmt</code> 统一格式，<code>cargo clippy</code> 检查常见错误和风格问题，<code>cargo test</code> 跑测试，<code>cargo doc</code> 生成文档。能在本地一条命令完成的检查，不要留给上线后才发现。</p>
          `,code:[{lang:"shell",label:"终端 · 质量检查",code:`cargo fmt --check
cargo clippy -- -D warnings
cargo test
cargo doc --open`}]},{id:"docs",heading:"注释解释设计，而不是重复代码",html:`
            <p>用 <code>///</code> 写公共 API 文档，用 <code>//!</code> 写模块级说明。文档里的 Rust 代码块会被 <code>cargo test</code> 当作示例测试，这能防止文档与实现渐渐脱节。</p>
            <p>内部注释更应该解释“为什么这样取舍”“这里有什么不变量”，而不是逐行翻译代码。</p>
          `}],takeaways:["测试写在同文件里，公共行为也要有集成测试。","把 fmt、clippy、test 变成提交前的固定动作。","文档注释应该记录接口契约与示例。"]},{slug:"cli-project",number:"10",title:"最终项目：命令行检索工具",partId:"systems",minutes:16,lede:"把参数、文件读取、错误传播和输出组合起来，写一个类似 grep 的小工具。",sections:[{id:"requirements",heading:"先把需求写小",html:`
            <p>目标：接收一个关键词和一个文件路径，逐行输出包含关键词的内容，并带上行号。输入错误时返回非零退出码；读取失败时给出可读的错误信息。</p>
            <p>第一版只使用标准库，避免在还没理解生命周期和错误处理时引入复杂的参数解析依赖。等核心逻辑稳定，再考虑用 clap 改进命令行体验。</p>
          `,code:[{lang:"shell",label:"目标用法",code:`cargo run -- ownership notes.txt
cargo run -- rust src/main.rs`}]},{id:"implementation",heading:"拆成 main 与 run",html:`
            <p><code>main</code> 只负责解析参数、调用逻辑和决定退出方式；<code>run</code> 返回 <code>Result</code>，让错误可以通过 <code>?</code> 向上传播。这样核心逻辑可以独立测试。</p>
          `,code:[{lang:"rust",label:"src/main.rs",code:`use std::env;
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
}`}]},{id:"next-steps",heading:"下一轮可以加什么",html:`
            <ul>
              <li>加入 <code>--ignore-case</code> 和 <code>--invert-match</code>，练习参数组合。</li>
              <li>把 <code>search</code> 抽到 <code>lib.rs</code>，为它写单元测试。</li>
              <li>用 <code>std::path::Path</code> 支持目录遍历，并处理非 UTF-8 文件名。</li>
              <li>最后再考虑引入 clap、anyhow 等 crate，而不是一开始就依赖它们。</li>
            </ul>
            <p>这个项目的重点不是功能多少，而是把所有权、错误处理、迭代器和模块边界放进同一个真实程序里。</p>
          `}],takeaways:["main 负责决定程序如何结束，run 负责返回错误。","先用标准库把核心逻辑写清楚，再评估依赖。","真实项目的下一步，应该由测试与使用反馈决定。"]}]},{id:"java",title:"On Java 8",subtitle:"对象、泛型、函数式与并发",description:"Bruce Eckel 在《Java 编程思想》之后写下的 Java 8 版本。这册导读按原书目录重新组织：从对象、封装、复用和多态，一路走到集合、函数式、泛型、文件、注解与并发。",language:"Java",level:"入门到进阶",author:"Bruce Eckel",sourceName:"On Java 8 · 中文在线版",sourceUrl:"https://usigned.github.io/OnJava8/#/",sourceNote:"Bruce Eckel 著，事实上的《Java 编程思想》第五版，基于 Java 8。本册是按原书目录独立整理的中文导读、概念地图与代码示例，不是原书全文转载；完整内容请阅读原书。",parts:[{id:"objects",title:"对象与语言",eyebrow:"OBJECTS & LANGUAGE",description:"从对象模型、运算符、控制流一路走到封装、复用、多态、接口与内部类。"},{id:"functional",title:"容器与函数式",eyebrow:"COLLECTIONS & FUNCTIONS",description:"集合、Lambda 与流：Java 8 如何把数据变换写得更可组合。"},{id:"types",title:"类型与工程",eyebrow:"TYPES & CRAFT",description:"异常、测试、文件、字符串、类型信息、泛型、数组、枚举与注解。"},{id:"concurrency",title:"并发",eyebrow:"CONCURRENCY",description:"任务、线程池、共享状态、CompletableFuture 与死锁。"}],chapters:[{slug:"objects",number:"01",title:"对象的概念",partId:"objects",minutes:12,lede:"先建立对象模型：状态、行为、接口、封装、复用、继承与多态，是后面所有语法的地基。",sections:[{id:"object-model",heading:"对象、类与接口",html:`
            <p>对象把状态和行为放在同一个边界里；类描述这类对象共同的字段和方法；接口描述外部真正依赖的能力。写类时最重要的问题不是“能不能复用”，而是“谁需要知道它”。</p>
            <p>把这几个词分开看，后面的封装、继承和多态就不会变成记忆负担。</p>
          `,code:[{lang:"java",label:"一个最小的对象",code:`class Book {
    private final String title;
    private int chapter;

    Book(String title) {
        this.title = title;
    }

    void readTo(int chapter) {
        this.chapter = chapter;
    }

    String summary() {
        return title + " \xb7 第 " + chapter + " 章";
    }
}`}]},{id:"reuse-polymorphism",heading:"复用、继承与多态",html:`
            <p>组合表示“有一个”，继承表示“是一种”。组合通常更灵活；继承的价值在于让调用者只依赖父类型，而具体行为由子类决定，这就是多态。</p>
            <p>不要为了共享几行代码就继承。先问：子类型是否真的可以被父类型替换？这个判断比“代码像不像”更重要。</p>
          `,code:[{lang:"java",label:"父类型引用，子类型行为",code:`class LibraryItem {
    String label() {
        return "馆藏";
    }
}

class Book extends LibraryItem {
    @Override
    String label() {
        return "书籍";
    }
}

LibraryItem item = new Book();
System.out.println(item.label()); // 书籍`}]}],takeaways:["类负责一个边界内的状态与行为，接口描述外部依赖的能力。","组合优先于继承；继承的前提是子类型真的可以替代父类型。","多态让调用者依赖抽象，让变化留在实现里。"]},{slug:"installing",number:"02",title:"安装 Java 与本书用例",partId:"objects",minutes:7,lede:"准备 JDK，理解 javac 与 java 的分工，跑起一个带包名的示例。",sections:[{id:"toolchain",heading:"JDK、javac 与 java",html:`
            <p>JDK 包含编译器、JVM 和标准库。源码由 <code>javac</code> 编译成 <code>.class</code> 字节码，再由 <code>java</code> 启动 JVM 执行。Java 8 已经结束公开更新；学习本书的示例时建议使用当前 LTS，遇到版本差异再切换。</p>
          `,code:[{lang:"shell",label:"终端 · 检查与运行",code:`javac -version
java -version
javac Hello.java
java Hello`}]},{id:"packages",heading:"包、目录与示例代码",html:`
            <p>包名对应目录，也提供了命名空间。原书示例通常按章节组织包。自己练习时先保持一个清晰的目录结构，再考虑构建工具。</p>
          `,code:[{lang:"java",label:"chapter01/Hello.java",code:`package chapter01;

public class Hello {
    public static void main(String[] args) {
        System.out.println("On Java 8");
    }
}`}]}],takeaways:["javac 负责编译，java 负责启动 JVM 执行字节码。","包名应和目录一致，避免类名冲突。","Java 8 是学习基线，不代表生产中必须使用旧版本。"]},{slug:"objects-everywhere",number:"03",title:"万物皆对象",partId:"objects",minutes:10,lede:"引用与对象是两件事。理解 new、字段、方法、作用域和垃圾回收，才能读懂 Java 的内存模型。",sections:[{id:"references",heading:"引用指向对象",html:`
            <p>基本类型直接保存值，引用类型保存对象的地址。声明一个引用并不会自动创建对象；<code>new</code> 才会分配对象。两个引用可以指向同一个对象，这一点在集合、参数传递和并发里都非常关键。</p>
          `,code:[{lang:"java",label:"引用与对象",code:`Book first = new Book("On Java 8");
Book second = first;          // 同一个对象
second = new Book("Rust");    // second 指向新对象

System.out.println(first.title());  // On Java 8
System.out.println(second.title()); // Rust`}]},{id:"members",heading:"字段、方法与 static",html:`
            <p>字段属于对象实例，<code>static</code> 成员属于类。实例方法可以访问实例和静态成员；静态方法只能直接访问静态成员。对象离开所有可达引用后才会被垃圾回收器回收，程序员不负责手动释放。</p>
          `,code:[{lang:"java",label:"实例成员与静态成员",code:`class Reading {
    static int totalRead = 0;
    String title;

    Reading(String title) {
        this.title = title;
        totalRead++;
    }

    static int total() {
        return totalRead;
    }
}`}]}],takeaways:["引用不是对象；new 才创建对象。","static 属于类，实例字段属于每一个对象。","Java 用可达性分析管理对象生命周期，不手动 free。"]},{slug:"operators",number:"04",title:"运算符",partId:"objects",minutes:9,lede:"运算符的优先级、整数除法、类型转换和引用赋值，比记住符号表更值得花时间。",sections:[{id:"arithmetic",heading:"算术、关系与逻辑",html:`
            <p>整数除法会截断小数；<code>++</code> 和 <code>--</code> 的前后位置会改变表达式结果。关系运算返回 <code>boolean</code>，逻辑运算支持短路：<code>&amp;&amp;</code> 左侧为 false 时不再计算右侧。</p>
          `,code:[{lang:"java",label:"几个容易混淆的表达式",code:`int a = 7;
int b = 2;
System.out.println(a / b);   // 3
System.out.println(a % b);   // 1

int i = 1;
System.out.println(i++);     // 1
System.out.println(i);       // 2

boolean ok = false && expensive(); // 短路，不会调用`}]},{id:"casts",heading:"引用赋值与类型转换",html:`
            <p>基本类型转换可能丢失精度，必须显式写窄化转换。引用赋值只是在复制地址；如果对象本身可变，两个引用会看到同一处状态变化。Java 没有 <code>sizeof</code>，对象布局由 JVM 决定。</p>
          `,code:[{lang:"java",label:"窄化与引用别名",code:`double ratio = 3.9;
int rounded = (int) ratio; // 3

int[] first = {1, 2, 3};
int[] second = first;      // 同一个数组对象
second[0] = 99;

System.out.println(first[0]); // 99`}]}],takeaways:["整数除法截断，取模与浮点除法不是一回事。","逻辑运算符短路；不要把有副作用的调用放在右侧。","引用赋值共享对象，需要副本时显式复制。"]},{slug:"control-flow",number:"05",title:"控制流",partId:"objects",minutes:8,lede:"if、循环、for-in 与 switch 决定代码按什么顺序执行；顺序本身就是设计的一部分。",sections:[{id:"loops",heading:"条件与循环",html:`
            <p>循环适合重复，<code>break</code> 结束整个循环，<code>continue</code> 跳过本次。Java 的 <code>for-in</code> 只能读取，不能直接修改基本类型元素；需要索引时用普通 <code>for</code>。</p>
          `,code:[{lang:"java",label:"for 与 for-in",code:`for (int n = 1; n <= 15; n++) {
    if (n % 15 == 0) {
        System.out.println("FizzBuzz");
    } else if (n % 3 == 0) {
        System.out.println("Fizz");
    } else if (n % 5 == 0) {
        System.out.println("Buzz");
    } else {
        System.out.println(n);
    }
}

for (String name : new String[]{"Rust", "Java"}) {
    System.out.println(name);
}`}]},{id:"switch",heading:"switch 与没有 goto 的跳转",html:`
            <p>Java 的 <code>switch</code> 支持整数、字符、枚举和字符串（Java 7 起）。每个分支要小心忘记 <code>break</code>。Java 没有 C 的 <code>goto</code>，带标签的 <code>break</code>/<code>continue</code> 可以做受限的跳转。</p>
          `,code:[{lang:"java",label:"switch 字符串",code:`String language = "java";

switch (language) {
    case "java":
        System.out.println("JVM");
        break;
    case "rust":
        System.out.println("LLVM");
        break;
    default:
        System.out.println("unknown");
}`}]}],takeaways:["for-in 适合遍历，索引循环适合需要位置的操作。","break 结束循环，continue 跳到下一次迭代。","switch 的贯穿是特性也是陷阱，按意图显式 break。"]},{slug:"initialization",number:"06",title:"初始化和清理",partId:"objects",minutes:12,lede:"构造器保证对象可用，初始化顺序决定你看到什么，垃圾回收让清理不再是显式 free。",sections:[{id:"constructors",heading:"构造器、重载与 this",html:`
            <p>构造器与类同名、没有返回类型。重载让同一个类拥有不同的初始化方式；<code>this</code> 既指向当前对象，也可以调用另一个构造器。不要在一个构造器里做过多 I/O 或启动线程。</p>
          `,code:[{lang:"java",label:"构造器重载",code:`class Book {
    private final String title;
    private final int chapters;

    Book(String title) {
        this(title, 1);
    }

    Book(String title, int chapters) {
        this.title = title;
        this.chapters = chapters;
    }
}`}]},{id:"order",heading:"初始化顺序与数组",html:`
            <p>类加载时先执行静态初始化，再执行实例初始化，最后执行构造器。局部变量必须先赋值才能使用；数组元素会获得默认值。理解顺序，可以避免“为什么这里还是 0”。</p>
          `,code:[{lang:"java",label:"初始化顺序",code:`class Demo {
    static { System.out.println("static"); }
    { System.out.println("instance"); }
    Demo() { System.out.println("constructor"); }
}

new Demo();
// static
// instance
// constructor`}]}],takeaways:["构造器保证对象进入可用状态；重载表达不同的初始化方式。","静态初始化先于实例初始化，再进入构造器。","数组元素默认初始化；对象仍由 GC 负责回收。"]},{slug:"encapsulation",number:"07",title:"封装",partId:"objects",minutes:8,lede:"把可变状态关进类里，只暴露需要的操作，让包和访问修饰符成为真实的边界。",sections:[{id:"access",heading:"包与访问权限",html:`
            <p>Java 有四层访问：<code>private</code>、包级默认、<code>protected</code> 和 <code>public</code>。优先让字段私有，把校验放在 setter 或构造器里。包不是装饰，它是代码的组织边界。</p>
          `,code:[{lang:"java",label:"受控的读取进度",code:`class Reading {
    private int chapter;

    public void readTo(int chapter) {
        if (chapter < 0) {
            throw new IllegalArgumentException("chapter >= 0");
        }
        this.chapter = chapter;
    }

    public int chapter() {
        return chapter;
    }
}`}]},{id:"boundary",heading:"接口和实现分开",html:`
            <p>封装不只是 private。调用者依赖 public API，而不是内部集合、字段和临时实现。这样你才能替换数据结构、加入缓存或改变算法，而不破坏外部代码。</p>
            <p>类级别的访问权限同样重要：只被同一包使用的辅助类，不需要变成 public。</p>
          `}],takeaways:["字段默认私有；公开的是经过设计的行为。","包级访问是隐藏实现细节的实用工具。","封装的目标是允许实现变化，而不是制造仪式。"]},{slug:"reuse",number:"08",title:"复用",partId:"objects",minutes:11,lede:"组合、继承、委托和 final：复用的四种工具，各自适合不同的关系。",sections:[{id:"composition",heading:"组合与委托",html:`
            <p>组合把已有对象作为字段，委托是把请求转给它。Car 有一个 Engine，而不是 Car 是一种 Engine。组合不会把父类的所有接口暴露给外部，通常更容易替换和测试。</p>
          `,code:[{lang:"java",label:"组合一个引擎",code:`class Engine {
    void start() {
        System.out.println("engine started");
    }
}

class Car {
    private final Engine engine = new Engine();

    void start() {
        engine.start();
    }
}`}]},{id:"inheritance",heading:"继承、protected 与 final",html:`
            <p>继承表达“是一种”，并允许向上转型。子类构造器会先调用父类构造器；<code>protected</code> 让子类可以访问，但不要把它当成随手可用的 public。<code>final</code> 可以固定字段、方法或类，用来表达设计意图。</p>
          `,code:[{lang:"java",label:"继承与 final",code:`class Machine {
    final void start() {
        System.out.println("start");
    }
}

class Printer extends Machine {
    // 不能覆盖 final 的 start()
}`}]}],takeaways:["组合表达“有一个”，继承表达“是一种”。","委托适合把行为转发给内部对象，而不暴露它的全部接口。","final 是设计约束，不只是性能开关。"]},{slug:"polymorphism",number:"09",title:"多态",partId:"objects",minutes:11,lede:"向上转型之后，调用的方法仍由对象的真实类型决定；这是 Java 动态绑定的核心。",sections:[{id:"dynamic-dispatch",heading:"向上转型与动态绑定",html:`
            <p>父类引用可以指向子类对象。调用被覆盖的方法时，JVM 会根据对象的实际类型找到实现，而不是看引用声明。调用者因此只依赖父类的接口。</p>
          `,code:[{lang:"java",label:"同一接口，不同实现",code:`abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

class Square extends Shape {
    double side;

    Square(double side) {
        this.side = side;
    }

    @Override
    double area() {
        return side * side;
    }
}

Shape shape = new Circle(2);
System.out.println(shape.area());`}]},{id:"constructors",heading:"构造器与多态",html:`
            <p>构造器不是多态方法。父类构造器执行时，子类字段还没有完成初始化；如果在父类构造器里调用会被覆盖的方法，可能看到默认值。把复杂初始化放到构造器之后，或者用工厂方法组织。</p>
            <p>返回类型协变允许子类覆盖方法时返回更具体的类型；设计继承时，优先保证父类型的语义真的成立。</p>
          `}],takeaways:["父类型引用调用被覆盖的方法，会执行子类实现。","不要在父类构造器里调用可被覆盖的方法。","多态的价值是依赖接口而不是具体类型。"]},{slug:"interfaces",number:"10",title:"接口",partId:"objects",minutes:10,lede:"接口把“能做什么”从“怎么实现”里分离出来；抽象类则适合共享部分实现和状态。",sections:[{id:"abstract-and-interface",heading:"抽象类与接口",html:`
            <p>抽象类可以带字段和已实现的方法，适合一组关系紧密的类型；接口定义能力，一个类可以实现多个。接口字段隐式 <code>public static final</code>，方法在 Java 8 中可以有 <code>default</code> 和 <code>static</code> 实现。</p>
          `,code:[{lang:"java",label:"接口与抽象类",code:`abstract class Repository {
    abstract List<String> all();

    boolean isEmpty() {
        return all().isEmpty();
    }
}

interface Searchable {
    List<String> search(String keyword);
}

class BookRepository extends Repository implements Searchable {
    @Override
    List<String> all() {
        return Arrays.asList("On Java 8");
    }

    @Override
    public List<String> search(String keyword) {
        return all().stream()
            .filter(title -> title.contains(keyword))
            .collect(Collectors.toList());
    }
}`}]},{id:"decoupling",heading:"解耦、适配与工厂",html:`
            <p>接口让调用者不需要知道对象的构造过程。工厂方法把“创建哪种实现”的决定留在工厂内部，适配器则把一个已有接口包装成调用者需要的形状。这两者都在降低依赖，而不是增加层数。</p>
          `,code:[{lang:"java",label:"工厂方法",code:`interface Reader {
    String read();
}

class FileReader implements Reader {
    public String read() {
        return "from file";
    }
}

class ReaderFactory {
    static Reader create() {
        return new FileReader();
    }
}`}]}],takeaways:["抽象类适合共享实现，接口适合表达能力与解耦。","默认方法与静态方法让接口可以继续演化。","工厂把构造细节移出调用者，适配器连接不兼容的接口。"]},{slug:"inner-classes",number:"11",title:"内部类",partId:"objects",minutes:10,lede:"内部类持有外部类引用，匿名类适合一次性实现，静态嵌套类则不依赖外部实例。",sections:[{id:"inner",heading:"内部类与外部类",html:`
            <p>非静态内部类实例必须依附外部类实例，可以通过 <code>Outer.this</code> 访问外部对象，通过 <code>outer.new Inner()</code> 创建。静态嵌套类没有外部实例引用，通常更容易理解和测试。</p>
          `,code:[{lang:"java",label:"内部类访问外部状态",code:`class Library {
    private final String name = "study-room";

    class Shelf {
        String label() {
            return name + " / shelf";
        }
    }
}

Library library = new Library();
Library.Shelf shelf = library.new Shelf();
System.out.println(shelf.label());`}]},{id:"anonymous",heading:"匿名类与有效 final",html:`
            <p>匿名类适合实现一个马上使用的接口，Lambda 让这种写法进一步简化（但只能用于函数式接口）。局部类和匿名类捕获的局部变量必须有效 final；需要修改的状态应该放到对象字段或并发安全的结构里。</p>
          `,code:[{lang:"java",label:"匿名 Runnable",code:`String label = "On Java 8";

Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println(label);
    }
};

task.run();`}]}],takeaways:["内部类持有外部实例；静态嵌套类不持有。","匿名类适合一次性实现，函数式接口可以改用 Lambda。","捕获局部变量必须有效 final。"]},{slug:"collections",number:"12",title:"集合",partId:"functional",minutes:13,lede:"List、Set、Map、Queue 与 Iterator 组成了 Java 的数据结构层；泛型让集合保持类型安全。",sections:[{id:"collections",heading:"List、Set 与 Map",html:`
            <p><code>ArrayList</code> 适合随机访问，<code>LinkedList</code> 适合频繁插入删除；<code>HashSet</code> 关心唯一性，<code>HashMap</code> 保存键值关系。选择容器时要看访问模式，而不是只看名字。</p>
          `,code:[{lang:"java",label:"常用集合",code:`List<String> books = new ArrayList<>();
books.add("On Java 8");
books.add("Rust");

Set<String> languages = new HashSet<>();
languages.add("Java");
languages.add("Java"); // 重复元素不会增加

Map<String, Integer> pages = new HashMap<>();
pages.put("On Java 8", 1200);
pages.put("Rust", 600);

for (Map.Entry<String, Integer> entry : pages.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}`}]},{id:"iterators",heading:"迭代器与 for-in",html:`
            <p><code>Iterator</code> 提供统一的遍历协议，<code>for-in</code> 只是它的语法糖。遍历时修改集合可能抛 <code>ConcurrentModificationException</code>，需要删除元素时用迭代器自己的 <code>remove()</code>，或先收集再修改。</p>
          `,code:[{lang:"java",label:"Iterator 安全删除",code:`Iterator<String> iterator = books.iterator();

while (iterator.hasNext()) {
    if (iterator.next().startsWith("Rust")) {
        iterator.remove();
    }
}`}]}],takeaways:["按访问模式选择集合实现，而不是按名称记忆。","Set 去重，Map 建立键值索引，Queue 组织先后顺序。","遍历中修改集合要使用迭代器或先复制。"]},{slug:"functional-programming",number:"13",title:"函数式编程",partId:"functional",minutes:13,lede:"Lambda 让函数成为值，函数式接口描述函数形状，纯函数与不可变数据让组合变得可靠。",sections:[{id:"lambdas",heading:"Lambda 与函数式接口",html:`
            <p>函数式接口只有一个抽象方法，Lambda 是它的简洁实现。<code>Function</code>、<code>Predicate</code>、<code>Consumer</code>、<code>Supplier</code> 是常用形状。Lambda 捕获的局部变量必须有效 final。</p>
          `,code:[{lang:"java",label:"函数是值",code:`Function<String, Integer> length = String::length;
Predicate<String> empty = String::isEmpty;
Consumer<String> printer = System.out::println;
Supplier<List<String>> factory = ArrayList::new;

System.out.println(length.apply("On Java 8")); // 9
System.out.println(empty.test(""));            // true
printer.accept(factory.get().toString());`}]},{id:"composition",heading:"高阶函数、组合与纯函数",html:`
            <p>高阶函数接收或返回函数。<code>andThen</code>、<code>compose</code> 可以把小函数拼起来；柯里化把多参数函数拆成一串单参数函数。纯函数没有副作用，输出只依赖输入，这让测试和并行都更容易。</p>
          `,code:[{lang:"java",label:"函数组合",code:`Function<Integer, Integer> doubleIt = n -> n * 2;
Function<Integer, Integer> plusOne = n -> n + 1;

Function<Integer, Integer> pipeline = doubleIt.andThen(plusOne);
System.out.println(pipeline.apply(3)); // 7

Function<String, String> normalize = String::trim;
Function<String, String> upper = String::toUpperCase;
System.out.println(normalize.andThen(upper).apply("  java  "));`}]}],takeaways:["Lambda 的目标类型必须是函数式接口。","方法引用适合直接转发，函数组合适合搭建小型管道。","优先写纯函数，副作用留在程序边界。"]},{slug:"streams",number:"14",title:"流式编程",partId:"functional",minutes:14,lede:"Stream 把集合变换拆成源、中间操作和终止操作，并用惰性求值把计算推迟到真正需要时。",sections:[{id:"pipeline",heading:"流的管道",html:`
            <p>Stream 不存储数据，也不能重复消费。<code>map</code>、<code>filter</code>、<code>sorted</code> 是中间操作；<code>collect</code>、<code>count</code>、<code>forEach</code> 是终止操作。没有终止操作，管道不会执行。</p>
          `,code:[{lang:"java",label:"过滤、映射与收集",code:`List<String> titles = Arrays.asList("On Java 8", "Rust", "Go");

List<String> result = titles.stream()
    .filter(title -> title.length() > 2)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

System.out.println(result);`}]},{id:"optional-terminal",heading:"Optional 与终止操作",html:`
            <p>需要“可能没有结果”时，返回 <code>Optional</code>，而不是 null 或抛异常。Stream 的 <code>findFirst</code> 返回 Optional。<code>reduce</code> 折叠值，<code>collect</code> 交给 Collector。并行流只适合无状态、计算密集、数据量足够大的场景。</p>
          `,code:[{lang:"java",label:"Optional 与 reduce",code:`Optional<String> first = titles.stream()
    .filter(title -> title.startsWith("R"))
    .findFirst();

System.out.println(first.orElse("none"));

int total = IntStream.rangeClosed(1, 10)
    .reduce(0, Integer::sum);`}]}],takeaways:["Stream 是一次性管道，终止操作才触发计算。","Optional 表达“可能没有”，不要直接 get()。","并行流不是性能开关，先测量再使用。"]},{slug:"exceptions",number:"15",title:"异常",partId:"types",minutes:11,lede:"异常把正常路径和失败路径分开；捕获、传播、自定义和资源清理都需要明确边界。",sections:[{id:"catching",heading:"异常模型与捕获",html:`
            <p>异常是对象，可以携带信息和 cause。<code>try/catch/finally</code> 中 finally 总会执行，适合清理资源。受检异常要求调用者显式处理；运行时异常通常表示编程错误。catch 应该从具体到宽泛。</p>
          `,code:[{lang:"java",label:"捕获并保留 cause",code:`try {
    int value = Integer.parseInt("not-a-number");
    System.out.println(value);
} catch (NumberFormatException error) {
    System.err.println("输入不是数字: " + error.getMessage());
} finally {
    System.out.println("done");
}`}]},{id:"custom",heading:"自定义异常与 try-with-resources",html:`
            <p>自定义异常应该说明业务语义，并在构造函数里保留 cause。<code>try-with-resources</code> 自动关闭实现了 <code>AutoCloseable</code> 的资源，即使 try 块抛出异常也不会漏掉关闭。</p>
          `,code:[{lang:"java",label:"自定义异常",code:`class BookNotFoundException extends Exception {
    BookNotFoundException(String title, Throwable cause) {
        super("找不到书籍: " + title, cause);
    }
}

try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.readLine();
}`}]}],takeaways:["异常让失败路径显式化；保留 cause 才能定位根因。","finally 和 try-with-resources 负责资源释放。","自定义异常用于业务语义，不要把所有异常都包成同一种。"]},{slug:"validating-code",number:"16",title:"代码校验",partId:"types",minutes:10,lede:"测试、断言、日志、基准与重构：让代码在变化中仍然可信。",sections:[{id:"tests",heading:"测试与 TDD",html:`
            <p>测试不是证明程序没错，而是锁定你已经理解的行为。JUnit 的 <code>@Test</code>、<code>assertEquals</code> 是最小工具；TDD 用失败测试驱动设计。先写一个会失败的用例，再写刚好让它通过的实现。</p>
          `,code:[{lang:"java",label:"一个 JUnit 4 测试",code:`public class PriceTest {
    @Test
    public void addsTax() {
        Price price = new Price(100);
        assertEquals(110, price.withTax(0.1), 0.001);
    }
}`}]},{id:"observability",heading:"日志、调试与基准",html:`
            <p>日志记录上下文，不是把变量到处打印。基准测试要隔离 JIT、预热和测量误差，不能拿一次 <code>System.currentTimeMillis</code> 当结论。发现性能问题前先分析，不要凭直觉重构。</p>
          `,code:[{lang:"shell",label:"终端 · 工程检查",code:`./gradlew test
./gradlew check
./gradlew jmh`}]}],takeaways:["测试表达行为契约，失败测试是设计反馈。","日志记录上下文，调试器观察状态，基准工具量化性能。","重构应在测试保护下进行，先定位再优化。"]},{slug:"files",number:"17",title:"文件",partId:"types",minutes:11,lede:"用 Path 与 Files 处理路径、目录、读写和文件树，比起手写流更安全、更清晰。",sections:[{id:"paths",heading:"Path 与目录",html:`
            <p><code>Path</code> 表示路径，不保证文件存在；<code>Files</code> 提供创建、删除、复制、移动和查询属性的静态方法。相对路径要配合工作目录理解，部署时最好使用显式基准目录。</p>
          `,code:[{lang:"java",label:"目录与文件",code:`Path dir = Paths.get("notes");
Files.createDirectories(dir);

Path file = dir.resolve("java.md");
Files.write(file, "# On Java 8
".getBytes(StandardCharsets.UTF_8));

System.out.println(Files.exists(file));
System.out.println(Files.size(file));`}]},{id:"walk",heading:"遍历、查找与读写",html:`
            <p><code>Files.walk</code> 返回文件树流，记得在 try-with-resources 中关闭。<code>Files.lines</code> 按行懒加载，适合大文件；一次性 <code>readAllLines</code> 只适合小文件。</p>
          `,code:[{lang:"java",label:"按扩展名查找",code:`try (Stream<Path> paths = Files.walk(Paths.get("."))) {
    paths.filter(path -> path.toString().endsWith(".java"))
         .limit(10)
         .forEach(System.out::println);
}`}]}],takeaways:["Path 是路径抽象，Files 提供实际操作。","文件树流需要关闭；大文件优先按行读取。","读写时明确字符集与工作目录。"]},{slug:"strings",number:"18",title:"字符串",partId:"types",minutes:10,lede:"String 不可变，拼接会产生新对象；StringBuilder、格式化和正则让文本处理更可控。",sections:[{id:"immutable",heading:"不可变与 StringBuilder",html:`
            <p>String 对象不可变，所谓“修改”其实是创建新对象。循环中不断用 <code>+</code> 拼接会产生大量中间对象，此时用 <code>StringBuilder</code>。注意不要在 <code>toString</code> 里递归调用自己。</p>
          `,code:[{lang:"java",label:"StringBuilder",code:`StringBuilder builder = new StringBuilder();
for (String title : new String[]{"On", "Java", "8"}) {
    builder.append(title).append(" ");
}
String text = builder.toString().trim();
System.out.println(text);`}]},{id:"format",heading:"格式化、正则与扫描",html:`
            <p><code>String.format</code> 适合生成固定格式文本；<code>Pattern</code>/<code>Matcher</code> 处理重复使用的正则；<code>Scanner</code> 适合从文本或输入流读取结构化 token。正则字符串里的反斜杠需要写两次。</p>
          `,code:[{lang:"java",label:"格式化与正则",code:`String row = String.format("%s | %d 章", "On Java 8", 24);
System.out.println(row);

Pattern pattern = Pattern.compile("\\\\d+");
Matcher matcher = pattern.matcher("第 24 章");
if (matcher.find()) {
    System.out.println(matcher.group());
}`}]}],takeaways:["String 不可变；频繁拼接用 StringBuilder。","正则编译一次可以复用，注意转义。","文本输入先确定编码与格式，再解析。"]},{slug:"type-information",number:"19",title:"类型信息",partId:"types",minutes:10,lede:"Class 对象、instanceof、反射和动态代理让程序在运行时检查与操作类型，也带来额外的耦合。",sections:[{id:"rtti",heading:"Class 对象与类型检测",html:`
            <p>每个已加载类型都有 Class 对象，可以通过 <code>类名.class</code>、<code>getClass()</code> 或 <code>Class.forName</code> 获得。<code>instanceof</code> 在向下转型前检查类型；Java 16 之后还支持模式匹配，但本书基线是 Java 8。</p>
          `,code:[{lang:"java",label:"运行时类型",code:`LibraryItem item = new Book();

System.out.println(item.getClass().getName());
System.out.println(item instanceof Book);

if (item instanceof Book) {
    Book book = (Book) item;
    System.out.println(book.label());
}`}]},{id:"reflection",heading:"反射与动态代理",html:`
            <p>反射允许在运行时查找方法并调用，适合框架和插件；代价是失去编译期检查、变慢，并且更难重构。动态代理在接口之上生成包装对象，适合横切逻辑，但不要用它代替清晰的接口设计。</p>
          `,code:[{lang:"java",label:"反射调用",code:`Class<?> type = Book.class;
Object instance = type.getDeclaredConstructor(String.class)
    .newInstance("On Java 8");

Method method = type.getMethod("label");
System.out.println(method.invoke(instance));`}]}],takeaways:["Class 对象描述运行时类型，instanceof 保护向下转型。","反射适合框架，不适合业务代码的日常路径。","动态代理把包装逻辑集中到接口边界。"]},{slug:"generics",number:"20",title:"泛型",partId:"types",minutes:13,lede:"泛型把类型参数化，在编译期保护集合与算法；擦除、边界和通配符决定了它的能力边界。",sections:[{id:"generic-types",heading:"泛型类、接口与方法",html:`
            <p>泛型让同一个结构服务多种类型，同时保留编译期检查。Java 的泛型通过擦除实现，运行时看不到类型参数；因此不能 <code>new T()</code>，也不能创建泛型数组。边界 <code>extends</code> 既限制类型，也让你调用边界方法。</p>
          `,code:[{lang:"java",label:"泛型方法与边界",code:`class Box<T> {
    private final T value;

    Box(T value) {
        this.value = value;
    }

    T get() {
        return value;
    }
}

static <T extends Comparable<T>> T max(T left, T right) {
    return left.compareTo(right) >= 0 ? left : right;
}

System.out.println(max("Rust", "Java"));`}]},{id:"wildcards",heading:"通配符与 PECS",html:`
            <p><code>? extends T</code> 适合读取，<code>? super T</code> 适合写入。PECS 记忆法是 Producer Extends, Consumer Super。通配符不是为了让类型更复杂，而是让 API 接受更广的调用者。</p>
          `,code:[{lang:"java",label:"读写边界",code:`static double sum(List<? extends Number> values) {
    double total = 0;
    for (Number value : values) {
        total += value.doubleValue();
    }
    return total;
}

static void addNumbers(List<? super Integer> target) {
    target.add(1);
    target.add(2);
}`}]}],takeaways:["泛型在编译期提供类型安全，运行时会被擦除。","边界既是限制，也是可调用能力的来源。","读用 extends，写用 super；不要把通配符当装饰。"]},{slug:"arrays",number:"21",title:"数组",partId:"types",minutes:10,lede:"数组长度固定、是对象、会做运行时类型检查；Arrays 工具类覆盖填充、排序、查找和流化。",sections:[{id:"array-basics",heading:"数组是对象",html:`
            <p>数组在创建时固定长度，元素有默认值。它可以作为对象传递、返回，也支持多维数组。数组知道自己的元素类型，错误类型写入会在运行时抛出 <code>ArrayStoreException</code>。</p>
          `,code:[{lang:"java",label:"数组与多维数组",code:`int[] numbers = new int[3];
numbers[0] = 7;

String[][] rows = {
    {"On Java 8", "Rust"},
    {"Python", "Go"}
};

System.out.println(rows[1][0]);`}]},{id:"arrays-utils",heading:"Arrays 工具类",html:`
            <p><code>Arrays.fill</code> 填充，<code>Arrays.sort</code> 排序，<code>Arrays.copyOf</code> 复制，<code>binarySearch</code> 要求数组已排序。<code>Arrays.stream</code> 可以把数组接入 Stream 管道。</p>
          `,code:[{lang:"java",label:"排序、复制、流",code:`int[] values = {5, 2, 8, 1};
Arrays.sort(values);

int[] copy = Arrays.copyOf(values, values.length + 2);
Arrays.fill(copy, values.length, copy.length, 0);

int sum = Arrays.stream(values).sum();
System.out.println(Arrays.toString(copy) + " / " + sum);`}]}],takeaways:["数组长度固定，是带类型检查的对象。","多维数组本质是数组的数组。","Arrays 提供填充、排序、复制、查找和流式操作。"]},{slug:"enumerations",number:"22",title:"枚举",partId:"types",minutes:9,lede:"枚举不是整数常量：它是完整的类，可以带字段、方法、接口，并用 EnumSet/EnumMap 获得类型安全集合。",sections:[{id:"enum-basics",heading:"枚举类型与方法",html:`
            <p>枚举值在类加载时创建，天然单例。可以给枚举添加构造器、字段和方法。<code>values()</code> 返回所有常量数组，<code>valueOf()</code> 按名字查找；<code>switch</code> 对枚举尤其清晰。</p>
          `,code:[{lang:"java",label:"带字段的枚举",code:`enum Level {
    BASIC(1),
    ADVANCED(2);

    private final int code;

    Level(int code) {
        this.code = code;
    }

    int code() {
        return code;
    }
}

System.out.println(Level.ADVANCED.code()); // 2`}]},{id:"enum-collections",heading:"EnumSet、EnumMap 与常量特定方法",html:`
            <p><code>EnumSet</code> 和 <code>EnumMap</code> 针对枚举优化，既省内存又表达清晰。枚举常量可以覆盖抽象方法，实现每个常量不同的行为，这比在 switch 里堆逻辑更容易扩展。</p>
          `,code:[{lang:"java",label:"EnumSet 与常量行为",code:`EnumSet<Level> plan = EnumSet.of(Level.BASIC, Level.ADVANCED);

for (Level level : plan) {
    System.out.println(level + ":" + level.code());
}

enum Operation {
    ADD {
        int apply(int a, int b) { return a + b; }
    },
    MULTIPLY {
        int apply(int a, int b) { return a * b; }
    };

    abstract int apply(int a, int b);
}`}]}],takeaways:["枚举是类型安全的类，不是 int 的别名。","EnumSet / EnumMap 针对枚举提供高效集合。","常量特定方法把行为放在常量旁边，避免巨型 switch。"]},{slug:"annotations",number:"23",title:"注解",partId:"types",minutes:9,lede:"注解把元数据写进源码，由编译器、框架或注解处理器读取；它本身不会执行任何逻辑。",sections:[{id:"syntax",heading:"定义与元注解",html:`
            <p>注解用 <code>@interface</code> 定义，可以带基本类型、String、Class、枚举、注解和数组元素。<code>@Retention</code> 决定保留到源码、字节码还是运行时，<code>@Target</code> 决定可以标注在哪里，<code>@Documented</code> 和 <code>@Inherited</code> 控制文档与继承。</p>
          `,code:[{lang:"java",label:"定义一个运行时注解",code:`@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Note {
    String value();
    int priority() default 0;
}`}]},{id:"processing",heading:"从反射到注解处理器",html:`
            <p>运行时可用的注解可以通过反射读取，适合小型测试框架或配置；编译期注解处理器可以生成代码或校验约束，适合框架作者。使用方不要依赖注解的副作用，注解只是元数据，执行逻辑在读取方。</p>
          `,code:[{lang:"java",label:"运行时读取注解",code:`@Note(value = "explain ownership", priority = 2)
public class Book {
}

Note note = Book.class.getAnnotation(Note.class);
if (note != null) {
    System.out.println(note.value() + " / " + note.priority());
}`}]}],takeaways:["注解是元数据，必须有人读取才会产生行为。","Retention 与 Target 决定注解能被用在何处、活到何时。","反射适合小型运行时读取，编译期处理器适合框架级生成。"]},{slug:"concurrency",number:"24",title:"并发编程",partId:"concurrency",minutes:15,lede:"并发不是“多开线程”：任务是边界，共享状态是风险，线程池、锁和 CompletableFuture 是用来组织边界的工具。",sections:[{id:"tasks",heading:"任务、线程与线程池",html:`
            <p>把工作写成独立任务，交给线程池执行，而不是为每个请求创建一个线程。共享可变状态必须被保护；不可变对象和无共享设计通常更容易扩展。启动线程后要关心异常、取消和关闭。</p>
          `,code:[{lang:"java",label:"线程池执行任务",code:`ExecutorService pool = Executors.newFixedThreadPool(4);

Future<Integer> result = pool.submit(() -> {
    int total = 0;
    for (int i = 1; i <= 10; i++) {
        total += i;
    }
    return total;
});

System.out.println(result.get());
pool.shutdown();`}]},{id:"shared-state",heading:"共享状态与 CompletableFuture",html:`
            <p><code>synchronized</code> 或 <code>Lock</code> 保护临界区；锁的范围越短越好，且不要在持锁时做 I/O。死锁通常来自多把锁的获取顺序不一致。<code>CompletableFuture</code> 用组合代替阻塞等待，但异常处理与线程池边界仍然要明确。</p>
          `,code:[{lang:"java",label:"组合异步结果",code:`ExecutorService pool = Executors.newFixedThreadPool(2);

CompletableFuture<String> user =
    CompletableFuture.supplyAsync(() -> "study-room", pool);

CompletableFuture<Integer> length =
    user.thenApply(String::length);

length.thenAccept(System.out::println);
pool.shutdown();`}]}],takeaways:["用任务和线程池组织并发，不要为每个请求裸建线程。","共享可变状态需要锁或消息传递；尽量缩小临界区。","CompletableFuture 适合组合异步步骤，异常与线程池仍要显式管理。"]}]}];new Map(c.map(e=>[e.id,e]));let l=[{id:"vision-edge",number:"02",title:"视觉与边缘",subtitle:"YOLO · 4K · ONNX/TensorRT · Jetson",description:"从 1080p 视频管线开始，理解检测指标、数据标注和边缘推理，再把 4K 摄像头接进来。",status:"排队中",href:null,stack:["Python","OpenCV","YOLO","ONNX","Jetson"]},{id:"physical-agent",number:"03",title:"物理世界 Agent",subtitle:"IoT · MQTT · 事件 · 工作流",description:"让摄像头和传感器产生事件，再由 Agent 汇总、判断、告警，最后回到真实世界的执行器。",status:"排队中",href:null,stack:["MQTT","ESP32","Edge","Agent"]}];[...l];let p=e.i(39939).default.slice().sort((e,t)=>t.date.localeCompare(e.date));new Map(p.map(e=>[e.slug,e]));let d=o.default.map(e=>({id:`${e.chapterId}-${e.topicId}`,kind:"note",href:`/book/${e.chapterSlug}/#${e.topicId}`,title:e.topicTitle,context:`第 ${e.chapterNumber} 章 \xb7 ${e.chapterTitle}`,text:e.text})),u=p.map(e=>({id:`post-${e.slug}`,kind:"post",href:`/blog/${e.slug}/`,title:e.title,context:`文章 \xb7 ${e.category}`,text:[e.title,e.subtitle,e.category,e.excerpt,...e.sections.flatMap(e=>[e.heading,...e.paragraphs,e.quote??""]),...e.takeaways].filter(Boolean).join(" ")})),h=[{id:"python",number:"01",title:"Python",subtitle:"完全学习手册",english:"PYTHON",coverSubtitle:"完全学习手册",status:"已上架",href:"/book/",meta:"16 章 · 59 个知识点 · 50 段代码",description:"从解释器、数据结构到异常、类与标准库，一套可以边读边跑的 Python 心智模型。",topics:["语言基础","数据结构","异常与类","标准库"],cover:"#1d1d1f",coverInk:"#f5f5f7",coverAccent:"#2997ff"},{id:"rust",number:"02",title:"Rust",subtitle:"系统、所有权与并发",english:"RUST",coverSubtitle:"系统、所有权\n与并发",status:"已上架",href:"/book/rust/",meta:"10 章 · 从所有权到命令行",description:"从 Cargo、类型与所有权出发，走到结构体、trait、错误处理、并发与一个命令行项目。",topics:["所有权","trait","错误处理","并发"],cover:"#3a3a3c",coverInk:"#f5f5f7",coverAccent:"#d2d2d7"},{id:"java",number:"03",title:"On Java 8",subtitle:"对象、泛型、函数式与并发",english:"ON JAVA 8",coverSubtitle:"对象、泛型\n与并发",status:"已上架",href:"/book/java/",meta:"24 章 · Bruce Eckel",description:"按 Bruce Eckel《On Java 8》的目录整理：从对象、封装、复用与多态，到集合、函数式、泛型、类型信息与并发。",topics:["对象模型","泛型","Stream","并发"],cover:"#0a2540",coverInk:"#f5f5f7",coverAccent:"#2997ff"},{id:"agent",number:"04",title:"AI Agent",subtitle:"构建可靠的智能应用",english:"AI AGENT",coverSubtitle:"构建可靠的\n智能应用",status:"筹备中",href:null,meta:"上下文 · 工具 · 状态 · 评测",description:"从一次模型调用，到一个能够被信任、被观测、被维护的 Agent 应用。",topics:["上下文工程","工具调用","记忆与状态","Agent 评测"],cover:"#2c2c2e",coverInk:"#f5f5f7",coverAccent:"#64d2ff"},{id:"engineering",number:"05",title:"工程手记",subtitle:"系统、设计与项目复盘",english:"ENGINEERING",coverSubtitle:"系统、设计与复盘",status:"筹备中",href:null,meta:"架构 · 取舍 · 性能 · 复盘",description:"记录真实项目里那些不被写进语法书的设计判断与工程取舍。",topics:["系统设计","架构取舍","性能","项目复盘"],cover:"#5a5a5e",coverInk:"#f5f5f7",coverAccent:"#d2d2d7"}].map(e=>({id:`book-${e.id}`,kind:"page",href:e.href??"/notes/",title:`${e.title} ${e.subtitle}`,context:"已上架"===e.status?"书库 · 已上架":"书库 · 筹备中",text:[e.description,...e.topics,e.meta].join(" ")})),m=[...d,...c.flatMap(e=>e.chapters.map(t=>({id:`language-${e.id}-${t.slug}`,kind:"page",href:`/book/${e.id}/${t.slug}/`,title:t.title,context:`${e.title} 手册 \xb7 第 ${t.number} 章`,text:[t.title,t.lede,...t.sections.flatMap(e=>[e.heading,e.html.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim()]),...t.takeaways].join(" ")}))),...u,...h,{id:"lab-ai-backend",kind:"page",href:"/lab/ai-backend/",title:"AI 后端工程实验室",context:"实验室 · 搭建中",text:["把 Python、FastAPI、模型调用、RAG 和 Agent 组合成一个可以部署、可以评测、可以观察的 AI 服务。不是为了跑一个 demo，而是为了交付一个能维护的产品。","FastAPI · RAG · Agent · 生产化","Python","FastAPI","Pydantic","Postgres","pgvector","Redis","OpenAI-compatible",...[{number:"00",title:"FastAPI 服务骨架",duration:"第 1 周",goal:"先让一个流式聊天接口真正跑起来，理解异步请求、Pydantic 和 SSE。",output:"一个可以本地启动、可以流式输出的 /chat/stream 接口。",acceptance:["接口有请求与响应模型","客户端断开时能停止生成","错误和超时有明确返回"],topics:["FastAPI","Pydantic","asyncio","SSE"]},{number:"01",title:"LLM Gateway",duration:"第 2 周",goal:"把模型调用从业务接口里抽出来，统一处理供应商、超时、重试和成本。",output:"一个支持多模型、结构化输出和用量统计的模型网关。",acceptance:["业务代码不依赖具体供应商 SDK","有超时、重试上限和降级","每次调用记录 token、耗时和模型"],topics:["模型适配","结构化输出","成本","重试"]},{number:"02",title:"RAG 知识库",duration:"第 3 周",goal:"从文档到检索，再到带引用的回答，建立可评测的知识库。",output:"上传文档后可以检索并给出引用来源的 RAG 服务。",acceptance:["文档入库与切分可重复执行","回答返回真实引用","有一组问题和检索指标"],topics:["Embedding","pgvector","混合检索","Rerank"]},{number:"03",title:"Agent 运行时",duration:"第 4–5 周",goal:"让模型能调用工具、保存状态、请求人工确认，并留下可追踪的记录。",output:"一个能完成多步任务、工具受控、可回放的 Agent 服务。",acceptance:["工具 schema 与权限边界清晰","高风险动作必须人工确认","每次任务都有 trace 和审计日志"],topics:["工具调用","状态机","记忆","HITL"]},{number:"04",title:"生产化",duration:"第 5 周",goal:"补齐鉴权、限流、队列、缓存、观测和评测，让服务进入可上线状态。",output:"一套可以部署、可限流、可观测、可回归的 AI 服务。",acceptance:["慢任务不阻塞请求","有健康检查、指标和告警","评测集可以重复运行"],topics:["鉴权","队列","OpenTelemetry","Eval"]},{number:"05",title:"Capstone：接入自习室",duration:"第 6 周",goal:"把整条链路接回真实产品：用你的书、文章和代码示例做一个学习 Agent。",output:"一个带 RAG、工具调用、人工确认和前端流式体验的可演示产品。",acceptance:["有 Demo 和架构说明","有评测结果和成本数据","移动端可以正常使用"],topics:["产品集成","部署","评测","作品集"]}].flatMap(e=>[e.title,e.goal,e.output,...e.topics])].join(" ")},...l.map(e=>({id:`lab-${e.id}`,kind:"page",href:"/lab/",title:`${e.title}实验室`,context:`实验室 \xb7 ${e.status}`,text:[e.description,e.subtitle,...e.stack].join(" ")})),{id:"page-podcast",kind:"page",href:"/podcast/",title:"自习室电台",context:"播客 · 第一季筹备中",text:"关于技术、选择与长期成长的声音栏目。AI 与基本功、Python 到 Rust、Agent 与责任、工程师的审美、学习复利。"}];function g(e){return e.toLocaleLowerCase("zh-CN").replace(/\s+/g," ").trim()}let f=[{href:"/notes/",label:"学习书库",meta:"书库"},{href:`/book/${s.d[0].slug}/`,label:s.d[0].title,meta:"Python"},{href:`/blog/${p[0].slug}/`,label:p[0].title,meta:"文章"},{href:"/podcast/",label:"自习室电台",meta:"播客"}];function b({open:e,onClose:o}){let s=(0,r.useRef)(null),c=(0,r.useRef)(null),l=(0,a.useRouter)(),[p,d]=(0,r.useState)("");(0,r.useEffect)(()=>{let t=s.current;if(t){if(e){t.open||t.showModal(),document.body.classList.add("modal-open");let e=window.setTimeout(()=>c.current?.focus(),60);return()=>{window.clearTimeout(e),document.body.classList.remove("modal-open")}}t.open&&t.close(),document.body.classList.remove("modal-open")}},[e]),(0,r.useEffect)(()=>{e||d("")},[e]);let u=(0,r.useMemo)(()=>{let e=g(p);return e?m.map(t=>{let n=g(t.title),a=g(t.context),r=g(t.text),i=0;return n.includes(e)&&(i+=7),a.includes(e)&&(i+=3),r.includes(e)&&(i+=2),n.startsWith(e)&&(i+=3),{...t,score:i,excerpt:function(e,t){let n=g(e).indexOf(t);if(-1===n)return e.slice(0,96);let a=Math.max(0,n-36),r=Math.min(e.length,n+t.length+94);return`${a>0?"…":""}${e.slice(a,r)}${r<e.length?"…":""}`}(t.text,e)}}).filter(e=>e.score>0).sort((e,t)=>t.score-e.score||("note"!==e.kind)-("note"!==t.kind)||e.title.localeCompare(t.title,"zh-CN")).slice(0,9):[]},[p]);function h(){o()}return(0,t.jsx)("dialog",{ref:s,className:"search-dialog","aria-labelledby":"search-title",onCancel:e=>{e.preventDefault(),h()},onClose:()=>{e&&h()},onMouseDown:e=>{e.target===s.current&&h()},children:(0,t.jsxs)("div",{className:"search-panel",children:[(0,t.jsxs)("div",{className:"search-panel-head",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"eyebrow",children:"Search the library"}),(0,t.jsx)("h2",{id:"search-title",children:"搜索书库与文章"})]}),(0,t.jsx)("button",{type:"button",className:"icon-button",onClick:h,"aria-label":"关闭搜索",children:(0,t.jsx)(i.X,{})})]}),(0,t.jsxs)("form",{onSubmit:function(e){e.preventDefault();let t=u[0];t&&(h(),l.push(t.href))},className:"search-form",children:[(0,t.jsx)(i.v,{className:"search-form-icon"}),(0,t.jsx)("input",{ref:c,value:p,onChange:e=>d(e.target.value),placeholder:"搜索书目、文章或概念…","aria-label":"搜索书目、文章或概念",autoComplete:"off",spellCheck:!1}),(0,t.jsx)("kbd",{children:"ESC"})]}),(0,t.jsxs)("div",{className:"search-results","aria-live":"polite",children:[!p.trim()&&(0,t.jsxs)("div",{className:"search-start",children:[(0,t.jsx)("p",{className:"search-hint",children:"不知道从哪开始？试试这些。"}),(0,t.jsx)("div",{className:"search-suggestions",children:f.map(e=>(0,t.jsxs)(n.default,{href:e.href,onClick:h,children:[(0,t.jsx)("span",{children:e.meta}),e.label,(0,t.jsx)(i.G,{})]},e.href))})]}),p.trim()&&0===u.length&&(0,t.jsxs)("div",{className:"search-empty",children:[(0,t.jsx)("span",{className:"search-empty-mark",children:"?"}),(0,t.jsxs)("p",{children:["没有找到「",p.trim(),"」"]}),(0,t.jsx)("span",{children:"试试更短的关键词，例如“函数”“Agent”或“Rust”。"})]}),u.length>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("p",{className:"search-count",children:["找到 ",u.length," 个相关内容"]}),(0,t.jsx)("ul",{className:"search-result-list",children:u.map(e=>(0,t.jsx)("li",{children:(0,t.jsxs)(n.default,{href:e.href,onClick:h,children:[(0,t.jsx)("span",{className:"search-result-chapter",children:e.context}),(0,t.jsx)("strong",{children:e.title}),(0,t.jsx)("span",{className:"search-result-excerpt",children:e.excerpt}),(0,t.jsx)(i.G,{className:"search-result-arrow"})]})},e.id))})]})]}),(0,t.jsxs)("div",{className:"search-footer",children:[(0,t.jsxs)("span",{children:[(0,t.jsx)("kbd",{children:"↵"})," 打开第一个结果"]}),(0,t.jsxs)("span",{children:[(0,t.jsx)("kbd",{children:"ESC"})," 关闭"]}),(0,t.jsx)("span",{className:"search-footer-note",children:"完全在本地搜索"})]})]})})}function y({compact:e=!1}){return(0,t.jsxs)("button",{type:"button",className:`theme-toggle${e?" is-compact":""}`,onClick:function(){let e=document.documentElement,t="dark"===e.dataset.theme?"light":"dark";e.dataset.theme=t,e.style.colorScheme=t;try{window.localStorage.setItem("py-study-room:theme",t)}catch{}},"aria-label":"切换深浅色主题",title:"切换深浅色主题",children:[(0,t.jsx)(i.x,{className:"theme-icon theme-icon-sun"}),(0,t.jsx)(i.u,{className:"theme-icon theme-icon-moon"})]})}let v=[{href:"/notes",label:"书库",matches:["/notes","/book"]},{href:"/lab",label:"实验室",matches:["/lab"]},{href:"/podcast",label:"播客",matches:["/podcast"]},{href:"/blog",label:"文章",matches:["/blog"]},{href:"/playground",label:"练习室",matches:["/playground"]}];function x(e,t){return t.some(t=>e===t||e.startsWith(`${t}/`))}e.s(["SiteHeader",0,function(){let e=(0,a.usePathname)(),[o,c]=(0,r.useState)(!1),[l,p]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{c(!1),p(!1)},[e]),(0,r.useEffect)(()=>(document.body.classList.toggle("menu-open",o),()=>document.body.classList.remove("menu-open")),[o]),(0,r.useEffect)(()=>{function e(){window.innerWidth>1024&&c(!1)}return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,r.useEffect)(()=>{function e(e){(e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),c(!1),p(e=>!e)),"Escape"===e.key&&o&&c(!1)}return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[o]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("header",{className:"site-header",children:[(0,t.jsxs)("div",{className:"container header-inner",children:[(0,t.jsxs)(n.default,{href:"/",className:"brand","aria-label":`${s.B.name}首页`,children:[(0,t.jsx)("span",{className:"brand-mark","aria-hidden":"true",children:"自"}),(0,t.jsxs)("span",{className:"brand-wordmark",children:[(0,t.jsx)("strong",{children:s.B.name}),(0,t.jsx)("small",{children:"THE STUDY ROOM"})]})]}),(0,t.jsx)("nav",{className:"desktop-nav","aria-label":"主导航",children:v.map(a=>(0,t.jsx)(n.default,{href:a.href,className:x(e,a.matches)?"is-active":"",children:a.label},a.href))}),(0,t.jsxs)("div",{className:"header-actions",children:[(0,t.jsxs)("button",{type:"button",className:"search-trigger",onClick:()=>{c(!1),p(!0)},"aria-label":"搜索书库与文章",children:[(0,t.jsx)(i.v,{}),(0,t.jsx)("span",{children:"搜索"}),(0,t.jsx)("kbd",{children:"Ctrl K"})]}),(0,t.jsx)(y,{compact:!0}),(0,t.jsx)("button",{type:"button",className:"mobile-menu-toggle",onClick:()=>c(e=>!e),"aria-expanded":o,"aria-controls":"mobile-navigation","aria-label":o?"关闭菜单":"打开菜单",children:o?(0,t.jsx)(i.X,{}):(0,t.jsx)(i.m,{})})]})]}),o&&(0,t.jsxs)("div",{id:"mobile-navigation",className:"mobile-navigation",children:[(0,t.jsx)("nav",{"aria-label":"移动端导航",children:v.map((a,r)=>(0,t.jsxs)(n.default,{href:a.href,className:x(e,a.matches)?"is-active":"",children:[(0,t.jsxs)("span",{children:["0",r+1]}),a.label,(0,t.jsx)(i.G,{})]},a.href))}),(0,t.jsxs)("div",{className:"mobile-navigation-foot",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"自习室"}),(0,t.jsx)("strong",{children:"个人学习书库"})]}),(0,t.jsx)(n.default,{href:"/about/",children:"关于这间自习室"})]})]})]}),(0,t.jsx)(b,{open:l,onClose:()=>p(!1)}),o&&(0,t.jsx)("button",{type:"button",className:"mobile-menu-backdrop","aria-label":"关闭菜单",onClick:()=>c(!1)})]})}],48303)},39939,(e,t,n)=>{t.exports=JSON.parse('[{"slug":"ai-makes-fundamentals-more-valuable","title":"AI 越强，基本功越重要","subtitle":"当生成代码变得便宜，判断、验证和承担责任反而变得更贵。","category":"AI 与学习","date":"2026-11-11","readMinutes":6,"cover":"/images/books.webp","coverAlt":"一双手托着几本书","excerpt":"模型可以替我们写出看起来正确的代码，但它不能替我们决定什么值得做，也不能替我们承担错误的后果。","sections":[{"heading":"生成变得便宜之后","paragraphs":["第一次用 AI 写代码，人很容易产生一种错觉：开发突然变简单了。描述一个需求，几秒钟后就有完整的函数、测试和注释。它看起来井井有条，甚至比你亲手写的更完整。","但「看起来正确」和「真的正确」之间，隔着整个工程世界。需求是否理解对了？边界条件有没有处理？这段抽象明年还改得动吗？当错误发生时，谁能解释它是怎么进来的？生成成本下降之后，真正昂贵的部分反而暴露出来了：判断、验证和承担责任。","这也是为什么我不太相信「AI 会让编程能力变得不重要」这种说法。它会让某种能力变得不重要——比如背语法、敲样板代码——但会让另外一些能力变得更值钱。"]},{"heading":"基本功的三个层次","paragraphs":["基本功不是把语法表背下来，而是一组能在陌生问题里工作的能力。第一层是分解问题：把一个模糊目标拆成数据、状态、输入输出和失败边界。你越能说清楚要让机器做什么，AI 越可能给出可用的东西。","第二层是阅读代码。你需要顺着数据流走一遍，看见变量从哪里来、状态在哪里变化、错误在哪里被吞掉。AI 生成的代码往往在局部很合理，却在整体上把复杂度放错了位置。没有阅读能力，你只能凭感觉接受或拒绝。","第三层是验证。写测试、复现问题、缩小故障范围、解释一个现象为什么发生。验证不是「跑一下没报错」，而是为你的判断找到证据。"],"quote":"工具放大的是判断力，而不是替代判断。"},{"heading":"把 AI 当放大器，而不是外包对象","paragraphs":["我更喜欢把 AI 放在两个位置：一个是「提出更多可能性」，另一个是「帮我检查盲区」。让它给出两三种结构方案，让它解释一段异常，让它先写一版测试。然后轮到我判断什么该留下。","一个简单的习惯是：每次接受 AI 的代码之前，先用自己的话复述它做了什么，再改一处、跑一次、看结果是否仍然符合预期。如果你解释不了，就不要把这段代码送进主干。","新工具最有价值的地方，不是让你不用理解，而是让你把理解用在更关键的位置。"]},{"heading":"最后竞争的是判断与责任","paragraphs":["程序员不是因为会敲字才被需要，而是因为能在不确定里做取舍：现在快一点还是以后稳一点？抽象放在这一层还是下一层？这个异常应该被修复，还是应该让它显形？","AI 可以把答案送到你面前。决定哪个答案值得相信、把它放进怎样的系统、为结果负责，仍然是人做的事情。基本功不会让你拒绝 AI，它会让你有资格使用 AI。"]}],"takeaways":["把 AI 当作放大器：它提高产出，也放大你的盲区。","每次接受生成代码前，用自己的话解释它、改一处、验证一次。","真正稀缺的是问题分解、代码阅读和结果验证，而不是语法记忆。"]},{"slug":"from-python-to-rust","title":"从 Python 到 Rust，真正学的是什么","subtitle":"第二门语言学的不只是语法，而是另一套关于成本、边界和错误的假设。","category":"语言与系统","date":"2026-11-09","readMinutes":5,"cover":"/images/library-hero.webp","coverAlt":"灯光下的旧书店长廊","excerpt":"Python 让想法先跑起来，Rust 逼你把「谁拥有它、谁能修改它、失败时怎么办」写清楚。","sections":[{"heading":"两种语言的第一印象","paragraphs":["Python 的魅力在于它不挡路。你有一个想法，打开解释器，几行代码就能看到结果。它更关心你想表达什么，而不是先要求你证明每个对象的生命周期。","Rust 的第一印象则完全不同。你还没写完一个小功能，编译器已经在问：这个值归谁所有？这个借用会活多久？这里失败之后，调用者需要知道什么？它不像一个安静的翻译器，更像一个严格的合作者。","很多人把这种严格理解成学习成本。它当然是成本，但也是 Rust 最有价值的部分：它把平时被隐藏起来的系统假设，提前摆到了桌面上。"]},{"heading":"所有权不是语法细节","paragraphs":["所有权、借用和生命周期看起来像 Rust 的语法规则，实际上描述的是一组更普遍的问题：资源由谁负责释放？谁可以同时读？谁可以修改？当多个部分需要同一份数据时，边界在哪里？","在 Python 里，这些问题通常由运行时、垃圾回收和约定处理，你可以在很多时候暂时不回答。Rust 要求你更早回答它们。于是你被迫重新思考自己的数据结构：它是共享的，还是独占的？是需要长期保存，还是只在函数里出现？","这种思考会反过来影响你写 Python 的方式。你开始注意可变状态从哪里泄漏，开始把「会失败」写进接口，而不是藏在注释里。"],"quote":"语言不是效率工具，它也是一套关于世界的假设。"},{"heading":"第二门语言学的是边界","paragraphs":["学习第二门语言，最大的收获往往不是多会一种工具，而是看见第一门语言替你做了哪些选择。Python 的动态类型带来灵活，也把错误推到了运行时；Rust 的静态类型让错误更早暴露，也要求更多前期表达。","当你知道每种便利背后的代价，选择才不只是偏好。做原型时，Python 的反馈速度可能更重要；写需要长期运行、资源边界清晰的系统时，Rust 的约束可能更重要。不是谁替代谁，而是把问题放到合适的材料里。"]},{"heading":"回到选择","paragraphs":["我不建议把语言学习变成阵营之争。真正值得比较的，是它们如何帮助你构造问题、发现错误和维护边界。","如果你正在学第二门语言，不妨给自己一个具体的小项目：用 Rust 写一个命令行工具，再把同一件事用 Python 写一遍。比较两者在错误处理、依赖、构建和测试上的差异。你会学到的不是两种语法，而是两种思考方式。"]}],"takeaways":["把 Rust 的所有权看成资源与边界的建模问题，而不只是语法门槛。","第二门语言会暴露第一门语言替你隐藏的代价。","用同一个小项目比较两种语言，比看十篇语言大战更有收获。"]},{"slug":"learning-as-compounding","title":"把学习做成复利：一个低摩擦的系统","subtitle":"不要依赖意志力。让开始、验证和留下痕迹都变得更容易。","category":"方法与成长","date":"2026-11-06","readMinutes":5,"cover":"/images/journal.webp","coverAlt":"钢笔在纸上写字的近景","excerpt":"真正长期有效的学习，不是每天都很燃，而是即使普通的一天，也能完成一个可重复的小循环。","sections":[{"heading":"意志力不是系统","paragraphs":["我们常常把学不会归因于不够自律。于是制定宏大的计划：每天两小时、读完所有文档、做完整项目。计划越宏大，启动越困难。几天之后，一次加班就能让整个系统停摆。","问题不一定在意志力，而在摩擦力。打开笔记要经历多少步骤？代码环境多久能跑起来？今天要学的东西是否具体到可以开始？如果每次学习都像启动一台旧机器，放弃是很自然的结果。","我更愿意把学习设计成一个小循环，而不是一场持续消耗意志力的长跑。"]},{"heading":"五步循环","paragraphs":["第一步是捕捉：把一个问题、一条反直觉的结论、一个想验证的假设记下来。不要急着整理，先让它有一个落点。","第二步是压缩：用自己的话重写它。能写成一个段落、一张图或几行可运行的代码，就说明你已经开始真正理解。第三步是连接：把它接到已有知识或一个正在做的项目上。孤立的知识很难被再次调用。","第四步是验证：运行代码、做一个小实验、写一条测试，或者试着向别人解释。第五步是发布：留下一段公开的笔记、一篇短文或一个小工具。发布不一定为了观众，它会让你的理解接受一次现实检验。"],"quote":"让开始变得容易，比让自己更自律更可靠。"},{"heading":"给自己留一间自习室","paragraphs":["「自习室」不需要是一间真正的房间。它可以是一个固定页面、一个 Git 仓库、一张每周清单，或者一台打开就能进入状态的电脑。重要的是它足够稳定，让你不用每次重新发明学习仪式。","我会把一次学习的默认单位缩小到二十五分钟：读一个概念，改一处代码，写一段总结。不是每次都能进入心流，但几乎每次都能留下一点东西。积少成多，靠的不是激情，而是低摩擦的重复。"]},{"heading":"复利来自可重复","paragraphs":["学习真正开始累积，是在你能够反复回到同一个问题时。第一次理解一个概念，你得到的是一个轮廓；第二次动手，你发现边界；第三次讲给别人听，你才把它变成自己的语言。","所以不要急着追求「学完」。设计一个能重复的小循环，让它在你状态普通的日子里也能运转。长期来看，普通日子的总和，才是能力的来源。"]}],"takeaways":["降低启动摩擦，比制定更宏大的学习计划更有效。","用一个「捕捉—压缩—连接—验证—发布」的循环处理每次学习。","把默认学习单位缩小到二十五分钟，优先留下可重复的痕迹。"]}]')},1209,(e,t,n)=>{t.exports=JSON.parse('[{"chapterId":"ch01","chapterNumber":"01","chapterTitle":"课前甜点","chapterSlug":"before-we-start","topicId":"topic-1","topicTitle":"Python 适合做什么","text":"Python 是解释型、跨平台、强调可读性的通用编程语言。它既能写十几行的自动化脚本，也能组织大型项目。 自动化重复工作：批量重命名照片、查找替换文本、整理文件夹、处理表格。 数据与网页：读取 CSV/JSON、做统计和可视化、调用 API、搭建 Web 服务。 工具与测试：写命令行小工具、自动化测试、连接 C/C++ 等原生库。 快速验证想法：交互式解释器可以立刻试一行代码，不需要先编译。 在交互模式输入 import this，可以看到著名的「Python 之禅」：可读性很重要，简单优于复杂。后面每个章节，都会把这些原则落到具体语法上。"},{"chapterId":"ch01","chapterNumber":"01","chapterTitle":"课前甜点","chapterSlug":"before-we-start","topicId":"topic-2","topicTitle":"先尝一口：几行代码的 Python","text":"暂时不用完全看懂。注意注释标出的结果，感受 Python 如何用较少的代码完成循环、列表生成和统计。 第 1 章是开胃菜，不要求记住语法。接下来从解释器开始，把这里的每一块逐步拆开。 print(\\"Hello, Python!\\")        # Hello, Python!\\n\\n# 斐波那契：多重赋值，一行同时更新两个变量\\na, b = 0, 1\\nwhile a < 30:\\n    print(a, end=\\" \\")\\n    a, b = b, a + b\\nprint()                         # 0 1 1 2 3 5 8 13 21\\n\\n# 列表推导式：一行生成平方表\\nsquares = [n * n for n in range(6)]\\nprint(squares)                  # [0, 1, 4, 9, 16, 25]\\n\\n# 标准库：统计出现次数最多的字符\\nfrom collections import Counter\\nprint(Counter(\\"abracadabra\\").most_common(2))  # [(\'a\', 5), (\'b\', 2)]"},{"chapterId":"ch02","chapterNumber":"02","chapterTitle":"使用解释器","chapterSlug":"using-the-interpreter","topicId":"topic-1","topicTitle":"启动解释器与交互模式","text":"在终端输入 python 通常会进入交互模式。Windows 也可能使用 py；macOS/Linux 常使用 python3。看到 >>> 就说明可以开始输入代码了。 交互模式里只需输入 >>> 后面的代码，不要连提示符一起输入。命令不存在时，先试 py 或 python3，不要急着怀疑代码。 # 查看版本（Windows 也可以用 py 启动器）\\npython --version\\npy --version\\n\\n# 进入交互模式\\npython\\n# Python 3.15.x ...\\n# >>> 2 + 2\\n# 4\\n# >>> exit()\\n\\n# 退出还可以用 Ctrl+D（macOS/Linux）\\n# 或 Ctrl+Z 后回车（Windows）"},{"chapterId":"ch02","chapterNumber":"02","chapterTitle":"使用解释器","chapterSlug":"using-the-interpreter","topicId":"topic-2","topicTitle":"运行脚本、模块与命令行参数","text":"python 文件名.py 运行脚本；-c 直接执行一行；-m 把一个模块当脚本运行。脚本参数会以字符串列表的形式放进 sys.argv。 直接访问 sys.argv[1] 前要先检查长度，否则没传参数时会抛 IndexError。另外，python -m 模块 与 python 文件.py 的搜索路径不同，包内相对导入通常更适合用 -m。 # hello.py\\nimport sys\\n\\n# sys.argv[0] 是脚本名；后面的参数都是字符串\\nname = sys.argv[1] if len(sys.argv) > 1 else \\"world\\"\\nprint(f\\"Hello, {name}!\\") python hello.py Ada          # Ada 是传给脚本的参数\\npython -c \\"print(2 ** 10)\\"   # 直接执行一行代码\\npython -m http.server 8000   # 把模块当脚本运行，启动本地服务器\\npython -i hello.py Ada       # 运行后保留交互环境"},{"chapterId":"ch02","chapterNumber":"02","chapterTitle":"使用解释器","chapterSlug":"using-the-interpreter","topicId":"topic-3","topicTitle":"多行输入与源码编码","text":"输入 if、while 这类复合语句时，主提示符会变成 ...；再输入一个空行表示代码块结束。源码文件默认使用 UTF-8，所以通常不需要额外写编码声明。 只有使用非 UTF-8 编码时，才需要在文件第一行声明编码；如果第一行是 shebang，就写在第二行。 编码声明长这样：# -*- coding: cp1252 -*-。现代 Python 项目几乎总是直接用 UTF-8。若 Windows 终端显示中文乱码，可尝试设置 PYTHONUTF8=1 或使用 Windows Terminal。 >>> if True:\\n...     print(\\"缩进属于代码块\\")\\n...\\n缩进属于代码块"},{"chapterId":"ch03","chapterNumber":"03","chapterTitle":"Python 速览","chapterSlug":"a-quick-tour","topicId":"topic-1","topicTitle":"数字：计算器模式","text":"/ 总是返回浮点数，// 向下取整，% 取余数，** 是乘方。括号可以改变优先级。 整数类型是 int，带小数的类型是 float。交互模式中，_ 保存上一次表达式的结果，可以直接拿它继续算。 print(2 + 2)             # 4\\nprint(50 - 5 * 6)        # 20：乘法优先\\nprint((50 - 5 * 6) / 4)  # 5.0：/ 总是返回浮点数\\nprint(8 / 5)             # 1.6\\nprint(17 // 3)           # 5：向下取整\\nprint(17 % 3)            # 2：余数\\nprint(2 ** 7)            # 128：乘方\\nprint(-3 ** 2)           # -9：** 优先于负号\\nprint((-3) ** 2)         # 9\\n\\nwidth, height = 20, 5 * 9\\nprint(width * height)    # 900：等号用于赋值"},{"chapterId":"ch03","chapterNumber":"03","chapterTitle":"Python 速览","chapterSlug":"a-quick-tour","topicId":"topic-2","topicTitle":"字符串：文本就是序列","text":"字符串用单引号或双引号都行，支持索引、切片、拼接和重复。索引从 0 开始，切片包含起点、不包含终点。 单个索引越界会抛 IndexError，例如 word[42]；但切片通常会自动截断，word[4:42] 只返回剩余部分。字符串不可变，想“修改”只能创建新字符串。 word = \\"Python\\"\\nprint(word[0], word[-1])       # P n\\nprint(word[0:2], word[2:5])    # Py tho\\nprint(word[:4] + word[4:])     # Python\\nprint(len(word))               # 6\\n\\nprint(\\"ha\\" * 3 + \\"!\\")          # hahaha!\\nprint(r\\"C:\\\\Users\\\\Ada\\")         # 原始字符串：反斜杠不转义\\nprint(\\"\\"\\"第一行\\n第二行\\"\\"\\")                      # 三重引号可以跨行\\n\\n# 字符串不可变：不能原地修改某个字符\\n# word[0] = \\"J\\"                # TypeError\\nprint(\\"J\\" + word[1:])          # Jython"},{"chapterId":"ch03","chapterNumber":"03","chapterTitle":"Python 速览","chapterSlug":"a-quick-tour","topicId":"topic-3","topicTitle":"列表：可变的有序容器","text":"列表用方括号表示，可以放不同类型的元素。它支持索引、切片、append() 和切片赋值，而且内容可以原地修改。 赋值不会复制对象，只是让两个名字指向它。需要独立副本时用 squares[:]、list(squares) 或 squares.copy()；它们都是浅拷贝。 squares = [1, 4, 9, 16, 25]\\nprint(squares[0], squares[-1])   # 1 25\\nprint(squares[1:3])              # [4, 9]\\nsquares[0] = 100                 # 列表可变\\nsquares.append(36)               # 末尾追加\\nprint(squares)                   # [100, 4, 9, 16, 25, 36]\\nprint(squares + [49])            # 新列表，不修改原列表\\nprint(len(squares))              # 6\\n\\nmatrix = [[1, 2, 3], [4, 5, 6]]\\nprint(matrix[1][0])              # 4：先取第二行，再取第一列\\n\\nalias = squares                  # 只是同一个列表的另一个名字\\nalias.append(99)\\nprint(squares[-1])               # 99：squares 也会看到变化\\n\\ncopy = squares[:]                # 切片得到浅拷贝\\ncopy.append(100)\\nprint(squares[-1])               # 99：副本修改互不影响"},{"chapterId":"ch03","chapterNumber":"03","chapterTitle":"Python 速览","chapterSlug":"a-quick-tour","topicId":"topic-4","topicTitle":"第一段程序：斐波那契","text":"while 在条件为真时重复执行；循环体靠缩进划分。多重赋值让 a, b = b, a + b 能同时更新两个变量。 同一代码块必须使用相同缩进，通常每层 4 个空格。在交互模式输入这种多行结构时，最后要再按一次回车（空行）才会执行。 # 打印小于 100 的斐波那契数\\na, b = 0, 1\\nwhile a < 100:\\n    print(a, end=\\" \\")\\n    a, b = b, a + b\\nprint()\\n# 0 1 1 2 3 5 8 13 21 34 55 89\\n\\nif a > 100:\\n    print(\\"循环结束\\")           # 此时 a 已经是 144\\n\\n# 读取交互输入（取消注释后再运行）\\n# name = input(\\"你的名字：\\")\\n# print(f\\"你好，{name}！\\")"},{"chapterId":"ch04","chapterNumber":"04","chapterTitle":"控制流与函数","chapterSlug":"control-flow-and-functions","topicId":"topic-1","topicTitle":"分支：if / elif / else","text":"elif 可以有零个或多个，else 可选；Python 靠缩进划分代码块，不用花括号。 缩进通常用 4 个空格。不要在一份代码里混用 Tab 和空格，否则会得到 IndentationError。 score = 86\\n\\nif score >= 90:\\n    grade = \\"A\\"\\nelif score >= 60:          # 可以有多个 elif\\n    grade = \\"B\\"\\nelse:                      # else 可选\\n    grade = \\"C\\"\\n\\nprint(grade)               # B"},{"chapterId":"ch04","chapterNumber":"04","chapterTitle":"控制流与函数","chapterSlug":"control-flow-and-functions","topicId":"topic-2","topicTitle":"遍历：for 与 range()","text":"for 直接遍历可迭代对象中的元素，而不是 C 风格的下标循环。需要数字序列时用 range(start, stop, step)，终点不包含。 range() 是惰性序列，不会一次性生成完整列表；list(range(5)) 才把它展开成 [0, 1, 2, 3, 4]。 words = [\\"cat\\", \\"window\\", \\"defenestrate\\"]\\n\\nfor word in words:          # 直接拿到元素，不靠索引\\n    print(word, len(word))\\n\\nfor i in range(1, 10, 2):   # 1, 3, 5, 7, 9（不含 10）\\n    print(i, end=\\" \\")\\nprint()\\n\\n# 边遍历边修改字典容易出错：遍历副本更稳\\nusers = {\\"Hans\\": \\"active\\", \\"Éléonore\\": \\"inactive\\", \\"景太郎\\": \\"active\\"}\\nfor name, status in users.copy().items():\\n    if status == \\"inactive\\":\\n        del users[name]\\n\\nprint(users)                # {\'Hans\': \'active\', \'景太郎\': \'active\'}"},{"chapterId":"ch04","chapterNumber":"04","chapterTitle":"控制流与函数","chapterSlug":"control-flow-and-functions","topicId":"topic-3","topicTitle":"break / continue / else / pass","text":"break 跳出最近一层循环；continue 直接进入下一轮；循环的 else 只在“没有执行过 break”时运行。 循环后的 else 不是“循环结束后一定运行”。只要遇到过 break，它就会被跳过——这是 Python 独有的易错点。 for n in range(2, 10):\\n    for x in range(2, n):\\n        if n % x == 0:\\n            print(f\\"{n} = {x} × {n // x}\\")\\n            break              # 只跳出内层循环\\n    else:                      # 内层没 break 时执行\\n        print(f\\"{n} 是质数\\")\\n\\nfor num in range(1, 6):\\n    if num % 2 == 0:\\n        continue               # 跳过本轮剩余代码\\n    print(num, \\"是奇数\\")      # 1 3 5\\n\\ndef todo():\\n    pass                       # 语法占位：暂时什么都不做"},{"chapterId":"ch04","chapterNumber":"04","chapterTitle":"控制流与函数","chapterSlug":"control-flow-and-functions","topicId":"topic-4","topicTitle":"模式匹配：match / case 3.10+","text":"match 不是 C 的 switch，它更像“解构赋值 + 条件判断”。只执行第一个匹配分支，而且可以把序列、对象的组成部分绑定到变量。 还能匹配类实例（如 case Point(x=0, y=y):）、字典（{\\"x\\": x}）并嵌套；入门阶段先掌握字面量、或模式、序列解构和 _ 即可。 def http_error(status):\\n    match status:\\n        case 400 | 401 | 403:       # | 表示“或”\\n            return \\"请求或认证错误\\"\\n        case 404:\\n            return \\"Not found\\"\\n        case _ if status >= 500:     # 守卫条件\\n            return \\"Server error\\"\\n        case _:                     # 通配符，兜底\\n            return \\"Unknown\\"\\n\\npoint = (0, 3)\\nmatch point:\\n    case (0, 0):\\n        print(\\"原点\\")\\n    case (0, y):                    # 解构并绑定 y\\n        print(f\\"在 Y 轴，y={y}\\")\\n    case (x, 0):\\n        print(f\\"在 X 轴，x={x}\\")\\n    case (x, y):\\n        print(f\\"点：({x}, {y})\\")\\n\\nprint(http_error(503))             # Server error"},{"chapterId":"ch04","chapterNumber":"04","chapterTitle":"控制流与函数","chapterSlug":"control-flow-and-functions","topicId":"topic-5","topicTitle":"定义函数与返回值","text":"def 定义函数；函数内第一条字符串是文档字符串。没有显式 return 的函数，返回 None。 参数按“对象引用”传递：函数内对可变对象做原地修改，会影响调用者。想避免副作用，就在函数内新建对象并返回。 def fib_list(n):\\n    \\"\\"\\"返回小于 n 的斐波那契数列。\\"\\"\\"   # 文档字符串\\n    result = []\\n    a, b = 0, 1\\n    while a < n:\\n        result.append(a)\\n        a, b = b, a + b\\n    return result\\n\\nprint(fib_list(20))       # [0, 1, 1, 2, 3, 5, 8, 13]\\nprint(fib_list.__doc__)   # 返回小于 n 的斐波那契数列。\\n\\ndef say_hi():\\n    print(\\"hi\\")           # 没有 return\\n\\nprint(say_hi())           # hi 然后 None"},{"chapterId":"ch04","chapterNumber":"04","chapterTitle":"控制流与函数","chapterSlug":"control-flow-and-functions","topicId":"topic-6","topicTitle":"参数魔法：默认值、关键字、/ 与 *","text":"默认值只在函数定义时求值一次。用可变对象当默认值是经典陷阱，正确写法是用 None 占位。 *args 收集额外位置参数为元组，**kwargs 收集额外关键字参数为字典；调用时 * 和 ** 反过来用于解包。二者可同时出现，但 *args 必须在 **kwargs 前。 def add_item_bad(item, basket=[]):   # 错误：所有调用共享同一个 list\\n    basket.append(item)\\n    return basket\\n\\nprint(add_item_bad(\\"apple\\"))         # [\'apple\']\\nprint(add_item_bad(\\"pear\\"))          # [\'apple\', \'pear\'] —— 被累积了\\n\\ndef add_item(item, basket=None):     # 正确：每次调用新建\\n    if basket is None:\\n        basket = []\\n    basket.append(item)\\n    return basket\\n\\nprint(add_item(\\"apple\\"), add_item(\\"pear\\"))  # [\'apple\'] [\'pear\'] def f(pos1, pos2, /, pos_or_kw, *, kw1, kw2):\\n    \\"\\"\\" / 前仅限位置；* 后仅限关键字。 \\"\\"\\"\\n    return pos1 + pos2, pos_or_kw, kw1, kw2\\n\\nprint(f(1, 2, 3, kw1=4, kw2=5))   # (3, 3, 4, 5)\\n# f(pos1=1, pos2=2, 3, kw1=4, kw2=5)  # TypeError\\n# f(1, 2, 3, 4, 5)                    # TypeError：kw1/kw2 仅限关键字\\n\\ndef tag(name, *children, **attrs):\\n    print(name, children, attrs)\\n\\ntag(\\"a\\", \\"首页\\", \\"关于\\", href=\\"/\\", target=\\"_blank\\")\\n# a (\'首页\', \'关于\') {\'href\': \'/\', \'target\': \'_blank\'}"},{"chapterId":"ch04","chapterNumber":"04","chapterTitle":"控制流与函数","chapterSlug":"control-flow-and-functions","topicId":"topic-7","topicTitle":"Lambda、类型注解与风格","text":"lambda 适合写一次性的小函数；注解只是“给人看 + 给工具查”的提示，运行时不会强制检查类型。 PEP 8 速记：4 空格缩进；函数/变量 snake_case；类名 PascalCase；常量 UPPER_CASE；导入放文件顶部；不要在函数参数默认值里写可变对象。 square = lambda x: x ** 2\\nprint(square(6))                   # 36\\n\\ndef greet(name: str, times: int = 1) -> str:\\n    \\"\\"\\"返回重复的问候语。类型注解不参与强制检查。\\"\\"\\"\\n    return f\\"你好，{name}！\\" * times\\n\\nprint(greet(\\"Ada\\", 2))            # 你好，Ada！你好，Ada！\\nprint(greet.__annotations__)      # {\'name\': <class \'str\'>, ...}\\n\\nnums = [3, 1, 2]\\nprint(sorted(nums, key=lambda x: -x))  # [3, 2, 1]"},{"chapterId":"ch05","chapterNumber":"05","chapterTitle":"数据结构","chapterSlug":"data-structures","topicId":"topic-1","topicTitle":"列表：高频方法与栈 / 队列","text":"列表方法大多是原地修改，返回值为 None。栈用尾部进出；队列用 deque，因为 list.pop(0) 每次都要挪动所有元素。 方法作用提醒 append(x)末尾追加一个元素返回 None extend(it)展开可迭代对象并追加不同于 append 追加整体 insert(i, x)在索引 i 前插入复杂度 O(n) remove(x)按值删除第一个 x找不到会 ValueError pop([i])删除并返回指定位置元素默认末尾；空列表 IndexError sort()原地排序返回 None；sorted() 才返回新列表 # 栈 LIFO：尾部进出，O(1)\\nstack = [1, 2, 3]\\nstack.append(4)\\nprint(stack.pop())              # 4\\n\\n# 队列 FIFO：两端都能快速进出\\nfrom collections import deque\\nqueue = deque([\\"Eric\\", \\"John\\"])\\nqueue.append(\\"Michael\\")\\nprint(queue.popleft())          # Eric\\n\\nfruits = [\\"orange\\", \\"apple\\", \\"pear\\", \\"banana\\", \\"kiwi\\", \\"apple\\"]\\nfruits.remove(\\"apple\\")          # 按值删除第一个\\nfruits.sort()                   # 原地排序，返回 None\\nprint(fruits.count(\\"apple\\"))    # 1\\nprint(fruits.index(\\"kiwi\\"))     # 2"},{"chapterId":"ch05","chapterNumber":"05","chapterTitle":"数据结构","chapterSlug":"data-structures","topicId":"topic-2","topicTitle":"推导式：一行生成新容器","text":"结构固定为 [表达式 for 变量 in 可迭代对象 if 条件]。把推导式当“快捷方式”，逻辑一复杂就换回普通循环。 先写“我要什么”，再写“从哪来”，最后补“筛选条件”。例如：[n * 2 for n in nums if n > 0]。 squares = [x * x for x in range(6)]       # [0, 1, 4, 9, 16, 25]\\nevens = [x for x in range(10) if x % 2 == 0]\\npairs = [(x, y) for x in [1, 2] for y in [3, 4]]\\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\\nflat = [n for row in matrix for n in row] # [1, 2, ..., 9]\\n\\n# 转置：用 zip 比嵌套推导式更直白\\ntransposed = list(zip(*matrix))\\nprint(transposed[0])                       # (1, 4, 7)\\n\\n# 集合推导式、字典推导式同样支持\\nunique_lengths = {len(w) for w in [\\"a\\", \\"bb\\", \\"cc\\"]}   # {1, 2}\\nlen_map = {w: len(w) for w in [\\"a\\", \\"bb\\", \\"cc\\"]}       # {\'a\': 1, \'bb\': 2, ...}\\n\\n# 星号解包可以拼接可迭代对象\\nnums = [2, 3]\\nprint([1, *nums, 4])                       # [1, 2, 3, 4]"},{"chapterId":"ch05","chapterNumber":"05","chapterTitle":"数据结构","chapterSlug":"data-structures","topicId":"topic-3","topicTitle":"元组与 del","text":"元组是不可变序列，适合表示“一条记录/一个坐标”。单元素元组必须带逗号；del 按索引或切片删除，也可以删除整个变量名。 point = (3, 5)\\nx, y = point                 # 序列解包\\nsingle = (\\"hello\\",)          # 单元素也必须有逗号\\nempty = ()\\n\\n# point[0] = 9               # TypeError：元组不可变\\na = [0, 1, 2, 3, 4]\\ndel a[1]                     # 按索引删除\\ndel a[1:3]                   # 删除切片\\nprint(a)                     # [0, 4]\\n\\nfrom collections import namedtuple\\nPoint = namedtuple(\\"Point\\", \\"x y\\")\\np = Point(3, 5)\\nprint(p.x, p.y)              # 3 5（可读性更好）"},{"chapterId":"ch05","chapterNumber":"05","chapterTitle":"数据结构","chapterSlug":"data-structures","topicId":"topic-4","topicTitle":"集合：去重与集合运算","text":"集合无序、元素唯一，成员检测很快。空集合只能写 set()，因为 {} 创建的是空字典。 集合元素必须可哈希，所以不能放列表；需要“不可变的集合”时用 frozenset。 a = set(\\"abracadabra\\")       # 字母去重\\nb = set(\\"alacazam\\")\\n\\nprint(a - b)                 # 只在 a 中\\nprint(a | b)                 # 并集\\nprint(a & b)                 # 交集\\nprint(a ^ b)                 # 对称差：只属于其中一个\\n\\nprint(\\"z\\" in a)              # False\\nempty = set()                # 注意：不是 {}\\nsquares = {x * x for x in range(6)}  # 集合推导式"},{"chapterId":"ch05","chapterNumber":"05","chapterTitle":"数据结构","chapterSlug":"data-structures","topicId":"topic-5","topicTitle":"字典：键值映射","text":"用 d[key] 取不存在的键会抛 KeyError；不确定键是否存在时，用 get() 并给默认值。 字典键必须可哈希，但值可以是任意对象。3.7+ 字典保持插入顺序，但这不意味着它是有序集合；需要排序时用 sorted(d)。 tel = {\\"jack\\": 4098, \\"sape\\": 4139}\\ntel[\\"guido\\"] = 4127\\nprint(tel.get(\\"irv\\"))            # None\\nprint(tel.get(\\"irv\\", 0))         # 0：避免 KeyError\\ntel.update({\\"jack\\": 4099})       # 更新已有键\\nprint(tel[\\"jack\\"])               # 4099\\n\\nfor name, number in tel.items():\\n    print(name, number)\\n\\nmerged = {**tel, \\"ada\\": 1234}    # 解包合并字典\\nprint(\\"ada\\" in merged)           # True\\n\\n# 键值反转 / 字典推导式\\nsquares = {n: n ** 2 for n in range(4)}  # {0: 0, 1: 1, 2: 4, 3: 9}\\nprint(list(squares))             # [0, 1, 2, 3]：按插入顺序"},{"chapterId":"ch05","chapterNumber":"05","chapterTitle":"数据结构","chapterSlug":"data-structures","topicId":"topic-6","topicTitle":"循环技巧与条件判断","text":"同时拿索引用 enumerate()；同时遍历多个序列用 zip()；反向用 reversed()；排序用 sorted()。 is 比较对象身份（是否为同一个对象），== 比较值。不要用 is 判断数字或字符串相等；判空统一用 is None。 knights = {\\"gallahad\\": \\"the pure\\", \\"robin\\": \\"the brave\\"}\\nfor k, v in knights.items():\\n    print(k, v)\\n\\nfor i, value in enumerate([\\"tic\\", \\"tac\\", \\"toe\\"], start=1):\\n    print(i, value)                 # 从 1 开始编号\\n\\nquestions = [\\"name\\", \\"quest\\"]\\nanswers = [\\"Lancelot\\", \\"Grail\\"]\\nfor q, a in zip(questions, answers):\\n    print(f\\"{q}: {a}\\")\\n\\nfor x in sorted({3, 1, 2}, reverse=True):\\n    print(x)                        # 3 2 1\\n\\nscore = 82\\nif 0 <= score <= 100:             # 链式比较\\n    print(\\"合法\\")\\n\\ninput_name = \\"\\"\\nname = input_name or \\"匿名用户\\"       # or 返回第一个真值\\nprint(name)                         # 匿名用户\\n\\nif (n := len(\\"hello\\")) > 3:         # 海象运算符：表达式内赋值\\n    print(n)                        # 5"},{"chapterId":"ch05","chapterNumber":"05","chapterTitle":"数据结构","chapterSlug":"data-structures","topicId":"topic-7","topicTitle":"序列比较与真值","text":"相同类型的序列按“字典序”逐元素比较；混合类型若没有定义比较关系，会直接抛 TypeError。 print((1, 2) < (1, 3))            # True\\nprint(\\"ABC\\" < \\"Python\\")           # True：按 Unicode 码位\\nprint([1, 2] == [1.0, 2.0])       # True：数值相等\\nprint((1, 2) < (1, 2, 0))         # True：短的是前缀\\n\\n# 常见“假值”：False, 0, \\"\\", [], {}, (), set(), None\\nitems = []\\nprint(\\"空\\" if not items else \\"有内容\\")  # 空"},{"chapterId":"ch06","chapterNumber":"06","chapterTitle":"模块","chapterSlug":"modules","topicId":"topic-1","topicTitle":"导入模块的几种方式","text":"import 模块 导入整个模块；from 模块 import 名字 只拿需要的名字。优先用前两种，避免 from module import *。 导入模块时，模块顶层代码会执行一次；之后再用同一模块会直接取自缓存，不会重复执行。导入副作用也应尽量少。 import math                       # 导入整个模块\\nfrom math import sqrt, pi        # 只导入需要的名字\\nimport statistics as stats       # 起别名，避免名字太长\\n\\nprint(math.floor(3.9))           # 3\\nprint(sqrt(16), pi)              # 4.0 3.141592653589793\\nprint(stats.mean([1, 2, 3]))     # 2\\n\\n# 不推荐：你不知道会覆盖当前命名空间里的哪些名字\\n# from math import *"},{"chapterId":"ch06","chapterNumber":"06","chapterTitle":"模块","chapterSlug":"modules","topicId":"topic-2","topicTitle":"作为脚本运行：__name__","text":"直接运行文件时，__name__ 的值是 \\"__main__\\"；被别的文件导入时，值是模块名。这个判断是 Python 脚本的标准入口写法。 模块名由文件名决定（my_tool.py → import my_tool）。不要把模块命名为 random.py、json.py 等标准库名，否则可能覆盖真正的标准库模块。 def fib(n):\\n    result = []\\n    a, b = 0, 1\\n    while a < n:\\n        result.append(a)\\n        a, b = b, a + b\\n    return result\\n\\nif __name__ == \\"__main__\\":    # 直接 python fibo.py 时成立\\n    print(fib(100))           # 被其他文件 import 时不执行"},{"chapterId":"ch06","chapterNumber":"06","chapterTitle":"模块","chapterSlug":"modules","topicId":"topic-3","topicTitle":"模块搜索路径与包","text":"解释器按 sys.path 找模块，通常包括当前目录、标准库目录和第三方库目录。包含 __init__.py 的目录可以作为“包”，用点号分层导入。 首次导入后会出现 __pycache__/ 和 .pyc 文件，这是字节码缓存，可以安全删除。python -m pkg.module 以模块方式运行，会让包内相对导入更可靠。 project/\\n├── main.py\\n└── sound/\\n    ├── __init__.py\\n    ├── formats/\\n    │   ├── __init__.py\\n    │   └── wav.py\\n    └── effects.py from sound.effects import echo   # 绝对导入，推荐\\n# from . import effects           # 包内相对导入（在包内文件中使用）\\n# from sound import *             # 不推荐\\n\\nimport math\\nprint(\\"sqrt\\" in dir(math))       # True：dir() 查看模块里的名字\\n# print(dir())                    # 不带参数：查看当前命名空间"},{"chapterId":"ch07","chapterNumber":"07","chapterTitle":"输入与输出","chapterSlug":"input-and-output","topicId":"topic-1","topicTitle":"格式化输出：f-string 优先","text":"在字符串前加 f，用 {表达式:格式} 插入内容。宽度、对齐、精度、百分比都能直接写在花括号里。 格式含义示例结果 :.2f两位小数3.14 :>8 / :<8右对齐 / 左对齐，宽度 8····abc :04d整数补零到 4 位0042 :,千位分隔符1,000,000 :.1%百分比，一位小数12.3% print() 默认自动加换行和空格；用 sep=、end= 控制，例如 print(\\"a\\", \\"b\\", sep=\\"-\\", end=\\"!\\") 输出 a-b!。 name, score = \\"Ada\\", 95.678\\n\\nprint(f\\"{name}: {score:.2f}\\")        # Ada: 95.68（保留两位小数）\\nprint(f\\"{name!r}\\")                   # \'Ada\'（repr 形式，调试有用）\\nprint(f\\"{score:>10.2f}\\")            # 宽度 10，右对齐\\nprint(f\\"{score=}\\")                   # score=95.678（3.8+ 调试写法）\\nprint(\\"{0} 得分 {1:.1f}\\".format(name, score))  # Ada 得分 95.7\\nprint(f\\"{0.25:.1%}\\")                 # 25.0%\\nprint(f\\"{255:04d} / {255:x}\\")        # 0255 / ff"},{"chapterId":"ch07","chapterNumber":"07","chapterTitle":"输入与输出","chapterSlug":"input-and-output","topicId":"topic-2","topicTitle":"读写文件：永远优先 with","text":"with open(...) as f 会在代码块结束时自动关闭文件，即使中途异常。文本文件建议显式写 encoding=\\"utf-8\\"。 用 \\"w\\" 打开会立刻清空原文件；不写编码容易在不同系统上产生乱码。二进制文件加 b（如 \\"rb\\"），此时读写的是 bytes。 常用模式：r 读、w 覆盖写、a 追加、x 仅当文件不存在时创建、+ 读写。其他方法：readline()、readlines()、seek()、tell()。 with open(\\"demo.txt\\", \\"w\\", encoding=\\"utf-8\\") as f:\\n    f.write(\\"第一行\\\\n第二行\\\\n\\")       # 覆盖写入\\n\\nwith open(\\"demo.txt\\", encoding=\\"utf-8\\") as f:\\n    for line in f:                    # 逐行读，适合大文件\\n        print(line.rstrip())          # 去掉行尾换行符\\n\\nwith open(\\"demo.txt\\", \\"a\\", encoding=\\"utf-8\\") as f:\\n    f.write(\\"追加一行\\\\n\\")             # 追加\\n\\n# 小文件也可以一次读：\\nwith open(\\"demo.txt\\", encoding=\\"utf-8\\") as f:\\n    text = f.read()"},{"chapterId":"ch07","chapterNumber":"07","chapterTitle":"输入与输出","chapterSlug":"input-and-output","topicId":"topic-3","topicTitle":"JSON：保存结构化数据","text":"json.dump 把对象写入文件，json.load 从文件读回；带 s 的 dumps/loads 操作字符串。 JSON 只支持字符串键，以及 dict / list / str / int / float / bool / null。元组会被转成数组，集合和自定义对象不能直接序列化。 import json\\n\\ndata = {\\"name\\": \\"Ada\\", \\"skills\\": [\\"Python\\", \\"SQL\\"], \\"active\\": True}\\n\\nwith open(\\"data.json\\", \\"w\\", encoding=\\"utf-8\\") as f:\\n    json.dump(data, f, ensure_ascii=False, indent=2)\\n\\nwith open(\\"data.json\\", encoding=\\"utf-8\\") as f:\\n    loaded = json.load(f)\\n\\nprint(loaded[\\"skills\\"][0])             # Python\\n\\ntext = json.dumps(data, ensure_ascii=False)\\nprint(json.loads(text) == data)        # True"},{"chapterId":"ch08","chapterNumber":"08","chapterTitle":"错误与异常","chapterSlug":"errors-and-exceptions","topicId":"topic-1","topicTitle":"try / except / else / finally","text":"把可能出错的代码放进 try；按异常类型精确捕获。else 在无异常时执行，finally 无论成败都执行。 不要写裸 except:，否则连 Ctrl+C 和拼写错误都会吞掉。捕获你真正知道如何处理的、尽量具体的异常；其余异常让它带着调用栈暴露出来。 def parse_age(text):\\n    try:\\n        age = int(text)           # 可能抛出 ValueError\\n    except ValueError:\\n        print(\\"不是整数\\")\\n        return None\\n    else:                         # 没有异常才执行\\n        print(\\"解析成功\\")\\n        return age\\n    finally:                      # 无论如何都执行\\n        print(\\"解析结束\\")\\n\\nprint(parse_age(\\"18\\"))\\n# 解析成功\\n# 解析结束\\n# 18\\n\\ntry:\\n    value = int(\\"abc\\")\\nexcept (ValueError, TypeError) as e:   # 同时捕获多种\\n    print(type(e).__name__)           # ValueError"},{"chapterId":"ch08","chapterNumber":"08","chapterTitle":"错误与异常","chapterSlug":"errors-and-exceptions","topicId":"topic-2","topicTitle":"raise、异常链与自定义异常","text":"raise 主动抛出异常；raise ... from e 保留原始原因。自定义异常通常继承 Exception，类名用 Error 结尾更清晰。 raise NewError(...) from None 可以隐藏原始异常；但除非确实需要，保留原因更利于排查。 class InsufficientFunds(Exception):\\n    \\"\\"\\"余额不足。\\"\\"\\"\\n    def __init__(self, balance, amount):\\n        super().__init__(f\\"余额 {balance}，不足以取出 {amount}\\")\\n        self.balance = balance\\n        self.amount = amount\\n\\ndef withdraw(balance, amount):\\n    if amount <= 0:\\n        raise ValueError(\\"金额必须为正\\")\\n    if amount > balance:\\n        raise InsufficientFunds(balance, amount)\\n    return balance - amount\\n\\ntry:\\n    withdraw(100, 150)\\nexcept InsufficientFunds as e:\\n    print(e)                       # 余额 100，不足以取出 150\\n    print(e.amount)                # 150\\n\\ndef to_int(text):\\n    try:\\n        return int(text)\\n    except ValueError as e:\\n        raise RuntimeError(\\"输入不是整数\\") from e   # 异常链\\n\\ntry:\\n    to_int(\\"abc\\")\\nexcept RuntimeError as e:\\n    print(e)                       # 输入不是整数\\n    print(type(e.__cause__).__name__)  # ValueError"},{"chapterId":"ch08","chapterNumber":"08","chapterTitle":"错误与异常","chapterSlug":"errors-and-exceptions","topicId":"topic-3","topicTitle":"上下文管理器：自动清理","text":"文件、锁、网络连接都适合用 with 管理。离开代码块时自动执行清理，哪怕中途抛出异常。 with open(\\"out.txt\\", \\"w\\", encoding=\\"utf-8\\") as f:\\n    f.write(\\"done\\")        # 结束 with 时自动 close()\\n\\n# 自己实现上下文管理器：实现 __enter__ / __exit__\\nclass Timer:\\n    def __enter__(self):\\n        import time\\n        self.start = time.perf_counter()\\n        return self\\n\\n    def __exit__(self, exc_type, exc, tb):\\n        import time\\n        print(f\\"耗时 {time.perf_counter() - self.start:.4f}s\\")\\n        return False        # False：不要吞掉异常\\n\\nwith Timer():\\n    sum(range(100_000))"},{"chapterId":"ch08","chapterNumber":"08","chapterTitle":"错误与异常","chapterSlug":"errors-and-exceptions","topicId":"topic-4","topicTitle":"异常组与提示 3.11+","text":"ExceptionGroup 把多个不相关的异常装在一起，except* 可以分别处理；add_note() 可以给异常附加排查提示。 入门先牢牢掌握普通 try/except；异常组主要出现在并发任务、批量校验等“同时发生多个错误”的场景。 try:\\n    raise ExceptionGroup(\\"批量处理失败\\", [\\n        ValueError(\\"A 格式错误\\"),\\n        TypeError(\\"B 类型错误\\"),\\n    ])\\nexcept* ValueError as group:\\n    print(\\"值错误:\\", group.exceptions)\\nexcept* TypeError as group:\\n    print(\\"类型错误:\\", group.exceptions)\\n\\ntry:\\n    1 / 0\\nexcept ZeroDivisionError as e:\\n    e.add_note(\\"提示：检查除数是否为 0\\")   # 3.11+\\n    print(e.__notes__)                     # [\'提示：检查除数是否为 0\']\\n    # 实际项目中通常接着 raise，交给上层处理"},{"chapterId":"ch09","chapterNumber":"09","chapterTitle":"类","chapterSlug":"classes","topicId":"topic-1","topicTitle":"作用域：LEGB 与 global / nonlocal","text":"查找变量依次走 Local → Enclosing → Global → Built-in。函数内默认会创建局部变量；要改外层的变量，必须显式声明。 函数里一旦给变量赋值，它默认就是局部变量。同名的全局变量不会自动被修改；忘记 global 往往会得到 UnboundLocalError。 x = \\"global\\"\\n\\ndef outer():\\n    x = \\"outer\\"\\n\\n    def inner():\\n        nonlocal x          # 修改“外层函数”的 x\\n        x = \\"changed\\"\\n\\n    inner()\\n    print(x)                # changed\\n\\nouter()\\nprint(x)                    # global：模块级 x 没变\\n\\ncount = 0\\n\\ndef increment():\\n    global count            # 修改模块级变量，需显式声明\\n    count += 1\\n\\nincrement()\\nprint(count)                # 1"},{"chapterId":"ch09","chapterNumber":"09","chapterTitle":"类","chapterSlug":"classes","topicId":"topic-2","topicTitle":"类、实例与构造器","text":"__init__ 初始化实例；self 指向当前实例。实例属性写在 self 上，类属性由所有实例共享。 类的“魔术方法”负责协议：__repr__ 调试展示、__len__ 支持 len()、__eq__ 支持 ==、__enter__/__exit__ 支持 with。 class Dog:\\n    species = \\"犬科\\"              # 类变量：所有实例共享\\n\\n    def __init__(self, name, age):\\n        self.name = name          # 实例变量：各实例独立\\n        self.age = age\\n\\n    def bark(self):\\n        return f\\"{self.name}: 汪！\\"\\n\\n    def __repr__(self):\\n        return f\\"Dog({self.name!r}, {self.age})\\"\\n\\nd = Dog(\\"Lucky\\", 3)\\nprint(d.bark())                   # Lucky: 汪！\\nprint(d.species)                  # 犬科\\nprint(d)                          # Dog(\'Lucky\', 3)\\n\\nclass Cat:\\n    tricks = []                   # 错误：可变类变量被所有实例共享\\n\\n    def add(self, trick):\\n        self.tricks.append(trick)\\n\\na, b = Cat(), Cat()\\na.add(\\"打滚\\")\\nprint(b.tricks)                   # [\'打滚\'] —— b 也被影响\\n\\nclass SafeCat:\\n    def __init__(self):\\n        self.tricks = []          # 正确：每个实例一份"},{"chapterId":"ch09","chapterNumber":"09","chapterTitle":"类","chapterSlug":"classes","topicId":"topic-3","topicTitle":"继承、super() 与 MRO","text":"子类继承父类的属性和方法，super() 调用父类实现。多继承时按 MRO（方法解析顺序）查找；没有特殊理由时优先组合，而不是层层继承。 Python 没有真正的私有成员：_name 是“不要随便动”的约定，__name 会被名称改写为 _类名__name，仍然可以被访问。 class Animal:\\n    def __init__(self, name):\\n        self.name = name\\n\\n    def speak(self):\\n        raise NotImplementedError   # 子类应实现\\n\\nclass Dog(Animal):\\n    def speak(self):\\n        return f\\"{self.name}: 汪！\\"\\n\\nclass Puppy(Dog):\\n    def __init__(self, name, age):\\n        super().__init__(name)      # 调用父类构造器\\n        self.age = age\\n\\np = Puppy(\\"豆豆\\", 1)\\nprint(p.speak())                    # 豆豆: 汪！\\nprint(isinstance(p, Animal))        # True：子类也是父类的一种\\n\\nclass A: pass\\nclass B(A): pass\\nclass C(A): pass\\nclass D(B, C): pass\\nprint([c.__name__ for c in D.__mro__])\\n# [\'D\', \'B\', \'C\', \'A\', \'object\']"},{"chapterId":"ch09","chapterNumber":"09","chapterTitle":"类","chapterSlug":"classes","topicId":"topic-4","topicTitle":"迭代器：__iter__ 与 __next__","text":"可迭代对象能用于 for；迭代器用 __next__ 逐个产出值，结束时抛 StopIteration。for 内部会自动处理这两件事。 class Countdown:\\n    def __init__(self, start):\\n        self.current = start\\n\\n    def __iter__(self):\\n        return self                  # 迭代器返回自身\\n\\n    def __next__(self):\\n        if self.current <= 0:\\n            raise StopIteration      # 用异常表示“结束”\\n        value = self.current\\n        self.current -= 1\\n        return value\\n\\nprint(list(Countdown(3)))            # [3, 2, 1]"},{"chapterId":"ch09","chapterNumber":"09","chapterTitle":"类","chapterSlug":"classes","topicId":"topic-5","topicTitle":"生成器：用 yield 惰性产出","text":"函数里出现 yield 就变成生成器。它不会一次算完所有结果，而是一次产出一个，适合大文件、无限流和节省内存。 生成器只能遍历一次；遍历结束后再 next() 会抛 StopIteration。需要重复使用结果时，把它转成 list() 或重新创建生成器。 def countdown(n):\\n    while n > 0:\\n        yield n              # 暂停并产出一个值\\n        n -= 1\\n\\ngen = countdown(3)\\nprint(next(gen))             # 3\\nprint(list(gen))             # [2, 1]（生成器只能遍历一次）\\n\\nsquares = (x * x for x in range(5))  # 生成器表达式：圆括号\\nprint(next(squares))                 # 0\\nprint(sum(squares))                  # 30（1+4+9+16）"},{"chapterId":"ch09","chapterNumber":"09","chapterTitle":"类","chapterSlug":"classes","topicId":"topic-6","topicTitle":"加分项：@dataclass 少写样板代码","text":"“以数据为主”的类，用数据类自动生成构造器、__repr__ 和相等比较，比手写更清楚。 from dataclasses import dataclass\\n\\n@dataclass\\nclass Point:\\n    x: int\\n    y: int\\n\\np = Point(1, 2)\\nprint(p)                          # Point(x=1, y=2)\\nprint(p == Point(1, 2))           # True\\n# 需要可变默认值时用 field(default_factory=list)"},{"chapterId":"ch10","chapterNumber":"10","chapterTitle":"标准库 I","chapterSlug":"the-standard-library","topicId":"topic-1","topicTitle":"脚本与操作系统：os / glob / sys / shutil","text":"处理路径、文件通配、命令行参数和复制文件，是自动化脚本的起点。先判断参数，再执行动作。 sys.exit(1) 会抛 SystemExit；shutil.rmtree() 删除前请打印并确认路径。路径拼接优先用 os.path.join()，新项目可考虑更现代的 pathlib。 import glob\\nimport os\\nimport sys\\nimport shutil\\n\\nprint(\\"当前目录:\\", os.getcwd())\\nprint(\\"当前目录下的 HTML:\\", glob.glob(\\"*.html\\"))\\n\\nif len(sys.argv) > 1:\\n    print(f\\"你好，{sys.argv[1]}\\")     # python demo.py Ada\\nelse:\\n    print(\\"用法: python demo.py <name>\\")\\n    sys.exit(1)                       # 非 0 退出码 = 失败\\n\\n# 示例：复制、移动、删除目录\\n# shutil.copy(\\"a.txt\\", \\"b.txt\\")\\n# shutil.move(\\"b.txt\\", \\"archive/b.txt\\")\\n# shutil.rmtree(\\"old_dir\\")           # 慎用：会递归删除目录"},{"chapterId":"ch10","chapterNumber":"10","chapterTitle":"标准库 I","chapterSlug":"the-standard-library","topicId":"topic-2","topicTitle":"正则、日期、数学与随机","text":"正则负责“找出文本模式”，datetime 负责时间计算，math / statistics 负责数值与统计。 正则表达式用原始字符串 r\\"...\\"，反斜杠不用写两次；re.fullmatch 要求整串匹配，re.search 只找第一个。 import math\\nimport random\\nimport re\\nimport statistics\\nfrom datetime import datetime, timedelta\\n\\ntext = \\"订单 A-102 和 B-205 已发货\\"\\nprint(re.findall(r\\"[A-Z]-\\\\d+\\", text))       # [\'A-102\', \'B-205\']\\nprint(re.sub(r\\"\\\\s+\\", \\" \\", \\"a   b\\\\nc\\"))      # a b c\\n\\nm = re.search(r\\"(\\\\d+)\\", \\"价格 42 元\\")\\nprint(m.group(1))                           # 42\\n\\nnow = datetime.now()\\nprint(now.strftime(\\"%Y-%m-%d %H:%M\\"))\\nprint((now + timedelta(days=1)).date())     # 明天\\n\\nprint(math.sqrt(16), math.pi)               # 4.0 3.14159...\\nprint(random.randint(1, 6))                 # 1~6（含端点）\\nprint(statistics.mean([1, 2, 3, 4]))       # 2.5"},{"chapterId":"ch10","chapterNumber":"10","chapterTitle":"标准库 I","chapterSlug":"the-standard-library","topicId":"topic-3","topicTitle":"网络、压缩与性能","text":"urllib 是标准库里的 HTTP 客户端；zlib 做无损压缩；timeit 用来比较小段代码的运行时间。 网络请求要处理超时、HTTP 状态码与 URLError；生产爬虫/API 项目通常会安装 requests 或 httpx，但先用标准库理解机制很有帮助。 from urllib.request import urlopen\\nimport timeit\\nimport zlib\\n\\n# 示例：读取网页（需要网络，实际项目可换 requests/httpx）\\nwith urlopen(\\"https://example.com\\", timeout=10) as response:\\n    html = response.read().decode(\\"utf-8\\")\\nprint(len(html))\\n\\nraw = b\\"hello\\" * 100\\ncompressed = zlib.compress(raw)\\nprint(len(raw), len(compressed))             # 500 18（zlib 版可能略有差异）\\nprint(zlib.decompress(compressed) == raw)    # True\\n\\n# 同一小段代码跑多次，比较相对耗时\\nprint(timeit.timeit(\\"sum(range(100))\\", number=1000))"},{"chapterId":"ch10","chapterNumber":"10","chapterTitle":"标准库 I","chapterSlug":"the-standard-library","topicId":"topic-4","topicTitle":"质量保障：文档测试与单元测试","text":"doctest 直接运行文档字符串里的 >>> 示例；unittest 用测试类和方法断言行为。 入门测试顺序：给纯函数写几个 assert → 用 unittest / pytest 组织 → 接入 CI。先测边界值：0、空、负数、超大输入。 import doctest\\nimport unittest\\n\\ndef add(a, b):\\n    \\"\\"\\"返回两数之和。\\n\\n    >>> add(1, 2)\\n    3\\n    >>> add(-1, 1)\\n    0\\n    \\"\\"\\"\\n    return a + b\\n\\n# doctest.testmod()    # 运行本模块中的文档示例\\n\\nclass TestAdd(unittest.TestCase):\\n    def test_add(self):\\n        self.assertEqual(add(1, 2), 3)\\n\\n# unittest.main()      # 在脚本中运行测试"},{"chapterId":"ch11","chapterNumber":"11","chapterTitle":"标准库 II","chapterSlug":"standard-library-two","topicId":"topic-1","topicTitle":"输出、模板与 pprint","text":"str() 给人看，repr() 给解释器和调试看；pprint 美化大型数据结构；string.Template 适合简单占位替换。 日常显示仍是 f-string 最快；需要让用户提供模板时，Template 的 $name 语法比 str.format 更安全直观。缺失字段可用 safe_substitute() 保留占位符。 from pprint import pprint\\nfrom string import Template\\n\\nvalue = \\"hello\\"\\nprint(str(value))            # hello\\nprint(repr(value))           # \'hello\'\\n\\npprint({\\"users\\": [{\\"name\\": \\"Ada\\"}, {\\"name\\": \\"Bob\\"}]})\\n\\nt = Template(\\"你好，$name！你有 $count 条消息。\\")\\nprint(t.substitute(name=\\"Ada\\", count=3))\\n# 你好，Ada！你有 3 条消息。"},{"chapterId":"ch11","chapterNumber":"11","chapterTitle":"标准库 II","chapterSlug":"standard-library-two","topicId":"topic-2","topicTitle":"二进制数据：struct","text":"struct.pack() 按格式把 Python 值编码为字节，unpack() 反向解析。格式串里的 > 表示大端序。 常见格式：i 4 字节整数、q 8 字节整数、f 单精度浮点、d 双精度、s 字节串。处理网络协议或文件格式时，注意端序与对齐。 import struct\\n\\npacked = struct.pack(\\">i4s\\", 1024, b\\"data\\")  # 大端 int + 4 字节\\nprint(len(packed))                             # 8\\n\\nnumber, raw = struct.unpack(\\">i4s\\", packed)\\nprint(number, raw)                             # 1024 b\'data\'"},{"chapterId":"ch11","chapterNumber":"11","chapterTitle":"标准库 II","chapterSlug":"standard-library-two","topicId":"topic-3","topicTitle":"并发与日志：threading / logging","text":"线程适合 I/O 等待型任务；join() 等线程结束。日志比到处 print 更适合真实程序，可分级、可输出到文件。 线程输出顺序不保证。CPU 密集任务受 GIL 限制，通常用 multiprocessing 或把热点交给 NumPy 等原生扩展；更简单的并发入口是 concurrent.futures。 import logging\\nimport threading\\nimport time\\n\\ndef worker(name):\\n    time.sleep(0.2)\\n    print(f\\"完成：{name}\\")\\n\\nthreads = [threading.Thread(target=worker, args=(f\\"任务{i}\\",)) for i in range(3)]\\nfor t in threads:\\n    t.start()\\nfor t in threads:\\n    t.join()                   # 等所有线程结束\\n\\nlogging.basicConfig(\\n    level=logging.INFO,\\n    format=\\"%(asctime)s %(levelname)s %(message)s\\",\\n)\\nlogging.info(\\"程序启动\\")\\nlogging.warning(\\"磁盘空间不足\\")"},{"chapterId":"ch11","chapterNumber":"11","chapterTitle":"标准库 II","chapterSlug":"standard-library-two","topicId":"topic-4","topicTitle":"容器与算法小工具","text":"按场景选工具：有序列表查位置用 bisect；随时取最小/最大用 heapq；计数用 Counter；缺省值用 defaultdict；两端进出用 deque。 另外：array 存紧凑同类型数字，deque 适合队列/滑动窗口，itertools 提供排列组合与惰性迭代工具。 from bisect import bisect_left\\nfrom collections import Counter, defaultdict\\nfrom heapq import heappop, heappush\\n\\nnums = [1, 3, 5, 7]\\nprint(bisect_left(nums, 5))        # 2：5 应插在索引 2\\n\\nheap = []\\nfor n in (5, 2, 8):\\n    heappush(heap, n)              # 最小堆\\nprint([heappop(heap) for _ in range(3)])  # [2, 5, 8]\\n\\nprint(Counter(\\"banana\\"))           # Counter({\'a\': 3, \'n\': 2, \'b\': 1})\\n\\nd = defaultdict(list)\\nd[\\"fruits\\"].append(\\"apple\\")        # 键不存在时自动创建 list\\nprint(d)                           # defaultdict(<class \'list\'>, {\'fruits\': [\'apple\']})"},{"chapterId":"ch11","chapterNumber":"11","chapterTitle":"标准库 II","chapterSlug":"standard-library-two","topicId":"topic-5","topicTitle":"精确小数、弱引用与其他","text":"金额等场景用 Decimal，避免二进制浮点误差；weakref 让引用不阻止对象被回收，适合缓存与观察者。 千万别用 Decimal(0.1)（把二进制误差带进去）；要从字符串构造：Decimal(\\"0.1\\")。上下文精度和舍入方式也可显式设置。 from decimal import Decimal\\nimport weakref\\n\\nprint(Decimal(\\"0.1\\") + Decimal(\\"0.2\\"))          # 0.3\\nprint(Decimal(\\"2.675\\").quantize(Decimal(\\"0.01\\")))  # 2.68\\n\\nclass Node:\\n    pass\\n\\nnode = Node()\\nref = weakref.ref(node)       # 不增加对象的引用计数\\nprint(ref() is node)          # True\\ndel node\\nprint(ref())                  # None：对象已被回收"},{"chapterId":"ch12","chapterNumber":"12","chapterTitle":"虚拟环境与包","chapterSlug":"virtual-environments","topicId":"topic-1","topicTitle":"创建并激活虚拟环境","text":"venv 会在项目目录下创建一套独立的 Python 与 site-packages。项目根目录的 .venv/ 是常见约定。 激活成功后，命令行前会出现 (.venv)。它只是临时修改 PATH；关闭终端或运行 deactivate 即可退出。不要提交 .venv/ 到 Git。 # 在项目根目录创建，.venv 是目录名（可自定义）\\npython -m venv .venv\\n\\n# PowerShell 激活\\n.\\\\.venv\\\\Scripts\\\\Activate.ps1\\n\\n# 如果 PowerShell 禁止运行脚本，可以不激活，直接调用：\\n# .\\\\.venv\\\\Scripts\\\\python.exe -m pip install requests\\n\\n# CMD 用户使用：\\n# .venv\\\\Scripts\\\\activate.bat python3 -m venv .venv\\nsource .venv/bin/activate"},{"chapterId":"ch12","chapterNumber":"12","chapterTitle":"虚拟环境与包","chapterSlug":"virtual-environments","topicId":"topic-2","topicTitle":"用 pip 安装与复现依赖","text":"统一用 python -m pip，确保装进“当前正在用的解释器”。安装包前先激活环境。 requirements.txt 记录精确版本，便于复现；如果是要发布给别人的库，通常用 pyproject.toml 声明依赖。团队项目也可使用 Poetry、uv 等工具。 # 升级 pip 本身\\npython -m pip install --upgrade pip\\n\\n# 安装第三方包\\npython -m pip install requests\\npython -m pip install \\"numpy>=2,<3\\"      # 版本范围\\n\\n# 查看已安装\\npython -m pip list\\n\\n# 记录并复现依赖\\npython -m pip freeze > requirements.txt\\npython -m pip install -r requirements.txt\\n\\n# 退出虚拟环境\\ndeactivate"},{"chapterId":"ch12","chapterNumber":"12","chapterTitle":"虚拟环境与包","chapterSlug":"virtual-environments","topicId":"topic-3","topicTitle":"依赖管理的好习惯","text":"一个项目一个环境：不要把所有包都塞进系统 Python，避免版本互相打架。 先隔离，再安装：看到 ModuleNotFoundError 时，先确认是不是环境不对，而不是急着再装一遍。 用版本范围而不是凭感觉：能运行后固定关键版本；升级后跑测试。 不提交环境目录：.gitignore 写 .venv/、__pycache__/、*.pyc。 Windows 上若 python 指向 Microsoft Store 的占位程序，可尝试 py -m venv .venv。多个 Python 版本并存时，创建环境就用你想要的版本命令，例如 py -3.13 -m venv .venv。"},{"chapterId":"ch13","chapterNumber":"13","chapterTitle":"接下来学什么","chapterSlug":"what-next","topicId":"topic-1","topicTitle":"用三个项目把语法变成能力","text":"项目会练到最小交付 文件整理器pathlib、循环、异常、函数按扩展名移动文件，先 dry-run 打印计划 CSV / JSON 小报表文件读写、字典、推导式、日期读数据、汇总、输出一份 Markdown 或 JSON 命令行查询工具argparse、HTTP、JSON、venv输入关键词，调用公开 API，格式化输出 每个项目只加一个新能力：先跑通，再测试，再重构。项目小没关系，完整闭环比“学完十个教程”更有价值。 from pathlib import Path\\n\\nfolder = Path(\\"downloads\\")\\nfor path in folder.iterdir():\\n    if path.is_file() and path.suffix == \\".pdf\\":\\n        print(\\"计划归档:\\", path.name)   # 先 dry-run，确认后再移动\\n        # path.rename(folder / \\"pdf\\" / path.name)"},{"chapterId":"ch13","chapterNumber":"13","chapterTitle":"接下来学什么","chapterSlug":"what-next","topicId":"topic-2","topicTitle":"资料优先级与进阶方向","text":"官方标准库文档：遇到问题先查函数说明和示例，而不是搜索引擎二手答案。 Python 语言参考：想彻底搞懂语法、作用域、数据模型时再读，不必从头背。 PEP 8 / 类型提示 / pytest：把代码写得让团队愿意维护。 方向选择：自动化与脚本、数据分析、Web/API、爬虫、机器学习。先选一个方向做深，而不是同时开五条线。 官方入口：标准库 · 语言参考 · PEP 8 · PyPI"},{"chapterId":"ch14","chapterNumber":"14","chapterTitle":"交互式解释器","chapterSlug":"interactive-editing","topicId":"topic-1","topicTitle":"补全、历史与上一次结果","text":"↑ / ↓ 翻历史命令；Ctrl + C 中断当前代码。 Tab 补全依赖终端与 readline，不是每个环境都完整支持。 运行脚本后进入交互模式：python -i demo.py，可继续检查脚本里的对象。 $ python\\nPython 3.15.x ...\\n>>> import math\\n>>> math.sq<Tab>       # 自动补全为 math.sqrt\\n>>> 2 + 3\\n5\\n>>> _                  # 上一次表达式的结果\\n5\\n>>> exit()             # 或 Ctrl+D（macOS/Linux）/ Ctrl+Z 回车（Windows）"},{"chapterId":"ch14","chapterNumber":"14","chapterTitle":"交互式解释器","chapterSlug":"interactive-editing","topicId":"topic-2","topicTitle":"比默认 REPL 更好用的工具","text":"IPython 提供语法高亮、? 查看帮助、%timeit 等魔法命令；Jupyter 适合探索数据和写可视化报告。 临时验证一个小语法，不要再新建文件；但可复用的逻辑，请及时回到 .py 文件并写测试。 python -m pip install ipython\\nipython"},{"chapterId":"ch15","chapterNumber":"15","chapterTitle":"浮点数：问题和限制","chapterSlug":"floating-point","topicId":"topic-1","topicTitle":"为什么 0.1 + 0.2 != 0.3","text":"计算机内部是二进制。像十进制的 1/3 无法写尽一样，十进制的 0.1 也不能用有限位二进制精确表示；计算时只能四舍五入到最接近的值。 不要用 == 比较两个浮点结果；用 math.isclose()。但 round() 也可能反直觉：round(2.675, 2) 是 2.67，因为 2.675 实际存储的值略小。 print(0.1 + 0.2)                 # 0.30000000000000004\\nprint(0.1 + 0.2 == 0.3)         # False\\nprint(f\\"{0.1:.20f}\\")            # 0.10000000000000000555\\nprint(round(0.1 + 0.2, 2))      # 0.3（仅适合展示）\\n\\nimport math\\nprint(math.isclose(0.1 + 0.2, 0.3))          # True：比较“足够接近”\\nprint(math.fsum([0.1] * 10))                 # 1.0：更精确的求和"},{"chapterId":"ch15","chapterNumber":"15","chapterTitle":"浮点数：问题和限制","chapterSlug":"floating-point","topicId":"topic-2","topicTitle":"需要精确计算时","text":"金额用“整数分”或 Decimal；分数场景用 Fraction；做数值计算时，先问“误差多大可以接受”，而不是追求永远相等。 浮点数不能精确表示所有十进制小数，也不能表示无限精度；这属于 IEEE 754 的通用限制。展示时格式化，比较时给容差，记账时使用 Decimal 或整数分。 import math\\nfrom decimal import Decimal\\nfrom fractions import Fraction\\n\\nprint(Decimal(\\"0.1\\") + Decimal(\\"0.2\\"))        # 0.3\\nprint(Decimal(\\"2.675\\").quantize(Decimal(\\"0.01\\")))  # 2.68\\nprint(Fraction(1, 10) + Fraction(2, 10))      # 3/10\\n\\n# 金额的实用写法：以“分”为单位存整数\\nprice_cents = 1999\\nquantity = 3\\ntotal_cents = price_cents * quantity\\nprint(f\\"¥{total_cents / 100:.2f}\\")            # ¥59.97\\n\\n# NaN 与无穷\\nnan = float(\\"nan\\")\\nprint(nan == nan)                              # False\\nprint(math.isnan(nan))                         # True"},{"chapterId":"ch16","chapterNumber":"16","chapterTitle":"附录速览","chapterSlug":"appendix","topicId":"topic-1","topicTitle":"可执行脚本模板","text":"复杂脚本不要把所有逻辑堆在模块顶层：放进 main()，通过 SystemExit 返回退出码，更方便测试和复用。 shebang 在 macOS/Linux 上可让脚本直接运行（配合 chmod +x script.py）；Windows 按文件关联执行，忽略这一行。 #!/usr/bin/env python3\\n\\"\\"\\"脚本说明：一句话写清用途。\\"\\"\\"\\n\\nimport sys\\n\\ndef main() -> int:\\n    print(\\"hello\\")\\n    return 0\\n\\nif __name__ == \\"__main__\\":\\n    raise SystemExit(main())   # 0 = 成功；非 0 = 失败"},{"chapterId":"ch16","chapterNumber":"16","chapterTitle":"附录速览","chapterSlug":"appendix","topicId":"topic-2","topicTitle":"交互模式与启动定制","text":"python -i script.py：运行脚本后保留交互环境，便于检查变量。 PYTHONSTARTUP：指向一个启动文件，只在交互模式自动执行，适合预导入常用模块。 sitecustomize.py / usercustomize.py：站点级 / 用户级定制，会影响所有 Python 进程，非必要不要使用。 退出码：成功通常为 0，失败用 sys.exit(1) 或 SystemExit(main())。 脚本读环境变量或参数，不要硬编码密码；需要配置时优先环境变量或 .env（配合 python-dotenv），并把真实密钥排除在版本库外。"}]')},18566,(e,t,n)=>{t.exports=e.r(76562)}]);