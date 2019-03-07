import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Elements,StripeProvider} from 'react-stripe-elements'
import styled from 'styled-components';
import './App.css';
import { Post } from './components/blog/Post';
import { Footer, Header } from './components/static/common'
import { AboutUs, Contact, Faq, Home, WhatWeDo } from './components/static/pages';
import { Blog } from './components/static/pages';
import { Const } from './Const';
import SupportUs from './components/static/pages/SupportUs';

const AppContainer = styled.div`

`

class App extends React.Component {
  public render() {
    return (
      <StripeProvider apiKey="pk_test_zDAe9ZWMMWJNCok4C4Kr66hK">
        <AppContainer >
          <Header />
          <Elements>
            <Switch>
              <Route exact={true} path={Const.RootPage} component={Home} />
              <Route exact={true} path={Const.WhatWeDoPage} component={WhatWeDo} />
              <Route exact={true} path={Const.AboutUsPage} component={AboutUs} />
              <Route exact={true} path={Const.SupportUsPage} component={SupportUs} />
              <Route exact={true} path={Const.BlogPage} component={Blog} />
              <Route exact={true} path={Const.BlogPost} component={Post} />
              <Route exact={true} path={Const.FaqPage} component={Faq} />
              <Route exact={true} path={Const.ContactPage} component={Contact} />
              {/* <Route component={NoMatch} /> */ }
            </Switch>
          </Elements>
          <Footer />
        </AppContainer>
      </StripeProvider>
    );
  }
}

export default App;
