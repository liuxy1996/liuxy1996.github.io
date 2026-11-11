import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProgressProvider } from "@/lib/progress";
import { site } from "@/lib/chapters";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}｜技术、思想与长期成长`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  keywords: [
    "Python",
    "Python 教程",
    "Python 学习",
    "学习播客",
    "AI Agent",
    "Rust",
    "个人博客",
    "在线简历",
    "编程入门",
    "Pyodide",
  ],
  authors: [{ name: site.author, url: site.github }],
  creator: site.author,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: site.url,
    siteName: site.name,
    title: `${site.name}｜技术、思想与长期成长`,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name}：为复杂的世界，留一间自习室`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}｜技术、思想与长期成长`,
    description: site.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0a100d" },
  ],
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("py-study-room:theme");
    var theme = stored === "dark" || stored === "light"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a className="skip-link" href="#main-content">
          跳到正文
        </a>
        <ProgressProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ProgressProvider>
      </body>
    </html>
  );
}
