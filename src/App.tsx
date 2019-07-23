import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Post } from "./components/blog/Post";
import { Footer } from "./components/static/common";
import Header from "./components/static/common/Header";
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
import {
  AuthContext,
  memberAuthenticated as memberAuthenticatedContext,
  memberAuthenticatedName as memberAuthenticatedNameContext
} from "./contexts/AuthContext";
import { ServiceResolver } from "./services/ServiceResolver";
import { JwtTokenHelper } from "./helpers/JwtTokenHelper";
import { SessionStorageHelper } from "./helpers/SessionStorageHelper";
import { MemberAccount } from "./components/member/MemberAccount";
import { MobileNav } from "./components/static/common/MobileNav";
import styled from "styled-components";
import "./assets/stylesheets/MobileNav.css";

interface AppState {
  memberAuthenticated: boolean;
  toggleAuthentication: () => void;
  memberAuthenticatedName: string;
  mobileNavVisible: boolean;
}

const AppContainer = styled.div`

`
class App extends React.Component<{}, AppState> {
  public apiService = new ServiceResolver().ApiService();
  public constructor(props: {}) {
    super(props);
    if (
      Const.GoogleAnalyticsTrackingId &&
      Const.GoogleAnalyticsTrackingId.length > 0
    ) {
      ReactGA.initialize(Const.GoogleAnalyticsTrackingId);
    }

    this.state = {
      memberAuthenticated: memberAuthenticatedContext,
      toggleAuthentication: this.toggleAuthentication,
      memberAuthenticatedName: memberAuthenticatedNameContext,
      mobileNavVisible: false
    };
  }

  public async componentDidMount() {
    const { memberAuthenticated } = this.state;
    if (!memberAuthenticated) {
      return;
    }
    const memberId = JwtTokenHelper.decodeMemberId(
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      SessionStorageHelper.GetJwt()!.token
    );
    const member = await this.apiService.getMember(memberId);

    this.setState({
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      memberAuthenticatedName: member.fullName!
    });
  }

  public toggleAuthentication = async () => {
    let member;
    const memberAuthenticated = this.state.memberAuthenticated;
    if (memberAuthenticated) {
      SessionStorageHelper.DeleteJwt();
    } else {
      const memberId = JwtTokenHelper.decodeMemberId(
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        SessionStorageHelper.GetJwt()!.token
      );
      member = await this.apiService.getMember(memberId);
    }

    this.setState({
      memberAuthenticated: !memberAuthenticated,
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      memberAuthenticatedName: member === undefined ? "" : member.fullName!
    });
  };

  public handleHamburgerIconClick = () => {
    this.setState({
      mobileNavVisible: !this.state.mobileNavVisible
    });
  };


  public render() {
    const { mobileNavVisible } = this.state;
    return (
      <React.Fragment>
        <AuthContext.Provider value={this.state}>
          <MobileNav visible={mobileNavVisible} handleMenuClose={this.handleHamburgerIconClick} />
          <div className={mobileNavVisible ? 'app-brightness' : ''}>
            <AppContainer className={mobileNavVisible ? 'app-blur' : ''} onClick={mobileNavVisible ? this.handleHamburgerIconClick : () => { }}>
              <Header hamburgerMenuOpen={mobileNavVisible} handleHamburgerIconClick={this.handleHamburgerIconClick} />
              <Switch>
                <Route exact={true} path={Const.RootPage} component={Home} />
                <Route exact={true} path={Const.WhatWeDoPage} component={WhatWeDo} />
                <Route path={Const.VirtualSessionPage} component={VirtualSessions} />
                <Route path={Const.MembersAccount} component={MemberAccount} />
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
        </AuthContext.Provider>
      </React.Fragment >
    );
  }
}

export default App;
