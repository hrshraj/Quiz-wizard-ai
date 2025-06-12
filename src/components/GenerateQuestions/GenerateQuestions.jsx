import React, { useState } from "react";
import { FaMagic } from "react-icons/fa";
import jsPDF from "jspdf";

const GenerateQuestions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    numberOfQuestions: 5,
    difficulty: "medium",
    questionType: "multiple-choice",
    includeExplanations: true,
    targetAudience: "high-school",
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const generatePDF = (questions) => {
    const doc = new jsPDF();
    let y = 10;

    questions.forEach((q, idx) => {
      doc.setFontSize(12);
      doc.setTextColor("black");
      doc.text(`${idx + 1}. ${q.question}`, 10, y);
      y += 6;

      if (q.options) {
        q.options.forEach((opt, i) => {
          doc.text(`   ${String.fromCharCode(65 + i)}. ${opt}`, 12, y);
          y += 6;
        });
      }

      doc.setTextColor("green");
      doc.text(`✅ Answer: ${q.answer}`, 12, y);
      y += 6;

      if (q.explanation) {
        doc.setTextColor("gray");
        doc.setFontSize(10);
        doc.text(`💡 ${q.explanation}`, 12, y);
        y += 8;
      }

      doc.setTextColor("black");
      y += 4;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("quiz-questions.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setQuestions([]);

    try {
      const generatedQuestions = await generateQuestionsWithAI(formData);
      setQuestions(generatedQuestions);
      generatePDF(generatedQuestions);
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuestionsWithAI = async (data) => {
    const response = await fetch("https://quiz-wizard-ai-z5pv.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to generate questions");
    }

    return response.json();
  };

  return (
    <div className="p-6 w-full">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <FaMagic className="mr-2" /> Cast Your Question-Generation Spell ✨
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/30 backdrop-blur-sm p-8 rounded-xl shadow-xl"
        >
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Mathematics, Science, History"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specific Topic
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g., Algebra, Photosynthesis"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Questions
            </label>
            <input
              type="number"
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleChange}
              min="1"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty Level
            </label>
            <select
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <select
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Audience
            </label>
            <select
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="elementary">Elementary</option>
              <option value="middle-school">Middle School</option>
              <option value="high-school">High School</option>
              <option value="college">College</option>
            </select>
          </div>

          {/* Include Explanation */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="includeExplanations"
              checked={formData.includeExplanations}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Include explanations for answers
            </label>
          </div>

          {/* Submit Button with Wand Animation */}
          <button
            type="submit"
            disabled={isLoading}
            className={`group w-full py-3 px-4 bg-purple-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 ${
              isLoading
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-purple-800"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Casting Spell...</span>
              </>
            ) : (
              <>
                <span className="text-2xl transform transition-transform duration-300 group-hover:rotate-180">
                  🪄
                </span>
                <span className="ml-2">Abra Cadabra</span>
              </>
            )}
          </button>
        </form>

        {/* Render Generated Questions */}
        {questions.length > 0 && (
          <div className="mt-10 bg-white/40 backdrop-blur-lg p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-purple-800 mb-4">
              📝 Generated Questions
            </h2>
            {questions.map((q, index) => (
              <div key={index} className="mb-6">
                <p className="font-semibold">
                  {index + 1}. {q.question}
                </p>
                {q.options && (
                  <ul className="list-disc pl-6 mt-2">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                )}
                <p className="text-green-700 mt-1">✅ Answer: {q.answer}</p>
                {q.explanation && (
                  <p className="text-sm text-gray-600 italic">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateQuestions;
