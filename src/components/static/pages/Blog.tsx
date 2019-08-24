import * as React from "react";
import { BlogPosts } from "../../../components/blog/BlogPosts";
import styled from 'styled-components';
import { PageTitle } from "../common/PageTitle";
import { Const } from "../../../Const";
import ReactGA from "react-ga";

const BlogPostsContainer = styled.div`
  padding-top: 50px;
`

export class Blog extends React.Component {
  constructor(props: {}) {
    super(props);
    ReactGA.pageview(Const.BlogPage);
  }
  public render() {
    return (
      <React.Fragment>
        <PageTitle title={"Event blog"} />
        <BlogPostsContainer>
          <BlogPosts />
        </BlogPostsContainer>
      </React.Fragment>
    );
  }
}
