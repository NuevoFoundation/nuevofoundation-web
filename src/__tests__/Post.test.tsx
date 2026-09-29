import * as React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fs from "fs";
import path from "path";
import { PostComponent } from "../components/blog/Post";
import { MockWordpressService } from "../mockServices/MockWordpressService";
import { WordpressPost } from "../models/WordpressPost";
import { Const } from "../Const";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>
}));
jest.mock("react-ga", () => ({ pageview: jest.fn() }));

const layout = fs.readFileSync(path.join(__dirname, "fixtures", "wordpress-layout.html"), "utf8");
const post: WordpressPost = {
  ID: 1841,
  title: "Images &amp; <em>layouts</em>",
  date: "2026-09-28T00:08:00Z",
  status: "publish",
  content: layout
};

describe("WordPress article rendering", () => {
  beforeEach(() => {
    document.title = "Nuevo Foundation";
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("preserves saved image attributes, block layouts, captions and embeds without forcing focus", async () => {
    document.title = "Server-rendered article title | Nuevo Foundation";
    jest.spyOn(MockWordpressService.prototype, "getPost").mockResolvedValue(post);
    const { container, unmount } = render(<PostComponent id="1841" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading article");

    const heading = await screen.findByRole("heading", { name: "Images & layouts", level: 1 });
    expect(heading).not.toHaveFocus();
    expect(document.title).toBe("Images & layouts | Nuevo Foundation");
    expect(screen.getByText("September 28, 2026")).toHaveAttribute("datetime", post.date);
    expect(screen.getByRole("link", { name: "Back to event blog" })).toHaveAttribute("href", Const.BlogPage);
    expect(screen.getByRole("img", { name: "Centered illustration" })).toHaveStyle("width: 240px; height: auto");
    expect(screen.getByText("A centered image with an author-selected width.").tagName).toBe("FIGCAPTION");
    expect(container.querySelector(".wp-block-columns .wp-block-column")).toHaveStyle("flex-basis: 35%");
    expect(container.querySelectorAll(".wp-block-gallery > .wp-block-image")).toHaveLength(3);
    expect(screen.getByTitle("Example embedded media")).toHaveAttribute("width", "560");
    expect(container.querySelector(".wordpress-content")?.innerHTML).toContain("has-media-on-the-right");
    expect(container.querySelector(".img-responsive")).not.toBeInTheDocument();
    unmount();
    expect(document.title).toBe("Nuevo Foundation");
  });

  it("shows a useful error and allows retrying the request", async () => {
    const getPost = jest.spyOn(MockWordpressService.prototype, "getPost")
      .mockRejectedValueOnce(new Error("Unavailable"))
      .mockResolvedValueOnce(post);
    const user = userEvent.setup();
    render(<PostComponent id="1841" />);
    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn't load this article");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("heading", { name: "Images & layouts" })).toBeInTheDocument();
    expect(getPost).toHaveBeenCalledTimes(2);
  });

  it("shows a missing-article page for a WordPress unknown_post response", async () => {
    jest.spyOn(MockWordpressService.prototype, "getPost").mockRejectedValue({ error: "unknown_post" });
    render(<PostComponent id="999999" />);
    expect(await screen.findByRole("heading", { name: "Article not found" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Try again" })).not.toBeInTheDocument();
  });

  it("does not request invalid article IDs", () => {
    const getPost = jest.spyOn(MockWordpressService.prototype, "getPost");
    render(<PostComponent id="invalid" />);
    expect(screen.getByRole("heading", { name: "Article not found" })).toBeInTheDocument();
    expect(getPost).not.toHaveBeenCalled();
  });

  it("does not display unpublished articles", async () => {
    jest.spyOn(MockWordpressService.prototype, "getPost").mockResolvedValue({ ...post, status: "draft" });
    render(<PostComponent id="1841" />);
    expect(await screen.findByRole("heading", { name: "Article not found" })).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("loads the new ID on in-app navigation and ignores a late response from the old article", async () => {
    let resolveFirst: (value: WordpressPost) => void = () => { throw new Error("Request not started"); };
    const firstResponse = new Promise<WordpressPost>(resolve => { resolveFirst = resolve; });
    const getPost = jest.spyOn(MockWordpressService.prototype, "getPost")
      .mockReturnValueOnce(firstResponse)
      .mockResolvedValueOnce({ ...post, ID: 1844, title: "The next article" });
    const { rerender } = render(<PostComponent id="1841" />);
    rerender(<PostComponent id="1844" />);
    expect(await screen.findByRole("heading", { name: "The next article" })).toBeInTheDocument();
    await act(async () => { resolveFirst(post); });
    expect(screen.queryByRole("heading", { name: "Images & layouts" })).not.toBeInTheDocument();
    expect(document.title).toBe("The next article | Nuevo Foundation");
    expect(getPost).toHaveBeenNthCalledWith(2, "1844");
  });
});
