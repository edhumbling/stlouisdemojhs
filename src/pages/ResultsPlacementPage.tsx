import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';

const ResultsPlacementPage = () => {
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const [activeViewer, setActiveViewer] = useState<'results' | 'placement' | null>(null);

  useEffect(() => {
    // Hide header on mobile when viewer is active
    if (activeViewer && window.innerWidth <= 768) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [activeViewer, setShowHeader]);

  const handleBack = () => {
    if (activeViewer) {
      setActiveViewer(null);
    } else {
      navigate(-1);
    }
  };

  if (activeViewer === 'results') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
                <span>Back to Checkers</span>
              </button>
              <h1 className="text-lg font-semibold text-gray-900">BECE Results Checker</h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-4rem)]">
          <iframe
            src="https://eresults.waecgh.org/"
            className="w-full h-full border-0"
            title="BECE Results Checker"
          />
        </div>
      </div>
    );
  }

  if (activeViewer === 'placement') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
                <span>Back to Checkers</span>
              </button>
              <h1 className="text-lg font-semibold text-gray-900">SHS Placement Checker</h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-4rem)]">
          <iframe
            src="https://cssps.gov.gh/placement.html"
            className="w-full h-full border-0"
            title="SHS Placement Checker"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Results & Placement Checker</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BECE Results Checker Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">BECE Results Checker</h2>
              <p className="text-gray-600 mb-6">
                Check your BECE results online through the official WAEC portal. You'll need your index number and other required details.
              </p>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">How to Check:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Visit the WAEC e-Results portal</li>
                  <li>Select your exam type (BECE School/Private)</li>
                  <li>Enter your index number</li>
                  <li>Enter your date of birth</li>
                  <li>Click "Submit" to view your results</li>
                </ol>
              </div>
              <button
                onClick={() => setActiveViewer('results')}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.7)]"
              >
                Check BECE Results
              </button>
            </div>
          </div>

          {/* SHS Placement Checker Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">SHS Placement Checker</h2>
              <p className="text-gray-600 mb-6">
                Check your Senior High School placement through the official CSSPS portal. You'll need your BECE index number and year.
              </p>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">How to Check:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Visit the CSSPS Placement Checker</li>
                  <li>Enter your 10-digit BECE index number</li>
                  <li>Include the year of your BECE exam</li>
                  <li>Click "Check Placement" to view your school</li>
                </ol>
              </div>
              <button
                onClick={() => setActiveViewer('placement')}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.7)]"
              >
                Check SHS Placement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPlacementPage; 