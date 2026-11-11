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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-primary-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
                Refleksi Pemahamanmu
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                Mandiri
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bantu kenali bagian yang sudah kamu kuasai dan yang masih perlu dibahas di kelas bersama guru.
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold px-3 py-1 bg-primary-50 text-primary-800 rounded-full border border-primary-200">
          Format Asesmen Diri (+10 Poin)
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* 1. Skala Pemahaman */}
        <div>
          <label className="block text-sm font-heading font-bold text-slate-900 mb-3">
            1. Bagaimana tingkat keyakinanmu terhadap materi Unit ini?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scaleOptions.map((opt) => {
              const isSelected = scale === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => setScale(opt.value)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-primary-50 border-primary-600 shadow-md ring-2 ring-primary-400/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{opt.emoji}</div>
                  <div className="font-heading font-bold text-slate-900 text-sm">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {opt.desc}
                  </div>
                  <div className={`mt-3 px-3 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-primary-700 text-white' : 'bg-slate-200 text-slate-600'
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
          <label className="block text-sm font-heading font-bold text-slate-900 mb-2">
            2. {reflectionData.hardestQuestion}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {reflectionData.hardestOptions.map((opt) => {
              const isSelected = hardest === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setHardest(opt)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-primary-50 border-primary-600 text-primary-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Komparasi: Tebakan Awal vs Penjelasan Sendiri */}
        <div>
          <label className="block text-sm font-heading font-bold text-slate-900 mb-2">
            3. Penjelasan dengan Kata-Katamu Sendiri
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Jawaban Tantangan Pembuka */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Tebakanmu di Tantangan Pembuka:
              </span>
              <p className="text-xs text-slate-700 italic bg-white p-3 rounded-lg border border-slate-100 min-h-[90px]">
                {challengeAnswer || '(Kamu belum mengisi tantangan pembuka)'}
              </p>
            </div>

            {/* Pemahaman Baru */}
            <div className="p-4 rounded-xl bg-primary-50/40 border border-primary-200">
              <span className="text-[11px] font-bold text-primary-800 uppercase tracking-wider block mb-1">
                Pemahamanmu Sekarang:
              </span>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder={reflectionData.selfExplanationPrompt}
                rows={4}
                className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white leading-relaxed resize-none"
              ></textarea>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span>Autosave tersinkron</span>
                <span>{explanation.length} karakter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simpan & Selesai */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {isSaved ? (
              <span className="text-teal-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Refleksi berhasil disimpan! (+10 Poin didapat)
              </span>
            ) : (
              <span>Lengkapi seluruh pertanyaan di atas.</span>
            )}
          </div>

          <button
            onClick={isSaved ? onFinish : handleSave}
            className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-primary-700/20"
          >
            {isSaved ? 'Lanjut ke Ringkasan Materi →' : 'Simpan Refleksi (+10 Poin)'}
          </button>
        </div>
      </div>
    </div>
  );
}
