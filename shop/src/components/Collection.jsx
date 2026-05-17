import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Collection = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const items = [
    { src: "/Pictures/Abbaya2.png", alt: "Abbaya 2", path: "/abaya", label: "Abaya" },
    { src: "/Pictures/hijabi.png", alt: "Hijab Collection", path: "/hijabs", label: "Hijab" },
    { src: "/Pictures/Abbaya1.png", alt: "Abbaya 1", path: "/abaya", label: "Abaya" },
    { src: /Pictures/h2.png", alt: "Hijab 2", path: "/hijabs", label: "Hijab" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .collection-wrapper {
          padding: clamp(32px, 6vw, 80px) clamp(16px, 5vw, 60px);
          max-width: 1280px;
          margin: 0 auto;
          font-family: 'Jost', sans-serif;
        }

        .collection-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 10px;
        }

        .collection-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 5vw, 72px);
          font-weight: 400;
          color: #111;
          margin: 0 0 clamp(20px, 5vw, 56px) 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
          word-break: break-word;
        }

        .collection-title em {
          font-style: italic;
          color: #004cfd;
        }

        .collection-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 24px);
        }

        @media (max-width: 1024px) {
          .collection-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .collection-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        .collection-card {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          background: #f7f5f2;
          aspect-ratio: 3 / 4;
          display: flex;
          flex-direction: column;
        }

        .card-image-wrap {
          position: relative;
          flex: 1;
          overflow: hidden;
        }

        .card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .collection-card:hover .card-image-wrap img {
          transform: scale(1.04);
        }

        .card-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(6px);
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #333;
          padding: 5px 11px;
          border-radius: 2px;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .collection-card:hover .card-overlay {
          opacity: 1;
        }

        .card-footer {
          padding: clamp(10px, 2vw, 16px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-top: 1px solid #f0ede8;
        }

        .card-footer-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 400;
          color: #222;
          letter-spacing: 0.02em;
        }

        .card-cta {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #004cfd;
          transition: gap 0.2s ease;
        }

        .card-cta:hover {
          gap: 9px;
        }

        .card-cta svg {
          transition: transform 0.2s ease;
        }

        .card-cta:hover svg {
          transform: translateX(2px);
        }

        @media (max-width: 400px) {
          .card-cta span {
            display: none;
          }
        }
      `}</style>

      <div className="collection-wrapper">

        {/* Animated header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.p className="collection-eyebrow" variants={headerVariants}>
            New Arrivals
          </motion.p>
          <motion.h2 className="collection-title" variants={headerVariants}>
            Our <em>Latest</em> Collection
          </motion.h2>
        </motion.div>

        {/* Animated grid */}
        <motion.div
          className="collection-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="collection-card"
              variants={cardVariants}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="card-image-wrap">
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="card-overlay" />
                <span className="card-tag">{item.label}</span>
              </div>

              <div className="card-footer">
                <span className="card-footer-label">{item.alt}</span>
                <button
                  className="card-cta"
                  onClick={(e) => { e.stopPropagation(); navigate(item.path); }}
                  aria-label={`View ${item.alt} in store`}
                >
                  <span>Shop</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="#004cfd" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </>
  );
};

export default Collection;
