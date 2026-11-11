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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900/15">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
              <GitFork className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Petunjuk Penggunaan & Alur Belajar
              </h2>
              <p className="text-xs text-slate-600 font-semibold">
                6 Langkah Terstruktur Menuju Pemahaman Tuntas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neo-btn-sm p-2 rounded-xl bg-white hover:bg-rose-200 text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const badgeBg = idx % 3 === 0 ? 'bg-sky-200' : idx % 3 === 1 ? 'bg-yellow-300' : 'bg-emerald-200';
            return (
              <div
                key={st.num}
                className="p-4 rounded-2xl bg-surface-page border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl ${badgeBg} border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] flex items-center justify-center text-slate-900`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-primary-700 tracking-wider">
                      LANGKAH {st.num}
                    </span>
                    <h3 className="font-heading font-extrabold text-slate-900 text-sm">
                      {st.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed font-medium">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-2xl bg-yellow-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-900 text-slate-900 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
            i
          </div>
          <div className="text-xs text-slate-900 leading-relaxed font-medium">
            <span className="font-extrabold">Dapat dikerjakan berulang hingga tuntas tanpa batas sesi.</span>{' '}
            Semua kemajuan belajarmu tersimpan otomatis di perangkat ini (Auto-Save Aktif). Tunjukkan layar Capaian Belajar kepada gurumu saat sesi tatap muka di kelas.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="neo-btn px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold rounded-xl cursor-pointer"
          >
            Siap Belajar
          </button>
        </div>
      </div>
    </div>
  );
}
