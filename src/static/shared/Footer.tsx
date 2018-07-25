import * as React from 'react';
// import '../../App.css'
import './Footer.css';

// https://www.iconfinder.com/iconsets/social-media-2198 (icons) 

import facebook from './socialMediaIcons/fb.png';  
import insta from './socialMediaIcons/insta.png'; 
import linkedin from './socialMediaIcons/linkedin.png'; 
import twitter from './socialMediaIcons/twitter.png'; 
// import { link } from 'fs';




class Footer extends React.Component {
  public render() {
    return (
        <div className="App-footer"> 
            <div className="App-footer-big"> Join the conversation on social media </div>
                <div className="social-images">
                <a target="_blank" href="https://www.twitter.com/">
                        <img src={twitter} className="footer-pics" alt="twitterlogo" />
                </a>

                <a target="_blank" href="http://facebook.com">
                    <img src={facebook} className="footer-pics" alt="fblogo" />
                </a> 

                <a target="_blank" href="https://www.instagram.com/nuevofoundation/">
                    <img src={insta} className="footer-pics" alt="instalogo" />
                </a>
                <a target="_blank" href="https://www.linkedin.com/company/nuevofoundation/">
                    <img src={linkedin} className="footer-pics" alt="linkedinlogo" />
                </a>

                </div>
            <div className="App-footer-small">© Copyright 2018, All Rights Reserved by Nuevo Foundation, a 501﴾c﴿﴾3﴿ nonprofit.</div>
         </div> 
    );
  }
}

export default Footer;
