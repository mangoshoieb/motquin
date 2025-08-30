import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import MainMenuPage from './components/MainMenuPage';
import SubjectsPage from './components/SubjectsPage';
import UnitsPage from './components/UnitsPage';
import LeaderboardPage from './components/LeaderboardPage';
import ChatBotPage from './components/ChatBotPage';
import DistractionsPage from './components/DistractionsPage';
import VocabularyPage from './components/VocabularyPage';
import VocabularySelectionPage from './components/VocabularySelectionPage';

export type Page = 'login' | 'mainMenu' | 'subjects' | 'units' | 'vocabulary' | 'leaderboard' | 'chatbot' | 'distractions';

export interface Subject {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  bgColor: string;
}

export type VocabularyCategory = 'main' | 'additional';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [vocabularyCategory, setVocabularyCategory] = useState<number | null>(null);

  const handleLogin = () => {
    setCurrentPage('mainMenu');
  };

  const handleMenuSelect = (page: Page) => {
    setCurrentPage(page);
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentPage('units');
  };

  const handleUnitSelect = (unitId: number) => {
    setSelectedUnit(unitId);
    setCurrentPage('vocabularySelection');
  };

  const handleVocabularySelect = (category: VocabularyCategory) => {
    setVocabularyCategory(category);
    setCurrentPage('vocabulary');
  };

  const handleBackToSubjects = () => {
    setCurrentPage('subjects');
    setSelectedSubject(null);
    setSelectedUnit(null);
    setVocabularyCategory(null);
  };

  const handleBackToUnits = () => {
    setCurrentPage('units');
    setSelectedUnit(null);
    setVocabularyCategory(null);
  };

  const handleBackToVocabularySelection = () => {
    setCurrentPage('vocabularySelection');
    setVocabularyCategory(null);
  };

  const handleBackToMenu = () => {
    setCurrentPage('mainMenu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      
      {currentPage === 'mainMenu' && (
        <MainMenuPage onMenuSelect={handleMenuSelect} />
      )}
      
      {currentPage === 'subjects' && (
        <SubjectsPage onSubjectSelect={handleSubjectSelect} onBack={handleBackToMenu} />
      )}
      
      {currentPage === 'units' && selectedSubject && (
        <UnitsPage 
          subject={selectedSubject} 
          onBack={handleBackToSubjects}
          onUnitSelect={handleUnitSelect}
        />
      )}
      
      {currentPage === 'vocabularySelection' && selectedSubject && selectedUnit && (
        <VocabularySelectionPage 
          subject={selectedSubject}
          unit={selectedUnit}
          onBack={handleBackToUnits}
          onVocabularySelect={handleVocabularySelect}
        />
      )}
      
      {currentPage === 'vocabulary' && selectedSubject && (
        <VocabularyPage 
          subject={selectedSubject} 
          category={vocabularyCategory!}
          onBack={handleBackToVocabularySelection}
        />
      )}
      
      {currentPage === 'leaderboard' && (
        <LeaderboardPage onBack={handleBackToMenu} />
      )}
      
      {currentPage === 'chatbot' && (
        <ChatBotPage onBack={handleBackToMenu} />
      )}
      
      {currentPage === 'distractions' && (
        <DistractionsPage onBack={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;