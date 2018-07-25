import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { Home } from './static/pages/Home';
import { WhatWeDo } from './static/pages/WhatWeDo';
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
          <Route path="/" component={Home} />
          <Route path="/what-we-do" component={WhatWeDo} />
          <Route path="/about-us" component={Home} />
          <Route path="/support-us" component={Home} />
          <Route path="/blog" component={Home} />
          <Route path="/faq" component={Home} />
          {/* <Route component={NoMatch} /> */ }
        </Switch>
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
