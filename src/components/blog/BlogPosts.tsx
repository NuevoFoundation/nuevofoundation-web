import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";
import { Const } from "../../Const";
import { WordpressContentHelper } from "../../helpers/WordpressContentHelper";
import { WordpressPost, WordpressPostsResponse } from "../../models/WordpressPost";

interface ActionButtonProps {
  $active: boolean;
}

interface BlogPostsState {
  found: number;
  posts: WordpressPost[];
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: boolean;
}

const ActionButton = styled.button<{ $active: boolean }>`
  font-family: 'Lato', sans-serif;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props: ActionButtonProps) =>
    props.$active ? "#fcc600" : "#cccccc"};
  color: ${(props: ActionButtonProps) =>
    props.$active ? "#000000" : "#565656"};

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid #005ea8;
    outline-offset: 3px;
  }
`;

const PageIndicator = styled.div`
  border: none;
  padding: 15px 32px;
  text-align: center;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  color: #666666;
`;

const PagingContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
  justify-content: space-around;
  padding: 20px 0 30px 0;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #000000;
  }
`;

const BlogPostsWrapper = styled.div`

`;

const BlogPostItem = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 272px) minmax(0, 1fr);
  gap: 30px;
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Lato", sans-serif;
  color: #000000;
  font-size: 16px;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
`;

const BlogPostImage = styled.img`
  height: 180px;
  width: 100%;
  object-fit: cover;
`;

const BlogPostDetails = styled.div`
  min-width: 0;
  overflow-wrap: anywhere;
`

const BlogPostDate = styled.div`
  padding-bottom: 10px;  
`

const BlogPostTitle = styled.h2`
  font-family: 'Space Mono', monospace;
  font-size: 28px;
  padding-bottom: 10px;  
`;

const BlogPostContent = styled.div`

`;

const Divider = styled.hr`
  height: 0;
  border: 0;
  width: 100%;
  margin: 30px 0;
  border-top: 1px solid #707070;
  grid-column: 1 / -1;
`;

export const getBlogPostThumbnailAltText = (post: Pick<WordpressPost, "title" | "post_thumbnail">): string => {
  const thumbnailAltText = post.post_thumbnail?.alt?.trim();
  if (thumbnailAltText) {
    return thumbnailAltText;
  }

  return WordpressContentHelper.getPlainText(post.title) || "Blog post thumbnail";
};

export class BlogPosts extends React.Component<{}, BlogPostsState> {
  public wordpressService = new ServiceResolver().WordpressService();
  private requestId = 0;
  private requestedPage = 1;
  constructor(props: {}) {
    super(props);

    this.state = {
      found: 0,
      posts: [],
      currentPage: 1,
      lastPage: 0,
      loading: true,
      error: false
    };

    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
  }

  public async componentDidMount() {
    await this.getPosts(this.state.currentPage);
  }

  public componentWillUnmount() {
    this.requestId++;
  }

  public async getNextPage() {
    if (this.state.loading) {
      return;
    }
    const { currentPage, lastPage } = this.state;
    const newPage = currentPage === lastPage ? currentPage : currentPage + 1;
    await this.getPosts(newPage);
  }

  public async getPreviousPage() {
    if (this.state.loading) {
      return;
    }
    const newPage =
      this.state.currentPage === 1 ? 1 : this.state.currentPage - 1;
    await this.getPosts(newPage);
  }

  public async getPosts(currentPage: number) {
    const requestId = ++this.requestId;
    this.requestedPage = currentPage;
    this.setState({ loading: true, error: false });
    try {
      const response: WordpressPostsResponse = await this.wordpressService.getPublishedPosts(currentPage);
      if (requestId === this.requestId) {
        this.setState({
          found: response.found,
          posts: response.posts,
          currentPage,
          lastPage: Math.ceil(response.found / Const.BlogPageSize),
          loading: false
        });
      }
    } catch {
      if (requestId === this.requestId) {
        this.setState({ loading: false, error: true });
      }
    }
  }

  public render() {
    const { currentPage, lastPage, loading, error } = this.state;
    const canGoBack = !loading && currentPage > 1;
    const canGoNext = !loading && currentPage < lastPage;
    return (
      <BlogPostsWrapper>
        {loading && <p role="status">Loading articles...</p>}
        {error && (
          <div role="alert">
            <p>We couldn't load the articles. Please try again.</p>
            <ActionButton type="button" $active onClick={() => this.getPosts(this.requestedPage)}>
              Try again
            </ActionButton>
          </div>
        )}
        {!loading && !error && this.state.posts.length === 0 && <p>No articles have been published yet.</p>}
        {this.state.posts.map(post => {
          return (
            <React.Fragment key={post.ID}>
              <BlogPostItem>
                {post.post_thumbnail?.URL ?
                  <BlogPostImage
                    src={post.post_thumbnail.URL}
                    alt={getBlogPostThumbnailAltText(post)}
                    loading="lazy"
                  />
                  : <div />
                }
                <BlogPostDetails>
                  <StyledLink to={Const.BlogPost.replace(":id", String(post.ID))}>
                    <BlogPostTitle>{WordpressContentHelper.getPlainText(post.title)}</BlogPostTitle>
                  </StyledLink>
                  <BlogPostDate>
                    <time dateTime={post.date}>{WordpressContentHelper.formatPublicationDate(post.date, "short")}</time>
                  </BlogPostDate>
                  <BlogPostContent
                    dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                  />
                </BlogPostDetails>
                <Divider />
              </BlogPostItem>
            </React.Fragment>
          );
        })}
        <PagingContainer>
          <ActionButton
            type="button"
            onClick={this.getPreviousPage}
            $active={canGoBack}
            disabled={!canGoBack}
          >
            Back
          </ActionButton>
          <PageIndicator>{lastPage > 0 ? `${currentPage} of ${lastPage}` : "No pages"}</PageIndicator>

          <ActionButton
            type="button"
            onClick={this.getNextPage}
            $active={canGoNext}
            disabled={!canGoNext}
          >
            Next
          </ActionButton>
        </PagingContainer>
      </BlogPostsWrapper>
    );
  }
}
