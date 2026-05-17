import { useState, useRef, useEffect } from "react";

const QA_PAIRS = [

  { keywords: ["what is shamims", "about shamims", "tell me about", "who are you", "what do you do", "shamims abaya"],
    answer: "Shamims Abaya is a premium modest fashion brand specialising in high-quality abayas, hijabs, and Islamic fashion. We curate elegant, stylish, and modest clothing for women who value grace and quality. Our collections blend traditional design with modern aesthetics." },

  { keywords: ["where are you located", "location", "address", "where is shamims", "find you", "where can i find"],
    answer: "Shamims Abaya is based in Nairobi, Kenya. We serve customers across East Africa and ship internationally. You can find us online through our website and social media platforms, or visit our physical showroom — contact us for directions!" },

  { keywords: ["contact", "reach you", "phone", "email", "whatsapp", "get in touch"],
    answer: "You can reach us via:\n📱 WhatsApp: +254 700 000 000\n📧 Email: info@shaminabaya.com\n📸 Instagram: @shamims_abaya\n🌐 Website: www.shaminabaya.com\n\nOur team is available Monday–Saturday, 8am–8pm EAT." },
    {
  keywords: ["hey", "hi", "hello", "yo", "good morning", "good afternoon", "good evening"],
  answer: "Hey 👋 Welcome to Shamims Abaya! 🌸\n\nHow can I help you today? You can ask about our abayas, hijabs, delivery, prices, sizes, or new arrivals."
},

  { keywords: ["what do you sell", "products", "what items", "collections", "catalogue", "what you have"],
    answer: "Our full product range includes:\n\n👗 Abayas — classic, embroidered, open-front, kimono styles\n🧕 Hijabs — chiffon, instant, pashmina, jersey, satin, crinkle, plisket\ns\n✨ and matching sets\n\nAll items are crafted with premium fabrics and attention to detail." },

  { keywords: ["abaya", "abayas", "abaya collection", "abaya styles", "types of abaya"],
    answer: "Our Abaya collection features:\n\n• Classic Black Abaya — timeless and elegant\n• Embroidered Abaya — intricate gold/silver thread detailing\n• Open-Front Kimono Abaya — flowy and modern\n• Crepe Abaya — structured and wrinkle-resistant\n• Linen Abaya — lightweight and breathable (perfect for Nairobi weather!)\n• Occasion Abayas — for weddings, events, and Eid\n\nSizes range from XS to 3XL. Custom sizing also available." },

  { keywords: ["hijab", "hijabs", "hijab collection", "types of hijab", "scarf"],
    answer: "Our Hijab collection includes:\n\n🌸 Instant Hijab — easy pull-on style, great for everyday wear\n🌸 Chiffon Hijab — light, flowy, perfect for occasions\n🌸 Pashmina — warm, soft, and luxurious\n🌸 Jersey Hijab — stretchy and comfortable\n🌸 Satin Hijab — silky finish for formal events\n🌸 Crinkle Hijab — textured, trendy, and forgiving\n🌸 Plisket Hijab — pleated, elegant drape\n\nAvailable in 30+ colours including pastels, nudes, and bold tones." },

  { keywords: ["bag", "bags", "luxury bag", "handbag", "purse", "tote"],
    answer: "Our Luxury Bag collection is a curated selection of premium handbags including:\n\n👜 Structured handbags\n👜 Shoulder bags\n👜 Tote bags\n👜 Crossbody bags\n👜 Evening clutches\n\nAll bags are selected for quality craftsmanship and stylish design, perfect for completing any modest outfit." },

  { keywords: ["price", "prices", "cost", "how much", "pricing", "rate", "charge", "ksh", "afford"],
    answer: "Here's a general price guide for our collections:\n\n👗 Abayas: Ksh 2,500 – Ksh 8,500\n🧕 Hijabs: Ksh 650 – Ksh 1,300\–ccessories: Ksh 200 – Ksh 800\n\nPrices vary based on fabric, style, and embellishment. We regularly run flash sales with up to 40% off! 🔥" },

  { keywords: ["abaya price", "abaya cost", "how much is abaya", "abaya ksh"],
    answer: "Our Abaya prices range from:\n\n• Basic/everyday abayas: Ksh 2,500 – Ksh 3,500\n• Mid-range with detailing: Ksh 3,500 – Ksh 5,500\n• Premium embroidered abayas: Ksh 5,500 – Ksh 8,500\n• Custom/made-to-order: From Ksh 4,000\n\nPrices include quality fabrics such as crepe, chiffon, and linen." },

  { keywords: ["hijab price", "hijab cost", "how much is hijab", "hijab ksh"],
    answer: "Hijab prices at Shamims Abaya:\n\n• Instant Hijab: Ksh 850 – Ksh 950\n• Chiffon Hijab: Ksh 800 – Ksh 1,200\n• Pashmina: Ksh 950 – Ksh 1,300\n• Jersey Hijab: Ksh 650 – Ksh 900\n• Satin Hijab: Ksh 1,000 – Ksh 1,200\n• Crinkle Hijab: Ksh 700 – Ksh 1,050\n• Plisket Hijab: Ksh 700 – Ksh 1,100\n\nSale prices often lower by 20–40%!" },

  { keywords: ["bag price", "bag cost", "how much is bag", "bag ksh", "purse price"],
    answer: "Crossbody bags: Ksh 3,500 – Ksh 5,000\n: Ksh 4,500 – Ksh 7,000\n•Ksh 3,000 – Ksh 5,500\n• Ksh 6,000 – Ksh 10,000\n• Evening clutches: Ksh 2,500 – Ksh 4,500\n• Premium/designer-inspired: Ksh 8,000 – Ksh 15,000" },

  // Discounts & Sales
  { keywords: ["discount", "sale", "offer", "promo", "promotion", "flash sale", "deal", "cheap", "cheaper"],
    answer: "Yes! We love treating our customers 🎉\n\n🔥 Flash Sales — up to 40% off select items, time-limited\n🏷️ Seasonal Sales — Eid, Ramadan, and end-of-season clearance\n💌 Loyalty Discounts — returning customers get exclusive deals\n📲 Follow us on Instagram @shamims_abaya for real-time sale alerts\n\nCurrent flash sale: Hijabs from Ksh 650 and Abayas from Ksh 2,500!" },

  { keywords: ["ramadan", "eid", "special occasion", "festive", "holiday collection"],
    answer: "For Ramadan and Eid we launch special collections featuring:\n\n✨ Embellished occasion abayas\n✨ Soft pastel hijab sets\n✨ Matching abaya & hijab gift sets\n✨ Special Ramadan pricing and bundles\n\nRamadan collections typically launch 3 weeks before Ramadan begins. Follow us on Instagram to be first to know! 🌙" },

  // Ordering & Shopping
  { keywords: ["how to order", "place order", "buy", "purchase", "shop", "ordering", "how do i buy"],
    answer: "Ordering from Shamims Abaya is easy:\n\n1️⃣ Browse our website or Instagram for items you love\n2️⃣ WhatsApp us at +254 700 000 000 with your order\n3️⃣ Confirm your size, colour, and delivery details\n4️⃣ Make payment via M-Pesa, bank transfer, or card\n5️⃣ We process and dispatch within 1–2 business days\n\nYou can also order directly through our website shopping cart!" },

  { keywords: ["online", "website", "online shop", "e-commerce", "web"],
    answer: "Yes! You can shop online at www.shaminabaya.com\n\n🛒 Browse full catalogue with photos and prices\n🛒 Add to cart and checkout securely\n🛒 Pay via M-Pesa, Visa, or Mastercard\n🛒 Track your order from dispatch to delivery\n\nOur website also features new arrivals and exclusive online-only deals!" },

  // Payment
  { keywords: ["payment", "pay", "mpesa", "how to pay", "accepted payment", "payment method", "visa", "card"],
    answer: "We accept the following payment methods:\n\n📱 M-Pesa (Till/Paybill — details shared at checkout)\n💳 Visa & Mastercard (online)\n🏦 Bank Transfer (details on request)\n💵 Cash on Delivery (Nairobi CBD area only)\n\nAll transactions are secure and you receive a confirmation receipt after payment." },

  { keywords: ["installment", "pay later", "credit", "deposit", "layaway"],
    answer: "We offer flexible payment plans for purchases above Ksh 5,000!\n\n💰 Pay a 50% deposit to reserve your item\n💰 Balance due before/on delivery\n💰 Available for abayas, bags, and bulk orders\n\nContact us on WhatsApp to arrange a payment plan that works for you." },

  // Delivery & Shipping
  { keywords: ["delivery", "shipping", "how long", "when will i receive", "dispatch", "arrive", "ship"],
    answer: "Our delivery options:\n\n🚗 Nairobi CBD & Environs: Same-day or next-day delivery — Ksh 200–350\n📦 Within Kenya (other counties): 2–4 business days via courier — Ksh 400–600 \n\nAll orders are packaged carefully in branded boxes. You receive a tracking number once dispatched!" },

  { keywords: ["nairobi delivery", "deliver nairobi", "local delivery", "same day"],
    answer: "For Nairobi customers:\n\n⚡ Same-day delivery available for orders placed before 12pm\n🚗 Next-day delivery for afternoon orders\n📍 We deliver to all Nairobi estates and surrounding areas\n💰 Delivery fee: Ksh 200–350 depending on location\n\nFor CBD pickups, you can also collect from our showroom at no delivery charge!" },

  { keywords: ["international", "outside kenya", "diaspora", "uk", "usa", "dubai", "abroad"],
    answer: "Yes, we ship internationally! 🌍\n\nPopular destinations we ship to:\n✈️ UAE / Dubai — 5–7 days\n✈️ UK & Europe — 7–10 days\n✈️ USA & Canada — 10–14 days\n✈️ Australia — 12–16 days\n\nShipping costs calculated at checkout based on weight and destination. International customers also love our Eid collection bundles!" },

  // Sizes & Fitting
  { keywords: ["size", "sizes", "sizing", "measurements", "fit", "plus size", "petite", "tall", "xl", "xxl"],
    answer: "We cater to all body types! 🌸\n\nAvailable sizes:\n• XS (Size 6–8)\n• S (Size 8–10)\n• M (Size 10–12)\n• L (Size 12–14)\n• XL (Size 14–16)\n• XXL (Size 16–18)\n• 3XL (Size 18–20)\n\nCustom sizing available — provide your measurements and we'll tailor to fit.\nSize guide available on our website and we're happy to help you choose via WhatsApp!" },

  { keywords: ["custom", "customise", "tailor", "made to measure", "bespoke", "personalise"],
    answer: "Yes! We offer custom-made and personalised orders 🪡\n\n✂️ Custom abayas tailored to your exact measurements\n🎨 Choose your fabric, colour, and embellishments\n🪡 Monogramming and embroidery available\n⏱️ Custom orders take 5–10 business days\n\nCustom orders start from Ksh 4,000. WhatsApp us your requirements and measurements to get started!" },

  // Returns & Quality
  { keywords: ["return", "exchange", "refund", "wrong item", "damaged", "faulty", "return policy"],
    answer: "Your satisfaction is our priority! Here's our returns policy:\n\n✅ Exchange within 7 days of delivery for wrong size/colour\n✅ Full refund for damaged or faulty items\n✅ Items must be unworn, unwashed, with tags intact\n❌ No returns on custom/personalised orders\n❌ No returns on sale items (exchange only)\n\nContact us within 48 hours of receiving your order if there's an issue." },

  { keywords: ["quality", "material", "fabric", "good quality", "authentic", "genuine"],
    answer: "Quality is at the heart of everything we do at Shamims Abaya! 🌟\n\nOur fabrics include:\n🧵 Premium crepe — smooth, structured, wrinkle-resistant\n🧵 High-quality chiffon — light and flowy\n🧵 Soft jersey — comfortable stretch fabric\n🧵 Linen — breathable for warm weather\n🧵 Satin — lustrous finish for occasions\n🧵 Pashmina wool blend — warm and luxurious\n\nAll abayas are finished with quality stitching, lining, and hand-checked before dispatch." },

  // New Arrivals & Collections
  { keywords: ["new arrival", "new collection", "latest", "new in", "trending", "what's new"],
    answer: "New arrivals drop every 2 weeks at Shamims Abaya! 🛍️\n\nCurrent highlights:\n✨ Summer chiffon hijab collection — light pastels and florals\n✨ Premium embroidered abayas — limited edition\n✨ Structured tote bag collection — 10 new designs\n✨ Matching abaya & hijab co-ord sets\n\nFollow us on Instagram @shamims_abaya to see new arrivals first and get early access links!" },

  { keywords: ["colour", "color", "colors", "colours", "available colours", "what colours"],
    answer: "We offer a wide range of colours across all product lines:\n\n🤍 Neutrals: Black, White, Cream, Beige, Camel\n🌸 Pastels: Blush pink, Dusty rose, Sage green, Baby blue, Lavender\n💙 Bold tones: Navy, Burgundy, Forest green, Royal blue\n🤎 Earth tones: Brown, Tan, Olive, Rust\n✨ Special: Gold detailing, Silver embroidery options\n\nColour availability varies by product. Check individual listings or WhatsApp us for current stock." },

  // Care & Maintenance
  { keywords: ["wash", "care", "clean", "maintenance", "how to wash", "washing"],
    answer: "Care instructions for your Shamims Abaya pieces:\n\n🧺 Abayas: Hand wash or gentle machine cycle in cold water. Hang to dry. Iron on low heat inside out.\n🧕 Hijabs: Hand wash gently with mild detergent. Do not tumble dry.\n👜 Bags: Wipe with damp cloth only. Avoid submerging in water.\n\n💡 Tip: Store abayas on hangers to maintain shape. Keep bags stuffed to retain structure." },

  // Wholesale & Bulk
  { keywords: ["wholesale", "bulk", "bulk order", "resell", "reseller", "business", "stock"],
    answer: "We welcome wholesale and bulk orders! 🤝\n\nWholesale benefits:\n💼 Minimum order: 10 pieces\n💰 Wholesale pricing: 20–35% below retail\n🚚 Priority dispatch and packaging\n🏷️ White-label/branding options available\n\nFor wholesale enquiries, WhatsApp us at +254 700 000 000 with your requirements. We supply boutiques, online shops, and market vendors across Kenya and East Africa." },

  // Social Media & Community
  { keywords: ["instagram", "social media", "follow", "facebook", "tiktok", "platform"],
    answer: "Stay connected with us! 📲\n\n📸 Instagram: @shamims_abaya — daily outfit inspo, new arrivals, behind the scenes\n👥 Facebook: Shamims Abaya — community, reviews, live sales\n🎵 TikTok: @shamims_abaya — styling videos and hauls\n💬 WhatsApp Broadcast: Send 'JOIN' to +254 700 000 000 for exclusive deals\n\nTag us in your outfits with #ShaminsBella for a chance to be featured! 🌸" },

  // Goodbye / Thank you detection
  { keywords: ["bye", "goodbye", "thank you", "Hello", "Hey", "thanks", "that's all", "thats all", "done", "no more questions", "finished", "all good", "okay thanks", "ok thanks", "cheers", "appreciate"],
    answer: "THANK_YOU_MESSAGE" },
];

const THANK_YOU = "Thank you so much for chatting with us at Shamims Abaya! 😊🌸\n\nWe truly appreciate your time and hope we answered all your questions. Whether you're shopping for an abaya, a beautiful hijab, or a luxury bag — we're always here to help you look and feel your best.\n\nDon't forget to follow us on Instagram @shamims_abaya for new arrivals, flash sales, and outfit inspiration!\n\nWishing you a wonderful day. Until next time! 💙✨\n\n— The Shamims Abaya Team 🌹";

const FALLBACK = "Thank you for your question! 😊 I don't have a specific answer for that right now, but our team would love to help.\n\n📱 WhatsApp us: +254 757 080 514\n📧 Email: shamimsabaya@gmail.com\n\nWe're available Monday–Saturday, 8am–8pm EAT. Is there anything else I can help you with?";

function getAnswer(userInput) {
  const text = userInput.toLowerCase();
  for (const qa of QA_PAIRS) {
    if (qa.keywords.some(kw => text.includes(kw))) {
      return qa.answer === "THANK_YOU_MESSAGE" ? THANK_YOU : qa.answer;
    }
  }
  return FALLBACK;
}

const SUGGESTIONS = [
  { icon: "🔥", label: "What do you sell?" },
  { icon: "💰", label: "What are your prices?" },
  { icon: "🚚", label: "How does delivery work?" },
  { icon: "📏", label: "What sizes do you have?" },
];

const HISTORY_ITEMS = [
  {
    id: 1,
    title: "Abaya fabric suppliers in UAE",
    time: "2 min ago",
    hasImages: true,
    images: [
      "public/Pictures/Abbaya1.png", "public/Pictures/Abbaya2.png",
      "public/Pictures/Abbaya3.png", "public/Pictures/Abbaya4.png",
      "public/Pictures/Abbaya5.png", "public/Pictures/Abbaya6.png",
      "public/Pictures/Abbaya7.png", "public/Pictures/Abbaya8.png",
      "public/Pictures/Abbaya9.png", "public/Pictures/Abbaya10.png",
      "public/Pictures/Abbaya11.png", "public/Pictures/Abbaya12.png",
      "public/Pictures/Abbaya13.png", "public/Pictures/Abbaya14.png",
      "public/Pictures/Abbaya15.png",
    ],
    imageCaption: "Abaya Fabric Suppliers – UAE Collection",
  },
  {
    id: 4,
    title: "Luxury Hijabs Design",
    time: "2 days ago",
    hasImages: true,
    images: [
      "public/Pictures/hijab5.png", "public/Pictures/hijab6.png",
      "public/Pictures/hijab7.png", "public/Pictures/hijab8.png",
      "public/Pictures/hijab10.png", "public/Pictures/hijab11.png",
      "public/Pictures/hijab12.png", "public/Pictures/hijab13.png",
      "public/Pictures/hijab16.png", "public/Pictures/hijab17.png",
      "public/Pictures/hijab15.png", "public/Pictures/ban2.png",
    ],
    imageCaption: "Luxury Hijabs Design – Curated Collection",
  },
];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body, #root {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    :root {
      --navy: #0b1628;
      --navy-mid: #112240;
      --navy-light: #1a3a5c;
      --blue: #2d7df6;
      --blue-light: #5b9bf8;
      --indigo: #5c6bc0;
      --cream: #ffffff;
      --text-primary: #0f1e32;
      --text-secondary: #4a6080;
      --text-muted: #8ea3bb;
      --border: rgba(45,125,246,0.14);
      --glass: rgba(255,255,255,0.94);
      --glass-strong: rgba(255,255,255,0.98);
      --shadow-blue: 0 4px 24px rgba(45,125,246,0.14);
      --shadow-navy: 0 4px 24px rgba(11,22,40,0.18);
      --rail-w: 56px;
      --panel-w: 240px;
    }

    @keyframes dotPulse {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 1; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer {
      0% { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes thankYouPop {
      0% { opacity:0; transform: scale(0.92) translateY(12px); }
      60% { transform: scale(1.02) translateY(-2px); }
      100% { opacity:1; transform: scale(1) translateY(0); }
    }

    .app-root {
      display: flex;
      height: 100dvh;
      width: 100vw;
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      overflow: hidden;
      position: relative;
    }

    .bg-blob {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }

    /* ── OVERLAY ── */
    .overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(11,22,40,0.52);
      z-index: 40;
      animation: fadeIn 0.22s ease;
      backdrop-filter: blur(2px);
    }
    .overlay.show { display: block; }

    /* ── RAIL ── */
    .rail {
      width: var(--rail-w);
      min-width: var(--rail-w);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0 20px;
      gap: 4px;
      background: var(--navy);
      z-index: 30;
      position: relative;
      flex-shrink: 0;
    }
    .rail-logo {
      width: 34px; height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif;
      font-size: 16px; font-weight: 800; color: #fff;
      margin-bottom: 16px;
      box-shadow: 0 2px 12px rgba(45,125,246,0.4);
      flex-shrink: 0;
    }
    .rail-btn {
      width: 40px; height: 40px;
      border-radius: 10px; border: none;
      background: transparent;
      color: rgba(255,255,255,0.45);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.18s;
      position: relative; flex-shrink: 0;
    }
    .rail-btn:hover, .rail-btn.active {
      background: rgba(45,125,246,0.18);
      color: var(--blue-light);
    }
    .rail-btn.active::before {
      content: '';
      position: absolute; left: -8px; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 22px; border-radius: 2px;
      background: linear-gradient(to bottom, var(--blue), var(--indigo));
    }
    .rail-divider {
      width: 28px; height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 6px 0;
    }
    .rail-avatar {
      margin-top: auto;
      width: 34px; height: 34px; border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 13px; font-weight: 700;
      box-shadow: 0 2px 10px rgba(45,125,246,0.35);
      flex-shrink: 0;
    }

    /* ── SIDE PANEL ── */
    .panel {
      width: var(--panel-w);
      min-width: var(--panel-w);
      display: flex; flex-direction: column;
      background: var(--navy-mid);
      border-right: 1px solid rgba(45,125,246,0.1);
      overflow: hidden;
      transition: width 0.28s cubic-bezier(0.4,0,0.2,1),
                  min-width 0.28s cubic-bezier(0.4,0,0.2,1),
                  opacity 0.2s;
      z-index: 20; flex-shrink: 0;
    }
    .panel.closed { width: 0; min-width: 0; opacity: 0; }

    .panel-inner {
      width: var(--panel-w);
      height: 100%; display: flex; flex-direction: column;
      padding: 20px 14px; overflow-y: auto; overflow-x: hidden;
    }
    .panel-inner::-webkit-scrollbar { width: 3px; }
    .panel-inner::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

    .panel-new-btn {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; border-radius: 10px;
      border: 1px solid rgba(45,125,246,0.25);
      background: rgba(45,125,246,0.1);
      color: var(--blue-light);
      font-family: 'DM Sans', sans-serif;
      font-size: 12px; font-weight: 600; cursor: pointer;
      margin-bottom: 20px; transition: all 0.18s;
      letter-spacing: 0.03em; white-space: nowrap;
    }
    .panel-new-btn:hover {
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      color: #fff; border-color: transparent;
      box-shadow: 0 2px 14px rgba(45,125,246,0.35);
    }

    .panel-section-label {
      display: flex; align-items: center; gap: 7px;
      padding: 5px 6px;
      color: rgba(255,255,255,0.35);
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      margin-bottom: 4px; white-space: nowrap;
    }

    .panel-item {
      display: flex; align-items: flex-start; gap: 8px;
      padding: 8px 10px; border-radius: 9px;
      cursor: pointer; transition: background 0.15s; margin-bottom: 2px;
    }
    .panel-item:hover { background: rgba(45,125,246,0.12); }

    .panel-item-text {
      font-size: 12px; color: rgba(255,255,255,0.7);
      font-weight: 500; line-height: 1.35;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .panel-item-time {
      font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 2px;
    }
    .panel-separator {
      height: 1px; background: rgba(255,255,255,0.06); margin: 12px 0;
    }
    .panel-brand {
      margin-top: auto; padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .panel-brand-sub {
      font-size: 10px; color: rgba(255,255,255,0.25);
      margin-bottom: 3px; letter-spacing: 0.04em;
    }
    .panel-brand-name {
      font-family: 'Playfair Display', serif;
      font-size: 14px; font-weight: 700;
      background: linear-gradient(135deg, var(--blue-light), #a5b4fc);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      white-space: nowrap;
    }

    /* ── MAIN AREA ── */
    .main {
      flex: 1; display: flex; flex-direction: column;
      overflow: hidden; position: relative; z-index: 1; min-width: 0;
    }

    /* ── TOP BAR (mobile) ── */
    .topbar {
      display: none; align-items: center; gap: 10px;
      padding: 12px 16px;
      background: var(--navy);
      border-bottom: 1px solid rgba(45,125,246,0.12);
      flex-shrink: 0; z-index: 5;
    }
    .topbar-logo {
      font-family: 'Playfair Display', serif;
      font-size: 15px; font-weight: 700;
      background: linear-gradient(135deg, var(--blue-light), #a5b4fc);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-right: auto;
    }
    .topbar-icon-btn {
      width: 36px; height: 36px; border-radius: 9px; border: none;
      background: rgba(45,125,246,0.12);
      color: rgba(255,255,255,0.6);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
    }

    /* ── HERO ── */
    .hero {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 32px 20px 24px; overflow-y: auto;
    }
    .hero::-webkit-scrollbar { width: 0; }

    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(22px, 4vw, 40px); font-weight: 800;
      color: var(--text-primary); text-align: center;
      margin-bottom: 10px; line-height: 1.2; max-width: 600px;
    }
    .hero-subtitle {
      font-size: 14px; color: var(--text-secondary);
      text-align: center; margin-bottom: 28px; max-width: 480px;
      line-height: 1.6;
    }
    .hero-title-accent {
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    .suggestion-pills {
      display: flex; flex-wrap: wrap; gap: 8px;
      justify-content: center; margin-top: 18px;
      max-width: 700px; width: 100%;
    }
    .pill-btn {
      padding: 8px 16px; border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--glass);
      color: var(--text-secondary);
      font-size: 12px; font-family: 'DM Sans', sans-serif;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      transition: all 0.18s; backdrop-filter: blur(8px);
      box-shadow: 0 1px 6px rgba(45,125,246,0.07);
    }
    .pill-btn:hover {
      background: rgba(45,125,246,0.1);
      border-color: var(--blue); color: var(--blue);
    }

    /* ── CHAT VIEW ── */
    .chat-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-height: 0; }
    .chat-messages {
      flex: 1; overflow-y: auto;
      padding: 20px 20px 0;
      display: flex; flex-direction: column; gap: 14px;
    }
    .chat-messages::-webkit-scrollbar { width: 3px; }
    .chat-messages::-webkit-scrollbar-thumb { background: rgba(45,125,246,0.18); border-radius: 10px; }

    .msg-row { display: flex; animation: fadeUp 0.3s ease; }
    .msg-row.user { justify-content: flex-end; }
    .msg-row.assistant { justify-content: flex-start; }

    .msg-avatar {
      width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 10px; font-weight: 700;
      margin-right: 8px; margin-top: 3px;
    }

    .msg-bubble {
      max-width: min(72%, 520px);
      padding: 11px 15px; font-size: 14px;
      line-height: 1.65; white-space: pre-wrap;
    }
    .msg-bubble.user {
      border-radius: 18px 18px 4px 18px;
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      color: #fff; box-shadow: 0 2px 14px rgba(45,125,246,0.25);
    }
    .msg-bubble.assistant {
      border-radius: 18px 18px 18px 4px;
      background: var(--glass-strong); color: var(--text-primary);
      box-shadow: var(--shadow-blue); border: 1px solid var(--border);
    }

    /* ── THANK YOU BUBBLE ── */
    .msg-bubble.thankyou {
      border-radius: 18px 18px 18px 4px;
      background: linear-gradient(135deg, #f0f9ff, #fef3f8);
      color: var(--text-primary);
      border: 1.5px solid rgba(45,125,246,0.2);
      box-shadow: 0 4px 24px rgba(45,125,246,0.18);
      animation: thankYouPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
      position: relative;
    }
    .msg-bubble.thankyou::before {
      content: '';
      position: absolute; inset: 0; border-radius: inherit;
      background: linear-gradient(135deg, rgba(45,125,246,0.04), rgba(92,107,192,0.04));
      pointer-events: none;
    }

    .dots-row { display: flex; align-items: center; gap: 10px; animation: fadeUp 0.3s ease; }
    .dots-bubble {
      padding: 12px 16px; border-radius: 18px 18px 18px 4px;
      background: var(--glass-strong);
      display: flex; gap: 5px; align-items: center;
      box-shadow: var(--shadow-blue); border: 1px solid var(--border);
    }
    .dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      animation: dotPulse 1.2s ease-in-out infinite;
    }

    /* ── INPUT BOX ── */
    .input-wrap { padding: 12px 20px 16px; flex-shrink: 0; }
    .input-box {
      width: 100%; max-width: 760px; margin: 0 auto;
      background: var(--glass-strong);
      border-radius: 18px; border: 1.5px solid var(--border);
      box-shadow: var(--shadow-blue);
      padding: 12px 14px 10px; display: block;
    }
    .input-files {
      display: flex; flex-wrap: wrap; gap: 7px;
      margin-bottom: 9px; padding-bottom: 9px;
      border-bottom: 1px solid var(--border);
    }
    .input-file-chip {
      display: flex; align-items: center; gap: 5px;
      background: rgba(45,125,246,0.08);
      border: 1px solid rgba(45,125,246,0.18);
      border-radius: 7px; padding: 4px 9px;
      font-size: 11px; color: #1e40af; font-weight: 600;
    }
    .input-file-rm {
      background: none; border: none; cursor: pointer;
      color: #94a3b8; font-size: 14px; line-height: 1; padding: 0 0 0 3px;
    }
    .input-textarea {
      width: 100%; border: none; resize: none;
      font-size: 14px; color: var(--text-primary);
      background: transparent; font-family: 'DM Sans', sans-serif; line-height: 1.6;
    }
    .input-textarea:focus { outline: none; }
    .input-textarea::placeholder { color: #000; }
    .input-actions {
      display: flex; align-items: center;
      justify-content: space-between; margin-top: 8px;
    }
    .input-attach-btn {
      width: 34px; height: 34px; border-radius: 9px;
      border: 1px solid rgba(45,125,246,0.2);
      background: rgba(45,125,246,0.05); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--text-muted); transition: all 0.18s;
    }
    .input-attach-btn:hover { background: rgba(45,125,246,0.12); color: var(--blue); }
    .input-send-btn {
      width: 34px; height: 34px; border-radius: 50%; border: none;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.18s;
    }
    .input-send-btn.active {
      background: linear-gradient(135deg, var(--blue), var(--indigo));
      color: #fff; cursor: pointer;
      box-shadow: 0 2px 12px rgba(45,125,246,0.4);
    }
    .input-send-btn.inactive {
      background: rgba(45,125,246,0.1); color: var(--text-muted); cursor: not-allowed;
    }

    /* ── GALLERY ── */
    .gallery-card {
      background: var(--glass-strong);
      border-radius: 18px 18px 18px 4px;
      padding: 14px; box-shadow: var(--shadow-blue);
      border: 1px solid var(--border);
      max-width: min(88%, 460px);
      animation: fadeUp 0.4s ease;
    }
    .gallery-title {
      font-size: 12px; font-weight: 700; color: var(--text-primary);
      margin-bottom: 10px; display: flex; align-items: center; gap: 5px;
    }
    .gallery-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; }
    .gallery-cell {
      border-radius: 8px; overflow: hidden;
      border: 1px solid var(--border);
      background: rgba(45,125,246,0.04); aspect-ratio: 1/1;
    }
    .gallery-cell img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .gallery-count { font-size: 10px; color: var(--text-muted); margin-top: 8px; text-align: right; }

    /* ── IMAGE LOADING ── */
    .img-loading-card {
      border-radius: 18px 18px 18px 4px;
      background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
      padding: 18px 22px; display: flex; flex-direction: column;
      gap: 12px; box-shadow: var(--shadow-navy);
      min-width: 230px; animation: fadeUp 0.3s ease;
    }
    .shimmer-tile {
      width: 60px; height: 60px; border-radius: 8px;
      background: linear-gradient(90deg,
        rgba(255,255,255,0.04) 0%,
        rgba(255,255,255,0.11) 50%,
        rgba(255,255,255,0.04) 100%);
      background-size: 400px 100%;
      animation: shimmer 1.6s ease-in-out infinite;
    }

    /* ─── MOBILE ──── */
    @media (max-width: 768px) {
      :root { --panel-w: 270px; }
      .rail { display: none; }
      .topbar { display: flex; }
      .panel {
        position: fixed; top: 0; left: 0;
        height: 100dvh; z-index: 50;
        border-right: none;
        border-radius: 0 20px 20px 0;
        box-shadow: 4px 0 32px rgba(11,22,40,0.38);
        transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.22s;
        width: var(--panel-w) !important;
        min-width: var(--panel-w) !important;
      }
      .panel.closed {
        transform: translateX(-100%); opacity: 1;
        width: var(--panel-w) !important;
        min-width: var(--panel-w) !important;
      }
      .panel.open { transform: translateX(0); }
      .hero { padding: 24px 16px 16px; }
      .hero-title { font-size: clamp(20px, 6vw, 28px); margin-bottom: 8px; }
      .hero-subtitle { font-size: 13px; margin-bottom: 20px; }
      .chat-messages { padding: 14px 14px 0; gap: 12px; }
      .msg-bubble { max-width: 86%; font-size: 13px; }
      .input-wrap { padding: 10px 14px 14px; }
      .gallery-grid { grid-template-columns: repeat(2,1fr); }
      .suggestion-pills { gap: 7px; }
      .pill-btn { font-size: 11px; padding: 7px 13px; }
    }

    @media (max-width: 380px) {
      .hero-title { font-size: 18px; }
      .msg-bubble { font-size: 12px; padding: 9px 12px; }
      .gallery-grid { grid-template-columns: repeat(2,1fr); }
    }
  `}</style>
);

const QUICK_QUESTIONS = [
  { icon: "👗", text: "What abayas do you have?" },
  { icon: "🧕", text: "Tell me about your hijabs" },
  { icon: "💰", text: "What are your prices?" },
  { icon: "🚚", text: "How does delivery work?" },
  { icon: "📏", text: "What sizes do you have?" },
  { icon: "🔄", text: "What is your return policy?" },
  { icon: "💳", text: "How can I pay?" },
  { icon: "🌍", text: "Do you ship internationally?" },
  { icon: "✂️", text: "Do you do custom orders?" },
  { icon: "🏷️", text: "Do you have any discounts?" },
  { icon: "📱", text: "How do I contact you?" },
  { icon: "🌙", text: "Do you have Ramadan specials?" },
];

export default function App() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [input, setInput] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);
  const chatEndRef   = useRef(null);
  const textareaRef  = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) setPanelOpen(false);
    else setPanelOpen(true);
  }, [isMobile]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, imageLoading]);

  const closePanel = () => setPanelOpen(false);
  const togglePanel = () => setPanelOpen(o => !o);

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setAttachedFiles([]);
    setChatStarted(false);
    setLoading(false);
    setImageLoading(false);
    if (isMobile) closePanel();
  };

  const handleFileAttach = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [
      ...prev,
      ...files.map(f => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + " KB",
        type: f.type, file: f,
      }))
    ]);
    e.target.value = "";
  };

  const removeFile = (idx) =>
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));

  const handleHistoryImageClick = (item) => {
    setChatStarted(true);
    setImageLoading(true);
    if (isMobile) closePanel();
    setMessages(prev => [...prev, { role: "user", content: item.title }]);
    setTimeout(() => {
      setImageLoading(false);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: item.imageCaption,
          isGallery: true,
          images: item.images,
          galleryTitle: item.imageCaption,
        },
      ]);
    }, 1800);
  };

  const sendMessage = (customText) => {
    const text = (customText !== undefined ? customText : input).trim();
    if (!text && attachedFiles.length === 0) return;
    if (isMobile) closePanel();

    const userMsg = { role: "user", content: text, files: [...attachedFiles] };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setAttachedFiles([]);
    setLoading(true);
    setChatStarted(true);

    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const answer = getAnswer(text);
      const isThankYou = answer === THANK_YOU;
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: answer,
          isThankYou,
        },
      ]);
      setLoading(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = !loading && (input.trim() || attachedFiles.length > 0);

  return (
    <>
      <GlobalStyles />
      <div className="app-root">

        <div className="bg-blob" style={{
          top: "-100px", right: "-100px", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(45,125,246,0.09) 0%, transparent 70%)",
        }} />
        <div className="bg-blob" style={{
          bottom: "-80px", left: "160px", width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(92,107,192,0.08) 0%, transparent 70%)",
        }} />

        <div className={`overlay${isMobile && panelOpen ? " show" : ""}`} onClick={closePanel} />

        <nav className="rail">
          <div className="rail-logo">S</div>
          <button className="rail-btn" title="Toggle panel" onClick={togglePanel}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="18" rx="1.5" />
              <rect x="14" y="3" width="7" height="18" rx="1.5" />
            </svg>
          </button>
          <button className="rail-btn" title="New Chat" onClick={handleNewChat}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
          <div className="rail-divider" />
          <button className="rail-btn" title="Home" onClick={handleNewChat}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
          <button className="rail-btn" title="History">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="12 8 12 12 14 14" />
              <path d="M3.05 11a9 9 0 1 0 .5-4" />
              <polyline points="3 3 3 7 7 7" />
            </svg>
          </button>
          <div className="rail-avatar">S</div>
        </nav>

        <aside className={`panel${panelOpen ? " open" : " closed"}`}>
          <div className="panel-inner">

            <button className="panel-new-btn" onClick={handleNewChat}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              New Chat
            </button>

            <div className="panel-section-label">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="12 8 12 12 14 14" />
                <path d="M3.05 11a9 9 0 1 0 .5-4" /><polyline points="3 3 3 7 7 7" />
              </svg>
              History
            </div>

            {HISTORY_ITEMS.map(h => (
              <div
                key={h.id}
                className="panel-item"
                onClick={() => h.hasImages ? handleHistoryImageClick(h) : sendMessage(h.title)}
              >
                <span style={{ fontSize: "12px", flexShrink: 0 }}>{h.hasImages ? "🖼️" : "💬"}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="panel-item-text">{h.title}</div>
                  <div className="panel-item-time">{h.time}</div>
                </div>
              </div>
            ))}

            <div className="panel-brand">
              <div className="panel-brand-sub">Powered by</div>
              <div className="panel-brand-name">Shamims Abaya</div>
            </div>

          </div>
        </aside>

        <main className="main">

          <div className="topbar">
            <button className="topbar-icon-btn" onClick={togglePanel} aria-label="Menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="topbar-logo">Shamims Abaya</span>
            <button className="topbar-icon-btn" onClick={handleNewChat} aria-label="New Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {!chatStarted ? (

            <div className="hero">
              <h1 className="hero-title">
                Welcome to{" "}
                <span className="hero-title-accent">Shamims Abaya</span>
              </h1>
              <p className="hero-subtitle">
                Ask me anything about our abayas, hijabs, prices, delivery, sizing, and more. I'm here to help! 🌸
              </p>

              <InputBox
                input={input} setInput={setInput}
                attachedFiles={attachedFiles} fileInputRef={fileInputRef}
                textareaRef={textareaRef} handleKeyDown={handleKeyDown}
                sendMessage={sendMessage} loading={loading}
                handleFileAttach={handleFileAttach} removeFile={removeFile}
                canSend={canSend}
              />

              <div className="suggestion-pills">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} className="pill-btn" onClick={() => sendMessage(s.label)}>
                    {s.icon && <span>{s.icon}</span>}
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

          ) : (
            <div className="chat-view">
              <div className="chat-messages">
                {messages.map((msg, i) => {
                  if (msg.isGallery) {
                    return (
                      <div key={i} className="msg-row assistant">
                        <div className="msg-avatar">AI</div>
                        <GalleryMessage images={msg.images} caption={msg.galleryTitle} />
                      </div>
                    );
                  }
                  return (
                    <div key={i} className={`msg-row ${msg.role}`}>
                      {msg.role === "assistant" && (
                        <div className="msg-avatar">AI</div>
                      )}
                      <div className={`msg-bubble ${msg.role}${msg.isThankYou ? " thankyou" : ""}`}>
                        {msg.files?.length > 0 && (
                          <div style={{ marginBottom: "6px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {msg.files.map((f, fi) => (
                              <span key={fi} style={{
                                background: "rgba(255,255,255,0.2)", borderRadius: "5px",
                                padding: "2px 7px", fontSize: "11px",
                              }}>📎 {f.name}</span>
                            ))}
                          </div>
                        )}
                        {msg.content}
                      </div>
                    </div>
                  );
                })}

                {loading && (
                  <div className="dots-row">
                    <div className="msg-avatar">AI</div>
                    <div className="dots-bubble">
                      {[0,1,2].map(d => (
                        <div key={d} className="dot" style={{ animationDelay: `${d * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                )}

                {imageLoading && <ImageLoadingState />}
                <div ref={chatEndRef} />
              </div>

              <div className="input-wrap">
                <InputBox
                  input={input} setInput={setInput}
                  attachedFiles={attachedFiles} fileInputRef={fileInputRef}
                  textareaRef={textareaRef} handleKeyDown={handleKeyDown}
                  sendMessage={sendMessage} loading={loading}
                  handleFileAttach={handleFileAttach} removeFile={removeFile}
                  canSend={canSend}
                />
              </div>
            </div>
          )}
        </main>

        <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={handleFileAttach} />
      </div>
    </>
  );
}

function InputBox({ input, setInput, attachedFiles, fileInputRef, textareaRef,
  handleKeyDown, sendMessage, loading, handleFileAttach, removeFile, canSend }) {
  return (
    <div className="input-box">
      {attachedFiles.length > 0 && (
        <div className="input-files">
          {attachedFiles.map((f, i) => (
            <div key={i} className="input-file-chip">
              <span>📎</span>
              <span>{f.name}</span>
              <span style={{ color: "#94a3b8", fontWeight: 400 }}>{f.size}</span>
              <button className="input-file-rm" onClick={() => removeFile(i)}>×</button>
            </div>
          ))}
        </div>
      )}
      <textarea
        ref={textareaRef}
        className="input-textarea"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Shamims Abaya…"
        rows={2}
      />
      <div className="input-actions">
        <button className="input-attach-btn" onClick={() => fileInputRef.current?.click()} title="Attach file">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <button
          className={`input-send-btn ${canSend ? "active" : "inactive"}`}
          onClick={() => sendMessage()}
          disabled={!canSend}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function GalleryMessage({ images, caption }) {
  return (
    <div className="gallery-card">
      <div className="gallery-title"><span>🖼️</span> {caption}</div>
      <div className="gallery-grid">
        {images.filter(Boolean).map((src, i) => (
          <div key={i} className="gallery-cell">
            <img
              src={src} alt={`${caption} ${i + 1}`}
              onError={e => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML = `
                  <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;background:rgba(45,125,246,0.05);">
                    <span style="font-size:22px">🖼️</span>
                    <span style="font-size:9px;color:#8ea3bb;text-align:center;padding:0 5px">Image</span>
                  </div>`;
              }}
            />
          </div>
        ))}
      </div>
      <div className="gallery-count">{images.filter(Boolean).length} images found</div>
    </div>
  );
}

function ImageLoadingState() {
  return (
    <div className="dots-row">
      <div className="msg-avatar" style={{ background: "linear-gradient(135deg, #0f2040, #1e3a5f)" }}>AI</div>
      <div className="img-loading-card">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative", width: "34px", height: "34px", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.07)" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid transparent", borderTopColor: "#60a5fa", borderRightColor: "#818cf8", animation: "spin 0.9s linear infinite" }} />
            <div style={{ position: "absolute", inset: "7px", borderRadius: "50%", border: "2px solid transparent", borderBottomColor: "rgba(99,102,241,0.55)", animation: "spin 1.4s linear infinite reverse" }} />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#e2e8f0" }}>Loading images…</div>
            <div style={{ fontSize: "10px", color: "rgba(148,163,184,0.75)", marginTop: "2px" }}>Fetching from collection</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "7px" }}>
          {[0,1,2].map(i => (
            <div key={i} className="shimmer-tile" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
        
      </div>
    </div>
    
  );
}