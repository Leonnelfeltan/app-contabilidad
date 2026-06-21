import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, HelpCircle, BrainCircuit, Send } from 'lucide-react';

const preguntasVF = [
  { id: 1, q: "Según la RT 54, el Criterio de lo Devengado exige que los hechos se registren cuando se cobra o paga el efectivo.", v: false, exp: "Falso. El devengamiento exige registrar los efectos patrimoniales en el período en que ocurren, sin importar su cobro o pago." },
  { id: 2, q: "Una variación cualitativa o permutativa altera la composición del patrimonio pero no modifica la cuantía del Patrimonio Neto.", v: true, exp: "Verdadero. Solo cambian los componentes del Activo o Pasivo manteniendo el valor del PN intacto." }
];

const preguntasChoice = [
  {
    id: 1,
    q: "¿Cuál de los siguientes elementos forma parte del costo de incorporación de un Bien de Cambio?",
    options: ["El flete y seguro de traslado", "Los intereses por financiación a 60 días", "El impuesto recuperable (IVA)", "Los gastos de publicidad del producto"],
    correct: 0,
    exp: "El costo de incorporación incluye el precio de contado más todos los gastos necesarios (fletes, seguros, control de calidad) hasta que el bien esté en condiciones de ser vendido."
  }
];

const preguntaDesarrollar = {
  q: "Explique detalladamente qué condiciones deben reunirse para que un ente reconozca un elemento como ACTIVO según el marco conceptual analizado en la Unidad II.",
  respuestaIdeal: "Debe tener valor de cambio o de uso, el ente debe ejercer el control de los beneficios que genera y el origen debe ser un hecho ya ocurrido."
};

export default function Cuestionario() {
  const [subTab, setSubTab] = useState('vf');
  
  // Estados V/F
  const [ansVF, setAnsVF] = useState({});
  // Estados Choice
  const [ansChoice, setAnsChoice] = useState({});
  // Estados Desarrollar / IA Mock
  const [textDesarrollar, setTextDesarrollar] = useState('');
  const [iaFeedback, setIaFeedback] = useState(null);
  const [loadingIA, setLoadingIA] = useState(false);

  const handleVF = (id, valor) => {
    if (ansVF[id] !== undefined) return;
    setAnsVF(prev => ({ ...prev, [id]: valor }));
  };

  const handleChoice = (id, optIdx) => {
    if (ansChoice[id] !== undefined) return;
    setAnsChoice(prev => ({ ...prev, [id]: optIdx }));
  };

  const procesarRespuestaIA = () => {
    if (!textDesarrollar.trim()) return;
    setLoadingIA(true);
    setTimeout(() => {
      // Simulación de IA analizando palabras clave
      const r = textDesarrollar.toLowerCase();
      const tieneControl = r.includes('control');
      const tieneHechoOcurrido = r.includes('hecho') || r.includes('pasado') || r.includes('ocurrido');
      const tieneValor = r.includes('valor') || r.includes('beneficio') || r.includes('cambio') || r.includes('uso');

      let puntaje = 0;
      let comentarios = [];

      if (tieneControl) { puntaje += 33; comentarios.push("✔️ Identificaste correctamente el concepto de 'Control'."); }
      else { comentarios.push("❌ Te faltó mencionar el 'Control' exclusivo de los beneficios por parte del ente."); }

      if (tieneHechoOcurrido) { puntaje += 33; comentarios.push("✔️ Mencionaste que debe originarse en un 'Hecho ya ocurrido'."); }
      else { comentarios.push("❌ Olvidaste aclarar que el origen debe ser una transacción o evento pasado."); }

      if (tieneValor) { puntaje += 34; comentarios.push("✔️ Explicaste bien la necesidad de tener 'Valor de uso o cambio'."); }
      else { comentarios.push("❌ Te faltó indicar que debe poseer utilidad económica (valor de cambio o uso)."); }

      setIaFeedback({
        nota: Math.round(puntaje / 10),
        comentarios: comentarios,
        sugerencia: puntaje === 100 
          ? "¡Excelente! Respuesta digna de final. Conceptos perfectamente alineados a la cátedra." 
          : "Tu respuesta va por buen camino pero recordá que para el parcial de la UGD debés citar los 3 requisitos concurrentes del Activo."
      });
      setLoadingIA(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navegación del Cuestionario */}
      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 max-w-md mx-auto">
        {['vf', 'choice', 'desarrollo'].map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`w-full py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
              subTab === t ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t === 'vf' ? 'Verdadero/Falso' : t === 'choice' ? 'Múltiple Choice' : 'Desarrollar'}
          </button>
        ))}
      </div>

      {/* RENDER SUB-PESTAÑAS */}
      {subTab === 'vf' && (
        <div className="space-y-4 max-w-2xl mx-auto">
          {preguntasVF.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <p className="text-sm font-semibold text-slate-200">{p.q}</p>
              <div className="flex gap-3">
                <button
                  disabled={ansVF[p.id] !== undefined}
                  onClick={() => handleVF(p.id, true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    ansVF[p.id] === true 
                      ? p.v ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-rose-500/10 border-rose-500 text-rose-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Verdadero
                </button>
                <button
                  disabled={ansVF[p.id] !== undefined}
                  onClick={() => handleVF(p.id, false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    ansVF[p.id] === false 
                      ? !p.v ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-rose-500/10 border-rose-500 text-rose-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Falso
                </button>
              </div>
              {ansVF[p.id] !== undefined && (
                <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <span className="font-bold text-slate-300 block mb-1">Justificación de la Cátedra:</span>
                  {p.exp}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {subTab === 'choice' && (
        <div className="space-y-4 max-w-2xl mx-auto">
          {preguntasChoice.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <p className="text-sm font-semibold text-slate-200">{p.q}</p>
              <div className="space-y-2">
                {p.options.map((opt, oIdx) => {
                  const respondido = ansChoice[p.id] !== undefined;
                  const esCorrecta = oIdx === p.correct;
                  const fueSeleccionada = ansChoice[p.id] === oIdx;

                  let optStyle = "border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700";
                  if (respondido) {
                    if (esCorrecta) optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold";
                    else if (fueSeleccionada) optStyle = "border-rose-500 bg-rose-500/10 text-rose-400";
                    else optStyle = "border-slate-800 opacity-40 text-slate-500";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={respondido}
                      onClick={() => handleChoice(p.id, oIdx)}
                      className={`w-full text-left p-3 border rounded-xl text-xs transition-all flex justify-between items-center ${optStyle}`}
                    >
                      {opt}
                      {respondido && esCorrecta && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      {respondido && fueSeleccionada && !esCorrecta && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>
              {ansChoice[p.id] !== undefined && (
                <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <span className="font-bold text-slate-300 block mb-1">Análisis Técnico:</span>
                  {p.exp}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {subTab === 'desarrollo' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-wider uppercase">
              <BrainCircuit className="w-4 h-4" /> Corrección con IA Académica
            </div>
            <p className="text-sm font-semibold text-slate-200">{preguntaDesarrollar.q}</p>
            
            <textarea
              value={textDesarrollar}
              onChange={(e) => setTextDesarrollar(e.target.value)}
              placeholder="Escribí tu respuesta acá tal como lo harías en la hoja del parcial..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />

            <button
              disabled={loadingIA || !textDesarrollar.trim()}
              onClick={procesarRespuestaIA}
              className="w-full bg-emerald-500 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 font-bold py-2 rounded-xl text-xs hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
            >
              {loadingIA ? 'IA Analizando conceptos...' : 'Enviar a Corregir por IA'}
            </button>
          </div>

          {/* Devolución de la IA */}
          {iaFeedback && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 animate-slideUp">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Devolución del Tutor IA</span>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-emerald-400 font-mono text-xs font-bold">
                  <Award className="w-3.5 h-3.5" /> Nota Estimada: {iaFeedback.nota}/10
                </div>
              </div>
              <div className="space-y-1.5">
                {iaFeedback.comentarios.map((c, i) => (
                  <p key={i} className="text-xs text-slate-300 leading-relaxed">{c}</p>
                ))}
              </div>
              <p className="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-xl border border-slate-800/50">
                {iaFeedback.sugerencia}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}