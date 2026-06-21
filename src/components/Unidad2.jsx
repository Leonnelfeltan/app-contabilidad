import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function Unidad2() {
  const [subTab, setSubTab] = useState('teoria');
  const [devengadoAns, setDevengadoAns] = useState(null);

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-6">
      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 max-w-xs">
        <button onClick={() => setSubTab('teoria')} className={`w-full py-1 text-[11px] font-bold rounded-lg ${subTab === 'teoria' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>📘 Teoría Estructura</button>
        <button onClick={() => setSubTab('devengado')} className={`w-full py-1 text-[11px] font-bold rounded-lg ${subTab === 'devengado' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>⏳ Criterio Devengado</button>
      </div>

      {subTab === 'teoria' && (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">Unidad II: El Patrimonio y la Igualdad Contable</h2>
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
            <h4 className="font-bold text-slate-200">1. La Ecuación Contable Fundamental</h4>
            <p>El patrimonio de un ente se compone de su Activo (bienes y derechos) y su Pasivo (obligaciones con terceros). La igualdad estática inicial se plantea:</p>
            <div className="text-center bg-slate-900 py-2.5 rounded-xl border border-slate-800 font-mono text-sm text-emerald-400 font-bold">
              ACTIVO = PASIVO + PATRIMONIO NETO
            </div>
            <p>A medida que la empresa opera, surgen resultados positivos (Ingresos/Ganancias) y resultados negativos (Gastos/Pérdidas), dando lugar a la <strong>Ecuación Dinámica</strong>:</p>
            <div className="text-center bg-slate-900 py-2.5 rounded-xl border border-slate-800 font-mono text-sm text-emerald-400 font-bold">
              ACTIVO + RESULTADOS NEGATIVOS = PASIVO + CAPITAL + RESULTADOS POSITIVOS
            </div>
            <p className="text-slate-400 font-mono text-[10px]">Nota de estudio: Todos los componentes que se encuentran a la izquierda del igual poseen saldo e incrementos de naturaleza DEUDORA (Debe). Los de la derecha aumentan por el HABER (Acreedora).</p>
          </div>
        </div>
      )}

      {subTab === 'devengado' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200">El Principio de lo Devengado (Regla de Oro de Imputación)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Exige que los efectos patrimoniales derivados de las transacciones y otros hechos económicos se reconozcan y registren en los períodos en los cuales se producen o consumen, <strong>con independencia de si el dinero en efectivo ya fue cobrado o pagado</strong>.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold uppercase tracking-wide">Caso de Evaluación</span>
            <p className="text-xs text-slate-200 font-medium">
              "En el mes de Junio se consumen $45.000 de energía eléctrica en las oficinas comerciales de la empresa. La factura de dicho consumo llega el 10 de Julio, y se termina pagando en efectivo recién el 5 de Agosto. ¿En qué período mensual se debe imputar y registrar el gasto de energía eléctrica?"
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {['Junio', 'Julio', 'Agosto'].map((mes) => (
                <button key={mes} onClick={() => setDevengadoAns(mes)} className={`py-2 text-xs border rounded-lg font-bold transition-all ${devengadoAns === mes ? mes === 'Junio' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-rose-500 bg-rose-500/10 text-rose-400' : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'}`}>{mes}</button>
              ))}
            </div>

            {devengadoAns && (
              <div className={`p-3 rounded-xl border text-[11px] ${devengadoAns === 'Junio' ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300' : 'bg-rose-950/40 border-rose-500/20 text-rose-300'}`}>
                {devengadoAns === 'Junio' ? (
                  <p><strong>✔️ ¡Correcto!</strong> El servicio se consumió íntegramente en <strong>Junio</strong>. Por lo tanto, el resultado negativo (Gasto) pertenece a Junio por el criterio de lo devengado. El hecho de que la factura llegue en Julio o se pague en Agosto solo afecta al pasivo o a las cuentas de caja, pero la pérdida económica ya ocurrió en Junio.</p>
                ) : (
                  <p><strong>❌ Incorrecto.</strong> Estás aplicando el criterio de lo percibido (caja). Recordá que la cátedra exige registrar el gasto en el período exacto de su <strong>consumo u ocurrencia temporal</strong>, que en este caso fue en Junio.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}