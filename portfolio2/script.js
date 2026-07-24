// ─────────────────────────────────────────────
// AOS INITIALIZE
// Scroll animations on karo
// ─────────────────────────────────────────────
AOS.init({
  duration: 600,  // animation speed (ms)
  once: true,     // sirf ek baar animate ho
  offset: 60      // kitna visible ho tab animate kare
});


// ─────────────────────────────────────────────
// TYPING ANIMATION
// Hero mein "I build ___" wali line
// ─────────────────────────────────────────────

// Jo words type honge
const words = [
  'Landing Pages.',
  'Ecommerce Stores.',
  'Business Websites.',
  'Portfolio Sites.',
  'Website Redesigns.'
];

let wordIndex  = 0;     // abhi konsa word chal raha
let charIndex  = 0;     // kitne characters type hue
let isDeleting = false; // delete ho raha hai ya type

// HTML mein id="typedWord" wala element
const typedEl = document.getElementById('typedWord');

function type() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    // ─── TYPE MODE — character add karo ───
    charIndex++;
    typedEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === currentWord.length) {
      // Poora word type ho gaya
      // Thodi der ruko phir delete shuru karo
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }

  } else {
    // ─── DELETE MODE — character hatao ───
    charIndex--;
    typedEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
      // Sab delete ho gaya — agla word lo
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      // % words.length matlab last word ke baad
      // wapis pehle word pe aao
    }
  }

  // Typing speed:
  // Delete: 55ms (tezi se)
  // Type: 90ms (thoda slow — natural lage)
  setTimeout(type, isDeleting ? 55 : 90);
}

// ─────────────────────────────────────────────
// CONTACT FORM — Success message dikhao
// ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('formSubmitBtn');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    successMsg.style.display = 'none';
    formError.style.display = 'none';

    const botcheck = form.querySelector('[name=botcheck]');
    if (botcheck && botcheck.checked) {
      return;
    }

    const formData = new FormData(form);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success) {
          successMsg.style.display = 'block';
          form.reset();
        } else {
          formError.textContent = data.message || 'Message not delivered. Please try again or email me directly.';
          formError.style.display = 'block';
        }
      })
      .catch(function(error) {
        console.error('Web3Forms error:', error);
        formError.textContent = 'Could not send. Use Live Server or deploy online, or email me directly.';
        formError.style.display = 'block';
      })
      .finally(function() {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message →';
        }
      });
  });
}
// Animation start karo
type();


// ─────────────────────────────────────────────
// HAMBURGER MENU
// Mobile pe nav links show/hide karo
// ─────────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Hamburger click pe menu open/close
hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('open');
  // toggle = agar open hai toh band karo
  //          agar band hai toh kholo
});
// ─────────────────────────────────────────────
// FAQ ACCORDION
// Click pe open/close hoga
// ─────────────────────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function(item) {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', function() {

    // Agar yeh already open hai toh band karo
    const isActive = item.classList.contains('active');

    // Pehle sab band karo
    faqItems.forEach(function(i) {
      i.classList.remove('active');
    });

    // Agar pehle band tha toh kholo
    if (!isActive) {
      item.classList.add('active');
    }

  });
});
// Koi link click kare toh menu band ho jaye
navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
});

// Light mode toggle
const lightToggle = document.getElementById('lightToggle');
function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
}
// Initialize theme based on saved preference
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme('dark');
  }
})();

lightToggle.addEventListener('click', function() {
  const isLight = document.documentElement.classList.contains('light-mode');
  applyTheme(isLight ? 'dark' : 'light');
});

// FAQ keyboard accessibility: allow Enter/Space to toggle
faqItems.forEach(function(item) {
  const question = item.querySelector('.faq-question');
  question.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      question.click();
    }
  });
});