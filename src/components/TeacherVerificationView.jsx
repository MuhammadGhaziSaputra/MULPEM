import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  Check,
  RefreshCw,
  Search,
  Server,
  FileSpreadsheet,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  Settings,
  Globe
} from 'lucide-react';
import { getApiEndpoint } from '../utils/storage';
import { verifyTeacherPin } from '../utils/pinAuth';
import { 
  fetchClassRekapFromSupabase, 
  getSupabaseConfig, 
  saveSupabaseConfig 
} from '../utils/supabaseClient';

export default function TeacherVerificationView({ onBackHome }) {
  // Cek apakah website sedang diakses dari lingkungan lokal (localhost / lab)
  const isLocalhost = 
    typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' || 
     window.location.hostname.endsWith('.test') || 
     window.location.hostname.endsWith('.local'));

  // PIN Security Protection State
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('teacher_portal_unlocked') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Database Rekap State
  const [dbStudents, setDbStudents] = useState([]);
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbLoading, setDbLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [dbError, setDbError] = useState(null);
  const [copiedAllExcel, setCopiedAllExcel] = useState(false);

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (verifyTeacherPin(pinInput)) {
      sessionStorage.setItem('teacher_portal_unlocked', 'true');
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('PIN Keamanan salah! Akses khusus Guru Informatika.');
    }
  };

  const handleLockPortal = () => {
    sessionStorage.removeItem('teacher_portal_unlocked');
    setIsUnlocked(false);
    setPinInput('');
  };

  // Cloud Server Settings State
  const [showServerSettings, setShowServerSettings] = useState(false);
  const [dbProvider, setDbProvider] = useState('mysql'); // 'supabase' | 'mysql'
  
  // Supabase Config State
  const initialSupa = getSupabaseConfig();
  const [supaUrlInput, setSupaUrlInput] = useState(initialSupa.url);
  const [supaKeyInput, setSupaKeyInput] = useState(initialSupa.key);

  // Fetch Database Rekap from Supabase (Cloud 24 Jam) atau Laragon / XAMPP
  const fetchDatabaseRekap = async () => {
    setDbLoading(true);
    setDbError(null);

    // 1. Coba Supabase Cloud Terlebih Dahulu (Jika sudah dikonfigurasi)
    const { url, key } = getSupabaseConfig();
    if (url && key) {
      try {
        const supaResult = await fetchClassRekapFromSupabase();
        if (supaResult && supaResult.data) {
          setDbStudents(supaResult.data);
          setClassList(supaResult.daftarKelas);
          setDbConnected(true);
          setDbProvider('supabase');
          setDbLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Gagal memuat Supabase, mencoba endpoint MySQL:", err);
      }
    }

    // 2. Coba MySQL Lokal (Laragon / XAMPP)
    const endpoint = getApiEndpoint('rekap_guru.php');
    if (!endpoint) {
      setDbConnected(false);
      setDbLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(endpoint, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server merespon dengan status ${res.status}`);
      }

      const json = await res.json();
      if (json.status === 'success') {
        setDbStudents(json.data || []);
        setClassList(json.daftarKelas || []);
        setDbConnected(true);
        setDbProvider('mysql');
      } else {
        throw new Error(json.message || 'Gagal memuat data');
      }
    } catch (err) {
      console.warn("Koneksi database tidak aktif:", err);
      setDbConnected(false);
      setDbError(err.message || 'Tidak dapat terhubung ke server');
    } finally {
      setDbLoading(false);
    }
  };

  const handleSaveSupabaseConfig = (e) => {
    e.preventDefault();
    saveSupabaseConfig(supaUrlInput, supaKeyInput);
    setShowServerSettings(false);
    fetchDatabaseRekap();
  };

  useEffect(() => {
    fetchDatabaseRekap();
  }, []);

  // Salin seluruh baris tabel kelas ke format Excel (TSV)
  const handleCopyAllExcel = () => {
    if (!dbStudents || dbStudents.length === 0) return;
    const header = "No\tNama Siswa\tKelas\tUnit 1 (Skor)\tUnit 1 Tuntas\tUnit 2 (Skor)\tUnit 2 Tuntas\tUnit 3 (Skor)\tUnit 3 Tuntas\tRata-Rata Kuis\tTotal Poin\tLevel\tWaktu Terakhir\n";
    const rows = filteredStudents.map((s, idx) => {
      return `${idx + 1}\t${s.nama}\t${s.kelas}\t${s.unit1_skor ?? '-'}\t${s.unit1_tuntas ? 'Tuntas' : 'Belum'}\t${s.unit2_skor ?? '-'}\t${s.unit2_tuntas ? 'Tuntas' : 'Belum'}\t${s.unit3_skor ?? '-'}\t${s.unit3_tuntas ? 'Tuntas' : 'Belum'}\t${s.rata_rata_kuis ?? '-'}\t${s.total_poin}\t${s.nama_level}\t${s.waktu_terakhir || '-'}`;
    }).join('\n');

    navigator.clipboard.writeText(header + rows);
    setCopiedAllExcel(true);
    setTimeout(() => setCopiedAllExcel(false), 2500);
  };

  // Filter siswa berdasarkan kelas dan pencarian
  const filteredStudents = dbStudents.filter((s) => {
    const matchClass = selectedClass === 'ALL' || s.kelas === selectedClass;
    const matchSearch = s.nama.toLowerCase().includes(searchQuery.toLowerCase()) || s.kelas.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSearch;
  });

  // TAMPILKAN LAYAR KUNCI PIN JIKA BELUM TERVERIFIKASI GURU
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] p-7 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-yellow-300 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-slate-900" />
          </div>

          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
            Akses Khusus Guru
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 leading-relaxed">
            Portal ini berisi data rekapitulasi nilai dan capaian seluruh siswa di kelas. Masukkan PIN Keamanan Guru untuk membuka.
          </p>

          <form onSubmit={handleVerifyPin} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">
                PIN Keamanan Guru:
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPin ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="Masukkan PIN Keamanan Guru"
                  autoFocus
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-600 bg-surface-page focus:bg-white font-bold text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="p-1.5 text-slate-700 hover:text-slate-900 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  title={showPin ? "Sembunyikan PIN" : "Tampilkan PIN"}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-rose-800 bg-rose-200 border-2 border-slate-900 rounded-xl px-3 py-1.5 font-bold mt-2 flex items-center gap-1.5">
                  <span>⚠</span>
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="neo-btn w-full py-2.5 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs sm:text-sm cursor-pointer"
            >
              Buka Portal Guru
            </button>
          </form>

          <div className="mt-6 pt-4 border-t-2 border-slate-900/15 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-bold text-[11px]">Bukan Guru?</span>
            <button
              onClick={onBackHome}
              className="text-primary-700 hover:underline font-extrabold flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Siswa</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Bar Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-900/15 mb-6">
        <button
          onClick={onBackHome}
          className="neo-btn-sm flex items-center gap-2 text-xs font-extrabold text-slate-900 px-3.5 py-2 rounded-xl bg-white hover:bg-yellow-200 self-start cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Siswa</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {dbConnected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-300 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></span>
              <span>{dbProvider === 'supabase' ? 'Supabase Cloud (24 Jam Online)' : 'MySQL Terhubung (Laragon)'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-yellow-300 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <span>Database Belum Terhubung</span>
            </span>
          )}

          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 bg-sky-200 px-3 py-1 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
            <ShieldCheck className="w-4 h-4 text-slate-900" />
            <span>Portal Guru Aktif</span>
          </div>

          {/* Tombol Pengaturan Server Cloud */}
          <button
            onClick={() => setShowServerSettings(true)}
            className="neo-btn-sm flex items-center gap-1.5 text-xs font-extrabold text-slate-900 px-3 py-1.5 rounded-full bg-white hover:bg-sky-200 cursor-pointer"
            title="Atur URL Server Database Cloud 24 Jam"
          >
            <Settings className="w-3.5 h-3.5 text-primary-700" />
            <span className="hidden sm:inline">Server Cloud</span>
          </button>

          {/* Tombol Kunci Portal Kembali */}
          <button
            onClick={handleLockPortal}
            className="neo-btn-sm flex items-center gap-1.5 text-xs font-extrabold text-slate-900 px-3 py-1.5 rounded-full bg-rose-200 hover:bg-rose-300 cursor-pointer"
            title="Kunci kembali portal guru"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Kunci</span>
          </button>
        </div>
      </div>

      {/* Rekap Kelas Terpusat (Cloud Database) */}
      <div className="space-y-6">
          {/* Header Action & Controls */}
          <div className="neo-card p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-700 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama siswa..."
                  className="pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-slate-900 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-primary-600 bg-surface-page focus:bg-white font-bold text-slate-900"
                />
              </div>

              {/* Class Filter */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border-2 border-slate-900 bg-surface-page font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-600 cursor-pointer"
              >
                <option value="ALL">Semua Kelas ({dbStudents.length})</option>
                {classList.map((c) => (
                  <option key={c} value={c}>Kelas {c}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchDatabaseRekap}
                disabled={dbLoading}
                className="neo-btn-sm px-3.5 py-2 rounded-xl bg-white hover:bg-sky-200 text-slate-900 font-extrabold text-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                title="Perbarui data dari database"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin' : ''}`} />
                <span>{dbLoading ? 'Memuat...' : 'Refresh'}</span>
              </button>

              <button
                onClick={handleCopyAllExcel}
                disabled={filteredStudents.length === 0}
                className={`px-4 py-2 rounded-xl border-2 border-slate-900 font-extrabold text-xs flex items-center gap-1.5 transition-all ${
                  filteredStudents.length === 0
                    ? 'bg-slate-200 text-slate-500 border-slate-400 cursor-not-allowed'
                    : 'neo-btn bg-emerald-300 hover:bg-emerald-200 text-slate-900 cursor-pointer'
                }`}
              >
                {copiedAllExcel ? <Check className="w-3.5 h-3.5 text-slate-900" /> : <FileSpreadsheet className="w-3.5 h-3.5 text-slate-900" />}
                <span>{copiedAllExcel ? 'Tersalin ke Clipboard!' : 'Salin Semua ke Excel'}</span>
              </button>
            </div>
          </div>

          {/* Database Content */}
          {dbConnected ? (
            <div className="bg-white rounded-3xl border-[2.5px] border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] overflow-hidden">
              <div className="p-5 sm:p-6 border-b-2 border-slate-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-yellow-100">
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
                    Daftar Rekapitulasi Capaian Pembelajaran Siswa
                  </h3>
                  <p className="text-xs text-slate-700 font-semibold mt-0.5">
                    {dbProvider === 'supabase'
                      ? 'Data tersinkronisasi 24 jam online dari Supabase Cloud Database'
                      : 'Data tersinkronisasi otomatis dari database MySQL (`studio_informatika`)'}
                  </p>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 bg-white border-2 border-slate-900 rounded-full text-slate-900">
                  Menampilkan {filteredStudents.length} dari {dbStudents.length} siswa
                </span>
              </div>

              {filteredStudents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-slate-900/15 text-xs text-left">
                    <thead className="bg-slate-900 font-heading font-extrabold text-white uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-4 py-3.5 text-center">No</th>
                        <th className="px-4 py-3.5">Nama Siswa</th>
                        <th className="px-4 py-3.5">Kelas</th>
                        <th className="px-4 py-3.5 text-center">Unit 1 (Von Neumann)</th>
                        <th className="px-4 py-3.5 text-center">Unit 2 (IPO)</th>
                        <th className="px-4 py-3.5 text-center">Unit 3 (FDE)</th>
                        <th className="px-4 py-3.5 text-center">Rata-Rata Kuis</th>
                        <th className="px-4 py-3.5 text-center">Total Poin</th>
                        <th className="px-4 py-3.5 text-center">Level Predikat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredStudents.map((s, idx) => {
                        const avg = s.rata_rata_kuis ? parseFloat(s.rata_rata_kuis) : 0;

                        return (
                          <tr key={s.id} className="hover:bg-yellow-50/80 transition-colors">
                            <td className="px-4 py-3.5 text-center font-mono font-bold text-slate-600">
                              {idx + 1}
                            </td>
                            <td className="px-4 py-3.5 font-extrabold text-slate-900">
                              {s.nama}
                            </td>
                            <td className="px-4 py-3.5 text-slate-800 font-bold">
                              {s.kelas}
                            </td>
                            {/* Unit 1 */}
                            <td className="px-4 py-3.5 text-center">
                              {s.unit1_skor !== null && s.unit1_skor !== undefined ? (
                                <span className={`inline-block px-2.5 py-0.5 rounded-lg font-extrabold text-xs border-2 border-slate-900 ${
                                  s.unit1_tuntas ? 'bg-emerald-200 text-slate-900' : 'bg-yellow-200 text-slate-900'
                                }`}>
                                  {s.unit1_skor} {s.unit1_tuntas ? '✓' : ''}
                                </span>
                              ) : (
                                <span className="text-slate-400 font-bold">-</span>
                              )}
                            </td>
                            {/* Unit 2 */}
                            <td className="px-4 py-3.5 text-center">
                              {s.unit2_skor !== null && s.unit2_skor !== undefined ? (
                                <span className={`inline-block px-2.5 py-0.5 rounded-lg font-extrabold text-xs border-2 border-slate-900 ${
                                  s.unit2_tuntas ? 'bg-emerald-200 text-slate-900' : 'bg-yellow-200 text-slate-900'
                                }`}>
                                  {s.unit2_skor} {s.unit2_tuntas ? '✓' : ''}
                                </span>
                              ) : (
                                <span className="text-slate-400 font-bold">-</span>
                              )}
                            </td>
                            {/* Unit 3 */}
                            <td className="px-4 py-3.5 text-center">
                              {s.unit3_skor !== null && s.unit3_skor !== undefined ? (
                                <span className={`inline-block px-2.5 py-0.5 rounded-lg font-extrabold text-xs border-2 border-slate-900 ${
                                  s.unit3_tuntas ? 'bg-emerald-200 text-slate-900' : 'bg-yellow-200 text-slate-900'
                                }`}>
                                  {s.unit3_skor} {s.unit3_tuntas ? '✓' : ''}
                                </span>
                              ) : (
                                <span className="text-slate-400 font-bold">-</span>
                              )}
                            </td>
                            {/* Rata-Rata */}
                            <td className="px-4 py-3.5 text-center font-heading font-extrabold">
                              {avg > 0 ? (
                                <span className={avg >= 75 ? 'text-emerald-800' : 'text-slate-900'}>
                                  {avg} / 100
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            {/* Total Poin */}
                            <td className="px-4 py-3.5 text-center font-extrabold text-slate-900">
                              ⚡ {s.total_poin}
                            </td>
                            {/* Level */}
                            <td className="px-4 py-3.5 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-200 text-slate-900 border-2 border-slate-900">
                                Level {s.level_gamifikasi}: {s.nama_level}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-600 font-bold">
                  Tidak ada data siswa yang cocok dengan filter pencarian.
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 sm:p-12 bg-white rounded-3xl border-[2.5px] border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-yellow-300 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="font-heading font-extrabold text-slate-900 text-xl">
                {!isLocalhost ? 'Database Cloud Belum Terhubung' : 'Server Database Belum Aktif'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 max-w-md mx-auto leading-relaxed">
                {!isLocalhost
                  ? 'Gagal memuat rekapitulasi siswa dari Supabase Cloud. Pastikan pengaturan URL dan Anon Key pada tombol Server Cloud sudah sesuai atau coba hubungkan kembali.'
                  : 'Aplikasi siap terhubung ke database. Pastikan koneksi Supabase Cloud aktif atau jalankan server database lokal:'}
              </p>

              {isLocalhost && (
                <div className="mt-5 p-4 rounded-2xl bg-surface-page border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] text-left text-xs space-y-2 max-w-lg mx-auto font-mono text-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-yellow-300 border border-slate-900 text-slate-900 flex items-center justify-center font-extrabold text-[10px]">1</span>
                    <span>Buka <b>Laragon</b> atau <b>XAMPP</b> di laptop/komputermu.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-200 border border-slate-900 text-slate-900 flex items-center justify-center font-extrabold text-[10px]">2</span>
                    <span>Klik tombol <b>Start All</b> (Apache & MySQL aktif).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 border border-slate-900 text-slate-900 flex items-center justify-center font-extrabold text-[10px]">3</span>
                    <span>Pastikan database <b>`studio_informatika`</b> sudah diimpor.</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={fetchDatabaseRekap}
                  disabled={dbLoading}
                  className="neo-btn px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${dbLoading ? 'animate-spin' : ''}`} />
                  <span>{dbLoading ? 'Menghubungkan...' : 'Coba Hubungkan Sekarang'}</span>
                </button>

                <button
                  onClick={() => setShowServerSettings(true)}
                  className="neo-btn px-5 py-2.5 bg-white hover:bg-sky-200 text-slate-900 rounded-xl font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-primary-700" />
                  <span>Pengaturan Server Cloud</span>
                </button>
              </div>
            </div>
          )}
      </div>

      {/* Modal Pengaturan Server Cloud Supabase */}
      {showServerSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900/15">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-base">
                    Hubungkan ke Supabase Cloud (24 Jam)
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">
                    Database online gratis selamanya tanpa kartu kredit
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowServerSettings(false)}
                className="neo-btn-sm p-1.5 rounded-xl bg-white hover:bg-rose-200 text-slate-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSupabaseConfig} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                  Supabase Project URL:
                </label>
                <input
                  type="url"
                  value={supaUrlInput}
                  onChange={(e) => setSupaUrlInput(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-600 bg-surface-page focus:bg-white font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                  Supabase Anon (Public) Key:
                </label>
                <input
                  type="password"
                  value={supaKeyInput}
                  onChange={(e) => setSupaKeyInput(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-600 bg-surface-page focus:bg-white font-mono font-bold text-slate-900"
                />
                <p className="text-[11px] text-slate-700 font-medium mt-1.5 leading-relaxed">
                  Dapatkan di dashboard Supabase: <b>Project Settings ➔ Data API ➔ Project URL & anon public key</b>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-100 border-2 border-slate-900 text-xs text-slate-900 font-medium leading-relaxed">
                ✨ <b>Manfaat:</b> Begitu terhubung, seluruh murid yang belajar dari rumah via link Netlify akan otomatis tersimpan ke Supabase 24 jam penuh!
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    saveSupabaseConfig('', '');
                    setSupaUrlInput('');
                    setSupaKeyInput('');
                    setShowServerSettings(false);
                    fetchDatabaseRekap();
                  }}
                  className="text-xs text-rose-700 hover:underline font-extrabold cursor-pointer"
                >
                  Putuskan Koneksi
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowServerSettings(false)}
                    className="neo-btn-sm px-4 py-2 text-xs font-extrabold text-slate-900 bg-white hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="neo-btn px-5 py-2 text-xs font-extrabold text-slate-900 bg-yellow-300 hover:bg-yellow-200 rounded-xl cursor-pointer"
                  >
                    Simpan & Hubungkan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
