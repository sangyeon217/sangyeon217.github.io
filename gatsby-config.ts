import type { GatsbyConfig } from "gatsby";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import dotenv from "dotenv";

dotenv.config();

const SITE_URL = `https://sangyeon217.github.io`;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Sangyeon's Tech Blog`,
    description: "상연의 기술 블로그 입니다.",
    siteUrl: SITE_URL,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  jsxRuntime: "automatic",
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-gtag",
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulPost } }) => {
              return allContentfulPost.edges.map((edge) => {
                const plainTextContent = edge.node.content
                  ? documentToPlainTextString(
                      JSON.parse(edge.node.content.raw),
                    ).slice(0, 300) + "..."
                  : "";

                // 허용되지 않는 제어 문자 제거 (ASCII 범위 0-31 중 탭(\t), 줄바꿈(\n), 캐리지 리턴(\r) 제외)
                const refinedDescription =
                  edge.node.description.description.replace(
                    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
                    "",
                  );
                const refinedContent = plainTextContent.replace(
                  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
                  "",
                );

                const categories = edge.node.category.map(
                  (category: string) => ({
                    category: category,
                  }),
                );

                return Object.assign({}, edge.node, {
                  title: edge.node.title,
                  description: refinedDescription,
                  date: edge.node.date,
                  custom_elements: [
                    { "content:encoded": refinedContent },
                    ...categories,
                  ],
                  url: site.siteMetadata.siteUrl + "/" + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + "/" + edge.node.slug,
                });
              });
            },
            query: `
              {
                allContentfulPost(sort: { date: DESC }) {
                  edges {
                    node {
                      title
                      description {
                        description
                      }
                      date
                      content {
                        raw
                      }
                      category
                      slug
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Sangyeon's Tech Blog",
          },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",
  ],
};

export default config;
