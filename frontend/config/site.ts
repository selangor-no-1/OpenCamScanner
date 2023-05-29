export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "OpenCamScanner",
  description:
    "A LifeHack 2023 Project",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: '/dashboard'
    }
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn",
    docs: "https://ui.shadcn.com/",
  },
}
