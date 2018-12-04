import * as React from 'react';
import { WordpressService } from 'src/http/wordpressService';
import styled from 'styled-components';

const BlogWrapper = styled.div`
`;

export class Blog extends React.Component {
    public wordpressService = new WordpressService();
    
    public async componentDidMount() {
       const posts = await this.wordpressService.getPosts();
       // tslint:disable-next-line:no-console
       console.log(posts);
    }

    public render() {
        return (
            <BlogWrapper>
                {}
            </BlogWrapper>
        );
    }
}
