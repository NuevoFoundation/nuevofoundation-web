jest.mock("react-router-dom", () => ({ Link: "a" }));

import * as React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getBlogPostThumbnailAltText } from "../components/blog/BlogPosts";
import { BlogPosts } from "../components/blog/BlogPosts";

describe("Blog post thumbnail alt text", () => {
  it("uses WordPress alt text when provided", () => {
    expect(
      getBlogPostThumbnailAltText({
        title: "Post title",
        post_thumbnail: { alt: "Students presenting a robotics project" }
      })
    ).toBe("Students presenting a robotics project");
  });

  it("falls back to the decoded plain-text post title", () => {
    expect(
      getBlogPostThumbnailAltText({
        title: "Nuevo &amp; <strong>Microsoft</strong>",
        post_thumbnail: {}
      })
    ).toBe("Nuevo & Microsoft");
  });

  it("includes active paging controls in the keyboard tab order", async () => {
    const user = userEvent.setup();
    const blogPosts = React.createRef<BlogPosts>();
    render(React.createElement(BlogPosts, { ref: blogPosts }));

    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      blogPosts.current?.setState({
        found: 20,
        posts: [],
        currentPage: 1,
        lastPage: 2
      });
    });

    const back = screen.getByRole("button", { name: "Back" });
    const next = screen.getByRole("button", { name: "Next" });
    expect(back).toBeDisabled();
    expect(next).toBeEnabled();

    await user.tab();
    expect(next).toHaveFocus();
  });
});
