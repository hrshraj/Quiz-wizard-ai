import React, { useState } from 'react';
import { FaMagic } from 'react-icons/fa';

const GenerateQuestions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    numberOfQuestions: 5,
    difficulty: 'medium',
    questionType: 'multiple-choice',
    includeExplanations: true,
    targetAudience: 'high-school'
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Call to OpenAI API
      const aiResponse = await generateQuestionsWithAI(formData);
      
      // 2. Generate PDF
      const pdfBlob = await generatePDF(aiResponse);
      
      // 3. Download PDF
      downloadPDF(pdfBlob);
    } catch (error) {
      console.error('Error generating questions:', error);
      // Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  // Function to call OpenAI API
  const generateQuestionsWithAI = async (data) => {
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to generate questions');
    }

    return response.json();
  };

  // Function to generate PDF using jsPDF
  const generatePDF = async (questionsData) => {
    // Implementation will be added later
    // Will use jsPDF to create PDF with questions, answers, and explanations
  };

  // Function to trigger PDF download
  const downloadPDF = (blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'quiz-questions.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-6 w-full">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <FaMagic className="mr-2" /> Cast Your Question-Generation Spell ✨
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/30 backdrop-blur-sm p-8 rounded-xl shadow-xl">
            {/* Subject Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Mathematics, Science, History"
                required
              />
            </div>

            {/* Topic Field */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topic">
                Specific Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Algebra, Chemical Reactions, World War II"
                required
              />
            </div>

            {/* Number of Questions */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfQuestions">
                Number of Questions
              </label>
              <input
                type="number"
                id="numberOfQuestions"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Difficulty Level */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Question Type */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="questionType">
                Question Type
              </label>
              <select
                id="questionType"
                name="questionType"
                value={formData.questionType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAudience">
                Target Audience
              </label>
              <select
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="elementary">Elementary School</option>
                <option value="middle-school">Middle School</option>
                <option value="high-school">High School</option>
                <option value="college">College</option>
              </select>
            </div>

            {/* Include Explanations */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="includeExplanations"
                  checked={formData.includeExplanations}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Include explanations for answers</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-purple-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 group ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Casting Spell...</span>
                </>
              ) : (
                <>
                  <span className="text-2xl group-hover:rotate-180 transition-transform duration-300">🪄</span>
                  <span className="ml-2">Abra Cadabra</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateQuestions; 