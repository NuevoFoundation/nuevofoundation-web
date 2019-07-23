import * as React from "react";
import { BlogPosts } from "../../../components/blog/BlogPosts";
import styled from 'styled-components';

const BlogHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 25px 0 25px;
  height: 320px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`
const HereImage = styled.div`
  border: 1px #707070 solid;
  color: #000000;
  font-size: 28px;
  padding: 32px 0 0 25px;

  font-family: 'Space Mono', monospace;
  height: 207px;
  max-width: 513px;
`

const BlogPostsContainer = styled.div`
  padding-top: 50px;
`

export class Blog extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <BlogHero>
          <HereImage>
            Event blog
          </HereImage>
        </BlogHero>
        <BlogPostsContainer>
          <BlogPosts />
        </BlogPostsContainer>
      </React.Fragment>
    );
  }
}
