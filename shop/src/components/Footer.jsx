import React, { useState, useEffect } from 'react'

const FooterWithBanner = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // POPUPS
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 600
  const isTablet = screenWidth >= 600 && screenWidth < 1024

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#ffffff' }}>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '240px' : isTablet ? '320px' : '425px',
          overflow: 'hidden',
          background: '#0d2040',
        }}
      >
        <img
          src="/Pictures/cart.png"
          alt="Shamims Abaya"
          style={{
            width: '100%',
            height: '150%',
            objectFit: 'cover',
            objectPosition: 'center top',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isMobile
              ? 'rgba(10,22,40,0.65)'
              : 'linear-gradient(to right, rgba(10,22,40,0.75) 0%, rgba(10,22,40,0.35) 55%, rgba(10,22,40,0.05) 100%)',
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '0 24px' : isTablet ? '0 40px' : '0 64px',
          }}
        >
          <p
            style={{
              fontSize: isMobile ? '22px' : isTablet ? '28px' : '38px',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0 0 10px 0',
              lineHeight: 1.3,
              maxWidth: '580px',
            }}
          >
            "Dress with Grace.{' '}
            <span style={{ color: '#7eb8f7' }}>
              Walk with Confidence.
            </span>"
          </p>

          <p
            style={{
              fontSize: isMobile ? '10px' : '13px',
              color: '#ffffff',
              margin: 0,
              letterSpacing: isMobile ? '2px' : '4px',
              textTransform: 'uppercase',
            }}
          >
            Shamims Abaya · Nairobi
          </p>
        </div>
      </div>

      <div
        style={{
          background: '#0a1628',
          padding: isMobile
            ? '32px 24px 0 24px'
            : isTablet
            ? '36px 40px 0 40px'
            : '36px 64px 0 64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: '40px',
          }}
        >
          {/* BRAND */}
          <div
            style={{
              width: isMobile ? '100%' : '300px',
            }}
          >
            <div style={{ fontSize: '27px', color: '#c9a84c' }}>
              عَبَايَ
            </div>

            <div
              style={{
                fontSize: isMobile ? '24px' : '30px',
                fontWeight: '700',
                letterSpacing: '6px',
              }}
            >
              SHAMIMS
            </div>

            <div
              style={{
                fontSize: '15px',
                color: '#7eb8f7',
                letterSpacing: '3px',
              }}
            >
              Abaya
            </div>

            <div
              style={{
                width: '32px',
                height: '1px',
                background: '#c9a84c',
                margin: '15px 0',
              }}
            />

            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.8',
              }}
            >
              Crafted for the woman who carries grace in every step.
              Heritage, artistry, and quiet confidence in every stitch.
            </p>
          </div>

          {/* NEWSLETTER */}
          <div
            style={{
              width: isMobile ? '100%' : '400px',
            }}
          >
            <div
              style={{
                fontSize: '19px',
                fontWeight: '700',
                marginBottom: '12px',
              }}
            >
              Join the inner circle
            </div>

            <div
              style={{
                fontSize: '15px',
                color: '#7eb8f7',
                marginBottom: '16px',
                lineHeight: '1.6',
              }}
            >
              New arrivals & exclusive offers — straight to your inbox.
            </div>

            {subscribed ? (
              <div
                style={{
                  color: '#c9a84c',
                }}
              >
                ✦ Thank you — welcome to Shamims Abaya
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <input
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0d2040',
                    border: '1px solid #1e3a5f',
                    borderRight: 'none',
                    padding: '12px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />

                <button
                  onClick={handleSubscribe}
                  style={{
                    background: '#c9a84c',
                    border: 'none',
                    padding: '12px 20px',
                    cursor: 'pointer',
                    fontWeight: '700',
                  }}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTACT */}
        <div
          style={{
            borderTop: '1px solid #1e3a5f',
            marginTop: '35px',
            paddingTop: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ color: '#7eb8f7', fontSize: '11px' }}>
                  EMAIL
                </div>
                <div style={{ fontSize: '14px' }}>
                  manswabjuma58@gmail.com
                </div>
              </div>

              <div>
                <div style={{ color: '#7eb8f7', fontSize: '11px' }}>
                  PHONE
                </div>
                <div style={{ fontSize: '14px' }}>
                  +254 1129 658 20
                </div>
              </div>

              <div>
                <div style={{ color: '#7eb8f7', fontSize: '11px' }}>
                  LOCATION
                </div>
                <div style={{ fontSize: '14px' }}>
                  Nairobi, Kenya
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid #1e3a5f',
              marginTop: '20px',
              padding: '18px 0',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '12px' }}>
              © 2026 Shamims Abaya · All rights reserved
            </span>

            <div
              style={{
                display: 'flex',
                gap: '20px',
              }}
            >
              {/* PRIVACY */}
              <button
                onClick={() => setShowPrivacy(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Privacy Policy
              </button>

              {/* TERMS */}
              <button
                onClick={() => setShowTerms(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Terms
              </button>

              <span style={{ fontSize: '12px' }}>
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>

      {showPrivacy && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              background: '#ffffff',
              borderRadius: '20px',
              padding: '35px',
              color: '#111',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowPrivacy(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                border: 'none',
                background: 'transparent',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <h2
              style={{
                marginTop: 0,
                color: '#0a1628',
              }}
            >
              Privacy Policy
            </h2>

            <p style={{ lineHeight: '1.9', color: '#444' }}>
              At Shamims Abaya, we respect your privacy and protect
              your personal information. Any information collected
              through purchases, subscriptions, or inquiries is used
              only to improve your shopping experience and customer
              support.
            </p>

            <p style={{ lineHeight: '1.9', color: '#444' }}>
              We never sell your personal data to third parties.
              Your information is securely stored and only used for
              communication, deliveries, and promotional updates.
            </p>
          </div>
        </div>
      )}

      {showTerms && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              background: '#ffffff',
              borderRadius: '20px',
              padding: '35px',
              color: '#111',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowTerms(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                border: 'none',
                background: 'transparent',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <h2
              style={{
                marginTop: 0,
                color: '#0a1628',
              }}
            >
              Terms & Conditions
            </h2>

            <p style={{ lineHeight: '1.9', color: '#444' }}>
              By using the Shamims Abaya website, you agree to our
              terms and conditions. All products displayed are
              subject to availability.
            </p>

            <p style={{ lineHeight: '1.9', color: '#444' }}>
              Prices and product details may change without notice.
              Customers are responsible for providing accurate
              shipping and contact information during checkout.
            </p>

            <p style={{ lineHeight: '1.9', color: '#444' }}>
              Unauthorized copying or misuse of our content,
              branding, or product images is prohibited.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FooterWithBanner