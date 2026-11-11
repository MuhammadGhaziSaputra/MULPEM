import { createClient } from '@supabase/supabase-js';

// Kredensial Resmi Supabase Cloud (Studio Informatika SMAN 2 Makassar)
export const DEFAULT_SUPABASE_URL = 'https://ahypeuewdryqbotfvgdr.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_2IJUw_5jgdRH2y5Je4NgEQ_A_bQaVM_';

// Ambil konfigurasi dari localStorage atau nilai bawaan paten
export function getSupabaseConfig() {
  const url = localStorage.getItem('supabase_url') || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem('supabase_anon_key') || DEFAULT_SUPABASE_ANON_KEY;
  return { url: url.trim(), key: key.trim() };
}

export function saveSupabaseConfig(url, key) {
  if (url && key) {
    localStorage.setItem('supabase_url', url.trim());
    localStorage.setItem('supabase_anon_key', key.trim());
  } else {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_anon_key');
  }
}

export function getSupabase() {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch (err) {
    console.warn("Gagal inisialisasi Supabase client:", err);
    return null;
  }
}

// 1. SINKRONISASI SISWA & NILAI KE SUPABASE
export async function syncStudentToSupabase(state, renameFrom = null) {
  const supabase = getSupabase();
  if (!supabase || !state) return null;

  try {
    const rawName = state.student?.name?.trim();
    if (!rawName || rawName.length < 2 || rawName.toLowerCase() === 'siswa mandiri') {
      return null;
    }

    const nama = rawName;
    const kelas = state.student?.class?.trim() || 'X-2';
    const totalPoin = state.overall?.totalPoints || 0;
    const level = state.overall?.level || 1;
    const levelName = state.overall?.levelName || 'Pemula';

    let studentId = null;

    // Jika siswa mengganti nama/kelas, perbarui entri lama di Supabase agar tidak ada nama ganda
    if (
      renameFrom?.name &&
      (renameFrom.name !== nama || (renameFrom.class || 'X-2') !== kelas)
    ) {
      const { data: existingTarget } = await supabase
        .from('siswa')
        .select('id')
        .eq('nama', nama)
        .eq('kelas', kelas)
        .maybeSingle();

      if (!existingTarget) {
        const { data: renamedRow } = await supabase
          .from('siswa')
          .update({
            nama,
            kelas,
            total_poin: totalPoin,
            level_gamifikasi: level,
            nama_level: levelName,
            updated_at: new Date().toISOString()
          })
          .eq('nama', renameFrom.name)
          .eq('kelas', renameFrom.class || 'X-2')
          .select('id')
          .maybeSingle();

        if (renamedRow?.id) {
          studentId = renamedRow.id;
        }
      }
    }

    // 1. Upsert Data Siswa jika belum didapat dari pembaruan ganti nama
    if (!studentId) {
      const { data: studentData, error: studentError } = await supabase
        .from('siswa')
        .upsert(
          { 
            nama, 
            kelas, 
            total_poin: totalPoin, 
            level_gamifikasi: level, 
            nama_level: levelName,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'nama,kelas' }
        )
        .select('id')
        .single();

      if (studentError) {
        console.warn("Error upsert siswa di Supabase:", studentError);
        return null;
      }

      studentId = studentData.id;
    }

    // 2. Upsert Nilai Kuis Unit 1, 2, 3
    const units = [
      { id: 1, uState: state.units?.unit1 },
      { id: 2, uState: state.units?.unit2 },
      { id: 3, uState: state.units?.unit3 },
    ];

    for (const u of units) {
      if (u.uState?.quiz?.firstAttemptScorePercent !== null && u.uState?.quiz?.firstAttemptScorePercent !== undefined) {
        const score = u.uState.quiz.firstAttemptScorePercent;
        const passingScore = (u.id === 3) ? 80 : 75;
        const isPassed = score >= passingScore;
        const points = u.uState.totalPoints || 0;

        await supabase
          .from('nilai_kuis')
          .upsert(
            {
              siswa_id: studentId,
              unit_id: u.id,
              skor_kuis: score,
              status_tuntas: isPassed,
              poin_didapat: points,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'siswa_id,unit_id' }
          );
      }

      // Upsert Refleksi jika ada
      if (u.uState?.reflection?.completed) {
        await supabase
          .from('refleksi_siswa')
          .upsert(
            {
              siswa_id: studentId,
              unit_id: u.id,
              pemahaman_skala: u.uState.reflection.scale || null,
              bagian_sulit: u.uState.reflection.hardest || '',
              strategi_belajar: u.uState.reflection.explanation || ''
            },
            { onConflict: 'siswa_id,unit_id' }
          );
      }
    }

    return true;
  } catch (err) {
    console.warn("Gagal sinkronisasi ke Supabase:", err);
    return null;
  }
}

// 2. AMBIL REKAP KELAS UNTUK PORTAL GURU DARI SUPABASE
export async function fetchClassRekapFromSupabase() {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    // Ambil data siswa beserta relasi nilai kuisnya
    const { data: students, error } = await supabase
      .from('siswa')
      .select(`
        id,
        nama,
        kelas,
        total_poin,
        level_gamifikasi,
        nama_level,
        updated_at,
        nilai_kuis (
          unit_id,
          skor_kuis,
          status_tuntas
        )
      `)
      .order('kelas', { ascending: true })
      .order('nama', { ascending: true });

    if (error) {
      console.warn("Error fetch data Supabase:", error);
      return null;
    }

    // Format menjadi baris siap tampil di tabel guru
    const formatted = students.map((s) => {
      const u1 = s.nilai_kuis?.find((nk) => nk.unit_id === 1);
      const u2 = s.nilai_kuis?.find((nk) => nk.unit_id === 2);
      const u3 = s.nilai_kuis?.find((nk) => nk.unit_id === 3);

      const scores = [u1?.skor_kuis, u2?.skor_kuis, u3?.skor_kuis].filter((v) => v !== undefined && v !== null);
      const avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : null;
      const tuntasCount = [u1?.status_tuntas, u2?.status_tuntas, u3?.status_tuntas].filter(Boolean).length;

      return {
        id: s.id,
        nama: s.nama,
        kelas: s.kelas,
        total_poin: s.total_poin,
        level_gamifikasi: s.level_gamifikasi,
        nama_level: s.nama_level,
        unit1_skor: u1 ? u1.skor_kuis : null,
        unit1_tuntas: u1 ? (u1.status_tuntas ? 1 : 0) : 0,
        unit2_skor: u2 ? u2.skor_kuis : null,
        unit2_tuntas: u2 ? (u2.status_tuntas ? 1 : 0) : 0,
        unit3_skor: u3 ? u3.skor_kuis : null,
        unit3_tuntas: u3 ? (u3.status_tuntas ? 1 : 0) : 0,
        rata_rata_kuis: avg,
        unit_tuntas_count: tuntasCount,
        waktu_terakhir: new Date(s.updated_at).toLocaleString('id-ID')
      };
    });

    const uniqueClasses = [...new Set(students.map((s) => s.kelas))].filter(Boolean);

    return {
      totalSiswa: formatted.length,
      daftarKelas: uniqueClasses,
      data: formatted
    };
  } catch (err) {
    console.warn("Gagal memuat data dari Supabase:", err);
    return null;
  }
}
