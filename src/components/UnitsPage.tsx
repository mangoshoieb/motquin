import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Book, CheckCircle } from 'lucide-react';
import type { Subject } from '../App';

interface UnitsPageProps {
  subject: Subject;
  onBack: () => void;
  onUnitSelect: (unitId: number) => void;
}

const units = [
  { id: 1, name: 'Unit 1', nameAr: 'الوحدة الأولى', progress: 100, completed: true },
  { id: 2, name: 'Unit 2', nameAr: 'الوحدة الثانية', progress: 80, completed: false },
  { id: 3, name: 'Unit 3', nameAr: 'الوحدة الثالثة', progress: 60, completed: false },
  { id: 4, name: 'Unit 4', nameAr: 'الوحدة الرابعة', progress: 30, completed: false },
  { id: 5, name: 'Unit 5', nameAr: 'الوحدة الخامسة', progress: 0, completed: false },
  { id: 6, name: 'Unit 6', nameAr: 'الوحدة السادسة', progress: 0, completed: false },
  { id: 7, name: 'Unit 7', nameAr: 'الوحدة السابعة', progress: 0, completed: false },
  { id: 8, name: 'Unit 8', nameAr: 'الوحدة الثامنة', progress: 0, completed: false },
];

export default function UnitsPage({ subject, onBack, onUnitSelect }: UnitsPageProps) {
  const handleUnitClick = (unitId: number) => {
    if (subject.id === 'english' && unitId === 1) {
      onUnitSelect(unitId);
    }
  };

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
        
        <h1 className={`text-3xl font-bold ${subject.color}`}>
          {subject.nameEn}
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Subject Banner */}
      <div className={`${subject.bgColor} rounded-3xl p-6 mb-8 text-center`}>
        <h2 className={`text-4xl font-bold ${subject.color} mb-2`}>
          {subject.name}
        </h2>
        <p className="text-gray-600 text-lg">
          اختر الوحدة التي تريد دراستها
        </p>
      </div>

      {/* Units Grid - Vertical Layout */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {units.map((unit) => (
            <div
              key={unit.id}
              onClick={() => handleUnitClick(unit.id)}
              className={`bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 group ${
                subject.id === 'english' && unit.id === 1 ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="text-center">
                {/* Unit Icon */}
                <div className={`${subject.color} mb-4 flex justify-center relative`}>
                  <Book size={48} className="group-hover:scale-110 transition-transform duration-300" />
                  {unit.completed && (
                    <CheckCircle 
                      size={20} 
                      className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full" 
                    />
                  )}
                </div>
                
                {/* Unit Title */}
                <h3 className={`${subject.color} text-2xl font-bold mb-2`}>
                  {unit.name}
                </h3>
                
                <p className="text-gray-600 text-lg mb-6">
                  {unit.nameAr}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">التقدم</span>
                    <span className={`text-sm font-bold ${subject.color}`}>
                      {unit.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        unit.progress === 100 ? 'bg-green-400' : 
                        subject.id === 'english' ? 'bg-blue-400' :
                        subject.id === 'math' ? 'bg-green-400' :
                        subject.id === 'science' ? 'bg-purple-400' :
                        subject.id === 'geography' ? 'bg-orange-400' :
                        subject.id === 'art' ? 'bg-pink-400' :
                        'bg-yellow-400'
                      }`}
                      style={{ width: `${unit.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Action Button */}
                <button 
                  className={`w-full py-3 px-6 rounded-2xl font-bold transition-all duration-300 ${
                    unit.completed 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : unit.progress > 0
                        ? `${subject.bgColor} ${subject.color} hover:shadow-lg`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${subject.id === 'english' && unit.id === 1 ? 'hover:scale-105' : ''}`}
                >
                  {unit.completed ? 'مكتملة' : unit.progress > 0 ? 'متابعة' : 'بدء'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}