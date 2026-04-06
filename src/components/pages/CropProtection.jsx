import React, { useState } from 'react';
import { FiArrowRight, FiBookmark, FiShare2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

function CropProtection({ activeCategory, openShareId, setOpenShareId, generateShareLink, searchQuery }) {
  const { t } = useTranslation();
  const [readMoreMap, setReadMoreMap] = useState({});
  const [articles, setArticles] = useState([
    {
      id: 301,
      titleKey: "cropProtection.cards.0.title",
      shortKey: "cropProtection.cards.0.short",
      contentKey: "cropProtection.cards.0.content",
      image: "farmer-crop-protection.jpg",
      dateKey: "cropProtection.cards.0.date",
      isBookmarked: false
    },
    {
      id: 302,
      titleKey: "cropProtection.cards.1.title",
      shortKey: "cropProtection.cards.1.short",
      contentKey: "cropProtection.cards.1.content",
      image: "hagie-sprayer-2.jpg",
      dateKey: "cropProtection.cards.1.date",
      isBookmarked: false
    },
    {
      id: 303,
      titleKey: "cropProtection.cards.2.title",
      shortKey: "cropProtection.cards.2.short",
      contentKey: "cropProtection.cards.2.content",
      image: "john-deere-sprayer.jpg",
      dateKey: "cropProtection.cards.2.date",
      isBookmarked: false
    }
  ]);

  // ✅ Use correct category key: 'protection' instead of 'cropProtection'
  if (activeCategory !== 'protection' && activeCategory !== 'all') return null;

  const toggleReadMore = (id) => {
    setReadMoreMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShareDropdown = (id) => {
    setOpenShareId(prev => (prev === id ? null : id));
  };

  const handleBookmark = (id) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
      )
    );
  };

 // ✅ Filtered articles based on searchQuery
 const filteredArticles = articles.filter(article => {
  if (!searchQuery || searchQuery.trim() === '') return true;
  const query = searchQuery.toLowerCase();
  return (
    (t(article.titleKey) || '').toLowerCase().includes(query) ||
    (t(article.shortKey) || '').toLowerCase().includes(query) ||
    (t(article.contentKey) || '').toLowerCase().includes(query)
  );
});


  return (
    <div className="blog-articles-grid">
      {filteredArticles.map(article => (
        <div className="blog-article-card" key={article.id}>
          <div className="blog-card-header">
            <img src={article.image} alt={t(article.titleKey)} />
            <span className="blog-category-badge">{t("cropProtection.category")}</span>
            <button
              className={`blog-bookmark-btn ${article.isBookmarked ? 'blog-bookmarked' : ''}`}
              onClick={() => handleBookmark(article.id)}
            >
              <FiBookmark />
            </button>
          </div>

          <div className="blog-card-body">
            <span className="blog-article-date">{t(article.dateKey)}</span>
            <h3>{t(article.titleKey)}</h3>
            {!readMoreMap[article.id] ? (
              <p className='blog-excerpt'>{t(article.shortKey)}</p>
            ) : (
              <p className='blog-full-content'>
                {t(article.shortKey)} <br /> {t(article.contentKey)}
              </p>
            )}
          </div>

          <div className="blog-card-footer">
            <button
              className="blog-read-more"
              onClick={() => toggleReadMore(article.id)}
            >
              {readMoreMap[article.id] ? t("cropProtection.read_less") : t("cropProtection.read_more")}
              <FiArrowRight />
            </button>

            <div className="blog-share-wrapper">
              <button
                className="blog-share-btn"
                onClick={() => toggleShareDropdown(article.id)}
              >
                <FiShare2 /> {t("cropProtection.share")}
              </button>
              {openShareId === article.id && (
                <div className="fancy-share-menu">
                  <a
                    href={generateShareLink("whatsapp", t(article.titleKey))}
                    target="_blank"
                    rel="noreferrer"
                    className="share-icon whatsapp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a
                    href={generateShareLink("facebook", t(article.titleKey))}
                    target="_blank"
                    rel="noreferrer"
                    className="share-icon facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href={generateShareLink("gmail", t(article.titleKey))}
                    target="_blank"
                    rel="noreferrer"
                    className="share-icon gmail"
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
  );
}

export default CropProtection;
