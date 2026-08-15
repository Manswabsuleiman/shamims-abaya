import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterWithBanner from '../components/Footer';
import WhatsAppFloatingButton from '../components/Float';

const ABAYA_PRICES = [
  { price: 1200, originalPrice: 1400 },
  { price: 1500, originalPrice: 1800 },
  { price: 1000, originalPrice: 1500 },
  { price: 1000, originalPrice: 1500 },
  { price: 1500, originalPrice: 2200 },
  { price: 1500, originalPrice: 2200 },
  { price: 1500, originalPrice: 1700 },
  { price: 1500, originalPrice: 1700 },
  { price: 1900, originalPrice: 2200 },
  { price: 1900, originalPrice: 2200 },
  { price: 1500, originalPrice: 1900 },
  { price: 1500, originalPrice: 1900 },
  { price: 1000, originalPrice: 1200 },
  { price: 1000, originalPrice: 1200 },
  { price: 1500, originalPrice: 1800 },
  { price: 1500, originalPrice: 1800 },
  { price: 2200, originalPrice: 2600 },
  { price: 2200, originalPrice: 2600 },
  { price: 1700, originalPrice: 2000 },
  { price: 1700, originalPrice: 2000 },
  { price: 1000, originalPrice: 1300 },
  { price: 1000, originalPrice: 1300 },
  { price: 1300, originalPrice: 1600 },
  { price: 1300, originalPrice: 1600 },
];

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

const ABAYA_NAME_OVERRIDES = {
  15: 'Girlie Tops',
  16: 'Girlie Tops',
  17: 'Girlie Tops',
  23: 'Animal Print',
};

const SLIDES = [
  {
    tag: 'Big Fashion Sale',
    title: 'Limited Time Offer!',
    discount: 'Up to 50% OFF!',
    subtext: 'Redefine Your Everyday Style',
    image: '/Pictures/canva.png',
  },
  {
    tag: 'New Arrivals',
    title: 'Elegant Abaya Collection',
    discount: 'Shop the Latest Trends',
    subtext: 'Modern designs for every occasion',
    image: '/Pictures/canva2.png',
  },
  {
    tag: 'Summer Essentials',
    title: 'Fresh New Looks',
    discount: 'Flat 20% Discount',
    subtext: 'Comfort meets style this season',
    image: '/Pictures/canva3.png',
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .abaya-root {
    font-family: 'DM Sans', sans-serif;
    background: #faf9f7;
    color: #111;
    min-height: 100vh;
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

  .banner-text {
    flex: 1.2;
    z-index: 2;
    min-width: 0;
  }

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

  .banner-title span {
    color: #2563eb;
  }

  .banner-subtext {
    color: #666;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    margin-bottom: 25px;
    line-height: 1.4;
  }

  .banner-dots {
    display: flex;
    gap: 8px;
  }

  .banner-dot {
    height: 8px;
    border-radius: 4px;
    transition: all 0.35s ease;
    cursor: pointer;
    border: none;
    background: #ccc;
    padding: 0;
  }

  .banner-dot.active {
    background: #111;
  }

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

  /* ── FLASH SALE ───────────────────────── */

  .flash-sale-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    padding: 30px 5% 0;
    margin-bottom: 25px;
  }

  .flash-sale-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .flash-sale-title {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 700;
    font-family: 'Cormorant Garamond', serif;
  }

  .countdown {
    display: flex;
    gap: 5px;
  }

  .countdown-unit {
    color: #fff;
    border-radius: 5px;
    padding: 4px 10px;
    font-weight: 700;
    font-size: 0.95rem;
    min-width: 38px;
    text-align: center;
  }

  .countdown-hours {
    background-color: #111;
  }

  .countdown-other {
    background-color: #ef4444;
  }

  /* ── PRODUCT GRID ─────────────────────── */

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
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
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
    display: block;
  }

  .badge-sale,
  .badge-soldout {
    position: absolute;
    top: 8px;
    left: 8px;
    color: #fff;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 7px;
    z-index: 1;
  }

  .badge-sale {
    background: #ef4444;
  }

  .badge-soldout {
    background: #111;
  }

  .like-button {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    z-index: 2;
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

  .card-prices {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .price-current {
    font-weight: 700;
    font-size: 1rem;
    color: #111;
  }

  .price-original {
    font-size: 0.8rem;
    color: #f87171;
    text-decoration: line-through;
  }

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

  .btn-cart:hover {
    background: #2563eb;
  }

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

  /* ── RESPONSIVE ───────────────────────── */

  @media (max-width: 1100px) {
    .product-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 820px) {
    .banner {
      flex-direction: column-reverse;
      padding: 30px 6%;
      text-align: center;
    }

    .banner-image-wrap {
      height: 240px;
      margin-top: 0;
    }

    .banner-dots {
      justify-content: center;
    }

    .product-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }

  @media (max-width: 520px) {
    .card-image-wrap {
      height: 180px;
    }

    .price-current {
      font-size: 0.9rem;
    }

    .card-footer {
      flex-direction: column;
    }

    .btn-details,
    .btn-cart,
    .btn-soldout {
      width: 100%;
      flex: none;
    }
  }
`;

const Abaya = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const abayas = Array.from({ length: 24 }, (_, i) => {
    const id = i + 1;

    return {
      id,
      image: ABAYA_IMAGES[i],
      name: ABAYA_NAME_OVERRIDES[id] || `Dress ${id}`,
      price: ABAYA_PRICES[i].price,
      originalPrice: ABAYA_PRICES[i].originalPrice,
      liked: false,
      soldOut: i >= 4 && i <= 15,
    };
  });

  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState(abayas);
  const [timeLeft, setTimeLeft] = useState({
    h: 8,
    m: 17,
    s: 56,
  });

  /* ── BANNER SLIDER ───────────────────── */

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) =>
        prev === SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  /* ── COUNTDOWN ───────────────────────── */

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;

        if (h === 0 && m === 0 && s === 0) {
          clearInterval(countdown);
          return prev;
        }

        s--;

        if (s < 0) {
          s = 59;
          m--;
        }

        if (m < 0) {
          m = 59;
          h--;
        }

        if (h < 0) {
          h = 0;
          m = 0;
          s = 0;
        }

        return { h, m, s };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  /* ── ADD TO CART ─────────────────────── */

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const itemIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    const updatedCart =
      itemIndex !== -1
        ? existingCart.map((item, i) =>
            i === itemIndex
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          )
        : [
            ...existingCart,
            {
              ...product,
              quantity: 1,
            },
          ];

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    navigate('/cart');
  };

  /* ── LIKE PRODUCT ────────────────────── */

  const toggleLike = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              liked: !product.liked,
            }
          : product
      )
    );
  };

  const pad = (n) => String(n).padStart(2, '0');

  const fmt = (n) => `Ksh ${n.toLocaleString()}`;

  /* ── PRODUCT CARD ────────────────────── */

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {product.soldOut ? (
          <div className="badge-soldout">SOLD OUT</div>
        ) : (
          <div className="badge-sale">SALE</div>
        )}

        <button
          type="button"
          className="like-button"
          onClick={() => toggleLike(product.id)}
          aria-label={
            product.liked
              ? `Unlike ${product.name}`
              : `Like ${product.name}`
          }
        >
          {product.liked ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-body">
        <p className="card-name">{product.name}</p>

        <div className="card-prices">
          <span className="price-current">
            {fmt(product.price)}
          </span>

          <span className="price-original">
            {fmt(product.originalPrice)}
          </span>
        </div>

        <div className="card-footer">
          <button
            type="button"
            className="btn-details"
            onClick={() =>
              navigate(`/details/${product.id}`)
            }
          >
            Details
          </button>

          {product.soldOut ? (
            <button
              type="button"
              className="btn-soldout"
              disabled
            >
              Sold Out
            </button>
          ) : (
            <button
              type="button"
              className="btn-cart"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="abaya-root">
      <style>{styles}</style>

      {/* ── BANNER ───────────────────────── */}

      <section className="banner">
        <div className="banner-text">
          <p className="banner-tag">
            {SLIDES[current].tag}
          </p>

          <h1 className="banner-title">
            {SLIDES[current].title}
            <br />
            <span>{SLIDES[current].discount}</span>
          </h1>

          <p className="banner-subtext">
            {SLIDES[current].subtext}
          </p>

          <div className="banner-dots">
            {SLIDES.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setCurrent(i)}
                className={`banner-dot${
                  current === i ? ' active' : ''
                }`}
                style={{
                  width: current === i ? '24px' : '8px',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="banner-image-wrap">
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            key={current}
          />
        </div>
      </section>

      {/* ── FLASH SALE HEADER ────────────── */}

      <div className="flash-sale-header">
        <div className="flash-sale-icon">
          ⚡
        </div>

        <h2 className="flash-sale-title">
          Flash Sale
        </h2>

        <div className="countdown">
          <span className="countdown-unit countdown-hours">
            {pad(timeLeft.h)}
          </span>

          <span className="countdown-unit countdown-other">
            {pad(timeLeft.m)}
          </span>

          <span className="countdown-unit countdown-other">
            {pad(timeLeft.s)}
          </span>
        </div>
      </div>

      {/* ── PRODUCTS ─────────────────────── */}

      <section className="product-section">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <FooterWithBanner />

      <WhatsAppFloatingButton />
    </div>
  );
};

export default Abaya;
