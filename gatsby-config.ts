import type { GatsbyConfig } from "gatsby";
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
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",
  ],
};

export default config;
