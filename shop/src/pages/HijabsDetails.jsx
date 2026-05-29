import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// ── Synced exactly from Hijabs.jsx ──────────────────────────────────────────
const HIJAB_IMAGES = [
  '/Pictures/pic1.png',    '/Pictures/pic4.png',
  '/Pictures/pic5.png',    '/Pictures/hijab15.png',
  '/Pictures/pic6.png',    '/Pictures/pic3.png',
  '/Pictures/pic7.png',    '/Pictures/pic2.png',
  '/Pictures/hijab9.png',  '/Pictures/hijab10.png',
  '/Pictures/hijab11.png', '/Pictures/hijab12.png',
  '/Pictures/hijab13.png', '/Pictures/pic2.png',
  '/Pictures/hijab16.png', '/Pictures/hijab17.png',
];

const HIJAB_PRICES = [
  { price: 500,  originalPrice: 650  }, { price: 500,  originalPrice: 600  },
  { price: 500,  originalPrice: 650  }, { price: 550,  originalPrice: 650  },
  { price: 550,  originalPrice: 650  }, { price: 500,  originalPrice: 650  },
  { price: 650,  originalPrice: 900  }, { price: 600,  originalPrice: 750  },
  { price: 750,  originalPrice: 1050 }, { price: 1000, originalPrice: 1300 },
  { price: 850,  originalPrice: 1150 }, { price: 950,  originalPrice: 1250 },
  { price: 700,  originalPrice: 950  }, { price: 600,  originalPrice: 750  },
  { price: 800,  originalPrice: 1100 }, { price: 1300, originalPrice: 1600 },
];

const HIJAB_NAMES = [
  'Instant', 'Instant', 'Plisket', 'Crinkle',
  'Chiffon', 'Chiffon', 'Chiffon', 'Chador',
  'Pleated', 'Satin',   'Pashmina','Pashmina',
  'Colored', 'Shimmer', 'Chiffon', 'Jersey',
];

const HIJAB_DESCRIPTIONS = [
  "A silky smooth hijab in classic black — lightweight, breathable, and versatile enough for both casual days and formal occasions.",
  "A soft chiffon hijab in warm ivory, offering effortless drape and a delicate, feminine look perfect for special events.",
  "A jersey hijab in deep navy — stretchy, comfortable, and easy to style, ideal for everyday wear with a polished finish.",
  "A printed hijab featuring subtle floral motifs in blush tones — a romantic, eye-catching piece that adds personality to any outfit.",
  "A luxurious satin hijab in emerald green, offering a smooth, glossy finish that elevates any modest ensemble to evening-ready glamour.",
  "A textured georgette hijab in dusty rose — slightly sheer with a beautiful flow, perfect for layering and styling creatively.",
  "A breathable cotton hijab in soft white — the everyday essential that keeps you cool, modest, and effortlessly put-together.",
  "A bold hijab in rich burgundy with a subtle shimmer weave — ideal for winter gatherings, celebrations, or making a statement.",
  "A pastel lilac hijab crafted from premium modal fabric — ultra-soft against the skin with a natural, matte finish.",
  "A classic camel-toned hijab in crepe fabric — neutral, sophisticated, and the perfect complement to earth-toned outfits.",
  "A hijab in sky blue with delicate lace trim along the edge — a charming detail that adds elegance without overwhelming the look.",
  "A warm mustard hijab in lightweight viscose — vibrant, versatile, and a beautiful pop of colour for neutral or monochrome outfits.",
  "A stone grey hijab in a relaxed woven fabric — understated, modern, and pairs seamlessly with both casual and professional styles.",
  "A deep forest green hijab in satin-chiffon blend — rich in colour with a refined sheen that works beautifully for formal occasions.",
  "A hijab in warm terracotta with a subtle texture — earthy, on-trend, and perfect for autumn styling or everyday modest fashion.",
  "A soft coral hijab in premium jersey fabric — stretchy, secure, and comfortable for long days while keeping your style vibrant.",
];

// ────────────────────────────────────────────────────────────────────────────

const HijabsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const hijabs = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    image: HIJAB_IMAGES[i],
    name: HIJAB_NAMES[i],
    price: HIJAB_PRICES[i].price,
    originalPrice: HIJAB_PRICES[i].originalPrice,
    description: HIJAB_DESCRIPTIONS[i],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    material: 'Premium Chiffon / Jersey Fabric',
    origin: 'Handcrafted with Care',
  }));

  const product = hijabs.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(
      item => item.id === product.id && item.size === selectedSize && item.category === 'hijab'
    );

    let updatedCart;
    if (itemIndex !== -1) {
      updatedCart = [...existingCart];
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart = [...existingCart, {
        ...product,
        size: selectedSize,
        category: 'hijab',
        quantity: 1,
      }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setAddedToCart(true);
    setTimeout(() => navigate('/cart'), 800);
  };

  const fmt = (n) => `Ksh ${n.toLocaleString()}`;

  if (!product) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '60vh', fontFamily: 'serif'
      }}>
        <p>Product not found.</p>
        <button onClick={() => navigate('/hijabs')}>Back to Hijabs</button>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'Georgia, serif' }}>

      {/* Breadcrumb */}
      <div style={{
        padding: '16px 6%', borderBottom: '1px solid #eee',
        backgroundColor: '#fff', display: 'flex', gap: '8px', fontSize: '0.85rem'
      }}>
        <span onClick={() => navigate('/')} style={{ color: '#888', cursor: 'pointer' }}>Home</span>
        <span style={{ color: '#ccc' }}>›</span>
        <span onClick={() => navigate('/hijabs')} style={{ color: '#888', cursor: 'pointer' }}>Hijabs</span>
        <span style={{ color: '#ccc' }}>›</span>
        <span style={{ color: '#111', fontWeight: '600' }}>{product.name}</span>
      </div>

      {/* Main content */}
      <div style={{
        display: 'flex', gap: '48px', padding: '48px 6%',
        maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap'
      }}>

        {/* Image */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px' }}>
          <div style={{
            position: 'relative', backgroundColor: '#f0ede8', borderRadius: '16px',
            overflow: 'hidden', aspectRatio: '3/4',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {discount > 0 && (
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                backgroundColor: '#ef4444', color: '#fff', borderRadius: '8px',
                fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px'
              }}>
                -{discount}% OFF
              </div>
            )}
            <button
              onClick={() => setLiked(!liked)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: '#fff', border: 'none', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '20px'
              }}
            >
              {liked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div>
            <p style={{
              color: '#888', fontSize: '0.75rem', letterSpacing: '2px',
              textTransform: 'uppercase', marginBottom: '8px'
            }}>
              Exclusive Hijab
            </p>
            <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '700', color: '#111' }}>
              {product.name}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '700' }}>{fmt(product.price)}</span>
            <span style={{ color: '#f87171', textDecoration: 'line-through' }}>{fmt(product.originalPrice)}</span>
          </div>

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>
              Description
            </p>
            <p style={{ color: '#555', lineHeight: '1.7', margin: 0 }}>{product.description}</p>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>Material</p>
              <p style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{product.material}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>Origin</p>
              <p style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{product.origin}</p>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          {/* Size selector */}
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>
              Select Size {selectedSize && <span style={{ color: '#2563eb' }}>— {selectedSize}</span>}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '48px', height: '48px', borderRadius: '10px',
                    border: selectedSize === size ? '2px solid #111' : '1px solid #ddd',
                    backgroundColor: selectedSize === size ? '#111' : '#fff',
                    color: selectedSize === size ? '#fff' : '#111',
                    fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              style={{
                flex: 2, padding: '16px', borderRadius: '30px', border: 'none',
                backgroundColor: !selectedSize ? '#ccc' : (addedToCart ? '#16a34a' : '#111'),
                color: '#fff', fontSize: '1rem', fontWeight: '700',
                cursor: selectedSize ? 'pointer' : 'not-allowed', transition: '0.3s',
              }}
            >
              {addedToCart ? '✓ Item Added' : 'Add to Cart'}
            </button>
            <button
              onClick={() => navigate('/hijabs')}
              style={{
                flex: 1, padding: '16px', borderRadius: '300px',
                border: '1px solid #ddd', backgroundColor: '#fff',
                fontWeight: '600', cursor: 'pointer'
              }}
            >
              Back
            </button>
          </div>

          {!selectedSize && (
            <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>
              * Please select your size to continue
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default HijabsDetails;
