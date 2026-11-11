import Link from "next/link";
import { ArrowLeft, BookOpen } from "@/components/icons";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="container not-found-inner">
        <span className="eyebrow">404 / PAGE NOT FOUND</span>
        <p className="not-found-number">404</p>
        <h1>这一页还没有写进书里。</h1>
        <p>可能是链接过期了，也可能是我们还没学到这一章。</p>
        <div className="not-found-actions">
          <Link className="button button-dark" href="/">
            <ArrowLeft />
            回到首页
          </Link>
          <Link className="button button-ghost" href="/book/">
            <BookOpen />
            翻翻课程目录
          </Link>
        </div>
      </div>
    </main>
  );
}
