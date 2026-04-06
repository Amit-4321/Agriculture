import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Form, Button } from "react-bootstrap";
import './Agriculturist.css';
import { useTranslation } from "react-i18next";

const agriculturists = [
  // ... existing data remains unchanged
];

const Agriculturists = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    specialization: "",
    experience: "",
    email: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const sliderRef = useRef(null);
  const videoRefs = useRef([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t("agriculturists.success_message"));
    setFormData({ name: "", location: "", specialization: "", experience: "", email: "" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (agriculturists.length - 3));
    }, 3000);

    return () => clearInterval(interval);
  }, [agriculturists.length]);

  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 0;
      sliderRef.current.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
  }, [currentSlide]);

  const hindiVideos = [
    {
      title: t("agriculturists.video1"),
      url: "https://www.youtube.com/embed/RsTsad3LngY"
    },
    {
      title: t("agriculturists.video2"),
      url: "https://www.youtube.com/embed/gCC2iqoT6uA"
    },
    {
      title: t("agriculturists.video3"),
      url: "https://www.youtube.com/embed/ywi-y5Zwmjc"
    }
  ];

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  const handleVideoClick = (index) => {
    videoRefs.current.forEach((player, i) => {
      if (i !== index && player && player.pauseVideo) {
        player.pauseVideo();
      }
    });
    setActiveVideo(index);
  };

  const onPlayerReady = (event, index) => {
    videoRefs.current[index] = event.target;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{t("agriculturists.meet_experts")}</h2>

      <div className="slider-container">
        <div className="slider-track" ref={sliderRef}>
          {agriculturists.map((agri, index) => (
            <div key={index} className="slider-card">
              <Card className="agri-card text-center">
                <CardBody>
                  <img src={agri.image} alt={agri.name} className="agri-img" />
                  <h5 className="mt-2">{agri.name}</h5>
                  <p><strong>{t("agriculturists.place")}:</strong> {agri.location}</p>
                  <p><strong>{t("agriculturists.specialization")}:</strong> {agriculturists.specialization}</p>
                  <p><strong>{t("agriculturists.experience")}:</strong> {agriculturists.experience}</p>
                  <p>{agriculturists.email}</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center text-success mb-4">{t("agriculturists.video_section_title")}</h3>
        <div className="row">
          {hindiVideos.map((video, index) => (
            <div key={index} className="col-md-4 mb-4">
              <h5 className="text-center">{video.title}</h5>
              <div
                onClick={() => handleVideoClick(index)}
                style={{
                  cursor: 'pointer',
                  border: activeVideo === index ? '3px solid green' : '1px solid #ccc',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <iframe
                  id={`youtube-player-${index}`}
                  width="100%"
                  height="250"
                  src={`${video.url}?enablejsapi=1&origin=${window.location.origin}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={(e) => {
                    if (window.YT) {
                      new window.YT.Player(e.target, {
                        events: {
                          'onReady': (event) => onPlayerReady(event, index)
                        }
                      });
                    }
                  }}
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="enroll-form mt-5 ">
  <h3 className="text-center text-success">{t("agriculturists.enroll_title")}</h3>
  <Form onSubmit={handleSubmit} className="form-container">
    <Form.Group className="mb-4">
      {/* <Form.Label>{t("agriculturists.name")}</Form.Label> */}
      <Form.Control
        type="text"
        name="name"
        placeholder={t("agriculturists.placeholders.name")}
        value={formData.name}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-4">
      {/* <Form.Label>{t("agriculturists.location")}</Form.Label> */}
      <Form.Control
        type="text"
        name="location"
        placeholder={t("agriculturists.placeholders.location")}
        value={formData.location}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-4">
      {/* <Form.Label>{t("agriculturists.quality")}</Form.Label> */}
      <Form.Control
        type="text"
        name="specialization"
        placeholder={t("agriculturists.placeholders.specialization")}
        value={formData.specialization}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-4">
      {/* <Form.Label>{t("agriculturists.experience_years")}</Form.Label> */}
      <Form.Control
        type="number"
        name="experience"
        placeholder={t("agriculturists.placeholders.experience")}
        value={formData.experience}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-4">
      {/* <Form.Label>{t("agriculturists.email")}</Form.Label> */}
      <Form.Control
        type="email"
        name="email"
        placeholder={t("agriculturists.placeholders.email")}
        value={formData.email}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Button variant="success" type="submit" className="mt-3 w-100">
      {t("agriculturists.submit")}
    </Button>
  </Form>
</div>

    </div>
  );
};

export default Agriculturists;
