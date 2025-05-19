import type { MetaBase } from "~/lib/meta";
import { loadQuery } from "~/lib/sanity/load-query";
import { PROFILE_IMAGE_QUERY } from "~/lib/sanity/queries";

const getBase: MetaBase = async (ctx) => {
  const profilePicture =
    (await loadQuery({ query: PROFILE_IMAGE_QUERY })).result?.url ??
    "/favicon.ico";
  const { appUrl: appURL } = ctx;

  const baseTitle = "Obi Fortune's Portfolio";
  const baseDescription =
    "Obi Fortune's Portfolio. Built with Sanity, Astro, and Tailwind CSS.";

  return {
    title: baseTitle,
    description: baseDescription,
    creator: "Obi Fortune",
    author: "Obi Fortune",
    keywords: [
      "Astro",
      "TypeScript",
      "Sanity",
      "Blog",
      "Portfolio",
      "Obi Fortune",
      "Javascript",
      "Tech",
      "Technology",
      "Programming",
      "Web Development",
    ],
    application_name: "Obi Fortune's Portfolio",

    og: {
      image: profilePicture,
      title: baseTitle,
      type: "website",
      url: appURL,
      site_name: "Obi Fortune's Portfolio",
      locale: "en_US",
      description: baseDescription,
    },

    twitter: {
      title: baseTitle,
      description: baseDescription,
      site: appURL,
      image: profilePicture,
      card: "summary",
      creator: "@obifortunebleh",
      image_alt: "Obi Fortune's Portfolio",
      creatorid: "@obifortunebleh",
      site_id: "@obifortunebleh",
    },
  };
};

export default getBase;
