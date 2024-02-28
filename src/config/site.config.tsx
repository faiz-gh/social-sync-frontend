import { Metadata } from "next";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import logoImg from "@public/logo.svg";
import logoIconImg from "@public/logo-icon.svg";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "SocialSync - Making Marketing Easy",
  description: `SocialSync is a social media management tool that helps businesses and individuals to manage their social media accounts, schedule posts, analyze performance, and engage with their audience.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    metadataBase: new URL("https://social-sync-frontend.vercel.app"),
    title: title ? `SocialSync | ${title}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `SocialSync | ${title}` : title,
      description,
      url: "https://social-sync-frontend.vercel.app",
      siteName: "Social Sync", // https://developers.google.com/search/docs/appearance/site-names
      // images: {
      //   url: "https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png",
      //   width: 1200,
      //   height: 630,
      // },
      locale: "en_US",
      type: "website",
    },
  };
};
