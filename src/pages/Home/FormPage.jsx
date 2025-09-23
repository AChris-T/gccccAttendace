import React, { useState, useEffect } from 'react';
import QuestionForm from '../../components/Formpage/QuestionForm';
import PrayerForm from '../../components/Formpage/PrayerForm';
import TestimonyForm from '../../components/Formpage/TestimonyForm';

export default function FormPage() {
  const [activeTab, setActiveTab] = useState('Question');

  const tabs = [
    { name: 'Question', image: '/images/forms/qes.png' },
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
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full mx-2 md:max-w-xl md:mx-auto h-[80vh] custom-scrollbar overflow-y-auto bg-white shadow rounded-md p-6 mt-20 mb-20 md:mt-20 lg:mt-20">
        <div className="mb-4 flex justify-center">
          <img
            src={tabs.find((t) => t.name === activeTab)?.image}
            alt={activeTab}
            className="h-32 w-xl object-contain"
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
                  ? 'border-[#24244e]  hover:text-[#1a1a40] text-[#24244e] font-medium '
                  : 'border-transparent text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'Question' && <QuestionForm />}
          {activeTab === 'Prayer Request' && <PrayerForm />}
          {activeTab === 'Testimony' && <TestimonyForm />}
        </div>
      </div>
    </div>
  );
}
