import React from 'react';
import News from './News';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App glass">
      <Container fluid>
        <News />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
