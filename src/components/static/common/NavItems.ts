
export interface INavItem {
  dropdown: boolean;
  text: string;
  link: string;
}

export const NavItems: INavItem[] = [
  /*
  {
    dropdown: false,
    link: "what-we-do",
    text: "What We Do"
  },
  {
    dropdown: true,
    link: "about-us",
    text: "About Us"
  },
  {
    dropdown: false,
    link: "support-us",
    text: "Support Us"
  },
  */
  {
    dropdown: false,
    link: "/contact",
    text: "Contact"
  },
  {
    dropdown: false,
    link: "/blog",
    text: "Blog"
  }
];