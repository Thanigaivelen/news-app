import React, { useEffect,useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Col, Container, Row } from 'react-bootstrap';
import './News.css';
import { useNewsContext, ACTIONS } from './NewsContext'; // Import the context and actions

const News = () => {
  const { state, dispatch } = useNewsContext();
  const { news, searchTerm } = state;
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  const fetchNews = async () => {
    try {
      const response = await fetch('/newsapi.json');
      const data = await response.json();
      dispatch({ type: ACTIONS.SET_NEWS, payload: data.articles });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, );


  const handleSearch = (e) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: e.target.value });
  };
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };
    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = news
      .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(indexOfFirstItem, indexOfLastItem);
  
    // Logic to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const filteredNews = news.filter((article) =>
  //   article.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <div className='header'>
        <h1 className='heading'>NEWS APP</h1>
        <NewspaperIcon />
      </div>
      <Container className="mt-5">
        <Row className="justify-content-center mb-4">
          <Col xs={6}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                className="search-bar"
              />
              <SearchIcon className="search-icon" />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <h1 className='latest'>Latest News</h1>
          {currentItems.map((article) => (
            <Col key={article.url} xs={12} lg={4} md={6} className="mb-4">
              <div className="card" onClick={()=>handleArticleClick(article)}>
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a className='card-text' href={article.url} target="_blank" rel="noopener noreferrer" >
                    <span>Show More →</span>
                  </a>
                </div>
              </div>
              
            </Col>
          ))}
          {selectedArticle && (
          <div className="custom-modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>&times;</span>
                <img
                  src={selectedArticle.urlToImage}
                  alt={selectedArticle.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{selectedArticle.title}</h5>
                  <p className="card-text">{selectedArticle.description}</p>
                  <a className='card-text' href={selectedArticle.url} target="_blank" rel="noopener noreferrer" >
                    <span>Show More →</span>
                  </a>
                </div>
              </div>
              </div>
          )}
        </Row>
      </Container>
      <div className="pagination">
        <ul>
          {[...Array(Math.ceil(news.length / itemsPerPage))].map((_, index) => (
            <li key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
};

export default News;
