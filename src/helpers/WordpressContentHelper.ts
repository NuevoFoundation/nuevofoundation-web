export class WordpressContentHelper {
  public static getPlainText(html: string): string {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container.textContent?.trim() || "";
  }

  public static isMissingPost(error: unknown): boolean {
    return typeof error === "object" && error !== null &&
      "error" in error && error.error === "unknown_post";
  }

  public static formatPublicationDate(date: string, format: "long" | "short" = "long"): string {
    // WordPress supplies its publication day; don't shift it to the reader's time zone.
    return new Date(date.slice(0, 10)).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: format === "long" ? "long" : "numeric",
      day: "numeric"
    });
  }
}
