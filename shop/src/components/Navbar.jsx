import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const isMobile = screenWidth < 768
  const isTablet = screenWidth >= 768 && screenWidth < 1024

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/abaya' },
    { name: 'About', path: '/about' },
  ]

  const handleAiModeClick = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      navigate('/AI-mode')
    }, 1600)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const LOGO_SIZE = {
    mobile:  { height: '270px', width: '74px'  },
    tablet:  { height: '44px',  width: '110px' },
    desktop: { height: '84px',  width: '140px' },
  }
  const currentLogo = isMobile ? LOGO_SIZE.mobile : isTablet ? LOGO_SIZE.tablet : LOGO_SIZE.desktop

  const navBarStyle = {
    position:        'fixed',
    top:             '0',
    left:            0,
    width:           '100%',
    height:          isMobile ? '76px' : isTablet ? '70px' : '86px',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    padding:         isMobile ? '0 4%' : isTablet ? '0 5%' : '0 6%',
    backgroundColor: isScrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
    color:           '#111827',
    boxShadow:       isScrolled ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 0 #e5e7eb',
    backdropFilter:  isScrolled ? 'blur(10px)' : 'none',
    transition:      'all 0.4s ease',
    zIndex:          1000,
    boxSizing:       'border-box',
    filter:          isTransitioning ? 'blur(12px)' : 'none',
  }

  const linkStyle = {
    textDecoration: 'none',
    color:          '#000000',
    fontWeight:     '600',
    fontSize:       '17px',
    fontFamily:     'arial',
    letterSpacing:  '0.5px',
    transition:     'opacity 0.2s ease',
    whiteSpace:     'nowrap',
  }

  const aiButtonStyle = {
    background:   'linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)',
    color:        '#fff',
    border:       'none',
    borderRadius: '20px',
    cursor:       'pointer',
    fontWeight:   '600',
    fontFamily:   'georgia',
    display:      'flex',
    alignItems:   'center',
    boxShadow:    '0 2px 10px rgba(30, 58, 95, 0.2)',
    whiteSpace:   'nowrap',
    padding:      isMobile ? '10px 10px' : '8px 16px',
    fontSize:     isMobile ? '11px' : '13px',
    gap:          isMobile ? '4px' : '6px',
  }

  const aiButtonMobileStyle = { ...aiButtonStyle, marginLeft: '27px' }

  const ctaButtonStyle = {
    backgroundColor: '#0a1628',
    color:           '#ffffff',
    border:          'none',
    padding:         isMobile ? '12px 22px' : '10px 22px',
    borderRadius:    '4px',
    cursor:          'pointer',
    fontWeight:      '600',
    fontSize:        '14px',
    fontFamily:      'arial',
    letterSpacing:   '0.5px',
    whiteSpace:      'nowrap',
    width:           isMobile ? '100%' : 'auto',
  }

  const loaderOverlayStyle = {
    position:        'fixed',
    top:             0,
    left:            0,
    width:           '100vw',
    height:          '100vh',
    backgroundColor: 'rgba(10, 22, 40, 0.9)',
    backdropFilter:  'blur(20px)',
    display:         'flex',
    flexDirection:   'column',
    justifyContent:  'center',
    alignItems:      'center',
    zIndex:          9999,
    opacity:         isTransitioning ? 1 : 0,
    pointerEvents:   isTransitioning ? 'all' : 'none',
    transition:      'opacity 0.5s ease',
  }

  const spinnerStyle = {
    width:        '60px',
    height:       '60px',
    border:       '4px solid rgba(255, 255, 255, 0.1)',
    borderTop:    '4px solid #ffffff',
    borderRadius: '50%',
    animation:    'spin 0.8s linear infinite',
  }

  const CartButton = ({ onClick }) => (
    <button
      onClick={onClick || (() => navigate('/cart'))}
      style={{
        position:   'relative',
        background: 'none',
        border:     'none',
        padding:    '4px 10px',
        cursor:     'pointer',
        display:    'flex',
        alignItems: 'center',
        gap:        '6px',
        color:      '#374151',
      }}
    >
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {cartCount > 0 && (
          <span style={{
            position:       'absolute',
            top:            '-10px',
            right:          '-10px',
            background:     '#e53e3e',
            color:          '#ffffff',
            fontSize:       '10px',
            fontWeight:     '800',
            minWidth:       '19px',
            height:         '19px',
            borderRadius:   '50%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            border:         '2px solid #ffffff',
          }}>
            {cartCount}
          </span>
        )}
      </span>
      <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: '500' }}>Cart</span>
    </button>
  )

  return (
    <header>

      {/* Loader Overlay */}
      <div style={loaderOverlayStyle}>
        <div style={spinnerStyle} />
        <div style={{ color: '#fff', marginTop: '15px', letterSpacing: '1px', fontFamily: 'arial', fontSize: '12px' }}>
          Please wait...
        </div>
      </div>

      <nav style={navBarStyle}>

        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/Pictures/ss.png"
            alt="Logo"
            style={{ height: currentLogo.height, width: currentLogo.width, objectFit: 'contain' }}
          />
        </a>

        <div className="hide-mobile" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {navLinks.map(link => (
            <a key={link.name} href={link.path} style={linkStyle}>{link.name}</a>
          ))}
          <button onClick={handleAiModeClick} style={aiButtonStyle}>AI MODE 🤖</button>
        </div>

        <div className="hide-mobile" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <CartButton />

          <SignedOut>
            <SignInButton mode="modal">
              <button style={ctaButtonStyle}>Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width:  '38px',
                    height: '38px',
                    border: '2px solid #0a1628',
                  },
                },
              }}
            />
          </SignedIn>
        </div>

                      {/* A.I */}

        <button className="show-mobile" onClick={handleAiModeClick} style={aiButtonMobileStyle}>
          AI MODE 🤖
        </button>

        <button
          className="show-mobile"
          onClick={() => setIsMenuOpen(true)}
          style={{ background: 'none', border: 'none', fontSize: '24px', marginRight: '10px', cursor: 'pointer' }}
        >
          ☰
        </button>

      </nav>

      <div style={{
        position:        'fixed',
        top:             0,
        left:            0,
        width:           '100%',
        height:          '100vh',
        backgroundColor: '#ffffff',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             '24px',
        transform:       isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition:      'transform 0.45s cubic-bezier(0.77,0.2,0.05,1.0)',
        zIndex:          2000,
        padding:         '60px 32px 40px',
        boxSizing:       'border-box',
      }}>

        <button
          onClick={() => setIsMenuOpen(false)}
          style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
        >
          ✕
        </button>

        {navLinks.map(link => (
          <a
            key={link.name}
            href={link.path}
            onClick={() => setIsMenuOpen(false)}
            style={{
              textDecoration: 'none',
              color:          '#0a1628',
              fontWeight:     '600',
              fontSize:       '20px',
              fontFamily:     'arial',
              borderBottom:   '1px solid #e5e7eb',
              width:          '100%',
              textAlign:      'center',
              paddingBottom:  '12px',
            }}
          >
            {link.name}
          </a>
        ))}

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>

          <CartButton
            onClick={() => { setIsMenuOpen(false); navigate('/cart') }}
          />

          <SignedOut>
            <SignInButton mode="modal">
              <button
                style={ctaButtonStyle}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width:  '42px',
                      height: '42px',
                      border: '2px solid #0a1628',
                    },
                  },
                }}
              />
            </div>
          </SignedIn>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg);   }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

    </header>
  )
}

export default Navbar
