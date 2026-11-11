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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] p-6 sm:p-8 flex flex-col justify-between">
        {/* Header Modal */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900/15">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
                <Target className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900">
                  Tujuan Pembelajaran (TP)
                </h2>
                <p className="text-xs text-slate-600 font-semibold">
                  Capaian Pembelajaran Elemen Sistem Komputer (SK) • Fase E
                </p>
              </div>
            </div>
            
            {/* Tombol X Tutup Modal */}
            <button
              type="button"
              onClick={onClose}
              title="Tutup Jendela"
              className="neo-btn-sm p-2 rounded-xl bg-white hover:bg-rose-200 text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-700 mt-3 font-medium">
            Pilih dan mainkan langsung unit belajar yang sesuai dengan sasaran kompetensi yang ingin kamu capai:
          </p>

          {/* List 3 TP dengan Tombol Mainkan Unit Masing-Masing */}
          <div className="mt-4 space-y-3.5">
            {tps.map((tp) => {
              const badgeBg =
                tp.num === 1 ? 'bg-sky-200' : tp.num === 2 ? 'bg-yellow-300' : 'bg-emerald-300';
              return (
                <div
                  key={tp.num}
                  className="p-4 sm:p-5 rounded-2xl bg-surface-page border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-xl ${badgeBg} border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-xs font-heading`}>
                      TP {tp.num}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading font-extrabold text-slate-900 text-sm sm:text-base">
                          {tp.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-yellow-200 text-slate-900 border border-slate-900">
                          {tp.passing}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                        {tp.desc}
                      </p>
                      <div className="mt-2 text-[11px] font-bold text-primary-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{tp.target} • {tp.unitLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Mainkan Segera Unit Terkait */}
                  <button
                    type="button"
                    onClick={() => handleStartUnit(tp.num)}
                    className="neo-btn px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shrink-0 self-end sm:self-center cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Mainkan Unit {tp.num}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-sky-100 border-2 border-slate-900 text-xs text-slate-900 flex items-center justify-between font-semibold">
            <span>Terstandarisasi BSKAP Kemendikbudristek No. 046/H/KR/2025</span>
            <span className="font-extrabold text-emerald-800">✓ Modul Terverifikasi</span>
          </div>
        </div>

        {/* Footer Modal dengan Tombol Tutup */}
        <div className="mt-6 pt-4 border-t-2 border-slate-900/15 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-600 font-semibold">
            Kamu bebas memilih urutan unit belajar kapan saja.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="neo-btn px-6 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
}
