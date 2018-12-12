import * as React from 'react';
import styled from 'styled-components';
import { BlogPosts } from '../../components/blog/BlogPosts';

const BlogWrapper = styled.div`
`;

export class Blog extends React.Component {

    public render() {
        return (
            <BlogWrapper>
                <BlogPosts />
            </BlogWrapper>
        );
    }
}
