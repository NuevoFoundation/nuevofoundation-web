import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/static/common/Header";
import { Footer } from "../components/static/common/Footer";
import { NavItems } from "../components/static/common/NavItems";
import { Home } from "../components/static/pages/Home";
import { Const } from "../Const";

jest.mock("react-lottie", () => () => null);
jest.mock("react-countup", () => () => null);
jest.mock("react-ga");

const socialLinks = [
  ["Nuevo Foundation on Instagram", "https://www.instagram.com/nuevofoundation"],
  ["Nuevo Foundation on X (Twitter)", "https://twitter.com/nuevofoundation"],
  ["Nuevo Foundation on Facebook", "https://www.facebook.com/NuevoFoundation"],
  ["Nuevo Foundation on LinkedIn", "https://www.linkedin.com/company/nuevofoundation"],
  ["Nuevo Foundation on YouTube", "https://www.youtube.com/nuevofoundation?sub_confirmation=1"],
  ["Nuevo Foundation's Spotify playlist", "https://open.spotify.com/playlist/0uQ8AwLs4SIpY4A4G52pTB?si=e30542420a8c40b1"],
  ["Nuevo Foundation on GitHub", "https://github.com/NuevoFoundation"],
  ["Nuevo Foundation sticker store", "https://www.stickermule.com/nuevofoundation"]
];

function renderNavigation() {
  return render(
    <MemoryRouter initialEntries={[Const.RootPage]}>
      <Header hamburgerMenuOpen={false} handleHamburgerIconClick={jest.fn()} />
      <Footer />
    </MemoryRouter>
  );
}

function luminance(color: string): number {
  const channels = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!channels) {
    throw new Error(`Expected an opaque RGB color, received: ${color}`);
  }

  const [red, green, blue] = channels.slice(1).map(channel => {
    const value = Number(channel) / 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

describe("FastPass accessibility regressions", () => {
  it("gives every header and footer social link a descriptive accessible name", () => {
    renderNavigation();

    socialLinks.forEach(([name, href]) => {
      const links = screen.getAllByRole("link", { name });
      expect(links).toHaveLength(2);
      links.forEach(link => {
        expect(link).toHaveAttribute("href", href);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  it("names both desktop and mobile logo links through image alternatives", () => {
    renderNavigation();

    const links = screen.getAllByRole("link", { name: "Nuevo Foundation home" });
    expect(links).toHaveLength(2);
    links.forEach(link => {
      expect(link).toHaveAttribute("href", Const.RootPage);
      expect(within(link).getByRole("img", { name: "Nuevo Foundation home" })).toBeInTheDocument();
    });
  });

  it("places each desktop navigation link inside a direct list-item child", () => {
    renderNavigation();

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(NavItems.length);
    expect(Array.from(list.children)).toEqual(items);
    items.forEach((item, index) => {
      expect(item.parentElement).toBe(list);
      const link = within(item).getByRole("link", { name: NavItems[index].text });
      expect(link.parentElement).toBe(item);
      expect(link).toHaveAttribute("href", NavItems[index].link);
    });
  });

  it("preserves active navigation and list semantics when following a link", async () => {
    const user = userEvent.setup();
    renderNavigation();

    await user.click(screen.getByRole("link", { name: "What We Do" }));

    const activeLink = screen.getByRole("link", { name: "What We Do" });
    expect(activeLink).toHaveAttribute("aria-current", "page");
    expect(activeLink.parentElement).toHaveRole("listitem");
    expect(activeLink.parentElement?.parentElement).toBe(screen.getByRole("list"));
    expect(screen.getByRole("link", { name: "Contact us" })).not.toHaveAttribute("aria-current");
  });

  it.each(Home.ImpactStats)("keeps $titleBoldened impact text above the large-text contrast threshold", stat => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const title = screen.getByText(stat.stat);
    const section = title.closest('[style*="background-color"]');
    if (!section) {
      throw new Error("Impact text must have an explicit background color.");
    }
    const style = window.getComputedStyle(title);
    const background = window.getComputedStyle(section).backgroundColor;
    expect(background).toBe("rgb(255, 255, 255)");
    expect(style.fontSize).toBe("36px");
    expect(title).toContainElement(screen.getByText(stat.titleBoldened));

    const foregroundLuminance = luminance(style.color);
    const backgroundLuminance = luminance(background);
    const contrast = (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
      (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
    expect(contrast).toBeGreaterThanOrEqual(3);
  });
});
