import React from 'react';
import { BookOpen, Calculator, Microscope, Globe, Palette, Music, ArrowLeft } from 'lucide-react';
import type { Subject } from '../App';

interface SubjectsPageProps {
  onSubjectSelect: (subject: Subject) => void;
  onBack: () => void;
}

const subjects: Subject[] = [
  {
    id: 'english',
    name: 'الإنجليزية',
    nameEn: 'English',
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200'
  },
  {
    id: 'math',
    name: 'الرياضيات',
    nameEn: 'Mathematics',
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-100 to-green-200'
  },
  {
    id: 'science',
    name: 'العلوم',
    nameEn: 'Science',
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200'
  },
  {
    id: 'geography',
    name: 'الجغرافيا',
    nameEn: 'Geography',
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200'
  },
  {
    id: 'art',
    name: 'الفنون',
    nameEn: 'Art',
    color: 'text-pink-600',
    bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200'
  },
  {
    id: 'music',
    name: 'الموسيقى',
    nameEn: 'Music',
    color: 'text-yellow-600',
    bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200'
  }
];

const subjectIcons = {
  english: BookOpen,
  math: Calculator,
  science: Microscope,
  geography: Globe,
  art: Palette,
  music: Music
};

export default function SubjectsPage({ onSubjectSelect, onBack }: SubjectsPageProps) {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
          <span className="text-lg">رجوع</span>
        </button>
        
        <div className="flex-1"></div>
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'serif' }}>
          أتقن دروسك
        </h1>
        <p className="text-gray-600 text-lg">اختر المادة التي تريد دراستها</p>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const IconComponent = subjectIcons[subject.id as keyof typeof subjectIcons];
            
            return (
              <div
                key={subject.id}
                onClick={() => onSubjectSelect(subject)}
                className={`${subject.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer group`}
              >
                <div className="text-center">
                  <div className={`${subject.color} mb-4 flex justify-center`}>
                    <IconComponent size={64} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <h3 className={`${subject.color} text-2xl font-bold mb-2`}>
                    {subject.name}
                  </h3>
                  
                  <p className="text-gray-600 text-lg font-medium">
                    {subject.nameEn}
                  </p>
                  
                  <div className="mt-6 flex justify-center">
                    <div className={`${subject.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <ArrowLeft size={24} className="transform rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-16 flex justify-center">
        <div className="flex space-x-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === 0 ? 'bg-blue-400' :
                i === 1 ? 'bg-green-400' :
                i === 2 ? 'bg-purple-400' :
                i === 3 ? 'bg-orange-400' :
                i === 4 ? 'bg-pink-400' :
                'bg-yellow-400'
              } animate-pulse`}
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}