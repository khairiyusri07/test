import { useEffect, useState, type ReactElement } from 'react';
import { FEATURED, MENU_GROUPS, findItem, money } from './data';
import { CartProvider, useCart } from './store';
import { Icon, Sprite } from './ui';

export type Page = 'home' | 'menu' | 'about' | 'visit' | 'order';

const NAV: { label: string; href: string; page?: Page }[] = [
  { label: 'Home', href: 'index.html', page: 'home' },
  { label: 'Menu', href: 'menu.html', page: 'menu' },
  { label: 'Order', href: 'order.html', page: 'order' },
  { label: 'Our Story', href: 'about.html', page: 'about' },
  { label: 'Visit Us', href: 'visit.html', page: 'visit' },
  { label: 'Contact', href: 'visit.html#contact' },
];

function artFor(icon: string): string {
  switch (icon) {
    case 'croissant': return 'honey';
    case 'danish': return 'berry';
    case 'wheat': case 'cupcake': return 'cream';
    case 'leaf': return 'sage';
    case 'cake': case 'coffee': return 'cocoa';
    default: return 'rust';
  }
}

/* ---------------------------------------------------------------- shared UI */

function Header({ page }: { page: Page }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="index.html" aria-label="Hearth and Crumb home">
          <span className="brand-mark"><Icon name="wheat" /></span>
          <span className="brand-name">Hearth &amp; Crumb<span className="brand-sub">Bakery &middot; Est. 2012</span></span>
        </a>

        <nav className={`site-nav${open ? ' is-open' : ''}`} id="site-nav" aria-label="Main navigation">
          {NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={link.page === page ? 'is-current' : undefined}
              aria-current={link.page === page ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className={`order-pill${page === 'order' ? ' is-current' : ''}`} href="order.html" aria-label="View your order">
            Order <span key={count} className="order-count pop">{count}</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const [joined, setJoined] = useState(false);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <a className="brand" href="index.html" aria-label="Hearth and Crumb home">
              <span className="brand-mark"><Icon name="wheat" /></span>
              <span className="brand-name">Hearth &amp; Crumb<span className="brand-sub">Bakery &middot; Est. 2012</span></span>
            </a>
            <p style={{ marginTop: 18, maxWidth: '32ch' }}>Small-batch bread, pastry and cakes, baked fresh every morning in the heart of the neighbourhood.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="index.html">Home</a>
            <a href="menu.html">Menu</a>
            <a href="order.html">Order</a>
            <a href="about.html">Our Story</a>
            <a href="visit.html">Visit Us</a>
          </div>
          <div className="footer-col">
            <h4>Visit</h4>
            <p>18 Willow Lane<br />Old town</p>
            <p>Open daily<br />7am – 5pm</p>
          </div>
          <div className="footer-col">
            <h4>A little note from us</h4>
            <p>Get word of the weekend bakes and the occasional free pastry.</p>
            <form className="newsletter" onSubmit={(event) => { event.preventDefault(); setJoined(true); }}>
              <input type="email" placeholder="Your email address" aria-label="Email address" required />
              <button className="btn btn--light btn--small" type="submit">Join</button>
              <div className={`form-message${joined ? ' is-visible' : ''}`}>Thanks! You're on the list.</div>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Hearth &amp; Crumb Bakery. Made with flour and love.</span>
          <span>Baked fresh, every single day.</span>
        </div>
      </div>
    </footer>
  );
}

function AddButton({ id, label = 'Add to order', className = 'add' }: { id: string; label?: string; className?: string }) {
  const { add } = useCart();
  return <button type="button" className={className} onClick={() => add(id)}>{label}</button>;
}

function Toast() {
  const { flash } = useCart();
  if (!flash) return null;
  return <div className="toast" role="status">✓ {flash}</div>;
}

function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- pages */

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">Small batch &middot; Baked daily</span>
            <h1>Bread, pastry &amp; a little bit of <em>magic.</em></h1>
            <p className="lead">We're a family-run neighbourhood bakery. Every morning we fill our ovens with slow-fermented loaves, buttery pastries and a few sweet surprises — all made by hand, from scratch.</p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="menu.html">Explore the menu</a>
              <a className="btn btn--outline" href="order.html">Order online</a>
              <a className="btn btn--outline" href="about.html">Our story</a>
            </div>
          </div>
          <div className="hero-visual" data-reveal>
            <div className="hero-frame"><Icon name="loaf" className="art--loaf" /></div>
            <div className="hero-badge"><span><strong>Fresh</strong><br />every morning</span></div>
          </div>
        </div>
      </section>

      <section className="promise">
        <div className="container promise-grid">
          <div className="promise-item" data-reveal>
            <span className="promise-icon"><Icon name="wheat" /></span>
            <div><h4>Made from scratch</h4><p>No mixes, no shortcuts — just real ingredients.</p></div>
          </div>
          <div className="promise-item" data-reveal>
            <span className="promise-icon"><Icon name="heart" /></span>
            <div><h4>Baked with care</h4><p>Small batches, shaped and finished by hand.</p></div>
          </div>
          <div className="promise-item" data-reveal>
            <span className="promise-icon"><Icon name="leaf" /></span>
            <div><h4>Locally sourced</h4><p>Flour, fruit and dairy from farms we know.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">From our ovens</span>
            <h2>Today's favourites</h2>
            <p className="lead">A few things we're especially proud of. Our case changes with the seasons, but these familiar faces are here most days.</p>
          </div>
          <div className="card-grid">
            {FEATURED.map(({ item, tag, art }) => (
              <article className="card" key={item.id} data-reveal>
                <div className={`card-art card-art--${art}`}>
                  <span className="card-tag">{tag}</span>
                  <Icon name={item.icon} />
                </div>
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <p>{item.id === 'country-sourdough' ? 'A 36-hour fermented loaf with a crackly crust and a soft, tangy crumb.' : item.id === 'butter-croissant' ? 'Flaky, golden layers made with cultured butter. Best warmed up.' : 'Soft, braided pastry with vanilla custard and whatever berries are in season.'}</p>
                  <div className="card-foot">
                    <span className="price">{money(item.price)}</span>
                    <AddButton id={item.id} label="Add to order" className="btn btn--outline btn--small" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container split">
          <div className="split-visual" data-reveal>
            <Icon name="wheat" className="art--wheat" />
            <div className="split-note"><strong>12 years</strong> of early mornings &amp; flour-dusted aprons</div>
          </div>
          <div className="split-copy" data-reveal>
            <span className="eyebrow">A little about us</span>
            <h2>Good bread takes time. So does a good neighbourhood.</h2>
            <p className="lead">What started as one oven in a tiny kitchen is now a busy little bakery on the corner — but not much has changed about how we work.</p>
            <p>We still weigh every ingredient by hand, still talk to the farmers who grow our grain, and still believe that the best part of the day is watching someone take their first bite of something warm.</p>
            <div className="stat-row">
              <div className="stat"><strong>12</strong><span>Years baking</span></div>
              <div className="stat"><strong>3</strong><span>Neighbourhood shops</span></div>
              <div className="stat"><strong>100%</strong><span>Handmade</span></div>
            </div>
            <div className="hero-actions"><a className="btn btn--primary" href="about.html">Read our story</a></div>
          </div>
        </div>
      </section>

      <section className="section quote">
        <div className="container quote-inner" data-reveal>
          <Icon name="heart" />
          <blockquote>"It smells like a Saturday morning in here — and somehow the croissants are even better than the smell."</blockquote>
          <cite>— A very happy regular</cite>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head center" data-reveal>
            <span className="eyebrow">Come say hello</span>
            <h2>Your new morning ritual</h2>
            <p className="lead">Doors open at 7am, seven days a week. Come early for the good stuff — we sell out of the sourdough most afternoons.</p>
          </div>
          <div className="visit-grid">
            <div className="info-panel" data-reveal>
              <h3>Find us</h3>
              <div className="info-line"><Icon name="pin" /><p><strong>18 Willow Lane</strong>Old town, between the library and the park</p></div>
              <div className="info-line"><Icon name="coffee" /><p><strong>Open daily · 7am – 5pm</strong>Fresh bread out of the oven around 8am</p></div>
              <div className="hero-actions"><a className="btn btn--primary" href="visit.html">Plan your visit</a></div>
            </div>
            <div className="map-panel" data-reveal>
              <Icon name="pin" />
              <span className="map-label">18 Willow Lane · Old town</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Fresh from the oven"
        title="Our menu"
        lead="Everything is made by hand, in small batches, every single morning. When it's gone, it's gone — so come early for your favourites."
      />
      <section className="section section--tight">
        <div className="container">
          {MENU_GROUPS.map((group) => (
            <div className="menu-group" key={group.title} data-reveal>
              <div className="menu-group-head"><h2>{group.title}</h2><span>{group.note}</span></div>
              <div className="menu-list">
                {group.items.map((item) => (
                  <div className="menu-item" key={item.id}>
                    <h3>{item.name}</h3>
                    <p className="desc">{item.desc}</p>
                    <span className="price">{money(item.price)}</span>
                    <AddButton id={item.id} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="menu-note" data-reveal>
            <div>
              <h3>Ready to order?</h3>
              <p>Add anything above, then head to your order to choose a pickup time.</p>
            </div>
            <a className="btn btn--primary" href="order.html">Review your order</a>
          </div>
          <div className="menu-note" data-reveal style={{ marginTop: 22 }}>
            <div>
              <h3>Looking for something special?</h3>
              <p>We make celebration cakes, party platters and custom bakes. Get in touch and we'll sort it out.</p>
            </div>
            <a className="btn btn--outline" href="visit.html#contact">Ask us about catering</a>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="How it all began"
        title="Our story"
        lead="One small oven, a lot of flour, and a belief that good bread can bring a neighbourhood together."
      />
      <section className="section section--paper">
        <div className="container split">
          <div className="split-visual" data-reveal>
            <Icon name="wheat" className="art--wheat" />
            <div className="split-note"><strong>2012</strong> the very first loaf came out of our little oven</div>
          </div>
          <div className="split-copy" data-reveal>
            <span className="eyebrow">The beginning</span>
            <h2>A kitchen table, a family recipe, and a lot of early mornings.</h2>
            <p className="lead">Hearth &amp; Crumb started in 2012 in a borrowed kitchen, with a second-hand oven and a sourdough starter we named Betty. Betty is still with us.</p>
            <p>We began by baking a few loaves a day for friends and neighbours. Word spread — mostly by the smell drifting down the street — and before long there was a queue on Saturday mornings. Today we have three little shops, but we still bake the same way: slowly, by hand, and in batches small enough to care about every single loaf.</p>
            <div className="stat-row">
              <div className="stat"><strong>12</strong><span>Years baking</span></div>
              <div className="stat"><strong>3</strong><span>Neighbourhood shops</span></div>
              <div className="stat"><strong>1</strong><span>Very old starter</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center" data-reveal>
            <span className="eyebrow">What we believe</span>
            <h2>The simple things, done well</h2>
            <p className="lead">Three little promises we make to everyone who walks through our door.</p>
          </div>
          <div className="values">
            <article className="value" data-reveal>
              <span className="value-icon"><Icon name="leaf" /></span>
              <h3>Real ingredients</h3>
              <p>Flour from a local mill, eggs from a farm down the road, and butter that actually tastes like butter. If we wouldn't eat it, we won't bake it.</p>
            </article>
            <article className="value" data-reveal>
              <span className="value-icon"><Icon name="heart" /></span>
              <h3>Made by hand</h3>
              <p>No factories, no freezer aisle. Everything is mixed, shaped and finished by real people who take pride in their work.</p>
            </article>
            <article className="value" data-reveal>
              <span className="value-icon"><Icon name="coffee" /></span>
              <h3>A place to belong</h3>
              <p>A warm corner, a friendly face and a cup of coffee poured for you. We're more than a bakery — we're your neighbours.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="container">
          <div className="section-head center" data-reveal>
            <span className="eyebrow">The people behind the flour</span>
            <h2>Meet the bakers</h2>
            <p className="lead">A small team with early starts and very good hands.</p>
          </div>
          <div className="team">
            <div className="team-card" data-reveal>
              <div className="team-photo card-art--rust"><Icon name="wheat" /></div>
              <h3>Mara</h3><span>Head baker &amp; founder</span>
            </div>
            <div className="team-card" data-reveal>
              <div className="team-photo card-art--honey"><Icon name="croissant" /></div>
              <h3>Leo</h3><span>Pastry chef</span>
            </div>
            <div className="team-card" data-reveal>
              <div className="team-photo card-art--sage"><Icon name="cupcake" /></div>
              <h3>Sam</h3><span>Cakes &amp; celebrations</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section quote">
        <div className="container quote-inner" data-reveal>
          <Icon name="heart" />
          <blockquote>"Baking is just a way of looking after people. That's all it's ever been."</blockquote>
          <cite>— Mara, founder</cite>
        </div>
      </section>
    </>
  );
}

function VisitPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="We'd love to see you"
        title="Visit us"
        lead="Find us on the corner, come in for a warm pastry and stay a while. Here's everything you need to know."
      />
      <section className="section">
        <div className="container">
          <div className="visit-grid">
            <div className="info-panel" data-reveal>
              <h3>Where &amp; when</h3>
              <div className="info-line"><Icon name="pin" /><p><strong>18 Willow Lane</strong>Old town, between the library and the park</p></div>
              <div className="info-line"><Icon name="coffee" /><p><strong>Open every day</strong>7:00am – 5:00pm</p></div>
              <div className="info-line"><Icon name="heart" /><p><strong>Fresh bakes</strong>Bread at 8am · pastries from 7am</p></div>
              <h3 style={{ marginTop: 26 }}>Opening hours</h3>
              <table className="hours">
                <tbody>
                  <tr><td>Monday – Friday</td><td>7:00am – 5:00pm</td></tr>
                  <tr><td>Saturday</td><td>7:00am – 4:00pm</td></tr>
                  <tr><td>Sunday</td><td>8:00am – 3:00pm</td></tr>
                  <tr><td>Public holidays</td><td>8:00am – 2:00pm</td></tr>
                </tbody>
              </table>
            </div>
            <div className="map-panel" data-reveal>
              <Icon name="pin" />
              <span className="map-label">18 Willow Lane · Old town</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper" id="contact">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Get in touch</span>
            <h2>Questions, orders &amp; special requests</h2>
            <p className="lead">Need a celebration cake, a party platter, or just want to say hello? Drop us a note and we'll get back to you.</p>
          </div>
          <div className="visit-grid">
            <div className="info-panel" data-reveal>
              <h3>Direct lines</h3>
              <div className="info-line"><Icon name="coffee" /><p><strong>Phone</strong>(555) 010-2030</p></div>
              <div className="info-line"><Icon name="leaf" /><p><strong>Email</strong>hello@hearthandcrumb.example</p></div>
              <div className="info-line"><Icon name="pin" /><p><strong>Address</strong>18 Willow Lane, Old town</p></div>
              <div className="info-line"><Icon name="heart" /><p><strong>Follow along</strong>Instagram · Facebook · Pinterest</p></div>
            </div>
            <div className="info-panel" data-reveal>
              <h3>Send us a message</h3>
              <form className="form-grid" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
                <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" type="text" placeholder="Jane Smith" required /></div>
                <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="jane@example.com" required /></div>
                <div className="field field--full"><label htmlFor="message">How can we help?</label><textarea id="message" name="message" placeholder="Tell us what you have in mind..." required /></div>
                <div className="field field--full"><button className="btn btn--primary" type="submit">Send message</button></div>
                <div className={`form-message${sent ? ' is-visible' : ''}`}>Thanks for your message! We'll be in touch soon.</div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head center" data-reveal>
            <span className="eyebrow">Good to know</span>
            <h2>A few common questions</h2>
          </div>
          <div className="values">
            <article className="value" data-reveal>
              <h3>Do you take orders ahead?</h3>
              <p>Yes! For sourdough loaves and celebration cakes, give us at least 48 hours' notice. Just send us a message — or use the new order page.</p>
            </article>
            <article className="value" data-reveal>
              <h3>Do you deliver?</h3>
              <p>We deliver larger cake and catering orders within the neighbourhood. Ask us for details when you get in touch.</p>
            </article>
            <article className="value" data-reveal>
              <h3>Are your bakes dairy-free?</h3>
              <p>We always have a couple of dairy-free and vegan options in the case. Let us know and we'll point them out.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

type PlacedOrder = { ref: string; name: string; slot: string; count: number; total: number };

function OrderPage() {
  const { lines, count, subtotal, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', slot: 'tomorrow-am', notes: '' });
  const [error, setError] = useState('');

  function update(field: keyof typeof form, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function placeOrder() {
    if (lines.length === 0) return;
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Please add your name, phone number and email address.');
      return;
    }
    const label = form.slot === 'today-pm' ? 'Today, 2:00 – 4:00pm'
      : form.slot === 'tomorrow-pm' ? 'Tomorrow, 2:00 – 4:00pm'
      : form.slot === 'tomorrow-noon' ? 'Tomorrow, 10:00am – 12:00pm'
      : 'Tomorrow, 8:00 – 10:00am';
    setError('');
    setPlaced({ ref: `HC-${Math.floor(1000 + Math.random() * 9000)}`, name: form.name.trim(), slot: label, count, total: subtotal });
    clear();
  }

  return (
    <>
      <PageHero
        eyebrow="Fresh from our ovens"
        title="Your order"
        lead="Pick your favourites, tell us when to have them ready, and we'll do the baking."
      />
      <section className="section section--tight">
        <div className="container">
          {placed ? (
            <div className="confirm">
              <Icon name="heart" />
              <h2>Thank you, {placed.name}!</h2>
              <p className="lead">Your order is confirmed. We'll have it ready for {placed.slot}.</p>
              <p className="ref">Order {placed.ref}</p>
              <p>{placed.count} {placed.count === 1 ? 'item' : 'items'} &middot; {money(placed.total)} &middot; Pay when you pick up.</p>
              <p style={{ marginTop: 24 }}><a className="btn btn--outline" href="menu.html" onClick={() => setPlaced(null)}>Order something else</a></p>
            </div>
          ) : lines.length === 0 ? (
            <div className="empty-order">
              <Icon name="croissant" />
              <h2>Your order is empty</h2>
              <p className="lead" style={{ margin: '0 auto 22px' }}>Browse the menu and add a few things you love — we'll keep them here for you.</p>
              <a className="btn btn--primary" href="menu.html">Explore the menu</a>
            </div>
          ) : (
            <div className="order-layout">
              <div>
                <div className="section-head">
                  <span className="eyebrow">In your basket</span>
                  <h2>{count} {count === 1 ? 'item' : 'items'} ready to bake</h2>
                  <p className="lead">Everything is baked fresh, so please give us a little time.</p>
                </div>
                <div className="cart-list">
                  {lines.map((line) => {
                    const item = findItem(line.id);
                    if (!item) return null;
                    return (
                      <div className="cart-row" key={line.id}>
                        <div className={`cart-thumb card-art--${artFor(item.icon)}`}><Icon name={item.icon} /></div>
                        <div>
                          <h3>{item.name}</h3>
                          <p>{money(item.price)} each</p>
                        </div>
                        <div className="qty">
                          <button type="button" aria-label={`One fewer ${item.name}`} onClick={() => setQty(line.id, line.qty - 1)}>−</button>
                          <span>{line.qty}</span>
                          <button type="button" aria-label={`One more ${item.name}`} onClick={() => setQty(line.id, line.qty + 1)}>+</button>
                        </div>
                        <div>
                          <div className="cart-line-total">{money(item.price * line.qty)}</div>
                          <button type="button" className="remove-btn" onClick={() => remove(line.id)}>Remove</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="menu-note" style={{ marginTop: 30 }}>
                  <div>
                    <h3>Need something special?</h3>
                    <p>Custom cakes and party platters are made to order — just ask.</p>
                  </div>
                  <a className="btn btn--outline" href="visit.html#contact">Ask us</a>
                </div>
              </div>

              <aside className="summary-card">
                <h3>Order summary</h3>
                <div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                <div className="summary-row"><span>Pickup</span><span>Free</span></div>
                <div className="summary-row total"><span>Total</span><span>{money(subtotal)}</span></div>
                <p className="summary-note">Payment is taken when you pick up. Nothing is charged online.</p>
                <form className="checkout-form" noValidate onSubmit={(event) => { event.preventDefault(); placeOrder(); }}>
                  <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={(event) => update('name', event.target.value)} /></div>
                  <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" placeholder="(555) 010-2030" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></div>
                  <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={(event) => update('email', event.target.value)} /></div>
                  <div className="field">
                    <label htmlFor="slot">Pickup time</label>
                    <select id="slot" name="slot" value={form.slot} onChange={(event) => update('slot', event.target.value)}>
                      <option value="today-pm">Today, 2:00 – 4:00pm</option>
                      <option value="tomorrow-am">Tomorrow, 8:00 – 10:00am</option>
                      <option value="tomorrow-noon">Tomorrow, 10:00am – 12:00pm</option>
                      <option value="tomorrow-pm">Tomorrow, 2:00 – 4:00pm</option>
                    </select>
                  </div>
                  <div className="field"><label htmlFor="notes">Anything else? (optional)</label><textarea id="notes" name="notes" placeholder="Special requests, allergies..." rows={3} value={form.notes} onChange={(event) => update('notes', event.target.value)} /></div>
                  {error && <div className="form-message is-visible" role="alert">{error}</div>}
                  <button className="btn btn--primary" type="submit" onClick={(event) => { event.preventDefault(); placeOrder(); }}>Place order</button>
                </form>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* --------------------------------------------------------------------- root */

const PAGES: Record<Page, () => ReactElement> = {
  home: HomePage,
  menu: MenuPage,
  about: AboutPage,
  visit: VisitPage,
  order: OrderPage,
};

export default function App({ page }: { page: Page }) {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((element) => element.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const CurrentPage = PAGES[page];

  return (
    <CartProvider>
      <Sprite />
      <Header page={page} />
      <main><CurrentPage /></main>
      <Footer />
      <Toast />
    </CartProvider>
  );
}
