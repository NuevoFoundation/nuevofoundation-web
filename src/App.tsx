import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { Const } from './Const';
import { AboutUs, Contact, Faq, Home, SupportUs, WhatWeDo } from './static/pages';
import { Header } from './static/shared'
import Footer from './static/shared/Footer';


const AppContainer = styled.div`

`

class App extends React.Component {
  public render() {
    return (
      <AppContainer >
        <Header />
        <Switch>
          <Route exact={true} path={Const.RootPage} component={Home} />
          <Route exact={true} path={Const.WhatWeDoPage} component={WhatWeDo} />
          <Route exact={true} path={Const.AboutUsPage} component={AboutUs} />
          <Route exact={true} path={Const.SupportUsPage} component={SupportUs} />
          <Route exact={true} path={Const.BlogPage} component={Home} />
          <Route exact={true} path={Const.FaqPage} component={Faq} />
          <Route exact={true} path={Const.ContactPage} component={Contact} />
          {/* <Route component={NoMatch} /> */ }
        </Switch>
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
