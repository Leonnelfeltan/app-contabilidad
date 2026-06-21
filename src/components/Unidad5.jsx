import React from 'react';

export default function Unidad5() {
  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-4 text-xs text-slate-300 leading-relaxed">
      <h2 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">Unidad V: Reconocimiento y Medición Inicial</h2>
      
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
        <h4 className="font-bold text-slate-200 text-sm">El Costo de Incorporación (Precio de Contado)</h4>
        <p>Las normas profesionales (RT 54) determinan que los bienes se incorporan a la contabilidad por su **Valor de Costo**. El costo de un bien adquirido es el sacrificio económico total necesario para ponerlo en condiciones de ser vendido o utilizado en la actividad operativa.</p>
        
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300">
          COSTO = Precio de Compra de Contado + Gastos de Flete + Seguros de Traslado + Gastos de Aduana + Costos de Control de Calidad e Instalación.
        </div>

        <p className="text-slate-400 font-medium pt-1">⚠️ ¡Alerta Parcial UGD! Los intereses financieros pactados por pago diferido (a crédito) y los impuestos recuperables (como el IVA) <strong>NUNCA</strong> forman parte del costo del bien. Se deben registrar por separado como cuentas de regularización o gastos financieros diferidos.</p>
      </div>
    </div>
  );
}