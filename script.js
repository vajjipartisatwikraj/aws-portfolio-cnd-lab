// Portfolio Data - Loaded from JSON files
let portfolioData = {};

// Load JSON data from files
async function loadPortfolioData() {
  try {
    const [metaInfo, skills, projects, certificates, achievements] = await Promise.all([
      fetch('./data/meta-info.json').then(res => res.json()),
      fetch('./data/technical-skills.json').then(res => res.json()),
      fetch('./data/projects.json').then(res => res.json()),
      fetch('./data/certificates.json').then(res => res.json()),
      fetch('./data/achievements.json').then(res => res.json())
    ]);

    portfolioData = {
      ...metaInfo,
      skills,
      projects,
      certifications: certificates,
      achievements
    };

    return portfolioData;
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    return null;
  }
}

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", async () => {
  // Load portfolio data first
  await loadPortfolioData();
  
  if (portfolioData) {
    // Initialize portfolio
    initializePortfolio();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    setTimeout(observeElements, 100);
  }
});

// Initialize Portfolio Function
function initializePortfolio() {
  loadPersonalInfo();
  loadEducation();
  loadSkills();
  loadProjects();
  loadCertifications();
  loadAchievements();
  loadInterests();
  loadContactInfo();
  loadSocialLinks();
}

// Load Personal Information
function loadPersonalInfo() {
  if (!portfolioData.personalInfo) return;
  
  const { personalInfo } = portfolioData;
  
  // Set page title
  const pageTitle = document.getElementById('page-title');
  if (pageTitle) pageTitle.textContent = `${personalInfo.name} | Portfolio`;
  
  // Set navigation logo
  const navLogo = document.getElementById('nav-logo');
  if (navLogo) navLogo.textContent = personalInfo.name.toUpperCase();
  
  // Set hero name
  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = personalInfo.name;
  
  // Set profile image
  const profileImage = document.getElementById('profile-image');
  if (profileImage) {
    profileImage.src = personalInfo.profileImage;
    profileImage.alt = personalInfo.name;
  }
  
  // Set personal details
  const personalName = document.getElementById('personal-name');
  const locationEl = document.getElementById('location');
  const phoneEl = document.getElementById('phone');
  const emailEl = document.getElementById('email');
  const footerName = document.getElementById('footer-name');
  
  if (personalName) personalName.textContent = personalInfo.name;
  if (locationEl) locationEl.textContent = personalInfo.location;
  if (phoneEl) phoneEl.textContent = personalInfo.phone;
  if (emailEl) emailEl.textContent = personalInfo.email;
  if (footerName) footerName.textContent = personalInfo.name;
}

// Load Education Timeline
function loadEducation() {
  if (!portfolioData.education) return;
  
  const educationTimeline = document.getElementById('education-timeline');
  if (!educationTimeline) return;
  
  educationTimeline.innerHTML = '';
  
  portfolioData.education.forEach((edu, index) => {
    const educationItem = document.createElement('div');
    educationItem.className = 'education-item';
    educationItem.innerHTML = `
      <div class="education-card">
        <div class="education-year">${edu.year}</div>
        <div class="education-degree">${edu.degree}</div>
        <div class="education-school">${edu.school}</div>
        <div class="education-description">${edu.description}</div>
      </div>
    `;
    educationTimeline.appendChild(educationItem);
  });
}

// Load Skills
function loadSkills() {
  if (!portfolioData.skills) return;
  
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;
  
  skillsGrid.innerHTML = '';
  
  portfolioData.skills.forEach(skillCategory => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-category';
    skillCard.innerHTML = `
      <h3>${skillCategory.category}</h3>
      <div class="skill-items">
        ${skillCategory.items.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
      </div>
    `;
    skillsGrid.appendChild(skillCard);
  });
}

// Load Projects
function loadProjects() {
  if (!portfolioData.projects) return;
  
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;
  
  projectsGrid.innerHTML = '';
  
  portfolioData.projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" />
        ${project.video ? `<div class="project-video" onclick="openVideoModal('${project.video}')">▶</div>` : ''}
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-technologies">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.demoLink}" class="project-link link-demo" target="_blank">Live Demo</a>
          <a href="${project.codeLink}" class="project-link link-code" target="_blank">View Code</a>
        </div>
      </div>
    `;
    projectsGrid.appendChild(projectCard);
  });
}

// Load Certifications
function loadCertifications() {
  if (!portfolioData.certifications) return;
  
  const certificationsGrid = document.getElementById('certifications-grid');
  if (!certificationsGrid) return;
  
  certificationsGrid.innerHTML = '';
  
  portfolioData.certifications.forEach(cert => {
    const certCard = document.createElement('div');
    certCard.className = 'certification-card';
    certCard.innerHTML = `
      <div class="certification-image">
        <img src="${cert.image}" alt="${cert.title}" />
      </div>
      <h3 class="certification-title">${cert.title}</h3>
      <div class="certification-issuer">${cert.issuer}</div>
      <div class="certification-date">${cert.date}</div>
      <a href="${cert.link}" class="certification-link" target="_blank">View Certificate</a>
    `;
    certificationsGrid.appendChild(certCard);
  });
}

// Load Achievements
function loadAchievements() {
  if (!portfolioData.achievements) return;
  
  const achievementsGrid = document.getElementById('achievements-grid');
  if (!achievementsGrid) return;
  
  achievementsGrid.innerHTML = '';
  
  portfolioData.achievements.forEach(achievement => {
    const achievementCard = document.createElement('div');
    achievementCard.className = 'achievement-card';
    achievementCard.innerHTML = `
      <div class="achievement-icon"><i class="${achievement.icon}"></i></div>
      <h3 class="achievement-title">${achievement.title}</h3>
      <p class="achievement-description">${achievement.description}</p>
    `;
    achievementsGrid.appendChild(achievementCard);
  });
}

// Load Interests
function loadInterests() {
  if (!portfolioData.interests) return;
  
  const interestsGrid = document.getElementById('interests-grid');
  if (!interestsGrid) return;
  
  interestsGrid.innerHTML = '';
  
  portfolioData.interests.forEach(interest => {
    const interestCard = document.createElement('div');
    interestCard.className = 'interest-card';
    interestCard.innerHTML = `
      <div class="interest-icon"><i class="${interest.icon}"></i></div>
      <h3 class="interest-title">${interest.title}</h3>
    `;
    interestsGrid.appendChild(interestCard);
  });
}

// Load Contact Information
function loadContactInfo() {
  if (!portfolioData.contact) return;
  
  const contactDetails = document.getElementById('contact-details');
  if (!contactDetails) return;
  
  const { contact } = portfolioData;
  
  contactDetails.innerHTML = `
    <div class="contact-item">
      <div class="contact-item-icon"><i class="fas fa-envelope"></i></div>
      <div class="contact-item-content">
        <div class="contact-item-label">Email</div>
        <div class="contact-item-value">${contact.email}</div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-item-icon"><i class="fas fa-phone"></i></div>
      <div class="contact-item-content">
        <div class="contact-item-label">Phone</div>
        <div class="contact-item-value">${contact.phone}</div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-item-icon"><i class="fas fa-map-marker-alt"></i></div>
      <div class="contact-item-content">
        <div class="contact-item-label">Location</div>
        <div class="contact-item-value">${contact.location}</div>
      </div>
    </div>
  `;
}

// Load Social Links
function loadSocialLinks() {
  if (!portfolioData.contact) return;
  
  const socialLinks = document.getElementById('social-links');
  if (!socialLinks) return;
  
  const { contact } = portfolioData;
  
  socialLinks.innerHTML = `
    <a href="${contact.linkedin}" class="social-link" target="_blank"><i class="fab fa-linkedin"></i></a>
    <a href="${contact.github}" class="social-link" target="_blank"><i class="fab fa-github"></i></a>
    <a href="${contact.twitter}" class="social-link" target="_blank"><i class="fab fa-twitter"></i></a>
    <a href="${contact.instagram}" class="social-link" target="_blank"><i class="fab fa-instagram"></i></a>
  `;
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (navMenu) {
          navMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(35, 47, 62, 0.98)';
    } else {
      navbar.style.background = 'rgba(35, 47, 62, 0.95)';
    }
  });
}

// Handle Contact Form Submission
function handleContactForm(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const { name, email, subject, message } = Object.fromEntries(formData);
  
  // Validate required fields
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    alert('Please fill in all fields.');
    return;
  }
  
  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Simulate form submission
  alert('Thank you for your message! I will get back to you soon.');
  e.target.reset();
}

// Open Video Modal (for project videos)
function openVideoModal(videoUrl) {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.9); display: flex; justify-content: center;
    align-items: center; z-index: 10000; cursor: pointer;
  `;
  
  const iframe = document.createElement('iframe');
  iframe.src = videoUrl;
  iframe.style.cssText = `
    width: 80%; height: 80%; max-width: 800px; max-height: 450px;
    border: none; border-radius: 10px;
  `;
  iframe.setAttribute('allowfullscreen', '');
  
  modal.appendChild(iframe);
  document.body.appendChild(modal);
  
  // Close modal on click or escape
  modal.onclick = (e) => e.target === modal && document.body.removeChild(modal);
  
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      document.body.removeChild(modal);
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  document.addEventListener('keydown', closeOnEscape);
}

// Intersection Observer for animations
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}
