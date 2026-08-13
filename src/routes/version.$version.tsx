import { createFileRoute, notFound } from "@tanstack/react-router";

import { LibraryBrowser } from "@/components/LibraryBrowser";
import { getVersion } from "@/data/library";

export const Route = createFileRoute("/version/$version")({
  loader: ({ params }) => {
    const version = getVersion(params.version);
    if (!version) throw notFound();
    return { slug: version.slug, label: version.label, tagline: version.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "版本未找到 · Design DNA Library" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.label} · Design DNA Library`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: VersionPage,
});

function VersionPage() {
  const { slug } = Route.useLoaderData();
  return <LibraryBrowser version={getVersion(slug)!} />;
}
