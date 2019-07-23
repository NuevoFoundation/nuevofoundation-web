import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Post } from "./components/blog/Post";
import { Footer } from "./components/static/common";
import Header  from "./components/static/common/Header";
import {
  AboutUs,
  Contact,
  Faq,
  Home,
  SupportUs,
  WhatWeDo,
  GetInvolved
} from "./components/static/pages";
import { VirtualSessions } from "./components/virtualSessions/VirtualSessions";
import { Blog } from "./components/static/pages";
import { Const } from "./Const";
import ReactGA from "react-ga";
import "./assets/stylesheets/MobileNav.css";
import { MobileNav } from "./components/static/common/MobileNav";
import styled from "styled-components";

interface IAppState {
  mobileNavVisible: boolean;
}

const AppContainer = styled.div`

`

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    if (
      Const.GoogleAnalyticsTrackingId &&
      Const.GoogleAnalyticsTrackingId.length > 0
    ) {
      ReactGA.initialize(Const.GoogleAnalyticsTrackingId);
    }
    this.state = {
      mobileNavVisible: false
    }
  }

  public handleHamburgerIconClick = () => {
    this.setState({
      mobileNavVisible: !this.state.mobileNavVisible
    });
  };

  public render() {
    const { mobileNavVisible } = this.state;
    return (
      <React.Fragment>
        <MobileNav visible={mobileNavVisible} handleMenuClose={this.handleHamburgerIconClick} />
        <div className={mobileNavVisible ? 'app-brightness' : ''}>
          <AppContainer className={mobileNavVisible ? 'app-blur' : ''} onClick={mobileNavVisible ? this.handleHamburgerIconClick : () => { }}>
            <Header hamburgerMenuOpen={mobileNavVisible} handleHamburgerIconClick={this.handleHamburgerIconClick} />
            <Switch>
              <Route exact={true} path={Const.RootPage} component={Home} />
              <Route exact={true} path={Const.WhatWeDoPage} component={WhatWeDo} />
              <Route exact={true} path={Const.VirtualSessionPage} component={VirtualSessions} />
              <Route exact={true} path={Const.AboutUsPage} component={AboutUs} />
              <Route exact={true} path={Const.SupportUsPage} component={SupportUs} />
              <Route exact={true} path={Const.BlogPage} component={Blog} />
              <Route exact={true} path={Const.BlogPost} component={Post} />
              <Route exact={true} path={Const.FaqPage} component={Faq} />
              <Route exact={true} path={Const.ContactPage} component={Contact} />
              <Route exact={true} path={Const.GetInvolvedPage} component={GetInvolved} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
            <Footer />
          </AppContainer>
        </div>
      </React.Fragment >
    );
  }
}

export default App;
