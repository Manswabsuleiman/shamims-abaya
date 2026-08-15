import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// ── IMAGES (matches the product listing page) ──────────────────────────
// Images must live in public/Pictures/ — files served from "public" are
// referenced WITHOUT the "public" segment in the URL, so paths start with "/Pictures/...".
const ABAYA_IMAGES = [
  '/Pictures/d23.png',
  '/Pictures/d2.png',
  '/Pictures/d3.png',
  '/Pictures/d4.png',
  '/Pictures/d5.png',
  '/Pictures/d6.png',
  '/Pictures/d7.png',
  '/Pictures/d8.png',
  '/Pictures/d9.png',
  '/Pictures/d10.png',
  '/Pictures/d11.png',
  '/Pictures/d12.png',
  '/Pictures/dress13.png',
  '/Pictures/dress14.png',
  '/Pictures/crop.png',
  '/Pictures/Tops.png',
  '/Pictures/Tops2.png',
  '/Pictures/d15.png',
  '/Pictures/d16.png',
  '/Pictures/d1.png',
  '/Pictures/d17.png',
  '/Pictures/d18.png',
  '/Pictures/d19.png',
  '/Pictures/d20.png',
];

// ── NAME OVERRIDES (matches the product listing page) ──────────────────
// Keyed by product id (1-based). Anything not listed falls back to `Dress ${id}`.
const ABAYA_NAME_OVERRIDES = {
  15: 'Girlie Tops',
  16: 'Girlie Tops',
  17: 'Girlie Tops',
  23: 'Animal Print',
};

// ── PRODUCT DESCRIPTIONS ────────────────────────────────────────────────
// Index 14, 15, 16 (Girlie Tops) and index 22 (Animal Print) have their own
// descriptions matching their actual product type.
const ABAYA_DESCRIPTIONS = [
  "A classic black dress with subtle embroidery along the cuffs, offering a refined and modest look perfect for daily wear or formal gatherings.",
  "Flowing chiffon layers in a deep midnight hue, this dress brings effortless elegance to any occasion with its airy, lightweight feel.",
  "A modern open-front dress with a clean-cut silhouette, ideal for the contemporary woman who values both style and comfort.",
  "Adorned with delicate pearl detailing along the front, this dress merges classic tradition with a soft feminine touch.",
  "Rich velvet fabric meets modest fashion in this luxurious dress, designed for special occasions and evening events.",
  "A crisp white dress with fine golden trim along the hem and sleeves — a stunning choice for weddings and celebratory gatherings.",
  "Soft pastel tones and a relaxed fit make this dress the perfect companion for casual outings and weekend wear.",
  "Featuring intricate floral lacework on the shoulders, this dress is a true statement piece for those who love artisanal detail.",
  "A structured kaftan-style dress in deep burgundy, offering a regal silhouette that commands attention at formal events.",
  "Lightweight cotton fabric meets minimal design in this everyday dress — breathable, comfortable, and effortlessly stylish.",
  "A wrap-style dress in black, combining earthy tones with a flattering adjustable fit for all body types.",
  "Embellished with hand-sewn crystal details along the neckline, this dress radiates glamour and sophistication for special nights.",
  "A cape-style dress featuring layered fabric that flows beautifully with every step — modern, dramatic, and undeniably chic.",
  "Soft grey tones and a relaxed wide-sleeve design give this dress a contemporary, minimalist appeal suited for the modern wardrobe.",
  "A playful crop top in a soft breathable fabric, cut for an easy, flattering fit — perfect for pairing with your favorite skirts or high-waisted bottoms.",
  "A cute, girly top with a flirty silhouette and delicate detailing, designed to bring effortless charm to your everyday looks.",
  "This girlie top features a soft feminine cut with a relaxed fit, ideal for layering or wearing solo on warm, casual days.",
  "Deep navy blue fabric with a subtle satin sheen, this dress offers a polished look that transitions seamlessly from day to night.",
  "Featuring traditional geometric embroidery inspired by East African heritage, this dress is a celebration of culture and craft.",
  "A tiered hem dress in warm caramel tones, adding dimension and movement to a classic silhouette for a fresh, modern feel.",
  "A pleated front dress in soft blush pink — romantic, refined, and ideal for garden parties or intimate celebrations.",
  "Made from premium crepe fabric with a V-neckline and bell sleeves, this dress strikes the perfect balance between modest and modern.",
  "A bold animal print piece that turns heads wherever you go — statement-making, fierce, and effortlessly on-trend for the fashion-forward.",
  "The newest addition to our collection — a bold embroidered dress with rich color-blocked panels, blending artistry with modern modest fashion.",
];

// ── PRICE LIST (matches the product listing page) ──────────────────────
const ABAYA_PRICES = [
  { price: 1200, originalPrice: 1400 }, { price: 1500, originalPrice: 1800 },
  { price: 1000, originalPrice: 1500 }, { price: 1000, originalPrice: 1500 },
  { price: 1500, originalPrice: 2200 }, { price: 1500, originalPrice: 2200 },
  { price: 1500, originalPrice: 1700 }, { price: 1500, originalPrice: 1700 },
  { price: 2200, originalPrice: 1900 }, { price: 2200, originalPrice: 1900 },
  { price: 1500, originalPrice: 1900 }, { price: 1500, originalPrice: 1900 },
  { price: 1000, originalPrice: 1200 }, { price: 1000, originalPrice: 1200 },
  { price: 1500, originalPrice: 1800 }, { price: 1500, originalPrice: 1800 },
  { price: 2200, originalPrice: 2600 }, { price: 2200, originalPrice: 2600 },
  { price: 1700, originalPrice: 2000 }, { price: 1700, originalPrice: 2000 },
  { price: 1000, originalPrice: 1300 }, { price: 1000, originalPrice: 1300 },
  { price: 1300, originalPrice: 1600 }, { price: 1300, originalPrice: 1600 },
];


const ABAYA_IMAGES = Array.from({ length: 23 }, (_, i) => `/Pictures/Abbaya${i + 1}.png`);
ABAYA_IMAGES.push(`/Pictures/i24.png`);


const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const abayas = Array.from({ length: 24 }, (_, i) => {
    const productId = i + 1;
    return {
      id: productId,
      image: ABAYA_IMAGES[i],
      name: ABAYA_NAME_OVERRIDES[productId] || `Dress ${productId}`,
      price: ABAYA_PRICES[i].price,
      originalPrice: ABAYA_PRICES[i].originalPrice,
      description: ABAYA_DESCRIPTIONS[i],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      material: 'Premium Nida Fabric',
      origin: 'Handcrafted in UAE',
    };
  });

  const product = abayas.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === product.id && item.size === selectedSize);
    
    let updatedCart;
    if (itemIndex !== -1) {
      updatedCart = [...existingCart];
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart = [...existingCart, { 
        ...product, 
        size: selectedSize, 
        quantity: 1 
      }];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setAddedToCart(true);
    setTimeout(() => navigate('/cart'), 800);
  };

  const fmt = (n) => `Ksh ${n.toLocaleString()}`;

  if (!product) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: 'serif' }}>
        <p>Product not found.</p>
        <button onClick={() => navigate('/')}>Back Home</button>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'Georgia, serif' }}>


      <div style={{ padding: '16px 6%', borderBottom: '1px solid #eee', backgroundColor: '#fff', display: 'flex', gap: '8px', fontSize: '0.85rem' }}>
        <span onClick={() => navigate('/')} style={{ color: '#888', cursor: 'pointer' }}>Home</span>
        <span style={{ color: '#ccc' }}>›</span>
        <span onClick={() => navigate('/abaya')} style={{ color: '#888', cursor: 'pointer' }}>Abayas</span>
        <span style={{ color: '#ccc' }}>›</span>
        <span style={{ color: '#111', fontWeight: '600' }}>{product.name}</span>
      </div>

      <div style={{ display: 'flex', gap: '48px', padding: '48px 6%', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px' }}>
          <div style={{ position: 'relative', backgroundColor: '#f0ede8', borderRadius: '16px', overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {discount > 0 && (
              <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#ef4444', color: '#fff', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px' }}>
                -{discount}% OFF
              </div>
            )}
            <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '20px' }}>
              {liked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Exclusive Piece</p>
            <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '700', color: '#111' }}>{product.name}</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '700' }}>{fmt(product.price)}</span>
            <span style={{ color: '#f87171', textDecoration: 'line-through' }}>{fmt(product.originalPrice)}</span>
          </div>

          <div style={{ height: '1px', backgroundColor: '#eee' }} />

          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>Description</p>
            <p style={{ color: '#555', lineHeight: '1.7', margin: 0 }}>{product.description}</p>
          </div>

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
                    fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              style={{
                flex: 2, padding: '16px', borderRadius: '30px', border: 'none',
                backgroundColor: !selectedSize ? '#ccc' : (addedToCart ? '#16a34a' : '#111'),
                color: '#fff', fontSize: '1rem', fontWeight: '700', cursor: selectedSize ? 'pointer' : 'not-allowed',
                transition: '0.3s'
              }}
            >
              {addedToCart ? '✓ Item Added' : 'Add to Cart'}
            </button>
            <button
              onClick={() => navigate('/abaya')}
              style={{ flex: 1, padding: '16px', borderRadius: '300px', border: '1px solid #ddd', backgroundColor: '#fff', fontWeight: '600', cursor: 'pointer' }}
            >
              Back
            </button>
          </div>

          {!selectedSize && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>* Please select your size to continue</p>}
        </div>
      </div>
    </div>
  );
};

export default Details;
