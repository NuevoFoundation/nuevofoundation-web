import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ServiceResolver } from '../../services/ServiceResolver';

interface IBlogPostsState {
    found: number;
    posts: any[];
}

const BlogPostItem = styled.div`

`

const BlogPostTitle = styled.h2`

`

const BlogPostContent = styled.div`

`

export class BlogPosts extends React.Component<{}, IBlogPostsState> {
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
        })
    }

    public render() {
        return (
            <React.Fragment>

                {this.state.posts.map((post: any) => {
                    return (
                        <BlogPostItem key={post.ID}>
                            <Link to={`/blog/post/${post.ID}`}>
                                <BlogPostTitle>{post.title}</BlogPostTitle>
                            </Link>
                            <BlogPostContent>
                                {/* TODO: inject content as html */}
                                {post.content}
                            </BlogPostContent>
                        </BlogPostItem>
                    );
                })}
            </React.Fragment>
        );
    }
}