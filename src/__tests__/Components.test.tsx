import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "../components/static/common/Footer";
import { Header } from "../components/static/common/Header";
import { GetInvolved } from "../components/static/pages/GetInvolved";
import { SupportUs } from "../components/static/pages/SupportUs";
import { AboutUs } from "../components/static/pages/AboutUs";
import { Const } from "../Const";

jest.mock("react-router-dom", () => ({
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useLocation: () => ({ pathname: "/" })
}));
jest.mock("../assets/logos/Logo_long.svg", () => "logo.svg");
jest.mock("react-ga", () => ({ pageview: jest.fn() }));

describe("Components Tests", () => {
  it("renders basic components without errors", () => {
    const MockHeader = () => <header>Nuevo Foundation</header>;
    const MockFooter = () => <footer>© 2025 Nuevo Foundation</footer>;
    
    render(
      <div>
        <MockHeader />
        <main>Main Content</main>
        <MockFooter />
      </div>
    );
  });



  it("renders keyboard-reachable header links and valid navigation list structure", async () => {
    const user = userEvent.setup();
    render(
      <Header
        hamburgerMenuOpen={false}
        handleHamburgerIconClick={() => undefined}
        location={{ pathname: "/" }}
      />
    );

    expect(
      screen.getByRole("link", { name: "Nuevo Foundation on Instagram" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Nuevo Foundation home" })
    ).toHaveLength(2);

    const headerLinks = screen.getAllByRole("link");
    for (const link of headerLinks.slice(0, 10)) {
      await user.tab();
      expect(link).toHaveFocus();
    }

    const navigationList = screen.getByRole("list");
    expect(Array.from(navigationList.children)).toHaveLength(7);
    expect(
      Array.from(navigationList.children).every(
        child => child.tagName === "LI"
      )
    ).toBe(true);
  });

  it("renders keyboard-reachable footer social links", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(8);

    for (const link of links) {
      await user.tab();
      expect(link).toHaveFocus();
    }
  });

  it("resets Get Involved focus to the first header link", () => {
    document.body.innerHTML = `
      <a id="${Const.SiteHeaderStartId}" href="https://example.com">First header link</a>
    `;
    const scrollTo = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    new GetInvolved({}).componentDidMount();

    expect(screen.getByRole("link", { name: "First header link" })).toHaveFocus();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    scrollTo.mockRestore();
  });

  it("resets Support Us focus to the first header link", () => {
    document.body.innerHTML = `
      <a id="${Const.SiteHeaderStartId}" href="https://example.com">First header link</a>
    `;
    const scrollTo = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    render(<SupportUs />);

    expect(screen.getByRole("link", { name: "First header link" })).toHaveFocus();
    expect(
      screen.getByRole("link", { name: "Open the donation form in a new tab" })
    ).toBeInTheDocument();
    expect(screen.getByTitle("Nuevo Foundation donation form")).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    scrollTo.mockRestore();
  });

  it("resets About Us focus to the first header link", () => {
    document.body.innerHTML = `
      <a id="${Const.SiteHeaderStartId}" href="https://example.com">First header link</a>
    `;
    const scrollTo = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    new AboutUs({}).componentDidMount();

    expect(screen.getByRole("link", { name: "First header link" })).toHaveFocus();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    scrollTo.mockRestore();
  });

});