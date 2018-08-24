import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { AboutUs, Faq, Home, SupportUs, WhatWeDo } from './static/pages';
import { Header } from './static/shared'
import Footer from './static/shared/Footer';


const AppContainer = styled.div`

`
//hello
class App extends React.Component {
  public render() {
    return (
      <AppContainer>
        <Header />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/what-we-do" component={WhatWeDo} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/support-us" component={SupportUs} />
          <Route path="/blog" component={Home} />
          <Route path="/faq" component={Faq} />
          {/* <Route component={NoMatch} /> */ }
        </Switch>
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
