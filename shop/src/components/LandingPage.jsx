import React, { useState, useEffect } from 'react'

// Add your two extra images here — just replace the placeholder paths.
const HERO_IMAGES = [
  '/Pictures/squid.png',
  '/Pictures/nav2.png', // placeholder — replace with your second image
  '/Pictures/sale.png', // placeholder — replace with your third image
]

const LandingPage = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(slider)
  }, [])

  return (
    <div style={{ width: '100%' }}>

      <style>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 75vh;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .hero-image.active {
          opacity: 1;
        }

        .hero-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 2;
        }

        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .hero-dot.active {
          background: #fff;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .hero-carousel {
            height: 50vh;
          }
          .hero-image {
            object-position: center top;
          }
        }

        @media (max-width: 480px) {
          .hero-carousel {
            height: 40vh;
          }
        }
      `}</style>

      <div className="hero-carousel">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Landing slide ${i + 1}`}
            className={`hero-image${i === current ? ' active' : ''}`}
          />
        ))}

        <div className="hero-dots">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`hero-dot${i === current ? ' active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default LandingPage;
