import React, { useState, useEffect } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import './News.css'
const News = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Assuming newsapi.json is in the public folder
      const response = await fetch('/newsapi.json');
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-center mb-4">
          <Col xs={6}>
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {filteredNews.map((article) => (
            <Col key={article.url} xs={12} lg={6} className="mb-4">
              <div className="card">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default News;
