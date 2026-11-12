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
              自
            </span>
            <div>
              <strong>{site.name}</strong>
              <span>{site.englishName}</span>
            </div>
          </div>
          <p>
            Python、Rust、On Java 8。
            <br />
            以及 AI 后端工程实验。
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span className="footer-label">LIBRARY</span>
            <Link href="/notes/">书库</Link>
            <Link href="/lab/">实验室</Link>
            <Link href="/podcast/">播客</Link>
            <Link href="/blog/">文章</Link>
            <Link href="/playground/">练习室</Link>
            <Link href="/about/">关于</Link>
          </div>
          <div>
            <span className="footer-label">ELSEWHERE</span>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight />
            </a>
            <a href={site.docs} target="_blank" rel="noopener noreferrer">
              Python Docs <ArrowUpRight />
            </a>
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Photography <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name} · 由 {site.author} 维护
        </p>
        <p>
          静态站点 · 无账户 · 学习进度保存在本机
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
