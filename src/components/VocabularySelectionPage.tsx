import React from 'react';
import { ArrowLeft, Star, Plus, BookOpen, Target } from 'lucide-react';
import type { Subject, VocabularyCategory } from '../App';

interface VocabularySelectionPageProps {
  subject: Subject;
  unit: number;
  onBack: () => void;
  onVocabularySelect: (category: VocabularyCategory) => void;
}

export default function VocabularySelectionPage({ subject, unit, onBack, onVocabularySelect }: VocabularySelectionPageProps) {
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
          حفظ المفردات - الوحدة {unit}
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Subject Banner */}
      <div className={`${subject.bgColor} rounded-3xl p-6 mb-12 text-center`}>
        <h2 className={`text-4xl font-bold ${subject.color} mb-2`}>
          {subject.name}
        </h2>
        <p className="text-gray-600 text-lg">
          اختر نوع المفردات التي تريد دراستها
        </p>
      </div>

      {/* Vocabulary Categories */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Vocabulary */}
          <div
            onClick={() => onVocabularySelect('main')}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="text-center">
              <div className="bg-red-100 p-6 rounded-full inline-block mb-6">
                <Star className="w-12 h-12 text-red-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-3xl font-bold text-red-600 mb-4">
                المفردات الأساسية
              </h3>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                أهم 20 كلمة يجب حفظها في هذه الوحدة
              </p>
              
              <div className="bg-red-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <Target className="w-5 h-5" />
                  <span className="font-bold">20 كلمة أساسية</span>
                </div>
              </div>
              
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform group-hover:scale-105">
                ابدأ الحفظ
              </button>
            </div>
          </div>

          {/* Additional Vocabulary */}
          <div
            onClick={() => onVocabularySelect('additional')}
            className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="text-center">
              <div className="bg-blue-100 p-6 rounded-full inline-block mb-6">
                <Plus className="w-12 h-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-3xl font-bold text-blue-600 mb-4">
                المفردات الإضافية
              </h3>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                30 كلمة إضافية لتوسيع مفرداتك
              </p>
              
              <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-bold">30 كلمة إضافية</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform group-hover:scale-105">
                ابدأ الحفظ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">نصائح للحفظ الفعال</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-blue-600 mb-2 text-2xl">🎯</div>
              <p className="text-sm text-gray-600">ابدأ بالكلمات الأساسية أولاً</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-green-600 mb-2 text-2xl">🔄</div>
              <p className="text-sm text-gray-600">راجع الكلمات يومياً</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-purple-600 mb-2 text-2xl">📝</div>
              <p className="text-sm text-gray-600">استخدم الكلمات في جمل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}