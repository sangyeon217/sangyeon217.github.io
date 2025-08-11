import Image from "next/image";
import Link from "next/link";
import { type PostEntry, getThumbnailUrl, formatPublishedAt } from "@/lib/contentful";

type Props = { post: PostEntry };

export default function PostItem({ post }: Props) {
  const { title, slug, description, publishedAt } = post.fields;
  const categories = (post.fields.category ?? []) as string[];
  const thumbnailUrl = getThumbnailUrl(post.fields.thumbnail);

  return (
    <article className="relative h-full rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300">
      <Link
        href={`/posts/${slug}`}
        aria-label={`${title} 포스트 엔드로 이동`}
        className="absolute inset-0 z-0 pointer-events-auto"
        prefetch={false}
      />
      <div className="relative z-10 pointer-events-none">
        <div className="relative h-[200px] w-full bg-gray-50">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title as string}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              No Thumbnail
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold leading-snug line-clamp-2">{title as string}</h3>

          <div className="mt-2 min-h-[2.5rem]">
            {description && (
              <p className="text-sm text-gray-600 line-clamp-2">{description as string}</p>
            )}
          </div>

          <div className="mt-3 min-h-[1.5rem] flex flex-wrap gap-1">
            {Array.isArray(categories) && categories.length > 0
              ? categories.map((category) => {
                  const href = `/?category=${encodeURIComponent(category)}`;
                  return (
                    <Link
                      key={category}
                      href={href}
                      prefetch={false}
                      className="inline-flex h-6 items-center px-2 rounded-md text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors leading-none relative z-20 pointer-events-auto"
                    >
                      {category}
                    </Link>
                  );
                })
              : null}
          </div>

          <time dateTime={publishedAt as string} className="mt-3 block text-xs text-gray-500">
            {formatPublishedAt(publishedAt as string)}
          </time>
        </div>
      </div>
    </article>
  );
}
