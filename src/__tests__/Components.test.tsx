import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "../components/static/common/Footer";
import { Header } from "../components/static/common/Header";
import { SupportUs } from "../components/static/pages/SupportUs";
import {
  RouteFocusManager,
  RouteMainContent
} from "../components/static/common/RouteFocusManager";

let mockPathname = "/";

jest.mock("react-router-dom", () => ({
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useLocation: () => ({ pathname: mockPathname })
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

  it("stays visually hidden on initial load and moves focus to the new page heading on navigation", async () => {
    const user = userEvent.setup();
    const scrollTo = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    const { rerender } = render(
      <>
        <RouteFocusManager />
        <a href="#header-navigation">First header link</a>
        <RouteMainContent>
          <h1>Home</h1>
          <a href="#first-action">First action</a>
        </RouteMainContent>
      </>
    );

    const skipLink = screen.getByRole("link", { name: "Skip to main content" });
    // On first load nothing should be force-focused (so the skip link
    // doesn't visibly pop up over the header on every page view).
    expect(skipLink).not.toHaveFocus();
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveFocus();

    mockPathname = "/get-involved";
    rerender(
      <>
        <RouteFocusManager />
        <a href="#header-navigation">First header link</a>
        <RouteMainContent>
          <h1>Get involved</h1>
          <a href="#first-action">First action</a>
        </RouteMainContent>
      </>
    );

    const newHeading = screen.getByRole("heading", {
      name: "Get involved",
      level: 1
    });
    await waitFor(() => expect(newHeading).toHaveFocus());
    expect(newHeading).toHaveAttribute("tabindex", "-1");
    expect(scrollTo).toHaveBeenCalledWith(0, 0);

    await user.tab();
    expect(screen.getByRole("link", { name: "First action" })).toHaveFocus();

    // The skip link is still present and keyboard-reachable/clickable.
    await user.click(skipLink);
    await waitFor(() => expect(newHeading).toHaveFocus());

    scrollTo.mockRestore();
    mockPathname = "/";
  });

  it("uses the main landmark when skip navigation finds no heading", async () => {
    const user = userEvent.setup();
    const scrollTo = jest
      .spyOn(window, "scrollTo")
      .mockImplementation(() => undefined);

    render(
      <>
        <RouteFocusManager />
        <RouteMainContent>
          <p>Loading page content</p>
        </RouteMainContent>
      </>
    );

    await user.click(
      screen.getByRole("link", { name: "Skip to main content" })
    );
    await waitFor(() => expect(screen.getByRole("main")).toHaveFocus());
    scrollTo.mockRestore();
  });

  it("renders the accessible Support Us donation options", () => {
    render(<SupportUs />);

    expect(
      screen.getByRole("link", { name: "Open the donation form in a new tab" })
    ).toBeInTheDocument();
    expect(screen.getByTitle("Nuevo Foundation donation form")).toBeInTheDocument();
  });

});