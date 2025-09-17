import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";
import { DateFormattingHelper } from "../../helpers/DateFormattingHelper";
import { Const } from "../../Const";
import ReactGA from "react-ga";

interface PostParams {
  id: string;
}

interface PostState {
  post: any;
}

const BlogPostItem = styled.div``;

const BlogPostTitle = styled.h2`
  color: #262626;
  font-family: "Lato", sans-serif;
  font-size: 28px;
`;

const BlogPostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  color: #262626;
  font-family: "Lato", sans-serif;
  font-size: 16px;
`;
const Divider = styled.hr`
  width: 40%;
  height: 0;
  border: 0;
  border-top: 1px solid #c1c1c1;
`;
const PostWrapper = styled.div`
  min-height: 500px;
`;

export class Post extends React.Component<
  RouteComponentProps<PostParams>,
  PostState
  > {
  public wordpressService = new ServiceResolver().WordpressService();
  constructor(props: RouteComponentProps<PostParams>) {
    super(props);
    ReactGA.pageview(`${Const.BlogPost}-${this.props.match.params.id}`);
    this.state = {
      post: []
    };
    window.scrollTo(0, 0);
  }

  public async componentDidMount() {
    const response = await this.wordpressService.getPost(
      this.props.match.params.id
    );
    this.setState({
      post: response
    }, this.addResponsiveClass);
  }

  public addResponsiveClass() {
    var blogPostDocument = document.getElementById("BlogPostDocument");
    var images = blogPostDocument!.getElementsByTagName("img");

    for (var i = 0; i < images.length; i++) {
      images[i].className += " img-responsive";
    }
    return;
  }

  public render() {
    const { post } = this.state;
    return (
      React.createElement(Grid as any, { fluid: true }, [
        <Row key="row">
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <PostWrapper id={"BlogPostDocument"}>
              <BlogPostItem>
                <BlogPostTitle>{post.title}</BlogPostTitle>
                <span>
                  {DateFormattingHelper.formatToMonthDayYear(post.date)}
                </span>
                <BlogPostContent
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </BlogPostItem>
              <Divider />
            </PostWrapper>
          </Col>
        </Row>
      ])
    );
  }
}
