import React from 'react';

const WhatsAppFloatingButton = () => {
  const phoneNumber = "254757080514"; 
  const message = "Hello Shamims Abaya! I am interested in your Abayas."; 
  const logoPath = "/Pictures/new.png"; 

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-ball"
      >
        <div className="logo-wrapper">
          <img 
            src={logoPath} 
            alt="Logo" 
            style={{ 
              height: '75%',      
              width: '75%',    
              objectFit: 'contain',
              borderRadius: '50%' 
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<svg viewBox="0 0 24 24" width="35" height="35" fill="#000"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
            }}
          />
        </div>
      </a>

      <style>{`
        .whatsapp-ball {
          position: fixed;
          /* INCREASED SIZE */
          width: 85px; 
          height: 85px;
          background-color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          /* PREMIUM 3D SHADOW (No Green) */
          box-shadow: 0 12px 35px rgba(0,0,0,0.15), inset 0 -4px 8px rgba(0,0,0,0.05);
          cursor: pointer;
          z-index: 9999;
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden; 
        }

        .logo-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Desktop: Slower Slide (22s) */
        @media (min-width: 769px) {
          .whatsapp-ball {
            bottom: 40px;
            animation: desktopSlide 18s infinite ease-in-out;
          }
          @keyframes desktopSlide {
            0%, 100% { left: 5%; }
            50% { left: calc(95% - 85px); }
          }
        }

        /* Mobile: Slower Zig-Zag (12s) */
        @media (max-width: 768px) {
          .whatsapp-ball {
            width: 75px; /* Bigger on mobile too */
            height: 75px;
            animation: mobileZigZag 17s infinite linear;
          }

          @keyframes mobileZigZag {
            0% { bottom: 20px; left: 10px; }
            25% { bottom: 220px; left: calc(50% - 37px); }
            50% { bottom: 20px; left: calc(100% - 85px); }
            75% { bottom: 220px; left: calc(50% - 37px); }
            100% { bottom: 20px; left: 10px; }
          }
        }

        /* Hover Effect */
        .whatsapp-ball:hover {
          animation-play-state: paused;
          transform: scale(1.1) translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
};

export default WhatsAppFloatingButton;
