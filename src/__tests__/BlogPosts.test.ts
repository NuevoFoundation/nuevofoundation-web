jest.mock("react-router-dom", () => ({ Link: "a" }));

import { getBlogPostThumbnailAltText } from "../components/blog/BlogPosts";

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
});
