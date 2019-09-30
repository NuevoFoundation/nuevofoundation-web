import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";
import { Const } from "../../Const";
import { DateTimeFormattingHelper } from "../helpers/DateTimeFormattingHelper";

interface ActionButtonProps {
  active: boolean;
}

interface BlogPostsState {
  found: number;
  posts: any[];
  currentPage: number;
  lastPage: number;
}

const ActionButton = styled.div`
  font-family: 'Lato', sans-serif;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props: ActionButtonProps) =>
    props.active ? "#fcc600" : "#cccccc"};
  color: ${(props: ActionButtonProps) =>
    props.active ? "#000000" : "#666666"};
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
  display: row nowrap;
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

const BlogPostItem = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0 50px 0 50px;
  font-family: "Lato", sans-serif;
  color: #000000;
  font-size: 16px;

  img {
    height: 180px;
    width: 272px;
    object-fit: cover;
  }
`;

const BlogPostImage = styled.img`
  padding: 0 30px 0 0;
  flex-basis: auto;
`;

const BlogPostDetails = styled.div`
  flex-basis: 70%;

`

const BlogPostDate = styled.div`
  padding-bottom: 10px;  
`

const BlogPostTitle = styled.div`
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
  margin: 50px 0 50px 0;
  border-top: 1px solid #707070;
`;

export class BlogPosts extends React.Component<{}, BlogPostsState> {
  public wordpressService = new ServiceResolver().WordpressService();
  constructor(props: {}) {
    super(props);

    this.state = {
      found: 0,
      posts: [],
      currentPage: 1,
      lastPage: NaN
    };

    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
  }

  public async componentDidMount() {
    await this.getPosts(this.state.currentPage);
  }

  public async getNextPage() {
    const { currentPage, lastPage } = this.state;
    const newPage = currentPage === lastPage ? currentPage : currentPage + 1;
    await this.getPosts(newPage);
  }

  public async getPreviousPage() {
    const newPage =
      this.state.currentPage === 1 ? 1 : this.state.currentPage - 1;
    await this.getPosts(newPage);
  }

  public async getPosts(currentPage: number) {
    const response = await this.wordpressService.getPublishedPosts(currentPage);
    const lastPage = Math.ceil(response.found / Const.BlogPageSize);
    this.setState({
      found: response.found,
      posts: response.posts,
      currentPage: currentPage,
      lastPage: lastPage
    });
  }

  public render() {
    const { currentPage, lastPage } = this.state;
    return (
      <BlogPostsWrapper>
        {this.state.posts.map((post: any) => {
          return (
            <React.Fragment key={post.ID}>
              <BlogPostItem>
                {post.post_thumbnail &&
                  <BlogPostImage src={post.post_thumbnail.URL} />
                }
                <BlogPostDetails>
                  <StyledLink to={`/blog/post/${post.ID}`}>
                    <BlogPostTitle dangerouslySetInnerHTML={{ __html: post.title}} />
                  </StyledLink>
                  <BlogPostDate>{DateTimeFormattingHelper.FormatToMMDDYYYY(post.date)}</BlogPostDate>
                  <BlogPostContent
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </BlogPostDetails>
                <div className="flex-break" />
                <Divider />
              </BlogPostItem>
            </React.Fragment>
          );
        })}
        <PagingContainer>
          <ActionButton
            onClick={this.getPreviousPage}
            active={currentPage !== 1}
          >
            Back
          </ActionButton>
          <PageIndicator>{`${currentPage} of ${isNaN(lastPage) ? " ∞" : lastPage}`}</PageIndicator>

          <ActionButton
            onClick={this.getNextPage}
            active={currentPage !== lastPage}
          >
            Next
          </ActionButton>
        </PagingContainer>
      </BlogPostsWrapper>
    );
  }
}
