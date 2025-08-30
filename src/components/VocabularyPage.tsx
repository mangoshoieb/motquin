import React, { useState } from 'react';
import { ArrowLeft, Volume2, Eye, EyeOff, RotateCcw, Star, Plus, Book } from 'lucide-react';
import type { Subject, VocabularyCategory } from '../App';

interface VocabularyPageProps {
  subject: Subject;
  category: VocabularyCategory;
  onBack: () => void;
}

interface Word {
  id: number;
  english: string;
  arabic: string;
  pronunciation: string;
  example: string;
  category: 'important' | 'additional';
}

const vocabularyWords: Word[] = [
  // Most Important Words (20)
  { id: 1, english: 'Hello', arabic: 'مرحبا', pronunciation: 'هيلو', example: 'Hello, how are you?', category: 'important' },
  { id: 2, english: 'Thank you', arabic: 'شكرا لك', pronunciation: 'ثانك يو', example: 'Thank you for your help', category: 'important' },
  { id: 3, english: 'Please', arabic: 'من فضلك', pronunciation: 'بليز', example: 'Please help me', category: 'important' },
  { id: 4, english: 'Sorry', arabic: 'آسف', pronunciation: 'سوري', example: 'Sorry, I am late', category: 'important' },
  { id: 5, english: 'Yes', arabic: 'نعم', pronunciation: 'يس', example: 'Yes, I agree', category: 'important' },
  { id: 6, english: 'No', arabic: 'لا', pronunciation: 'نو', example: 'No, I disagree', category: 'important' },
  { id: 7, english: 'Good', arabic: 'جيد', pronunciation: 'جود', example: 'This is good', category: 'important' },
  { id: 8, english: 'Bad', arabic: 'سيء', pronunciation: 'باد', example: 'This is bad', category: 'important' },
  { id: 9, english: 'Water', arabic: 'ماء', pronunciation: 'ووتر', example: 'I need water', category: 'important' },
  { id: 10, english: 'Food', arabic: 'طعام', pronunciation: 'فود', example: 'I like this food', category: 'important' },
  { id: 11, english: 'House', arabic: 'منزل', pronunciation: 'هاوس', example: 'This is my house', category: 'important' },
  { id: 12, english: 'School', arabic: 'مدرسة', pronunciation: 'سكول', example: 'I go to school', category: 'important' },
  { id: 13, english: 'Friend', arabic: 'صديق', pronunciation: 'فريند', example: 'He is my friend', category: 'important' },
  { id: 14, english: 'Family', arabic: 'عائلة', pronunciation: 'فاميلي', example: 'I love my family', category: 'important' },
  { id: 15, english: 'Happy', arabic: 'سعيد', pronunciation: 'هابي', example: 'I am happy today', category: 'important' },
  { id: 16, english: 'Sad', arabic: 'حزين', pronunciation: 'ساد', example: 'She looks sad', category: 'important' },
  { id: 17, english: 'Big', arabic: 'كبير', pronunciation: 'بيج', example: 'This is a big car', category: 'important' },
  { id: 18, english: 'Small', arabic: 'صغير', pronunciation: 'سمول', example: 'This is a small book', category: 'important' },
  { id: 19, english: 'Help', arabic: 'مساعدة', pronunciation: 'هيلب', example: 'Can you help me?', category: 'important' },
  { id: 20, english: 'Love', arabic: 'حب', pronunciation: 'لوف', example: 'I love learning', category: 'important' },

  // Additional Words (30)
  { id: 21, english: 'Beautiful', arabic: 'جميل', pronunciation: 'بيوتيفول', example: 'The flower is beautiful', category: 'additional' },
  { id: 22, english: 'Difficult', arabic: 'صعب', pronunciation: 'ديفيكولت', example: 'This test is difficult', category: 'additional' },
  { id: 23, english: 'Easy', arabic: 'سهل', pronunciation: 'إيزي', example: 'This lesson is easy', category: 'additional' },
  { id: 24, english: 'Important', arabic: 'مهم', pronunciation: 'إمبورتانت', example: 'This is important', category: 'additional' },
  { id: 25, english: 'Interesting', arabic: 'مثير للاهتمام', pronunciation: 'إنترستنج', example: 'The story is interesting', category: 'additional' },
  { id: 26, english: 'Wonderful', arabic: 'رائع', pronunciation: 'وندرفول', example: 'What a wonderful day!', category: 'additional' },
  { id: 27, english: 'Excellent', arabic: 'ممتاز', pronunciation: 'إكسيلنت', example: 'Your work is excellent', category: 'additional' },
  { id: 28, english: 'Perfect', arabic: 'مثالي', pronunciation: 'برفكت', example: 'This is perfect', category: 'additional' },
  { id: 29, english: 'Amazing', arabic: 'مذهل', pronunciation: 'أميزنج', example: 'This view is amazing', category: 'additional' },
  { id: 30, english: 'Fantastic', arabic: 'رائع جدا', pronunciation: 'فانتاستك', example: 'You did a fantastic job', category: 'additional' },
  { id: 31, english: 'Comfortable', arabic: 'مريح', pronunciation: 'كومفورتابل', example: 'This chair is comfortable', category: 'additional' },
  { id: 32, english: 'Dangerous', arabic: 'خطير', pronunciation: 'دينجروس', example: 'This road is dangerous', category: 'additional' },
  { id: 33, english: 'Expensive', arabic: 'غالي', pronunciation: 'إكسبنسف', example: 'This car is expensive', category: 'additional' },
  { id: 34, english: 'Cheap', arabic: 'رخيص', pronunciation: 'تشيب', example: 'This book is cheap', category: 'additional' },
  { id: 35, english: 'Fast', arabic: 'سريع', pronunciation: 'فاست', example: 'He runs fast', category: 'additional' },
  { id: 36, english: 'Slow', arabic: 'بطيء', pronunciation: 'سلو', example: 'The turtle is slow', category: 'additional' },
  { id: 37, english: 'Strong', arabic: 'قوي', pronunciation: 'سترونج', example: 'He is very strong', category: 'additional' },
  { id: 38, english: 'Weak', arabic: 'ضعيف', pronunciation: 'ويك', example: 'The signal is weak', category: 'additional' },
  { id: 39, english: 'Hot', arabic: 'حار', pronunciation: 'هوت', example: 'The weather is hot', category: 'additional' },
  { id: 40, english: 'Cold', arabic: 'بارد', pronunciation: 'كولد', example: 'The water is cold', category: 'additional' },
  { id: 41, english: 'Bright', arabic: 'مشرق', pronunciation: 'برايت', example: 'The sun is bright', category: 'additional' },
  { id: 42, english: 'Dark', arabic: 'مظلم', pronunciation: 'دارك', example: 'The room is dark', category: 'additional' },
  { id: 43, english: 'Clean', arabic: 'نظيف', pronunciation: 'كلين', example: 'The house is clean', category: 'additional' },
  { id: 44, english: 'Dirty', arabic: 'متسخ', pronunciation: 'دورتي', example: 'The car is dirty', category: 'additional' },
  { id: 45, english: 'New', arabic: 'جديد', pronunciation: 'نيو', example: 'I have a new phone', category: 'additional' },
  { id: 46, english: 'Old', arabic: 'قديم', pronunciation: 'أولد', example: 'This is an old building', category: 'additional' },
  { id: 47, english: 'Young', arabic: 'شاب', pronunciation: 'يونج', example: 'She is young', category: 'additional' },
  { id: 48, english: 'Quiet', arabic: 'هادئ', pronunciation: 'كوايت', example: 'The library is quiet', category: 'additional' },
  { id: 49, english: 'Loud', arabic: 'صاخب', pronunciation: 'لاود', example: 'The music is loud', category: 'additional' },
  { id: 50, english: 'Careful', arabic: 'حذر', pronunciation: 'كيرفول', example: 'Be careful!', category: 'additional' }
];

export default function VocabularyPage({ subject, category, onBack }: VocabularyPageProps) {
  const [showMeaning, setShowMeaning] = useState<{ [key: number]: boolean }>({});
  const [studyMode, setStudyMode] = useState<'learn' | 'test'>('learn');

  const importantWords = vocabularyWords.filter(word => word.category === 'important');
  const additionalWords = vocabularyWords.filter(word => word.category === 'additional');
  const currentWords = category === 'main' ? importantWords : additionalWords;

  const toggleMeaning = (wordId: number) => {
    setShowMeaning(prev => ({
      ...prev,
      [wordId]: !prev[wordId]
    }));
  };

  const resetProgress = () => {
    setShowMeaning({});
  };

  const playPronunciation = (word: string) => {
    // In a real app, this would use text-to-speech API
    console.log(`Playing pronunciation for: ${word}`);
  };

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
          {category === 'main' ? 'المفردات الأساسية' : 'المفردات الإضافية'} - الوحدة الأولى
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Category Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className={`inline-flex items-center gap-2 ${
            category === 'main' ? 'text-red-600' : 'text-blue-600'
          }`}>
            {category === 'main' ? <Star className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            <h2 className="text-2xl font-bold">
              {category === 'main' ? 'الكلمات الأساسية (20 كلمة)' : 'الكلمات الإضافية (30 كلمة)'}
            </h2>
          </div>
        </div>
      </div>

      {/* Study Mode Toggle */}
      {/* <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-800">وضع الدراسة</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setStudyMode('learn')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${
                  studyMode === 'learn'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                تعلم
              </button>
              <button
                onClick={() => setStudyMode('test')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${
                  studyMode === 'test'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                اختبر نفسك
              </button>
              <button
                onClick={resetProgress}
                className="px-4 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">التقدم في {category === 'main' ? 'الكلمات الأساسية' : 'الكلمات الإضافية'}</span>
            <span className="font-bold text-blue-600">
              {Object.keys(showMeaning).filter(id => currentWords.some(w => w.id === parseInt(id) && showMeaning[parseInt(id)])).length} / {currentWords.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                category === 'main' ? 'bg-red-400' : 'bg-blue-400'
              }`}
              style={{ 
                width: `${(Object.keys(showMeaning).filter(id => currentWords.some(w => w.id === parseInt(id) && showMeaning[parseInt(id)])).length / currentWords.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Words Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentWords.map((word) => (
            <div
              key={word.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className={`p-1 ${
                category === 'main' 
                  ? 'bg-gradient-to-r from-red-400 to-red-600' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
              }`}></div>
              
              <div className="p-6">
                {/* English Word */}
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {studyMode === 'test' && !showMeaning[word.id] ? '???' : word.english}
                  </h3>
                  
                  {(studyMode === 'learn' || showMeaning[word.id]) && (
                    <>
                      <p className="text-gray-500 text-sm mb-2">[{word.pronunciation}]</p>
                      <button
                        onClick={() => playPronunciation(word.english)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Arabic Translation */}
                <div className="text-center mb-4">
                  {studyMode === 'learn' || showMeaning[word.id] ? (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xl font-bold text-blue-600 mb-2">{word.arabic}</p>
                      <p className="text-gray-600 text-sm italic">"{word.example}"</p>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-xl p-4 h-20 flex items-center justify-center">
                      <span className="text-gray-400">اضغط لإظهار المعنى</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => toggleMeaning(word.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    showMeaning[word.id]
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : category === 'main'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {showMeaning[word.id] ? (
                    <>
                      <EyeOff className="w-5 h-5" />
                      إخفاء المعنى
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5" />
                      إظهار المعنى
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">نصائح للحفظ</h3>
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