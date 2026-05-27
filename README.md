# Ayush Bhajman Patra — Portfolio

A modern personal portfolio website built with HTML, CSS, JavaScript, and React.

## 🚀 Features
- Dark / Light theme toggle (persisted in localStorage)
- Page-flip / page-turn transition animation between sections
- Custom animated cursor
- Typewriter role animation on Hero
- React Contact Form with validation
- Responsive (mobile + desktop)
- Glassmorphism card UI
- Animated skill tags, education bars, staggered card reveals

## 📁 Structure
```
portfolio/
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles + CSS variables
├── script.js           ← Navigation, cursor, animations, typer
├── components/
│   └── Contact.jsx     ← React contact form (Babel standalone)
└── README.md
```

## ▶️ How to Run

**Option 1 — Direct open:**  
Just open `index.html` in your browser. Everything works via CDN — no build step needed.

**Option 2 — Local server (recommended):**
```bash
# Python
python3 -m http.server 3000

# Node (npx)
npx serve .
```
Then visit `http://localhost:3000`

## 🌐 Deploy for Free
- **GitHub Pages**: Push to a repo → Settings → Pages → Deploy from root
- **Netlify**: Drag and drop the folder at netlify.com/drop
- **Vercel**: `npx vercel` in the folder

## 🔧 Customisation
- Replace `#` hrefs in `index.html` with your real GitHub / LinkedIn / Resume URLs
- To hook up the contact form for real: integrate [EmailJS](https://emailjs.com) or [Formspree](https://formspree.io) in `Contact.jsx`
- Swap fonts in `index.html` `<link>` tag as desired

---
*Built with ♥ in Mumbai*
