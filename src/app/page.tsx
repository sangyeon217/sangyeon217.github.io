import { getCategories, getPosts } from "@/lib/contentful";
import Introduction from "@/components/main/Introduction";
import Category from "@/components/main/Category";
import PostList from "@/components/main/PostList";

export const revalidate = 60; // ISR: 60초마다 재검증

type SearchParams = { category?: string };
type Props = { searchParams?: Promise<SearchParams> };

export default async function Home({ searchParams }: Props) {
  const { category = "All" } = (await searchParams) ?? {};

  const [categories, posts] = await Promise.all([
    getCategories({ preview: false }),
    getPosts({ category, page: 1, size: 20, preview: false }),
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <Introduction />
      <Category categories={categories} />
      <PostList posts={posts.items} />
    </main>
  );
}
