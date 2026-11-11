"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Search, X } from "@/components/icons";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { chapters, stats, totalReadingTime } from "@/lib/chapters";

const navigation = [
  { href: "/book", label: "课程" },
  { href: "/podcast", label: "播客" },
  { href: "/playground", label: "练习场" },
  { href: "/about", label: "关于" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 1024) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen((current) => !current);
      }
      if (event.key === "Escape" && menuOpen) setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Python 自习室首页">
            <span className="brand-mark" aria-hidden="true">
              <span>py</span>
              <i />
            </span>
            <span className="brand-wordmark">
              <strong>Python 自习室</strong>
              <small>PYTHON STUDY ROOM</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="主导航">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "is-active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="search-trigger"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              aria-label="搜索课程"
            >
              <Search />
              <span>搜索</span>
              <kbd>Ctrl K</kbd>
            </button>
            <ThemeToggle compact />
            <Link className="header-start" href={`/book/${chapters[0].slug}/`}>
              开始阅读
              <ArrowRight />
            </Link>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="mobile-navigation">
            <nav aria-label="移动端导航">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(pathname, item.href) ? "is-active" : ""}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                  <ArrowRight />
                </Link>
              ))}
            </nav>
            <div className="mobile-navigation-foot">
              <div>
                <span>完整课程</span>
                <strong>
                  {stats.chapters} 章 · {totalReadingTime(stats.minutes)}
                </strong>
              </div>
              <Link
                className="button button-accent button-small"
                href={`/book/${chapters[0].slug}/`}
              >
                从第 1 章开始
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      {menuOpen && (
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label="关闭菜单"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
