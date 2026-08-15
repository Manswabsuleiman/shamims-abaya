import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterWithBanner from '../components/Footer';
import WhatsAppFloatingButton from '../components/Float';

const ABAYA_PRICES = [
  { price: 1200, originalPrice: 1400 }, { price: 1500, originalPrice: 1800 },
  { price: 1000, originalPrice: 1500 }, { price: 1000, originalPrice: 1500 },
  { price: 1500, originalPrice: 2200 }, { price: 1500, originalPrice: 2200 },
  { price: 1500, originalPrice: 1700 }, { price: 1500, originalPrice: 1700 },
  { price: 2200, originalPrice: 1900 }, { price: 2200, originalPrice: 1900 },
  { price: 1500, originalPrice: 1900 }, { price: 1500, originalPrice: 1900 },
  { price: 1000, originalPrice: 1200 }, { price: 1000, originalPrice: 1200 },
  { price: 1500, originalPrice: 1800 }, { price: 1500, originalPrice: 1800 },
  { price: 2200, originalPrice: 2600 }, { price: 2200, originalPrice: 2600 },
  { price: 1700, originalPrice: 2000 }, { price: 1700, originalPrice: 2000 },
  { price: 1000, originalPrice: 1300 }, { price: 1000, originalPrice: 1300 },
  { price: 1300, originalPrice: 1600 }, { price: 1300, originalPrice: 1600 },
];

// Images must live in public/Pictures/ — files served from "public" are
// referenced WITHOUT the "public" segment in the URL, so paths start with "/Pictures/...".
const ABAYA_IMAGES = [
  '/Pictures/d23.png',
  '/Pictures/d2.png',
  '/Pictures/d3.png',
  '/Pictures/d4.png',
  '/Pictures/d5.png',
  '/Pictures/d6.png',
  '/Pictures/d7.png',
  '/Pictures/d8.png',
  '/Pictures/d9.png',
  '/Pictures/d10.png',
  '/Pictures/d11.png',
  '/Pictures/d12.png',
  '/Pictures/dress13.png',
  '/Pictures/dress14.png',
  '/Pictures/crop.png',
  '/Pictures/Tops.png',
  '/Pictures/Tops2.png',
  '/Pictures/d15.png',
  '/Pictures/d16.png',
  '/Pictures/d1.png',
  '/Pictures/d17.png',
  '/Pictures/d18.png',
  '/Pictures/d19.png',
  '/Pictures/d20.png',
];

// Custom display names, keyed by product id (1-based, matches "Dress N" default).
// Anything not listed here falls back to `Dress ${id}`.
const ABAYA_NAME_OVERRIDES = {
  15: 'Girlie Tops',
  16: 'Girlie Tops',
  17: 'Girlie Tops',
  23: 'Animal Print',
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .abaya-root {
    font-family: 'DM Sans', sans-serif;
    background: #faf9f7;
    color: #111;
  }

  /* ── BANNER ─────────────────────────────── */
  .banner {
    width: 100%;
    min-height: 500px;
    background: #f5f0ea;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 8%;
    gap: 40px;
    overflow: hidden;
    position: relative;
  }

  .banner-text { flex: 1.2; z-index: 2; min-width: 0; }

  .banner-tag {
    color: #888;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }

  .banner-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
    margin-bottom: 12px;
    color: #111;
    font-weight: 700;
  }

  .banner-title span { color: #2563eb; }

  .banner-subtext {
    color: #666;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    margin-bottom: 25px;
    line-height: 1.4;
  }

  .banner-dots { display: flex; gap: 8px; margin-top: 15px; }

  .banner-dot {
    height: 8px;
    width: 8px;
    border-radius: 4px;
    transition: all 0.35s ease;
    cursor: pointer;
    border: none;
    background: #ccc;
    padding: 0;
  }
  .banner-dot.active { background: #111; width: 24px; }

  .banner-image-wrap {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 450px;
    max-width: 500px;
    margin-top: 40px;
  }

  .banner-image-wrap img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    transition: opacity 0.4s ease;
  }

  /* ── PRODUCT GRID ────────────────────────────────────────────────── */
  .product-section {
    padding: 50px 5% 50px;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 100%;
  }

  .product-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #ececec;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-image-wrap {
    position: relative;
    background: #f5f5f2;
    height: 280px;
    overflow: hidden;
  }

  .card-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .badge-sale {
    position: absolute;
    top: 8px; left: 8px;
    background: #ef4444;
    color: #fff;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 7px;
    z-index: 1;
  }

  .badge-soldout {
    position: absolute;
    top: 8px; left: 8px;
    background: #111;
    color: #fff;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 7px;
    z-index: 1;
  }

  .card-body {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .card-name {
    font-size: 0.9rem;
    color: #222;
    font-weight: 600;
    line-height: 1.2;
  }

  .card-prices { display: flex; align-items: center; gap: 6px; }
  .price-current { font-weight: 700; font-size: 1rem; color: #111; }
  .price-original { font-size: 0.8rem; color: #f87171; text-decoration: line-through; }

  .card-footer {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid #f3f3f3;
    gap: 8px;
  }

  .btn-details {
    flex: 1;
    font-size: 0.75rem;
    color: #111;
    background: #f0f0f0;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 4px;
    text-align: center;
  }

  .btn-cart {
    flex: 1.5;
    font-size: 0.75rem;
    color: #fff;
    background: #111;
    padding: 8px 4px;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-cart:hover { background: #2563eb; }

  .btn-soldout {
    flex: 1.5;
    font-size: 0.75rem;
    color: #fff;
    background: #666;
    padding: 8px 4px;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 1100px) {
    .product-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 820px) {
    .banner { flex-direction: column-reverse; padding: 30px 6%; text-align: center; }
    .banner-image-wrap { height: 240px; margin-top: 0; }
    .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  }

  @media (max-width: 520px) {
    .card-image-wrap { height: 180px; }
    .price-current { font-size: 0.9rem; }
  }
`;

const Abaya = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slides = [
    { tag: "Big Fashion Sale", title: "Limited Time Offer!", discount: "Up to 50% OFF!", subtext: "Redefine Your Everyday Style", image: "/Pictures/canva.png" },
    { tag: "New Arrivals", title: "Elegant Abaya Collection", discount: "Shop the Latest Trends", subtext: "Modern designs for every occasion", image: "/Pictures/canva2.png" },
    { tag: "Summer Essentials", title: "Fresh New Looks", discount: "Flat 20% Discount", subtext: "Comfort meets style this season", image: "/Pictures/canva3.png" }
  ];

  const abayas = Array.from({ length: 24 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      image: ABAYA_IMAGES[i] || '/Pictures/placeholder.png',
      name: ABAYA_NAME_OVERRIDES[id] || `Dress ${id}`,
      price: ABAYA_PRICES[i] ? ABAYA_PRICES[i].price : 1500,
      originalPrice: ABAYA_PRICES[i] ? ABAYA_PRICES[i].originalPrice : 1800,
      liked: false,
      soldOut: i >= 4 && i <= 15,
    };
  });

  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState(abayas);
  const [timeLeft, setTimeLeft] = useState({ h: 8, m: 17, s: 56 });

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slider);
  }, [slides.length]);

  return (
    <div className="abaya-root">
      <style>{styles}</style>

      {/* Hero Banner Section */}
      <div className="banner">
        <div className="banner-text">
          <p className="banner-tag">{slides[current].tag}</p>
          <h1 className="banner-title">
            {slides[current].title} <br />
            <span>{slides[current].discount}</span>
          </h1>
          <p className="banner-subtext">{slides[current].subtext}</p>
          <div className="banner-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`banner-dot ${index === current ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
        <div className="banner-image-wrap">
          <img src={slides[current].image} alt="Landing Showcase Slide" />
        </div>
      </div>

      {/* Main Grid Product List Catalog */}
      <div className="product-section">
        <div className="product-grid">
          {products.map((abaya) => (
            <div key={abaya.id} className="product-card">
              <div className="card-image-wrap">
                {abaya.soldOut ? (
                  <span className="badge-soldout">OUT OF STOCK</span>
                ) : (
                  <span className="badge-sale">SALE</span>
                )}
                <img src={abaya.image} alt={abaya.name} />
              </div>
              <div className="card-body">
                <h3 className="card-name">{abaya.name}</h3>
