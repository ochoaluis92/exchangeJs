import React from 'react';
import './assets/css/App.css';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

// import components
import Header from './components/Header';
import LeftBar from './components/LeftBar';
import Footer from './components/Footer';
import ExchangeBody from './components/ExchangeBody';
// end import components

function App() {
  return (
    <div className="App">
      <section className="components">
        <Header/>
        <Container>
          <Row>
            <br></br>
            <Col md="3">
              <LeftBar/>
            </Col>
            <Col md="9">
              <ExchangeBody/>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </section>
    </div>
  );
}

export default App;
