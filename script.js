document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 1500);

    // 2. Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileBtn.classList.toggle('active');
    });

    // 4. Scroll Animations (Lightweight)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                if(entry.target.dataset.delay) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.delay}ms`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // 5. Property Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            propertyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 6. Mortgage Calculator Logic (Adjusted for Georgian Context)
    const homePriceInput = document.getElementById('home-price');
    const homePriceRange = document.getElementById('home-price-range');
    const downPaymentInput = document.getElementById('down-payment');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTermInput = document.getElementById('loan-term');
    const monthlyPaymentDisplay = document.getElementById('monthly-payment');

    if(homePriceRange) {
        homePriceRange.addEventListener('input', (e) => {
            homePriceInput.value = e.target.value;
            calculateMortgage();
        });
        homePriceInput.addEventListener('input', (e) => {
            homePriceRange.value = e.target.value;
            calculateMortgage();
        });
    }

    [downPaymentInput, interestRateInput, loanTermInput].forEach(el => {
        if(el) el.addEventListener('input', calculateMortgage);
    });

    function calculateMortgage() {
        if(!homePriceInput) return;

        const price = parseFloat(homePriceInput.value);
        const down = parseFloat(downPaymentInput.value);
        const rate = parseFloat(interestRateInput.value) / 100 / 12; // Monthly
        const term = parseFloat(loanTermInput.value) * 12; // Months

        const principal = price - down;
        
        if (principal <= 0) {
            monthlyPaymentDisplay.innerText = "$0";
            return;
        }

        const x = Math.pow(1 + rate, term);
        const monthly = (principal * x * rate) / (x - 1);

        if(isFinite(monthly)) {
            monthlyPaymentDisplay.innerText = "$" + monthly.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        } else {
            monthlyPaymentDisplay.innerText = "$0";
        }
    }

    calculateMortgage();
});

// 7. Favorites System
let favCount = 0;
function toggleFavorite(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    const countBadge = document.getElementById('fav-count');
    const heartBtn = document.getElementById('favorites-btn');

    if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        favCount++;
        heartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => heartBtn.style.transform = 'scale(1)', 200);
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        favCount--;
    }
    countBadge.innerText = favCount;
}

// 8. Parallax
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.parallax');
    if (heroImage) {
        let scrollPosition = window.pageYOffset;
        heroImage.style.transform = `scale(1.1) translateY(${scrollPosition * 0.4}px)`;
    }
});