document.addEventListener('DOMContentLoaded', () => {
  console.log('Application Loaded');
  
  // Example interaction: precise hover effects or dynamic greeting
  const heroTitle = document.querySelector('h1');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 100);
  }
});
