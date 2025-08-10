import {
  createClient,
  EntryFieldTypes,
  type Asset,
  type Entry,
  type EntryCollection,
  type EntriesQueries,
} from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID!;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";
const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN!;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN!;
const contentType = "post" as const;

const getClient = ({ preview = false }: { preview?: boolean }) =>
  createClient({
    space,
    environment,
    accessToken: preview ? previewToken : deliveryToken,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
  });

export type PostSkeleton = {
  contentTypeId: typeof contentType;
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    category?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    content: EntryFieldTypes.Text;
    thumbnail: EntryFieldTypes.AssetLink;
    publishedAt: EntryFieldTypes.Date;
  };
};

export type PostEntry = Entry<PostSkeleton>;
export type PostCollection = EntryCollection<PostSkeleton>;
export type CategoryItem = { name: string; count: number };

export function getThumbnailUrl(thumbnail: EntryFieldTypes.AssetLink | unknown): string | null {
  const thumbnailUrl = (thumbnail as Asset)?.fields?.file?.url;
  if (!thumbnailUrl || typeof thumbnailUrl !== "string") return null;
  return thumbnailUrl.startsWith("//") ? `https:${thumbnailUrl}` : thumbnailUrl;
}

export async function getCategories({
  preview = false,
}: {
  preview?: boolean;
}): Promise<CategoryItem[]> {
  const client = getClient({ preview });

  const response = await client.getEntries<PostSkeleton>({
    content_type: contentType,
    select: ["fields.category"],
    limit: 1000,
    locale: "ko-KR",
  });

  const categoryMap = new Map<string, number>();
  response.items.forEach((post) => {
    const categories = post?.fields?.category ?? [];
    categories.forEach((c) => categoryMap.set(c, (categoryMap.get(c) ?? 0) + 1));
  });

  const categoryList: CategoryItem[] = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [{ name: "All", count: response.items.length }, ...categoryList];
}

export async function getPosts({
  category = "All",
  page = 1,
  size = 20,
  preview = false,
}: {
  category?: string;
  page?: number;
  size?: number;
  preview?: boolean;
}): Promise<PostCollection> {
  const client = getClient({ preview });

  const baseQuery: EntriesQueries<PostSkeleton, undefined> = {
    content_type: contentType,
    order: ["-fields.publishedAt"],
    include: 2,
    limit: size,
    skip: (page - 1) * size,
    locale: "ko-KR",
    select: [
      "fields.title",
      "fields.slug",
      "fields.description",
      "fields.category",
      "fields.thumbnail",
      "fields.publishedAt",
    ],
  };

  const query: EntriesQueries<PostSkeleton, undefined> = {
    ...baseQuery,
    ...(category && category !== "All" ? { "fields.category[all]": category } : {}),
  };

  return client.getEntries<PostSkeleton>(query);
}

export async function getPostBySlug({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}): Promise<PostEntry | null> {
  const client = getClient({ preview });

  const response = await client.getEntries<PostSkeleton>({
    content_type: contentType,
    "fields.slug": slug,
    limit: 1,
    include: 2,
    locale: "ko-KR",
  });

  return response.items[0] ?? null;
}
