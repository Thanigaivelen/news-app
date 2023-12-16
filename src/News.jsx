import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
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
// const fetchNews = async () => {
//   try {
//     const response = await axios.get(
//       `https://newsapi.org/v2/top-headlines?country=in&apiKey=ab9e11847a9a42d1985ddf6a3ed52bdc`
//     );
//     setNews(response.data.articles);
//   } catch (error) {
//     console.error(error);
//   }
// };



  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
     <div className='header'>
        <h1 className='heading'>NEWS APP</h1>
        <NewspaperIcon/>
      </div>
      <Container className="mt-5">
        <Row className="justify-content-center mb-4">
          <Col xs={6}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
              <SearchIcon className="search-icon" />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {filteredNews.map((article) => (
            <Col key={article.url} xs={12} lg={6} className="mb-4">
              {/* Wrap the card with an anchor tag */}
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
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
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default News;
