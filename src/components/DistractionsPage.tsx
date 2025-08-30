import React, { useState, useEffect } from 'react';
import { Shield, Smartphone, Clock, Settings, ArrowLeft, Play, Pause, RotateCcw, Mail, Lock, Unlock, Timer, Calendar } from 'lucide-react';

interface DistractionsPageProps {
  onBack: () => void;
}

const socialMediaApps = [
  { name: 'فيسبوك', icon: '📘', blocked: false, timeSpent: '2h 15m' },
  { name: 'إنستغرام', icon: '📷', blocked: false, timeSpent: '1h 45m' },
  { name: 'تيك توك', icon: '🎵', blocked: false, timeSpent: '3h 20m' },
  { name: 'سناب شات', icon: '👻', blocked: false, timeSpent: '45m' },
  { name: 'تويتر', icon: '🐦', blocked: false, timeSpent: '1h 10m' },
  { name: 'يوتيوب', icon: '📺', blocked: false, timeSpent: '2h 30m' },
  { name: 'واتساب', icon: '💬', blocked: false, timeSpent: '1h 5m' },
  { name: 'تلغرام', icon: '✈️', blocked: false, timeSpent: '30m' }
];

export default function DistractionsPage({ onBack }: DistractionsPageProps) {
  const [apps, setApps] = useState(socialMediaApps);
  const [blockingMode, setBlockingMode] = useState<'study-plan' | 'specific-time'>('study-plan');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [isSupervisorSet, setIsSupervisorSet] = useState(false);
  const [showSupervisorForm, setShowSupervisorForm] = useState(false);
  const [studyTimer, setStudyTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && studyTimer > 0) {
      interval = setInterval(() => {
        setStudyTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, studyTimer]);

  const toggleAppBlock = (index: number) => {
    if (isSupervisorSet && isBlocked) {
      alert('لا يمكن تغيير إعدادات التطبيقات أثناء فترة الحجب. اتصل بالمشرف للتغيير.');
      return;
    }
    
    setApps(prev => prev.map((app, i) => 
      i === index ? { ...app, blocked: !app.blocked } : app
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setStudyTimer(25 * 60);
  };

  const handleBlockApps = () => {
    if (blockingMode === 'study-plan') {
      // Block apps until study plan is finished
      setApps(prev => prev.map(app => ({ ...app, blocked: true })));
      setIsBlocked(true);
      alert('تم حجب التطبيقات حتى انتهاء خطة الدراسة');
    } else {
      // Block apps for specific time
      if (!blockEndTime) {
        alert('يرجى تحديد وقت انتهاء الحجب');
        return;
      }
      setApps(prev => prev.map(app => ({ ...app, blocked: true })));
      setIsBlocked(true);
      alert(`تم حجب التطبيقات حتى ${blockEndTime}`);
    }
  };

  const handleUnblockApps = () => {
    if (isSupervisorSet) {
      const supervisorConfirm = prompt('أدخل بريد المشرف الإلكتروني لإلغاء الحجب:');
      if (supervisorConfirm !== supervisorEmail) {
        alert('بريد إلكتروني خاطئ. لا يمكن إلغاء الحجب.');
        return;
      }
    }
    
    setApps(prev => prev.map(app => ({ ...app, blocked: false })));
    setIsBlocked(false);
    alert('تم إلغاء حجب التطبيقات');
  };

  const handleSetSupervisor = () => {
    if (!supervisorEmail.includes('@')) {
      alert('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    setIsSupervisorSet(true);
    setShowSupervisorForm(false);
    alert('تم تعيين المشرف بنجاح. الآن لا يمكن تغيير الإعدادات إلا بموافقة المشرف.');
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
        
        <h1 className="text-3xl font-bold text-blue-600">
          منع المشتتات
        </h1>
        
        <div className="w-16"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section 1: Apps Control */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">التحكم في التطبيقات</h2>
            {isSupervisorSet && (
              <div className="mr-auto flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                <Lock className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-medium">محمي بالمشرف</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-md:max-h-[400px] overflow-y-auto p-2">
            {apps.map((app, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  app.blocked 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="text-center">
                  <span className="text-3xl mb-2 block">{app.icon}</span>
                  <h3 className="font-bold text-gray-800 mb-1">{app.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">استخدام: {app.timeSpent}</p>
                  
                  <button
                    onClick={() => toggleAppBlock(index)}
                    disabled={isSupervisorSet && isBlocked}
                    className={`w-full px-3 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                      app.blocked
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    } ${isSupervisorSet && isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {app.blocked ? 'محجوب' : 'مسموح'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Blocking Options */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">خيارات الحجب</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Study Plan Option */}
            <div
              onClick={() => !isBlocked && setBlockingMode('study-plan')}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                blockingMode === 'study-plan'
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-200'
              } ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  حجب حتى انتهاء خطتي الدراسية
                </h3>
                <p className="text-gray-600 text-sm">
                  سيتم حجب التطبيقات حتى تكمل جميع مهام الدراسة المخططة
                </p>
              </div>
            </div>

            {/* Specific Time Option */}
            <div
              onClick={() => !isBlocked && setBlockingMode('specific-time')}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                blockingMode === 'specific-time'
                  ? 'bg-purple-50 border-purple-300'
                  : 'bg-gray-50 border-gray-200 hover:border-purple-200'
              } ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  حجب في اوفات محدده في اليوم
                </h3>
                <p className="text-gray-600 text-sm">
                  حدد وقت انتهاء الحجب بدقة
                </p>
              </div>
            </div>
          </div>

          {/* Time Selection for Specific Time Mode */}
          {blockingMode === 'specific-time' && !isBlocked && (
            <div className="bg-purple-50 rounded-2xl p-6 mb-6">
              <label className="block text-purple-700 font-bold mb-2">
                حدد وقت انتهاء الحجب:
              </label>
              <input
                type="datetime-local"
                value={blockEndTime}
                onChange={(e) => setBlockEndTime(e.target.value)}
                className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
              />
            </div>
          )}

          {/* Block/Unblock Button */}
          <div className="text-center">
            {!isBlocked ? (
              <button
                onClick={handleBlockApps}
                disabled={blockingMode === 'specific-time' && !blockEndTime}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                تفعيل حجب التطبيقات
              </button>
            ) : (
              <button
                onClick={handleUnblockApps}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                إلغاء حجب التطبيقات
              </button>
            )}
          </div>
        </div>

        {/* Section 3: Supervisor Email */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">إعدادات المشرف</h2>
            {isSupervisorSet && (
              <div className="mr-auto flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">مفعل</span>
              </div>
            )}
          </div>

          {!isSupervisorSet ? (
            <div className="text-center">
              <div className="bg-orange-100 p-6 rounded-2xl mb-6">
                <p className="text-orange-700 mb-4">
                  إضافة بريد المشرف سيمنعك من تغيير إعدادات الحجب بسهولة
                </p>
                <p className="text-sm text-orange-600">
                  سيتطلب إدخال بريد المشرف لإلغاء الحجب أو تغيير الإعدادات
                </p>
              </div>

              {!showSupervisorForm ? (
                <button
                  onClick={() => setShowSupervisorForm(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  إضافة مشرف
                </button>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  <input
                    type="email"
                    value={supervisorEmail}
                    onChange={(e) => setSupervisorEmail(e.target.value)}
                    placeholder="أدخل بريد المشرف الإلكتروني"
                    className="w-full p-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-center"
                    dir="ltr"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSetSupervisor}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
                    >
                      تأكيد
                    </button>
                    <button
                      onClick={() => {
                        setShowSupervisorForm(false);
                        setSupervisorEmail('');
                      }}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-100 p-6 rounded-2xl mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-6 h-6 text-green-600" />
                  <span className="text-green-700 font-bold">المشرف مفعل</span>
                </div>
                <p className="text-green-600 text-sm">
                  البريد الإلكتروني: {supervisorEmail}
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                الآن لا يمكن تغيير إعدادات الحجب إلا بموافقة المشرف
              </p>
            </div>
          )}
        </div>

        {/* Section 4: Study Timer */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Timer className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">مؤقت الدراسة</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Timer Display */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {formatTime(studyTimer)}
                </div>
                <p className="text-gray-600 text-lg">دقائق متبقية</p>
                
                {studyTimer === 0 && (
                  <div className="mt-4 p-4 bg-green-100 rounded-2xl">
                    <p className="text-green-700 font-bold">🎉 أحسنت! انتهى وقت الدراسة</p>
                  </div>
                )}
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={startTimer}
                  disabled={isTimerRunning || studyTimer === 0}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Play size={24} />
                </button>
                
                <button
                  onClick={pauseTimer}
                  disabled={!isTimerRunning}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Pause size={24} />
                </button>
                
                <button
                  onClick={resetTimer}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <RotateCcw size={24} />
                </button>
              </div>
            </div>

            {/* Timer Presets */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">أوقات مقترحة للدراسة</h3>
              <div className="space-y-3">
                {[
                  { label: '25 دقيقة (بوموديرو)', minutes: 25 },
                  { label: '45 دقيقة (جلسة متوسطة)', minutes: 45 },
                  { label: '60 دقيقة (جلسة طويلة)', minutes: 60 },
                  { label: '90 دقيقة (جلسة مكثفة)', minutes: 90 }
                ].map((preset) => (
                  <button
                    key={preset.minutes}
                    onClick={() => {
                      setStudyTimer(preset.minutes * 60);
                      setIsTimerRunning(false);
                    }}
                    disabled={isTimerRunning}
                    className="w-full p-3 text-right bg-gray-100 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 rounded-xl transition-all duration-200 hover:border-blue-300"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Custom Timer */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                <label className="block text-gray-700 font-bold mb-2">
                  وقت مخصص (بالدقائق):
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  placeholder="30"
                  disabled={isTimerRunning}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:opacity-50"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      const minutes = parseInt(target.value);
                      if (minutes > 0 && minutes <= 180) {
                        setStudyTimer(minutes * 60);
                        setIsTimerRunning(false);
                        target.value = '';
                      }
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">اضغط Enter لتعيين الوقت</p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Progress Indicator */}
        {isTimerRunning && (
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4">جلسة الدراسة جارية</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${((25 * 60 - studyTimer) / (25 * 60)) * 100}%` 
                  }}
                ></div>
              </div>
              <p className="text-gray-600">
                استمر في التركيز! {formatTime(studyTimer)} متبقية
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}