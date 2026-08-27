// Preloader fade-out transition
window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.classList.add('preloader-done');
    }, 1800);
  }
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const siteHeader = document.querySelector('.site-header');

if (menuButton && navigation) {
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (navigation.classList.contains('open')) {
      const isClickInsideHeader = siteHeader && siteHeader.contains(event.target);
      if (!isClickInsideHeader) {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

document.querySelectorAll('a[href="#top"]').forEach((topLink) => {
  topLink.addEventListener('click', (event) => {
    event.preventDefault();
    navigation?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach((element) => revealObserver.observe(element));

if (siteHeader) {
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = 'Đang gửi...';
  formStatus.textContent = '';

  try {
    const formData = Object.fromEntries(new FormData(contactForm));
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Không thể gửi biểu mẫu.');
    formStatus.textContent = 'Cảm ơn bạn. Hồ Tràm Santorini sẽ liên hệ sớm nhất.';
    formStatus.style.color = '#dfc48d';
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = error.message || 'Có lỗi khi gửi thông tin. Vui lòng thử lại hoặc gọi 0909 123 456.';
    formStatus.style.color = '#e2a5a0';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

const newsletterForm = document.querySelector('#newsletter-form');
const newsletterStatus = document.querySelector('#newsletter-status');
if (newsletterForm) newsletterForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = newsletterForm.querySelector('button');
  submitButton.disabled = true;
  newsletterStatus.textContent = 'Đang đăng ký...';
  try {
    const response = await fetch(newsletterForm.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(newsletterForm))) });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Không thể đăng ký.');
    newsletterStatus.textContent = 'Đăng ký thành công. Cảm ơn bạn!';
    newsletterStatus.className = 'newsletter-status success';
    newsletterForm.reset();
  } catch (error) {
    newsletterStatus.textContent = 'Có lỗi khi đăng ký. Vui lòng thử lại.';
    newsletterStatus.className = 'newsletter-status error';
  } finally {
    submitButton.disabled = false;
  }
});

const backToTopBtn = document.querySelector('#back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}