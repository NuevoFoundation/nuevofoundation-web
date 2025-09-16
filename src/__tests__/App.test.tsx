import * as React from "react";
import { render } from "@testing-library/react";

describe("Basic Tests", () => {
  it("renders a simple div without crashing", () => {
    render(<div>Hello World</div>);
  });

  it("renders a React component", () => {
    const TestComponent = () => <span>Test Component</span>;
    render(<TestComponent />);
  });

  it("can handle props", () => {
    const TestComponent = ({ text }: { text: string }) => <div>{text}</div>;
    render(<TestComponent text="Test Text" />);
  });
});