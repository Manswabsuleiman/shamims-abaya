import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate   = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const sectionRef = useRef(null);

  const isMobile = screenWidth < 600
  const isTablet = screenWidth >= 600 && screenWidth < 1024

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const productData = [
    {
      id:        1,
      src:       '/Pictures/yellow.png',
      link:      '/abaya',
      label:     'Abaya',
      animation: 'slideInLeft',
    },
    {
      id:        2,
      src:       '/Pictures/white.png',
      link:      '/hijabs',
      label:     'Hijabs',
      animation: 'slideInRight',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const containerStyle = {
    padding:    isMobile ? '32px 4%' : isTablet ? '48px 6%' : '60px 8%',
    maxWidth:   '1400px',
    margin:     '0 auto',
    fontFamily: "'Playfair Display', serif, sans-serif",
    overflow:   'hidden',
  };

const titleStyle = {
  textAlign:     'center',
  fontSize:      isMobile ? '28px' : isTablet ? '38px' : '56px',
  marginBottom:  isMobile ? '24px' : '50px',
  letterSpacing: isMobile ? '1px' : '2px',
  textTransform: 'uppercase',
  color:         '#000000',
  opacity:       isVisible ? 1 : 0,
  transform:     isVisible ? 'translateY(0)' : 'translateY(20px)',
  transition:    'all 0.8s ease-out',
  fontFamily:    "'Cormorant Garamond', serif",
};

  const gridStyle = {
    display:             'grid',
    gridTemplateColumns: '1fr 1fr',
    gap:                 isMobile ? '12px' : isTablet ? '20px' : '30px',
  };

  const cardStyle = {
    position:        'relative',
    overflow:        'hidden',
    borderRadius:    isMobile ? '16px' : '30px',
    backgroundColor: '#fff',
    cursor:          'pointer',
    transition:      'all 0.4s ease',
    opacity:         0,
    display:         'flex',
    flexDirection:   'column',
  };

  const imageStyle = {
    width:          '100%',
    height:         isMobile ? '200px' : isTablet ? '260px' : '430px',
    objectFit:      'cover',
    objectPosition: 'center',
    display:        'block',
    transition:     'transform 0.6s ease',
  };

  const labelStyle = {
    textAlign:     'center',
    fontSize:      isMobile ? '13px' : isTablet ? '20px' : '28px',
    fontWeight:    'bolder',
    letterSpacing: isMobile ? '1px' : '2px',
    textTransform: 'uppercase',
    color:         '#000000',
    margin:        isMobile ? '10px 0 8px' : '16px 0 8px',
    fontFamily:    "'Playfair Display', serif",
    flexShrink:    0,
  };

  return (
    <div style={containerStyle} ref={sectionRef}>

      <div style={{ marginTop: isMobile ? 16 : 30 }}>
        <p style={titleStyle}>Featured <span style={{color: 'blue'}}>Latest</span> Products</p>
      </div>

      <div style={gridStyle}>
        {productData.map((product) => (
          <div
            key={product.id}
            style={cardStyle}
            className={`vintage-product-card ${isVisible ? product.animation : ''}`}
            onClick={() => navigate(product.link)}
          >
            <div
              className="vintage-overlay-container"
              style={{
                position:     'relative',
                overflow:     'hidden',
                borderRadius: isMobile ? '16px' : '30px',
                flexShrink:   0,
              }}
            >
              <img
                src={product.src}
                alt={product.label}
                style={imageStyle}
              />
            </div>

            <p style={labelStyle}>{product.label}</p>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to   { opacity: 1; transform: translateX(0);     }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0);    }
        }

        .slideInLeft  { animation: slideInLeft  1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .slideInRight { animation: slideInRight 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        .vintage-overlay-container::before {
          content:        '';
          position:       absolute;
          top:            0;
          left:           0;
          width:          100%;
          height:         100%;
          z-index:        2;
          background:     linear-gradient(135deg,
            rgba(0,4,255,0.4)   0%,
            rgba(16,0,132,0.2) 30%,
            rgba(0,0,0,0)      50%,
            rgba(0,25,254,0.2) 70%,
            rgba(4,0,255,0.4) 100%
          );
          mix-blend-mode: sepia;
          opacity:        0;
          transition:     opacity 0.6s ease-in-out;
          pointer-events: none;
        }

        .vintage-product-card:hover .vintage-overlay-container::before { opacity: 1; }
        .vintage-product-card:hover img { transform: scale(1.05); }
      `}</style>

    </div>
  );
};

export default Products;
