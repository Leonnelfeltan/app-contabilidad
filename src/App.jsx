import React, { useState } from 'react';
import { 
  BookOpen, 
  RefreshCw, 
  Search, 
  GraduationCap, 
  ClipboardCheck, 
  MessagesSquare,
  Bookmark
} from 'lucide-react';

// Importación de Componentes por Módulos
import Unidad1 from './components/Unidad1';
import Unidad2 from './components/Unidad2';
import Unidad3 from './components/Unidad3';
import Unidad4 from './components/Unidad4';
import Unidad5 from './components/Unidad5';
import Cuestionario from './components/Cuestionario';
import ProfesorIA from './components/ProfesorIA';

// Importación de la Base de Datos del Manual de Cuentas
import { diccionarioCuentas } from './components/dataCuentas';

const ejerciciosVariaciones = [
  { id: 1, enunciado: "Se compra mercadería firmando un Pagaré a 30 días sin intereses.", tipoCorrecto: "Permutativa", efecto: "+Activo (Bienes de Cambio) y +Pasivo (Obligaciones a Pagar)", explicacion: "Es permutativa interpatrimonial. Aumenta un activo y aumenta un pasivo por el mismo valor, por lo que el monto total del Patrimonio Neto no varía." },
  { id: 2, enunciado: "Se abonan los sueldos del mes del personal administrativo en efectivo.", tipoCorrecto: "Modificativa", efecto: "-Activo (Caja) y -Patrimonio Neto (Gasto de Sueldos)", explicacion: "Es modificativa disminutiva. El sueldo del personal constituye un gasto consumido del período, reduciendo la cuantía del Patrimonio Neto." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('unidades');
  const [selectedUnidadGlobal, setSelectedUnidadGlobal] = useState(1);

  // Estados de Pestaña Simulador
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Estados de Pestaña Manual de Cuentas
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuentaDetalle, setSelectedCuentaDetalle] = useState(null);

  const handleAnswerSelection = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const handleNextEjercicio = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentIdx((prevIdx) => (prevIdx + 1) % ejerciciosVariaciones.length);
  };

  const filteredCuentas = diccionarioCuentas ? diccionarioCuentas.filter(cuenta =>
    cuenta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cuenta.rubro.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* HEADER PRINCIPAL */}
      <header className="border-b border-slate-850 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r bg-clip-text text-transparent from-emerald-400 to-teal-200">
                UGD Campus Contable
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Licenciatura en Administración • Panel de Alta Performance</p>
            </div>
          </div>
          
          {/* NAVEGACIÓN GLOBAL */}
          <nav className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-850 w-full md:w-auto justify-center gap-0.5">
            <button onClick={() => setActiveTab('unidades')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'unidades' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><BookOpen className="w-3.5 h-3.5" /> Módulos Teóricos</button>
            <button onClick={() => setActiveTab('simulador')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'simulador' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><RefreshCw className="w-3.5 h-3.5" /> Variaciones</button>
            <button onClick={() => setActiveTab('cuentas')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'cuentas' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><Search className="w-3.5 h-3.5" /> Manual Cuentas</button>
            <button onClick={() => setActiveTab('cuestionario')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'cuestionario' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><ClipboardCheck className="w-3.5 h-3.5" /> Cuestionarios</button>
            <button onClick={() => setActiveTab('profesor')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'profesor' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><MessagesSquare className="w-3.5 h-3.5" /> Profesor IA</button>
          </nav>
        </div>
      </header>

      {/* CONTENEDOR DINÁMICO */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        
        {activeTab === 'unidades' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            {/* Sidebar de Selección de Unidad */}
            <div className="space-y-1.5 bg-slate-900/30 p-2.5 rounded-2xl border border-slate-850 md:col-span-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-2 block mb-1">Programa Analítico</span>
              {[1, 2, 3, 4, 5].map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedUnidadGlobal(u)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedUnidadGlobal === u 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold' 
                      : 'text-slate-400 hover:bg-slate-900/60'
                  }`}
                >
                  Unidad {u} {u === 1 ? '• El SIC' : u === 2 ? '• El Patrimonio' : u === 3 ? '• Documentación' : u === 4 ? '• Las Cuentas' : '• Rubros'}
                </button>
              ))}
            </div>

            {/* Renderizado de Unidad */}
            <div className="md:col-span-3">
              {selectedUnidadGlobal === 1 && <Unidad1 />}
              {selectedUnidadGlobal === 2 && <Unidad2 />}
              {selectedUnidadGlobal === 3 && <Unidad3 />}
              {selectedUnidadGlobal === 4 && <Unidad4 />}
              {selectedUnidadGlobal === 5 && <Unidad5 />}
            </div>
          </div>
        )}

        {activeTab === 'simulador' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-bold block">Simulador de Variaciones Patrimoniales</span>
              {/* ✅ CORREGIDO AQUÍ: Interpolación limpia del enunciado */}
              <p className="text-sm font-semibold text-slate-100 leading-relaxed">Ejercicio: "{ejerciciosVariaciones[currentIdx].enunciado}"</p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {['Permutativa', 'Modificativa'].map((option) => (
                  <button key={option} disabled={!!selectedAnswer} onClick={() => handleAnswerSelection(option)} className={`p-3 border rounded-xl text-xs font-bold transition-all ${selectedAnswer ? option === ejerciciosVariaciones[currentIdx].tipoCorrecto ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-850 opacity-40 text-slate-500' : 'border-slate-850 bg-slate-950/40 text-slate-300 hover:border-slate-700'}`}>{option}</button>
                ))}
              </div>
              {showExplanation && (
                <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                  <p className="text-xs text-emerald-400 font-mono font-bold">{ejerciciosVariaciones[currentIdx].efecto}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{ejerciciosVariaciones[currentIdx].explicacion}</p>
                  <button onClick={handleNextEjercicio} className="w-full bg-slate-100 text-slate-950 font-bold py-1.5 rounded-lg text-xs hover:bg-white transition-colors mt-2">Siguiente Ejercicio</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cuentas' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/3 space-y-3">
                <input type="text" placeholder="Buscar por cuenta o rubro..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
                <div className="bg-slate-900/40 border border-slate-850 rounded-2xl max-h-[380px] overflow-y-auto p-2 space-y-1">
                  {filteredCuentas.map((cuenta, idx) => (
                    <button key={idx} onClick={() => setSelectedCuentaDetalle(cuenta)} className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex justify-between items-center ${selectedCuentaDetalle?.nombre === cuenta.nombre ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-400 hover:bg-slate-950/40'}`}>
                      {cuenta.nombre}
                      <span className="text-[9px] opacity-60 font-mono">{cuenta.naturaleza}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-2/3">
                {selectedCuentaDetalle ? (
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4 text-xs leading-relaxed">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
                      <h3 className="text-sm font-bold text-slate-200">{selectedCuentaDetalle.nombre}</h3>
                      <div className="flex gap-2">
                        <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">Saldo {selectedCuentaDetalle.saldo}</span>
                        <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{selectedCuentaDetalle.rubro}</span>
                      </div>
                    </div>
                    <p><strong className="text-slate-400 block mb-0.5">¿Qué representa?</strong> {selectedCuentaDetalle.representa}</p>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850"><strong className="text-emerald-400 block mb-1">Se DEBITA:</strong> {selectedCuentaDetalle.debita}</div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850"><strong className="text-rose-400 block mb-1">Se ACREDITA:</strong> {selectedCuentaDetalle.acredita}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12 bg-slate-900/20 border border-dashed border-slate-850 rounded-2xl text-xs text-slate-500">
                    Seleccioná una cuenta de la lista de la izquierda para desplegar su ficha analítica del Manual de Cuentas.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cuestionario' && <Cuestionario />}
        {activeTab === 'profesor' && <ProfesorIA />}
      </main>

      <footer className="border-t border-slate-900 mt-12 py-5 text-center text-[9px] text-slate-600 font-medium">
        Hub Universitario de Ciencias Económicas • Licenciatura en Administración UGD 2026
      </footer>
    </div>
  );
}