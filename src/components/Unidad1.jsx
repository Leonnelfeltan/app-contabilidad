import React, { useState } from 'react';
import { BookOpen, Map, HelpCircle, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Unidad1() {
  const [subMetodo, setSubMetodo] = useState('lectura');
  const [auditCorrected, setAuditCorrected] = useState(false);
  const [selectedRequisito, setSelectedRequisito] = useState(null);

  const requisitosInfo = [
    { nombre: "Pertinencia", desc: "La información debe ser apta para satisfacer las necesidades de los usuarios, ayudando a confirmar o corregir evaluaciones pasadas o predecir hechos futuros." },
    { nombre: "Confiabilidad (Credibilidad)", desc: "Debe ser creíble para los usuarios. Requiere que sea aproximada a la realidad (esencialidad, neutralidad, integridad) y verificable." },
    { nombre: "Sistematicidad", desc: "La información debe estar orgánicamente ordenada y basada en reglas coherentes del proceso contable." },
    { nombre: "Claridad", desc: "Debe utilizar un lenguaje inteligible, fácil de comprender por usuarios que tengan un conocimiento razonable de negocios." }
  ];

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-6">
      {/* Mini Selector de Método */}
      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 max-w-sm">
        <button onClick={() => setSubMetodo('lectura')} className={`w-full py-1 text-[11px] font-bold rounded-lg ${subMetodo === 'lectura' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>📘 Núcleo Teórico</button>
        <button onClick={() => setSubMetodo('mapa')} className={`w-full py-1 text-[11px] font-bold rounded-lg ${subMetodo === 'mapa' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>🗺️ Flujo SIC</button>
        <button onClick={() => setSubMetodo('auditoria')} className={`w-full py-1 text-[11px] font-bold rounded-lg ${subMetodo === 'auditoria' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>🔍 Taller de Errores</button>
      </div>

      {subMetodo === 'lectura' && (
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          <h2 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">Unidad I: Las Organizaciones y el Sistema de Información Contable</h2>
          
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-200 text-sm">1. La Organización y sus Recursos</h3>
            <p>Las organizaciones son unidades sociales coordinadas que persiguen objetivos comunes. Para operar, requieren de <strong>Recursos</strong> (humanos, materiales, tecnológicos y financieros). Estos recursos se financian mediante dos fuentes primarias:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Fuentes Propias (Financiación Interna):</strong> Aportes iniciales de los socios o propietarios (Capital) y los resultados que la propia empresa genera y decide reinvertir.</li>
              <li><strong className="text-slate-200">Fuentes Ajenas (Financiación Externa):</strong> Créditos otorgados por terceros proveedores, entidades financieras o préstamos que generan obligaciones (Pasivos).</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-200 text-sm">2. Requisitos de la Información Contable (RT 16 / RT 54)</h3>
            <p>Para que la información emitida en los estados contables sea de utilidad para los administradores y terceros, debe cumplir de forma concurrente con ciertos atributos esenciales. Hacé clic en cada uno para analizar su impacto de parcial:</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {requisitosInfo.map((r, i) => (
                <button key={i} onClick={() => setSelectedRequisito(r)} className={`p-3 text-left border rounded-xl transition-all ${selectedRequisito?.nombre === r.nombre ? 'border-emerald-500 bg-emerald-500/5 text-slate-200' : 'border-slate-800 bg-slate-950/20 text-slate-400 hover:border-slate-700'}`}>
                  <strong className="block text-xs text-emerald-400">{r.nombre}</strong>
                </button>
              ))}
            </div>
            {selectedRequisito && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] animate-fadeIn text-slate-300">
                {selectedRequisito.desc}
              </div>
            )}
          </div>
        </div>
      )}

      {subMetodo === 'mapa' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">El Circuito del Sistema de Información Contable (SIC)</h3>
          <p className="text-xs text-slate-400">La contabilidad funciona como un proceso de transformación de datos brutos en información estratégica para la toma de decisiones.</p>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-lg font-mono font-bold text-xs">PASO 1</div>
              <div className="text-xs"><strong className="text-slate-200 block">Entrada de Datos:</strong> Hechos económicos documentados (Facturas, Recibos, Remitos) que capturan las transacciones con terceros o eventos internos.</div>
            </div>
            <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg font-mono font-bold text-xs">PASO 2</div>
              <div className="text-xs"><strong className="text-slate-200 block">Procesamiento y Clasificación:</strong> Clasificación de cuentas en el Plan de Cuentas, aplicación de la Partida Doble y registración cronológica en el Libro Diario y su posterior pase al Libro Mayor.</div>
            </div>
            <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg font-mono font-bold text-xs">PASO 3</div>
              <div className="text-xs"><strong className="text-slate-200 block">Salida de Información:</strong> Emisión de Balances de Comprobación y Estados Contables Básicos (Estado de Situación Patrimonial, Estado de Resultados) estructurados bajo normas vigentes.</div>
            </div>
          </div>
        </div>
      )}

      {subMetodo === 'auditoria' && (
        <div className="space-y-4">
          <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <AlertTriangle className="w-4 h-4" /> Caso de Auditoría Académica - Error de Principio
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              El administrador de una empresa local decide <strong>no registrar</strong> una deuda comercial de $5.000.000 con un proveedor que vence dentro de 14 meses, argumentando que "como falta más de un año para pagarla, no distorsiona el balance actual del mes".
            </p>
            <p className="text-xs font-bold text-slate-400">¿Qué requisito o atributo de la información contable se está violando flagrantemente en esta situación?</p>
            
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button onClick={() => setAuditCorrected('error')} className={`p-2.5 text-left text-xs border rounded-lg transition-all ${auditCorrected === 'error' ? 'border-rose-500 bg-rose-500/10 text-rose-300' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                Ninguno, el administrador tiene la facultad de decidir qué es relevante según su criterio interno.
              </button>
              <button onClick={() => setAuditCorrected('success')} className={`p-2.5 text-left text-xs border rounded-lg transition-all ${auditCorrected === 'success' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}`}>
                Se viola la <strong>Integridad (Confiabilidad)</strong>. La omisión deliberada de un pasivo genera información sesgada, incompleta y que deja de ser una representación aproximada de la realidad.
              </button>
            </div>

            {auditCorrected === 'success' && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-400 animate-fadeIn">
                <strong>¡Excelente análisis!</strong> Las normas exigen que la información sea íntegra (completa). Omitir pasivos de forma voluntaria altera los ratios de endeudamiento y solvencia, engañando a los usuarios que deben tomar decisiones económicas.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}