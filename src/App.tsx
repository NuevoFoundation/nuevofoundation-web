import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { AboutUs, Faq, Home, SupportUs, WhatWeDo } from './static/pages';
import { Header } from './static/shared'
import Footer from './static/shared/Footer';


const AppContainer = styled.div`

`
class App extends React.Component {
  public render() {
    return (
      <AppContainer>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/what-we-do" component={WhatWeDo} />
          <Route exact={true} path="/about-us" component={AboutUs} />
          <Route exact={true} path="/support-us" component={SupportUs} />
          <Route exact={true} path="/blog" component={Home} />
          <Route exact={true} path="/faq" component={Faq} />
          {/* <Route component={NoMatch} /> */ }
        </Switch>
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
