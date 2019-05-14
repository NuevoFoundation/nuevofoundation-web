import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Post } from "./components/blog/Post";
import { Footer, Header } from "./components/static/common";
import {
  AboutUs,
  Contact,
  Faq,
  Home,
  SupportUs,
  WhatWeDo
} from "./components/static/pages";
import { VirtualSessions } from "./components/virtualSessions/VirtualSessions";
import { Blog } from "./components/static/pages";
import { Const } from "./Const";
import ReactGA from 'react-ga';
import { AuthContext, memberAuthenticated as memberAuthenticatedContext, memberAuthenticatedName as memberAuthenticatedNameContext } from "./contexts/AuthContext";
import { ServiceResolver } from "./services/ServiceResolver";
import { JwtTokenHelper } from "./helpers/JwtTokenHelper";
import { SessionStorageHelper } from "./helpers/SessionStorageHelper";
import { MemberAccount } from "./components/member/MemberAccount";

interface AppState {
  memberAuthenticated: boolean;
  toggleAuthentication: () => void;
  memberAuthenticatedName: string;
}
class App extends React.Component<{}, AppState> {
  public apiService = new ServiceResolver().ApiService();
  constructor(props: {}) {
    super(props);
    if (Const.GoogleAnalyticsTrackingId && Const.GoogleAnalyticsTrackingId.length > 0) {
      ReactGA.initialize(Const.GoogleAnalyticsTrackingId);
    }

    this.state = {
      memberAuthenticated: memberAuthenticatedContext,
      toggleAuthentication: this.toggleAuthentication,
      memberAuthenticatedName: memberAuthenticatedNameContext
    }
  }

  async componentDidMount() {
    const { memberAuthenticated } = this.state;
    if (!memberAuthenticated) {
      return;
    }
    const memberId = JwtTokenHelper.decodeMemberId(SessionStorageHelper.GetJwt()!.token);
    const member = await this.apiService.getMember(memberId);

    this.setState({
      memberAuthenticatedName: member.fullName!
    })
  }

  toggleAuthentication = async () => {
    let member;
    const memberAuthenticated = this.state.memberAuthenticated;
    if (memberAuthenticated) {
      SessionStorageHelper.DeleteJwt();
    }
    else {
      const memberId = JwtTokenHelper.decodeMemberId(SessionStorageHelper.GetJwt()!.token);
      member = await this.apiService.getMember(memberId);
    }

    this.setState({
      memberAuthenticated: !memberAuthenticated,
      memberAuthenticatedName: member === undefined ? "" : member.fullName!
    })
  };

  public render() {
    return (
      <React.Fragment>
        <AuthContext.Provider value={this.state}>
          <Header />
          <Switch>
            <Route exact={true} path={Const.RootPage} component={Home} />
            <Route exact={true} path={Const.WhatWeDoPage} component={WhatWeDo} />
            <Route path={Const.VirtualSessionPage} component={VirtualSessions} />
            <Route path={Const.MembersAccount} component={MemberAccount} />
            <Route exact={true} path={Const.AboutUsPage} component={AboutUs} />
            <Route
              exact={true}
              path={Const.SupportUsPage}
              component={SupportUs}
            />
            <Route exact={true} path={Const.BlogPage} component={Blog} />
            <Route exact={true} path={Const.BlogPost} component={Post} />
            <Route exact={true} path={Const.FaqPage} component={Faq} />
            <Route exact={true} path={Const.ContactPage} component={Contact} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
          <Footer />
        </AuthContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
