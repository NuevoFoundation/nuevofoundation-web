import { faFacebookF, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react'; // TODO: Add bootstrap classes to footer
import { Col, Grid, Row } from 'react-bootstrap';
import '../../assets/stylesheets/Footer.css';


class Footer extends React.Component {
    public render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={12} >
                        <div className="App-footer">
                            <div className="App-footer-big">Join the conversation on social media.</div>
                            <div className="social-images">
                                <a target="_blank" href="https://www.instagram.com/nuevofoundation" className={'footer-pics'}>
                                    <FontAwesomeIcon icon={faInstagram} className={"fa-2x"} />
                                </a>
                                <a target="_blank" href="https://twitter.com/nuevofoundation" className={'footer-pics'}>
                                    <FontAwesomeIcon icon={faTwitter} className={"fa-2x"} />
                                </a>

                                <a target="_blank" href="https://www.facebook.com/NuevoFoundation" className={'footer-pics'}>
                                    <FontAwesomeIcon icon={faFacebookF} className={"fa-2x"} />
                                </a>
                                <a target="_blank" href="https://www.linkedin.com/company/nuevofoundation" className={'footer-pics'}>
                                    <FontAwesomeIcon icon={faLinkedin} className={"fa-2x"} />
                                </a>
                            </div>
                            <div className="App-footer-small">© Copyright 2018, All Rights Reserved by Nuevo Foundation, a 501(c)(3) nonprofit.</div>
                        </div>
                    </Col>
                </Row>
            </ Grid>
        );
    }
}

export default Footer;
