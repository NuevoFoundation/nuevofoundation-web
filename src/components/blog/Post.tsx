import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { ServiceResolver } from '../../services/ServiceResolver';
import { DateTimeFormattingHelper } from '../helpers/DateTimeFormattingHelper';

interface IPostParams {
    id: string;
}

interface IPostState {
    post: any;
}

const BlogPostItem = styled.div`

`

const BlogPostTitle = styled.h2`
  color: #262626;
`

const BlogPostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  color: #262626;  
`
const Divider = styled.hr`
  width: 40%;
  height:0; 
  border:0; 
  border-top: 1px solid #C1C1C1; 
`
const PostWrapper = styled.div`
  min-height: 500px;
`

export class Post extends React.Component<RouteComponentProps<IPostParams>, IPostState> {
    public wordpressService = new ServiceResolver().WordpressService();
    constructor(props: RouteComponentProps<IPostParams>) {
        super(props);

        this.state = {
            post: []
        };
    }


    public async componentDidMount() {
        const response = await this.wordpressService.getPost(this.props.match.params.id);
        this.setState({
            post: response
        })
    }

    public render() {
        const { post } = this.state;
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                        <PostWrapper>
                            <BlogPostItem>
                                <BlogPostTitle>{post.title}</BlogPostTitle>
                                <span>{DateTimeFormattingHelper.FormatToMonthDayYear(post.date)}</span>
                                <BlogPostContent dangerouslySetInnerHTML={{ __html: post.content }} />
                            </BlogPostItem>
                            <Divider />
                        </PostWrapper>
                    </Col >
                </Row>
            </Grid>
        );
    }
}