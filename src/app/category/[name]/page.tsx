import { notFound } from "next/navigation";
import { getCategories, getPosts } from "@/lib/contentful";
import Introduction from "@/components/main/Introduction";
import Category from "@/components/main/Category";
import PostList from "@/components/main/PostList";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .filter((category) => category.name !== "All")
    .map((category) => ({ name: category.name }));
}

type Params = { name: string };
type Props = { params: Promise<Params> };

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const categories = await getCategories();
  const category = categories.find((category) => category.name === name);
  if (!category) notFound();

  const posts = await getPosts({ category: name, page: 1, size: 20 });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <Introduction />
      <Category categories={categories} currentCategory={name} />
      <PostList posts={posts.items} />
    </main>
  );
}
