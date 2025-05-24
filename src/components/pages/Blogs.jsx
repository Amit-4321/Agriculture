import React, { useState } from 'react';
import { FiSearch, FiArrowRight, FiBookmark, FiShare2 } from 'react-icons/fi';
import './Blog.css';
import Footer from "./Footer";

function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  // const [bookmarked, setBookmarked] = useState([]);
  const [openShareId, setOpenShareId] = useState(null);
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Save 60% Water with Drip Irrigation',
      excerpt: 'Learn how this modern technique can help you conserve both water and time...',
      category: 'Irrigation',
      date: 'March 15, 2023',
      image: './images/drip-irrigation.jpg',
      isBookmarked: false
    },
    {
      id: 2,
      title: 'Easy Method to Make Organic Fertilizer',
      excerpt: 'How to make high-quality organic compost at home...',
      category: 'Organic Farming',
      date: 'February 28, 2023',
      image: './images/compost-fertilizer.jpg',
      isBookmarked: false
    },
    {
      id: 3,
      title: 'Farmers Meetup 2023',
      excerpt: 'How to make happy farmers with the good crop...',
      date: 'June 10, 2023',
      location: 'Virtual',
      category: 'Events',
      image: './images/farmers-meetup.jpg',
      isBookmarked: false
    },
  ]);

  const handleBookmark = (id) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, isBookmarked: !article.isBookmarked } 
        : article
    ));
  };

  const toggleShareDropdown = (id) => {
    setOpenShareId(prevId => (prevId === id ? null : id));
  };

  const generateShareLink = (platform, title) => {
    const encodedTitle = encodeURIComponent(title);
    const url = encodeURIComponent('https://yourwebsite.com/blog');
    
    switch (platform) {
      case 'whatsapp': return `https://wa.me/?text=${encodedTitle} - ${url}`;
      case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedTitle}`;
      case 'gmail': return `mailto:?subject=${encodedTitle}&body=Check out this blog: ${url}`;
      default: return '#';
    }
  };

  const categories = ['All', 'Organic Farming', 'Irrigation', 'Crop Protection', 'Farm Machinery'];

  return (
    <>
      <div className="blog-page">
        {/* Hero Section */}
        <div className="blog-hero">
          <h1>Agri<span className="blog-highlight">Knowledge</span></h1>
          <p>Your trusted source for modern farming techniques</p>
          <div className="blog-search-bar">
            <FiSearch className="blog-search-icon" />
            <input 
              type="text" 
              placeholder="Search (e.g. organic farming, irrigation...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="blog-search-btn">Search</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="blog-container">
          {/* Categories */}
          <div className="blog-category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'blog-active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="blog-articles-grid">
            {articles.map(article => (
              <div key={article.id} className="blog-article-card">
                <div className="blog-card-header">
                  <img src={article.image} alt={article.title} />
                  <span className="blog-category-badge">{article.category}</span>
                  <button 
                    className={`blog-bookmark-btn ${article.isBookmarked ? 'blog-bookmarked' : ''}`}
                    onClick={() => handleBookmark(article.id)}
                  >
                    <FiBookmark />
                  </button>
                </div>
                <div className="blog-card-body">
                  <span className="blog-article-date">{article.date}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                </div>
                <div className="blog-card-footer">
                  <button className="blog-read-more">
                    Read More <FiArrowRight />
                  </button>
                  <div className="blog-share-wrapper">
                    <button
                      className="blog-share-btn"
                      onClick={() => toggleShareDropdown(article.id)}
                    >
                      <FiShare2 /> Share
                    </button>
                    {openShareId === article.id && (
                      <div className="fancy-share-menu">
                        <a
                          href={generateShareLink("whatsapp", article.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-icon whatsapp"
                          title="Share on WhatsApp"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                        <a
                          href={generateShareLink("facebook", article.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-icon facebook"
                          title="Share on Facebook"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          href={generateShareLink("gmail", article.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-icon gmail"
                          title="Share via Gmail"
                        >
                          <i className="far fa-envelope"></i>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="blog-newsletter-card">
            <h3>Get Monthly Agriculture Updates</h3>
            <p>Subscribe to receive the latest information directly in your inbox</p>
            <div className="blog-newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="blog-subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Blog;