import { getCategories, getPosts } from "@/lib/contentful";
import Introduction from "@/components/main/Introduction";
import Category from "@/components/main/Category";
import PostList from "@/components/main/PostList";

export default async function HomePage() {
  const [categories, posts] = await Promise.all([
    getCategories(),
    getPosts({ category: "All", page: 1, size: 20 }),
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <Introduction />
      <Category categories={categories} currentCategory="All" />
      <PostList posts={posts.items} />
    </main>
  );
}
