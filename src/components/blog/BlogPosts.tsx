import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";

interface BlogPostsState {
  found: number;
  posts: any[];
  currentPage: number;
}

const ActionButton = styled.div`
  background-color: #fcc600; 
  border: none;
  color: #000000;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
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
`;

const BlogPostContent = styled.div`
  color: #262626;
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
      currentPage: 1
    };

    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
  }

  public async componentDidMount() {
    await this.getPosts(this.state.currentPage);
  }

  public async getNextPage() {
    await this.getPosts(this.state.currentPage + 1);
  }

  public async getPreviousPage() {
    const newPage = this.state.currentPage === 1 ? 1 : this.state.currentPage-1;
    await this.getPosts(newPage);
  }

  public async getPosts(currentPage: number) {
    const response = await this.wordpressService.getPublishedPosts(currentPage);
    this.setState({
      found: response.found,
      posts: response.posts,
      currentPage: currentPage
    });
  }

  public render() {
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
        <ActionButton onClick={this.getPreviousPage} style={{float:'left'}}>
          Back
        </ActionButton>
        <ActionButton onClick={this.getNextPage} style={{float:'right'}}>Next</ActionButton>
      </BlogPostsWrapper>
    );
  }
}
