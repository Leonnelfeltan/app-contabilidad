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
  GraduationCap
} from 'lucide-react';

// --- DATA: UNIDADES DEL PROGRAMA UGD 2026 ---
const unidadesData = [
  {
    id: 1,
    titulo: "Unidad I: Las Organizaciones y la Contabilidad",
    descripcion: "Concepto de organización, recursos, fuentes de financiación y el marco legal de la información contable.",
    flashcards: [
      { q: "¿Qué es una organización?", a: "Un conjunto de personas que utilizan recursos para realizar actividades coordinadas y lograr objetivos específicos." },
      { q: "¿Cómo se clasifican las fuentes de financiación?", a: "En Fuentes Propias (Aportes de los propietarios, autofinanciación) y Fuentes Ajenas (Crédito otorgado por terceros, pasivos)." },
      { q: "¿Cuál es el fin principal de la Contabilidad?", a: "Funcionar como un sistema de información clave para la toma de decisiones económicas/financieras y el control de gestión." },
      { q: "¿Qué diferencia hay entre Contabilidad y Teneduría de Libros?", a: "La Contabilidad diseña el sistema, analiza e interpreta los datos para la toma de decisiones; la Teneduría se limita al registro mecánico de las operaciones." }
    ]
  },
  {
    id: 2,
    titulo: "Unidad II: El Proceso Contable - Igualdad Contable",
    descripcion: "Estructura patrimonial, variaciones, el criterio de lo devengado y reconocimiento de elementos.",
    flashcards: [
      { q: "¿Qué condiciones debe reunir un recurso para ser reconocido como Activo?", a: "Debe tener un valor de cambio o de uso, el ente debe controlar los beneficios que genera y su origen debe ser un hecho ya ocurrido." },
      { q: "¿Qué condiciones debe reunir una obligación para ser reconocida como Pasivo?", a: "Debe implicar una obligación cierta o contingente hacia otro ente, requerir el sacrificio de activos a una fecha determinada y originarse en un hecho ya ocurrido." },
      { q: "¿Qué establece el Criterio de lo Devengado?", a: "Que los efectos patrimoniales de las transacciones y otros hechos deben reconocerse en el período en que ocurren, independientemente de si se cobraron o pagaron." },
      { q: "¿Qué diferencia hay entre una variación cualitativa (permutativa) y una cuantitativa (modificativa)?", a: "Las cualitativas solo alteran la composición del patrimonio sin modificar el monto del Patrimonio Neto; las cuantitativas alteran la cuantía del PN debido a resultados (ingresos, gastos, ganancias, pérdidas)." }
    ]
  },
  {
    id: 3,
    titulo: "Unidad III: El Proceso Contable - Fuentes",
    descripcion: "Documentación respaldatoria, circuitos administrativos y regímenes vigentes de emisión.",
    flashcards: [
      { q: "¿Cuál es la finalidad de la documentación respaldatoria?", a: "Sirve de constancia jurídica de las operaciones celebradas, es la fuente de datos para las registraciones contables y permite el control interno." },
      { q: "¿Qué comprobante respalda una compra-venta de mercaderías al contado?", a: "Factura (Original para el comprador, Duplicado para el vendedor) acompañada del correspondiente Recibo de caja por el pago." },
      { q: "¿Para qué se emite una Nota de Crédito comercial?", a: "Para comunicar al cliente que se ha disminuido su deuda (por devoluciones de mercaderías, bonificaciones o errores en la facturación)." }
    ]
  },
  {
    id: 4,
    titulo: "Unidad IV: Elementos e Instrumentos",
    descripcion: "Cuentas, planes y manuales de cuentas, partida doble y balance de comprobación.",
    flashcards: [
      { q: "¿Qué es un Plan de Cuentas?", a: "Un listado ordenado y sistemático de todas las cuentas que un ente utiliza o prevé utilizar para el registro de sus operaciones." },
      { q: "¿Qué es un Manual de Cuentas?", a: "Un documento que explica el significado de cada cuenta, cuándo se debita, cuándo se acredita, qué representa su saldo y en qué rubro se expone." },
      { q: "¿En qué se fundamenta el método de la Partida Doble?", a: "En que todo hecho contable afecta al menos a dos cuentas, manteniendo la igualdad: Total del Débito = Total del Crédito (No hay deudor sin acreedor)." }
    ]
  },
  {
    id: 5,
    titulo: "Unidad V: Reconocimiento y Medición Inicial",
    descripcion: "Componentes del Activo, Pasivo y Patrimonio Neto según rubros específicos de la normativa.",
    flashcards: [
      { q: "¿Qué partidas integran el rubro Caja y Bancos?", a: "El dinero en efectivo en moneda nacional y extranjera, cheques corrientes y saldos en cuentas bancarias a la vista (caja de ahorro y cuenta corriente)." },
      { q: "¿Cómo se compone el costo de incorporación en general de un Bien de Cambio comprado?", a: "Precio de compra al contado + todos los gastos necesarios hasta que el bien esté en condiciones de ser vendido (fletes, seguros, carga, control de calidad) - bonificaciones." },
      { q: "¿Qué representan las deudas contingentes (Previsiones)?", a: "Obligaciones estimadas para afrontar situaciones de concreción incierta en el futuro (ej: previsión para deudores incobrables o litigios), basadas en hechos del presente." }
    ]
  }
];

// --- DATA: SIMULADOR DE VARIACIONES ---
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
  },
  {
    id: 3,
    enunciado: "Un cliente nos transfiere a nuestra cuenta bancaria el dinero que nos debía en cuenta corriente.",
    tipoCorrecto: "Permutativa",
    efecto: "+Activo (Banco c/c) y -Activo (Deudores por Ventas)",
    explicacion: "Es permutativa exclusivamente de Activo. Entra dinero al banco y disminuye el derecho de cobro; el total del activo permanece idéntico."
  },
  {
    id: 4,
    enunciado: "Los socios firman el contrato constitutivo de la sociedad, comprometiéndose a aportar $1.000.000 en partes iguales.",
    tipoCorrecto: "Modificativa",
    efecto: "+Activo (Accionistas / Socios Cta. Aporte) y +Patrimonio Neto (Capital Social)",
    explicacion: "Es una variación modificativa incremental de origen transaccional. Nace el derecho del ente a exigir el aporte y se constituye el Capital de la organización."
  },
  {
    id: 5,
    enunciado: "Se constata que un cliente falleció insolvente y no posee bienes. No se había constituido previsión.",
    tipoCorrecto: "Modificativa",
    efecto: "-Activo (Deudores por Ventas) y -Patrimonio Neto (Pérdida por Deudores Incobrables)",
    explicacion: "Es modificativa disminutiva no transaccional. Representa una pérdida directa que disminuye el Patrimonio Neto al absorber el impacto del saldo incobrable."
  }
];

// --- DATA: DICCIONARIO / MANUAL DE CUENTAS ---
const diccionarioCuentas = [
  { nombre: "Caja", naturaleza: "Activo", rubro: "Caja y Bancos", saldo: "Deudor", representa: "El dinero en efectivo, billetes y monedas de curso legal bajo custodia del ente." },
  { nombre: "Deudores por Ventas", naturaleza: "Activo", rubro: "Créditos por Ventas", saldo: "Deudor", representa: "Los derechos de cobro que tiene el ente contra clientes que compraron mercaderías a crédito sin documentar." },
  { nombre: "Mercaderías", naturaleza: "Activo", rubro: "Bienes de Cambio", saldo: "Deudor", representa: "Los bienes destinados a la venta en el curso habitual de la actividad comercial de la organización." },
  { nombre: "Proveedores", naturaleza: "Pasivo", rubro: "Deudas Ciertas (Comerciales)", saldo: "Acreedor", representa: "Las obligaciones que posee el ente con terceros por compras de mercaderías en cuenta corriente (a crédito sin documentar)." },
  { nombre: "Obligaciones a Pagar", naturaleza: "Pasivo", rubro: "Deudas Ciertas (Comerciales/Préstamos)", saldo: "Acreedor", representa: "Deudas documentadas del ente mediante la firma de pagarés a favor de terceros." },
  { nombre: "Previsión para Deudores Incobrables", naturaleza: "Regularizadora de Activo", rubro: "Créditos por Ventas", saldo: "Acreedor", representa: "La estimación de los créditos en cuenta corriente que podrían llegar a perderse en el próximo ejercicio." },
  { nombre: "Capital Social", naturaleza: "Patrimonio Neto", rubro: "Capital", saldo: "Acreedor", representa: "El aporte nominal comprometido por los socios o propietarios al constituirse la sociedad." },
  { nombre: "Ventas", naturaleza: "Resultado Positivo (Ingreso)", rubro: "Resultados", saldo: "Acreedor", representa: "Los ingresos obtenidos por la enajenación de mercaderías o la prestación de servicios." },
  { nombre: "Costo de Mercaderías Vendidas (CMV)", naturaleza: "Resultado Negativo (Gasto)", rubro: "Resultados", saldo: "Deudor", representa: "El gasto incurrido por el valor de incorporación que tenían las mercaderías que acaban de ser vendidas." },
  { nombre: "Intereses Negativos a Devengar", naturaleza: "Regularizadora de Pasivo", rubro: "Deudas", saldo: "Deudor", representa: "Los componentes financieros implícitos o explícitos contenidos en un pasivo que aún no transcurrieron en el tiempo." }
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

  // Manejo de giro de tarjetas
  const toggleCard = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Manejo de respuesta del simulador
  const handleAnswerSelection = (answer) => {
    if (selectedAnswer) return; // evitar doble click
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    const esCorrecto = answer === ejerciciosVariaciones[currentIdx].tipoCorrecto;
    setScore(prev => ({
      correct: esCorrecto ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
  };

  const handleNextEjercicio = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentIdx((prevIdx) => (prevIdx + 1) % ejerciciosVariaciones.length);
  };

  // Filtrado de cuentas del diccionario
  const filteredCuentas = diccionarioCuentas.filter(cuenta =>
    cuenta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cuenta.rubro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* HEADER PRINCIPAL */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-emerald-400 to-teal-200">
                UGD Campus Contable
              </h1>
              <p className="text-xs text-slate-400 font-medium">Contador Público Nacional • Contabilidad I (2026)</p>
            </div>
          </div>
          
          {/* NAVEGACIÓN POR PESTAÑAS */}
          <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('teoria')}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all w-full sm:w-auto ${
                activeTab === 'teoria' 
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Teoría
            </button>
            <button
              onClick={() => setActiveTab('simulador')}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all w-full sm:w-auto ${
                activeTab === 'simulador' 
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Variaciones
            </button>
            <button
              onClick={() => setActiveTab('cuentas')}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all w-full sm:w-auto ${
                activeTab === 'cuentas' 
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Search className="w-4 h-4" />
              Cuentas
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENIDO CENTRAL */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* ================= PESTAÑA: TEORÍA (FLASHCARDS) ================= */}
        {activeTab === 'teoria' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Flashcards de Autoestudio</h2>
              <p className="text-slate-400 text-sm">
                Elegí una unidad analítica para repasar conceptos teóricos clave y definiciones según los descriptores de la cátedra.
              </p>
            </div>

            {/* Selector Lateral / Superior de Unidades */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <div className="space-y-2 bg-slate-900/40 p-3 rounded-2xl border border-slate-800 md:col-span-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 block mb-2">Unidades Analíticas</span>
                {unidadesData.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => { setSelectedUnidad(u.id); setFlippedCards({}); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      selectedUnidad === u.id 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    Unidad {u.id}
                  </button>
                ))}
              </div>

              {/* Contenedor de las Tarjetas de la Unidad */}
              <div className="md:col-span-3 space-y-6">
                {unidadesData.filter(u => u.id === selectedUnidad).map((unidad) => (
                  <div key={unidad.id} className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <h3 className="text-lg font-bold text-slate-200">{unidad.titulo}</h3>
                      <p className="text-xs text-slate-400 mt-1">{unidad.descripcion}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {unidad.flashcards.map((fc, index) => (
                        <div 
                          key={index}
                          onClick={() => toggleCard(index)}
                          className="group h-48 cursor-pointer [perspective:1000px]"
                        >
                          <div className={`relative w-full h-full rounded-2xl border transition-all duration-500 [transform-style:preserve-3d] ${
                            flippedCards[index] 
                              ? '[transform:rotateY(180deg)] bg-slate-900 border-emerald-500/40 shadow-xl shadow-emerald-950/20' 
                              : 'bg-slate-900/60 border-slate-800 group-hover:border-slate-700'
                          }`}>
                            
                            {/* Frente: Pregunta */}
                            <div className="absolute inset-0 p-5 flex flex-col justify-between [backface-visibility:hidden]">
                              <div className="flex justify-between items-start gap-2">
                                <span className="bg-slate-800 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded-full border border-slate-700">Pregunta</span>
                                <Bookmark className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                              </div>
                              <p className="text-sm font-semibold text-slate-200 leading-snug">{fc.q}</p>
                              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                                Ver respuesta <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>

                            {/* Dorso: Respuesta */}
                            <div className="absolute inset-0 p-5 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] bg-slate-900/90 rounded-2xl">
                              <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20 w-max">Definición Académica</span>
                              <p className="text-xs text-slate-300 leading-relaxed overflow-y-auto pr-1">{fc.a}</p>
                              <span className="text-[10px] font-medium text-slate-500 italic">Click para volver</span>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= PESTAÑA: SIMULADOR DE VARIACIONES ================= */}
        {activeTab === 'simulador' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Simulador Práctico UGD</h2>
              <p className="text-slate-400 text-sm">Evalua el impacto de las transacciones sobre la igualdad contable dinámica de la organización.</p>
            </div>

            {/* Marcador de Score */}
            <div className="flex justify-between items-center bg-slate-900/60 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-semibold">
              <span className="text-slate-400">Progreso de Práctica</span>
              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
                Aciertos: {score.correct} / {score.total}
              </span>
            </div>

            {/* Tarjeta del Ejercicio */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold block">Hecho Económico Planteado</span>
                <p className="text-base font-semibold text-slate-100 leading-relaxed">
                  "{ejerciciosVariaciones[currentIdx].enunciado}"
                </p>
              </div>

              {/* Botones de Selección */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clasificá la Variación Patrimonial:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Permutativa', 'Modificativa'].map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = option === ejerciciosVariaciones[currentIdx].tipoCorrecto;
                    
                    let btnStyle = "border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-950 hover:border-slate-700";
                    if (selectedAnswer) {
                      if (isCorrectOption) btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                      else if (isSelected) btnStyle = "border-rose-500 bg-rose-500/10 text-rose-400";
                      else btnStyle = "border-slate-800 opacity-40 text-slate-500";
                    }

                    return (
                      <button
                        key={option}
                        disabled={!!selectedAnswer}
                        onClick={() => handleAnswerSelection(option)}
                        className={`flex items-center justify-between p-3 border rounded-xl text-xs font-bold tracking-wide transition-all ${btnStyle}`}
                      >
                        {option}
                        {selectedAnswer && isCorrectOption && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {selectedAnswer && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Panel de Explicación Técnica */}
              {showExplanation && (
                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-3 animate-slideUp">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Impacto y Justificación Estructural:</span>
                      <p className="text-xs text-slate-300 font-mono font-medium">{ejerciciosVariaciones[currentIdx].efecto}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">{ejerciciosVariaciones[currentIdx].explicacion}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextEjercicio}
                    className="w-full bg-slate-100 text-slate-950 font-bold py-2 rounded-lg text-xs hover:bg-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    Siguiente Enunciado <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= PESTAÑA: BUSCADOR DE CUENTAS ================= */}
        {activeTab === 'cuentas' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Manual Analítico de Cuentas</h2>
              <p className="text-slate-400 text-sm">Consultá rápido la naturaleza, saldo habitual y representación técnica de las cuentas patrimoniales y de resultado.</p>
            </div>

            {/* Input de Búsqueda */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar cuenta por nombre o rubro (ej: Caja, Deudas, Pasivo)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
              />
            </div>

            {/* Lista Grid de Cuentas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCuentas.length > 0 ? (
                filteredCuentas.map((cuenta, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-sm">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-bold text-slate-100">{cuenta.nombre}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          cuenta.naturaleza === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          cuenta.naturaleza === 'Pasivo' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          cuenta.naturaleza.includes('Regularizadora') ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          cuenta.naturaleza === 'Patrimonio Neto' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {cuenta.naturaleza}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{cuenta.representa}</p>
                    </div>

                    <div className="grid grid-cols-2 bg-slate-950/60 border border-slate-800/60 p-2 rounded-xl text-[10px] font-mono font-medium text-slate-400">
                      <div>
                        <span className="text-slate-600 block text-[9px] uppercase font-bold tracking-wider mb-0.5">Rubro de Exposición</span>
                        <span className="text-slate-300 flex items-center gap-1"><Layers className="w-3 h-3 text-slate-500" /> {cuenta.rubro}</span>
                      </div>
                      <div className="border-l border-slate-800 pl-3">
                        <span className="text-slate-600 block text-[9px] uppercase font-bold tracking-wider mb-0.5">Saldo Habitual</span>
                        <span className="text-slate-300">{cuenta.saldo}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 md:col-span-2 text-slate-500 text-xs font-medium">
                  No se encontraron cuentas contables que coincidan con la búsqueda.
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 mt-12 py-6 text-center text-[10px] text-slate-600 font-medium">
        Desarrollado de forma colaborativa para estudiantes de Ciencias Económicas • UGD 2026
      </footer>
    </div>
  );
}