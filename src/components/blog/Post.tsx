import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { ServiceResolver } from '../../services/ServiceResolver';

interface IPostParams {
    id: string;
}

interface IPostState {
    post: any;
}

const BlogPostItem = styled.div`

`

const BlogPostTitle = styled.h2`

`

const BlogPostContent = styled.div`

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
        return (
            <React.Fragment>
                <BlogPostItem>
                    <BlogPostTitle>{this.state.post.title}</BlogPostTitle>
                    <BlogPostContent dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
                </BlogPostItem>
            </React.Fragment >
        );
    }
}