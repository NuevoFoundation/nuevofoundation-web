import * as React from 'react';
import './App.css';
import { WhatWeDo } from './static/pages/WhatWeDo';
import { Footer, Header } from './static/shared'

class App extends React.Component {
  public render() {
    return (
      <div className="">
        <Header />
        <WhatWeDo />
        <Footer />
      </div>
    );
  }
}

export default App;
