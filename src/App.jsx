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
    <div className="min-h-screen bg-neutral-950 text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      
      {/* HEADER PRINCIPAL */}
      <header className="border-b border-zinc-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent from-zinc-100 to-zinc-400">
                UGD Campus Contable
              </h1>
              <p className="text-xs text-zinc-400 font-medium tracking-wide">Licenciatura en Administración • Panel de Alta Performance</p>
            </div>
          </div>
          
          {/* NAVEGACIÓN GLOBAL */}
          <nav className="flex flex-wrap bg-neutral-950 p-1.5 rounded-xl border border-zinc-800 w-full md:w-auto justify-center gap-1">
            <button onClick={() => setActiveTab('unidades')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'unidades' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-zinc-200'}`}><BookOpen className="w-4 h-4" /> Módulos Teóricos</button>
            <button onClick={() => setActiveTab('simulador')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'simulador' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-zinc-200'}`}><RefreshCw className="w-4 h-4" /> Variaciones</button>
            <button onClick={() => setActiveTab('cuentas')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'cuentas' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-zinc-200'}`}><Search className="w-4 h-4" /> Manual Cuentas</button>
            <button onClick={() => setActiveTab('cuestionario')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'cuestionario' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-zinc-200'}`}><ClipboardCheck className="w-4 h-4" /> Cuestionarios</button>
            <button onClick={() => setActiveTab('profesor')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'profesor' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-zinc-200'}`}><MessagesSquare className="w-4 h-4" /> Profesor IA</button>
          </nav>
        </div>
      </header>

      {/* CONTENEDOR DINÁMICO */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        
        {activeTab === 'unidades' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {/* Sidebar de Selección de Unidad */}
            <div className="space-y-2 bg-neutral-900/40 p-3 rounded-2xl border border-zinc-800 md:col-span-1">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-2 block mb-2">Programa Analítico</span>
              {[1, 2, 3, 4, 5].map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedUnidadGlobal(u)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedUnidadGlobal === u 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold' 
                      : 'text-zinc-400 hover:bg-neutral-900 hover:text-zinc-200'
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
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="bg-neutral-900 border border-zinc-800 rounded-2xl p-8 space-y-5">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-bold block">Simulador de Variaciones Patrimoniales</span>
              <p className="text-lg font-medium text-zinc-100 leading-relaxed">Ejercicio: "{ejerciciosVariaciones[currentIdx].enunciado}"</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {['Permutativa', 'Modificativa'].map((option) => (
                  <button key={option} disabled={!!selectedAnswer} onClick={() => handleAnswerSelection(option)} className={`p-4 border rounded-xl text-sm font-semibold transition-all ${selectedAnswer ? option === ejerciciosVariaciones[currentIdx].tipoCorrecto ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold' : 'border-zinc-800 opacity-40 text-zinc-600' : 'border-zinc-800 bg-neutral-950/60 text-zinc-300 hover:border-zinc-600 hover:bg-neutral-900'}`}>{option}</button>
                ))}
              </div>
              {showExplanation && (
                <div className="p-5 bg-neutral-950 border border-zinc-800 rounded-xl space-y-3">
                  <p className="text-sm text-indigo-400 font-mono font-bold tracking-wide">{ejerciciosVariaciones[currentIdx].efecto}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{ejerciciosVariaciones[currentIdx].explicacion}</p>
                  <button onClick={handleNextEjercicio} className="w-full bg-zinc-100 text-neutral-950 font-bold py-2.5 rounded-lg text-sm hover:bg-white transition-colors mt-3">Siguiente Ejercicio</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cuentas' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3 space-y-4">
                <input type="text" placeholder="Buscar por cuenta o rubro..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-neutral-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                <div className="bg-neutral-900/20 border border-zinc-800 rounded-2xl max-h-[420px] overflow-y-auto p-2 space-y-1">
                  {filteredCuentas.map((cuenta, idx) => (
                    <button key={idx} onClick={() => setSelectedCuentaDetalle(cuenta)} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex justify-between items-center ${selectedCuentaDetalle?.nombre === cuenta.nombre ? 'bg-indigo-500/10 text-indigo-400 font-semibold' : 'text-zinc-400 hover:bg-neutral-900/60'}`}>
                      {cuenta.nombre}
                      <span className="text-xs opacity-60 font-mono">{cuenta.naturaleza}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-2/3">
                {selectedCuentaDetalle ? (
                  <div className="bg-neutral-900 border border-zinc-800 rounded-2xl p-6 space-y-5 text-sm leading-relaxed">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-3.5">
                      <h3 className="text-base font-bold text-zinc-100">{selectedCuentaDetalle.nombre}</h3>
                      <div className="flex gap-2">
                        <span className="text-xs px-3 py-1 rounded-full bg-neutral-950 text-zinc-400 border border-zinc-800">Saldo {selectedCuentaDetalle.saldo}</span>
                        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{selectedCuentaDetalle.rubro}</span>
                      </div>
                    </div>
                    <p><strong className="text-zinc-400 block mb-1 font-medium">¿Qué representa?</strong> {selectedCuentaDetalle.representa}</p>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-neutral-950 p-4 rounded-xl border border-zinc-800"><strong className="text-indigo-400 block mb-1.5 font-semibold">Se DEBITA:</strong> {selectedCuentaDetalle.debita}</div>
                      <div className="bg-neutral-950 p-4 rounded-xl border border-zinc-800"><strong className="text-zinc-400 block mb-1.5 font-semibold">Se ACREDITA:</strong> {selectedCuentaDetalle.acredita}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-16 bg-neutral-900/10 border border-dashed border-zinc-800 rounded-2xl text-sm text-zinc-500">
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

      <footer className="border-t border-zinc-900 mt-16 py-6 text-center text-xs text-zinc-600 font-medium tracking-wide">
        Hub Universitario de Ciencias Económicas • Licenciatura en Administración UGD 2026
      </footer>
    </div>
  );
}