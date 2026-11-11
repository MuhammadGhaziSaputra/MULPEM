import React, { useState, useEffect } from 'react';
import { Keyboard, Cpu, HardDrive, Monitor, CheckCircle, Info, Sparkles } from 'lucide-react';
import { storage } from '../utils/storage';
import { triggerConfetti } from '../utils/confetti';

export default function ExplorationVonNeumann({ explorationData, unitState, unitCode, onComplete }) {
  const [activeTab, setActiveTab] = useState('cpu');
  const openedComponents = unitState.exploration.openedComponents || [];

  const handleSelectComponent = (id) => {
    setActiveTab(id);
    if (!openedComponents.includes(id)) {
      const nextOpened = [...openedComponents, id];
      const points = Math.min(20, nextOpened.length * 4);
      const isCompleted = nextOpened.length >= 4; // 4 komponen utama cukup untuk tuntas
      
      storage.saveExploration(unitCode, {
        openedComponents: nextOpened,
        points: points,
        completed: isCompleted
      });

      if (isCompleted && !unitState.exploration.completed) {
        triggerConfetti();
      }
    }
  };

  const activeComp = explorationData.components.find((c) => c.id === activeTab) || explorationData.components[0];
  const openedCount = openedComponents.length;
  const totalCount = explorationData.components.length;

  return (
    <div className="neo-card p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b-2 border-slate-900/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-600 border border-slate-900 animate-ping"></span>
            <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
              Ruang Eksplorasi Interaktif: Ketuk Komponen
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            {explorationData.instruction}
          </p>
        </div>

        <div className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] ${
          openedCount >= 4
            ? 'bg-emerald-300 text-slate-900'
            : 'bg-yellow-200 text-slate-900'
        }`}>
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{openedCount}/{totalCount} Komponen Terbuka (+{unitState.exploration.points || 0} Poin)</span>
        </div>
      </div>

      {/* Grid: Kiri Diagram Kotak, Kanan Detail Box */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Diagram Interaktif Von Neumann (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* 1. Unit Input */}
            <button
              onClick={() => handleSelectComponent('input')}
              className={`p-4 rounded-2xl border-2 border-slate-900 text-left transition-all relative cursor-pointer ${
                activeTab === 'input'
                  ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_#0F172A] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-surface-page hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Keyboard className="w-5 h-5 text-slate-900" />
                {openedComponents.includes('input') && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900"></span>
                )}
              </div>
              <div className="text-xs font-extrabold text-slate-900">1. Unit Input</div>
              <div className="text-[11px] text-slate-700 font-medium line-clamp-1 mt-0.5">Pemasukan sinyal eksternal</div>
            </button>

            {/* 2. CPU */}
            <button
              onClick={() => handleSelectComponent('cpu')}
              className={`p-4 rounded-2xl border-2 border-slate-900 text-left transition-all relative cursor-pointer ${
                activeTab === 'cpu'
                  ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_#0F172A] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-surface-page hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Cpu className="w-5 h-5 text-slate-900" />
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-primary-600 border border-slate-900 text-white">
                  AKTIF
                </span>
              </div>
              <div className="text-xs font-extrabold text-slate-900">2. CPU (CU & ALU)</div>
              <div className="text-[11px] text-slate-700 font-medium line-clamp-1 mt-0.5">Pusat komputasi & kendali</div>
            </button>

            {/* 3. Memori Utama */}
            <button
              onClick={() => handleSelectComponent('memory')}
              className={`p-4 rounded-2xl border-2 border-slate-900 text-left transition-all relative cursor-pointer ${
                activeTab === 'memory'
                  ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_#0F172A] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-surface-page hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <HardDrive className="w-5 h-5 text-slate-900" />
                {openedComponents.includes('memory') && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900"></span>
                )}
              </div>
              <div className="text-xs font-extrabold text-slate-900">3. Memori Utama</div>
              <div className="text-[11px] text-slate-700 font-medium line-clamp-1 mt-0.5">RAM penampung instruksi</div>
            </button>

            {/* 4. Unit Output */}
            <button
              onClick={() => handleSelectComponent('output')}
              className={`p-4 rounded-2xl border-2 border-slate-900 text-left transition-all relative cursor-pointer ${
                activeTab === 'output'
                  ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_#0F172A] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-surface-page hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Monitor className="w-5 h-5 text-slate-900" />
                {openedComponents.includes('output') && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900"></span>
                )}
              </div>
              <div className="text-xs font-extrabold text-slate-900">4. Unit Output</div>
              <div className="text-[11px] text-slate-700 font-medium line-clamp-1 mt-0.5">Penyajian hasil olahan</div>
            </button>
          </div>

          {/* 5. Sistem Bus (Horizontal Bar) */}
          <button
            onClick={() => handleSelectComponent('bus')}
            className={`w-full p-3.5 rounded-2xl border-2 border-slate-900 text-left transition-all cursor-pointer ${
              activeTab === 'bus'
                ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_#0F172A] -translate-x-0.5 -translate-y-0.5'
                : 'bg-surface-page hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
              <span>5. Sistem Bus (Data, Alamat, Kendali)</span>
              {openedComponents.includes('bus') && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900"></span>
              )}
            </div>
            <div className="text-[11px] text-slate-700 font-medium mt-0.5">
              Jalur penghubung seluruh modul ke memori tunggal
            </div>
          </button>
        </div>

        {/* Kolom Kanan: Detail Panel Flat Neo-Brutalist (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-sky-100 border-2 border-slate-900 shadow-[5px_5px_0px_0px_#0F172A]">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-primary-600 border-2 border-slate-900 text-white uppercase tracking-wider">
              {activeComp.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-yellow-300 text-slate-900 border-2 border-slate-900">
              ● Arsitektur Dasar
            </span>
          </div>

          <h4 className="text-xl font-heading font-extrabold text-slate-900">
            {activeComp.name}
          </h4>
          <p className="text-sm text-slate-800 font-medium mt-1 leading-relaxed">
            {activeComp.desc}
          </p>

          <div className="mt-4 p-4 rounded-xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] space-y-3">
            <div>
              <div className="text-xs font-extrabold text-primary-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Rincian Fungsi Perangkat</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {activeComp.details}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-slate-900/10">
              <span className="text-xs font-extrabold text-slate-700">Contoh Piranti Nyata:</span>
              <p className="text-xs text-slate-900 font-bold mt-0.5">
                {activeComp.examples}
              </p>
            </div>
          </div>

          {/* Navigasi Cepat Antar Komponen */}
          <div className="mt-5 flex items-center gap-2 flex-wrap text-xs font-bold">
            <span className="text-slate-700">Pilih cepat:</span>
            {explorationData.components.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectComponent(c.id)}
                className={`neo-btn-sm px-2.5 py-1 rounded-lg cursor-pointer ${
                  activeTab === c.id
                    ? 'bg-yellow-300 text-slate-900 font-extrabold'
                    : 'bg-white text-slate-900 hover:bg-emerald-200'
                }`}
              >
                {c.name.split('.')[1] || c.name} {openedComponents.includes(c.id) && '✓'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
