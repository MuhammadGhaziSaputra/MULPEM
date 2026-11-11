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
import { storage, isValidStudentName } from './utils/storage';
import { unitsData } from './data/contentData';

const resolveRouteFromHash = (hash = '', role = null) => {
  if (hash.startsWith('#/unit/')) {
    const uId = parseInt(hash.replace('#/unit/', ''), 10);
    if ([1, 2, 3].includes(uId)) return { view: 'unit', unitId: uId };
  } else if (hash === '#/achievement') {
    return { view: 'achievement' };
  } else if (hash.startsWith('#/verifikasi')) {
    if (role === 'student') {
      return { view: 'home', redirectToHomeHash: true };
    }
    return { view: 'verification' };
  } else if ((!hash || hash === '#') && role === 'teacher') {
    return { view: 'verification' };
  }
  return { view: 'home' };
};

export default function App() {
  const [appState, setAppState] = useState(() => storage.getState());
  const initialRoute = resolveRouteFromHash(
    typeof window !== 'undefined' ? window.location.hash : '',
    storage.getUserRole(storage.getState())
  );
  const [currentView, setCurrentView] = useState(initialRoute.view); // 'home' | 'unit' | 'achievement' | 'verification'
  const [activeUnitId, setActiveUnitId] = useState(initialRoute.unitId || 1);
  const [isTPModalOpen, setIsTPModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const userRole = storage.getUserRole(appState);
  const isTeacherMode = userRole === 'teacher';
  const isStudentMode = userRole === 'student';

  // Tampilkan pop-up wajib jika bukan guru, berada di halaman siswa, dan belum mengisi nama lengkap
  const requiresWelcome =
    !isTeacherMode &&
    currentView !== 'verification' &&
    !isValidStudentName(appState.student?.name);
  const profileModalMode = requiresWelcome ? 'welcome' : 'edit';
  const isWelcomeModalOpen = requiresWelcome || isEditProfileOpen;

  const handleSaveStudentWelcome = (name, studentClass) => {
    storage.setStudentProfile(name, studentClass);
    setIsEditProfileOpen(false);
  };

  const handleCloseEditProfile = () => {
    if (!requiresWelcome) {
      setIsEditProfileOpen(false);
    }
  };

  const handleEnterTeacherPortalFromWelcome = () => {
    setIsEditProfileOpen(false);
    navigateTo('verification');
  };

  // Subscribe ke perubahan state di storage
  useEffect(() => {
    const unsubscribe = storage.subscribe((nextState) => {
      setAppState({ ...nextState });
    });
    return () => unsubscribe();
  }, []);

  // Hash Routing support + proteksi rute Portal Guru untuk siswa
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const liveRole = storage.getUserRole();
      const next = resolveRouteFromHash(hash, liveRole);
      if (next.redirectToHomeHash) {
        window.location.hash = '#/';
      }
      if (next.unitId) {
        setActiveUnitId(next.unitId);
      }
      setCurrentView(next.view);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, unitId = 1) => {
    const liveRole = storage.getUserRole(appState);
    if (view === 'verification' && (isStudentMode || liveRole === 'student')) {
      setCurrentView('home');
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
    <div className="min-h-screen flex flex-col bg-surface-page font-body text-slate-900">
      <Navbar
        state={appState}
        userRole={userRole}
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenTP={() => setIsTPModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onEditProfile={() => setIsEditProfileOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            state={appState}
            userRole={userRole}
            onOpenUnit={(id) => navigateTo('unit', id)}
            onOpenTP={() => setIsTPModalOpen(true)}
            onOpenGuide={() => setIsGuideModalOpen(true)}
            onOpenAchievement={() => navigateTo('achievement')}
            onEditProfile={() => setIsEditProfileOpen(true)}
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

        {currentView === 'verification' && !isStudentMode && (
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

      {/* Modal Wajib Masukkan Nama untuk Siswa Baru / Ubah Identitas + Opsi Portal Guru */}
      <StudentWelcomeModal
        isOpen={isWelcomeModalOpen}
        mode={profileModalMode}
        initialName={appState.student?.name || ''}
        initialClass={appState.student?.class || 'X-2'}
        onSave={handleSaveStudentWelcome}
        onClose={handleCloseEditProfile}
        onEnterTeacherPortal={handleEnterTeacherPortalFromWelcome}
      />
    </div>
  );
}
