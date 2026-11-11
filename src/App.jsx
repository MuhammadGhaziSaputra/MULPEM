import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import UnitView from './components/UnitView';
import AchievementView from './components/AchievementView';
import TeacherVerificationView from './components/TeacherVerificationView';
import TujuanPembelajaranModal from './components/TujuanPembelajaranModal';
import PetunjukPenggunaanModal from './components/PetunjukPenggunaanModal';
import StudentWelcomeModal from './components/StudentWelcomeModal';
import { storage } from './utils/storage';
import { unitsData } from './data/contentData';

const hasValidStudentName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.toLowerCase() !== 'siswa mandiri';
};

const getViewFromHash = () => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash;
  if (hash.startsWith('#/unit/')) {
    const uId = parseInt(hash.replace('#/unit/', ''), 10);
    if ([1, 2, 3].includes(uId)) return 'unit';
  } else if (hash === '#/achievement') {
    return 'achievement';
  } else if (hash.startsWith('#/verifikasi')) {
    return 'verification';
  }
  return 'home';
};

export default function App() {
  const [appState, setAppState] = useState(storage.getState());
  const [currentView, setCurrentView] = useState(getViewFromHash); // 'home' | 'unit' | 'achievement' | 'verification'
  const [activeUnitId, setActiveUnitId] = useState(1);
  const [isTPModalOpen, setIsTPModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Tampilkan pop-up identitas pada kunjungan pertama sebelum isi nama, kecuali sedang di Portal Guru
  const isWelcomeModalOpen =
    currentView !== 'verification' && !hasValidStudentName(appState.student?.name);

  const handleSaveStudentWelcome = (name, studentClass) => {
    storage.setStudentProfile(name, studentClass);
  };

  const handleEnterTeacherPortalFromWelcome = () => {
    navigateTo('verification');
  };

  // Subscribe ke perubahan state di storage
  useEffect(() => {
    const unsubscribe = storage.subscribe((nextState) => {
      setAppState({ ...nextState });
    });
    return () => unsubscribe();
  }, []);

  // Hash Routing support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/unit/')) {
        const uId = parseInt(hash.replace('#/unit/', ''), 10);
        if ([1, 2, 3].includes(uId)) {
          setActiveUnitId(uId);
          setCurrentView('unit');
        }
      } else if (hash === '#/achievement') {
        setCurrentView('achievement');
      } else if (hash.startsWith('#/verifikasi')) {
        setCurrentView('verification');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, unitId = 1) => {
    setCurrentView(view);
    if (view === 'unit') {
      setActiveUnitId(unitId);
      window.location.hash = `#/unit/${unitId}`;
    } else if (view === 'achievement') {
      window.location.hash = '#/achievement';
    } else if (view === 'verification') {
      window.location.hash = '#/verifikasi';
    } else {
      window.location.hash = '#/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeUnit = unitsData.find((u) => u.id === activeUnitId) || unitsData[0];

  return (
    <div className="min-h-screen flex flex-col bg-surface-page font-body text-slate-800">
      <Navbar
        state={appState}
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenTP={() => setIsTPModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            state={appState}
            onOpenUnit={(id) => navigateTo('unit', id)}
            onOpenTP={() => setIsTPModalOpen(true)}
            onOpenGuide={() => setIsGuideModalOpen(true)}
            onOpenAchievement={() => navigateTo('achievement')}
          />
        )}

        {currentView === 'unit' && (
          <UnitView
            key={activeUnit.id}
            unit={activeUnit}
            state={appState}
            onBackHome={() => navigateTo('home')}
          />
        )}

        {currentView === 'achievement' && (
          <AchievementView
            state={appState}
            onNavigateUnit={(id) => navigateTo('unit', id)}
            onBackHome={() => navigateTo('home')}
          />
        )}

        {currentView === 'verification' && (
          <TeacherVerificationView
            onBackHome={() => navigateTo('home')}
          />
        )}
      </main>

      <Footer />

      {/* Pop-up Modals */}
      <TujuanPembelajaranModal
        isOpen={isTPModalOpen}
        onClose={() => setIsTPModalOpen(false)}
        onPlayUnit={(unitNum) => navigateTo('unit', unitNum)}
      />

      <PetunjukPenggunaanModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Modal Wajib Masukkan Nama untuk Siswa Baru + Opsi Portal Guru */}
      <StudentWelcomeModal
        isOpen={isWelcomeModalOpen}
        initialName={appState.student?.name || ''}
        initialClass={appState.student?.class || 'X-2'}
        onSave={handleSaveStudentWelcome}
        onEnterTeacherPortal={handleEnterTeacherPortalFromWelcome}
      />
    </div>
  );
}
