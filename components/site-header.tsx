"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Search, X } from "@/components/icons";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/chapters";

const navigation = [
  { href: "/notes", label: "书库", matches: ["/notes", "/book"] },
  { href: "/lab", label: "实验室", matches: ["/lab"] },
  { href: "/podcast", label: "播客", matches: ["/podcast"] },
  { href: "/blog", label: "文章", matches: ["/blog"] },
  { href: "/playground", label: "练习室", matches: ["/playground"] },
];

function isActive(pathname: string, matches: string[]): boolean {
  return matches.some(
    (href) => pathname === href || pathname.startsWith(`${href}/`),
  );
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
          <Link href="/" className="brand" aria-label={`${site.name}首页`}>
            <span className="brand-mark" aria-hidden="true">
              自
            </span>
            <span className="brand-wordmark">
              <strong>{site.name}</strong>
              <small>THE STUDY ROOM</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="主导航">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.matches) ? "is-active" : ""}
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
              aria-label="搜索书库与文章"
            >
              <Search />
              <span>搜索</span>
              <kbd>Ctrl K</kbd>
            </button>
            <ThemeToggle compact />
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
                  className={isActive(pathname, item.matches) ? "is-active" : ""}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                  <ArrowRight />
                </Link>
              ))}
            </nav>
            <div className="mobile-navigation-foot">
              <div>
                <span>自习室</span>
                <strong>个人学习书库</strong>
              </div>
              <Link href="/about/">关于这间自习室</Link>
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
