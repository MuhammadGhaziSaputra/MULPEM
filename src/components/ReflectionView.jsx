import React, { useState } from 'react';
import { UserCheck, Sparkles, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { storage } from '../utils/storage';
import { triggerConfetti } from '../utils/confetti';

export default function ReflectionView({ reflectionData, challengeAnswer, unitState, unitCode, onFinish, onValidationError }) {
  const [scale, setScale] = useState(unitState.reflection?.scale || 0);
  const [hardest, setHardest] = useState(unitState.reflection?.hardest || '');
  const [explanation, setExplanation] = useState(unitState.reflection?.explanation || '');
  const [isSaved, setIsSaved] = useState(unitState.reflection?.completed || false);

  const scaleOptions = [
    { value: 1, emoji: "🧐", label: "Masih Bingung", desc: "Perlu pengulangan & bimbingan guru" },
    { value: 2, emoji: "👍", label: "Cukup Paham", desc: "Memahami alur utama secara garis besar" },
    { value: 3, emoji: "🌟", label: "Sangat Paham", desc: "Mampu menjelaskan kembali ke teman" }
  ];

  const handleSave = () => {
    if (!scale || !hardest || !explanation.trim()) {
      const checklist = [
        { label: "1. Pilih skala keyakinan pemahamanmu", done: Boolean(scale) },
        { label: "2. Pilih bagian materi yang terasa paling menantang", done: Boolean(hardest) },
        { label: "3. Tuliskan penjelasan dengan kata-katamu sendiri", done: Boolean(explanation.trim()) }
      ];
      if (onValidationError) {
        onValidationError({
          title: "Refleksi Belum Lengkap",
          message: "Mohon lengkapi ketiga bagian refleksi di bawah ini untuk menyimpan progres dan memperoleh +10 poin!",
          checklist
        });
      } else {
        alert('Mohon lengkapi ketiga pertanyaan refleksi untuk mendapatkan 10 poin!');
      }
      return;
    }

    storage.saveReflection(unitCode, {
      scale,
      hardest,
      explanation
    });

    setIsSaved(true);
    triggerConfetti();
  };

  return (
    <div className="neo-card p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b-2 border-slate-900/15">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sky-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
                Refleksi Pemahamanmu
              </h3>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-yellow-300 border border-slate-900 text-slate-900">
                Mandiri
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Bantu kenali bagian yang sudah kamu kuasai dan yang masih perlu dibahas di kelas bersama guru.
            </p>
          </div>
        </div>

        <div className="text-xs font-extrabold px-3 py-1 bg-yellow-300 text-slate-900 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
          Format Asesmen Diri (+10 Poin)
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* 1. Skala Pemahaman */}
        <div>
          <label className="block text-sm font-heading font-extrabold text-slate-900 mb-3">
            1. Bagaimana tingkat keyakinanmu terhadap materi Unit ini?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scaleOptions.map((opt) => {
              const isSelected = scale === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => setScale(opt.value)}
                  className={`p-4 rounded-2xl border-2 border-slate-900 cursor-pointer transition-all text-center flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-yellow-200 shadow-[4px_4px_0px_0px_#0F172A] -translate-x-0.5 -translate-y-0.5'
                      : 'bg-surface-page hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A]'
                  }`}
                >
                  <div className="text-2xl mb-1">{opt.emoji}</div>
                  <div className="font-heading font-extrabold text-slate-900 text-sm">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-1 leading-snug font-medium">
                    {opt.desc}
                  </div>
                  <div className={`mt-3 px-3 py-0.5 rounded-full text-[10px] font-extrabold border border-slate-900 ${
                    isSelected ? 'bg-primary-600 text-white' : 'bg-white text-slate-800'
                  }`}>
                    {isSelected ? '✓ Terpilih' : 'Pilih'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Topik Tersulit */}
        <div>
          <label className="block text-sm font-heading font-extrabold text-slate-900 mb-2">
            2. {reflectionData.hardestQuestion}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {reflectionData.hardestOptions.map((opt) => {
              const isSelected = hardest === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setHardest(opt)}
                  className={`p-3.5 rounded-xl border-2 border-slate-900 cursor-pointer text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-200 text-slate-900 font-extrabold shadow-[3px_3px_0px_0px_#0F172A]'
                      : 'bg-white text-slate-800 font-bold hover:bg-surface-page shadow-[2px_2px_0px_0px_#0F172A]'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Komparasi: Tebakan Awal vs Penjelasan Sendiri */}
        <div>
          <label className="block text-sm font-heading font-extrabold text-slate-900 mb-2">
            3. Penjelasan dengan Kata-Katamu Sendiri
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Jawaban Tantangan Pembuka */}
            <div className="p-4 rounded-2xl bg-surface-page border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">
                Tebakanmu di Tantangan Pembuka:
              </span>
              <p className="text-xs text-slate-800 italic bg-white p-3 rounded-xl border-2 border-slate-900 min-h-[90px] font-medium">
                {challengeAnswer || '(Kamu belum mengisi tantangan pembuka)'}
              </p>
            </div>

            {/* Pemahaman Baru */}
            <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
              <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block mb-1.5">
                Pemahamanmu Sekarang:
              </span>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder={reflectionData.selfExplanationPrompt}
                rows={4}
                className="w-full p-3 rounded-xl border-2 border-slate-900 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-600 bg-white leading-relaxed resize-none font-medium"
              ></textarea>
              <div className="flex items-center justify-between text-[10px] text-slate-700 font-bold mt-1.5">
                <span>Autosave tersinkron</span>
                <span>{explanation.length} karakter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simpan & Selesai */}
        <div className="pt-4 border-t-2 border-slate-900/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-700 font-semibold">
            {isSaved ? (
              <span className="text-emerald-800 font-extrabold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Refleksi berhasil disimpan! (+10 Poin didapat)
              </span>
            ) : (
              <span>Lengkapi seluruh pertanyaan di atas.</span>
            )}
          </div>

          <button
            onClick={isSaved ? onFinish : handleSave}
            className="neo-btn px-6 py-2.5 bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer"
          >
            {isSaved ? 'Lanjut ke Ringkasan Materi →' : 'Simpan Refleksi (+10 Poin)'}
          </button>
        </div>
      </div>
    </div>
  );
}
