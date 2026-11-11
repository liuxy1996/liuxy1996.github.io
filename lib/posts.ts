import postData from "@/content/posts.json";

export type PostSection = {
  heading: string;
  paragraphs: string[];
  quote?: string;
};

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  sections: PostSection[];
  takeaways: string[];
};

export const posts = (postData as Post[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const postBySlug = new Map(posts.map((post) => [post.slug, post]));

export function getPost(slug: string): Post | undefined {
  return postBySlug.get(slug);
}

export function formatPostDate(value: string): string {
  return value.replaceAll("-", ".");
}

export function postToPlainText(post: Post): string {
  return [
    post.title,
    post.subtitle,
    post.category,
    post.excerpt,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      section.quote ?? "",
    ]),
    ...post.takeaways,
  ]
    .filter(Boolean)
    .join(" ");
}

export function getAdjacentPosts(slug: string): {
  previous?: Post;
  next?: Post;
} {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}
