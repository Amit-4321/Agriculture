import React, { useState } from "react";
import './Contact.css';
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errors.name');
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = t('contact.errors.email');
    if (!formData.subject.trim()) newErrors.subject = t('contact.errors.subject');
    if (!formData.message.trim()) newErrors.message = t('contact.errors.message');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form Data:', formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } catch (error) {
        alert(t("contact.errors.submit"));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
    <div className="contact-page">
      <h1>{t("contact.title")}</h1>
      <p>{t("contact.subtitle")}</p>
      
      {isSubmitted ? (
        <div className="success-message">
          {t("contact.success")}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder={t("contact.form.name")}
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t("contact.form.email")}
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder={t("contact.form.subject")}
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error-input' : ''}
            />
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>
          
          <div className="form-group">
            <textarea
              name="message"
              placeholder={t("contact.form.message")}
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error-input' : ''}
              rows="5"
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
          </button>
        </form>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Contact;
