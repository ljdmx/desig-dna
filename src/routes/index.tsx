import { createFileRoute } from "@tanstack/react-router";

import { LibraryBrowser } from "@/components/LibraryBrowser";
import { DEFAULT_VERSION, getVersion } from "@/data/library";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Design DNA Library · 顶级设计系统库" },
      {
        name: "description",
        content:
          "沉浸式数字美术馆，收录 v1 / v2 / v3 三个版本的顶级 Web 设计系统，支持一键复制 Markdown、JSON 与全部色值。",
      },
      { property: "og:title", content: "Design DNA Library · 探索顶级设计系统" },
      {
        property: "og:description",
        content: "Premium Web Experience OS™ — 可被探索的数字设计艺术品，v1 / v2 / v3 三版本完整收录。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { tagName: "link", rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LibraryBrowser version={getVersion(DEFAULT_VERSION)!} />;
}
