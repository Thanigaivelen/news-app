import React from 'react';
import News from './News';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { NewsProvider } from './NewsContext'; // Import the NewsProvider

function App() {
  return (
    <NewsProvider>
      <div className="App glass">
        <Container fluid>
          <News />
        </Container>
        <Footer />
      </div>
    </NewsProvider>
  );
}

export default App;
