import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(savedCart);
  }, []);

  const updateCart = (newItems) => {
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const updateQuantity = (id, size, delta) => {
    const newItems = items.map(item =>
      (item.id === id && item.size === size)
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateCart(newItems);
  };

  const removeItem = (id, size) => {
    const newItems = items.filter(item => !(item.id === id && item.size === size));
    updateCart(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 150 : 0;

  return (
    <div className="cart-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .cart-root {
          background-color: #fafafa;
          min-height: 100vh;
          padding-bottom: 60px;
          font-family: 'Jost', sans-serif;
          color: #111;
        }

        /* ── Banner ── */
        .cart-banner {
          width: 100%;
          height: clamp(220px, 40vw, 430px);
          background: linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.42)),
                      url('/Pictures/cart.png') center top / cover no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          text-align: center;
          margin-bottom: 40px;
          padding: 0 20px;
        }

        .cart-banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 400;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .cart-banner-title em {
          font-style: italic;
          color: rgba(255,255,255,0.85);
        }

        .cart-banner-sub {
          margin-top: 10px;
          font-size: clamp(13px, 1.5vw, 16px);
          opacity: 0.85;
          font-weight: 300;
          letter-spacing: 0.06em;
        }

        /* ── Wrapper ── */
        .cart-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 40px);
        }

        /* ── Back button ── */
        .cart-back-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #666;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          padding: 0;
          transition: color 0.2s;
        }

        .cart-back-btn:hover { color: #111; }

        /* ── Main grid ── */
        .cart-main-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 860px) {
          .cart-main-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Item card ── */
        .cart-item-card {
          display: flex;
          gap: clamp(12px, 3vw, 24px);
          padding: 20px 0;
          border-bottom: 1px solid #eee;
          align-items: flex-start;
        }

        .cart-item-image {
          width: clamp(80px, 12vw, 110px);
          height: clamp(100px, 15vw, 140px);
          object-fit: cover;
          border-radius: 10px;
          background: #f3f4f6;
          flex-shrink: 0;
        }

        .cart-item-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .cart-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }

        .cart-item-name {
          font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 600;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-item-size {
          margin: 0;
          font-size: 13px;
          color: #64748b;
        }

        .cart-item-price {
          font-weight: 700;
          font-size: clamp(14px, 1.8vw, 17px);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .cart-item-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .cart-qty-control {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 25px;
          padding: 4px 12px;
          gap: 4px;
        }

        .cart-qty-btn {
          border: none;
          background: none;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          color: #333;
          transition: color 0.2s;
        }

        .cart-qty-btn:hover { color: #004cfd; }

        .cart-qty-value {
          margin: 0 12px;
          font-size: 14px;
          font-weight: 600;
          min-width: 16px;
          text-align: center;
        }

        .cart-remove-btn {
          color: #ef4444;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Jost', sans-serif;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: opacity 0.2s;
          padding: 0;
        }

        .cart-remove-btn:hover { opacity: 0.7; }

        /* ── Summary card ── */
        .cart-summary-card {
          background: #fff;
          padding: clamp(20px, 4vw, 32px);
          border-radius: 20px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06);
          position: sticky;
          top: 20px;
        }

        .cart-summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 400;
          margin: 0 0 20px 0;
          padding-bottom: 15px;
          border-bottom: 1px solid #f1f5f9;
        }

        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #64748b;
          font-size: 14px;
        }

        .cart-summary-row span:last-child {
          color: #111;
          font-weight: 500;
        }

        .cart-summary-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 10px 0;
        }

        .cart-summary-total {
          display: flex;
          justify-content: space-between;
          font-size: clamp(16px, 2vw, 20px);
          font-weight: 800;
        }

        .cart-checkout-btn {
          width: 100%;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 30px;
          padding: 16px;
          margin-top: 28px;
          font-family: 'Jost', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: background 0.2s, transform 0.2s;
          letter-spacing: 0.04em;
        }

        .cart-checkout-btn:hover {
          background: #004cfd;
          transform: translateY(-1px);
        }

        .cart-secure-note {
          text-align: center;
          color: #94a3b8;
          font-size: 12px;
          margin-top: 16px;
          letter-spacing: 0.04em;
        }

        /* ── Empty state ── */
        .cart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
          text-align: center;
        }

        .cart-empty-icon {
          color: #ccc;
          margin-bottom: 20px;
        }

        .cart-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 400;
          color: #555;
          margin: 0 0 24px 0;
        }

        .cart-empty-btn {
          padding: 14px 32px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 30px;
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          letter-spacing: 0.06em;
          transition: background 0.2s;
        }

        .cart-empty-btn:hover { background: #004cfd; }

        /* ── Mobile summary order ── */
        @media (max-width: 860px) {
          .cart-summary-card {
            position: static;
          }
        }

        @media (max-width: 480px) {
          .cart-item-name {
            white-space: normal;
          }
        }
      `}</style>

      <div className="cart-banner">
        {items.length === 0 ? (
          <h1 className="cart-banner-title">Your Cart</h1>
        ) : (
          <>
            <h1 className="cart-banner-title">Beautiful <em>Choices</em></h1>
            <p className="cart-banner-sub">{items.length} item{items.length !== 1 ? 's' : ''} ready for you</p>
          </>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={64} className="cart-empty-icon" />
          <h2 className="cart-empty-title">Your selection is currently empty</h2>
          <button className="cart-empty-btn" onClick={() => navigate('/abaya')}>
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="cart-wrapper">
          <button className="cart-back-btn" onClick={() => navigate('/abaya')}>
            <ArrowLeft size={16} /> Back to Shop
          </button>

          <div className="cart-main-grid">
            <section>
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size || index}`} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <div style={{ minWidth: 0 }}>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-size">
                          Size: <strong>{item.size || 'Standard'}</strong>
                        </p>
                      </div>
                      <span className="cart-item-price">Ksh {item.price.toLocaleString()}</span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-qty-control">
                        <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.size, -1)}>
                          <Minus size={14} />
                        </button>
                        <span className="cart-qty-value">{item.quantity}</span>
                        <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.size, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <button className="cart-remove-btn" onClick={() => removeItem(item.id, item.size)}>
                        <Trash2 size={15} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <aside>
              <div className="cart-summary-card">
                <h2 className="cart-summary-title">Order Summary</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>Ksh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Estimated Shipping</span>
                    <span>Ksh {shipping.toLocaleString()}</span>
                  </div>
                  <div className="cart-summary-divider" />
                  <div className="cart-summary-total">
                    <span>Total</span>
                    <span>Ksh {(subtotal + shipping).toLocaleString()}</span>
                  </div>
                </div>

                <button className="cart-checkout-btn">
                  Proceed to Checkout
                </button>
                <p className="cart-secure-note">Secure Checkout by M-PESA</p>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
