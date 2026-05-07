/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "coral",
  "showHeroSparkles": true,
  "navStyle": "mega",
  "heroVariant": "build"
}/*EDITMODE-END*/;

// ---------- DATA ----------
const FLAVORS = [
  { name: "Tart Original", color: "#F5F1E6", dot: "#E8DDB5", tag: "Classic" },
  { name: "Strawberry", color: "#FFD6D6", dot: "#E94B4B", tag: "Fan Fave" },
  { name: "Cake Batter", color: "#FFE9B5", dot: "#E8A53C", tag: "" },
  { name: "Cookies & Cream", color: "#E8DCC8", dot: "#3A2A1F", tag: "" },
  { name: "Mint Chip", color: "#D6F0E0", dot: "#2D8E5F", tag: "" },
  { name: "Mango Sorbet", color: "#FFD89B", dot: "#F18A1B", tag: "Dairy-Free" },
  { name: "Salted Caramel", color: "#F1D7B0", dot: "#A05A1F", tag: "New" },
  { name: "Birthday Cake", color: "#FFD6E8", dot: "#E94B8A", tag: "" },
  { name: "Coconut", color: "#F4F0E6", dot: "#C7B98C", tag: "" },
  { name: "Chocolate", color: "#D9BFA6", dot: "#3D2415", tag: "" },
  { name: "Peanut Butter", color: "#EAD7AE", dot: "#8B5A2B", tag: "" },
  { name: "Raspberry Tart", color: "#FFCFD9", dot: "#C8246C", tag: "" },
];

const TOPPINGS = [
  { name: "Rainbow Sprinkles", emoji: "🌈", category: "candy" },
  { name: "Mini Gummy Bears", emoji: "🐻", category: "candy" },
  { name: "Cookie Dough", emoji: "🍪", category: "doughy" },
  { name: "Brownie Bites", emoji: "🍫", category: "doughy" },
  { name: "Fresh Strawberries", emoji: "🍓", category: "fruit" },
  { name: "Mango Chunks", emoji: "🥭", category: "fruit" },
  { name: "Boba Pearls", emoji: "⚫", category: "specialty" },
  { name: "Mochi", emoji: "🍡", category: "specialty" },
  { name: "Reese's Pieces", emoji: "🟠", category: "candy" },
  { name: "Crushed Oreo", emoji: "⚫", category: "doughy" },
  { name: "Hot Fudge", emoji: "🍯", category: "sauce" },
  { name: "Whipped Cream", emoji: "☁️", category: "sauce" },
];

const IG_POSTS = [
  { img: "assets/cup-orange.png", fit: "cover", caption: "When the swirl is just right 🌀 #cuppayomies", likes: 412, comments: 28 },
  { img: "assets/cups-marble.png", fit: "cover", caption: "Pick your poison — 12 flavors on the wall today 🌈", likes: 891, comments: 64 },
  { img: "assets/toppings-bar.png", fit: "cover", caption: "Toppings bar appreciation post. We refill all day. 🍓🍪🍫", likes: 1204, comments: 92 },
  { img: "assets/yo-banner.png", fit: "cover", caption: "Yo. ✨ #cuppayobend", likes: 256, comments: 11 },
  { img: "assets/kid-eating.png", fit: "cover", caption: "Yomies of the week 🧡 tag us to be featured!", likes: 945, comments: 73 },
  { img: null, fit: "color", color: "#FFB838", caption: "Hello Sunshine — May's flavor of the month is HERE ☀️", likes: 533, comments: 41, big: "MAY" },
  { img: null, fit: "color", color: "#E94B8A", caption: "Birthday parties at Cuppa Yo hit different 🎉 DM to book", likes: 678, comments: 55, big: "🎂" },
  { img: null, fit: "color", color: "#1B1410", caption: "Bend, Oregon · 3 locations · open till 10pm 📍", likes: 389, comments: 19, big: "BEND" },
];

const REVIEWS = [
  { quote: "The toppings bar alone is worth the trip. My kid built a tower.", who: "Jess M.", where: "Bend, OR", stars: 5 },
  { quote: "Self-serve done right. Tart original + mango = perfection.", who: "Ramon T.", where: "Yelp", stars: 5 },
  { quote: "Friendliest staff in town and that orange cup makes me smile every time.", who: "Hannah B.", where: "Google", stars: 5 },
  { quote: "We do every birthday here. The Yomies points add up fast.", who: "The Pearson Family", where: "Loyalty member", stars: 5 },
];

const LOCATIONS = [
  { city: "Bend", state: "OR", addr: "937 NW Newport Ave", flagship: true },
  { city: "Madison", state: "AL", addr: "Publix Center, County Line Rd", flagship: false, soon: true },
  { city: "Danville", state: "CA", addr: "Downtown Danville", flagship: false, soon: true },
  { city: "Redmond", state: "OR", addr: "SW Highland Ave", flagship: false },
];

// ---------- HEADER + MEGA NAV ----------
function Header({ tweaks, onOpenMega, megaOpen, megaSection, setMegaSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const NAV_LINKS = [
    { label: "Flavors", href: "#flavors" },
    { label: "Toppings", href: "#toppings" },
    { label: "Catering", href: "#catering" },
    { label: "Locations", href: "#locations" },
    { label: "Yomies", href: "#yomies" },
  ];

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="cy-header">
        <div className="cy-header-inner">
          <a href="#top" className="cy-logo-wrap" aria-label="Cuppa Yo home" onClick={closeMenu}>
            <span className="cy-logo-mask" aria-hidden="true" />
          </a>
          <nav className="cy-nav">
            {["Flavors", "Toppings", "Catering", "Locations", "Yomies"].map(item => (
              <button
                key={item}
                className={`cy-nav-item ${megaOpen && megaSection === item ? "is-active" : ""}`}
                onMouseEnter={() => onOpenMega(item)}
                onClick={() => onOpenMega(item)}
              >
                {item}
                <span className="cy-nav-underline" />
              </button>
            ))}
            <span className="cy-nav-divider" />
            <button className="cy-nav-item cy-nav-secondary" onMouseEnter={() => onOpenMega("Franchise")}>
              Franchise
            </button>
          </nav>
          <div className="cy-header-right">
            <a className="cy-pill cy-pill-ghost" href="#locations">Find a store</a>
            <a className="cy-pill cy-pill-solid" href="#yomies">Join Yomies</a>
            <button
              className={`cy-hamburger ${mobileOpen ? "is-open" : ""}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div className={`cy-mobile-nav ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <nav className="cy-mobile-nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="cy-mobile-nav-link" onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a href="#" className="cy-mobile-nav-link cy-mobile-nav-secondary" onClick={closeMenu}>
            Franchise
          </a>
        </nav>
        <div className="cy-mobile-nav-footer">
          <a className="cy-cta cy-cta-primary" href="#locations" onClick={closeMenu}>Find a store →</a>
          <a className="cy-cta cy-cta-ghost" href="#yomies" onClick={closeMenu} style={{color:"white",borderColor:"white"}}>Join Yomies</a>
        </div>
      </div>
    </>
  );
}

function MegaMenu({ open, section, onClose }) {
  return (
    <div className={`cy-mega ${open ? "is-open" : ""}`} onMouseLeave={onClose}>
      <div className="cy-mega-inner">
        {section === "Flavors" && <MegaFlavors />}
        {section === "Toppings" && <MegaToppings />}
        {section === "Catering" && <MegaCatering />}
        {section === "Locations" && <MegaLocations />}
        {section === "Yomies" && <MegaYomies />}
        {section === "Franchise" && <MegaFranchise />}
      </div>
    </div>
  );
}

function MegaFlavors() {
  return (
    <div className="mega-grid mega-flavors">
      <div className="mega-col mega-col-lead">
        <span className="mega-eyebrow">Rotating monthly</span>
        <h3 className="mega-title">12 flavors,<br/>always swirling.</h3>
        <p className="mega-body">Tart, sweet, dairy-free, sorbet — the lineup changes by location and by season. Find your favorite, then pile it high.</p>
        <a className="mega-link" href="#flavors">See all flavors →</a>
      </div>
      <div className="mega-col mega-col-grid">
        {FLAVORS.slice(0, 9).map(f => (
          <div key={f.name} className="mega-flavor-chip" style={{background: f.color}}>
            <span className="mega-flavor-dot" style={{background: f.dot}} />
            <div>
              <div className="mega-flavor-name">{f.name}</div>
              {f.tag && <div className="mega-flavor-tag">{f.tag}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="mega-col mega-col-feature">
        <div className="mega-feature-card" style={{background: "linear-gradient(160deg, #FFD89B, #F18A1B)"}}>
          <span className="mega-feature-eyebrow">May 2026</span>
          <div className="mega-feature-title">Hello Sunshine</div>
          <div className="mega-feature-sub">Mango sorbet × passionfruit swirl</div>
        </div>
      </div>
    </div>
  );
}

function MegaToppings() {
  return (
    <div className="mega-grid mega-toppings">
      <div className="mega-col mega-col-lead">
        <span className="mega-eyebrow">60+ toppings</span>
        <h3 className="mega-title">The bar is the point.</h3>
        <p className="mega-body">Candy, fruit, doughy bits, sauces, mochi, boba, and weekly rotating extras. No rules. Pile it on.</p>
        <a className="mega-link" href="#toppings">Walk the bar →</a>
      </div>
      <div className="mega-col mega-col-toppings">
        {TOPPINGS.map(t => (
          <div key={t.name} className="mega-topping-chip">
            <span className="mega-topping-emoji">{t.emoji}</span>
            <span>{t.name}</span>
          </div>
        ))}
      </div>
      <div className="mega-col mega-col-feature">
        <div className="mega-feature-card mega-feature-img" style={{backgroundImage: `url(assets/toppings-bar.png)`}}>
          <span className="mega-feature-eyebrow">Live</span>
          <div className="mega-feature-title">The toppings bar</div>
        </div>
      </div>
    </div>
  );
}

function MegaCatering() {
  return (
    <div className="mega-grid mega-catering">
      <div className="mega-col mega-col-lead">
        <span className="mega-eyebrow">Parties · Schools · Offices</span>
        <h3 className="mega-title">Bring the bar<br/>to your event.</h3>
        <p className="mega-body">Birthdays, fundraisers, team offsites, weddings — we'll set up a full self-serve sundae bar wherever the people are.</p>
        <a className="mega-link" href="#catering">Plan an event →</a>
      </div>
      <div className="mega-col mega-col-options">
        {[
          { t: "Birthday Parties", d: "Reserve the shop or bring it to you", emoji: "🎉" },
          { t: "Fundraisers", d: "We donate a slice back to your cause", emoji: "❤️" },
          { t: "Office Catering", d: "Pre-made cups or a full bar", emoji: "🏢" },
          { t: "Weddings", d: "Sundae bar reception. Yes, really.", emoji: "💍" },
        ].map(o => (
          <div key={o.t} className="mega-option">
            <div className="mega-option-emoji">{o.emoji}</div>
            <div>
              <div className="mega-option-title">{o.t}</div>
              <div className="mega-option-desc">{o.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaLocations() {
  return (
    <div className="mega-grid mega-locations">
      <div className="mega-col mega-col-lead">
        <span className="mega-eyebrow">Born in Bend, OR</span>
        <h3 className="mega-title">Find your<br/>local Cuppa.</h3>
        <p className="mega-body">A growing family of self-serve shops across the country. New locations opening monthly.</p>
        <a className="mega-link" href="#locations">All locations →</a>
      </div>
      <div className="mega-col mega-col-locations">
        {LOCATIONS.map(l => (
          <div key={l.city} className="mega-location">
            <div className="mega-location-city">
              {l.city}, {l.state}
              {l.flagship && <span className="mega-loc-tag mega-loc-flag">Flagship</span>}
              {l.soon && <span className="mega-loc-tag mega-loc-soon">Coming soon</span>}
            </div>
            <div className="mega-location-addr">{l.addr}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaYomies() {
  return (
    <div className="mega-grid mega-yomies">
      <div className="mega-col mega-col-lead">
        <span className="mega-eyebrow">Free to join</span>
        <h3 className="mega-title">Cuppa Yomies.<br/>Earn every swirl.</h3>
        <p className="mega-body">1 point per dollar. Free froyo at 100. Birthday treat on us. Members-only flavor drops.</p>
        <a className="mega-link" href="#yomies">Become a Yomie →</a>
      </div>
      <div className="mega-col mega-col-yomies">
        <div className="yomie-tier yomie-tier-1">
          <div className="yomie-tier-num">100</div>
          <div className="yomie-tier-label">Free 8oz cup</div>
        </div>
        <div className="yomie-tier yomie-tier-2">
          <div className="yomie-tier-num">250</div>
          <div className="yomie-tier-label">Free 16oz + toppings</div>
        </div>
        <div className="yomie-tier yomie-tier-3">
          <div className="yomie-tier-num">500</div>
          <div className="yomie-tier-label">Cuppa Yo merch drop</div>
        </div>
      </div>
    </div>
  );
}

function MegaFranchise() {
  return (
    <div className="mega-grid mega-franchise">
      <div className="mega-col mega-col-lead">
        <span className="mega-eyebrow">For operators</span>
        <h3 className="mega-title">Own a Cuppa Yo.</h3>
        <p className="mega-body">A simple, profitable, self-serve model with a cult following. Now opening territories nationwide.</p>
        <a className="mega-link" href="#franchise">Franchise inquiries →</a>
      </div>
      <div className="mega-col mega-col-franchise">
        <div className="franchise-stat"><div className="franchise-stat-num">14</div><div className="franchise-stat-lbl">Stores open</div></div>
        <div className="franchise-stat"><div className="franchise-stat-num">7</div><div className="franchise-stat-lbl">Coming soon</div></div>
        <div className="franchise-stat"><div className="franchise-stat-num">2014</div><div className="franchise-stat-lbl">Founded in Bend</div></div>
      </div>
    </div>
  );
}

// ---------- HERO ----------
function EditorialHero({ tweaks }) {
  return (
    <section className="cy-hero" id="top">
      <div className="cy-hero-bg" />
      {tweaks.showHeroSparkles && <Sprinkles />}

      <div className="cy-hero-grid">
        <div className="cy-hero-copy">
          <div className="cy-hero-eyebrow">
            <span className="cy-pulse" /> Now serving · 3 locations in Bend, OR
          </div>
          <h1 className="cy-hero-headline">
            <span className="cy-h-line">Pile it</span>
            <span className="cy-h-line cy-h-script">how</span>
            <span className="cy-h-line">you like.</span>
          </h1>
          <p className="cy-hero-sub">
            Twelve rotating flavors. Sixty-something toppings.
            Zero rules. Self-serve frozen yogurt the way it should be —
            yours, by the ounce, since 2010.
          </p>

          <div className="cy-hero-ctas">
            <a className="cy-cta cy-cta-primary" href="#locations">
              Find a Cuppa near you
              <span className="cy-cta-arrow">→</span>
            </a>
            <a className="cy-cta cy-cta-ghost" href="#flavors">See this month's flavor</a>
          </div>

          <div className="cy-hero-meta">
            <div className="cy-hero-meta-item">
              <div className="cy-hero-meta-num">12</div>
              <div className="cy-hero-meta-lbl">Rotating flavors</div>
            </div>
            <div className="cy-hero-meta-divider" />
            <div className="cy-hero-meta-item">
              <div className="cy-hero-meta-num">60+</div>
              <div className="cy-hero-meta-lbl">Toppings on the bar</div>
            </div>
            <div className="cy-hero-meta-divider" />
            <div className="cy-hero-meta-item">
              <div className="cy-hero-meta-num">2010</div>
              <div className="cy-hero-meta-lbl">Born in Bend, OR</div>
            </div>
          </div>
        </div>

        <div className="cy-hero-visual">
          <div className="cy-hv-main">
            {/* Toppings bar photo fills the top */}
            <div className="cy-hv-toppings-zone">
              <img src="assets/toppings-bar.png" alt="" />
              <div className="cy-hv-toppings-fade" />
            </div>
            {/* Cup emerges from the bottom */}
            <img src="assets/cup-orange.png" alt="Cuppa Yo cup with toppings" className="cy-hv-cup" />
            {/* Price tag pinned bottom-left */}
            <div className="cy-hv-tag cy-hv-price-tag">
              <span className="cy-hv-tag-emoji">⚖️</span>
              <div>
                <div className="cy-hv-tag-name">$0.55 / oz</div>
                <div className="cy-hv-tag-meta">Pay by weight</div>
              </div>
            </div>
            <div className="cy-hv-stamp">
              <span>Cuppa</span>
              <em>since '10</em>
            </div>
          </div>
          <div className="cy-hv-stack">
            <img src="assets/cups-marble.png" alt="Variety of yogurt cups" className="cy-hv-stack-img" />
            <div className="cy-hv-stack-overlay">
              <span className="cy-hv-stack-eyebrow">12 flavors</span>
              <span className="cy-hv-stack-arrow">→</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cy-hero-marquee">
        <div className="cy-marquee-track">
          {Array.from({length: 3}).map((_, i) => (
            <div key={i} className="cy-marquee-row">
              <span>★ Self-Serve Frozen Yogurt</span>
              <span>★ Born in Bend, Oregon</span>
              <span>★ 60+ Toppings Daily</span>
              <span>★ Dairy-Free Options</span>
              <span>★ Cuppa Yomies Rewards</span>
              <span>★ Catering & Parties</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cup({ base, toppings }) {
  return (
    <div className="cup-stage">
      <div className="cup-shadow" />
      <div className="cup-body">
        <div className="cup-rim" />
        <div className="cup-inner">
          <div className="cup-swirl" style={{background: `linear-gradient(180deg, ${base.dot}, ${base.color})`}}>
            <div className="cup-swirl-curl" style={{background: base.dot}} />
            <div className="cup-swirl-curl cup-swirl-curl-2" style={{background: base.color}} />
            <div className="cup-swirl-curl cup-swirl-curl-3" style={{background: base.dot}} />
          </div>
          <div className="cup-toppings">
            {toppings.map((t, i) => (
              <span key={t.name} className="cup-topping" style={{
                left: `${15 + (i * 17) + (i % 2) * 6}%`,
                top: `${5 + (i % 3) * 8}px`,
                animationDelay: `${i * 0.05}s`,
              }}>{t.emoji}</span>
            ))}
          </div>
        </div>
        <div className="cup-label">
          <div className="cup-label-tag">SELF-SERVE</div>
          <div className="cup-label-tag">FROZEN YOGURT</div>
          <div className="cup-label-script">Cuppa</div>
        </div>
      </div>
    </div>
  );
}

function Sprinkles() {
  const sprinkles = useMemo(() => {
    const colors = ["#F26B2C", "#E94B8A", "#3FB8DA", "#FFB838", "#4FB97E", "#A06FE0", "#E94B4B"];
    return Array.from({length: 40}).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      rot: Math.random() * 360,
      color: colors[i % colors.length],
      delay: Math.random() * 4,
      dur: 6 + Math.random() * 6,
    }));
  }, []);
  return (
    <div className="cy-sprinkles" aria-hidden>
      {sprinkles.map((s, i) => (
        <span key={i} className="cy-sprinkle" style={{
          left: `${s.left}%`, top: `${s.top}%`,
          transform: `rotate(${s.rot}deg)`,
          background: s.color,
          animationDelay: `${s.delay}s`,
          animationDuration: `${s.dur}s`,
        }} />
      ))}
    </div>
  );
}

// ---------- FLAVOR OF THE MONTH ----------
function FlavorOfMonth() {
  return (
    <section className="cy-fom" id="flavors">
      <div className="cy-fom-eyebrow-row">
        <span className="cy-eyebrow-pill">Flavor of the Month · May 2026</span>
      </div>
      <div className="cy-fom-grid">
        <div className="cy-fom-type">
          <h2 className="cy-fom-title">
            <span className="cy-fom-line-1">Hello</span>
            <span className="cy-fom-line-2">Sunshine.</span>
          </h2>
          <p className="cy-fom-desc">
            Mango sorbet swirled with passionfruit. Bright, tart, dairy-free,
            and possibly the closest thing to drinking summer. Pair it with
            fresh berries, lime zest, or a fistful of mochi.
          </p>
          <div className="cy-fom-pairings">
            <span className="cy-pairing-label">Pair with:</span>
            <span className="cy-pairing">🍓 Strawberries</span>
            <span className="cy-pairing">🍡 Mochi</span>
            <span className="cy-pairing">🥥 Toasted coconut</span>
            <span className="cy-pairing">🌶️ Tajín</span>
          </div>
          <a className="cy-cta cy-cta-primary" href="#locations">Try it this week →</a>
        </div>
        <div className="cy-fom-visual">
          <div className="cy-fom-cup-bg" />
          <img src="assets/cup-orange.png" alt="Cuppa Yo cup with toppings" className="cy-fom-img" />
          <div className="cy-fom-orbit cy-fom-orbit-1">🥭</div>
          <div className="cy-fom-orbit cy-fom-orbit-2">☀️</div>
          <div className="cy-fom-orbit cy-fom-orbit-3">🍋</div>
          <div className="cy-fom-stamp">
            <div>MAY</div>
            <div className="cy-fom-stamp-num">26</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- TOPPINGS BAR ----------
function ToppingsBar() {
  const [filter, setFilter] = useState("all");
  const cats = [
    { id: "all", label: "Everything" },
    { id: "candy", label: "Candy" },
    { id: "fruit", label: "Fresh Fruit" },
    { id: "doughy", label: "Doughy Bits" },
    { id: "sauce", label: "Sauces" },
    { id: "specialty", label: "Specialty" },
  ];
  const visible = filter === "all" ? TOPPINGS : TOPPINGS.filter(t => t.category === filter);
  return (
    <section className="cy-toppings" id="toppings">
      <div className="cy-toppings-img">
        <img src="assets/toppings-bar.png" alt="Cuppa Yo toppings bar" />
        <div className="cy-toppings-img-fade" />
        <div className="cy-toppings-overlay">
          <span className="cy-eyebrow-pill cy-eyebrow-on-dark">The Toppings Bar</span>
          <h2 className="cy-toppings-overlay-title">
            Sixty-something<br/>reasons to come back.
          </h2>
        </div>
      </div>
      <div className="cy-toppings-content">
        <div className="cy-toppings-filters">
          {cats.map(c => (
            <button
              key={c.id}
              className={`cy-filter ${filter === c.id ? "is-active" : ""}`}
              onClick={() => setFilter(c.id)}
            >{c.label}</button>
          ))}
        </div>
        <div className="cy-toppings-grid">
          {visible.map(t => (
            <div key={t.name} className="cy-topping-card">
              <div className="cy-topping-emoji">{t.emoji}</div>
              <div className="cy-topping-name">{t.name}</div>
            </div>
          ))}
        </div>
        <p className="cy-toppings-note">+ rotating weekly extras at every location. Selection varies by store.</p>
      </div>
    </section>
  );
}

// ---------- HOW IT WORKS ----------
function HowItWorks() {
  const steps = [
    { n: "01", t: "Grab a cup", d: "Small, medium or large — whatever your appetite." },
    { n: "02", t: "Pull the lever", d: "Twelve flavors. Try one, try a swirl, try them all." },
    { n: "03", t: "Walk the bar", d: "Sixty-something toppings. We won't judge." },
    { n: "04", t: "Weigh & pay", d: "By the ounce. You only pay for what you build." },
  ];
  return (
    <section className="cy-how">
      <div className="cy-how-head">
        <span className="cy-eyebrow-pill">How it works</span>
        <h2 className="cy-how-title">Four steps. <em>Zero rules.</em></h2>
      </div>
      <div className="cy-how-grid">
        {steps.map(s => (
          <div key={s.n} className="cy-how-step">
            <div className="cy-how-num">{s.n}</div>
            <div className="cy-how-step-title">{s.t}</div>
            <div className="cy-how-step-desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- IG GRID ----------
function InstagramGrid() {
  return (
    <section className="cy-ig" id="ig">
      <div className="cy-ig-head">
        <div>
          <span className="cy-eyebrow-pill">@cuppayobend</span>
          <h2 className="cy-ig-title">From the<br/>Yomie feed.</h2>
        </div>
        <div className="cy-ig-head-right">
          <p>Tag <strong>@cuppayobend</strong> and <strong>#CuppaYomies</strong> to be featured here and on the wall in Bend.</p>
          <div className="cy-ig-cta-row">
            <a className="cy-cta cy-cta-primary" href="https://www.instagram.com/cuppayobend/" target="_blank" rel="noreferrer">Follow on Instagram →</a>
            <a className="cy-cta cy-cta-ghost" href="https://www.facebook.com/cuppayobendoregon/" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      <div className="cy-ig-grid">
        {IG_POSTS.map((p, i) => (
          <a key={i} className={`cy-ig-tile cy-ig-tile-${i}`} href="https://www.instagram.com/cuppayobend/" target="_blank" rel="noreferrer">
            {p.img ? (
              <div className="cy-ig-tile-img cy-ig-tile-photo">
                <img src={p.img} alt="" />
              </div>
            ) : (
              <div className="cy-ig-tile-img cy-ig-tile-color" style={{background: p.color, color: p.color === "#1B1410" ? "#FBF7EE" : "white"}}>
                <span className="cy-ig-tile-big">{p.big}</span>
                <span className="cy-ig-tile-handle">@cuppayobend</span>
              </div>
            )}
            <div className="cy-ig-tile-overlay">
              <div className="cy-ig-tile-stats">
                <span>♥ {p.likes}</span>
                <span>💬 {p.comments}</span>
              </div>
              <div className="cy-ig-tile-caption">{p.caption}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FakeIGImage({ post, index }) {
  // Different fake compositions
  const variants = [
    // 0: cup in center
    <div className="ig-comp ig-comp-cup">
      <div className="ig-cup" style={{background: post.accent}}>
        <div className="ig-swirl" />
        <div className="ig-cup-label">Cuppa</div>
      </div>
      <div className="ig-bg-shapes" />
    </div>,
    // 1: toppings bar overhead
    <div className="ig-comp ig-comp-grid">
      {Array.from({length: 9}).map((_, i) => (
        <div key={i} className="ig-tile" style={{background: `oklch(${65 + (i*3)%20}% 0.15 ${post.hue + i * 25})`}} />
      ))}
    </div>,
    // 2: text-over-color
    <div className="ig-comp ig-comp-text">
      <div className="ig-text-big">SWIRL</div>
      <div className="ig-text-small">@cuppayobend</div>
    </div>,
    // 3: yomies group
    <div className="ig-comp ig-comp-faces">
      {[0,1,2,3].map(i => (
        <div key={i} className="ig-face" style={{
          background: `oklch(${75 - i*5}% 0.1 ${post.hue + i * 30})`,
          left: `${15 + i*22}%`, top: `${20 + (i%2)*30}%`
        }} />
      ))}
    </div>,
    // 4: mochi
    <div className="ig-comp ig-comp-balls">
      {Array.from({length: 6}).map((_, i) => (
        <div key={i} className="ig-ball" style={{
          background: `oklch(80% 0.12 ${post.hue + i * 40})`,
          left: `${10 + (i*15) % 80}%`, top: `${15 + (i*23) % 70}%`
        }} />
      ))}
    </div>,
    // 5: party
    <div className="ig-comp ig-comp-confetti">
      <div className="ig-cup" style={{background: post.accent}}><div className="ig-swirl" /></div>
      {Array.from({length: 20}).map((_, i) => (
        <span key={i} className="ig-confetti" style={{
          left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
          background: ["#F26B2C","#E94B8A","#3FB8DA","#FFB838","#4FB97E"][i%5],
          transform: `rotate(${Math.random()*360}deg)`,
        }} />
      ))}
    </div>,
    // 6: storefront
    <div className="ig-comp ig-comp-store">
      <div className="ig-store-sign">CUPPA YO</div>
      <div className="ig-store-window" />
    </div>,
    // 7: wide cup
    <div className="ig-comp ig-comp-cup">
      <div className="ig-cup ig-cup-big" style={{background: post.accent}}>
        <div className="ig-swirl" />
      </div>
    </div>,
  ];
  return variants[index % variants.length];
}

// ---------- YOMIES LOYALTY ----------
function YomiesSection() {
  const [points, setPoints] = useState(72);
  const tier = points < 100 ? 1 : points < 250 ? 2 : 3;
  return (
    <section className="cy-yomies" id="yomies">
      <div className="cy-yomies-grid">
        <div className="cy-yomies-copy">
          <span className="cy-eyebrow-pill cy-eyebrow-on-dark">Cuppa Yomies · Free</span>
          <h2 className="cy-yomies-title">
            Every swirl<br/>earns a point.
          </h2>
          <p className="cy-yomies-sub">
            Sign up once and start banking points. Free froyo, birthday treats,
            members-only flavor drops, and surprise upgrades. We'll text you
            when something good is happening.
          </p>
          <form className="cy-yomies-form" onSubmit={e => e.preventDefault()}>
            <input className="cy-yomies-input" type="email" placeholder="you@cuppayomie.com" />
            <button className="cy-cta cy-cta-primary" type="submit">Become a Yomie</button>
          </form>
          <p className="cy-yomies-fineprint">No spam. Just sweet stuff. Unsubscribe anytime.</p>
        </div>
        <div className="cy-yomies-card">
          <div className="cy-yomies-card-top">
            <div className="cy-yomies-card-title">Cuppa Yomies</div>
            <div className="cy-yomies-card-name">Demo Account</div>
          </div>
          <div className="cy-yomies-card-points">
            <div className="cy-yomies-card-num">{points}</div>
            <div className="cy-yomies-card-lbl">points</div>
          </div>
          <div className="cy-yomies-progress">
            <div className="cy-yomies-progress-track">
              <div className="cy-yomies-progress-fill" style={{width: `${Math.min(100, (points / 500) * 100)}%`}} />
            </div>
            <div className="cy-yomies-tiers">
              <div className={`cy-yomies-tier ${points >= 100 ? "is-hit" : ""}`}>
                <div className="cy-yomies-tier-num">100</div>
                <div className="cy-yomies-tier-lbl">Free 8oz</div>
              </div>
              <div className={`cy-yomies-tier ${points >= 250 ? "is-hit" : ""}`}>
                <div className="cy-yomies-tier-num">250</div>
                <div className="cy-yomies-tier-lbl">Free 16oz</div>
              </div>
              <div className={`cy-yomies-tier ${points >= 500 ? "is-hit" : ""}`}>
                <div className="cy-yomies-tier-num">500</div>
                <div className="cy-yomies-tier-lbl">Merch drop</div>
              </div>
            </div>
          </div>
          <div className="cy-yomies-demo">
            <span>Try it:</span>
            <button onClick={() => setPoints(Math.max(0, points - 50))}>− 50</button>
            <button onClick={() => setPoints(points + 50)}>+ 50</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- CATERING + GIFT CARDS ----------
function CateringGifts() {
  return (
    <section className="cy-cg" id="catering">
      <div className="cy-cg-card cy-cg-catering">
        <div className="cy-cg-eyebrow">Catering & Parties</div>
        <h3 className="cy-cg-title">Bring the bar.<br/>Save the party.</h3>
        <p className="cy-cg-desc">Birthdays, fundraisers, school events, weddings. We'll set up a full self-serve sundae bar at your spot.</p>
        <a href="#" className="cy-cg-cta">Get a quote →</a>
        <div className="cy-cg-deco cy-cg-deco-cake">🎂</div>
        <div className="cy-cg-deco cy-cg-deco-conf">🎉</div>
      </div>
      <div className="cy-cg-card cy-cg-gifts">
        <div className="cy-cg-eyebrow">Gift Cards</div>
        <h3 className="cy-cg-title">A cup-of-yo<br/>for someone you like.</h3>
        <p className="cy-cg-desc">Digital or physical. Delivered instantly or mailed. Redeemable at any Cuppa Yo location.</p>
        <a href="#" className="cy-cg-cta">Send a gift card →</a>
        <div className="cy-cg-giftcard">
          <div className="cy-cg-giftcard-top">
            <span>Cuppa Yo</span>
            <span>Gift</span>
          </div>
          <div className="cy-cg-giftcard-amt">$25.00</div>
          <div className="cy-cg-giftcard-num">•••• •••• 4520</div>
        </div>
      </div>
    </section>
  );
}

// ---------- LOCATIONS ----------
function LocationsSection() {
  return (
    <section className="cy-loc" id="locations">
      <div className="cy-loc-head">
        <div>
          <span className="cy-eyebrow-pill">Locations</span>
          <h2 className="cy-loc-title">Find your<br/>Cuppa.</h2>
        </div>
        <a className="cy-cta cy-cta-ghost" href="#">All locations →</a>
      </div>
      <div className="cy-loc-grid">
        {LOCATIONS.map((l, i) => (
          <div key={l.city} className={`cy-loc-card ${l.flagship ? "is-flagship" : ""}`}>
            <div className="cy-loc-card-tag">
              {l.flagship && <span className="cy-loc-flagship-tag">Flagship</span>}
              {l.soon && <span className="cy-loc-soon-tag">Coming soon</span>}
            </div>
            <div className="cy-loc-city">{l.city}</div>
            <div className="cy-loc-state">{l.state}</div>
            <div className="cy-loc-addr">{l.addr}</div>
            <div className="cy-loc-actions">
              <a href="#">Hours →</a>
              <a href="#">Directions →</a>
            </div>
            <div className="cy-loc-map">
              <FakeMap />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FakeMap() {
  return (
    <svg viewBox="0 0 100 60" className="cy-fakemap" preserveAspectRatio="xMidYMid slice">
      <rect width="100" height="60" fill="#F1EBE0" />
      <path d="M0 25 L100 18" stroke="#E0D6C0" strokeWidth="0.4" />
      <path d="M0 38 L100 32" stroke="#E0D6C0" strokeWidth="0.4" />
      <path d="M30 0 L26 60" stroke="#E0D6C0" strokeWidth="0.4" />
      <path d="M70 0 L72 60" stroke="#E0D6C0" strokeWidth="0.4" />
      <path d="M10 50 Q40 30 90 40" stroke="#C5D8E8" strokeWidth="2" fill="none" />
      <circle cx="50" cy="30" r="4" fill="#F26B2C" />
      <circle cx="50" cy="30" r="1.5" fill="#fff" />
    </svg>
  );
}

// ---------- REVIEWS ----------
function Reviews() {
  return (
    <section className="cy-rev">
      <div className="cy-rev-head">
        <span className="cy-eyebrow-pill">Sweet Words</span>
        <h2 className="cy-rev-title">What the<br/>Yomies say.</h2>
      </div>
      <div className="cy-rev-grid">
        {REVIEWS.map((r, i) => (
          <figure key={i} className={`cy-rev-card cy-rev-card-${i}`}>
            <div className="cy-rev-stars">{"★".repeat(r.stars)}</div>
            <blockquote className="cy-rev-quote">"{r.quote}"</blockquote>
            <figcaption className="cy-rev-cap">
              <span className="cy-rev-who">{r.who}</span>
              <span className="cy-rev-where">{r.where}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="cy-foot">
      <div className="cy-foot-main">
        <div className="cy-foot-brand">
          <img src="assets/cup-logo.png" alt="Cuppa Yo" className="cy-foot-logo" style={{filter: "brightness(0) invert(1)"}} />
          <p className="cy-foot-tag">Self-serve frozen yogurt, born in Bend, Oregon since 2014.</p>
          <div className="cy-foot-social">
            <a href="https://www.instagram.com/cuppayobend/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              <span>@cuppayobend</span>
            </a>
            <a href="https://www.facebook.com/cuppayobendoregon/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.45-4 4.1v2.3H7.5V14h2.8v8h3.2z"/></svg>
              <span>facebook.com/cuppayobendoregon</span>
            </a>
          </div>
        </div>
        <div className="cy-foot-cols">
          <div className="cy-foot-col">
            <div className="cy-foot-col-title">Cuppa Yo</div>
            <a href="#flavors">Flavors</a>
            <a href="#toppings">Toppings</a>
            <a href="#yomies">Cuppa Yomies</a>
            <a href="#catering">Catering</a>
            <a href="#">Gift Cards</a>
          </div>
          <div className="cy-foot-col">
            <div className="cy-foot-col-title">Visit</div>
            <a href="#locations">Locations</a>
            <a href="#">Hours</a>
            <a href="#">Allergens</a>
            <a href="#">Nutrition</a>
          </div>
          <div className="cy-foot-col">
            <div className="cy-foot-col-title">Company</div>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>
          <div className="cy-foot-col">
            <div className="cy-foot-col-title">Operators</div>
            <a href="#">Franchise</a>
            <a href="#">Wholesale</a>
            <a href="#">Investor relations</a>
          </div>
        </div>
      </div>
      <div className="cy-foot-bottom">
        <div className="cy-foot-tag-big">Yo<span>.</span></div>
        <div className="cy-foot-meta">
          <span>© 2026 Cuppa Yo Frozen Yogurt</span>
          <span>·</span>
          <span>937 NW Newport Ave, Bend, OR 97703</span>
          <span>·</span>
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}

// ---------- TWEAKS WIRING ----------
function TweaksWindow({ tweaks, setTweak }) {
  if (!window.TweaksPanel) return null;
  const { TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakRadio, TweakSelect } = window;
  return (
    <TweaksPanel title="Cuppa Yo Tweaks">
      <TweakSection title="Theme">
        <TweakColor
          label="Accent"
          value={tweaks.accent}
          onChange={v => setTweak("accent", v)}
          options={[
            ["#F26B2C", "#E94B8A"],
            ["#F26B2C", "#3FB8DA"],
            ["#F26B2C", "#FFB838"],
            ["#F26B2C", "#4FB97E"],
          ]}
        />
      </TweakSection>
      <TweakSection title="Hero">
        <TweakToggle label="Show sprinkles" value={tweaks.showHeroSparkles} onChange={v => setTweak("showHeroSparkles", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---------- APP ----------
function App() {
  const [tweaks, setTweak] = window.useTweaks
    ? window.useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  const [megaOpen, setMegaOpen] = useState(false);
  const [megaSection, setMegaSection] = useState("Flavors");
  const closeTimer = useRef(null);

  const openMega = (section) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaSection(section);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  // accent color CSS var
  const accentArr = Array.isArray(tweaks.accent) ? tweaks.accent : ["#F26B2C", "#E94B8A"];
  const cssVars = {
    "--cy-orange": accentArr[0] || "#F26B2C",
    "--cy-accent": accentArr[1] || "#E94B8A",
  };

  return (
    <div className="cy-root" style={cssVars}>
      <div onMouseLeave={closeMega}>
        <Header tweaks={tweaks} onOpenMega={openMega} megaOpen={megaOpen} megaSection={megaSection} setMegaSection={setMegaSection} />
        <MegaMenu open={megaOpen} section={megaSection} onClose={closeMega} />
      </div>
      <main>
        <EditorialHero tweaks={tweaks} />
        <FlavorOfMonth />
        <ToppingsBar />
        <HowItWorks />
        <InstagramGrid />
        <YomiesSection />
        <CateringGifts />
        <LocationsSection />
        <Reviews />
      </main>
      <Footer />
      <TweaksWindow tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
