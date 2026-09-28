"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { FaTrash, FaPlus, FaCheck, FaBolt, FaWhatsapp } from "react-icons/fa";
import confetti from "canvas-confetti";

const WHATSAPP_NUMBER = "923214189298";

const PRESET_APPLIANCES = [
  { name: "Ceiling fan (standard)", watts: 80, hours: 12 },
  { name: "Ceiling fan (inverter/DC)", watts: 35, hours: 12 },
  { name: "LED bulb", watts: 12, hours: 6 },
  { name: "1.5-ton inverter AC", watts: 1500, hours: 8 },
  { name: "1.5-ton non-inverter AC", watts: 2200, hours: 8 },
  { name: "Refrigerator (medium)", watts: 300, hours: 12 },
  { name: "Deep freezer", watts: 400, hours: 12 },
  { name: 'LED TV 43"', watts: 100, hours: 6 },
  { name: "Water pump (1 HP)", watts: 750, hours: 1 },
  { name: "Washing machine", watts: 500, hours: 1 },
  { name: "Iron", watts: 1000, hours: 1 },
  { name: "Wi-Fi router + CCTV", watts: 30, hours: 24 },
  { name: "Other (custom)", watts: 0, hours: 0 },
];

/* ── Custom SVG Donut Chart ── */
function DonutChart({ percentage, size = 160, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.min(percentage, 100) / 100) * circumference;
  const empty = circumference - filled;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#2a3038" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke="url(#donutGradient)" strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={`${filled} ${empty}`} strokeDashoffset={circumference * 0.25}
        style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <defs>
        <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Custom Horizontal Bar ── */
function EnergyBar({ label, units, maxUnits, color }) {
  const pct = maxUnits > 0 ? Math.min((units / maxUnits) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="text-[11px] sm:text-xs text-gray-400 w-20 sm:w-28 truncate shrink-0 text-right">{label}</span>
      <div className="flex-1 h-2 sm:h-2.5 bg-[#2a3038] rounded-[6px] overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: color,
            borderRadius: "6px",
            transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <span className="text-[11px] sm:text-xs text-gray-300 font-semibold w-12 sm:w-14 text-right">{units.toFixed(1)} u</span>
    </div>
  );
}

export default function SolarCalculator() {
  const [phase, setPhase] = useState("single");
  const [appliances, setAppliances] = useState([
    { id: 1, name: "Ceiling fan (standard)", qty: 1, watts: 80, hours: 12 },
  ]);
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultRef = useRef(null);

  // ── Derived calculations ──
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

  const barColors = ["#a3e635", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];
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

  // ── Handlers ──
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

  // ── Calculate handler with 1s loading & Confetti ──
  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResult(false);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
      
      // Fire confetti from left and right
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

      // Scroll to results after render
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }, 1200);
  };

  // ── Build WhatsApp message with all user data ──
  const buildWhatsAppUrl = () => {
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
    msg += `\n💰 *Estimated Savings:*\n`;
    msg += `• Monthly: Rs ${monthlySavings.toLocaleString()}\n`;
    msg += `• Yearly: Rs ${yearlySavings.toLocaleString()}\n`;
    msg += `• CO₂ Saved: ${co2SavedTons} tons/year\n`;
    msg += `\nI'm interested in getting a detailed quote. Please contact me!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  /* ════════════════════════════════════════════════════
     RESULTS PANEL (shared between mobile and desktop)
     ════════════════════════════════════════════════════ */
  const ResultsPanel = ({ className = "" }) => (
    <div className={`bg-[#1a1f22] rounded-[6px] text-white shadow-xl relative overflow-hidden ${className}`}>
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-green-500 opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* ── Header: Donut + kW ── */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative shrink-0">
          <DonutChart percentage={utilizationPct} size={80} strokeWidth={8} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-[#a3e635] leading-none">{systemSizeKW}</span>
            <span className="text-[9px] font-bold text-gray-400 mt-0.5">kW</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Recommended</p>
          <p className="text-lg font-bold leading-tight">{systemSizeKW} kW System</p>
          <p className="text-xs text-gray-400 mt-0.5">{panelsNeeded} × 550W panels</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
            <span className="text-[10px] text-gray-400">{utilizationPct}% capacity used</span>
          </div>
        </div>
      </div>

      {/* ── Energy Breakdown ── */}
      <div className="bg-[#222930] rounded-[6px] p-3 mb-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <FaBolt className="text-yellow-400" size={10} />
          Top Energy Consumers
        </p>
        <div className="space-y-2">
          {applianceBreakdown.length > 0 ? (
            applianceBreakdown.map((item, i) => (
              <EnergyBar key={item.name} label={item.name} units={item.units}
                maxUnits={maxBarUnits} color={barColors[i] || barColors[barColors.length - 1]} />
            ))
          ) : (
            <p className="text-[10px] text-gray-500 text-center py-1">Add appliances to see breakdown</p>
          )}
        </div>
      </div>

      {/* ── Summary Grid ── */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-[#222930] rounded-[6px] p-2.5">
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Daily Energy</p>
          <p className="text-base font-bold text-[#a3e635]">{totalDailyUnits.toFixed(1)}</p>
          <p className="text-[10px] text-gray-500">units/day</p>
        </div>
        <div className="bg-[#222930] rounded-[6px] p-2.5">
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Peak Load</p>
          <p className="text-base font-bold">{totalLoadW.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500">watts</p>
        </div>
        <div className="bg-[#222930] rounded-[6px] p-2.5">
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Monthly Savings</p>
          <p className="text-base font-bold text-[#a3e635]">Rs {monthlySavings.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500">estimated</p>
        </div>
        <div className="bg-[#222930] rounded-[6px] p-2.5">
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">CO₂ Saved</p>
          <p className="text-base font-bold">{co2SavedTons}</p>
          <p className="text-[10px] text-gray-500">tons/year</p>
        </div>
      </div>

      {/* ── Yearly Savings ── */}
      <div className="bg-gradient-to-r from-[#a3e635]/10 to-[#22c55e]/10 border border-[#a3e635]/10 rounded-[6px] p-3 mb-3 flex items-center gap-3">
        <div className="w-9 h-9  rounded-[6px] flex items-center justify-center shrink-0">
          <Image src="/images/pkr.webp" alt="PKR" width={58} height={28} className="object-contain" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-medium">Estimated Yearly Savings</p>
          <p className="text-lg font-black text-[#a3e635]">Rs {yearlySavings.toLocaleString()}</p>
        </div>
      </div>

      {/* ── Status ── */}
      <div className="flex gap-2 items-start mb-3 px-0.5">
        <FaCheck className="text-[#a3e635] mt-0.5 shrink-0" size={11} />
        <p className="text-xs text-gray-400 leading-relaxed">
          A <strong className="text-gray-200">{phase === "single" ? "single" : "3"}-phase</strong> inverter comfortably handles this load.
        </p>
      </div>

      {/* ── CTA ── */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#a3e635] hover:bg-[#b0f244] text-[#1a1f22] font-bold py-3 rounded-[6px] transition-all duration-300 shadow-[0_0_24px_rgba(163,230,53,0.25)] hover:shadow-[0_0_32px_rgba(163,230,53,0.4)] hover:-translate-y-0.5 mb-1.5 text-sm flex items-center justify-center gap-2"
      >
        <FaWhatsapp size={16} />
        Get A Free Quote
      </a>
      <p className="text-[10px] text-center text-gray-600 leading-relaxed">
        An indicative estimate. Your engineered quote follows a free site survey.
      </p>
    </div>
  );

  return (
    <section className="py-10 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 tracking-tight">
            Solar Load <span className="text-green-600">Calculator</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Estimate your solar requirements by adding your home appliances below.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          {/* ════════════ Left Side: Appliances Form ════════════ */}
          <div className="bg-white rounded-[6px] shadow-sm border border-gray-200 p-4 md:p-8 w-full lg:w-[58%]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 md:mb-8 gap-3">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Your appliances</h3>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Pick a preset or enter custom watts & hours.</p>
              </div>
              {/* Phase Toggle */}
              <div className="flex items-center bg-gray-100 rounded-full p-0.5 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setPhase("single")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    phase === "single" ? "bg-green-900 text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Single-phase
                </button>
                <button
                  onClick={() => setPhase("three")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    phase === "three" ? "bg-green-900 text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  3-phase
                </button>
              </div>
            </div>

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
              <div className="col-span-4">Appliance</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-center">Watts</div>
              <div className="col-span-2 text-center">Hrs/Day</div>
              <div className="col-span-2 text-right">Units/Day</div>
            </div>

            {/* Appliances List */}
            <div className="space-y-3 md:space-y-3">
              {appliances.map((app) => {
                const unitsPerDay = ((app.qty * app.watts * app.hours) / 1000).toFixed(1);
                return (
                  <div
                    key={app.id}
                    className="group relative bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-[6px] md:rounded-none border md:border-none border-gray-100"
                  >
                    {/* ── Mobile: compact 2-col grid ── */}
                    <div className="md:hidden">
                      <div className="flex items-center justify-between mb-2">
                        <select
                          value={app.name}
                          onChange={(e) => handleApplianceChange(app.id, "name", e.target.value)}
                          className="flex-1 bg-white border border-gray-200 rounded-[6px] px-2 py-1.5 text-xs text-gray-800 outline-none appearance-none mr-2"
                        >
                          {PRESET_APPLIANCES.map((p) => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeAppliance(app.id)}
                          className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-1.5 rounded-[6px] transition-colors shrink-0"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Qty</label>
                          <input type="number" min="1" value={app.qty}
                            onChange={(e) => handleApplianceChange(app.id, "qty", e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-[6px] px-2 py-1 text-xs text-center text-gray-800 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Watts</label>
                          <input type="number" min="0" value={app.watts}
                            onChange={(e) => handleApplianceChange(app.id, "watts", e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-[6px] px-2 py-1 text-xs text-center text-gray-800 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Hrs/Day</label>
                          <input type="number" min="0" max="24" value={app.hours}
                            onChange={(e) => handleApplianceChange(app.id, "hours", e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-[6px] px-2 py-1 text-xs text-center text-gray-800 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-gray-400 mb-0.5 block">Units</label>
                          <div className="bg-green-50 border border-green-200 rounded-[6px] px-2 py-1 text-xs text-center text-green-800 font-bold">
                            {unitsPerDay}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Desktop: 12-col grid ── */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <select value={app.name}
                          onChange={(e) => handleApplianceChange(app.id, "name", e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-[6px] px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none"
                        >
                          {PRESET_APPLIANCES.map((p) => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="1" value={app.qty}
                          onChange={(e) => handleApplianceChange(app.id, "qty", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-3 py-2 text-sm text-center text-gray-800 focus:bg-white outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="0" value={app.watts}
                          onChange={(e) => handleApplianceChange(app.id, "watts", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-3 py-2 text-sm text-center text-gray-800 focus:bg-white outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input type="number" min="0" max="24" value={app.hours}
                          onChange={(e) => handleApplianceChange(app.id, "hours", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-3 py-2 text-sm text-center text-gray-800 focus:bg-white outline-none"
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-3">
                        <span className="font-bold text-gray-900 text-base">{unitsPerDay}</span>
                        <button onClick={() => removeAppliance(app.id)}
                          className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-[6px] transition-colors"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Appliance */}
            <div className="flex items-center justify-between mt-4 md:mt-6">
              <button onClick={addAppliance}
                className="flex items-center gap-2 text-xs md:text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 md:px-4 md:py-2 rounded-[6px] transition-colors"
              >
                <FaPlus size={10} /> Add Appliance
              </button>

              {/* Calculate Button (Shown if results are hidden) */}
              {!showResult && (
                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs md:text-sm px-4 md:px-6 py-2 rounded-[6px] transition-colors disabled:opacity-60"
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

          {/* ════════════ Desktop: Results Panel ════════════ */}
          {showResult && !isCalculating && (
            <div className="hidden lg:block w-[42%] animate-[heroFadeUp_0.5s_ease-out]" ref={resultRef}>
              <div className="lg:sticky lg:top-28">
                <ResultsPanel className="p-5 md:p-6" />
              </div>
            </div>
          )}
        </div>

        {/* ════════════ Mobile & Desktop: Loading State ════════════ */}
        {isCalculating && (
          <div className="mt-8 flex flex-col items-center justify-center py-12 w-full lg:w-[42%] mx-auto">
            <svg className="animate-spin h-10 w-10 text-green-500 mb-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p className="text-sm font-semibold text-gray-500">Calculating your solar needs...</p>
          </div>
        )}

        {/* ════════════ Mobile: Results Panel ════════════ */}
        {showResult && !isCalculating && (
          <div className="lg:hidden mt-6 animate-[heroFadeUp_0.5s_ease-out]">
            <ResultsPanel className="p-4" />
          </div>
        )}
      </div>
    </section>
  );
}
