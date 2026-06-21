import React, { useState } from 'react';
import { 
  BookOpen, 
  RefreshCw, 
  Search, 
  GraduationCap, 
  ClipboardCheck, 
  MessagesSquare
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
    <div className="min-h-screen bg-[#090d16] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      
      {/* HEADER PRINCIPAL */}
      <header className="border-b border-slate-800/70 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Identidad Institucional */}
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-500/20 shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-100">
                UGD Campus Contable
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">Licenciatura en Administración • Centro de Alta Performance</p>
            </div>
          </div>
          
          {/* NAVEGACIÓN GLOBAL - DISEÑO ESTILO SAAS */}
          <nav className="flex flex-wrap bg-slate-900/90 p-1 rounded-xl border border-slate-800/80 shadow-2xl justify-center gap-1">
            <button onClick={() => setActiveTab('unidades')} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'unidades' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}><BookOpen className="w-4 h-4" /> Módulos Teóricos</button>
            <button onClick={() => setActiveTab('simulador')} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'simulador' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}><RefreshCw className="w-4 h-4" /> Variaciones</button>
            <button onClick={() => setActiveTab('cuentas')} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'cuentas' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}><Search className="w-4 h-4" /> Manual Cuentas</button>
            <button onClick={() => setActiveTab('cuestionario')} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'cuestionario' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}><ClipboardCheck className="w-4 h-4" /> Cuestionarios</button>
            <button onClick={() => setActiveTab('profesor')} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'profesor' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}><MessagesSquare className="w-4 h-4" /> Profesor IA</button>
          </nav>
        </div>
      </header>

      {/* CONTENEDOR DINÁMICO */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {activeTab === 'unidades' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Sidebar de Selección de Unidad - Letras más claras y grandes */}
            <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/60 lg:col-span-1 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 px-3.5 block mb-2.5">Programa Analítico</span>
              {[1, 2, 3, 4, 5].map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedUnidadGlobal(u)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    selectedUnidadGlobal === u 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-bold' 
                      : 'text-slate-400 border border-transparent hover:bg-slate-900/80 hover:text-slate-200'
                  }`}
                >
                  Unidad {u} {u === 1 ? '• El SIC' : u === 2 ? '• El Patrimonio' : u === 3 ? '• Documentación' : u === 4 ? '• Las Cuentas' : '• Rubros'}
                </button>
              ))}
            </div>

            {/* Renderizado de Unidad - Fuente Ampliada para lectura fluida */}
            <div className="lg:col-span-3 text-base leading-relaxed text-slate-300">
              {selectedUnidadGlobal === 1 && <Unidad1 />}
              {selectedUnidadGlobal === 2 && <Unidad2 />}
              {selectedUnidadGlobal === 3 && <Unidad3 />}
              {selectedUnidadGlobal === 4 && <Unidad4 />}
              {selectedUnidadGlobal === 5 && <Unidad5 />}
            </div>
          </div>
        )}

        {activeTab === 'simulador' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 space-y-6 shadow-xl">
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold block">Simulador de Variaciones Patrimoniales</span>
              <p className="text-xl font-medium text-slate-100 leading-relaxed">"{ejerciciosVariaciones[currentIdx].enunciado}"</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {['Permutativa', 'Modificativa'].map((option) => (
                  <button key={option} disabled={!!selectedAnswer} onClick={() => handleAnswerSelection(option)} className={`p-4 border rounded-xl text-base font-semibold transition-all duration-150 ${selectedAnswer ? option === ejerciciosVariaciones[currentIdx].tipoCorrecto ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold shadow-md shadow-indigo-550/10' : 'border-slate-800 opacity-40 text-slate-600' : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-600 hover:bg-slate-900'}`}>{option}</button>
                ))}
              </div>
              {showExplanation && (
                <div className="p-6 bg-slate-950 border border-slate-800/90 rounded-xl space-y-3.5">
                  <p className="text-sm text-indigo-400 font-mono font-bold tracking-wide uppercase">{ejerciciosVariaciones[currentIdx].efecto}</p>
                  <p className="text-base text-slate-300 leading-relaxed">{ejerciciosVariaciones[currentIdx].explicacion}</p>
                  <button onClick={handleNextEjercicio} className="w-full bg-slate-100 text-slate-950 font-bold py-3 rounded-xl text-sm hover:bg-white transition-colors mt-3 shadow-md">Siguiente Ejercicio</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cuentas' && (
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="w-full lg:w-1/3 space-y-4">
                <input type="text" placeholder="Buscar por cuenta o rubro..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                <div className="bg-slate-900/30 border border-slate-800/70 rounded-2xl max-h-[460px] overflow-y-auto p-2 space-y-1 shadow-inner">
                  {filteredCuentas.map((cuenta, idx) => (
                    <button key={idx} onClick={() => setSelectedCuentaDetalle(cuenta)} className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all duration-150 flex justify-between items-center ${selectedCuentaDetalle?.nombre === cuenta.nombre ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold' : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'}`}>
                      {cuenta.nombre}
                      <span className="text-xs opacity-75 font-mono bg-slate-950/40 px-2 py-0.5 rounded-md">{cuenta.naturaleza}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-2/3">
                {selectedCuentaDetalle ? (
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-7 space-y-6 text-base leading-relaxed shadow-lg">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                      <h3 className="text-lg font-bold text-slate-100 tracking-tight">{selectedCuentaDetalle.nombre}</h3>
                      <div className="flex gap-2">
                        <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">Saldo {selectedCuentaDetalle.saldo}</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">{selectedCuentaDetalle.rubro}</span>
                      </div>
                    </div>
                    <p><strong className="text-slate-400 block mb-1 font-semibold text-sm uppercase tracking-wide">¿Qué representa?</strong> {selectedCuentaDetalle.representa}</p>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80"><strong className="text-indigo-400 block mb-2 font-bold text-xs uppercase tracking-wider">Se DEBITA:</strong> {selectedCuentaDetalle.debita}</div>
                      <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80"><strong className="text-slate-400 block mb-2 font-bold text-xs uppercase tracking-wider">Se ACREDITA:</strong> {selectedCuentaDetalle.acredita}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl text-base text-slate-500">
                    Seleccioná una cuenta contable para desplegar su ficha analítica.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cuestionario' && <Cuestionario />}
        {activeTab === 'profesor' && <ProfesorIA />}
      </main>

      <footer className="border-t border-slate-900 mt-20 py-8 text-center text-xs text-slate-600 font-medium tracking-wide">
        Hub Universitario de Ciencias Económicas • Licenciatura en Administración UGD 2026
      </footer>
    </div>
  );
}