(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  // ==========================================
  // 1. THEME MANAGEMENT (Light / Dark)
  // ==========================================
  const isDark = () => {
    if (root.dataset.theme) {
      return root.dataset.theme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = isDark() ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (e) {
        console.warn('Unable to access localStorage for theme preference', e);
      }
    });
  }

  // ==========================================
  // 2. READING PROGRESS BAR & SCROLL HANDLING
  // ==========================================
  const progressBar = document.getElementById('progressBar');
  const nav = document.querySelector('.nav');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Update progress bar
    if (progressBar && docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = `${progress}%`;
    }

    // Nav blur border on scroll
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 15);
    }

    // Scroll to top button visibility
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', scrollY > 400);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 3. MOBILE MENU
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking navigation links
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 4. SCROLLSPY & ANIMATION REVEAL
  // ==========================================
  if ('IntersectionObserver' in window) {
    // Reveal animation
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });

    // Nav Scrollspy
    const navItems = navLinks ? [...navLinks.querySelectorAll('a')] : [];
    const navMap = new Map(
      navItems
        .filter((a) => a.getAttribute('href').startsWith('#'))
        .map((a) => [a.getAttribute('href').slice(1), a])
    );

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navMap.forEach((a) => a.classList.remove('active'));
        const activeLink = navMap.get(entry.target.id);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px'
    });

    navMap.forEach((_, id) => {
      const sectionEl = document.getElementById(id);
      if (sectionEl) {
        spyObserver.observe(sectionEl);
      }
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // ==========================================
  // 5. TOAST & COPY EMAIL FEEDBACK
  // ==========================================
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  const copyEmailBtn = document.getElementById('copyEmail');
  const copyBtnText = document.getElementById('copyBtnText');
  const copyIcon = document.getElementById('copyIcon');

  if (copyEmailBtn) {
    const originalText = copyBtnText ? copyBtnText.textContent : 'Sao chép email';
    const originalIconSvg = copyIcon ? copyIcon.innerHTML : '';
    let copyResetTimer;

    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.dataset.email || 'dattruong0108@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        
        // Visual button state feedback
        if (copyBtnText) copyBtnText.textContent = '✓ Đã sao chép!';
        if (copyIcon) {
          copyIcon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
        }
        showToast(`Đã sao chép ${email} vào bộ nhớ tạm!`);

        clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = originalText;
          if (copyIcon) copyIcon.innerHTML = originalIconSvg;
        }, 2500);
      } catch (err) {
        // Fallback prompt if clipboard fails
        showToast(email);
      }
    });
  }

  // ==========================================
  // 6. DYNAMIC CURRENT YEAR
  // ==========================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
