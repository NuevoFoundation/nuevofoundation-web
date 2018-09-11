import { faFacebookF, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react'; // TODO: Add bootstrap classes to footer
import '../../assets/stylesheets/Footer.css';


class Footer extends React.Component {
    public render() {
        return (
            <div className="App-footer">
                <div className="App-footer-big">Join the conversation on social media.</div>
                <div className="social-images">
                    <a target="_blank" href="https://www.twitter.com/">
                        <FontAwesomeIcon icon={faTwitter} className={"footer-pics fa-lg"} />
                    </a>

                    <a target="_blank" href="http://facebook.com">
                        <FontAwesomeIcon icon={faFacebookF} className={"footer-pics fa-lg"} />
                    </a>

                    <a target="_blank" href="https://www.instagram.com/nuevofoundation/">
                        <FontAwesomeIcon icon={faInstagram} className={"footer-pics fa-lg"} />
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/company/nuevofoundation/">
                        <FontAwesomeIcon icon={faLinkedin} className={"footer-pics fa-lg"} />
                    </a>
                </div>
                <div className="App-footer-small">© Copyright 2018, All Rights Reserved by Nuevo Foundation, a 501(c)(3) nonprofit.</div>
            </div>
        );
    }
}

export default Footer;
