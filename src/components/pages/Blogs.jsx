import React, { useState } from 'react';
import { FiSearch, FiArrowRight, FiBookmark, FiShare2, FiX } from 'react-icons/fi';
import './Blog.css';
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import OrganicBlog from './OrganicBlog';
import IrrigationBlog from './IrrigationBlog';
import CropProtection from './CropProtection';
import FarmMachineryBlog from './FarmMachineryBlog';
import EventsBlog from './EventsBlog';

function Blog() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState("all");
  const [openShareId, setOpenShareId] = useState(null);
  const [readMoreMap, setReadMoreMap] = useState({});

  const [articles, setArticles] = useState([
    {
      id: "1",
      title: t("blog.article1.title"),
      excerpt: t("blog.article1.excerpt"),
      content: t("blog.article1.content"),
      category: "irrigation",
      date: "March 15, 2023",
      image: './images/drip-irrigation.jpg',
      isBookmarked: false
    },
    {
      id: "2",
      title: t("blog.article2.title"),
      excerpt: t("blog.article2.excerpt"),
      content: t("blog.article2.content"),
      category: "organic",
      date: "February 28, 2023",
      image: './images/compost-fertilizer.jpg',
      isBookmarked: false
    },
    {
      id: "3",
      title: t("blog.article3.title"),
      excerpt: t("blog.article3.excerpt"),
      content: t("blog.article3.content"),
      category: "events",
      date: "June 10, 2023",
      image: './images/farmers-meetup.jpg',
      isBookmarked: false
    }
  ]);

  const handleBookmark = (id) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
      )
    );
  };

  const toggleReadMore = (id) => {
    setReadMoreMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleShareDropdown = (id) => {
    setOpenShareId(prev => (prev === id ? null : id));
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

  const categories = [
    { key: "all", label: t("blog.categories.all") },
    { key: "organic", label: t("blog.categories.organic") },
    { key: "irrigation", label: t("blog.categories.irrigation") },
    { key: "protection", label: t("blog.categories.protection") },
    { key: "machinery", label: t("blog.categories.machinery") },
    { key: "events", label: t("blog.categories.events") }
  ];

  // Filter articles based on both category and search query
  const filteredArticles = articles
    .filter(article => 
      activeCategory === "all" || article.category === activeCategory
    )
    .filter(article => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    });

  return (
    <>
      <div className="blog-page">
        <div className="blog-hero">
          <h1>{t("blog.hero_title")}</h1>
          <p>{t("blog.hero_subtitle")}</p>
          <div className="blog-search-bar">
            <FiSearch className="blog-search-icon" />
            <input
              type="text"
              placeholder={t("blog.search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
            />
            {searchQuery && (
              <button 
                className="blog-clear-search" 
                onClick={() => setSearchQuery('')}
              >
                <FiX />
              </button>
            )}
            <button className="blog-search-btn">{t("blog.search_button")}</button>
          </div>
        </div>

        <div className="blog-container">
          <div className="blog-category-tabs">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={activeCategory === cat.key ? 'blog-active' : ''}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setSearchQuery('');
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="blog-articles-grid">
  {activeCategory === "all" && filteredArticles.length > 0 ? (
    filteredArticles.map(article => (
      <div key={article.id} className="blog-article-card">
        <div className="blog-card-header">
          <img src={article.image} alt={article.title} />
          <span className="blog-category-badge">{t(`blog.categories.${article.category}`)}</span>
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
          {!readMoreMap[article.id] ? (
            <p className='blog-excerpt'>{article.excerpt}</p>
          ) : (
            <p className='blog-full-content'>
              {article.excerpt} <br /> {article.content}
            </p>
          )}
        </div>
        <div className="blog-card-footer">
          <button className="blog-read-more" onClick={() => toggleReadMore(article.id)}>
            {readMoreMap[article.id] ? t("blog.read_less") : t("blog.read_more")} <FiArrowRight />
          </button>
          <div className="blog-share-wrapper">
            <button className="blog-share-btn" onClick={() => toggleShareDropdown(article.id)}>
              <FiShare2 /> {t("blog.share")}
            </button>
            {openShareId === article.id && (
              <div className="fancy-share-menu">
                <a href={generateShareLink("whatsapp", article.title)} target="_blank" rel="noreferrer" className="share-icon whatsapp">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href={generateShareLink("facebook", article.title)} target="_blank" rel="noreferrer" className="share-icon facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href={generateShareLink("gmail", article.title)} target="_blank" rel="noreferrer" className="share-icon gmail">
                  <i className="far fa-envelope"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    ))
  ) : activeCategory === "all" && filteredArticles.length === 0 ? (
    <div className="blog-no-results">
      <p>{t("blog.no_results")}</p>
    </div>
  ) : null}
</div>

          {/* Sectional Blog Components Rendered Below */}
          {activeCategory === "organic" && (
            <OrganicBlog
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              openShareId={openShareId}
              setOpenShareId={setOpenShareId}
              handleBookmark={handleBookmark}
              generateShareLink={generateShareLink}

            />
          )}

          {activeCategory === "irrigation" && (
            <IrrigationBlog
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              openShareId={openShareId}
              setOpenShareId={setOpenShareId}
              handleBookmark={handleBookmark}
              generateShareLink={generateShareLink}
            />
          )}

          {activeCategory === "protection" && (
            <CropProtection
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              openShareId={openShareId}
              setOpenShareId={setOpenShareId}
              handleBookmark={handleBookmark}
              generateShareLink={generateShareLink}
              bookmarkedArticles={articles.filter(article => article.isBookmarked)}
            />
          )}

          {activeCategory === "machinery" && (
            <FarmMachineryBlog
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              openShareId={openShareId}
              setOpenShareId={setOpenShareId}
              handleBookmark={handleBookmark}
              generateShareLink={generateShareLink}
              bookmarkedArticles={articles.filter(article => article.isBookmarked)}
            />
          )}

          {activeCategory === "events" && (
            <EventsBlog
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              openShareId={openShareId}
              setOpenShareId={setOpenShareId}
              generateShareLink={generateShareLink}
            />
          )}

          <div className="blog-newsletter-card">
            <h3>{t("blog.newsletter_title")}</h3>
            <p>{t("blog.newsletter_subtitle")}</p>
            <div className="blog-newsletter-form">
              <input type="email" placeholder={t("blog.newsletter_placeholder")} />
              <button className="blog-subscribe-btn">{t("blog.subscribe")}</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Blog;