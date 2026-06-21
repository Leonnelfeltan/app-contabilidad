import React, { useState } from 'react';
import { 
  BookOpen, 
  RefreshCw, 
  Search, 
  Layers, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Bookmark,
  GraduationCap,
  ClipboardCheck,
  MessagesSquare
} from 'lucide-react';

// Importación de Componentes Nuevos
import Cuestionario from './components/Cuestionario';
import ProfesorIA from './components/ProfesorIA';

// --- DATA ORIGINAL INTEGRADA ---
const unidadesData = [
  {
    id: 1,
    titulo: "Unidad I: Las Organizaciones y la Contabilidad",
    descripcion: "Concepto de organización, recursos, fuentes de financiación y el marco legal de la información contable.",
    flashcards: [
      { q: "¿Qué es una organización?", a: "Un conjunto de personas que utilizan recursos para realizar actividades coordinadas y lograr objetivos específicos." },
      { q: "¿Cómo se clasifican las fuentes de financiación?", a: "En Fuentes Propias (Aportes de los propietarios, autofinanciación) y Fuentes Ajenas (Crédito otorgado por terceros, pasivos)." },
      { q: "¿Cuál es el fin principal de la Contabilidad?", a: "Funcionar como un sistema de información clave para la toma de decisiones económicas/financieras y el control de gestión." }
    ]
  },
  {
    id: 2,
    titulo: "Unidad II: El Proceso Contable - Igualdad Contable",
    descripcion: "Estructura patrimonial, variaciones, el criterio de lo devengado y reconocimiento de elementos.",
    flashcards: [
      { q: "¿Qué condiciones debe reunir un recurso para ser reconocido como Activo?", a: "Debe tener un valor de cambio o de uso, el ente debe controlar los beneficios que genera y su origen debe ser un hecho ya ocurrido." },
      { q: "¿Qué condiciones debe reunir una obligación para ser reconocida como Pasivo?", a: "Debe implicar una obligación cierta o contingente hacia otro ente, requerir el sacrificio de activos a una fecha determinada y originarse en un hecho ya ocurrido." },
      { q: "¿Qué diferencia hay entre una variación cualitativa (permutativa) y una cuantitativa (modificativa)?", a: "Las cualitativas solo alteran la composición del patrimonio sin modificar el monto del Patrimonio Neto; las cuantitativas alteran la cuantía del PN debido a resultados." }
    ]
  },
  {
    id: 3,
    titulo: "Unidad III: El Proceso Contable - Fuentes",
    descripcion: "Documentación respaldatoria, circuitos administrativos y regímenes vigentes de emisión.",
    flashcards: [
      { q: "¿Cuál es la finalidad de la documentación respaldatoria?", a: "Sirve de constancia jurídica de las operaciones celebradas, es la fuente de datos para las registraciones contables y permite el control interno." }
    ]
  },
  {
    id: 4,
    titulo: "Unidad IV: Elementos e Instrumentos",
    descripcion: "Cuentas, planes y manuales de cuentas, partida doble y balance de comprobación.",
    flashcards: [
      { q: "¿Qué es un Plan de Cuentas?", a: "Un listado ordenado y sistemático de todas las cuentas que un ente utiliza o prevé utilizar para el registro de sus operaciones." },
      { q: "¿En qué se fundamenta el método de la Partida Doble?", a: "En que todo hecho contable afecta al menos a dos cuentas, manteniendo la igualdad: Total del Débito = Total del Crédito (No hay deudor sin acreedor)." }
    ]
  },
  {
    id: 5,
    titulo: "Unidad V: Reconocimiento y Medición Inicial",
    descripcion: "Componentes del Activo, Pasivo y Patrimonio Neto según rubros específicos de la normativa.",
    flashcards: [
      { q: "¿Qué partidas integran el rubro Caja y Bancos?", a: "El dinero en efectivo en moneda nacional y extranjera, cheques corrientes y saldos en cuentas bancarias a la vista." }
    ]
  }
];

const ejerciciosVariaciones = [
  {
    id: 1,
    enunciado: "Se compra mercadería firmando un Pagaré a 30 días sin intereses.",
    tipoCorrecto: "Permutativa",
    efecto: "+Activo (Bienes de Cambio) y +Pasivo (Obligaciones a Pagar)",
    explicacion: "Es permutativa interpatrimonial. Aumenta un activo y aumenta un pasivo por el mismo valor, por lo que el monto total del Patrimonio Neto no varía."
  },
  {
    id: 2,
    enunciado: "Se abonan los sueldos del mes del personal administrativo en efectivo.",
    tipoCorrecto: "Modificativa",
    efecto: "-Activo (Caja) y -Patrimonio Neto (Gasto de Sueldos)",
    explicacion: "Es modificativa disminutiva. El sueldo del personal constituye un gasto consumido del período, reduciendo la cuantía del Patrimonio Neto."
  }
];

const diccionarioCuentas = [
  { nombre: "Caja", naturaleza: "Activo", rubro: "Caja y Bancos", saldo: "Deudor", representa: "El dinero en efectivo, billetes y monedas de curso legal bajo custodia del ente." },
  { nombre: "Proveedores", naturaleza: "Pasivo", rubro: "Deudas Ciertas (Comerciales)", saldo: "Acreedor", representa: "Las obligaciones que posee el ente con terceros por compras de mercaderías en cuenta corriente." },
  { nombre: "Capital Social", naturaleza: "Patrimonio Neto", rubro: "Capital", saldo: "Acreedor", representa: "El aporte nominal comprometido por los socios o propietarios al constituirse la sociedad." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('teoria');

  // Estados de Pestaña Teoría
  const [selectedUnidad, setSelectedUnidad] = useState(1);
  const [flippedCards, setFlippedCards] = useState({});

  // Estados de Pestaña Simulador
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Estados de Pestaña Diccionario
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCard = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAnswerSelection = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);
    const esCorrecto = answer === ejerciciosVariaciones[currentIdx].tipoCorrecto;
    setScore(prev => ({ correct: esCorrecto ? prev.correct + 1 : prev.correct, total: prev.total + 1 }));
  };

  const handleNextEjercicio = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentIdx((prevIdx) => (prevIdx + 1) % ejerciciosVariaciones.length);
  };

  const filteredCuentas = diccionarioCuentas.filter(cuenta =>
    cuenta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cuenta.rubro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent from-emerald-400 to-teal-200">
                UGD Campus Contable
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Contador Público Nacional • Grilla Interactiva</p>
            </div>
          </div>
          
          {/* MENU GLOBAL DE 5 SECCIONES */}
          <nav className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-800 w-full md:w-auto justify-center gap-1">
            <button onClick={() => setActiveTab('teoria')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'teoria' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><BookOpen className="w-3.5 h-3.5" /> Flashcards</button>
            <button onClick={() => setActiveTab('simulador')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'simulador' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><RefreshCw className="w-3.5 h-3.5" /> Variaciones</button>
            <button onClick={() => setActiveTab('cuentas')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'cuentas' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><Search className="w-3.5 h-3.5" /> Manual Cuentas</button>
            <button onClick={() => setActiveTab('cuestionario')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'cuestionario' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><ClipboardCheck className="w-3.5 h-3.5" /> Cuestionarios</button>
            <button onClick={() => setActiveTab('profesor')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'profesor' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}><MessagesSquare className="w-3.5 h-3.5" /> Profesor IA</button>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL SEGUN FILTRO */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'teoria' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            <div className="space-y-2 bg-slate-900/40 p-3 rounded-2xl border border-slate-800 md:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 block mb-2">Unidades</span>
              {unidadesData.map((u) => (
                <button key={u.id} onClick={() => { setSelectedUnidad(u.id); setFlippedCards({}); }} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${selectedUnidad === u.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-900'}`}>Unidad {u.id}</button>
              ))}
            </div>
            <div className="md:col-span-3 space-y-6">
              {unidadesData.filter(u => u.id === selectedUnidad).map((unidad) => (
                <div key={unidad.id} className="space-y-4">
                  <h3 className="text-base font-bold text-slate-200">{unidad.titulo}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {unidad.flashcards.map((fc, index) => (
                      <div key={index} onClick={() => toggleCard(index)} className="h-40 cursor-pointer [perspective:1000px]">
                        <div className={`relative w-full h-full rounded-2xl border transition-all duration-500 [transform-style:preserve-3d] ${flippedCards[index] ? '[transform:rotateY(180deg)] bg-slate-900 border-emerald-500/40' : 'bg-slate-900/60 border-slate-800'}`}>
                          <div className="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
                            <span className="bg-slate-800 text-slate-400 font-mono text-[9px] px-2 py-0.5 rounded-full border border-slate-700 w-max">Pregunta</span>
                            <p className="text-xs font-semibold text-slate-200 leading-snug">{fc.q}</p>
                            <span className="text-[9px] text-emerald-400 flex items-center gap-1">Ver respuesta →</span>
                          </div>
                          <div className="absolute inset-0 p-4 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] bg-slate-900 rounded-2xl">
                            <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/20 w-max">Definición</span>
                            <p className="text-xs text-slate-300 leading-relaxed overflow-y-auto">{fc.a}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'simulador' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden">
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-bold block">Hecho Económico</span>
              <p className="text-sm font-semibold text-slate-100 leading-relaxed">"{ejerciciosVariaciones[currentIdx].enunciado}"</p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {['Permutativa', 'Modificativa'].map((option) => (
                  <button key={option} disabled={!!selectedAnswer} onClick={() => handleAnswerSelection(option)} className={`p-3 border rounded-xl text-xs font-bold transition-all ${selectedAnswer ? option === ejerciciosVariaciones[currentIdx].tipoCorrecto ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 opacity-40 text-slate-500' : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'}`}>{option}</button>
                ))}
              </div>
              {showExplanation && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <p className="text-xs text-slate-300 font-mono font-medium">{ejerciciosVariaciones[currentIdx].efecto}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{ejerciciosVariaciones[currentIdx].explicacion}</p>
                  <button onClick={handleNextEjercicio} className="w-full bg-slate-100 text-slate-950 font-bold py-1.5 rounded-lg text-xs hover:bg-white transition-colors">Siguiente</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cuentas' && (
          <div className="space-y-4">
            <input type="text" placeholder="Buscar cuenta por nombre..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full max-w-md mx-auto block bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCuentas.map((cuenta, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-start"><h3 className="text-xs font-bold text-slate-100">{cuenta.nombre}</h3><span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{cuenta.naturaleza}</span></div>
                  <p className="text-xs text-slate-400 leading-relaxed">{cuenta.representa}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPONENTES NUEVOS INTEGRADOS */}
        {activeTab === 'cuestionario' && <Cuestionario />}
        {activeTab === 'profesor' && <ProfesorIA />}
      </main>

      <footer className="border-t border-slate-900 mt-12 py-6 text-center text-[9px] text-slate-600 font-medium">
        Estructura de Simulación de Cuestionario e IA Integrada • UGD 2026
      </footer>
    </div>
  );
}