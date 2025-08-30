import React, { useState } from "react";

import { ArrowLeft, Star, Plus } from "lucide-react";
import type { Subject, VocabularyCategory } from "../App";

interface VocabularyPageProps {
  subject: Subject;
  category: VocabularyCategory;
  onBack: () => void;
}

export default function VocabularyPage({
  subject,
  category,
  onBack,
}: VocabularyPageProps) {
  const questions = [
    {
      question:
        "A museum is a place where valuable objects and artifacts are kept and shown to people.",
      image: "/museum.jpg",
      options: ["مدرسة", "متحف", "مكتبة", "مسجد"],
      answer: "متحف",
    },
    {
      question:
        "A bus is a large vehicle that carries many passengers on the road.",
      image: "/bus.jpg",
      options: ["دراجة", "طائرة", "حافلة", "سيارة"],
      answer: "حافلة",
    },
    {
      question: "A library is a place where people can read and borrow books.",
      image: "/library.jpg",
      options: ["مكتبة", "مدرسة", "متحف", "مستشفى"],
      answer: "مكتبة",
    },
    {
      question:
        "An airplane is a vehicle that flies in the sky and carries passengers.",
      image: "/airplane.jpg",
      options: ["طائرة", "حافلة", "قطار", "دراجة"],
      answer: "طائرة",
    },
    {
      question:
        "A hospital is a place where sick people are treated by doctors and nurses.",
      image: "/hospital.jpg",
      options: ["مدرسة", "مستشفى", "مسجد", "مكتبة"],
      answer: "مستشفى",
    },
    {
      question: "A school is a place where students go to learn new things.",
      image: "/school.jpg",
      options: ["مستشفى", "مسجد", "مدرسة", "مكتبة"],
      answer: "مدرسة",
    },
    {
      question: "A mosque is a place where Muslims gather to pray.",
      image: "/mosque.jpg",
      options: ["متحف", "مسجد", "مدرسة", "مكتبة"],
      answer: "مسجد",
    },
    {
      question:
        "A train runs on tracks and carries passengers and goods across long distances.",
      image: "/train.jpg",
      options: ["حافلة", "دراجة", "طائرة", "قطار"],
      answer: "قطار",
    },
    {
      question:
        "A bicycle is a two-wheeled vehicle that a person rides by pedaling.",
      image: "/bicycle.jpg",
      options: ["طائرة", "دراجة", "حافلة", "سيارة"],
      answer: "دراجة",
    },
    {
      question:
        "A car is a vehicle with four wheels that is used for personal transportation.",
      image: "/car.jpg",
      options: ["دراجة", "سيارة", "حافلة", "قطار"],
      answer: "سيارة",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setFeedback("✅ صحيح!");
    } else {
      setFeedback("❌ خطأ، حاول مرة أخرى");
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      setFeedback("🎉 انتهيت من الاختبار!");
    }
  };

  const q = questions[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
          <span className="text-lg">رجوع</span>
        </button>

        <h1 className="text-2xl text-center font-bold text-blue-600">
          {category === "main" ? "المفردات الأساسية" : "المفردات الإضافية"} -
          الوحدة الأولى
        </h1>

        <div className="w-16"></div>
      </div>

      {/* Category Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div
            className={`inline-flex items-center gap-2 ${
              category === "main" ? "text-red-600" : "text-blue-600"
            }`}
          >
            {category === "main" ? (
              <Star className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
            <h2 className="text-2xl font-bold">
              {category === "main"
                ? "الكلمات الأساسية (20 كلمة)"
                : "الكلمات الإضافية (30 كلمة)"}
            </h2>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">التقدم في الاختبار</span>
            <span className="font-bold text-blue-600">
              {current + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                category === "main" ? "bg-red-400" : "bg-blue-400"
              }`}
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          السؤال {current + 1} من {questions.length}
        </h2>
        <p className="mb-4">{q.question}</p>
        <img
          src={q.image}
          alt="question"
          className="w-full h-48 object-cover mb-4 rounded"
        />

        <div className="space-y-2">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`w-full p-3 rounded-lg border 
              ${
                selected === opt
                  ? opt === q.answer
                    ? "bg-green-200 border-green-500"
                    : "bg-red-200 border-red-500"
                  : "bg-gray-100"
              }
              hover:bg-blue-300`}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && <p className="mt-4 text-lg font-semibold">{feedback}</p>}

        <button
          onClick={handleNext}
          disabled={!selected}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          التالي
        </button>
      </div>

      {/* Study Tips */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            نصائح للحفظ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-blue-600 mb-2">📚</div>
              <p className="text-sm text-gray-600">اقرأ الكلمة بصوت عالٍ</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-green-600 mb-2">✍️</div>
              <p className="text-sm text-gray-600">اكتب الكلمة عدة مرات</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-purple-600 mb-2">🔄</div>
              <p className="text-sm text-gray-600">راجع الكلمات يومياً</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
