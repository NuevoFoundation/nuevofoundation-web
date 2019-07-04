import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";
import { Const } from "../../Const";

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

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const BlogPostsWrapper = styled.div`
  min-height: 500px;
  padding-bottom: 100px;
`;

const BlogPostItem = styled.div``;

const BlogPostTitle = styled.h1`
  color: #262626;
  padding-bottom: 10px;
  font-family: "Lato", sans-serif;
  font-size: 28px;
`;

const BlogPostContent = styled.div`
  color: #262626;
  font-family: "Lato", sans-serif;
`;

const Divider = styled.hr`
  height: 0;
  border: 0;
  border-top: 1px solid #c1c1c1;
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
                <StyledLink to={`/blog/post/${post.ID}`}>
                  <BlogPostTitle>{post.title}</BlogPostTitle>
                </StyledLink>
                <BlogPostContent
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </BlogPostItem>
              <Divider />
            </React.Fragment>
          );
        })}
        <ActionButton
          onClick={this.getPreviousPage}
          style={{ float: "left" }}
          active={currentPage !== 1}
        >
          Back
        </ActionButton>
        <ActionButton
          onClick={this.getNextPage}
          style={{ float: "right" }}
          active={currentPage !== lastPage}
        >
          Next
        </ActionButton>
        <PageIndicator>{`page ${currentPage} of ${lastPage}`}</PageIndicator>
      </BlogPostsWrapper>
    );
  }
}
