// Deteksi & resolusi URL API (Lokal vs Cloud)
import { syncStudentToSupabase } from './supabaseClient';

export function getApiEndpoint(path = 'simpan_progres.php') {
  if (typeof window === 'undefined') return null;

  // 1. Cek apakah ada URL Backend Cloud yang diatur
  const cloudUrl = localStorage.getItem('studio_cloud_api_url');
  if (cloudUrl && cloudUrl.trim()) {
    return `${cloudUrl.trim().replace(/\/+$/, '')}/${path}`;
  }

  // 2. Cek apakah berjalan di localhost / lab sekolah
  const isLocalhost = 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname.endsWith('.test') || 
    window.location.hostname.endsWith('.local');

  if (isLocalhost) {
    return `http://localhost/studio-api/${path}`;
  }

  // 3. Di domain publik tanpa Cloud URL, lewati agar tidak memicu popup izin Chrome
  return null;
}

// State Manager & LocalStorage Persistence
// Zero-Login: Data tersimpan aman di peramban lokal

const STORAGE_KEY = 'studio-informatika-progress';
const CURRENT_VERSION = '1.0';

export const INITIAL_STATE = {
  version: CURRENT_VERSION,
  createdAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  student: {
    name: '',
    class: 'X-2',
    school: 'SMA Negeri 2 Makassar'
  },
  preferences: {
    audioEnabled: true,
    fontSize: 'normal'
  },
  units: {
    unit1: {
      status: 'not-started', // 'not-started' | 'in-progress' | 'completed'
      currentStep: 1,        // 1=tantangan, 2=materi, 3=eksplorasi, 4=kuis, 5=refleksi, 6=ringkasan
      challenge: { answer: '', completed: false, points: 0 },
      materials: { visitedSegments: [], completed: false },
      exploration: { openedComponents: [], points: 0, completed: false },
      quiz: {
        attempts: 0,
        firstAttemptScorePercent: null,
        firstAttemptScoreRaw: 0,
        bestScorePercent: null,
        points: 0,
        answers: {},
        completed: false
      },
      practice: { answers: {}, bonusPoints: 0 },
      reflection: { scale: 0, hardest: '', explanation: '', points: 0, completed: false },
      totalPoints: 0
    },
    unit2: {
      status: 'not-started',
      currentStep: 1,
      challenge: { answer: '', completed: false, points: 0 },
      materials: { visitedSegments: [], completed: false },
      exploration: { placedCards: {}, points: 0, completed: false },
      quiz: {
        attempts: 0,
        firstAttemptScorePercent: null,
        firstAttemptScoreRaw: 0,
        bestScorePercent: null,
        points: 0,
        answers: {},
        completed: false
      },
      practice: { answers: {}, bonusPoints: 0 },
      reflection: { scale: 0, hardest: '', explanation: '', points: 0, completed: false },
      totalPoints: 0
    },
    unit3: {
      status: 'not-started',
      currentStep: 1,
      challenge: { answer: '', completed: false, points: 0 },
      materials: { visitedSegments: [], completed: false },
      exploration: { completedSteps: [], points: 0, completed: false },
      quiz: {
        attempts: 0,
        firstAttemptScorePercent: null,
        firstAttemptScoreRaw: 0,
        bestScorePercent: null,
        points: 0,
        answers: {},
        completed: false
      },
      practice: { answers: {}, bonusPoints: 0 },
      reflection: { scale: 0, hardest: '', explanation: '', points: 0, completed: false },
      totalPoints: 0
    }
  },
  overall: {
    totalPoints: 0,
    maxPoints: 330,
    level: 1,
    levelName: 'Pemula',
    completedUnits: 0,
    averageQuizScore: 0,
    allCompleted: false
  }
};

class StorageService {
  constructor() {
    this.state = this.loadState();
    this.subscribers = new Set();
    this.debounceTimer = null;
  }

  loadState() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) return JSON.parse(JSON.stringify(INITIAL_STATE));
      const parsed = JSON.parse(serialized);
      // Validasi struktur dasar & migrasi student profile serta materials jika belum ada
      if (!parsed.student) {
        parsed.student = { ...INITIAL_STATE.student };
      }
      if (parsed.units) {
        ['unit1', 'unit2', 'unit3'].forEach((uKey) => {
          const u = parsed.units[uKey];
          if (u && !u.materials) {
            const alreadyPassedMaterials =
              u.exploration?.completed ||
              u.quiz?.completed ||
              u.reflection?.completed ||
              u.status === 'completed';
            u.materials = {
              visitedSegments: alreadyPassedMaterials ? [0, 1, 2, 3, 4, 5] : [],
              completed: Boolean(alreadyPassedMaterials)
            };
          }
        });
      }
      return parsed;
    } catch (e) {
      console.warn('Gagal memuat localStorage, inisialisasi state baru:', e);
      return JSON.parse(JSON.stringify(INITIAL_STATE));
    }
  }

  saveState() {
    try {
      this.state.lastUpdated = new Date().toISOString();
      this.recalculateOverall();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notifySubscribers();
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage:', e);
    }

    // Debounce sinkronisasi network ke Supabase Cloud / backend agar tidak spam request
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.syncToBackend(this.state);
    }, 250);
  }

  // Sinkronisasi background ke Supabase Cloud (24 Jam) atau MySQL
  async syncToBackend(state, renameFrom = null) {
    if (!state) return;

    const rawName = state.student?.name?.trim();
    if (!rawName || rawName.length < 2 || rawName.toLowerCase() === 'siswa mandiri') {
      return;
    }

    // 1. Coba sinkronisasi ke Supabase Cloud jika sudah dihubungkan
    try {
      await syncStudentToSupabase(state, renameFrom);
    } catch (e) {
      // lewati jika belum diatur
    }

    // 2. Coba sinkronisasi ke MySQL jika ada endpoint lokal / cloud API
    const endpoint = getApiEndpoint('simpan_progres.php');
    if (!endpoint) {
      return;
    }

    try {
      const payload = {
        nama: state.student?.name || 'Siswa Mandiri',
        kelas: state.student?.class || 'X-2',
        totalPoin: state.overall?.totalPoints || 0,
        level: state.overall?.level || 1,
        levelName: state.overall?.levelName || 'Pemula',
        units: {
          1: {
            quizScore: state.units?.unit1?.quiz?.firstAttemptScorePercent,
            points: state.units?.unit1?.totalPoints || 0,
            reflection: {
              scale: state.units?.unit1?.reflection?.scale,
              difficultPart: state.units?.unit1?.reflection?.hardest,
              strategy: state.units?.unit1?.reflection?.explanation
            }
          },
          2: {
            quizScore: state.units?.unit2?.quiz?.firstAttemptScorePercent,
            points: state.units?.unit2?.totalPoints || 0,
            reflection: {
              scale: state.units?.unit2?.reflection?.scale,
              difficultPart: state.units?.unit2?.reflection?.hardest,
              strategy: state.units?.unit2?.reflection?.explanation
            }
          },
          3: {
            quizScore: state.units?.unit3?.quiz?.firstAttemptScorePercent,
            points: state.units?.unit3?.totalPoints || 0,
            reflection: {
              scale: state.units?.unit3?.reflection?.scale,
              difficultPart: state.units?.unit3?.reflection?.hardest,
              strategy: state.units?.unit3?.reflection?.explanation
            }
          }
        }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        this.backendStatus = 'online';
      }
    } catch (e) {
      // Backend offline / belum aktif, tidak masalah (offline-first)
      this.backendStatus = 'offline';
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers() {
    this.subscribers.forEach((cb) => cb(this.state));
  }

  getState() {
    return this.state;
  }

  getUnit(unitCode) {
    return this.state.units[unitCode] || null;
  }

  // Rekalkulasi akumulasi poin dan level
  recalculateOverall() {
    let grandPoints = 0;
    let completedCount = 0;
    let quizScoreSum = 0;
    let unitsWithQuiz = 0;

    Object.keys(this.state.units).forEach((uKey) => {
      const u = this.state.units[uKey];
      const uPoints =
        (u.challenge?.points || 0) +
        (u.exploration?.points || 0) +
        (u.quiz?.points || 0) +
        (u.practice?.bonusPoints || 0) +
        (u.reflection?.points || 0);

      u.totalPoints = Math.round(uPoints);
      grandPoints += u.totalPoints;

      if (u.status === 'completed') {
        completedCount++;
      }
      if (u.quiz?.firstAttemptScorePercent !== null && u.quiz?.firstAttemptScorePercent !== undefined) {
        quizScoreSum += u.quiz.firstAttemptScorePercent;
        unitsWithQuiz++;
      }
    });

    this.state.overall.totalPoints = grandPoints;
    this.state.overall.completedUnits = completedCount;
    this.state.overall.allCompleted = completedCount === 3;
    this.state.overall.averageQuizScore = unitsWithQuiz > 0 ? Math.round(quizScoreSum / unitsWithQuiz) : 0;

    // Tentukan Level
    if (grandPoints >= 260) {
      this.state.overall.level = 4;
      this.state.overall.levelName = 'Master Arsitektur';
    } else if (grandPoints >= 200) {
      this.state.overall.level = 3;
      this.state.overall.levelName = 'Pemahir';
    } else if (grandPoints >= 100) {
      this.state.overall.level = 2;
      this.state.overall.levelName = 'Penjelajah';
    } else {
      this.state.overall.level = 1;
      this.state.overall.levelName = 'Pemula';
    }
  }

  // --- ACTIONS ---

  setStudentProfile(name, studentClass) {
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanClass =
      typeof studentClass === 'string' && studentClass.trim()
        ? studentClass.trim()
        : this.state.student?.class || 'X-2';

    if (!cleanName || cleanName.length < 2) return;

    if (!this.state.student) {
      this.state.student = { ...INITIAL_STATE.student };
    }

    const previousName = this.state.student.name;
    const previousClass = this.state.student.class;
    const renameFrom =
      previousName &&
      previousName.trim() &&
      previousName !== 'Siswa Mandiri' &&
      (previousName !== cleanName || previousClass !== cleanClass)
        ? { name: previousName, class: previousClass }
        : null;

    this.state.student.name = cleanName;
    this.state.student.class = cleanClass;
    this.saveState();
    // Gunakan pemanggilan langsung dengan informasi renameFrom dan hentikan debounce ganda
    clearTimeout(this.debounceTimer);
    this.syncToBackend(this.state, renameFrom);
  }

  setPreference(key, value) {
    this.state.preferences[key] = value;
    this.saveState();
  }

  saveChallenge(unitCode, answer) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    unit.challenge.answer = answer;
    unit.challenge.completed = true;
    unit.challenge.points = 10;
    if (unit.status === 'not-started') unit.status = 'in-progress';
    this.saveState();
  }

  saveMaterialsProgress(unitCode, visitedIndices = [], completed = false) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    if (!unit.materials) {
      unit.materials = { visitedSegments: [], completed: false };
    }
    const merged = Array.from(new Set([...(unit.materials.visitedSegments || []), ...visitedIndices]));
    unit.materials.visitedSegments = merged;
    if (completed) {
      unit.materials.completed = true;
    }
    if (unit.status === 'not-started') unit.status = 'in-progress';
    this.saveState();
  }

  saveExploration(unitCode, data) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    unit.exploration = { ...unit.exploration, ...data };
    this.saveState();
  }

  saveQuizFirstAttempt(unitCode, { answers, scoreRaw, scorePercent, points }) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    unit.quiz.attempts += 1;
    unit.quiz.answers = answers;
    unit.quiz.firstAttemptScoreRaw = scoreRaw;
    unit.quiz.firstAttemptScorePercent = scorePercent;
    unit.quiz.bestScorePercent = scorePercent;
    unit.quiz.points = points;
    unit.quiz.completed = true;
    this.saveState();
  }

  retryQuiz(unitCode, { retryPointsBonus }) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    unit.quiz.attempts += 1;
    unit.quiz.points = Math.min(60, unit.quiz.points + (retryPointsBonus || 0));
    this.saveState();
  }

  savePracticeAnswer(unitCode, questionId, isCorrect) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    if (!unit.practice.answers[questionId]) {
      unit.practice.answers[questionId] = { isCorrect, attempts: 1 };
      if (isCorrect) {
        unit.practice.bonusPoints = Math.min(10, (unit.practice.bonusPoints || 0) + 2);
      }
    } else {
      unit.practice.answers[questionId].attempts += 1;
      if (!unit.practice.answers[questionId].isCorrect && isCorrect) {
        unit.practice.answers[questionId].isCorrect = true;
        unit.practice.bonusPoints = Math.min(10, (unit.practice.bonusPoints || 0) + 2);
      }
    }
    this.saveState();
  }

  saveReflection(unitCode, { scale, hardest, explanation }) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    unit.reflection.scale = scale;
    unit.reflection.hardest = hardest;
    unit.reflection.explanation = explanation;
    unit.reflection.completed = true;
    unit.reflection.points = 10;
    this.saveState();
  }

  completeUnit(unitCode) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    unit.status = 'completed';
    unit.currentStep = 6;
    this.saveState();
  }

  setStep(unitCode, stepNumber) {
    const unit = this.state.units[unitCode];
    if (!unit) return;
    unit.currentStep = stepNumber;
    if (unit.status === 'not-started') unit.status = 'in-progress';
    this.saveState();
  }

  resetAll() {
    this.state = { ...JSON.parse(JSON.stringify(INITIAL_STATE)), createdAt: new Date().toISOString() };
    localStorage.removeItem(STORAGE_KEY);
    this.saveState();
  }
}

export const storage = new StorageService();
