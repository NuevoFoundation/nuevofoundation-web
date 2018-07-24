import * as React from 'react';
import './App.css';
import { Home } from './static/pages/Home';
import { Footer, Header } from './static/shared'

class App extends React.Component {
  public render() {
    return (
      <div className="">
        <Header />
        <Home />

        <Footer />
      </div>
    );
  }
}

export default App;
