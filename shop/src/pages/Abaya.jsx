import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterWithBanner from '../components/Footer';
import WhatsAppFloatingButton from '../components/Float';

const ABAYA_PRICES = [
  { price: 2800, originalPrice: 3500 }, { price: 3300, originalPrice: 4300 },
  { price: 2500, originalPrice: 3700 }, { price: 2700, originalPrice: 3000 },
  { price: 2500, originalPrice: 2999 }, { price: 4000, originalPrice: 4300 },
  { price: 2300, originalPrice: 2700 }, { price: 3100, originalPrice: 2700 },
  { price: 2200, originalPrice: 1900 }, { price: 1700, originalPrice: 2000 },
  { price: 3000, originalPrice: 3500 }, { price: 2800, originalPrice: 3300 },
  { price: 1700, originalPrice: 2300 }, { price: 2700, originalPrice: 2300 },
  { price: 3300, originalPrice: 4300 }, { price: 3100, originalPrice: 2800 },
  { price: 2200, originalPrice: 2600 }, { price: 2200, originalPrice: 2700 },
  { price: 2500, originalPrice: 2800 }, { price: 2500, originalPrice: 2850 },
  { price: 3800, originalPrice: 4300 }, { price: 2300, originalPrice: 2700 },
  { price: 2800, originalPrice: 3300 }, { price: 3000, originalPrice: 3600 },
];

const ABAYA_IMAGES = Array.from({ length: 23 }, (_, i) => `public/Pictures/Abbaya${i + 1}.png`);
ABAYA_IMAGES.push(`public/Pictures/i24.png`);

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

  .banner-dots { display: flex; gap: 8px; }

  .banner-dot {
    height: 8px;
    border-radius: 4px;
    transition: all 0.35s ease;
    cursor: pointer;
    border: none;
    background: #ccc;
    padding: 0;
  }
  .banner-dot.active { background: #111; }

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
    padding: 0 5% 50px;
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
    background: #111;
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
    { tag: "Big Fashion Sale", title: "Limited Time Offer!", discount: "Up to 50% OFF!", subtext: "Redefine Your Everyday Style", image: "public/Pictures/canva.png" },
    { tag: "New Arrivals", title: "Elegant Abaya Collection", discount: "Shop the Latest Trends", subtext: "Modern designs for every occasion", image: "public/Pictures/canva2.png" },
    { tag: "Summer Essentials", title: "Fresh New Looks", discount: "Flat 20% Discount", subtext: "Comfort meets style this season", image: "public/Pictures/canva3.png" }
  ];

  const abayas = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    image: ABAYA_IMAGES[i],
    name: `Abaya Style ${i + 1}`,
    price: ABAYA_PRICES[i].price,
    originalPrice: ABAYA_PRICES[i].originalPrice,
    liked: false,
    soldOut: i >= 4 && i <= 15,
  }));

  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState(abayas);
  const [timeLeft, setTimeLeft] = useState({ h: 8, m: 17, s: 56 });

  useEffect(() => {
    const slider = setInterval(() => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)), 5000);
    return () => clearInterval(slider);
  }, [slides.length]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === product.id);
    let updatedCart = itemIndex !== -1
      ? existingCart.map((item, i) => i === itemIndex ? { ...item, quantity: item.quantity + 1 } : item)
      : [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const toggleLike = (id) => setProducts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p));

  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (n) => `Ksh ${n.toLocaleString()}`;

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        {product.soldOut ? (
          <div className="badge-soldout">SOLD OUT</div>
        ) : (
          <div className="badge-sale">SALE</div>
        )}

        <button
          onClick={() => toggleLike(product.id)}
          style={{
            position: 'absolute', top: '8px', right: '8px',
            width: '30px', height: '30px', borderRadius: '50%',
            backgroundColor: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontSize: '14px', zIndex: 2
          }}
        >
          {product.liked ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-body">
        <p className="card-name">{product.name}</p>
        <div className="card-prices">
          <span className="price-current">{fmt(product.price)}</span>
          <span className="price-original">{fmt(product.originalPrice)}</span>
        </div>
        <div className="card-footer">
          <button className="btn-details" onClick={() => navigate(`/details/${product.id}`)}>Details</button>
          {product.soldOut ? (
            <button className="btn-soldout" disabled>Sold Out</button>
          ) : (
            <button className="btn-cart" onClick={() => addToCart(product)}>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="abaya-root">
      <style>{styles}</style>

      <section className="banner">
        <div className="banner-text">
          <p className="banner-tag">{slides[current].tag}</p>
          <h1 className="banner-title">
            {slides[current].title}<br />
            <span>{slides[current].discount}</span>
          </h1>
          <p className="banner-subtext">{slides[current].subtext}</p>
          <div className="banner-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`banner-dot${current === i ? ' active' : ''}`}
                style={{ width: current === i ? '24px' : '8px' }}
              />
            ))}
          </div>
        </div>
        <div className="banner-image-wrap">
          <img src={slides[current].image} alt="Banner" key={current} />
        </div>
      </section>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '30px 5% 0', marginBottom: '25px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>⚡</div>
        <h2 style={{ margin: 0, fontSize: '1.7rem', fontWeight: '700', fontFamily: 'Cormorant Garamond, serif' }}>Flash Sale</h2>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((unit, i) => (
            <span key={i} style={{ backgroundColor: i === 0 ? '#111' : '#ef4444', color: '#fff', borderRadius: '5px', padding: '4px 10px', fontWeight: '700', fontSize: '0.95rem', minWidth: '38px', textAlign: 'center' }}>{unit}</span>
          ))}
        </div>
      </div>

      <section className="product-section">
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <FooterWithBanner />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Abaya;