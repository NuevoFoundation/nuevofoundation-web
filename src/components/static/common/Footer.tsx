import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
  faSpotify,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "../../../assets/stylesheets/Footer.css";

export class Footer extends React.Component {
  public render() {
    return (
      <div className="App-footer">
        <div className="App-footer-big">
          Join the conversation on social media.
        </div>
        <div className="social-images">
          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/nuevofoundation"
              aria-label="Nuevo Foundation on Instagram"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faInstagram} className={"fa-2x"} />
          </a>
          
          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/nuevofoundation"
              aria-label="Nuevo Foundation on X (Twitter)"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faXTwitter} className={"fa-2x"} />
          </a>

          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/NuevoFoundation"
              aria-label="Nuevo Foundation on Facebook"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faFacebookF} className={"fa-2x"} />
          </a>
          
          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/nuevofoundation"
              aria-label="Nuevo Foundation on LinkedIn"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faLinkedin} className={"fa-2x"} />
          </a>

          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/nuevofoundation?sub_confirmation=1"
              aria-label="Nuevo Foundation on YouTube"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faYoutube} className={"fa-2x"} />
          </a>
          
          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://open.spotify.com/playlist/0uQ8AwLs4SIpY4A4G52pTB?si=e30542420a8c40b1"
              aria-label="Nuevo Foundation's Spotify playlist"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faSpotify} className={"fa-2x"} />
          </a>
          
          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/NuevoFoundation"
              aria-label="Nuevo Foundation on GitHub"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faGithub} className={"fa-2x"} />
          </a>

          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.stickermule.com/nuevofoundation"
              aria-label="Nuevo Foundation sticker store"
              className={"footer-pics"}
          >
            <FontAwesomeIcon icon={faStore} className={"fa-2x"} />
          </a>
          
        </div>
        <div className="App-footer-small">
          © Copyright {new Date().getFullYear()}, All Rights Reserved by
          Nuevo Foundation, a 501(c)(3) nonprofit.
        </div>
      </div>
    );
  }
}
