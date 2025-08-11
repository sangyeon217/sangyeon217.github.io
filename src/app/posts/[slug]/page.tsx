import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/contentful";
import PostHead from "@/components/post/PostHead";
import PostBody from "@/components/post/PostBody";

type Params = { slug: string };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  const posts = await getPosts({ category: "All", page: 1, size: 1000 });
  return posts.items.map((post) => ({ slug: post.fields.slug }));
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <PostHead post={post} />
      <PostBody markdown={post.fields.content as string} />
    </main>
  );
}
