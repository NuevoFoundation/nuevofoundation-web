export interface WordpressPost {
  ID: number;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  modified?: string;
  status?: string;
  URL?: string;
  featured_image?: string;
  post_thumbnail?: {
    URL?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

export interface WordpressPostsResponse {
  found: number;
  posts: WordpressPost[];
}
