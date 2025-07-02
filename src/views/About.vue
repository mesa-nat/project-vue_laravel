<template>
    <div class="about-page">
      <!-- Hero Section -->
      <section class="about-hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">About FruitStore</h1>
            <p class="hero-subtitle">Your trusted partner for fresh, organic, and delicious fruits since 2020</p>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">10,000+</span>
                <span class="stat-label">Happy Customers</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Fruit Varieties</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Organic</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Our Story Section -->
      <section class="our-story">
        <div class="container">
          <div class="story-content">
            <div class="story-text">
              <h2>Our Story</h2>
              <p>
                FruitStore was born from a simple belief: everyone deserves access to fresh, healthy, and delicious fruits. 
                Founded in 2020 by a team of health enthusiasts and fruit lovers, we started with a mission to bridge the 
                gap between local farmers and health-conscious consumers.
              </p>
              <p>
                What began as a small local delivery service has grown into a trusted online marketplace, serving thousands 
                of families across the region. We work directly with certified organic farms to ensure that every fruit 
                that reaches your table meets our strict quality standards.
              </p>
              <p>
                Today, we're proud to be your go-to destination for premium fruits, supporting both your health goals 
                and sustainable farming practices.
              </p>
            </div>
            <div class="story-image">
              <div class="image-placeholder">
                <span class="story-emoji">🌱🍎🚜</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Our Mission Section -->
      <section class="mission-section">
        <div class="container">
          <h2 class="section-title">Our Mission & Values</h2>
          <div class="mission-grid">
            <div class="mission-card">
              <div class="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To make fresh, organic fruits accessible to everyone while supporting sustainable farming practices and promoting healthy lifestyles.</p>
            </div>
            <div class="mission-card">
              <div class="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To become the leading online fruit marketplace that connects communities with nature's best offerings, one fruit at a time.</p>
            </div>
            <div class="mission-card">
              <div class="mission-icon">💚</div>
              <h3>Our Values</h3>
              <ul>
                <li>Quality & Freshness</li>
                <li>Sustainability</li>
                <li>Customer Satisfaction</li>
                <li>Fair Trade</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Why Choose Us Section -->
      <section class="why-choose-us">
        <div class="container">
          <h2 class="section-title">Why Choose FruitStore?</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">🌿</div>
              <h4>100% Organic</h4>
              <p>All our fruits are certified organic, grown without harmful pesticides or chemicals.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🚚</div>
              <h4>Fast Delivery</h4>
              <p>Same-day or next-day delivery to ensure maximum freshness when it reaches you.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🏆</div>
              <h4>Premium Quality</h4>
              <p>Hand-picked and quality-checked fruits that meet our high standards.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💰</div>
              <h4>Fair Pricing</h4>
              <p>Competitive prices with transparent pricing - no hidden fees or charges.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🤝</div>
              <h4>Supporting Farmers</h4>
              <p>We work directly with local farmers, ensuring fair compensation for their hard work.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📞</div>
              <h4>24/7 Support</h4>
              <p>Our customer service team is always ready to help with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Team Section -->
      <section class="team-section">
        <div class="container">
          <h2 class="section-title">Meet Our Team</h2>
          <p class="section-subtitle">The passionate people behind FruitStore</p>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-avatar">👨‍💼</div>
              <h4>Mesa Nath</h4>
              <p class="member-role">Founder & CEO</p>
              <p class="member-bio">Passionate about healthy living and sustainable agriculture with 10+ years in the food industry.</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">👩‍🌾</div>
              <h4>Sela Torm</h4>
              <p class="member-role">Head of Quality Control</p>
              <p class="member-bio">Agricultural expert ensuring every fruit meets our quality standards before reaching customers.</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">👨‍💻</div>
              <h4>Chhorina</h4>
              <p class="member-role">Technology Director</p>
              <p class="member-bio">Building the technology that makes fresh fruit delivery seamless and efficient.</p>
            </div>
          
          </div>
        </div>
      </section>
  
    
    </div>
  </template>
  
  <script setup>
  // No reactive data needed for this static about page
  </script>
  
  <style scoped>
  .about-page {
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Hero Section */
  .about-hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 80px 0;
    text-align: center;
  }
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 50px;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 5px;
  }
  
  .stat-label {
    font-size: 1rem;
    opacity: 0.9;
  }
  
  /* Our Story Section */
  .our-story {
    padding: 80px 0;
    background: #f8f9fa;
  }
  
  .story-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 60px;
    align-items: center;
  }
  
  .story-text h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 30px;
  }
  
  .story-text p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 20px;
  }
  
  .story-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-placeholder {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  }
  
  .story-emoji {
    font-size: 4rem;
    color: white;
  }
  
  /* Mission Section */
  .mission-section {
    padding: 80px 0;
    background: white;
  }
  
  .section-title {
    text-align: center;
    font-size: 2.8rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 50px;
  }
  
  .section-subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 50px;
  }
  
  .mission-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
  }
  
  .mission-card {
    background: #f8f9fa;
    padding: 40px 30px;
    border-radius: 20px;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  .mission-card:hover {
    border-color: #667eea;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
  }
  
  .mission-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  .mission-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
  }
  
  .mission-card p {
    color: #666;
    line-height: 1.6;
    font-size: 1rem;
  }
  
  .mission-card ul {
    list-style: none;
    padding: 0;
    color: #666;
  }
  
  .mission-card li {
    padding: 5px 0;
    position: relative;
    padding-left: 20px;
  }
  
  .mission-card li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #28a745;
    font-weight: bold;
  }
  
  /* Why Choose Us Section */
  .why-choose-us {
    padding: 80px 0;
    background: #f8f9fa;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .feature-item {
    background: white;
    padding: 30px 25px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }
  
  .feature-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .feature-item h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 15px;
  }
  
  .feature-item p {
    color: #666;
    line-height: 1.6;
  }
  
  /* Team Section */
  .team-section {
    padding: 80px 0;
    background: white;
  }
</style> 