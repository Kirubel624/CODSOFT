import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-24">
      <div className="max-w-2xl p-8 bg-white rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
          About Joby: Your Gateway to Career Excellence
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to Joby, where opportunities meet talent, and careers flourish! 🌐💼 At Joby, we believe in the power of connecting employers with exceptional candidates, fostering a community where careers are not just jobs but fulfilling journeys. Our online job board is more than a platform; it's a dynamic space designed to simplify and enhance the recruitment process for both employers and job seekers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Why Joby?
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>✨ Streamlined Job Posting</li>
              <li>🌐 User-Friendly Interface</li>
              <li>🚀 Career Advancement</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Our Commitment:
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>🤝 Connecting Talent</li>
              <li>🌐 Tech Innovation</li>
              <li>🙌 Community Focus</li>
            </ul>
          </div>
        </div>

        <p className="mt-8">
          Join the Joby community today! Whether you're a job seeker ready to embark on a new chapter or an employer seeking the perfect addition to your team, Joby is the platform for you. Explore our website, discover exciting opportunities, and let's build a future of career excellence together!
        </p>

        <a
          href="#"
          className="mt-8 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Explore Joby Now
        </a>
      </div>
    </div>
  );
};

export default About;
