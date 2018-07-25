import * as React from 'react';
import './App.css';
import { Home } from './static/pages/Home';
import { Header } from './static/shared'
import Footer from './static/shared/Footer'; 

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
