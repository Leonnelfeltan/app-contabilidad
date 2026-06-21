import React from 'react';

export default function Unidad4() {
  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">Unidad IV: Elementos e Instrumentos - Las Cuentas</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Las cuentas son los instrumentos de los que se vale la contabilidad para agrupar cualitativa y cuantitativamente elementos patrimoniales homogéneos (ej: el dinero físico se agrupa bajo la cuenta <em>Caja</em>).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
          <h4 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-1">El Plan de Cuentas</h4>
          <p className="text-slate-400 leading-relaxed">Es la ordenación sistemática de todas las cuentas que se prevén usar durante la vida del ente. Sus requisitos indispensables son:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>Sistematicidad:</strong> Ordenado bajo una estructura numérica decimal (ej: 1 Activo, 1.1 Activo Corriente, 1.1.1 Caja y Bancos).</li>
            <li><strong>Flexibilidad:</strong> Debe permitir la inserción de nuevas cuentas a medida que el negocio se expande sin alterar la lógica previa.</li>
            <li><strong>Claridad:</strong> Nombres homogéneos e inequívocos.</li>
          </ul>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
          <h4 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-1">Leyes del Método de la Partida Doble</h4>
          <p className="text-slate-400 leading-relaxed">Derivado del sistema axiomático matemático desarrollado por Luca Pacioli, fundamenta que:</p>
          <ul className="list-decimal pl-5 space-y-1 text-slate-400">
            <li>No hay deudor sin acreedor, ni acreedor sin deudor.</li>
            <li>La suma de los valores anotados en el <strong>DEBE</strong> debe ser idéntica a la suma de los valores anotados en el <strong>HABER</strong> en todo asiento.</li>
            <li>Las cuentas de Activo y Resultados Negativos aumentan por el Debe y disminuyen por el Haber.</li>
            <li>Las cuentas de Pasivo, PN y Resultados Positivos aumentan por el Haber y disminuyen por el Debe.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}