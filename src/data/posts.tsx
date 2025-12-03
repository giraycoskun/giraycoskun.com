// Loads all TSX posts from /src/posts using Vite's glob (eager) and exposes metadata + component.

import type { ComponentType } from "react";
import type { PostMeta } from "../data/types";
import { calculateReadingTime } from "../util/blogUtil";

export type PostItem = PostMeta & {
  Component?: ComponentType<any>;
};

// include only TSX posts (eagerly)
const modules = import.meta.glob("../posts/*.tsx", { eager: true }) as Record<string, any>;

// map modules to a post list: use exported `meta` from each module and default or named export as React component
const posts: PostItem[] = Object.entries(modules).map(([path, mod]) => {
  // prefer exported `meta`, but allow top-level exports as fallback (title, date, etc.)
  
  const exportedMeta: Partial<PostMeta> =
    mod.meta ??
    ({
      title: mod.title,
      excerpt: mod.excerpt,
      date: mod.date,
      slug: mod.slug,
      tags: mod.tags,
      coverImage: mod.coverImage ?? mod.coverImageUrl,
      description: mod.description,
      author: mod.author,
      readingTime: mod.readingTime,
    } as Partial<PostMeta>);

  const fileName = path.split("/").pop() ?? "";
  const slug = exportedMeta.slug ?? fileName.replace(/\.tsx$/, "");

  // determine a component: default export, or common named exports, or first function export
  let Component: ComponentType<any> | undefined = 
    mod.default ??
    mod.Post;
  
  if (!Component) {
    for (const v of Object.values(mod)) {
      if (typeof v === "function" && v !== mod.meta) {
        Component = v as ComponentType<any>;
        break;
      }
    }
  }

  const calculatedReadingTime = Component 
    ? calculateReadingTime(Component) 
    : exportedMeta.readingTime ?? "— min read";

  // Calculate reading time if not provided and component exists
  
  
  return {
    title: exportedMeta.title ?? slug,
    excerpt: exportedMeta.excerpt ?? exportedMeta.description ?? "",
    date: exportedMeta.date ?? "1970-01-01",
    slug,
    tags: exportedMeta.tags ?? [],
    coverImage: exportedMeta.coverImage ?? exportedMeta.coverImageUrl,
    description: exportedMeta.description ?? exportedMeta.excerpt ?? "",
    author: exportedMeta.author,
    readingTime: calculatedReadingTime,
    Component,
  };
});

// sort newest first
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default posts;