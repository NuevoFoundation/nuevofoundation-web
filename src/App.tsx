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
  WhatWeDo
} from "./components/static/pages";
import { VirtualSessions } from "./components/virtualSessions/VirtualSessions";
import { Blog } from "./components/static/pages";
import { Const } from "./Const";
import ReactGA from "react-ga";

class App extends React.Component {
  public constructor(props: {}) {
    super(props);
    if (
      Const.GoogleAnalyticsTrackingId &&
      Const.GoogleAnalyticsTrackingId.length > 0
    ) {
      ReactGA.initialize(Const.GoogleAnalyticsTrackingId);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact={true} path={Const.RootPage} component={Home} />
          <Route exact={true} path={Const.WhatWeDoPage} component={WhatWeDo} />
          <Route
            exact={true}
            path={Const.VirtualSessionPage}
            component={VirtualSessions}
          />
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
      </React.Fragment>
    );
  }
}

export default App;
