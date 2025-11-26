import React, { useState, useEffect, useCallback } from 'react';
import { 
  ContainerType, 
  Dimensions, 
  CalculationResult, 
  CalculationSettings 
} from '../types';
import { CONTAINER_SPECS, DEFAULT_CARGO } from '../constants';
import { calculatePacking } from '../services/calculator';
import Container3D from './Container3D';
import Disclaimer from './Disclaimer';
import { ArrowPathIcon, CubeIcon } from '@heroicons/react/24/outline';

function ContainerTool() {
  // State: Inputs
  // Default to 40HQ as requested
  const [selectedContainer, setSelectedContainer] = useState<ContainerType>(ContainerType.HQ40);
  const [cargoDims, setCargoDims] = useState<Dimensions>({ 
    length: DEFAULT_CARGO.length, 
    width: DEFAULT_CARGO.width, 
    height: DEFAULT_CARGO.height 
  });
  const [cargoWeight, setCargoWeight] = useState<number>(DEFAULT_CARGO.weight);
  
  // State: Settings
  const [settings, setSettings] = useState<CalculationSettings>({
    spaceUtilization: 95,
    maxWeightLimit: 26 // Default approx for 40HQ/GP
  });

  // Derived state: Current container max weight in Tons
  const currentContainerMaxWeightTons = CONTAINER_SPECS[selectedContainer].maxWeight / 1000;

  // Effect: Update max weight limit default when container type changes
  // Resets the setting to the container's max capacity
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      maxWeightLimit: currentContainerMaxWeightTons
    }));
  }, [selectedContainer, currentContainerMaxWeightTons]);

  // State: Results
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Handlers
  const handleCalculate = useCallback(() => {
    // Validate inputs to prevent crashes with 0 values
    if (cargoDims.length <= 0 || cargoDims.width <= 0 || cargoDims.height <= 0 || cargoWeight <= 0) {
      setResult(null);
      return;
    }

    const container = CONTAINER_SPECS[selectedContainer];
    const cargo = { dimensions: cargoDims, weight: cargoWeight, name: 'Box' };
    const res = calculatePacking(container, cargo, settings);
    setResult(res);
  }, [selectedContainer, cargoDims, cargoWeight, settings]);

  // Auto-calculate on mount/change
  // We add settings to dependency to recalc when user drags slider/changes input
  useEffect(() => {
    // Debounce slightly if needed, but for now direct call is fine
    handleCalculate();
  }, [handleCalculate]); 

  // Helper to strictly clamp weight limit
  const updateWeightLimit = (val: number) => {
    let newVal = val;
    if (newVal > currentContainerMaxWeightTons) newVal = currentContainerMaxWeightTons;
    if (newVal < 0) newVal = 0;
    setSettings(p => ({ ...p, maxWeightLimit: newVal }));
  };

  const inputClass = "w-full p-2 border border-slate-300 bg-slate-50 text-slate-900 font-bold rounded focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-400";

  return (
    <div className="flex flex-col h-full overflow-hidden text-slate-800 font-sans border border-slate-700/50 rounded-xl shadow-2xl bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md z-10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <CubeIcon className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold tracking-tight">集装箱装载优化工具 (V002)</h1>
        </div>
        <div className="text-xs text-slate-400 hidden sm:block">
          3D 可视化计算
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* Left Panel: Inputs & Stats */}
        <div className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 z-10 shadow-xl md:shadow-none">
          <div className="p-6 space-y-6">
            
            {/* Section: Cargo */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">货物详情</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium">长 (cm)</label>
                  <input 
                    type="number" 
                    value={cargoDims.length}
                    onChange={(e) => setCargoDims(p => ({ ...p, length: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">宽 (cm)</label>
                  <input 
                    type="number" 
                    value={cargoDims.width}
                    onChange={(e) => setCargoDims(p => ({ ...p, width: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">高 (cm)</label>
                  <input 
                    type="number" 
                    value={cargoDims.height}
                    onChange={(e) => setCargoDims(p => ({ ...p, height: Number(e.target.value) }))}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">单件重量 (kg)</label>
                  <input 
                    type="number" 
                    value={cargoWeight}
                    onChange={(e) => setCargoWeight(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section: Container */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">选择柜型</h2>
              <select 
                value={selectedContainer}
                onChange={(e) => setSelectedContainer(e.target.value as ContainerType)}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
              >
                {Object.values(CONTAINER_SPECS).map(spec => (
                  <option key={spec.type} value={spec.type}>{spec.name}</option>
                ))}
              </select>
              <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">
                 标准限重: {(CONTAINER_SPECS[selectedContainer].maxWeight / 1000).toFixed(1)} T<br/>
                 内容积: {CONTAINER_SPECS[selectedContainer].volume} m³
              </div>
            </div>

            {/* Section: Settings */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">装载设置</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label>空间利用率</label>
                    <span className="font-bold">{settings.spaceUtilization}%</span>
                  </div>
                  <input 
                    type="range" min="50" max="100" 
                    value={settings.spaceUtilization}
                    onChange={(e) => setSettings(p => ({ ...p, spaceUtilization: Number(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label>载重限制 (T)</label>
                    <span className="font-bold">{settings.maxWeightLimit.toFixed(1)} T</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" min="1" 
                      max={currentContainerMaxWeightTons} 
                      step="0.1"
                      value={settings.maxWeightLimit}
                      onChange={(e) => updateWeightLimit(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <input
                      type="number"
                      value={settings.maxWeightLimit}
                      onChange={(e) => updateWeightLimit(Number(e.target.value))}
                      className="w-16 p-1 text-xs border border-slate-300 rounded text-center font-bold bg-slate-50"
                      step="0.1"
                      max={currentContainerMaxWeightTons}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    当前柜型上限: {currentContainerMaxWeightTons} T
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition flex justify-center items-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              重新计算
            </button>

            <Disclaimer />

          </div>
        </div>

        {/* Right Panel: Visualization & Results */}
        <div className="flex-1 bg-slate-100 relative flex flex-col">
          
          {/* 3D Canvas Layer */}
          <div className="flex-1 relative z-0">
            {result && <Container3D container={result.containerSpec} items={result.packedItems} />}
            
            {/* Floating Instructions */}
            {result && (
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur p-2 rounded text-xs text-slate-600 pointer-events-none select-none">
                左键：旋转 | 右键：平移 | 滚轮：缩放
              </div>
            )}
          </div>

          {/* Results Overlay / Bottom Panel */}
          <div className="bg-white border-t border-slate-200 p-6 z-10 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            {result ? (
              <div className="max-w-6xl mx-auto">
                 {/* Stats Grid - Full Width */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-slate-500 text-xs uppercase mb-1">总装载件数</div>
                      <div className="text-3xl font-bold text-slate-800">{result.totalCount}</div>
                      <div className="text-xs text-slate-400">件 (Boxes)</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs uppercase mb-1">货物总重</div>
                      <div className={`text-3xl font-bold ${result.totalWeight > CONTAINER_SPECS[selectedContainer].maxWeight ? 'text-red-600' : 'text-slate-800'}`}>
                        {(result.totalWeight / 1000).toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400">吨 ({result.weightUtilizationPercent.toFixed(1)}%)</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs uppercase mb-1">货物总体积</div>
                      <div className="text-3xl font-bold text-slate-800">{result.totalVolume.toFixed(2)}</div>
                      <div className="text-xs text-slate-400">m³ ({result.volumeUtilizationPercent.toFixed(1)}%)</div>
                    </div>
                    <div>
                       <div className="text-slate-500 text-xs uppercase mb-1">限制因素</div>
                       <div className="text-sm font-medium mt-1">
                         受限于: <span className="text-orange-600">{result.fitByWeight ? '重量' : '空间'}</span>
                       </div>
                    </div>
                  </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                请输入货物尺寸和重量以开始计算
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContainerTool;