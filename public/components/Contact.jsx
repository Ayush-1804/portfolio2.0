// Contact.jsx — React Contact Form Component
// Mounted via Babel standalone, no build step needed

const { useState } = React;

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message too short';
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('sending');
    // Simulate a submission (replace with real endpoint / EmailJS / etc.)
    await new Promise(r => setTimeout(r, 1600));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="contact-layout">
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <p>Always open to discussing new opportunities, projects, or just a tech conversation.</p>
          <ContactDetails />
        </div>
        <div className="contact-form-wrap">
          <div className="form-success">
            <i className="fas fa-check-circle"></i>
            Message sent! I'll get back to you soon.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-layout">
      <div className="contact-info">
        <h3>Let's Connect</h3>
        <p>Always open to discussing new opportunities, projects, or just a tech conversation. Drop a message below.</p>
        <ContactDetails />
      </div>

      <div className="contact-form-wrap">
        <div className="form-title">Send a Message</div>
        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-name">Your Name</label>
            <input
              id="cf-name"
              className="form-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={errors.name ? {borderColor:'var(--red)'} : {}}
            />
            {errors.name && <ErrorMsg msg={errors.name} />}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-email">Email Address</label>
            <input
              id="cf-email"
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              style={errors.email ? {borderColor:'var(--red)'} : {}}
            />
            {errors.email && <ErrorMsg msg={errors.email} />}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              className="form-textarea"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Hi Ayush, I'd love to discuss..."
              style={errors.message ? {borderColor:'var(--red)'} : {}}
            />
            {errors.message && <ErrorMsg msg={errors.message} />}
          </div>

          <button
            type="submit"
            className="form-submit"
            disabled={status === 'sending'}
          >
            {status === 'sending'
              ? <><i className="fas fa-spinner fa-spin"></i> Sending...</>
              : <><i className="fas fa-paper-plane"></i> Send Message</>
            }
          </button>

        </form>
      </div>
    </div>
  );
}

function ContactDetails() {
  return (
    <div>
      <a href="tel:+919619337010" className="contact-detail">
        <div className="contact-detail-icon"><i className="fas fa-phone"></i></div>
        <div className="contact-detail-text">
          <span>Phone</span>
          <strong>+91 9619337010</strong>
        </div>
      </a>
      <a href="mailto:Ayushpatra0892@gmail.com" className="contact-detail">
        <div className="contact-detail-icon"><i className="fas fa-envelope"></i></div>
        <div className="contact-detail-text">
          <span>Email</span>
          <strong>Ayushpatra0892@gmail.com</strong>
        </div>
      </a>
      <div className="contact-detail">
        <div className="contact-detail-icon"><i className="fas fa-map-marker-alt"></i></div>
        <div className="contact-detail-text">
          <span>Location</span>
          <strong>Mumbai, Maharashtra</strong>
        </div>
      </div>
    </div>
  );
}

function ErrorMsg({ msg }) {
  return (
    <span style={{fontSize:'12px', color:'var(--red)', marginTop:'4px', display:'block'}}>
      <i className="fas fa-exclamation-circle" style={{marginRight:'4px'}}></i>{msg}
    </span>
  );
}

// Mount React component
const contactRoot = document.getElementById('contact-root');
if (contactRoot) {
  ReactDOM.createRoot(contactRoot).render(React.createElement(ContactForm));
}
