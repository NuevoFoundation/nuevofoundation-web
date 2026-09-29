jest.mock("react-router-dom", () => ({ Link: "a" }));

import * as React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getBlogPostThumbnailAltText } from "../components/blog/BlogPosts";
import { BlogPosts } from "../components/blog/BlogPosts";
import { MockWordpressService } from "../mockServices/MockWordpressService";
import { getPosts as samplePosts } from "../mockServices/responses/getPosts";

describe("Blog post thumbnail alt text", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it("disables pagination while loading and when there are no published posts", async () => {
    jest.spyOn(MockWordpressService.prototype, "getPublishedPosts").mockResolvedValue({ found: 0, posts: [] });
    render(React.createElement(BlogPosts));
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(await screen.findByText("No articles have been published yet.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("surfaces WordPress failures and supports retrying", async () => {
    const user = userEvent.setup();
    const getPosts = jest.spyOn(MockWordpressService.prototype, "getPublishedPosts")
      .mockRejectedValueOnce(new Error("Unavailable"))
      .mockResolvedValueOnce({ found: 0, posts: [] });
    render(React.createElement(BlogPosts));
    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn't load the articles.");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("No articles have been published yet.")).toBeInTheDocument();
    expect(getPosts).toHaveBeenCalledTimes(2);
  });

  it("retries the failed next page rather than reloading the previous page", async () => {
    const user = userEvent.setup();
    const getPosts = jest.spyOn(MockWordpressService.prototype, "getPublishedPosts")
      .mockResolvedValueOnce({ ...samplePosts, found: 20 })
      .mockRejectedValueOnce(new Error("Unavailable"))
      .mockResolvedValueOnce({ ...samplePosts, found: 20 });
    render(React.createElement(BlogPosts));
    await screen.findByText("1 of 2");
    await user.click(screen.getByRole("button", { name: "Next" }));
    await screen.findByRole("alert");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("2 of 2")).toBeInTheDocument();
    expect(getPosts).toHaveBeenNthCalledWith(3, 2);
  });
});
