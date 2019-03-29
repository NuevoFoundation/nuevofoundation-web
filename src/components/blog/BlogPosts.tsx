import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";

interface BlogPostsState {
  found: number;
  posts: any[];
}

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
`;

const BlogPostItem = styled.div``;

const BlogPostTitle = styled.h1`
  color: #262626;
  padding-bottom: 10px;
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
      posts: []
    };
  }

  public async componentDidMount() {
    const response = await this.wordpressService.getPosts();
    this.setState({
      found: response.found,
      posts: response.posts
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
      </BlogPostsWrapper>
    );
  }
}
