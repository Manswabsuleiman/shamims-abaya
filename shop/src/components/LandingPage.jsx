import React from 'react'

const LandingPage = () => {
  return (
    <div style={{ width: '100%' }}>

      <style>{`
        .hero-image {
          width: 100%;
          height: 75vh;
          display: block;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 768px) {
          .hero-image {
            height: 50vh;
            object-position: center top;
          }
        }

        @media (max-width: 480px) {
          .hero-image {
            height: 40vh;
          }
        }
      `}</style>

      <div style={{ width: '100%' }}>
        <img
          src="/public/Pictures/squid.png"
          alt="Landing"
          className="hero-image"
        />
      </div>

    </div>
  )
}

export default LandingPage