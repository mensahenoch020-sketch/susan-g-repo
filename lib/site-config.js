/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * Edit the values below to update business information across the
 * entire website. These values are pulled into every page, the
 * navigation, footer, and SEO metadata.
 * ------------------------------------------------------------------
 */

export const siteConfig = {
  businessName: "Susan G Enterprises",
  legalName: "Susan Elizabeth Goudeseune",
  tagline: "Freshly Prepared Food, Wherever You Are",
  shortDescription:
    "Mobile food service serving Southfield, Michigan and the surrounding Oakland County community with freshly prepared meals for individuals, events, and gatherings.",

  // Contact information
  email: "susangoudeseune5@gmail.com",
  phone: "(470) 204-5778",
  phoneRaw: "+14702045778",

  // Location / service area
  city: "Southfield",
  state: "Michigan",
  stateAbbr: "MI",
  county: "Oakland County",
  serviceArea:
    "Southfield, Michigan and surrounding Oakland County communities",

  // Zip codes we currently deliver to. Southfield's own zip codes are
  // listed first, followed by a few immediately bordering communities.
  // EDIT THIS LIST to match your actual delivery range — add or
  // remove zip codes as your service area changes.
  deliveryZips: [
    "48033", // Southfield
    "48034", // Southfield
    "48037", // Southfield
    "48075", // Southfield
    "48076", // Southfield
    "48086", // Southfield
    "48025", // Franklin / Southfield Township (bordering)
    "48334", // Farmington Hills (bordering)
    "48335", // Farmington Hills (bordering)
    "48073", // Berkley / Huntington Woods area (bordering)
  ],

  // Business details
  businessType: "Sole Proprietorship",
  industry: "Mobile Food Service",
  startDate: "December 2021",
  startYear: "2021",

  // Social links — add real URLs when available, or leave blank to hide
  social: {
    facebook: "",
    instagram: "",
  },

  // Site metadata
  siteUrl: "https://susangenterprises.com", // update once a domain is connected
};

export default siteConfig;
