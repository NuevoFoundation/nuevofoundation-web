import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";
import { DateFormattingHelper } from "../../helpers/DateFormattingHelper";
import { Const } from "../../Const";
import ReactGA from "react-ga";

interface PostProps {
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

class PostComponent extends React.Component<
  PostProps,
  PostState
  > {
  public wordpressService = new ServiceResolver().WordpressService();
  constructor(props: PostProps) {
    super(props);
    ReactGA.pageview(`${Const.BlogPost}-${this.props.id}`);
    this.state = {
      post: []
    };
    window.scrollTo(0, 0);
  }

  public async componentDidMount() {
    const response = await this.wordpressService.getPost(
      this.props.id
    );
    this.setState({
      post: response
    }, this.addResponsiveClass);
  }

  public addResponsiveClass() {
    const blogPostDocument = document.getElementById("BlogPostDocument");
    const images = blogPostDocument!.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
      images[i].className += " img-responsive";
    }
    return;
  }

  public render() {
    const { post } = this.state;
    return (
      React.createElement(Container as any, { fluid: true }, [
        <Row key="row">
          <Col xs={10} sm={6} className="offset-1 offset-sm-3">
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

// Functional wrapper to provide useParams hook data to the class component
export const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <PostComponent id={id || ''} />;
};
