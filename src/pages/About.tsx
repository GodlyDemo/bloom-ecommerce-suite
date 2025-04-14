import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Welcome to Bloom E-commerce, your premier destination for online shopping. We are dedicated to providing
          high-quality products and an exceptional shopping experience to our customers.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              Our mission is to deliver outstanding value through a curated selection of products,
              exceptional customer service, and a seamless shopping experience.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              We strive to be the most trusted e-commerce platform, known for our reliability,
              quality, and customer-first approach.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6">
            <li>Quality assured products</li>
            <li>Secure shopping experience</li>
            <li>Fast and reliable shipping</li>
            <li>Excellent customer support</li>
            <li>Easy returns and refunds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 