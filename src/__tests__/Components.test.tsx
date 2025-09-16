import * as React from "react";
import { render } from "@testing-library/react";

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
});