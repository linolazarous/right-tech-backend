import React from 'react';

const HomePage = () => {
  console.log('🏠 HomePage rendering...');

  // Test each component one by one by uncommenting them

  return (
    <div className="min-h-screen">
      {/* Test 1: Just Hero */}
      <div style={{ background: 'linear-gradient(to right, #4f46e5, #7c3aed)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Right Tech Centre</h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>Testing Hero Section Only</p>
      </div>

      {/* Uncomment one at a time to find which breaks */}
      
      {/* Test 2: Add Programs */}
      {/* <div style={{ padding: '80px 20px', background: '#f9fafb', textAlign: 'center' }}>
        <h2>Programs Section</h2>
        <p>If you see this, Programs works</p>
      </div> */}

      {/* Test 3: Add Features */}
      {/* <div style={{ padding: '80px 20px', background: 'white', textAlign: 'center' }}>
        <h2>Features Section</h2>
        <p>If you see this, Features works</p>
      </div> */}

      {/* Test 4: Add Testimonials */}
      {/* <div style={{ padding: '80px 20px', background: '#f9fafb', textAlign: 'center' }}>
        <h2>Testimonials Section</h2>
        <p>If you see this, Testimonials works</p>
      </div> */}

      {/* Test 5: Add CTA */}
      {/* <div style={{ padding: '80px 20px', background: 'linear-gradient(to right, #4f46e5, #7c3aed)', color: 'white', textAlign: 'center' }}>
        <h2>CTA Section</h2>
        <p>If you see this, CTA works</p>
      </div> */}
    </div>
  );
};

export default HomePage;
