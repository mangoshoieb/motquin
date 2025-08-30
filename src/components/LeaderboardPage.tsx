import React, { useState } from 'react';
import { Trophy, Medal, Star, Users, ArrowLeft, Crown, Zap } from 'lucide-react';

interface LeaderboardPageProps {
  onBack: () => void;
}

const leaderboardData = [
  { id: 1, name: 'أحمد محمد', points: 2850, rank: 1, avatar: '👨‍🎓', streak: 15 },
  { id: 2, name: 'فاطمة علي', points: 2720, rank: 2, avatar: '👩‍🎓', streak: 12 },
  { id: 3, name: 'محمد أحمد', points: 2650, rank: 3, avatar: '👨‍💻', streak: 10 },
  { id: 4, name: 'نور الهدى', points: 2480, rank: 4, avatar: '👩‍💼', streak: 8 },
  { id: 5, name: 'عبدالله سالم', points: 2350, rank: 5, avatar: '👨‍🔬', streak: 7 },
  { id: 6, name: 'مريم خالد', points: 2200, rank: 6, avatar: '👩‍🏫', streak: 6 },
  { id: 7, name: 'يوسف عمر', points: 2100, rank: 7, avatar: '👨‍🎨', streak: 5 },
  { id: 8, name: 'سارة أحمد', points: 1950, rank: 8, avatar: '👩‍🎤', streak: 4 }
];

const competitions = [
  {
    id: 1,
    title: 'مسابقة الرياضيات الأسبوعية',
    description: 'تحدى زملاءك في حل المسائل الرياضية',
    participants: 156,
    timeLeft: '3 أيام',
    prize: '1000 جنية',
    color: 'bg-gradient-to-r from-green-400 to-green-600'
  },
  {
    id: 2,
    title: 'تحدي اللغة الإنجليزية',
    description: 'اختبر مهاراتك في القواعد والمفردات',
    participants: 203,
    timeLeft: '5 أيام',
    prize: '750 جنية',
    color: 'bg-gradient-to-r from-blue-400 to-blue-600'
  },
  {
    id: 3,
    title: 'مسابقة العلوم الشهرية',
    description: 'استكشف عالم العلوم والاكتشافات',
    participants: 89,
    timeLeft: '12 يوم',
    prize: '500 جنية',
    color: 'bg-gradient-to-r from-purple-400 to-purple-600'
  }
];

export default function LeaderboardPage({ onBack }: LeaderboardPageProps) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'competitions'>('leaderboard');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
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
          قوائم الصدارة والمسابقات
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex bg-white rounded-2xl p-2 shadow-lg">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'leaderboard'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Trophy className="w-5 h-5 inline-block ml-2" />
            قائمة الصدارة
          </button>
          <button
            onClick={() => setActiveTab('competitions')}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'competitions'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Star className="w-5 h-5 inline-block ml-2" />
            المسابقات
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            {leaderboardData.map((student, index) => (
              <div
                key={student.id}
                className={`${getRankColor(student.rank)} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      {getRankIcon(student.rank)}
                    </div>
                    
                    <div className="text-4xl">{student.avatar}</div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">سلسلة {student.streak} يوم</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-600">{student.points.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">نقطة</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'competitions' && (
          <div className="grid gap-6">
            {competitions.map((competition) => (
              <div
                key={competition.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{competition.title}</h3>
                    <p className="text-gray-600 mb-4">{competition.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{competition.participants} مشارك</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span> الجائزة النقدية: {competition.prize}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-lg font-bold text-orange-600">{competition.timeLeft}</div>
                    <div className="text-sm text-gray-500">متبقي</div>
                  </div>
                </div>
                
                <button className={`w-full ${competition.color} text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                  انضم للمسابقة
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}