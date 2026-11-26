"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { FaTrash, FaPlus, FaCheck, FaBolt, FaWhatsapp } from "react-icons/fa";
import confetti from "canvas-confetti";

const WHATSAPP_NUMBER = "923214189298";

const PRESET_APPLIANCES = [
  { name: "Ceiling fan (standard)", watts: 80, hours: 12 },
  { name: "Ceiling fan (inverter/DC)", watts: 35, hours: 12 },
  { name: "LED bulb", watts: 10, hours: 6 },
  { name: "1.5-ton inverter AC", watts: 1200, hours: 8 },
  { name: "1.5-ton non-inverter AC", watts: 2000, hours: 8 },
  { name: "Refrigerator (medium)", watts: 225, hours: 12 },
  { name: "Deep freezer", watts: 250, hours: 12 },
  { name: 'LED TV 43"', watts: 80, hours: 6 },
  { name: "Water pump (1 HP)", watts: 750, hours: 1 },
  { name: "Washing machine", watts: 400, hours: 1 },
  { name: "Iron", watts: 1200, hours: 1 },
  { name: "Wi-Fi router + CCTV", watts: 30, hours: 24 },
  { name: "Other (custom)", watts: 0, hours: 0 },
];

const INSTALLATION_RATES = [
  { kw: 3, label: "3 kW", phase: "Single Phase", price: 15000, formatted: "Rs 15,000" },
  { kw: 4, label: "4 kW", phase: "Single Phase", price: 20000, formatted: "Rs 20,000" },
  { kw: 6, label: "6 kW", phase: "Single Phase", price: 25000, formatted: "Rs 25,000" },
  { kw: 8, label: "8 kW", phase: "Single Phase", price: 30000, formatted: "Rs 30,000" },
  { kw: 10, label: "10 kW", phase: "Single Phase", price: 35000, formatted: "Rs 35,000" },
  { kw: 12, label: "12 kW SP", phase: "Single Phase", price: 40000, formatted: "Rs 40,000" },
  { kw: 15, label: "15 kW", phase: "3-Phase", price: 50000, formatted: "Rs 50,000" },
];

function getInstallationEstimate(kw, phase) {
  if (kw <= 3) return { rate: 15000, label: "Rs 15,000", tier: "3 kW" };
  if (kw <= 4) return { rate: 20000, label: "Rs 20,000", tier: "4 kW" };
  if (kw <= 6) return { rate: 25000, label: "Rs 25,000", tier: "6 kW" };
  if (kw <= 8) return { rate: 30000, label: "Rs 30,000", tier: "8 kW" };
  if (kw <= 10) return { rate: 35000, label: "Rs 35,000", tier: "10 kW" };
  if (kw <= 12) return { rate: 40000, label: "Rs 40,000", tier: phase === "three" ? "12 kW (3-Phase)" : "12 kW SP" };
  return { rate: 50000, label: "Rs 50,000", tier: "15 kW 3Phase" };
}

function DonutChart({ percentage, size = 160, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.min(percentage, 100) / 100) * circumference;
  const empty = circumference - filled;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke="url(#donutGradient)" strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={`${filled} ${empty}`} strokeDashoffset={circumference * 0.25}
        style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <defs>
        <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0fa353" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EnergyBar({ label, units, maxUnits, color }) {
  const pct = maxUnits > 0 ? Math.min((units / maxUnits) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="text-[11px] sm:text-xs text-gray-600 font-medium w-20 sm:w-28 truncate shrink-0 text-right">{label}</span>
      <div className="flex-1 h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: color,
            borderRadius: "9999px",
            transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <span className="text-[11px] sm:text-xs text-gray-800 font-bold w-12 sm:w-14 text-right">{units.toFixed(1)} u</span>
    </div>
  );
}

export default function SolarCalculator() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState("single");
  const [appliances, setAppliances] = useState([
    { id: 1, name: "Ceiling fan (standard)", qty: 1, watts: 80, hours: 12 },
  ]);
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalLoadW = appliances.reduce((sum, app) => sum + app.qty * app.watts, 0);
  const totalDailyUnits = appliances.reduce(
    (sum, app) => sum + (app.qty * app.watts * app.hours) / 1000, 0
  );

  let systemSizeKW = Math.max(1, Math.ceil(totalDailyUnits / 4.5));
  if (totalLoadW > systemSizeKW * 1000) {
    systemSizeKW = Math.ceil(totalLoadW / 1000);
  }

  const panelsNeeded = Math.ceil((systemSizeKW * 1000) / 550);
  const systemProduction = systemSizeKW * 4.5;
  const utilizationPct = systemProduction > 0 ? Math.round((totalDailyUnits / systemProduction) * 100) : 0;
  const monthlySavings = Math.round(totalDailyUnits * 30 * 30);
  const yearlySavings = monthlySavings * 12;
  const co2SavedTons = (systemSizeKW * 1.5).toFixed(1);

  const barColors = ["#0fa353", "#16a34a", "#22c55e", "#4ade80", "#86efac"];
  const applianceBreakdown = useMemo(() => {
    const merged = {};
    appliances.forEach((app) => {
      const units = (app.qty * app.watts * app.hours) / 1000;
      if (merged[app.name]) { merged[app.name] += units; }
      else { merged[app.name] = units; }
    });
    return Object.entries(merged)
      .map(([name, units]) => ({ name, units }))
      .sort((a, b) => b.units - a.units)
      .slice(0, 5);
  }, [appliances]);

  const maxBarUnits = applianceBreakdown.length > 0 ? applianceBreakdown[0].units : 1;

  const handleApplianceChange = (id, field, value) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          if (field === "name") {
            const preset = PRESET_APPLIANCES.find((p) => p.name === value);
            if (preset) return { ...app, name: value, watts: preset.watts, hours: preset.hours };
          }
          return { ...app, [field]: field === "name" ? value : Number(value) >= 0 ? Number(value) : 0 };
        }
        return app;
      })
    );
  };

  const addAppliance = () => {
    const newId = Math.max(0, ...appliances.map((a) => a.id)) + 1;
    setAppliances([...appliances, { id: newId, name: "LED bulb", qty: 1, watts: 12, hours: 6 }]);
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter((app) => app.id !== id));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResult(false);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
      
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#a3e635', '#22c55e', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#a3e635', '#22c55e', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }, 1200);
  };

  const buildWhatsAppUrl = () => {
    const installEst = getInstallationEstimate(systemSizeKW, phase);
    let msg = `🌞 *Solar Load Calculator — Quote Request*\n\n`;
    msg += `📋 *Appliances Added:*\n`;
    appliances.forEach((app, i) => {
      const units = ((app.qty * app.watts * app.hours) / 1000).toFixed(1);
      msg += `${i + 1}. ${app.name} — Qty: ${app.qty}, ${app.watts}W, ${app.hours}hrs/day (${units} units/day)\n`;
    });
    msg += `\n⚡ *Summary:*\n`;
    msg += `• Total Load: ${totalLoadW.toLocaleString()} W\n`;
    msg += `• Daily Energy: ${totalDailyUnits.toFixed(1)} units/day\n`;
    msg += `• Phase: ${phase === "single" ? "Single" : "3"}-phase\n`;
    msg += `\n🔋 *Recommended System:*\n`;
    msg += `• System Size: ${systemSizeKW} kW\n`;
    msg += `• Panels Needed: ${panelsNeeded} × 550W\n`;
    msg += `• Capacity Used: ${utilizationPct}%\n`;
    msg += `\n🔧 *Professional Installation (Residential):*\n`;
    msg += `• Starting From: ${installEst.label} (${installEst.tier})\n`;
    msg += `\n💰 *Estimated Savings:*\n`;
    msg += `• Monthly: Rs ${monthlySavings.toLocaleString()}\n`;
    msg += `• Yearly: Rs ${yearlySavings.toLocaleString()}\n`;
    msg += `• CO₂ Saved: ${co2SavedTons} tons/year\n`;
    msg += `\nI'm interested in getting a detailed quote. Please contact me!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const ResultsPanel = ({ className = "" }) => {
    const installEst = getInstallationEstimate(systemSizeKW, phase);

    return (
      <div className={`bg-white rounded-2xl text-gray-900 border border-gray-200/90 shadow-md relative overflow-hidden ${className}`}>
        {/* Soft decorative background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Recommended Header & Donut */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="relative shrink-0">
            <DonutChart percentage={utilizationPct} size={84} strokeWidth={8} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-gray-900 leading-none">{systemSizeKW}</span>
              <span className="text-[10px] font-bold text-gray-400 mt-0.5">kW</span>
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[#0fa353] uppercase tracking-wider block">
              Recommended System
            </span>
            <p className="text-lg sm:text-xl font-black text-gray-900 leading-tight mt-0.5">
              {systemSizeKW} kW Setup
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {panelsNeeded} × 550W Tier-1 panels
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0fa353]" />
              <span className="text-[10px] font-semibold text-emerald-800">
                {utilizationPct}% capacity utilized
              </span>
            </div>
          </div>
        </div>

        {/* Top Energy Consumers */}
        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3 mb-3">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FaBolt className="text-amber-500" size={11} />
            Top Energy Consumers
          </p>
          <div className="space-y-2">
            {applianceBreakdown.length > 0 ? (
              applianceBreakdown.map((item, i) => (
                <EnergyBar
                  key={item.name}
                  label={item.name}
                  units={item.units}
                  maxUnits={maxBarUnits}
                  color={barColors[i] || barColors[barColors.length - 1]}
                />
              ))
            ) : (
              <p className="text-[10px] text-gray-400 text-center py-1">Add appliances to see breakdown</p>
            )}
          </div>
        </div>

        {/* 4-Metric Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-2.5">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Daily Energy</p>
            <p className="text-sm sm:text-base font-black text-gray-900">{totalDailyUnits.toFixed(1)}</p>
            <p className="text-[10px] text-gray-500">units/day</p>
          </div>
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-2.5">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Peak Load</p>
            <p className="text-sm sm:text-base font-black text-gray-900">{totalLoadW.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500">watts</p>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5">
            <p className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider mb-0.5">Monthly Savings</p>
            <p className="text-sm sm:text-base font-black text-[#0fa353]">Rs {monthlySavings.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-700/80">estimated</p>
          </div>
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-2.5">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">CO₂ Saved</p>
            <p className="text-sm sm:text-base font-black text-gray-900">{co2SavedTons}</p>
            <p className="text-[10px] text-gray-500">tons/year</p>
          </div>
        </div>

        {/* Estimated Yearly Savings */}
        <div className="bg-linear-to-r from-emerald-50 to-green-50/80 border border-emerald-200/80 rounded-xl p-3 mb-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100/60 flex items-center justify-center shrink-0">
            <Image src="/images/pkr.webp" alt="PKR" width={52} height={26} className="object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Estimated Yearly Savings</p>
            <p className="text-base sm:text-lg font-black text-[#0fa353]">Rs {yearlySavings.toLocaleString()}</p>
          </div>
        </div>

        {/* Professional Installation Estimate */}
        <div className="bg-gray-50/90 border border-gray-200/90 rounded-xl p-3 mb-3 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Professional Installation
            </p>
            <p className="text-xs text-gray-800 font-semibold truncate mt-0.5">
              Residential ({installEst.tier})
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-gray-400 font-medium leading-none">Starting from</p>
            <p className="text-sm sm:text-base font-black text-[#0fa353] mt-0.5">
              {installEst.label}
            </p>
          </div>
        </div>

        {/* Inverter Phase Note */}
        <div className="flex gap-2 items-start mb-3 px-0.5">
          <FaCheck className="text-[#0fa353] mt-0.5 shrink-0" size={11} />
          <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
            A <strong className="text-gray-900 font-semibold">{phase === "single" ? "single" : "3"}-phase</strong> inverter comfortably handles this load.
          </p>
        </div>

        {/* WhatsApp Quote Button */}
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#0fa353] hover:bg-[#0c8a45] text-white font-bold py-3 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <FaWhatsapp size={16} />
          <span>Get A Free Quote</span>
        </a>
        <p className="text-[10px] text-center text-gray-400 leading-relaxed mt-2">
          An indicative estimate. Your engineered quote follows a free site survey.
        </p>
      </div>
    );
  };

  if (!mounted) {
    return (
      <section id="calculator" className="scroll-mt-20 py-12 sm:py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2 md:mb-4 tracking-tight">
              Solar Load <span className="text-green-600">Calculator</span>
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Estimate your solar requirements by adding your home appliances below.
            </p>
          </div>
          <div className="h-96 w-full max-w-4xl mx-auto bg-white rounded-md border border-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section id="calculator" suppressHydrationWarning className="scroll-mt-20 py-12 sm:py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2 md:mb-4 tracking-tight">
            Solar Load <span className="text-green-600">Calculator</span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Estimate your solar requirements by adding your home appliances below.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          <div suppressHydrationWarning className="bg-white rounded-md shadow-sm border border-gray-200 p-3.5 sm:p-6 md:p-8 w-full lg:w-[58%]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 gap-2.5 sm:gap-3">
              <div>
                <p className="text-base sm:text-xl font-bold text-gray-900">Your appliances</p>
                <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5">Pick a preset or enter custom watts &amp; hours.</p>
              </div>
              <div className="flex items-center bg-gray-100 rounded-full p-0.5 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setPhase("single")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    phase === "single" ? "bg-[#0fa353] text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Single-phase
                </button>
                <button
                  onClick={() => setPhase("three")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    phase === "three" ? "bg-[#0fa353] text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  3-phase
                </button>
              </div>
            </div>

            <div suppressHydrationWarning className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
              <div className="col-span-4">Appliance</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-center">Watts</div>
              <div className="col-span-2 text-center">Hrs/Day</div>
              <div className="col-span-2 text-right">Units/Day</div>
            </div>

            <div suppressHydrationWarning className="space-y-3 md:space-y-3">
              {appliances.map((app) => {
                const unitsPerDay = ((app.qty * app.watts * app.hours) / 1000).toFixed(1);
                return (
                  <div
                    key={app.id}
                    className="group relative bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-md md:rounded-none border md:border-none border-gray-100"
                  >
                    <div className="md:hidden">
                      <div className="flex items-center justify-between mb-2">
                        <select
                          value={app.name}
                          onChange={(e) => handleApplianceChange(app.id, "name", e.target.value)}
                          className="flex-1 bg-white border border-gray-200 rounded-md px-2 py-1.5 text-xs text-gray-800 outline-none appearance-none mr-2"
                        >
                          {PRESET_APPLIANCES.map((p) => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeAppliance(app.id)}
                          className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-1.5 rounded-md transition-colors shrink-0"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Qty</label>
                          <input type="number" min="1" value={app.qty}
                            onChange={(e) => handleApplianceChange(app.id, "qty", e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 text-xs text-center text-gray-800 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Watts</label>
                          <input type="number" min="0" value={app.watts}
                            readOnly
                            className="w-full bg-gray-100 border border-gray-200 rounded-md px-2 py-1 text-xs text-center text-gray-500 outline-none cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Hrs/Day</label>
                          <input type="number" min="0" max="24" value={app.hours}
                            onChange={(e) => handleApplianceChange(app.id, "hours", e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 text-xs text-center text-gray-800 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Units</label>
                          <div className="bg-green-50 border border-green-200 rounded-md px-2 py-1 text-xs text-center text-green-800 font-bold">
                            {unitsPerDay}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <select value={app.name}
                          onChange={(e) => handleApplianceChange(app.id, "name", e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none"
                        >
                          {PRESET_APPLIANCES.map((p) => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="1" value={app.qty}
                          onChange={(e) => handleApplianceChange(app.id, "qty", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-center text-gray-800 focus:bg-white outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="0" value={app.watts}
                          readOnly
                          className="w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm text-center text-gray-500 outline-none cursor-not-allowed"
                        />
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="0" max="24" value={app.hours}
                          onChange={(e) => handleApplianceChange(app.id, "hours", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-center text-gray-800 focus:bg-white outline-none"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-3">
                        <span className="font-bold text-gray-900 text-base">{unitsPerDay}</span>
                        <button onClick={() => removeAppliance(app.id)}
                          className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-md transition-colors"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-4 md:mt-6">
              <button onClick={addAppliance}
                className="flex items-center gap-2 text-xs md:text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 md:px-4 md:py-2 rounded-md transition-colors"
              >
                <FaPlus size={10} /> Add Appliance
              </button>

              {!showResult && (
                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="flex items-center gap-2 bg-[#0fa353] hover:bg-[#0c8a45] text-white font-semibold text-xs md:text-sm px-4 md:px-6 py-2 rounded-md transition-colors disabled:opacity-60 shadow-xs hover:shadow"
                >
                  {isCalculating ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Calculating...
                    </>
                  ) : (
                    "Calculate Savings →"
                  )}
                </button>
              )}
            </div>
          </div>

          {showResult && !isCalculating && (
            <div className="hidden lg:block w-[42%] animate-[heroFadeUp_0.5s_ease-out]" ref={resultRef}>
              <div className="lg:sticky lg:top-28">
                <ResultsPanel className="p-5 md:p-6" />
              </div>
            </div>
          )}
        </div>

        {isCalculating && (
          <div className="mt-8 flex flex-col items-center justify-center py-12 w-full lg:w-[42%] mx-auto">
            <svg className="animate-spin h-10 w-10 text-green-500 mb-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-sm font-semibold text-gray-500">Calculating your solar needs...</p>
          </div>
        )}

        {showResult && !isCalculating && (
          <div className="lg:hidden mt-6 animate-[heroFadeUp_0.5s_ease-out]">
            <ResultsPanel className="p-4" />
          </div>
        )}

        {/* ── Transparent Residential Installation Rates (Architectural Brand Split) ── */}
        <div className="mt-12 sm:mt-16 rounded-sm border border-gray-200 bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Top-Left (Mobile Top): Header & Primary CTA */}
          <div className="lg:col-span-5 lg:row-start-1 bg-[#122116] text-white p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a3e635] block mb-2">
                Transparent Labor Rates
              </span>
              <p className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white">
                Professional Installation — Residential Starting Rates
              </p>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-2.5 leading-relaxed">
                Fixed, upfront technician and civil mounting charges for residential solar setups across Karachi &amp; Lahore.
              </p>
            </div>

            <div className="mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Salam A2Z Solar, I need a professional solar installation team for my home. Please share availability."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#0fa353] hover:bg-[#0c8a45] text-white text-xs sm:text-sm font-bold transition-colors"
              >
                <FaWhatsapp size={16} />
                <span>Book Installation Team</span>
              </a>
            </div>
          </div>

          {/* Right Column (Mobile Middle): Clean 7-Tier Rate Ledger */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
            {/* Table Column Header */}
            <div className="px-4 sm:px-6 py-3 bg-[#fafbfa] border-b border-gray-200 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <span>System Capacity &amp; Phase</span>
              <div className="flex items-center gap-6 sm:gap-10">
                <span>Starting Labor</span>
                <span className="w-16 text-right">Booking</span>
              </div>
            </div>

            {/* Rate Rows */}
            <div className="divide-y divide-gray-200 flex-1 flex flex-col justify-between">
              {INSTALLATION_RATES.map((item) => {
                const isRecommended = showResult && item.kw === systemSizeKW;
                const isThreePhase = item.phase === "3-Phase";
                const rowWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Salam A2Z Solar, I am interested in your ${item.label} (${item.phase}) residential installation package starting from ${item.formatted}. Please share technician availability.`
                )}`;

                return (
                  <div
                    key={item.label}
                    className={`px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 transition-colors ${
                      isRecommended
                        ? "bg-emerald-50/60 border-l-[3px] border-l-[#0fa353] pl-[13px] sm:pl-[21px]"
                        : "hover:bg-[#fafbfa]"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm sm:text-base font-extrabold text-[#1a1c29]">
                          {item.label}
                        </span>
                        <span
                          className={`text-[11px] font-semibold ${
                            isThreePhase
                              ? "bg-gray-100 text-gray-800 px-2 py-0.5 rounded-sm"
                              : "text-gray-500"
                          }`}
                        >
                          {item.phase}
                        </span>
                        {isRecommended && (
                          <span className="text-[11px] font-bold text-[#0fa353]">
                            • Calculator Match
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-medium block leading-none sm:hidden">
                          Starting from
                        </span>
                        <span className="text-sm sm:text-[15px] font-extrabold text-[#0fa353] tabular-nums">
                          {item.formatted}
                        </span>
                      </div>

                      <a
                        href={rowWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-16 py-1.5 rounded-sm text-center text-xs font-semibold transition-colors ${
                          isRecommended
                            ? "bg-[#0fa353] hover:bg-[#0c8a45] text-white"
                            : "border border-gray-300 bg-white text-[#1a1c29] hover:border-[#0fa353] hover:bg-[#0fa353] hover:text-white"
                        }`}
                      >
                        Book
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom-Left (Mobile Bottom): Scope Checklist & Site Audit Note */}
          <div className="lg:col-span-5 lg:row-start-2 bg-[#0e1b12] text-emerald-50 p-5 sm:p-7 lg:px-8 lg:py-6 border-t border-emerald-900/60 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-200/90 mb-3">
                Scope includes
              </p>
              <ul className="space-y-2 text-xs sm:text-[13px] text-emerald-50/90">
                <li className="flex items-center gap-2.5">
                  <FaCheck className="text-[#a3e635] shrink-0 text-[11px]" />
                  <span>Certified technician mounting</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheck className="text-[#a3e635] shrink-0 text-[11px]" />
                  <span>DC/AC DB box &amp; breaker wiring</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheck className="text-[#a3e635] shrink-0 text-[11px]" />
                  <span>Inverter testing &amp; app setup</span>
                </li>
              </ul>
            </div>

            <p className="text-[11px] sm:text-xs text-emerald-100/70 leading-relaxed border-t border-white/10 pt-3">
              * Structure elevation, civil footing &amp; cabling materials quoted separately based on site audit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
