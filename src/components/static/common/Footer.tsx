import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import "../../../assets/stylesheets/Footer.css";

export class Footer extends React.Component {
  public render() {
    return (
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <div className="App-footer">
                <div className="App-footer-big">
                  Join the conversation on social media.
                </div>
                <div className="social-images">
                  <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/nuevofoundation"
                      className={"footer-pics"}
                  >
                    <FontAwesomeIcon icon={faInstagram} className={"fa-2x"} />
                  </a>
                  <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://twitter.com/nuevofoundation"
                      className={"footer-pics"}
                  >
                    <FontAwesomeIcon icon={faTwitter} className={"fa-2x"} />
                  </a>

                  <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/NuevoFoundation"
                      className={"footer-pics"}
                  >
                    <FontAwesomeIcon icon={faFacebookF} className={"fa-2x"} />
                  </a>
                  <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/company/nuevofoundation"
                      className={"footer-pics"}
                  >
                    <FontAwesomeIcon icon={faLinkedin} className={"fa-2x"} />
                  </a>

                  <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.youtube.com/nuevofoundation?sub_confirmation=1"
                      className={"footer-pics"}
                  >
                    <FontAwesomeIcon icon={faYoutube} className={"fa-2x"} />
                  </a>
                                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://github.com/NuevoFoundation"
                      className={"footer-pics"}
                  >
                    <FontAwesomeIcon icon={faGithub} className={"fa-2x"} />
                  </a>
                </div>
                <div className="App-footer-small">
                  © Copyright {new Date().getFullYear()}, All Rights Reserved by
                  Nuevo Foundation, a 501(c)(3) nonprofit.
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
    );
  }
}
