// components/CallToAction.jsx
import React from 'react';

const CallToAction = () => {
  return (
    <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to elevate your brand?</span>
          <span className="block text-blue-200">Get started with custom merchandise today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md text-base font-medium hover:bg-blue-50">
              Request a Quote
            </button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <button className="border border-white text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;