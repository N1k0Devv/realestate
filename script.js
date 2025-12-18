document.addEventListener("DOMContentLoaded", function () {
  // 1. Preloader with animation
  setTimeout(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
    }
  }, 1500);

  // 2. Navigation Scroll Effect with smooth transition
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // 3. Mobile Menu with animation
  const mobileBtn = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  mobileBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileBtn.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileBtn.classList.remove("active");
    });
  });

  // 4. Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 5. Scroll Animations (Enhanced)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
        if (entry.target.dataset.delay) {
          entry.target.style.transitionDelay = `${entry.target.dataset.delay}ms`;
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));

  // 6. Property Filtering with smooth animations
  const filterBtns = document.querySelectorAll(".filter-btn");
  const propertyCards = document.querySelectorAll(".property-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      propertyCards.forEach((card, index) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50 + index * 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => (card.style.display = "none"), 300);
        }
      });
    });
  });

  // 7. Mortgage Calculator Logic with real-time updates
  const homePriceInput = document.getElementById("home-price");
  const homePriceRange = document.getElementById("home-price-range");
  const downPaymentInput = document.getElementById("down-payment");
  const interestRateInput = document.getElementById("interest-rate");
  const loanTermInput = document.getElementById("loan-term");
  const monthlyPaymentDisplay = document.getElementById("monthly-payment");

  if (homePriceRange) {
    homePriceRange.addEventListener("input", (e) => {
      homePriceInput.value = e.target.value;
      calculateMortgage();
    });

    homePriceInput.addEventListener("input", (e) => {
      homePriceRange.value = e.target.value;
      calculateMortgage();
    });
  }

  if (downPaymentInput)
    downPaymentInput.addEventListener("input", calculateMortgage);
  if (interestRateInput)
    interestRateInput.addEventListener("input", calculateMortgage);
  if (loanTermInput) loanTermInput.addEventListener("input", calculateMortgage);

  function calculateMortgage() {
    if (!homePriceInput) return;

    const price = parseFloat(homePriceInput.value) || 0;
    const down = parseFloat(downPaymentInput?.value) || 0;
    const rate = parseFloat(interestRateInput?.value) || 7.5;
    const term = parseFloat(loanTermInput?.value) || 20;

    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    const principal = price - down;

    if (principal <= 0 || monthlyRate === 0) {
      if (monthlyPaymentDisplay) monthlyPaymentDisplay.innerText = "$0";
      return;
    }

    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthly = (principal * x * monthlyRate) / (x - 1);

    if (isFinite(monthly) && monthlyPaymentDisplay) {
      animateValue(monthlyPaymentDisplay, 0, monthly, 500);
    } else if (monthlyPaymentDisplay) {
      monthlyPaymentDisplay.innerText = "$0";
    }
  }

  // Animate number changes
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = progress * (end - start) + start;
      element.innerText =
        "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  calculateMortgage();

  // 8. Enhanced Parallax Effect
  window.addEventListener("scroll", () => {
    const heroImage = document.querySelector(".parallax");
    if (heroImage) {
      let scrollPosition = window.pageYOffset;
      heroImage.style.transform = `scale(1.1) translateY(${
        scrollPosition * 0.4
      }px)`;
    }
  });

  // 9. Form submission with animation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        submitBtn.textContent = "✓ Message Sent!";
        setTimeout(() => {
          submitBtn.textContent = originalText;
          contactForm.reset();
        }, 2000);
      }, 1000);
    });
  }

  // 10. Newsletter form animation
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const button = newsletterForm.querySelector("button");
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i>';

      setTimeout(() => {
        button.innerHTML = originalHTML;
        newsletterForm.reset();
      }, 2000);
    });
  }
});

// 11. Favorites System
let favCount = 0;
function toggleFavorite(btn) {
  btn.classList.toggle("active");
  const icon = btn.querySelector("i");
  const countBadge = document.getElementById("fav-count");

  if (btn.classList.contains("active")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
    favCount++;
    createFloatingHeart(btn);
  } else {
    icon.classList.remove("fas");
    icon.classList.add("far");
    favCount--;
  }

  countBadge.innerText = favCount;
}

// Create floating heart animation
function createFloatingHeart(button) {
  const heart = document.createElement("i");
  heart.className = "fas fa-heart";
  heart.style.position = "absolute";
  heart.style.color = "var(--accent)";
  heart.style.fontSize = "20px";
  heart.style.pointerEvents = "none";
  heart.style.animation = "floatUp 1s ease-out forwards";

  const rect = button.getBoundingClientRect();
  heart.style.left = rect.left + rect.width / 2 + "px";
  heart.style.top = rect.top + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
}

// Add animations CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes floatUp {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-50px) scale(1.5); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// 12. Scroll progress indicator
const scrollProgress = document.createElement("div");
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--primary-hover));
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
});

// 13. Back to Top button
const backToTop = document.createElement("button");
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent);
    color: #000;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.style.opacity = "1";
    backToTop.style.visibility = "visible";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.visibility = "hidden";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToTop.addEventListener("mouseenter", function () {
  this.style.transform = "translateY(-5px) scale(1.1)";
  this.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.5)";
});

backToTop.addEventListener("mouseleave", function () {
  this.style.transform = "translateY(0) scale(1)";
  this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
});

// 13. Add floating animation to stats on hover
const statItems = document.querySelectorAll(".stat-item");
statItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.animation = "float 1s ease-in-out infinite";
  });
  item.addEventListener("mouseleave", function () {
    this.style.animation = "";
  });
});

// 14. Active navigation link based on scroll position
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
