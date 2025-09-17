import * as React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Post } from "./components/blog/Post";
import { Footer } from "./components/static/common";
import Header from "./components/static/common/Header";
import {
  AboutUs,
  Contact,
  Home,
  SupportUs,
  WhatWeDo,
  GetInvolved,
  ComingSoon
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
              <React.Fragment>
                <Header hamburgerMenuOpen={mobileNavVisible} handleHamburgerIconClick={this.handleHamburgerIconClick} />
                <Routes>
                  <Route path={Const.RootPage} element={<Home />} />
                  <Route path={Const.WhatWeDoPage} element={<WhatWeDo />} />
                  <Route path={Const.VirtualSessionPage} element={<VirtualSessions />} />
                  <Route path={Const.MembersAccount} element={<MemberAccount />} />
                  <Route path={Const.AboutUsPage} element={<AboutUs />} />
                  <Route path={Const.SupportUsPage} element={<SupportUs />} />
                  <Route path={Const.BlogPage} element={<Blog />} />
                  <Route path={Const.BlogPost} element={<Post />} />
                  <Route path={Const.ContactPage} element={<Contact />} />
                  <Route path={Const.GetInvolvedPage} element={<GetInvolved />} />
                  <Route path={Const.ComingSoonPage} element={<ComingSoon />} />
                </Routes>
                <Footer />
              </React.Fragment>
            </AppContainer>
          </div>
        </AuthContext.Provider>
      </React.Fragment >
    );
  }
}

export default App;
