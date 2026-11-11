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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-ping"></span>
            <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
              Ruang Eksplorasi Interaktif: Ketuk Komponen
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {explorationData.instruction}
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
          openedCount >= 4
            ? 'bg-teal-50 text-teal-800 border-teal-200'
            : 'bg-primary-50 text-primary-800 border-primary-200'
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
              className={`p-4 rounded-xl border text-left transition-all relative ${
                activeTab === 'input'
                  ? 'bg-primary-50 border-primary-600 shadow-md ring-2 ring-primary-500/20'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Keyboard className={`w-5 h-5 ${activeTab === 'input' ? 'text-primary-700' : 'text-slate-500'}`} />
                {openedComponents.includes('input') && (
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                )}
              </div>
              <div className="text-xs font-bold text-slate-900">1. Unit Input</div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Pemasukan sinyal eksternal</div>
            </button>

            {/* 2. CPU */}
            <button
              onClick={() => handleSelectComponent('cpu')}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                activeTab === 'cpu'
                  ? 'bg-primary-50 border-primary-600 shadow-md ring-2 ring-primary-500/20'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Cpu className={`w-5 h-5 ${activeTab === 'cpu' ? 'text-primary-700' : 'text-slate-500'}`} />
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary-600 text-white">
                  AKTIF
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900">2. CPU (CU & ALU)</div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Pusat komputasi & kendali</div>
            </button>

            {/* 3. Memori Utama */}
            <button
              onClick={() => handleSelectComponent('memory')}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                activeTab === 'memory'
                  ? 'bg-primary-50 border-primary-600 shadow-md ring-2 ring-primary-500/20'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <HardDrive className={`w-5 h-5 ${activeTab === 'memory' ? 'text-primary-700' : 'text-slate-500'}`} />
                {openedComponents.includes('memory') && (
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                )}
              </div>
              <div className="text-xs font-bold text-slate-900">3. Memori Utama</div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">RAM penampung instruksi</div>
            </button>

            {/* 4. Unit Output */}
            <button
              onClick={() => handleSelectComponent('output')}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                activeTab === 'output'
                  ? 'bg-primary-50 border-primary-600 shadow-md ring-2 ring-primary-500/20'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Monitor className={`w-5 h-5 ${activeTab === 'output' ? 'text-primary-700' : 'text-slate-500'}`} />
                {openedComponents.includes('output') && (
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                )}
              </div>
              <div className="text-xs font-bold text-slate-900">4. Unit Output</div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Penyajian hasil olahan</div>
            </button>
          </div>

          {/* 5. Sistem Bus (Horizontal Bar) */}
          <button
            onClick={() => handleSelectComponent('bus')}
            className={`w-full p-3.5 rounded-xl border text-left transition-all ${
              activeTab === 'bus'
                ? 'bg-amber-50 border-amber-500 shadow-md'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>5. Sistem Bus (Data, Alamat, Kendali)</span>
              {openedComponents.includes('bus') && (
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Jalur penghubung seluruh modul ke memori tunggal
            </div>
          </button>
        </div>

        {/* Kolom Kanan: Detail Panel (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-primary-50/60 to-white border border-primary-200/80 shadow-sm">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-primary-700 text-white uppercase tracking-wider">
              {activeComp.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200">
              ● Arsitektur Dasar
            </span>
          </div>

          <h4 className="text-xl font-heading font-bold text-slate-900">
            {activeComp.name}
          </h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {activeComp.desc}
          </p>

          <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div>
              <div className="text-xs font-bold text-primary-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Rincian Fungsi Perangkat</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeComp.details}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500">Contoh Piranti Nyata:</span>
              <p className="text-xs text-slate-800 font-medium mt-0.5">
                {activeComp.examples}
              </p>
            </div>
          </div>

          {/* Navigasi Cepat Antar Komponen */}
          <div className="mt-5 flex items-center gap-2 flex-wrap text-xs font-medium">
            <span className="text-slate-500">Pilih cepat:</span>
            {explorationData.components.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectComponent(c.id)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  activeTab === c.id
                    ? 'bg-primary-700 text-white border-primary-700 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
