import React, { useState, useEffect, useRef } from 'react'
import FooterWithBanner from '../components/Footer'

const About = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const sectionRefs = useRef({})

  const isMobile = screenWidth < 600
  const isTablet  = screenWidth >= 600 && screenWidth < 1024

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.12 }
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const registerRef = (id) => (el) => { sectionRefs.current[id] = el }

  const fadeIn = (id, delay = 0) => ({
    opacity:    visibleSections[id] ? 1 : 0,
    transform:  visibleSections[id] ? 'translateY(0px)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  })

  const dark      = '#0a1628'
  const darkMid   = '#0d2040'
  const gold      = '#c9a84c'
  const blue      = '#7eb8f7'
  const cream     = '#faf7f2'
  const border    = '#1e3a5f'
  const mutedText = 'rgba(255,255,255,0.72)'

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#ffffff', backgroundColor: cream }}>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes lineDraw {
          from { width: 0;    }
          to   { width: 32px; }
        }
        .about-card:hover {
          transform:  translateY(-4px) !important;
          box-shadow: 0 16px 48px rgba(10,22,40,0.18) !important;
        }
      `}</style>

      <div style={{
        position:   'relative',
        width:      '100%',
        height:     isMobile ? '240px' : isTablet ? '320px' : '420px',
        overflow:   'hidden',
        background: darkMid,
      }}>

        <img
          src="/Pictures/turkiye.png"
          alt="Shamims Abaya"
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center',
            position:       'absolute',
            inset:          0,
            zIndex:         1,
            display:        'block',
          }}
        />

        
        <div style={{
          position:   'absolute',
          inset:      0,
          background: isMobile
            ? 'rgba(10,22,40,0.65)'
            : 'linear-gradient(to right, rgba(20,11,59,0.80) 0%, rgba(10,22,40,0.40) 55%, rgba(10,22,40,0.08) 100%)',
          zIndex:     2,
        }} />

        <div style={{
          position:       'absolute',
          inset:          0,
          zIndex:         3,
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        isMobile ? '0 24px' : isTablet ? '0 40px' : '0 64px',
          animation:      'fadeDown 1.1s ease both',
        }}>
          <p style={{
            fontSize:   isMobile ? '22px' : isTablet ? '28px' : '38px',
            fontWeight: '700',
            color:      '#ffffff',
            margin:     '0 0 10px 0',
            lineHeight: 1.3,
            maxWidth:   '580px',
          }}>
            "Dressed with care.{' '}
            <span style={{ color: blue }}>Delivered with love.</span>"
          </p>

          <p style={{
            fontSize:      isMobile ? '10px' : '13px',
            color:         '#ffffff',
            margin:        0,
            letterSpacing: isMobile ? '2px' : '4px',
            textTransform: 'uppercase',
          }}>
            Shamims Abaya · Nairobi
          </p>

          <div style={{
            width:           '32px',
            height:          '1px',
            backgroundColor: gold,
            marginTop:       '18px',
            animation:       'lineDraw 1.2s ease 0.3s both',
          }} />
        </div>
      </div>

      <section style={{ backgroundColor: dark, padding: isMobile ? '48px 24px' : '64px 64px' }}>
        <div
          id="intro"
          ref={registerRef('intro')}
          style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', ...fadeIn('intro', 0) }}
        >
          <p style={{
            fontSize:      '11px',
            fontWeight:    '400',
            letterSpacing: '5px',
            color:         gold,
            textTransform: 'uppercase',
            marginBottom:  '16px',
          }}>
            Who We Are
          </p>

          <h2 style={{
            fontSize:   isMobile ? '24px' : '36px',
            fontWeight: '300',
            color:      '#ffffff',
            lineHeight: '1.3',
            margin:     '0 0 20px',
            fontStyle:  'italic',
          }}>
            A small boutique built on the belief that modesty deserves to be beautiful.
          </h2>

          <div style={{ width: '32px', height: '1px', backgroundColor: gold, margin: '0 auto 20px' }} />

          <p style={{
            fontSize:   '15px',
            color:      mutedText,
            lineHeight: '1.9',
            margin:     0,
          }}>
            Every piece is thoughtfully selected — because what you wear is a reflection of who you are,
            and you deserve nothing less than extraordinary. When you shop with us, you are not a number.
            You are a valued guest.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: darkMid, padding: isMobile ? '40px 24px' : '56px 64px' }}>
        <div style={{
          maxWidth:            '1100px',
          margin:              '0 auto',
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
          gap:                 '20px',
        }}>

          <div
            id="card1"
            ref={registerRef('card1')}
            className="about-card"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border:          `1px solid ${border}`,
              padding:         '32px 28px',
              transition:      'transform 0.35s ease, box-shadow 0.35s ease',
              ...fadeIn('card1', 0.1),
            }}
          >
            <div style={{ fontSize: '26px', marginBottom: '16px' }}>🏛️</div>
            <h3 style={{
              fontSize:      '11px',
              fontWeight:    '400',
              letterSpacing: '3px',
              color:         gold,
              textTransform: 'uppercase',
              marginBottom:  '12px',
            }}>
              The Boutique
            </h3>
            <p style={{
              fontSize:   '14px',
              color:      '#ffffff',
              lineHeight: '1.85',
              margin:     0,
            }}>
              We are a small, independent abaya shop — not a warehouse, not a faceless brand.
              Every order is handled personally with full attention to quality and care.
            </p>
          </div>

          <div
            id="card2"
            ref={registerRef('card2')}
            className="about-card"
            style={{
              backgroundColor: 'rgba(7,1,62,0.07)',
              border:          '1px solid rgba(255,255,255,0.3)',
              padding:         '32px 28px',
              transition:      'transform 0.35s ease, box-shadow 0.35s ease',
              ...fadeIn('card2', 0.2),
            }}
          >
            <div style={{ fontSize: '26px', marginBottom: '16px' }}>🎁</div>
            <h3 style={{
              fontSize:      '11px',
              fontWeight:    '400',
              letterSpacing: '3px',
              color:         gold,
              textTransform: 'uppercase',
              marginBottom:  '12px',
            }}>
              Packaged Beautifully
            </h3>
            <p style={{
              fontSize:   '14px',
              color:      mutedText,
              lineHeight: '1.85',
              margin:     0,
            }}>
              Every abaya is carefully folded, wrapped with tissue, and sealed with intention —
              whether it is a gift or a treat for yourself. The unboxing is part of the joy.
            </p>
          </div>

          <div
            id="card3"
            ref={registerRef('card3')}
            className="about-card"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border:          `1px solid ${border}`,
              padding:         '32px 28px',
              transition:      'transform 0.35s ease, box-shadow 0.35s ease',
              ...fadeIn('card3', 0.3),
            }}
          >
            <div style={{ fontSize: '26px', marginBottom: '16px' }}>🚚</div>
            <h3 style={{
              fontSize:      '11px',
              fontWeight:    '400',
              letterSpacing: '3px',
              color:         gold,
              textTransform: 'uppercase',
              marginBottom:  '12px',
            }}>
              Free Delivery Offer
            </h3>
            <p style={{
              fontSize:   '14px',
              color:      '#ffffff',
              lineHeight: '1.85',
              margin:     0,
            }}>
              Purchase any <strong style={{ color: gold }}>two abayas</strong> in one order and enjoy{' '}
              <strong style={{ color: gold }}>free delivery</strong> — automatically at checkout.
              No codes, no conditions. Just our way of saying thank you.
            </p>
          </div>

        </div>
      </section>

      <section
        id="delivery"
        ref={registerRef('delivery')}
        style={{
          background: `linear-gradient(135deg, ${gold} 0%, #d4b064 50%, ${gold} 100%)`,
          padding:    isMobile ? '40px 24px' : '56px 64px',
          textAlign:  'center',
          ...fadeIn('delivery', 0),
        }}
      >
        <p style={{
          fontSize:      '11px',
          letterSpacing: '5px',
          color:         'rgba(10,22,40,0.6)',
          textTransform: 'uppercase',
          marginBottom:  '14px',
        }}>
          Special Offer
        </p>

        <h2 style={{
          fontSize:   isMobile ? '26px' : '42px',
          fontWeight: '300',
          color:      dark,
          lineHeight: '1.2',
          margin:     '0 0 14px',
          fontStyle:  'italic',
        }}>
          Buy 2 Abayas, Delivery is on Us.
        </h2>

        <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(10,22,40,0.3)', margin: '0 auto 16px' }} />

        <p style={{
          fontSize:   '15px',
          color:      'rgba(10,22,40,0.7)',
          maxWidth:   '460px',
          margin:     '0 auto',
          lineHeight: '1.8',
        }}>
          Add any two pieces to your cart and the delivery fee disappears automatically.
          No vouchers, no fuss — just our gift to you.
        </p>
      </section>

      <section
        id="cta"
        ref={registerRef('cta')}
        style={{
          backgroundColor: '#ffffff',
          padding:         isMobile ? '48px 24px' : '64px 64px',
          textAlign:       'center',
          ...fadeIn('cta', 0),
        }}
      >
        <p style={{
          fontSize:      '11px',
          letterSpacing: '5px',
          color:         '#000000',
          textTransform: 'uppercase',
          marginBottom:  '16px',
        }}>
          Ready to Explore?
        </p>

        <h2 style={{
          fontSize:   isMobile ? '26px' : '42px',
          fontWeight: '300',
          color:      '#000000',
          lineHeight: '1.2',
          margin:     '0 0 16px',
          fontStyle:  'italic',
        }}>
          Step into something beautiful.
        </h2>

        <div style={{ width: '32px', height: '1px', backgroundColor: dark, margin: '0 auto 28px' }} />

        <a
          href="/abaya"
          style={{
            fontSize:       '12px',
            letterSpacing:  '4px',
            color:          '#000000',
            textDecoration: 'none',
            textTransform:  'uppercase',
            borderBottom:   `1px solid ${gold}`,
            paddingBottom:  '4px',
            transition:     'color 0.3s ease',
          }}
        >
          Shop the Collection
        </a>
      </section>

      <FooterWithBanner />

    </div>
  )
}

export default About
