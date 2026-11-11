import React from 'react';
import { X, GitFork, Lightbulb, PlayCircle, FlaskConical, HelpCircle, UserCheck, BookOpen, Check } from 'lucide-react';

export default function PetunjukPenggunaanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const steps = [
    {
      num: "01",
      icon: Lightbulb,
      title: "Tantangan Pembuka",
      desc: "Pertanyaan pemantik untuk mengaktifkan pemikiran awalmu (+10 Poin). Bebas dijawab tanpa takut salah."
    },
    {
      num: "02",
      icon: PlayCircle,
      title: "Materi & Animasi",
      desc: "Pelajari materi singkat per segmen yang dilengkapi visualisasi dan analogi kehidupan sehari-hari."
    },
    {
      num: "03",
      icon: FlaskConical,
      title: "Eksplorasi / Latihan",
      desc: "Coba diagram interaktif, drag & drop alur IPO, atau simulasi CPU langkah demi langkah (+20 Poin)."
    },
    {
      num: "04",
      icon: HelpCircle,
      title: "Kuis Akhir Unit",
      desc: "Uji pemahamanmu lewat kuis berjenjang dengan penjelasan umpan balik langsung per soal."
    },
    {
      num: "05",
      icon: UserCheck,
      title: "Refleksi Pembelajaran",
      desc: "Asesmen diri untuk melihat bagian mana yang sudah kamu kuasai dan mana yang perlu diperkuat (+10 Poin)."
    },
    {
      num: "06",
      icon: BookOpen,
      title: "Ringkasan Materi",
      desc: "Simpan intisari buku saku digital ke clipboard dengan tombol 'Salin Intisari' untuk bahan belajar di kelas."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center">
              <GitFork className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                Petunjuk Penggunaan & Alur Belajar
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                6 Langkah Terstruktur Menuju Pemahaman Tuntas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-primary-50/50 hover:border-primary-200 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-200 flex items-center justify-center text-primary-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary-600 tracking-wider">
                      LANGKAH {st.num}
                    </span>
                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                      {st.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            i
          </div>
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Dapat dikerjakan berulang hingga tuntas tanpa batas sesi.</span>{' '}
            Semua kemajuan belajarmu tersimpan otomatis di perangkat ini (Auto-Save Aktif). Tunjukkan layar Capaian Belajar kepada gurumu saat sesi tatap muka di kelas.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-primary-700/20"
          >
            Siap Belajar
          </button>
        </div>
      </div>
    </div>
  );
}
