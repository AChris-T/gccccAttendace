import React, { useState, useEffect } from 'react';
import QuestionForm from '../../components/Formpage/QuestionForm';
import PrayerForm from '../../components/Formpage/PrayerForm';
import TestimonyForm from '../../components/Formpage/TestimonyForm';

export default function FormPage() {
  const [activeTab, setActiveTab] = useState('Questions');

  const tabs = [
    { name: 'Questions', image: '/images/forms/qes.png' },
    { name: 'Prayer Request', image: '/images/forms/newPrayer.png' },
    { name: 'Testimony', image: '/images/forms/Ttestimony.png' },
  ];

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <div className="p-6 mt-0 mb-20 md:mt-20 lg:mt-0">
      <div className="mb-4 flex justify-center">
        <img
          src={tabs.find((t) => t.name === activeTab)?.image}
          alt={activeTab}
          className="h-32 w-3xl object-contain"
        />
      </div>

      <div className="flex space-x-0 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-2 md:px-6 py-2 -mb-px font-medium border-b-2 focus:outline-none
              ${
                activeTab === tab.name
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-white hover:text-gray-700'
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'Questions' && <QuestionForm />}
        {activeTab === 'Prayer Request' && <PrayerForm />}
        {activeTab === 'Testimony' && <TestimonyForm />}
      </div>
    </div>
  );
}
