import Link from "next/link";
import { Github, ArrowUpRight } from "@/components/icons";
import { site } from "@/lib/chapters";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">
              <span>sr</span>
              <i />
            </span>
            <div>
              <strong>{site.name}</strong>
              <span>{site.englishName}</span>
            </div>
          </div>
          <p>
            一个关于代码、智能与长期成长的个人学习博客。
            <br />
            读、写、运行，然后回到真实的问题里。
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span className="footer-label">EXPLORE</span>
            <Link href="/notes/">笔记</Link>
            <Link href="/blog/">博客</Link>
            <Link href="/podcast/">播客</Link>
            <Link href="/playground/">练习场</Link>
            <Link href="/about/">关于</Link>
          </div>
          <div>
            <span className="footer-label">ELSEWHERE</span>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight />
            </a>
            <a href={site.docs} target="_blank" rel="noopener noreferrer">
              Python 官方教程 <ArrowUpRight />
            </a>
            <a
              href="https://pyodide.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pyodide <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name} · 由 {site.author} 维护
        </p>
        <p>
          学习进度只保存在你的浏览器中
          <span>·</span>
          内容参考 Python 官方教程，经独立精简重排
        </p>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-github"
          aria-label="在 GitHub 查看源码"
        >
          <Github />
        </a>
      </div>
    </footer>
  );
}
