import React from 'react';
import { motion } from 'framer-motion';

const Delivery = () => {

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
    }),
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const badgeContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const badgeItem = {
    hidden: { opacity: 0, scale: 0.88, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        @keyframes geminiGradient {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .delivery-section {
          width: 100%;
          padding: 80px 60px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          background-color: #fff;
        }

        .delivery-inner {
          width: 100%;
          max-width: 1300px;
          display: flex;
          align-items: center;
          gap: 60px;
        }

        .delivery-image-wrap {
          flex: 1.1;
          height: 420px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.10);
          position: relative;
        }

        .delivery-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .delivery-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px 30px;
        }

        .delivery-image-tag {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin-bottom: 6px;
        }

        .delivery-image-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 400;
          color: #fff;
          margin: 0;
          line-height: 1.1;
          letter-spacing: 0.01em;
        }

        .delivery-image-text em {
          font-style: italic;
          color: rgba(255, 255, 255, 0.88);
        }

        .delivery-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .delivery-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          margin: 0 0 14px 0;
        }

        .delivery-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.15;
          margin: 0 0 24px 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .delivery-title em {
          font-style: italic;
          color: #004cfd;
        }

        .delivery-spinner {
          animation: geminiGradient 2.5s linear infinite;
          flex-shrink: 0;
        }

        .delivery-body {
          font-family: 'Jost', sans-serif;
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.9;
          color: #555;
          margin: 0 0 40px 0;
          max-width: 520px;
        }

        .delivery-badge-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .delivery-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #f5f7ff;
          border: 1px solid #e0e7ff;
          border-radius: 50px;
          padding: 8px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #004cfd;
          letter-spacing: 0.04em;
        }

        .delivery-badge svg { flex-shrink: 0; }

        /* Tablet */
        @media (max-width: 1024px) {
          .delivery-section { padding: 60px 32px; }
          .delivery-inner { gap: 40px; }
          .delivery-image-wrap { height: 360px; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .delivery-section { padding: 48px 20px; }
          .delivery-inner { flex-direction: column; gap: 32px; }
          .delivery-image-wrap {
            width: 100%;
            height: 260px;
            border-radius: 16px;
            flex: none;
          }
          .delivery-content { width: 100%; flex: none; }
          .delivery-body { max-width: 100%; }
        }
      `}</style>

      <div className="delivery-section">
        <div className="delivery-inner">

          <motion.div
            className="delivery-image-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeLeft}
          >
            <img src="/Pictures/heading.png" alt="Be Beautiful Collection" />
            <div className="delivery-image-overlay">
              <motion.span
                className="delivery-image-tag"
                variants={fadeUp}
                custom={0.3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Collection
              </motion.span>
              <motion.h3
                className="delivery-image-text"
                variants={fadeUp}
                custom={0.45}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Be <em>Beautiful</em>
              </motion.h3>
            </div>
          </motion.div>

          <motion.div
            className="delivery-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeRight}
          >
            <motion.p
              className="delivery-eyebrow"
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Shipping &amp; Delivery
            </motion.p>

            <motion.h2
              className="delivery-title"
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Orders made and <em>delivered</em> on time
              <svg
                className="delivery-spinner"
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="url(#gemini_gradient)"
                />
                <defs>
                  <linearGradient id="gemini_gradient" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4285F4" />
                    <stop offset="0.5" stopColor="#9B72CB" />
                    <stop offset="1" stopColor="#D96570" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.h2>

            <motion.p
              className="delivery-body"
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Fast. Secure. Global. Experience worry-free shopping with real-time
              tracking and world-class delivery. Your style, delivered on your schedule.
            </motion.p>

            <motion.div
              className="delivery-badge-row"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={badgeContainer}
            >
              {[
                'Real-time Tracking',
                'Worldwide Shipping',
                'Secure Packaging',
              ].map((label) => (
                <motion.span key={label} className="delivery-badge" variants={badgeItem}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="#004cfd" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Delivery;
