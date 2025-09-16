import * as React from "react";
import { render } from "@testing-library/react";

describe("Basic Tests", () => {
  it("renders a simple div without crashing", () => {
    render(<div>Hello World</div>);
  });
});