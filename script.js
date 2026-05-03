/* CURSOR */
const cur = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

(function tick() {
  cx += (mx - cx) * .14;
  cy += (my - cy) * .14;
  cur2.style.left = cx + 'px';
  cur2.style.top = cy + 'px';
  requestAnimationFrame(tick);
})();

document.querySelectorAll('a,button,.btn,.sk,.wcard,.clink,.ps,.sv-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '18px';
    cur.style.height = '18px';
    cur2.style.width = '52px';
    cur2.style.height = '52px';
    cur2.style.opacity = '.25';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '10px';
    cur.style.height = '10px';
    cur2.style.width = '36px';
    cur2.style.height = '36px';
    cur2.style.opacity = '.5';
  });
});

/* LOADER */
let p = 0;
const lc = document.getElementById('lcount');

const ti = setInterval(() => {
  p += Math.random() * 16 + 2;
  if (p >= 100) { p = 100; clearInterval(ti); }
  lc.textContent = String(Math.floor(p)).padStart(3, '0');
}, 55);

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('out');
    document.body.classList.remove('loading');
    document.getElementById('heroImg').classList.add('loaded');
  }, 2000);
});

/* NAV */
function toggleNav() {
  document.getElementById('navRight').classList.toggle('open');
}

document.querySelectorAll('.nav-right a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('navRight').classList.remove('open'))
);

/* CREATOR MODAL */
function openModal() {
  document.getElementById('modal').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal') || e.target.closest('.mclose')) {
    document.getElementById('modal').classList.remove('on');
    document.body.style.overflow = '';
  }
}

/* WEBSITE ORDER MODAL */
function openWebModal() {
  document.getElementById('webModal').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeWebModal(e) {
  if (!e || e.target === document.getElementById('webModal') || e.target.closest('.mclose')) {
    document.getElementById('webModal').classList.remove('on');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeWebModal(); }
});

/* TOAST */
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3400);
}

/* SEND GENERAL MESSAGE */
async function sendMsg() {
  const BOT = '6595523271:AAFMCKyKyDJSTcOYSQvY3ok4feu1mTIBhSI';
  const UID = '5719914218';
  const name = document.getElementById('uname').value.trim();
  const msg = document.getElementById('umsg').value.trim();
  const btn = document.getElementById('sendBtn');
  const note = document.getElementById('fnote');

  if (!name || !msg) { toast('Please fill in all fields.'); return; }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: UID,
        text: `📩 New message from ${name}:\n\n${msg}\n\n— via Parallel Frames`
      })
    });
    const d = await r.json();
    if (d.ok) {
      toast('✓ Message sent to Vishal!');
      note.textContent = '✓ Delivered.';
      note.className = 'fnote ok';
      document.getElementById('uname').value = '';
      document.getElementById('umsg').value = '';
    } else {
      throw new Error();
    }
  } catch {
    toast('✗ Failed. Try again.');
    note.textContent = '✗ Something went wrong.';
    note.className = 'fnote err';
  } finally {
    btn.textContent = 'Send Message  →';
    btn.disabled = false;
  }
}

document.getElementById('umsg').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.ctrlKey) sendMsg();
});

/* SEND WEBSITE ORDER */
async function sendWebOrder() {
  const BOT = '6595523271:AAFMCKyKyDJSTcOYSQvY3ok4feu1mTIBhSI';
  const UID = '5719914218';
  const name = document.getElementById('wm-name').value.trim();
  const number = document.getElementById('wm-number').value.trim();
  const email = document.getElementById('wm-email').value.trim();
  const msg = document.getElementById('wm-msg').value.trim();
  const btn = document.getElementById('wmSendBtn');
  const note = document.getElementById('wm-note');

  if (!name || !number || !email || !msg) { toast('Please fill in all fields.'); return; }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('Please enter a valid email address.'); return; }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const text = `🌐 NEW WEBSITE ORDER\n\n👤 Name: ${name}\n📞 Phone: ${number}\n📧 Email: ${email}\n\n💬 Project Details:\n${msg}\n\n— via Parallel Frames`;

  try {
    const r = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: UID, text })
    });
    const d = await r.json();
    if (d.ok) {
      toast('✓ Order sent! Vishal will contact you soon.');
      note.textContent = '✓ Order received. Expect a reply within 24 hrs.';
      note.className = 'wm-note ok';
      document.getElementById('wm-name').value = '';
      document.getElementById('wm-number').value = '';
      document.getElementById('wm-email').value = '';
      document.getElementById('wm-msg').value = '';
      setTimeout(() => closeWebModal(), 2200);
    } else {
      throw new Error();
    }
  } catch {
    toast('✗ Failed to send. Please try again.');
    note.textContent = '✗ Something went wrong. Try emailing directly.';
    note.className = 'wm-note err';
  } finally {
    btn.textContent = 'Send Order  →';
    btn.disabled = false;
  }
}

/* TERMS */
function showTerms() {
  toast('Services are custom-made. Refunds subject to review. © Parallel Frames.');
}

/* SCROLL REVEAL */
const obs = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      en.target.style.transitionDelay = (i * .07) + 's';
      en.target.classList.add('vis');
      obs.unobserve(en.target);
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.rv,.rv2').forEach(el => obs.observe(el));

/* NAV SHADOW ON SCROLL */
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.boxShadow =
    window.scrollY > 20 ? '0 2px 24px rgba(14,12,10,.1)' : 'none';
});
