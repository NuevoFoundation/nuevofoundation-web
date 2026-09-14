import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../components/static/common/Footer";
import { Header } from "../components/static/common/Header";

jest.mock("react-router-dom", () => ({
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useLocation: () => ({ pathname: "/" })
}));
jest.mock("../assets/logos/Logo_long.svg", () => "logo.svg");

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

  it("renders accessible header links and valid navigation list structure", () => {
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

    const navigationList = screen.getByRole("list");
    expect(Array.from(navigationList.children)).toHaveLength(7);
    expect(
      Array.from(navigationList.children).every(
        child => child.tagName === "LI"
      )
    ).toBe(true);
  });

  it("renders accessible footer social links", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: "Nuevo Foundation on Instagram" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Nuevo Foundation store" })
    ).toBeInTheDocument();
  });
});