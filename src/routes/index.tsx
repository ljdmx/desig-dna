import { createFileRoute } from "@tanstack/react-router";

import { LibraryBrowser } from "@/components/LibraryBrowser";
import { DEFAULT_VERSION, getVersion } from "@/data/library";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Web Design DNA Library · 顶级设计系统" },
      {
        name: "description",
        content:
          "沉浸式数字美术馆，收录 v1 / v2 两个版本的顶级 Web 设计系统，支持一键复制 Markdown、JSON 与全部色值。",
      },
      { property: "og:title", content: "探索顶级设计系统" },
      {
        property: "og:description",
        content: "Premium Web Experience OS™ — 可被探索的数字设计艺术品，v1 / v2 双版本完整收录。",
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
