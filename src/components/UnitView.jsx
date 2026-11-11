import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
  PlayCircle, 
  FlaskConical, 
  HelpCircle, 
  UserCheck, 
  BookOpen, 
  Lock, 
  AlertTriangle, 
  X 
} from 'lucide-react';
import { storage } from '../utils/storage';
import { triggerConfetti } from '../utils/confetti';
import { quizBank } from '../data/quizData';
import ExplorationVonNeumann from './ExplorationVonNeumann';
import ExplorationDragDropIPO from './ExplorationDragDropIPO';
import ExplorationFDESimulator from './ExplorationFDESimulator';
import QuizEngine from './QuizEngine';
import PracticeEngine from './PracticeEngine';
import ReflectionView from './ReflectionView';
import SummaryView from './SummaryView';

export default function UnitView({ unit, state, onBackHome }) {
  const unitCode = unit.unitCode;
  const unitState = state.units[unitCode];
  const currentQuizList = quizBank[unitCode]?.quiz || [];
  const currentPracticeList = quizBank[unitCode]?.practice || [];
  const totalSegments = unit.segments.length;

  // Progress segmen materi (Langkah 2)
  const [visitedSegments, setVisitedSegments] = useState(() => {
    const saved = unitState.materials?.visitedSegments || [];
    return saved.length > 0 ? saved : [];
  });

  // Status ketuntasan tiap part (1 s/d 6)
  const isChallengeDone = Boolean(unitState.challenge?.completed);
  const isMaterialsDone = Boolean(
    unitState.materials?.completed ||
    visitedSegments.length >= totalSegments ||
    unitState.exploration?.completed ||
    unitState.quiz?.completed ||
    unitState.reflection?.completed ||
    unitState.status === 'completed'
  );
  const explorationDone = Boolean(unitState.exploration?.completed);
  const practiceAnsweredCount = Object.keys(unitState.practice?.answers || {}).length;
  const practiceRequiredCount = Math.min(5, currentPracticeList.length);
  const isPracticeDone = practiceRequiredCount === 0 || practiceAnsweredCount >= practiceRequiredCount;
  const isStep3Done = explorationDone && isPracticeDone;
  const isQuizDone = Boolean(unitState.quiz?.completed);
  const isReflectionDone = Boolean(unitState.reflection?.completed);
  const isUnitDone = unitState.status === 'completed';

  const stepDoneMap = {
    1: isChallengeDone,
    2: isMaterialsDone,
    3: isStep3Done,
    4: isQuizDone,
    5: isReflectionDone,
    6: isUnitDone
  };

  // Hitung langkah tertinggi yang boleh dibuka agar siswa tidak bisa resume di part terkunci
  const getHighestUnlockedStep = () => {
    for (let s = 1; s <= 5; s++) {
      if (!stepDoneMap[s]) return s;
    }
    return 6;
  };

  const [currentStep, setCurrentStep] = useState(() => {
    const requested = unitState.currentStep || 1;
    const maxAllowed = getHighestUnlockedStep();
    return Math.min(requested, maxAllowed);
  });
  const [segmentIdx, setSegmentIdx] = useState(0);

  // Tantangan state
  const [challengeInput, setChallengeInput] = useState(unitState.challenge?.answer || '');
  const [challengeSaved, setChallengeSaved] = useState(unitState.challenge?.completed || false);

  // Modal Validasi Langkah
  const [validationModal, setValidationModal] = useState(null);

  // Catat segmen materi yang sudah dikunjungi saat berada di Langkah 2
  useEffect(() => {
    if (currentStep !== 2) return;
    if (!visitedSegments.includes(segmentIdx)) {
      const next = Array.from(new Set([...visitedSegments, segmentIdx]));
      setVisitedSegments(next);
      storage.saveMaterialsProgress(unitCode, next, next.length >= totalSegments);
    } else if (visitedSegments.length >= totalSegments && !unitState.materials?.completed) {
      storage.saveMaterialsProgress(unitCode, visitedSegments, true);
    }
  }, [currentStep, segmentIdx, totalSegments, unitCode]);

  const steps = [
    { num: 1, name: "Tantangan Pembuka", icon: Lightbulb },
    { num: 2, name: "Materi & Animasi", icon: PlayCircle },
    { num: 3, name: "Eksplorasi & Latihan", icon: FlaskConical },
    { num: 4, name: "Kuis Akhir Unit", icon: HelpCircle },
    { num: 5, name: "Refleksi", icon: UserCheck },
    { num: 6, name: "Ringkasan Materi", icon: BookOpen },
  ];

  // Bangun pesan pop-up validasi berurutan sesuai part yang belum tuntas
  const buildValidationPopup = (blockingStep, targetStep) => {
    if (blockingStep === 1) {
      return {
        title: "Bagian 1 Belum Dikerjakan!",
        message: `Kamu belum mengerjakan Bagian 1 (Tantangan Pembuka) sebelum menuju Bagian ${targetStep}. Tuliskan tebakan awalmu terlebih dahulu.`,
        checklist: [
          { label: "Ketik jawaban tebakan bebas di kotak yang tersedia", done: Boolean(challengeInput.trim()) },
          { label: "Klik tombol 'Kirim & Simpan Jawaban (+10 Poin)'", done: isChallengeDone }
        ],
        redirectStep: 1,
        redirectLabel: "Kerjakan Bagian 1"
      };
    }

    if (blockingStep === 2) {
      const unreadNums = unit.segments
        .map((_, idx) => idx)
        .filter((idx) => !visitedSegments.includes(idx))
        .map((idx) => idx + 1);
      return {
        title: "Materi Bagian 2 Belum Selesai!",
        message: `Sebelum melanjutkan ke Bagian ${targetStep}, pastikan seluruh ${totalSegments} segmen materi di Bagian 2 sudah dibaca berurutan.`,
        checklist: [
          {
            label: `Baca semua segmen materi (${Math.min(visitedSegments.length, totalSegments)}/${totalSegments} segmen terbaca${unreadNums.length > 0 ? ` — belum: Segmen ${unreadNums.join(', ')}` : ''})`,
            done: isMaterialsDone
          }
        ],
        redirectStep: 2,
        redirectLabel: "Baca Materi Bagian 2"
      };
    }

    if (blockingStep === 3) {
      let explorationHint = "Aktivitas Eksplorasi: Selesaikan eksplorasi interaktif";
      if (unit.id === 1) {
        explorationHint = "Aktivitas Eksplorasi: Ketuk minimal 4 dari 5 komponen Arsitektur Von Neumann";
      } else if (unit.id === 2) {
        explorationHint = "Aktivitas Eksplorasi: Susun & periksa minimal 4 dari 6 kartu alur IPO dengan benar";
      } else if (unit.id === 3) {
        explorationHint = "Simulasi CPU: Jawab benar minimal 3 dari 4 tebakan langkah siklus Fetch–Decode–Execute";
      }

      return {
        title: "Bagian 3 Belum Tuntas!",
        message: `Selesaikan seluruh kegiatan Eksplorasi Interaktif dan Latihan Soal di Bagian 3 sebelum lanjut ke Bagian ${targetStep}.`,
        checklist: [
          { label: explorationHint, done: explorationDone },
          ...(practiceRequiredCount > 0
            ? [{
                label: `Latihan Soal Mandiri: Jawab ${practiceRequiredCount} soal latihan (${Math.min(practiceAnsweredCount, practiceRequiredCount)}/${practiceRequiredCount} terjawab)`,
                done: isPracticeDone
              }]
            : [])
        ],
        redirectStep: 3,
        redirectLabel: "Selesaikan Bagian 3"
      };
    }

    if (blockingStep === 4) {
      return {
        title: "Kuis Bagian 4 Belum Selesai!",
        message: `Kamu harus mengerjakan dan menyelesaikan ke-5 soal Kuis Akhir Unit (Bagian 4) hingga tampil layar hasil skor sebelum lanjut ke Bagian ${targetStep}.`,
        checklist: [
          { label: "Selesaikan semua soal Kuis Akhir Unit (Bagian 4)", done: isQuizDone }
        ],
        redirectStep: 4,
        redirectLabel: "Kerjakan Kuis Bagian 4"
      };
    }

    return {
      title: "Refleksi Bagian 5 Belum Disimpan!",
      message: "Lengkapi seluruh pertanyaan Refleksi Pemahamanmu dan tekan tombol simpan sebelum melihat Ringkasan Materi.",
      checklist: [
        { label: "Lengkapi 3 bagian refleksi lalu klik 'Simpan Refleksi (+10 Poin)'", done: isReflectionDone }
      ],
      redirectStep: 5,
      redirectLabel: "Isi Refleksi Bagian 5"
    };
  };

  const handleStepChange = (targetStep) => {
    // Cari apakah ada part sebelumnya (1..targetStep-1) yang belum dikerjakan
    if (targetStep > 1) {
      for (let reqStep = 1; reqStep < targetStep; reqStep++) {
        if (!stepDoneMap[reqStep]) {
          setValidationModal(buildValidationPopup(reqStep, targetStep));
          return;
        }
      }
    }

    setCurrentStep(targetStep);
    storage.setStep(unitCode, targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveChallenge = () => {
    if (!challengeInput.trim()) {
      setValidationModal({
        title: "Jawaban Masih Kosong!",
        message: "Tuliskan tebakan awalmu terlebih dahulu pada kotak jawaban bebas sebelum menyimpan dan mendapatkan +10 poin.",
        checklist: [
          { label: "Isi minimal satu kalimat jawaban tebakanmu", done: false }
        ],
        redirectStep: null
      });
      return;
    }
    storage.saveChallenge(unitCode, challengeInput);
    setChallengeSaved(true);
    triggerConfetti();
  };

  const activeSegment = unit.segments[segmentIdx] || unit.segments[0];
  const highestUnlockedStep = getHighestUnlockedStep();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-300">
      {/* Top Banner Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-slate-900/15">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackHome}
            className="neo-btn-sm p-2 rounded-xl bg-white hover:bg-yellow-200 text-slate-900 cursor-pointer"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-sky-200 border-2 border-slate-900 text-slate-900 uppercase">
                {unit.badge}
              </span>
              <span className="text-xs text-slate-600 font-bold">
                {unit.estTime}
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-slate-900 text-lg sm:text-2xl mt-0.5">
              {unit.title}
            </h2>
          </div>
        </div>

        {/* 6 Steps Pill Navigation dengan Indikator Tuntas / Terkunci */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {steps.map((st) => {
            const isActive = currentStep === st.num;
            const isCompleted = stepDoneMap[st.num];
            const isLocked = st.num > highestUnlockedStep;

            return (
              <button
                key={st.num}
                onClick={() => handleStepChange(st.num)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 border-2 cursor-pointer ${
                  isActive
                    ? 'bg-yellow-300 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] font-extrabold'
                    : isCompleted
                    ? 'bg-emerald-200 border-slate-900 text-slate-900 font-bold hover:bg-emerald-300'
                    : isLocked
                    ? 'bg-slate-100 border-dashed border-slate-400 text-slate-500 font-bold hover:border-slate-900 hover:bg-yellow-100 hover:text-slate-900'
                    : 'bg-white border-slate-900 text-slate-900 font-bold hover:bg-sky-100'
                }`}
                title={isLocked ? `Selesaikan Bagian ${highestUnlockedStep} terlebih dahulu` : st.name}
              >
                <span>{st.num}. {st.name}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />}
                {!isCompleted && isLocked && <Lock className="w-3 h-3 opacity-80" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="mt-6">
        {/* TAHAP 1: TANTANGAN PEMBUKA */}
        {currentStep === 1 && (
          <div className="neo-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-primary-700 uppercase tracking-wider">
                  Langkah 01 • Pemantik Pemikiran (+10 Poin)
                </span>
                <h3 className="font-heading font-extrabold text-slate-900 text-xl">
                  Tantangan Pembuka
                </h3>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-yellow-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] my-5">
              <p className="font-heading font-extrabold text-slate-900 text-base sm:text-lg leading-relaxed">
                "{unit.challenge.question}"
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Tuliskan Jawaban Bebasmu:
              </label>
              <textarea
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                placeholder={unit.challenge.placeholder}
                rows={4}
                disabled={challengeSaved}
                className="w-full p-4 rounded-xl border-2 border-slate-900 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary-600 bg-surface-page focus:bg-white leading-relaxed disabled:opacity-75"
              ></textarea>
            </div>

            {challengeSaved && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] text-slate-900 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Jawaban Tersimpan! (+10 Poin didapat)</span>
                  <p className="mt-0.5 font-medium">{unit.challenge.feedback}</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t-2 border-slate-900/15">
              {!challengeSaved ? (
                <button
                  onClick={handleSaveChallenge}
                  className="neo-btn px-6 py-2.5 bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-sm rounded-xl cursor-pointer"
                >
                  Kirim & Simpan Jawaban (+10 Poin)
                </button>
              ) : (
                <button
                  onClick={() => handleStepChange(2)}
                  className="neo-btn px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Lanjut ke Materi & Animasi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAHAP 2: MATERI & ANIMASI */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="neo-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-slate-900/15">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
                    <PlayCircle className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-primary-700 uppercase tracking-wider">
                      Langkah 02 • Materi Singkat Segmen {segmentIdx + 1} dari {unit.segments.length}
                    </span>
                    <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
                      {activeSegment.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-yellow-200 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
                  {activeSegment.conceptBadge}
                </span>
              </div>

              {/* Isi Materi */}
              <div className="my-6">
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {activeSegment.content}
                </p>

                {activeSegment.keyPoints && (
                  <div className="mt-4 p-4 rounded-2xl bg-sky-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] space-y-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Poin Kunci Konsep:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-900 font-medium">
                      {activeSegment.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-700 font-extrabold">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tabel Analogi Dapur Restoran jika ada */}
                {activeSegment.tableAnalogy && (
                  <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A]">
                    <table className="min-w-full divide-y-2 divide-slate-900 text-xs sm:text-sm text-left">
                      <thead className="bg-slate-900 text-white font-heading">
                        <tr>
                          <th className="px-4 py-3 font-extrabold">Peran di Restoran</th>
                          <th className="px-4 py-3 font-extrabold">Bagian Komputer</th>
                          <th className="px-4 py-3 font-extrabold">Fungsi Nyata</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-slate-900/15 bg-white">
                        {activeSegment.tableAnalogy.map((row, i) => (
                          <tr key={i} className="hover:bg-yellow-50">
                            <td className="px-4 py-3 font-bold text-slate-900">{row.role}</td>
                            <td className="px-4 py-3 font-extrabold text-primary-700">{row.part}</td>
                            <td className="px-4 py-3 text-slate-700 font-medium">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Slider Segmen Kontrol */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-slate-900/15">
                <button
                  onClick={() => setSegmentIdx(Math.max(0, segmentIdx - 1))}
                  disabled={segmentIdx === 0}
                  className="neo-btn-sm px-4 py-2 rounded-xl text-xs sm:text-sm bg-white hover:bg-slate-100 text-slate-900 disabled:opacity-40 cursor-pointer"
                >
                  ◀ Segmen Sebelumnya
                </button>

                <div className="flex items-center gap-1.5">
                  {unit.segments.map((_, i) => {
                    const isCurrent = segmentIdx === i;
                    const isVisited = visitedSegments.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => setSegmentIdx(i)}
                        title={`Segmen ${i + 1}${isVisited ? ' (Sudah dibaca)' : ' (Belum dibaca)'}`}
                        className={`h-3 rounded-full border-2 border-slate-900 transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-yellow-300 w-7'
                            : isVisited
                            ? 'bg-emerald-300 w-3 hover:bg-emerald-400'
                            : 'bg-white w-3 hover:bg-slate-200'
                        }`}
                      ></button>
                    );
                  })}
                </div>

                {segmentIdx < unit.segments.length - 1 ? (
                  <button
                    onClick={() => setSegmentIdx(segmentIdx + 1)}
                    className="neo-btn-sm px-5 py-2 rounded-xl text-xs sm:text-sm bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
                  >
                    Segmen Berikutnya ▶
                  </button>
                ) : (
                  <button
                    onClick={() => handleStepChange(3)}
                    className="neo-btn-sm px-5 py-2 rounded-xl text-xs sm:text-sm bg-emerald-300 hover:bg-emerald-200 text-slate-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Lanjut ke Eksplorasi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Tips & Trik Card */}
            <div className="p-5 rounded-2xl bg-yellow-200 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="font-heading font-extrabold text-slate-900 text-sm">
                  Tips & Trik Mengingat Konsep:
                </h4>
                <ul className="mt-1 space-y-1 text-xs text-slate-900 font-medium leading-relaxed">
                  {unit.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-extrabold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAHAP 3: EKSPLORASI / LATIHAN */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Aktivitas Eksplorasi Utama Khusus Tiap Unit */}
            {unit.id === 1 && (
              <ExplorationVonNeumann
                explorationData={unit.exploration}
                unitState={unitState}
                unitCode={unitCode}
              />
            )}
            {unit.id === 2 && (
              <ExplorationDragDropIPO
                explorationData={unit.exploration}
                unitState={unitState}
                unitCode={unitCode}
              />
            )}
            {unit.id === 3 && (
              <ExplorationFDESimulator
                explorationData={unit.exploration}
                unitState={unitState}
                unitCode={unitCode}
              />
            )}

            {/* Latihan Soal Teracak Langsung di Tiap Unit */}
            {currentPracticeList.length > 0 && (
              <PracticeEngine
                practiceList={currentPracticeList}
                unitCode={unitCode}
              />
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A]">
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold">
                <span className={`px-3 py-1 rounded-full border-2 border-slate-900 ${
                  explorationDone
                    ? 'bg-emerald-300 text-slate-900'
                    : 'bg-yellow-200 text-slate-900'
                }`}>
                  {explorationDone ? '✓ Eksplorasi Tuntas' : '○ Eksplorasi Belum Tuntas'}
                </span>
                {practiceRequiredCount > 0 && (
                  <span className={`px-3 py-1 rounded-full border-2 border-slate-900 ${
                    isPracticeDone
                      ? 'bg-emerald-300 text-slate-900'
                      : 'bg-yellow-200 text-slate-900'
                  }`}>
                    {isPracticeDone
                      ? `✓ Latihan (${practiceAnsweredCount}/${practiceRequiredCount})`
                      : `○ Latihan (${practiceAnsweredCount}/${practiceRequiredCount})`}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleStepChange(4)}
                className={`neo-btn px-6 py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  isStep3Done
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-slate-200 hover:bg-yellow-200 text-slate-900'
                }`}
              >
                {!isStep3Done && <Lock className="w-4 h-4 text-slate-900" />}
                <span>Siap Mengerjakan Kuis Akhir Unit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAHAP 4: KUIS AKHIR UNIT */}
        {currentStep === 4 && (
          <QuizEngine
            quizList={currentQuizList}
            unitCode={unitCode}
            minScore={unit.minPassingScore}
            onFinishQuiz={() => handleStepChange(5)}
          />
        )}

        {/* TAHAP 5: REFLEKSI */}
        {currentStep === 5 && (
          <ReflectionView
            reflectionData={unit.reflection}
            challengeAnswer={unitState.challenge?.answer}
            unitState={unitState}
            unitCode={unitCode}
            onFinish={() => handleStepChange(6)}
            onValidationError={(info) => setValidationModal(info)}
          />
        )}

        {/* TAHAP 6: RINGKASAN MATERI */}
        {currentStep === 6 && (
          <SummaryView
            summaryCards={unit.summaryCards}
            unitCode={unitCode}
            onReturnMenu={onBackHome}
            onRestartQuiz={() => handleStepChange(4)}
          />
        )}
      </div>

      {/* ===================================================================== */}
      {/* POP-UP VALIDASI JIKA MELOMPATI TAHAPAN SEBELUMNYA */}
      {/* ===================================================================== */}
      {validationModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop Flat Tanpa Blur */}
          <div
            onClick={() => setValidationModal(null)}
            className="fixed inset-0 bg-slate-900/65 animate-in fade-in duration-150"
          />

          {/* Modal Box Neo-Brutalist */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary-700">
                    Validasi Urutan Belajar
                  </span>
                  <h3 className="font-heading font-extrabold text-slate-900 text-base sm:text-lg leading-tight">
                    {validationModal.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setValidationModal(null)}
                className="neo-btn-sm p-1.5 rounded-lg bg-white hover:bg-rose-200 text-slate-900 cursor-pointer"
                aria-label="Tutup peringatan"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {validationModal.message}
            </p>

            {/* Checklist Syarat */}
            {validationModal.checklist && validationModal.checklist.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-surface-page border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] space-y-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                  Syarat Membuka Tahap Ini:
                </div>
                {validationModal.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    ) : (
                      <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span className={item.done ? 'text-emerald-800 line-through font-semibold' : 'text-slate-900 font-bold'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setValidationModal(null)}
                className="neo-btn-sm w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs cursor-pointer"
              >
                Tutup
              </button>

              {validationModal.redirectStep && validationModal.redirectStep !== currentStep ? (
                <button
                  onClick={() => {
                    const target = validationModal.redirectStep;
                    setValidationModal(null);
                    handleStepChange(target);
                  }}
                  className="neo-btn w-full sm:w-auto px-5 py-2.5 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{validationModal.redirectLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setValidationModal(null)}
                  className="neo-btn w-full sm:w-auto px-5 py-2.5 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs cursor-pointer"
                >
                  Mengerti, Lanjutkan
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
