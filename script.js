document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Nav Header
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  // 3. Dynamic Navigation Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies the center of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // 4. Dynamic Workshop Status Tracker
  function updateWorkshopStatus() {
    const statusText = document.getElementById('statusText');
    const statusBanner = document.getElementById('statusBanner');
    const pulseDot = statusBanner.querySelector('.pulse-dot');
    
    // Setting up the date targets in IST timezone
    const today = new Date();
    
    // Let's create comparison dates based on local time
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 0-indexed
    const day = today.getDate();
    
    // Check if the current date is within July 2026 (for our specific dates July 15, 16, 17)
    if (year === 2026 && month === 7) {
      if (day === 15) {
        statusText.textContent = "Workshop Day 1 Ongoing!";
        pulseDot.style.backgroundColor = "#39ff14";
        pulseDot.style.boxShadow = "0 0 10px #39ff14";
      } else if (day === 16) {
        statusText.textContent = "Workshop Day 2 Ongoing!";
        pulseDot.style.backgroundColor = "#39ff14";
        pulseDot.style.boxShadow = "0 0 10px #39ff14";
      } else if (day === 17) {
        statusText.textContent = "Workshop Day 3 Ongoing!";
        pulseDot.style.backgroundColor = "#39ff14";
        pulseDot.style.boxShadow = "0 0 10px #39ff14";
      } else if (day < 15) {
        statusText.textContent = "Registration Open";
        pulseDot.style.backgroundColor = "#00f0ff";
        pulseDot.style.boxShadow = "0 0 10px #00f0ff";
      } else {
        statusText.textContent = "Workshop Completed";
        pulseDot.style.backgroundColor = "#ff007f";
        pulseDot.style.boxShadow = "0 0 10px #ff007f";
      }
    } else if (year < 2026 || (year === 2026 && month < 7)) {
      statusText.textContent = "Registration Open";
      pulseDot.style.backgroundColor = "#00f0ff";
      pulseDot.style.boxShadow = "0 0 10px #00f0ff";
    } else {
      statusText.textContent = "Workshop Completed";
      pulseDot.style.backgroundColor = "#ff007f";
      pulseDot.style.boxShadow = "0 0 10px #ff007f";
    }
  }
  
  updateWorkshopStatus();

  // 5. FAQ Accordion Expand/Collapse
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Close all open FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle current FAQ
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // 6. Registration Form Simulation
  const registrationForm = document.getElementById('registrationForm');
  const formWrapper = document.getElementById('formWrapper');
  const successScreen = document.getElementById('successScreen');
  const successName = document.getElementById('successName');
  const successEmail = document.getElementById('successEmail');
  const registrationId = document.getElementById('registrationId');
  const resetFormBtn = document.getElementById('resetFormBtn');

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form inputs
    const nameVal = document.getElementById('fullName').value;
    const emailVal = document.getElementById('emailAddress').value;
    
    // Get submit button to show loading animation
    const submitBtn = registrationForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    
    // Simulate API request/Database write
    setTimeout(() => {
      // Generate a registration ID
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const regIdStr = `WISDOM-2026-DEV-${randomDigits}`;
      
      // Set success details
      successName.textContent = nameVal;
      successEmail.textContent = emailVal;
      registrationId.textContent = regIdStr;
      
      // Hide form, show success screen
      formWrapper.classList.add('hidden');
      successScreen.classList.remove('hidden');
      
      // Smooth scroll back to form container
      document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  });

  // Reset form and view
  resetFormBtn.addEventListener('click', () => {
    registrationForm.reset();
    
    // Reset submit button state
    const submitBtn = registrationForm.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Proceed to Pay ₹150</span> <i class="fa-solid fa-arrow-right-long"></i>';
    
    successScreen.classList.add('hidden');
    formWrapper.classList.remove('hidden');
  });
});
