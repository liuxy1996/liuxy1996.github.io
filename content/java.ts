import type { LanguageBook } from "@/lib/language-books";

export const javaBook: LanguageBook = {
  id: "java",
  title: "Java 8",
  subtitle: "Lambda、Stream 与异步",
  description:
    "从 JDK、类与接口出发，理解 Lambda、Stream、Collector、Optional、Date/Time 和 CompletableFuture。Java 8 是语言演进中的关键版本，这册笔记专注于它留下的函数式基础。",
  language: "Java",
  level: "入门到进阶",
  sourceName: "Java Platform, Standard Edition 8 Documentation",
  sourceUrl: "https://docs.oracle.com/javase/8/docs/",
  sourceNote:
    "参考 Oracle JDK 8 文档、Java Tutorials 与公开 API 规范独立整理；不是商业书籍的逐章翻译。Java 8 已结束公开更新，新项目建议使用更新的 LTS 版本。",
  parts: [
    {
      id: "language",
      title: "语言与类型",
      eyebrow: "LANGUAGE",
      description: "JDK、类、接口和泛型，先把 Java 的静态类型世界走一遍。",
    },
    {
      id: "functional",
      title: "函数式 Java",
      eyebrow: "FUNCTIONAL",
      description: "Lambda、Stream、Collector 与 Optional 改变了表达式和数据的写法。",
    },
    {
      id: "modern",
      title: "时间与异步",
      eyebrow: "MODERN",
      description: "不可变时间模型，以及用 CompletableFuture 组合异步任务。",
    },
  ],
  chapters: [
    {
      slug: "getting-started",
      number: "01",
      title: "JDK、类与第一个程序",
      partId: "language",
      minutes: 9,
      lede: "安装 JDK，写一个能编译运行的类，理解包、入口方法和静态类型。",
      sections: [
        {
          id: "jdk",
          heading: "JDK、JRE 与 javac",
          html: `
            <p>Java 源码先由 <code>javac</code> 编译成字节码，再由 JVM 执行。学习 Java 8 需要 JDK，而不只是 JRE。生产项目现在通常使用更新的 LTS 版本，但这册代码保持 Java 8 语法。</p>
          `,
          code: [
            {
              lang: "shell",
              label: "终端 · 编译并运行",
              code: `javac -version
javac HelloJava.java
java HelloJava`,
            },
          ],
        },
        {
          id: "first-program",
          heading: "一个类就是程序的起点",
          html: `
            <p>Java 代码必须写在类里。<code>main</code> 是入口方法，签名固定为 <code>public static void main(String[] args)</code>。<code>public</code> 控制访问，<code>static</code> 表示不需要实例，<code>void</code> 表示没有返回值。</p>
          `,
          code: [
            {
              lang: "java",
              label: "HelloJava.java",
              code: `public class HelloJava {
    public static void main(String[] args) {
        String name = "Java 8";
        System.out.println("你好，" + name);
    }
}`,
            },
          ],
        },
        {
          id: "packages",
          heading: "包名与目录",
          html: `
            <p>包把类型组织成命名空间，也对应着源码目录。声明 <code>package com.example.app;</code> 后，文件应放在 <code>com/example/app/</code> 下。包名通常使用公司域名的倒序。</p>
            <p>对于小练习，默认包可以省事；一旦代码超过一个文件，就应该开始使用包，避免类名冲突。</p>
          `,
          code: [
            {
              lang: "java",
              label: "com/example/app/Main.java",
              code: `package com.example.app;

public class Main {
    public static void main(String[] args) {
        System.out.println("package ready");
    }
}`,
            },
          ],
        },
      ],
      takeaways: [
        "JDK = 编译器 + 运行时 + 工具，源码先编译成字节码。",
        "main 的签名固定；Java 代码必须位于类中。",
        "从多文件开始就使用 package，并让目录与包名一致。",
      ],
    },
    {
      slug: "objects-and-generics",
      number: "02",
      title: "对象、接口与泛型",
      partId: "language",
      minutes: 12,
      lede: "用封装保护状态，用接口表达能力，用泛型让类型关系在编译期成立。",
      sections: [
        {
          id: "encapsulation",
          heading: "让字段私有，让行为公开",
          html: `
            <p>类的字段通常声明为 <code>private</code>，通过方法暴露必要的操作。这样做不是仪式，而是把“状态如何变化”集中在一个地方，方便校验、调试和以后修改。</p>
            <p><code>final</code> 字段一旦赋值就不能再改；<code>final</code> 引用也不能指向另一个对象，但对象内部仍可能可变。这两件事要分清。</p>
          `,
          code: [
            {
              lang: "java",
              label: "封装一个阅读状态",
              code: `public final class Reading {
    private final String title;
    private int chapter;

    public Reading(String title) {
        this.title = title;
    }

    public void setChapter(int chapter) {
        if (chapter < 0) {
            throw new IllegalArgumentException("chapter >= 0");
        }
        this.chapter = chapter;
    }

    public String summary() {
        return title + " · 第 " + chapter + " 章";
    }
}`,
            },
          ],
        },
        {
          id: "interfaces",
          heading: "接口描述能力",
          html: `
            <p>接口表达“能做什么”，类表达“是什么，以及怎样做”。一个类可以实现多个接口，因此接口是组织可组合能力的主要方式。</p>
            <p>Java 8 之前接口只能有抽象方法；Java 8 引入了 <code>default</code> 和 <code>static</code> 方法，后面会单独讨论它们带来的影响。</p>
          `,
          code: [
            {
              lang: "java",
              label: "接口与实现",
              code: `interface Describable {
    String describe();
}

class Book implements Describable {
    private final String title;

    Book(String title) {
        this.title = title;
    }

    @Override
    public String describe() {
        return "《" + title + "》";
    }
}`,
            },
          ],
        },
        {
          id: "generics",
          heading: "泛型：把类型推迟到调用处",
          html: `
            <p>泛型让容器和算法在编译期保留元素类型。<code>Box&lt;T&gt;</code> 里的 T 是类型参数，调用 <code>new Box&lt;&gt;("Rust")</code> 时再推断。使用泛型后，从容器取出的值不再需要强制转换，错误也会更早暴露。</p>
          `,
          code: [
            {
              lang: "java",
              label: "泛型类与通配符",
              code: `public class Box<T> {
    private final T value;

    public Box(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

Box<String> title = new Box<>("Java 8");
String value = title.get();

List<? extends Number> numbers = Arrays.asList(1, 2.5, 3);`,
            },
          ],
        },
      ],
      takeaways: [
        "字段私有、行为公开，让状态变化有唯一入口。",
        "接口描述能力，类可以组合多个接口。",
        "泛型让类型在编译期被保留，减少强制转换。",
      ],
    },
    {
      slug: "lambdas",
      number: "03",
      title: "Lambda 与函数式接口",
      partId: "functional",
      minutes: 12,
      lede: "Lambda 不是匿名类的语法糖：它让函数成为可传递的值，也让 Java 的集合操作开始变得可组合。",
      sections: [
        {
          id: "functional-interface",
          heading: "一个抽象方法就是一个函数类型",
          html: `
            <p>函数式接口是只有一个抽象方法的接口。Lambda 会根据目标类型推断参数和返回值。JDK 已经提供了常用的函数类型：<code>Function&lt;T,R&gt;</code>、<code>Predicate&lt;T&gt;</code>、<code>Consumer&lt;T&gt;</code>、<code>Supplier&lt;T&gt;</code>。</p>
          `,
          code: [
            {
              lang: "java",
              label: "自定义函数式接口",
              code: `@FunctionalInterface
interface Calculator {
    int apply(int a, int b);
}

public class LambdaDemo {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;

        System.out.println(add.apply(2, 3));
        System.out.println(multiply.apply(2, 3));
    }
}`,
            },
            {
              lang: "java",
              label: "标准函数类型",
              code: `Function<String, Integer> length = String::length;
Predicate<String> empty = String::isEmpty;
Consumer<String> printer = System.out::println;
Supplier<String> greeting = () -> "hello";

System.out.println(length.apply("study")); // 5
System.out.println(empty.test(""));        // true
printer.accept(greeting.get());`,
            },
          ],
        },
        {
          id: "method-reference",
          heading: "方法引用让意图更直接",
          html: `
            <p>当 Lambda 只是原样调用一个已有方法时，用方法引用更短、更容易读。四种常见形式是 <code>Type::staticMethod</code>、<code>instance::method</code>、<code>Type::instanceMethod</code> 和 <code>Type::new</code>。</p>
          `,
          code: [
            {
              lang: "java",
              label: "几种方法引用",
              code: `List<String> names = Arrays.asList("rust", "java", "go");

names.forEach(System.out::println);
names.sort(String::compareToIgnoreCase);

Function<String, Integer> parse = Integer::parseInt;
Supplier<List<String>> factory = ArrayList::new;`,
            },
          ],
        },
        {
          id: "capture",
          heading: "捕获变量必须有效 final",
          html: `
            <p>Lambda 可以读取外部局部变量，但这些变量必须事实上不可变。Java 没有闭包修改局部变量的机制，需要修改状态时，用有一个元素的数组、可变对象或显式设计返回新值。</p>
            <p>这看起来受限，但能让并发下的捕获关系更容易分析。优先让函数保持无副作用的纯变换。</p>
          `,
          code: [
            {
              lang: "java",
              label: "捕获不可变变量",
              code: `String prefix = "book-";
Function<Integer, String> label = number -> prefix + number;
System.out.println(label.apply(8));

// 下面这样会编译失败，因为 prefix 不是有效 final
// prefix = "volume-";`,
            },
          ],
        },
      ],
      takeaways: [
        "函数式接口 = 一个抽象方法；Lambda 是它的简洁实现。",
        "方法引用适合直接转发给已有方法。",
        "Lambda 捕获的局部变量必须有效 final。",
      ],
    },
    {
      slug: "streams",
      number: "04",
      title: "Stream 管道",
      partId: "functional",
      minutes: 14,
      lede: "Stream 把“遍历并变换集合”拆成一条可组合的管道，同时保持惰性和不可变性。",
      sections: [
        {
          id: "pipeline",
          heading: "源、中间操作与终止操作",
          html: `
            <p>Stream 不存储数据，它从集合、数组或生成器读取数据。中间操作如 <code>filter</code>、<code>map</code>、<code>sorted</code> 返回新的 Stream，终止操作如 <code>collect</code>、<code>forEach</code>、<code>count</code> 才真正触发计算。</p>
            <p>一条管道只消费一次。不要把同一个 Stream 保存起来反复使用。</p>
          `,
          code: [
            {
              lang: "java",
              label: "从 List 到 Stream",
              code: `List<String> names = Arrays.asList("rust", "java", "go", "python");

List<String> result = names.stream()
    .filter(name -> name.length() > 2)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

System.out.println(result); // [GO, JAVA, PYTHON, RUST]`,
            },
          ],
        },
        {
          id: "flat-map",
          heading: "flatMap 与 reduce",
          html: `
            <p><code>flatMap</code> 把每个元素映射成 Stream 后再合并，适合处理嵌套列表；<code>reduce</code> 把一串值折叠成一个值。对于整数求和，优先使用 <code>mapToInt(...).sum()</code>，避免不必要的装箱。</p>
          `,
          code: [
            {
              lang: "java",
              label: "展开与折叠",
              code: `List<List<Integer>> nested = Arrays.asList(
    Arrays.asList(1, 2),
    Arrays.asList(3, 4)
);

List<Integer> doubled = nested.stream()
    .flatMap(List::stream)
    .map(number -> number * 2)
    .collect(Collectors.toList());

int sum = doubled.stream()
    .mapToInt(Integer::intValue)
    .sum();

System.out.println(doubled); // [2, 4, 6, 8]
System.out.println(sum);     // 20`,
            },
          ],
        },
        {
          id: "lazy",
          heading: "惰性、短路与副作用",
          html: `
            <p>中间操作是惰性的，所以 <code>anyMatch</code>、<code>findFirst</code> 可以在找到结果后停止处理剩余元素。不要在 <code>map</code> 或 <code>filter</code> 里打印、修改集合或做网络请求；Stream 应该描述“计算”，而不是隐藏控制流。</p>
            <p>需要索引时，用 <code>IntStream.range</code> 或普通的 <code>for</code> 循环往往更清楚。Stream 不是替代所有循环的命令。</p>
          `,
          code: [
            {
              lang: "java",
              label: "短路操作",
              code: `boolean hasLongName = names.stream()
    .anyMatch(name -> name.length() > 5);

Optional<String> first = names.stream()
    .filter(name -> name.startsWith("j"))
    .findFirst();`,
            },
          ],
        },
      ],
      takeaways: [
        "Stream 是惰性的，终止操作才触发计算。",
        "flatMap 展开嵌套结构，mapToInt 避免装箱开销。",
        "Stream 适合无副作用的变换，不要用它隐藏状态修改。",
      ],
    },
    {
      slug: "collectors-and-parallel",
      number: "05",
      title: "Collector 与并行流",
      partId: "functional",
      minutes: 13,
      lede: "用 Collector 把流收束成 Map、分组或字符串；并行流只有在对的场合才值得用。",
      sections: [
        {
          id: "collectors",
          heading: "分组、计数与连接",
          html: `
            <p><code>Collectors.groupingBy</code> 按分类函数把元素放进 Map，<code>counting</code> 统计数量，<code>joining</code> 把字符串连接起来。Collector 可以组合，但组合越多越要关注可读性。</p>
          `,
          code: [
            {
              lang: "java",
              label: "常用 Collector",
              code: `List<String> names = Arrays.asList("rust", "java", "go", "ruby");

Map<Integer, List<String>> byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));

Map<Integer, Long> counts = names.stream()
    .collect(Collectors.groupingBy(String::length, Collectors.counting()));

String joined = names.stream()
    .collect(Collectors.joining(", ", "[", "]"));

System.out.println(byLength);
System.out.println(counts);
System.out.println(joined);`,
            },
          ],
        },
        {
          id: "parallel",
          heading: "并行流不是默认选项",
          html: `
            <p><code>parallelStream</code> 会把工作拆给 ForkJoinPool。它适合数据量较大、操作无共享状态、计算成本高于调度成本的场景。小列表、I/O、阻塞调用和共享可变状态，往往会更慢或更危险。</p>
            <p>并行流不会自动让代码线程安全；它只是改变执行方式。先用测量结果决定，而不是看到 Stream 就加 <code>parallel</code>。</p>
          `,
          code: [
            {
              lang: "java",
              label: "无状态并行计算",
              code: `long evenCount = IntStream.range(1, 1_000_000)
    .parallel()
    .filter(number -> number % 2 == 0)
    .count();

System.out.println(evenCount);`,
            },
          ],
        },
        {
          id: "side-effects",
          heading: "避免在流里修改外部集合",
          html: `
            <p>下面这种写法在并行时会丢失数据，在串行时也只是看起来能工作：多个元素同时向同一个 <code>ArrayList</code> 添加。正确做法是用 <code>collect</code>，让 Collector 管理结果容器。</p>
          `,
          code: [
            {
              lang: "java",
              label: "错误与正确的收集方式",
              code: `List<String> result = new ArrayList<>();

// 不推荐：有外部副作用，并行时不安全
// names.parallelStream().forEach(name -> result.add(name));

// 推荐：由 Collector 管理容器
List<String> safe = names.parallelStream()
    .filter(name -> name.length() > 2)
    .collect(Collectors.toList());`,
            },
          ],
        },
      ],
      takeaways: [
        "groupingBy / counting / joining 覆盖大多数聚合需求。",
        "并行流只适合无状态、计算密集、数据量足够的场景。",
        "不要在流中使用共享可变容器，交给 collect。",
      ],
    },
    {
      slug: "optional-and-default-methods",
      number: "06",
      title: "Optional 与默认方法",
      partId: "functional",
      minutes: 11,
      lede: "Optional 让“可能没有”变成返回类型（而不只是 null），默认方法允许接口在不破坏实现者的情况下演化。",
      sections: [
        {
          id: "optional",
          heading: "把缺失写进类型",
          html: `
            <p><code>Optional</code> 用来表达一个方法可能返回空结果。它是返回值类型，不适合作为字段类型或方法参数，也不应该用 <code>get()</code> 直接取值。用 <code>map</code>、<code>flatMap</code>、<code>orElse</code> 和 <code>orElseThrow</code> 组合。</p>
          `,
          code: [
            {
              lang: "java",
              label: "Optional 的常见用法",
              code: `Optional<String> found = findName("rust");

String label = found
    .map(String::toUpperCase)
    .orElse("UNKNOWN");

String required = found.orElseThrow(
    () -> new IllegalStateException("name is required")
);

// 不推荐：Optional.of(null) 会抛异常
// Optional<String> bad = Optional.of(null);`,
            },
          ],
        },
        {
          id: "default-methods",
          heading: "默认方法：接口的向后兼容",
          html: `
            <p>Java 8 允许接口提供 <code>default</code> 方法，新增行为时不必让所有实现类立刻改写。这让 Stream 等新 API 可以持续扩展。代价是多个接口提供同名默认方法时，实现类必须显式解决冲突。</p>
            <p>默认方法适合稳定的通用行为，不适合把接口变成状态复杂的基类。</p>
          `,
          code: [
            {
              lang: "java",
              label: "default 与 static",
              code: `interface Repository {
    List<String> all();

    default boolean isEmpty() {
        return all().isEmpty();
    }

    static Repository empty() {
        return Collections::emptyList;
    }
}`,
            },
          ],
        },
        {
          id: "diamond",
          heading: "菱形冲突要显式解决",
          html: `
            <p>如果两个接口都提供同签名的默认方法，实现类无法确定应该使用哪一个。编译器会要求覆盖该方法，并用 <code>Interface.super.method()</code> 指定选择。</p>
          `,
          code: [
            {
              lang: "java",
              label: "解决默认方法冲突",
              code: `interface A {
    default String name() { return "A"; }
}

interface B {
    default String name() { return "B"; }
}

class C implements A, B {
    @Override
    public String name() {
        return A.super.name() + "+" + B.super.name();
    }
}`,
            },
          ],
        },
      ],
      takeaways: [
        "Optional 是返回值语义，不是 null 的万能替代品。",
        "默认方法让接口能演化，但冲突必须显式处理。",
        "不要用 Optional 作为字段或集合元素；真实缺失应被建模成业务状态。",
      ],
    },
    {
      slug: "date-time",
      number: "07",
      title: "新的日期与时间 API",
      partId: "modern",
      minutes: 10,
      lede: "用不可变的 LocalDate、LocalDateTime、Instant 与 Duration 替代容易出错的 Date 和 Calendar。",
      sections: [
        {
          id: "local",
          heading: "LocalDate 与 LocalDateTime",
          html: `
            <p>新的时间类型默认不可变，所有修改都会返回新对象。这消除了共享可变日期在并发中的大量问题。<code>LocalDate</code> 只有日期，<code>LocalTime</code> 只有时间，<code>LocalDateTime</code> 是两者的组合。</p>
          `,
          code: [
            {
              lang: "java",
              label: "构造与格式化",
              code: `LocalDate date = LocalDate.of(2026, 11, 12);
LocalDate nextWeek = date.plusWeeks(1);

DateTimeFormatter formatter =
    DateTimeFormatter.ofPattern("yyyy年MM月dd日");

System.out.println(nextWeek.format(formatter));

LocalDateTime meeting = LocalDateTime.of(date, LocalTime.of(10, 0));
System.out.println(meeting.plusMinutes(45));`,
            },
          ],
        },
        {
          id: "duration",
          heading: "Duration、Period 与 Instant",
          html: `
            <p><code>Duration</code> 表示精确的时间长度（秒和纳秒），适合计算两个时刻之间相差多久；<code>Period</code> 按年月日表示日期差；<code>Instant</code> 是 UTC 时间线上的一个点，适合记录事件时间。</p>
          `,
          code: [
            {
              lang: "java",
              label: "时间长度与时刻",
              code: `Instant start = Instant.now();
Instant end = start.plusSeconds(90);

Duration duration = Duration.between(start, end);
System.out.println(duration.toMinutes()); // 1

Period period = Period.ofMonths(2);
LocalDate later = LocalDate.now().plus(period);
System.out.println(later);`,
            },
          ],
        },
        {
          id: "timezone",
          heading: "时区不是装饰",
          html: `
            <p>面向用户的时刻通常需要时区信息，使用 <code>ZonedDateTime</code> 或 <code>OffsetDateTime</code>。服务器内部存储建议使用 UTC 的 <code>Instant</code>，只在展示层转换为用户时区，并明确夏令时规则。</p>
          `,
          code: [
            {
              lang: "java",
              label: "时区转换",
              code: `ZonedDateTime tokyo = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
ZonedDateTime shanghai = tokyo.withZoneSameInstant(ZoneId.of("Asia/Shanghai"));

System.out.println(tokyo);
System.out.println(shanghai);`,
            },
          ],
        },
      ],
      takeaways: [
        "新时间 API 不可变，修改操作总是返回新对象。",
        "Duration 表示精确时长，Period 表示年月日跨度。",
        "存储用 UTC Instant，展示时再放到正确时区。",
      ],
    },
    {
      slug: "completable-future",
      number: "08",
      title: "CompletableFuture 与异步组合",
      partId: "modern",
      minutes: 15,
      lede: "把异步任务像 Stream 一样组合起来，同时知道异常、线程池和阻塞边界在哪里。",
      sections: [
        {
          id: "async",
          heading: "从 Future 到可组合异步",
          html: `
            <p><code>CompletableFuture</code> 允许注册回调，而不必立刻阻塞等待。<code>supplyAsync</code> 产生值，<code>thenApply</code> 做同步映射，<code>thenCompose</code> 在结果上继续启动另一个异步任务。</p>
          `,
          code: [
            {
              lang: "java",
              label: "异步管道",
              code: `ExecutorService pool = Executors.newFixedThreadPool(2);

CompletableFuture<String> user =
    CompletableFuture.supplyAsync(() -> fetchUser(), pool);

CompletableFuture<Integer> length = user.thenApply(String::length);

length.thenAccept(size -> System.out.println("length = " + size));

pool.shutdown();`,
            },
          ],
        },
        {
          id: "combine",
          heading: "组合两个结果",
          html: `
            <p><code>thenCombine</code> 等两个独立任务都完成后合并结果；<code>allOf</code> 适合等待一组任务。不要在异步回调里调用 <code>get()</code>，那会把流水线重新变成阻塞调用。</p>
          `,
          code: [
            {
              lang: "java",
              label: "组合与等待",
              code: `CompletableFuture<String> name =
    CompletableFuture.supplyAsync(() -> "study-room");

CompletableFuture<Integer> score =
    CompletableFuture.supplyAsync(() -> 42);

CompletableFuture<String> summary =
    name.thenCombine(score, (n, s) -> n + ":" + s);

CompletableFuture<Void> all = CompletableFuture.allOf(name, score);
all.thenRun(() -> System.out.println("both ready"));

summary.thenAccept(System.out::println);`,
            },
          ],
        },
        {
          id: "errors",
          heading: "异常也属于返回值",
          html: `
            <p><code>exceptionally</code> 在失败时提供替代值，<code>handle</code> 同时接收结果和异常。异常不会自动“冒泡”到调用栈，它会被包装进 CompletionException，所以异步管道必须在边界处明确处理。</p>
          `,
          code: [
            {
              lang: "java",
              label: "失败处理",
              code: `CompletableFuture<Integer> safe = CompletableFuture
    .supplyAsync(() -> Integer.parseInt("not-a-number"))
    .handle((value, error) -> error == null ? value : -1);

System.out.println(safe.join()); // -1`,
            },
          ],
        },
      ],
      takeaways: [
        "thenApply 做映射，thenCompose 连接另一个异步任务。",
        "不要在回调里 get 阻塞；在最终边界再等待。",
        "异常会被包进 Future，用 exceptionally / handle 明确处理。",
      ],
    },
  ],
};
