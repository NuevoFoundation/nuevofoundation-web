import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ServiceResolver } from "../../services/ServiceResolver";
import { WordpressContentHelper } from "../../helpers/WordpressContentHelper";
import { WordpressPost } from "../../models/WordpressPost";
import { Const } from "../../Const";
import ReactGA from "react-ga";
import "../../assets/stylesheets/Blog.css";
import "../../assets/stylesheets/WordpressContent.css";

interface PostProps {
  id: string;
}

interface PostState {
  post: WordpressPost | null;
  status: "loading" | "ready" | "error" | "not-found";
}

export class PostComponent extends React.Component<PostProps, PostState> {
  public wordpressService = new ServiceResolver().WordpressService();
  public state: PostState = { post: null, status: "loading" };
  private requestId = 0;

  public componentDidMount() {
    void this.loadPost();
  }

  public componentDidUpdate(previousProps: PostProps) {
    if (previousProps.id !== this.props.id) {
      void this.loadPost();
    }
  }

  public componentWillUnmount() {
    this.requestId++;
    document.title = "Nuevo Foundation";
  }

  public loadPost = async (): Promise<void> => {
    const requestId = ++this.requestId;
    const id = this.props.id;
    this.setState({ post: null, status: "loading" });
    document.title = "Event blog | Nuevo Foundation";

    if (!/^[1-9]\d*$/.test(id)) {
      this.setState({ status: "not-found" });
      return;
    }

    ReactGA.pageview(Const.BlogPost.replace(":id", id));
    try {
      const post = await this.wordpressService.getPost(id);
      if (requestId !== this.requestId) {
        return;
      }

      if (!post.ID || (post.status && post.status !== "publish")) {
        this.setState({ status: "not-found" });
        return;
      }

      document.title = `${WordpressContentHelper.getPlainText(post.title)} | Nuevo Foundation`;
      this.setState({ post, status: "ready" });
    } catch (error: unknown) {
      if (requestId === this.requestId) {
        this.setState({
          status: WordpressContentHelper.isMissingPost(error) ? "not-found" : "error"
        });
      }
    }
  };

  public render() {
    const { post, status } = this.state;
    return (
      <div className="blog-page">
        <nav className="blog-article-navigation" aria-label="Blog">
          <Link to={Const.BlogPage}>Back to event blog</Link>
        </nav>
        {status === "loading" && <p role="status">Loading article...</p>}
        {status === "not-found" && (
          <div>
            <h1>Article not found</h1>
            <p>This article may have been removed or is not published yet.</p>
          </div>
        )}
        {status === "error" && (
          <div role="alert">
            <h1>We couldn't load this article</h1>
            <p>Please try again in a moment.</p>
            <button className="blog-action" type="button" onClick={this.loadPost}>
              Try again
            </button>
          </div>
        )}
        {status === "ready" && post && (
          <article id="BlogPostDocument" className="blog-article" aria-labelledby="blog-post-title">
            <header className="blog-article-header">
              <h1 id="blog-post-title">{WordpressContentHelper.getPlainText(post.title)}</h1>
              <time dateTime={post.date}>
                {WordpressContentHelper.formatPublicationDate(post.date)}
              </time>
            </header>
            <div
              className="wordpress-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        )}
      </div>
    );
  }
}

export const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <PostComponent id={id || ""} />;
};
