import React from 'react';
import { X, Target, CheckCircle2, Play, ArrowRight } from 'lucide-react';

export default function TujuanPembelajaranModal({ isOpen, onClose, onPlayUnit }) {
  if (!isOpen) return null;

  const tps = [
    {
      num: 1,
      title: "Membedakan Fungsi Komponen Utama",
      desc: "Mengidentifikasi peranan Unit Pemrosesan (ALU, CU), Unit Memori, dan piranti I/O pada arsitektur Von Neumann secara komprehensif.",
      target: "Level Kognitif C1-C2",
      passing: "Target Skor: Min. 75",
      unitLabel: "Unit 1: Arsitektur Von Neumann"
    },
    {
      num: 2,
      title: "Menyusun Alur Input – Proses – Output (IPO)",
      desc: "Menganalisis dan menyusun tahapan alur IPO secara tepat dari berbagai skenario kasus komputasi sehari-hari.",
      target: "Level Kognitif C2",
      passing: "Target Skor: Min. 75",
      unitLabel: "Unit 2: Alur Kerja IPO"
    },
    {
      num: 3,
      title: "Siklus Fetch – Decode – Execute",
      desc: "Menentukan urutan instruksi mikro di dalam register dan mengeksekusi simulasi logika hingga mencapai ketuntasan minimum.",
      target: "Level Kognitif C2",
      passing: "Target Skor: Min. 80",
      unitLabel: "Unit 3: Siklus Instruksi CPU"
    }
  ];

  const handleStartUnit = (unitNum) => {
    onClose();
    if (onPlayUnit) {
      onPlayUnit(unitNum);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
        {/* Header Modal */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shadow-sm">
                <Target className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900">
                  Tujuan Pembelajaran (TP)
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Capaian Pembelajaran Elemen Sistem Komputer (SK) • Fase E
                </p>
              </div>
            </div>
            
            {/* Tombol X Tutup Modal */}
            <button
              type="button"
              onClick={onClose}
              title="Tutup Jendela"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mt-3">
            Pilih dan mainkan langsung unit belajar yang sesuai dengan sasaran kompetensi yang ingin kamu capai:
          </p>

          {/* List 3 TP dengan Tombol Mainkan Unit Masing-Masing */}
          <div className="mt-4 space-y-3.5">
            {tps.map((tp) => (
              <div
                key={tp.num}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-primary-300 hover:bg-primary-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-700 text-white font-bold flex items-center justify-center shrink-0 shadow-sm text-sm font-heading">
                    TP {tp.num}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                        {tp.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        {tp.passing}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {tp.desc}
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-primary-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{tp.target} • {tp.unitLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Tombol Mainkan Segera Unit Terkait */}
                <button
                  type="button"
                  onClick={() => handleStartUnit(tp.num)}
                  className="px-4 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm shadow-primary-700/20 transition-all hover:scale-102 shrink-0 self-end sm:self-center"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Mainkan Unit {tp.num}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Terstandarisasi BSKAP Kemendikbudristek No. 046/H/KR/2025</span>
            <span className="font-bold text-teal-700">✓ Modul Terverifikasi</span>
          </div>
        </div>

        {/* Footer Modal dengan Tombol Tutup */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Kamu bebas memilih urutan unit belajar kapan saja.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
}
