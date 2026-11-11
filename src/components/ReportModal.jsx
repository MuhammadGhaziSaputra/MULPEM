import React, { useState } from 'react';
import { X, Share2, Copy, Check, Printer, ShieldCheck, User, QrCode } from 'lucide-react';
import { storage } from '../utils/storage';

export default function ReportModal({ isOpen, onClose, state }) {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState(state.student?.name || '');
  const [studentClass, setStudentClass] = useState(state.student?.class || 'X-2');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSaveProfile = () => {
    storage.setStudentProfile(studentName, studentClass);
  };

  const reportToken = storage.generateReportToken();
  const reportUrl = `${window.location.origin}${window.location.pathname}#/verifikasi?data=${reportToken}`;

  const handleCopyLink = () => {
    handleSaveProfile();
    navigator.clipboard.writeText(reportUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    handleSaveProfile();
    navigator.clipboard.writeText(reportToken);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handlePrint = () => {
    handleSaveProfile();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center shadow-sm">
              <Share2 className="w-5 h-5 text-primary-700" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-slate-900">
                Kirim Nilai & Laporan ke Guru
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Verifikasi Progres Belajar Mandiri • 100% Tanpa Login Akun
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Identitas Siswa */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <User className="w-4 h-4 text-primary-700" />
            <span>Identitas Pelajar (Tersimpan Lokal di Perangkat)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Nama Lengkap Siswa:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onBlur={handleSaveProfile}
                placeholder="Contoh: Muhammad Ghazi"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Kelas:
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                onBlur={handleSaveProfile}
                placeholder="Contoh: X-2"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* 2 Metode Penyerahan Progres ke Guru */}
        <div className="mt-5 space-y-4">
          {/* Opsi 1: Link Langsung */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                <span>🔗 Opsi 1: Tautan Nilai Otomatis</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-200/60 text-teal-900">
                Paling Mudah
              </span>
            </div>
            <p className="text-xs text-teal-900/80 leading-relaxed mb-3">
              Salin tautan ini dan kirimkan ke WhatsApp Guru atau Google Classroom. Saat guru mengklik, guru langsung melihat kartu verifikasi nilaimu!
            </p>
            <button
              onClick={handleCopyLink}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                copiedLink
                  ? 'bg-teal-700 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Tautan Laporan Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Tautan Laporan untuk Guru</span>
                </>
              )}
            </button>
          </div>

          {/* Opsi 2: Kode Teks Ringkas */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-800">
                📋 Opsi 2: Salin Kode Laporan
              </span>
              <button
                onClick={handleCopyCode}
                className="text-[11px] font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1"
              >
                {copiedCode ? '✓ Tersalin!' : 'Salin Kode'}
              </button>
            </div>
            <textarea
              readOnly
              rows={2}
              value={reportToken}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-mono text-[11px] text-slate-600 select-all"
            ></textarea>
          </div>
        </div>

        {/* Info Ringkas Guru */}
        <div className="mt-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <span className="font-bold">Kenapa cara ini aman & praktis?</span> Seluruh hasil belajar dikodekan langsung ke dalam tautan. Guru dapat membuka nilai tanpa perlu login akun atau registrasi database server.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak PDF</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
