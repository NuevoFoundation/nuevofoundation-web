import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { BlogPosts } from '../../components/blog/BlogPosts';

export class Blog extends React.Component {

    public render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={6} xsOffset={3}>
                        <BlogPosts />
                    </Col >
                </Row>
            </Grid>
        );
    }
}
