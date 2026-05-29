import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterWithBanner from '../components/Footer';

const HIJAB_PRICES = [
  { price: 500,  originalPrice: 650 }, { price: 500,  originalPrice: 600 },
  { price: 500,  originalPrice: 650 }, { price: 550, originalPrice: 650 },
  { price: 550,  originalPrice: 650 }, { price: 500, originalPrice: 650 },
  { price: 650,  originalPrice: 900  }, { price: 600,  originalPrice: 750 },
  { price: 750,  originalPrice: 1050 }, { price: 1000, originalPrice: 1300 },
  { price: 850,  originalPrice: 1150 }, { price: 950,  originalPrice: 1250 },
  { price: 700,  originalPrice: 950  }, { price: 600, originalPrice: 750 },
  { price: 800,  originalPrice: 1100 }, { price: 1300, originalPrice: 1600 },
];

const HIJAB_IMAGES = [
  '/Pictures/pic1.png',  '/Pictures/pic4.png',
  '/Pictures/pic5.png',  '/Pictures/hijab15.png',
  '/Pictures/pic6.png',  '/Pictures/pic3.png',
  '/Pictures/pic7.png',  '/Pictures/pic2.png',
  '/Pictures/hijab9.png',  '/Pictures/hijab10.png',
  '/Pictures/hijab11.png', '/Pictures/hijab12.png',
  '/Pictures/hijab13.png', '/Pictures/pic2.png',
  '/Pictures/hijab16.png', '/Pictures/hijab17.png',
];

const HIJAB_NAMES = [
  'Instant', 'Instant', 'Plisket', 'Crinkle',
  'Chiffon', 'Chiffon', 'Chiffon', 'Chador',
  'Pleated', 'Satin',   'Pashmina','Pashmina',
  'Colored', 'Shimmer', 'Chiffon', 'Jersey',
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .hijabs-root {
    font-family: 'DM Sans', sans-serif;
    background: #faf9f7;
    color: #111;
  }

  /* ── BANNER ─────────────────────────────────────────────────────── */
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

  .banner-text { flex: 1; z-index: 2; min-width: 0; }

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
    flex: 1.2;
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

  .flash-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 25px;
    padding: 30px 5% 0;
  }

  .flash-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .flash-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    font-weight: 700;
  }

  .flash-timer { display: flex; gap: 5px; flex-wrap: nowrap; }

  .timer-unit {
    color: #fff;
    border-radius: 5px;
    padding: 4px 10px;
    font-weight: 700;
    font-size: 0.95rem;
    font-variant-numeric: tabular-nums;
    min-width: 38px;
    text-align: center;
  }

  .product-section {
    padding: 0 5% 50px;
    background: #faf9f7;
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
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-image-wrap {
    position: relative;
    background: #f5f5f2;
    height: 240px;
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
  }

  .btn-like {
    position: absolute;
    top: 8px; right: 8px;
    width: 30px; height: 30px;
    border-radius: 50%;
    background: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    font-size: 14px;
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
    transition: background 0.2s;
  }
  .btn-details:hover { background: #e5e5e5; }

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
    text-align: center;
    white-space: nowrap;
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
    text-align: center;
    white-space: nowrap;
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
    .card-image-wrap { height: 170px; }
    .card-body { padding: 10px; gap: 4px; }
    .btn-details, .btn-cart, .btn-soldout { font-size: 0.7rem; padding: 7px 2px; }
    .card-footer { gap: 5px; padding-top: 8px; }
    .price-current { font-size: 0.9rem; }
    .card-name { font-size: 0.85rem; }
  }
`;

const Hijabs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hijabs = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    image: HIJAB_IMAGES[i],
    name: HIJAB_NAMES[i],
    price: HIJAB_PRICES[i].price,
    originalPrice: HIJAB_PRICES[i].originalPrice,
    liked: false,
    soldOut: i >= 4 && i <= 11, 
  }));

  const slides = [
    { tag: 'New Arrivals', title: 'Hijab Collection', discount: 'Up to 50% OFF!', subtext: 'Elegant styles for every occasion', image: '/Pictures/ban2.png' },
    { tag: 'Trending Now', title: 'Premium Hijabs', discount: 'Fresh Styles Just In', subtext: 'Soft fabrics, stunning colours', image: '/Pictures/ban1.png' },
    { tag: 'Summer Collection', title: 'Light & Breathable', discount: 'Flat 20% Discount', subtext: 'Stay modest, stay cool', image: '/Pictures/ban3.png' },
  ];

  const [current, setCurrent]   = useState(0);
  const [products, setProducts] = useState(hijabs);
  const [timeLeft, setTimeLeft] = useState({ h: 8, m: 17, s: 56 });

  useEffect(() => {
    const id = setInterval(() => setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1)), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { return { h: 0, m: 0, s: 0 }; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleLike = (id) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p));

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const idx = cart.findIndex(item => item.id === product.id);
    const updated = idx !== -1
      ? cart.map((item, i) => i === idx ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updated));
    navigate('/cart');
  };

  const pad = n => String(n).padStart(2, '0');
  const fmt = n => `Ksh ${n.toLocaleString()}`;

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        {product.soldOut ? (
          <span className="badge-soldout">SOLD OUT</span>
        ) : (
          <span className="badge-sale">SALE</span>
        )}

        <button className="btn-like" onClick={() => toggleLike(product.id)}>
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
          <button className="btn-details" onClick={() => navigate(`/hijabsdetails/${product.id}`)}>
            Details
          </button>
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
    <>
      <style>{styles}</style>
      <div className="hijabs-root">
        <section className="banner">
          <div className="banner-text">
            <p className="banner-tag">{slides[current].tag}</p>
            <h1 className="banner-title">{slides[current].title}<br /><span>{slides[current].discount}</span></h1>
            <p className="banner-subtext">{slides[current].subtext}</p>
            <div className="banner-dots">
              {slides.map((_, i) => (
                <button key={i} className={`banner-dot${current === i ? ' active' : ''}`} style={{ width: current === i ? '24px' : '8px' }} onClick={() => setCurrent(i)} />
              ))}
            </div>
          </div>
          <div className="banner-image-wrap">
            <img src={slides[current].image} alt={slides[current].title} key={current} />
          </div>
        </section>

        <div className="flash-header">
          <div className="flash-icon">⚡</div>
          <h2 className="flash-title">Flash Sale</h2>
          <div className="flash-timer">
            {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((unit, i) => (
              <span key={i} className="timer-unit" style={{ background: i === 0 ? '#111' : '#ef4444' }}>{unit}</span>
            ))}
          </div>
        </div>

        <section className="product-section">
          <div className="product-grid">
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
        <FooterWithBanner />
      </div>
    </>
  );
};

export default Hijabs;
