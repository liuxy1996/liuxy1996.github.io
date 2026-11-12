import type { LanguageBook } from "@/lib/language-books";

export const javaBook: LanguageBook = {
  id: "java",
  title: "On Java 8",
  subtitle: "对象、泛型、函数式与并发",
  description:
    "Bruce Eckel 在《Java 编程思想》之后写下的 Java 8 版本。这册导读按原书目录重新组织：从对象、封装、复用和多态，一路走到集合、函数式、泛型、文件、注解与并发。",
  language: "Java",
  level: "入门到进阶",
  author: "Bruce Eckel",
  sourceName: "On Java 8 · 中文在线版",
  sourceUrl: "https://usigned.github.io/OnJava8/#/",
  sourceNote:
    "Bruce Eckel 著，事实上的《Java 编程思想》第五版，基于 Java 8。本册是按原书目录独立整理的中文导读、概念地图与代码示例，不是原书全文转载；完整内容请阅读原书。",
  parts: [
    {
      id: "objects",
      title: "对象与语言",
      eyebrow: "OBJECTS & LANGUAGE",
      description: "从对象模型、运算符、控制流一路走到封装、复用、多态、接口与内部类。",
    },
    {
      id: "functional",
      title: "容器与函数式",
      eyebrow: "COLLECTIONS & FUNCTIONS",
      description: "集合、Lambda 与流：Java 8 如何把数据变换写得更可组合。",
    },
    {
      id: "types",
      title: "类型与工程",
      eyebrow: "TYPES & CRAFT",
      description: "异常、测试、文件、字符串、类型信息、泛型、数组、枚举与注解。",
    },
    {
      id: "concurrency",
      title: "并发",
      eyebrow: "CONCURRENCY",
      description: "任务、线程池、共享状态、CompletableFuture 与死锁。",
    },
  ],
  chapters: [
    {
      slug: "objects",
      number: "01",
      title: "对象的概念",
      partId: "objects",
      minutes: 12,
      lede: "先建立对象模型：状态、行为、接口、封装、复用、继承与多态，是后面所有语法的地基。",
      sections: [
        {
          id: "object-model",
          heading: "对象、类与接口",
          html: `
            <p>对象把状态和行为放在同一个边界里；类描述这类对象共同的字段和方法；接口描述外部真正依赖的能力。写类时最重要的问题不是“能不能复用”，而是“谁需要知道它”。</p>
            <p>把这几个词分开看，后面的封装、继承和多态就不会变成记忆负担。</p>
          `,
          code: [
            {
              lang: "java",
              label: "一个最小的对象",
              code: `class Book {
    private final String title;
    private int chapter;

    Book(String title) {
        this.title = title;
    }

    void readTo(int chapter) {
        this.chapter = chapter;
    }

    String summary() {
        return title + " · 第 " + chapter + " 章";
    }
}`,
            },
          ],
        },
        {
          id: "reuse-polymorphism",
          heading: "复用、继承与多态",
          html: `
            <p>组合表示“有一个”，继承表示“是一种”。组合通常更灵活；继承的价值在于让调用者只依赖父类型，而具体行为由子类决定，这就是多态。</p>
            <p>不要为了共享几行代码就继承。先问：子类型是否真的可以被父类型替换？这个判断比“代码像不像”更重要。</p>
          `,
          code: [
            {
              lang: "java",
              label: "父类型引用，子类型行为",
              code: `class LibraryItem {
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
System.out.println(item.label()); // 书籍`,
            },
          ],
        },
      ],
      takeaways: [
        "类负责一个边界内的状态与行为，接口描述外部依赖的能力。",
        "组合优先于继承；继承的前提是子类型真的可以替代父类型。",
        "多态让调用者依赖抽象，让变化留在实现里。",
      ],
    },
    {
      slug: "installing",
      number: "02",
      title: "安装 Java 与本书用例",
      partId: "objects",
      minutes: 7,
      lede: "准备 JDK，理解 javac 与 java 的分工，跑起一个带包名的示例。",
      sections: [
        {
          id: "toolchain",
          heading: "JDK、javac 与 java",
          html: `
            <p>JDK 包含编译器、JVM 和标准库。源码由 <code>javac</code> 编译成 <code>.class</code> 字节码，再由 <code>java</code> 启动 JVM 执行。Java 8 已经结束公开更新；学习本书的示例时建议使用当前 LTS，遇到版本差异再切换。</p>
          `,
          code: [
            {
              lang: "shell",
              label: "终端 · 检查与运行",
              code: `javac -version
java -version
javac Hello.java
java Hello`,
            },
          ],
        },
        {
          id: "packages",
          heading: "包、目录与示例代码",
          html: `
            <p>包名对应目录，也提供了命名空间。原书示例通常按章节组织包。自己练习时先保持一个清晰的目录结构，再考虑构建工具。</p>
          `,
          code: [
            {
              lang: "java",
              label: "chapter01/Hello.java",
              code: `package chapter01;

public class Hello {
    public static void main(String[] args) {
        System.out.println("On Java 8");
    }
}`,
            },
          ],
        },
      ],
      takeaways: [
        "javac 负责编译，java 负责启动 JVM 执行字节码。",
        "包名应和目录一致，避免类名冲突。",
        "Java 8 是学习基线，不代表生产中必须使用旧版本。",
      ],
    },
    {
      slug: "objects-everywhere",
      number: "03",
      title: "万物皆对象",
      partId: "objects",
      minutes: 10,
      lede: "引用与对象是两件事。理解 new、字段、方法、作用域和垃圾回收，才能读懂 Java 的内存模型。",
      sections: [
        {
          id: "references",
          heading: "引用指向对象",
          html: `
            <p>基本类型直接保存值，引用类型保存对象的地址。声明一个引用并不会自动创建对象；<code>new</code> 才会分配对象。两个引用可以指向同一个对象，这一点在集合、参数传递和并发里都非常关键。</p>
          `,
          code: [
            {
              lang: "java",
              label: "引用与对象",
              code: `Book first = new Book("On Java 8");
Book second = first;          // 同一个对象
second = new Book("Rust");    // second 指向新对象

System.out.println(first.title());  // On Java 8
System.out.println(second.title()); // Rust`,
            },
          ],
        },
        {
          id: "members",
          heading: "字段、方法与 static",
          html: `
            <p>字段属于对象实例，<code>static</code> 成员属于类。实例方法可以访问实例和静态成员；静态方法只能直接访问静态成员。对象离开所有可达引用后才会被垃圾回收器回收，程序员不负责手动释放。</p>
          `,
          code: [
            {
              lang: "java",
              label: "实例成员与静态成员",
              code: `class Reading {
    static int totalRead = 0;
    String title;

    Reading(String title) {
        this.title = title;
        totalRead++;
    }

    static int total() {
        return totalRead;
    }
}`,
            },
          ],
        },
      ],
      takeaways: [
        "引用不是对象；new 才创建对象。",
        "static 属于类，实例字段属于每一个对象。",
        "Java 用可达性分析管理对象生命周期，不手动 free。",
      ],
    },
    {
      slug: "operators",
      number: "04",
      title: "运算符",
      partId: "objects",
      minutes: 9,
      lede: "运算符的优先级、整数除法、类型转换和引用赋值，比记住符号表更值得花时间。",
      sections: [
        {
          id: "arithmetic",
          heading: "算术、关系与逻辑",
          html: `
            <p>整数除法会截断小数；<code>++</code> 和 <code>--</code> 的前后位置会改变表达式结果。关系运算返回 <code>boolean</code>，逻辑运算支持短路：<code>&amp;&amp;</code> 左侧为 false 时不再计算右侧。</p>
          `,
          code: [
            {
              lang: "java",
              label: "几个容易混淆的表达式",
              code: `int a = 7;
int b = 2;
System.out.println(a / b);   // 3
System.out.println(a % b);   // 1

int i = 1;
System.out.println(i++);     // 1
System.out.println(i);       // 2

boolean ok = false && expensive(); // 短路，不会调用`,
            },
          ],
        },
        {
          id: "casts",
          heading: "引用赋值与类型转换",
          html: `
            <p>基本类型转换可能丢失精度，必须显式写窄化转换。引用赋值只是在复制地址；如果对象本身可变，两个引用会看到同一处状态变化。Java 没有 <code>sizeof</code>，对象布局由 JVM 决定。</p>
          `,
          code: [
            {
              lang: "java",
              label: "窄化与引用别名",
              code: `double ratio = 3.9;
int rounded = (int) ratio; // 3

int[] first = {1, 2, 3};
int[] second = first;      // 同一个数组对象
second[0] = 99;

System.out.println(first[0]); // 99`,
            },
          ],
        },
      ],
      takeaways: [
        "整数除法截断，取模与浮点除法不是一回事。",
        "逻辑运算符短路；不要把有副作用的调用放在右侧。",
        "引用赋值共享对象，需要副本时显式复制。",
      ],
    },
    {
      slug: "control-flow",
      number: "05",
      title: "控制流",
      partId: "objects",
      minutes: 8,
      lede: "if、循环、for-in 与 switch 决定代码按什么顺序执行；顺序本身就是设计的一部分。",
      sections: [
        {
          id: "loops",
          heading: "条件与循环",
          html: `
            <p>循环适合重复，<code>break</code> 结束整个循环，<code>continue</code> 跳过本次。Java 的 <code>for-in</code> 只能读取，不能直接修改基本类型元素；需要索引时用普通 <code>for</code>。</p>
          `,
          code: [
            {
              lang: "java",
              label: "for 与 for-in",
              code: `for (int n = 1; n <= 15; n++) {
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
}`,
            },
          ],
        },
        {
          id: "switch",
          heading: "switch 与没有 goto 的跳转",
          html: `
            <p>Java 的 <code>switch</code> 支持整数、字符、枚举和字符串（Java 7 起）。每个分支要小心忘记 <code>break</code>。Java 没有 C 的 <code>goto</code>，带标签的 <code>break</code>/<code>continue</code> 可以做受限的跳转。</p>
          `,
          code: [
            {
              lang: "java",
              label: "switch 字符串",
              code: `String language = "java";

switch (language) {
    case "java":
        System.out.println("JVM");
        break;
    case "rust":
        System.out.println("LLVM");
        break;
    default:
        System.out.println("unknown");
}`,
            },
          ],
        },
      ],
      takeaways: [
        "for-in 适合遍历，索引循环适合需要位置的操作。",
        "break 结束循环，continue 跳到下一次迭代。",
        "switch 的贯穿是特性也是陷阱，按意图显式 break。",
      ],
    },
    {
      slug: "initialization",
      number: "06",
      title: "初始化和清理",
      partId: "objects",
      minutes: 12,
      lede: "构造器保证对象可用，初始化顺序决定你看到什么，垃圾回收让清理不再是显式 free。",
      sections: [
        {
          id: "constructors",
          heading: "构造器、重载与 this",
          html: `
            <p>构造器与类同名、没有返回类型。重载让同一个类拥有不同的初始化方式；<code>this</code> 既指向当前对象，也可以调用另一个构造器。不要在一个构造器里做过多 I/O 或启动线程。</p>
          `,
          code: [
            {
              lang: "java",
              label: "构造器重载",
              code: `class Book {
    private final String title;
    private final int chapters;

    Book(String title) {
        this(title, 1);
    }

    Book(String title, int chapters) {
        this.title = title;
        this.chapters = chapters;
    }
}`,
            },
          ],
        },
        {
          id: "order",
          heading: "初始化顺序与数组",
          html: `
            <p>类加载时先执行静态初始化，再执行实例初始化，最后执行构造器。局部变量必须先赋值才能使用；数组元素会获得默认值。理解顺序，可以避免“为什么这里还是 0”。</p>
          `,
          code: [
            {
              lang: "java",
              label: "初始化顺序",
              code: `class Demo {
    static { System.out.println("static"); }
    { System.out.println("instance"); }
    Demo() { System.out.println("constructor"); }
}

new Demo();
// static
// instance
// constructor`,
            },
          ],
        },
      ],
      takeaways: [
        "构造器保证对象进入可用状态；重载表达不同的初始化方式。",
        "静态初始化先于实例初始化，再进入构造器。",
        "数组元素默认初始化；对象仍由 GC 负责回收。",
      ],
    },
    {
      slug: "encapsulation",
      number: "07",
      title: "封装",
      partId: "objects",
      minutes: 8,
      lede: "把可变状态关进类里，只暴露需要的操作，让包和访问修饰符成为真实的边界。",
      sections: [
        {
          id: "access",
          heading: "包与访问权限",
          html: `
            <p>Java 有四层访问：<code>private</code>、包级默认、<code>protected</code> 和 <code>public</code>。优先让字段私有，把校验放在 setter 或构造器里。包不是装饰，它是代码的组织边界。</p>
          `,
          code: [
            {
              lang: "java",
              label: "受控的读取进度",
              code: `class Reading {
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
}`,
            },
          ],
        },
        {
          id: "boundary",
          heading: "接口和实现分开",
          html: `
            <p>封装不只是 private。调用者依赖 public API，而不是内部集合、字段和临时实现。这样你才能替换数据结构、加入缓存或改变算法，而不破坏外部代码。</p>
            <p>类级别的访问权限同样重要：只被同一包使用的辅助类，不需要变成 public。</p>
          `,
        },
      ],
      takeaways: [
        "字段默认私有；公开的是经过设计的行为。",
        "包级访问是隐藏实现细节的实用工具。",
        "封装的目标是允许实现变化，而不是制造仪式。",
      ],
    },
    {
      slug: "reuse",
      number: "08",
      title: "复用",
      partId: "objects",
      minutes: 11,
      lede: "组合、继承、委托和 final：复用的四种工具，各自适合不同的关系。",
      sections: [
        {
          id: "composition",
          heading: "组合与委托",
          html: `
            <p>组合把已有对象作为字段，委托是把请求转给它。Car 有一个 Engine，而不是 Car 是一种 Engine。组合不会把父类的所有接口暴露给外部，通常更容易替换和测试。</p>
          `,
          code: [
            {
              lang: "java",
              label: "组合一个引擎",
              code: `class Engine {
    void start() {
        System.out.println("engine started");
    }
}

class Car {
    private final Engine engine = new Engine();

    void start() {
        engine.start();
    }
}`,
            },
          ],
        },
        {
          id: "inheritance",
          heading: "继承、protected 与 final",
          html: `
            <p>继承表达“是一种”，并允许向上转型。子类构造器会先调用父类构造器；<code>protected</code> 让子类可以访问，但不要把它当成随手可用的 public。<code>final</code> 可以固定字段、方法或类，用来表达设计意图。</p>
          `,
          code: [
            {
              lang: "java",
              label: "继承与 final",
              code: `class Machine {
    final void start() {
        System.out.println("start");
    }
}

class Printer extends Machine {
    // 不能覆盖 final 的 start()
}`,
            },
          ],
        },
      ],
      takeaways: [
        "组合表达“有一个”，继承表达“是一种”。",
        "委托适合把行为转发给内部对象，而不暴露它的全部接口。",
        "final 是设计约束，不只是性能开关。",
      ],
    },
    {
      slug: "polymorphism",
      number: "09",
      title: "多态",
      partId: "objects",
      minutes: 11,
      lede: "向上转型之后，调用的方法仍由对象的真实类型决定；这是 Java 动态绑定的核心。",
      sections: [
        {
          id: "dynamic-dispatch",
          heading: "向上转型与动态绑定",
          html: `
            <p>父类引用可以指向子类对象。调用被覆盖的方法时，JVM 会根据对象的实际类型找到实现，而不是看引用声明。调用者因此只依赖父类的接口。</p>
          `,
          code: [
            {
              lang: "java",
              label: "同一接口，不同实现",
              code: `abstract class Shape {
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
System.out.println(shape.area());`,
            },
          ],
        },
        {
          id: "constructors",
          heading: "构造器与多态",
          html: `
            <p>构造器不是多态方法。父类构造器执行时，子类字段还没有完成初始化；如果在父类构造器里调用会被覆盖的方法，可能看到默认值。把复杂初始化放到构造器之后，或者用工厂方法组织。</p>
            <p>返回类型协变允许子类覆盖方法时返回更具体的类型；设计继承时，优先保证父类型的语义真的成立。</p>
          `,
        },
      ],
      takeaways: [
        "父类型引用调用被覆盖的方法，会执行子类实现。",
        "不要在父类构造器里调用可被覆盖的方法。",
        "多态的价值是依赖接口而不是具体类型。",
      ],
    },
    {
      slug: "interfaces",
      number: "10",
      title: "接口",
      partId: "objects",
      minutes: 10,
      lede: "接口把“能做什么”从“怎么实现”里分离出来；抽象类则适合共享部分实现和状态。",
      sections: [
        {
          id: "abstract-and-interface",
          heading: "抽象类与接口",
          html: `
            <p>抽象类可以带字段和已实现的方法，适合一组关系紧密的类型；接口定义能力，一个类可以实现多个。接口字段隐式 <code>public static final</code>，方法在 Java 8 中可以有 <code>default</code> 和 <code>static</code> 实现。</p>
          `,
          code: [
            {
              lang: "java",
              label: "接口与抽象类",
              code: `abstract class Repository {
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
}`,
            },
          ],
        },
        {
          id: "decoupling",
          heading: "解耦、适配与工厂",
          html: `
            <p>接口让调用者不需要知道对象的构造过程。工厂方法把“创建哪种实现”的决定留在工厂内部，适配器则把一个已有接口包装成调用者需要的形状。这两者都在降低依赖，而不是增加层数。</p>
          `,
          code: [
            {
              lang: "java",
              label: "工厂方法",
              code: `interface Reader {
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
}`,
            },
          ],
        },
      ],
      takeaways: [
        "抽象类适合共享实现，接口适合表达能力与解耦。",
        "默认方法与静态方法让接口可以继续演化。",
        "工厂把构造细节移出调用者，适配器连接不兼容的接口。",
      ],
    },
    {
      slug: "inner-classes",
      number: "11",
      title: "内部类",
      partId: "objects",
      minutes: 10,
      lede: "内部类持有外部类引用，匿名类适合一次性实现，静态嵌套类则不依赖外部实例。",
      sections: [
        {
          id: "inner",
          heading: "内部类与外部类",
          html: `
            <p>非静态内部类实例必须依附外部类实例，可以通过 <code>Outer.this</code> 访问外部对象，通过 <code>outer.new Inner()</code> 创建。静态嵌套类没有外部实例引用，通常更容易理解和测试。</p>
          `,
          code: [
            {
              lang: "java",
              label: "内部类访问外部状态",
              code: `class Library {
    private final String name = "study-room";

    class Shelf {
        String label() {
            return name + " / shelf";
        }
    }
}

Library library = new Library();
Library.Shelf shelf = library.new Shelf();
System.out.println(shelf.label());`,
            },
          ],
        },
        {
          id: "anonymous",
          heading: "匿名类与有效 final",
          html: `
            <p>匿名类适合实现一个马上使用的接口，Lambda 让这种写法进一步简化（但只能用于函数式接口）。局部类和匿名类捕获的局部变量必须有效 final；需要修改的状态应该放到对象字段或并发安全的结构里。</p>
          `,
          code: [
            {
              lang: "java",
              label: "匿名 Runnable",
              code: `String label = "On Java 8";

Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println(label);
    }
};

task.run();`,
            },
          ],
        },
      ],
      takeaways: [
        "内部类持有外部实例；静态嵌套类不持有。",
        "匿名类适合一次性实现，函数式接口可以改用 Lambda。",
        "捕获局部变量必须有效 final。",
      ],
    },
    {
      slug: "collections",
      number: "12",
      title: "集合",
      partId: "functional",
      minutes: 13,
      lede: "List、Set、Map、Queue 与 Iterator 组成了 Java 的数据结构层；泛型让集合保持类型安全。",
      sections: [
        {
          id: "collections",
          heading: "List、Set 与 Map",
          html: `
            <p><code>ArrayList</code> 适合随机访问，<code>LinkedList</code> 适合频繁插入删除；<code>HashSet</code> 关心唯一性，<code>HashMap</code> 保存键值关系。选择容器时要看访问模式，而不是只看名字。</p>
          `,
          code: [
            {
              lang: "java",
              label: "常用集合",
              code: `List<String> books = new ArrayList<>();
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
}`,
            },
          ],
        },
        {
          id: "iterators",
          heading: "迭代器与 for-in",
          html: `
            <p><code>Iterator</code> 提供统一的遍历协议，<code>for-in</code> 只是它的语法糖。遍历时修改集合可能抛 <code>ConcurrentModificationException</code>，需要删除元素时用迭代器自己的 <code>remove()</code>，或先收集再修改。</p>
          `,
          code: [
            {
              lang: "java",
              label: "Iterator 安全删除",
              code: `Iterator<String> iterator = books.iterator();

while (iterator.hasNext()) {
    if (iterator.next().startsWith("Rust")) {
        iterator.remove();
    }
}`,
            },
          ],
        },
      ],
      takeaways: [
        "按访问模式选择集合实现，而不是按名称记忆。",
        "Set 去重，Map 建立键值索引，Queue 组织先后顺序。",
        "遍历中修改集合要使用迭代器或先复制。",
      ],
    },
    {
      slug: "functional-programming",
      number: "13",
      title: "函数式编程",
      partId: "functional",
      minutes: 13,
      lede: "Lambda 让函数成为值，函数式接口描述函数形状，纯函数与不可变数据让组合变得可靠。",
      sections: [
        {
          id: "lambdas",
          heading: "Lambda 与函数式接口",
          html: `
            <p>函数式接口只有一个抽象方法，Lambda 是它的简洁实现。<code>Function</code>、<code>Predicate</code>、<code>Consumer</code>、<code>Supplier</code> 是常用形状。Lambda 捕获的局部变量必须有效 final。</p>
          `,
          code: [
            {
              lang: "java",
              label: "函数是值",
              code: `Function<String, Integer> length = String::length;
Predicate<String> empty = String::isEmpty;
Consumer<String> printer = System.out::println;
Supplier<List<String>> factory = ArrayList::new;

System.out.println(length.apply("On Java 8")); // 9
System.out.println(empty.test(""));            // true
printer.accept(factory.get().toString());`,
            },
          ],
        },
        {
          id: "composition",
          heading: "高阶函数、组合与纯函数",
          html: `
            <p>高阶函数接收或返回函数。<code>andThen</code>、<code>compose</code> 可以把小函数拼起来；柯里化把多参数函数拆成一串单参数函数。纯函数没有副作用，输出只依赖输入，这让测试和并行都更容易。</p>
          `,
          code: [
            {
              lang: "java",
              label: "函数组合",
              code: `Function<Integer, Integer> doubleIt = n -> n * 2;
Function<Integer, Integer> plusOne = n -> n + 1;

Function<Integer, Integer> pipeline = doubleIt.andThen(plusOne);
System.out.println(pipeline.apply(3)); // 7

Function<String, String> normalize = String::trim;
Function<String, String> upper = String::toUpperCase;
System.out.println(normalize.andThen(upper).apply("  java  "));`,
            },
          ],
        },
      ],
      takeaways: [
        "Lambda 的目标类型必须是函数式接口。",
        "方法引用适合直接转发，函数组合适合搭建小型管道。",
        "优先写纯函数，副作用留在程序边界。",
      ],
    },
    {
      slug: "streams",
      number: "14",
      title: "流式编程",
      partId: "functional",
      minutes: 14,
      lede: "Stream 把集合变换拆成源、中间操作和终止操作，并用惰性求值把计算推迟到真正需要时。",
      sections: [
        {
          id: "pipeline",
          heading: "流的管道",
          html: `
            <p>Stream 不存储数据，也不能重复消费。<code>map</code>、<code>filter</code>、<code>sorted</code> 是中间操作；<code>collect</code>、<code>count</code>、<code>forEach</code> 是终止操作。没有终止操作，管道不会执行。</p>
          `,
          code: [
            {
              lang: "java",
              label: "过滤、映射与收集",
              code: `List<String> titles = Arrays.asList("On Java 8", "Rust", "Go");

List<String> result = titles.stream()
    .filter(title -> title.length() > 2)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

System.out.println(result);`,
            },
          ],
        },
        {
          id: "optional-terminal",
          heading: "Optional 与终止操作",
          html: `
            <p>需要“可能没有结果”时，返回 <code>Optional</code>，而不是 null 或抛异常。Stream 的 <code>findFirst</code> 返回 Optional。<code>reduce</code> 折叠值，<code>collect</code> 交给 Collector。并行流只适合无状态、计算密集、数据量足够大的场景。</p>
          `,
          code: [
            {
              lang: "java",
              label: "Optional 与 reduce",
              code: `Optional<String> first = titles.stream()
    .filter(title -> title.startsWith("R"))
    .findFirst();

System.out.println(first.orElse("none"));

int total = IntStream.rangeClosed(1, 10)
    .reduce(0, Integer::sum);`,
            },
          ],
        },
      ],
      takeaways: [
        "Stream 是一次性管道，终止操作才触发计算。",
        "Optional 表达“可能没有”，不要直接 get()。",
        "并行流不是性能开关，先测量再使用。",
      ],
    },
    {
      slug: "exceptions",
      number: "15",
      title: "异常",
      partId: "types",
      minutes: 11,
      lede: "异常把正常路径和失败路径分开；捕获、传播、自定义和资源清理都需要明确边界。",
      sections: [
        {
          id: "catching",
          heading: "异常模型与捕获",
          html: `
            <p>异常是对象，可以携带信息和 cause。<code>try/catch/finally</code> 中 finally 总会执行，适合清理资源。受检异常要求调用者显式处理；运行时异常通常表示编程错误。catch 应该从具体到宽泛。</p>
          `,
          code: [
            {
              lang: "java",
              label: "捕获并保留 cause",
              code: `try {
    int value = Integer.parseInt("not-a-number");
    System.out.println(value);
} catch (NumberFormatException error) {
    System.err.println("输入不是数字: " + error.getMessage());
} finally {
    System.out.println("done");
}`,
            },
          ],
        },
        {
          id: "custom",
          heading: "自定义异常与 try-with-resources",
          html: `
            <p>自定义异常应该说明业务语义，并在构造函数里保留 cause。<code>try-with-resources</code> 自动关闭实现了 <code>AutoCloseable</code> 的资源，即使 try 块抛出异常也不会漏掉关闭。</p>
          `,
          code: [
            {
              lang: "java",
              label: "自定义异常",
              code: `class BookNotFoundException extends Exception {
    BookNotFoundException(String title, Throwable cause) {
        super("找不到书籍: " + title, cause);
    }
}

try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.readLine();
}`,
            },
          ],
        },
      ],
      takeaways: [
        "异常让失败路径显式化；保留 cause 才能定位根因。",
        "finally 和 try-with-resources 负责资源释放。",
        "自定义异常用于业务语义，不要把所有异常都包成同一种。",
      ],
    },
    {
      slug: "validating-code",
      number: "16",
      title: "代码校验",
      partId: "types",
      minutes: 10,
      lede: "测试、断言、日志、基准与重构：让代码在变化中仍然可信。",
      sections: [
        {
          id: "tests",
          heading: "测试与 TDD",
          html: `
            <p>测试不是证明程序没错，而是锁定你已经理解的行为。JUnit 的 <code>@Test</code>、<code>assertEquals</code> 是最小工具；TDD 用失败测试驱动设计。先写一个会失败的用例，再写刚好让它通过的实现。</p>
          `,
          code: [
            {
              lang: "java",
              label: "一个 JUnit 4 测试",
              code: `public class PriceTest {
    @Test
    public void addsTax() {
        Price price = new Price(100);
        assertEquals(110, price.withTax(0.1), 0.001);
    }
}`,
            },
          ],
        },
        {
          id: "observability",
          heading: "日志、调试与基准",
          html: `
            <p>日志记录上下文，不是把变量到处打印。基准测试要隔离 JIT、预热和测量误差，不能拿一次 <code>System.currentTimeMillis</code> 当结论。发现性能问题前先分析，不要凭直觉重构。</p>
          `,
          code: [
            {
              lang: "shell",
              label: "终端 · 工程检查",
              code: `./gradlew test
./gradlew check
./gradlew jmh`,
            },
          ],
        },
      ],
      takeaways: [
        "测试表达行为契约，失败测试是设计反馈。",
        "日志记录上下文，调试器观察状态，基准工具量化性能。",
        "重构应在测试保护下进行，先定位再优化。",
      ],
    },
    {
      slug: "files",
      number: "17",
      title: "文件",
      partId: "types",
      minutes: 11,
      lede: "用 Path 与 Files 处理路径、目录、读写和文件树，比起手写流更安全、更清晰。",
      sections: [
        {
          id: "paths",
          heading: "Path 与目录",
          html: `
            <p><code>Path</code> 表示路径，不保证文件存在；<code>Files</code> 提供创建、删除、复制、移动和查询属性的静态方法。相对路径要配合工作目录理解，部署时最好使用显式基准目录。</p>
          `,
          code: [
            {
              lang: "java",
              label: "目录与文件",
              code: `Path dir = Paths.get("notes");
Files.createDirectories(dir);

Path file = dir.resolve("java.md");
Files.write(file, "# On Java 8\n".getBytes(StandardCharsets.UTF_8));

System.out.println(Files.exists(file));
System.out.println(Files.size(file));`,
            },
          ],
        },
        {
          id: "walk",
          heading: "遍历、查找与读写",
          html: `
            <p><code>Files.walk</code> 返回文件树流，记得在 try-with-resources 中关闭。<code>Files.lines</code> 按行懒加载，适合大文件；一次性 <code>readAllLines</code> 只适合小文件。</p>
          `,
          code: [
            {
              lang: "java",
              label: "按扩展名查找",
              code: `try (Stream<Path> paths = Files.walk(Paths.get("."))) {
    paths.filter(path -> path.toString().endsWith(".java"))
         .limit(10)
         .forEach(System.out::println);
}`,
            },
          ],
        },
      ],
      takeaways: [
        "Path 是路径抽象，Files 提供实际操作。",
        "文件树流需要关闭；大文件优先按行读取。",
        "读写时明确字符集与工作目录。",
      ],
    },
    {
      slug: "strings",
      number: "18",
      title: "字符串",
      partId: "types",
      minutes: 10,
      lede: "String 不可变，拼接会产生新对象；StringBuilder、格式化和正则让文本处理更可控。",
      sections: [
        {
          id: "immutable",
          heading: "不可变与 StringBuilder",
          html: `
            <p>String 对象不可变，所谓“修改”其实是创建新对象。循环中不断用 <code>+</code> 拼接会产生大量中间对象，此时用 <code>StringBuilder</code>。注意不要在 <code>toString</code> 里递归调用自己。</p>
          `,
          code: [
            {
              lang: "java",
              label: "StringBuilder",
              code: `StringBuilder builder = new StringBuilder();
for (String title : new String[]{"On", "Java", "8"}) {
    builder.append(title).append(" ");
}
String text = builder.toString().trim();
System.out.println(text);`,
            },
          ],
        },
        {
          id: "format",
          heading: "格式化、正则与扫描",
          html: `
            <p><code>String.format</code> 适合生成固定格式文本；<code>Pattern</code>/<code>Matcher</code> 处理重复使用的正则；<code>Scanner</code> 适合从文本或输入流读取结构化 token。正则字符串里的反斜杠需要写两次。</p>
          `,
          code: [
            {
              lang: "java",
              label: "格式化与正则",
              code: `String row = String.format("%s | %d 章", "On Java 8", 24);
System.out.println(row);

Pattern pattern = Pattern.compile("\\\\d+");
Matcher matcher = pattern.matcher("第 24 章");
if (matcher.find()) {
    System.out.println(matcher.group());
}`,
            },
          ],
        },
      ],
      takeaways: [
        "String 不可变；频繁拼接用 StringBuilder。",
        "正则编译一次可以复用，注意转义。",
        "文本输入先确定编码与格式，再解析。",
      ],
    },
    {
      slug: "type-information",
      number: "19",
      title: "类型信息",
      partId: "types",
      minutes: 10,
      lede: "Class 对象、instanceof、反射和动态代理让程序在运行时检查与操作类型，也带来额外的耦合。",
      sections: [
        {
          id: "rtti",
          heading: "Class 对象与类型检测",
          html: `
            <p>每个已加载类型都有 Class 对象，可以通过 <code>类名.class</code>、<code>getClass()</code> 或 <code>Class.forName</code> 获得。<code>instanceof</code> 在向下转型前检查类型；Java 16 之后还支持模式匹配，但本书基线是 Java 8。</p>
          `,
          code: [
            {
              lang: "java",
              label: "运行时类型",
              code: `LibraryItem item = new Book();

System.out.println(item.getClass().getName());
System.out.println(item instanceof Book);

if (item instanceof Book) {
    Book book = (Book) item;
    System.out.println(book.label());
}`,
            },
          ],
        },
        {
          id: "reflection",
          heading: "反射与动态代理",
          html: `
            <p>反射允许在运行时查找方法并调用，适合框架和插件；代价是失去编译期检查、变慢，并且更难重构。动态代理在接口之上生成包装对象，适合横切逻辑，但不要用它代替清晰的接口设计。</p>
          `,
          code: [
            {
              lang: "java",
              label: "反射调用",
              code: `Class<?> type = Book.class;
Object instance = type.getDeclaredConstructor(String.class)
    .newInstance("On Java 8");

Method method = type.getMethod("label");
System.out.println(method.invoke(instance));`,
            },
          ],
        },
      ],
      takeaways: [
        "Class 对象描述运行时类型，instanceof 保护向下转型。",
        "反射适合框架，不适合业务代码的日常路径。",
        "动态代理把包装逻辑集中到接口边界。",
      ],
    },
    {
      slug: "generics",
      number: "20",
      title: "泛型",
      partId: "types",
      minutes: 13,
      lede: "泛型把类型参数化，在编译期保护集合与算法；擦除、边界和通配符决定了它的能力边界。",
      sections: [
        {
          id: "generic-types",
          heading: "泛型类、接口与方法",
          html: `
            <p>泛型让同一个结构服务多种类型，同时保留编译期检查。Java 的泛型通过擦除实现，运行时看不到类型参数；因此不能 <code>new T()</code>，也不能创建泛型数组。边界 <code>extends</code> 既限制类型，也让你调用边界方法。</p>
          `,
          code: [
            {
              lang: "java",
              label: "泛型方法与边界",
              code: `class Box<T> {
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

System.out.println(max("Rust", "Java"));`,
            },
          ],
        },
        {
          id: "wildcards",
          heading: "通配符与 PECS",
          html: `
            <p><code>? extends T</code> 适合读取，<code>? super T</code> 适合写入。PECS 记忆法是 Producer Extends, Consumer Super。通配符不是为了让类型更复杂，而是让 API 接受更广的调用者。</p>
          `,
          code: [
            {
              lang: "java",
              label: "读写边界",
              code: `static double sum(List<? extends Number> values) {
    double total = 0;
    for (Number value : values) {
        total += value.doubleValue();
    }
    return total;
}

static void addNumbers(List<? super Integer> target) {
    target.add(1);
    target.add(2);
}`,
            },
          ],
        },
      ],
      takeaways: [
        "泛型在编译期提供类型安全，运行时会被擦除。",
        "边界既是限制，也是可调用能力的来源。",
        "读用 extends，写用 super；不要把通配符当装饰。",
      ],
    },
    {
      slug: "arrays",
      number: "21",
      title: "数组",
      partId: "types",
      minutes: 10,
      lede: "数组长度固定、是对象、会做运行时类型检查；Arrays 工具类覆盖填充、排序、查找和流化。",
      sections: [
        {
          id: "array-basics",
          heading: "数组是对象",
          html: `
            <p>数组在创建时固定长度，元素有默认值。它可以作为对象传递、返回，也支持多维数组。数组知道自己的元素类型，错误类型写入会在运行时抛出 <code>ArrayStoreException</code>。</p>
          `,
          code: [
            {
              lang: "java",
              label: "数组与多维数组",
              code: `int[] numbers = new int[3];
numbers[0] = 7;

String[][] rows = {
    {"On Java 8", "Rust"},
    {"Python", "Go"}
};

System.out.println(rows[1][0]);`,
            },
          ],
        },
        {
          id: "arrays-utils",
          heading: "Arrays 工具类",
          html: `
            <p><code>Arrays.fill</code> 填充，<code>Arrays.sort</code> 排序，<code>Arrays.copyOf</code> 复制，<code>binarySearch</code> 要求数组已排序。<code>Arrays.stream</code> 可以把数组接入 Stream 管道。</p>
          `,
          code: [
            {
              lang: "java",
              label: "排序、复制、流",
              code: `int[] values = {5, 2, 8, 1};
Arrays.sort(values);

int[] copy = Arrays.copyOf(values, values.length + 2);
Arrays.fill(copy, values.length, copy.length, 0);

int sum = Arrays.stream(values).sum();
System.out.println(Arrays.toString(copy) + " / " + sum);`,
            },
          ],
        },
      ],
      takeaways: [
        "数组长度固定，是带类型检查的对象。",
        "多维数组本质是数组的数组。",
        "Arrays 提供填充、排序、复制、查找和流式操作。",
      ],
    },
    {
      slug: "enumerations",
      number: "22",
      title: "枚举",
      partId: "types",
      minutes: 9,
      lede: "枚举不是整数常量：它是完整的类，可以带字段、方法、接口，并用 EnumSet/EnumMap 获得类型安全集合。",
      sections: [
        {
          id: "enum-basics",
          heading: "枚举类型与方法",
          html: `
            <p>枚举值在类加载时创建，天然单例。可以给枚举添加构造器、字段和方法。<code>values()</code> 返回所有常量数组，<code>valueOf()</code> 按名字查找；<code>switch</code> 对枚举尤其清晰。</p>
          `,
          code: [
            {
              lang: "java",
              label: "带字段的枚举",
              code: `enum Level {
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

System.out.println(Level.ADVANCED.code()); // 2`,
            },
          ],
        },
        {
          id: "enum-collections",
          heading: "EnumSet、EnumMap 与常量特定方法",
          html: `
            <p><code>EnumSet</code> 和 <code>EnumMap</code> 针对枚举优化，既省内存又表达清晰。枚举常量可以覆盖抽象方法，实现每个常量不同的行为，这比在 switch 里堆逻辑更容易扩展。</p>
          `,
          code: [
            {
              lang: "java",
              label: "EnumSet 与常量行为",
              code: `EnumSet<Level> plan = EnumSet.of(Level.BASIC, Level.ADVANCED);

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
}`,
            },
          ],
        },
      ],
      takeaways: [
        "枚举是类型安全的类，不是 int 的别名。",
        "EnumSet / EnumMap 针对枚举提供高效集合。",
        "常量特定方法把行为放在常量旁边，避免巨型 switch。",
      ],
    },
    {
      slug: "annotations",
      number: "23",
      title: "注解",
      partId: "types",
      minutes: 9,
      lede: "注解把元数据写进源码，由编译器、框架或注解处理器读取；它本身不会执行任何逻辑。",
      sections: [
        {
          id: "syntax",
          heading: "定义与元注解",
          html: `
            <p>注解用 <code>@interface</code> 定义，可以带基本类型、String、Class、枚举、注解和数组元素。<code>@Retention</code> 决定保留到源码、字节码还是运行时，<code>@Target</code> 决定可以标注在哪里，<code>@Documented</code> 和 <code>@Inherited</code> 控制文档与继承。</p>
          `,
          code: [
            {
              lang: "java",
              label: "定义一个运行时注解",
              code: `@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Note {
    String value();
    int priority() default 0;
}`,
            },
          ],
        },
        {
          id: "processing",
          heading: "从反射到注解处理器",
          html: `
            <p>运行时可用的注解可以通过反射读取，适合小型测试框架或配置；编译期注解处理器可以生成代码或校验约束，适合框架作者。使用方不要依赖注解的副作用，注解只是元数据，执行逻辑在读取方。</p>
          `,
          code: [
            {
              lang: "java",
              label: "运行时读取注解",
              code: `@Note(value = "explain ownership", priority = 2)
public class Book {
}

Note note = Book.class.getAnnotation(Note.class);
if (note != null) {
    System.out.println(note.value() + " / " + note.priority());
}`,
            },
          ],
        },
      ],
      takeaways: [
        "注解是元数据，必须有人读取才会产生行为。",
        "Retention 与 Target 决定注解能被用在何处、活到何时。",
        "反射适合小型运行时读取，编译期处理器适合框架级生成。",
      ],
    },
    {
      slug: "concurrency",
      number: "24",
      title: "并发编程",
      partId: "concurrency",
      minutes: 15,
      lede: "并发不是“多开线程”：任务是边界，共享状态是风险，线程池、锁和 CompletableFuture 是用来组织边界的工具。",
      sections: [
        {
          id: "tasks",
          heading: "任务、线程与线程池",
          html: `
            <p>把工作写成独立任务，交给线程池执行，而不是为每个请求创建一个线程。共享可变状态必须被保护；不可变对象和无共享设计通常更容易扩展。启动线程后要关心异常、取消和关闭。</p>
          `,
          code: [
            {
              lang: "java",
              label: "线程池执行任务",
              code: `ExecutorService pool = Executors.newFixedThreadPool(4);

Future<Integer> result = pool.submit(() -> {
    int total = 0;
    for (int i = 1; i <= 10; i++) {
        total += i;
    }
    return total;
});

System.out.println(result.get());
pool.shutdown();`,
            },
          ],
        },
        {
          id: "shared-state",
          heading: "共享状态与 CompletableFuture",
          html: `
            <p><code>synchronized</code> 或 <code>Lock</code> 保护临界区；锁的范围越短越好，且不要在持锁时做 I/O。死锁通常来自多把锁的获取顺序不一致。<code>CompletableFuture</code> 用组合代替阻塞等待，但异常处理与线程池边界仍然要明确。</p>
          `,
          code: [
            {
              lang: "java",
              label: "组合异步结果",
              code: `ExecutorService pool = Executors.newFixedThreadPool(2);

CompletableFuture<String> user =
    CompletableFuture.supplyAsync(() -> "study-room", pool);

CompletableFuture<Integer> length =
    user.thenApply(String::length);

length.thenAccept(System.out::println);
pool.shutdown();`,
            },
          ],
        },
      ],
      takeaways: [
        "用任务和线程池组织并发，不要为每个请求裸建线程。",
        "共享可变状态需要锁或消息传递；尽量缩小临界区。",
        "CompletableFuture 适合组合异步步骤，异常与线程池仍要显式管理。",
      ],
    },
  ],
};
