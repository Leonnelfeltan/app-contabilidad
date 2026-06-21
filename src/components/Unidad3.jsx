import React, { useState } from 'react';
import { FileSpreadsheet, ArrowRight, Layers } from 'lucide-react';

export default function Unidad3() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const documentos = [
    { name: "Factura A / B / C", emite: "Vendedor", destino: "Comprador", efecto: "Registrable", desc: "Comprobante que instrumenta legal y formalmente una operación de compraventa de bienes o servicios. Detalla cantidades, precios unitarios, condiciones de pago e impuestos.", nota: "Factura A: Entre responsables inscriptos (IVA discriminado). Factura B: De Responsable Inscripto a Monotributista/Consumidor Final. Factura C: Emitida por Monotributistas." },
    { name: "Remito", emite: "Vendedor / Transportista", destino: "Comprador", efecto: "NO Registrable", desc: "Documento que acompaña el traslado físico de las mercaderías vendidas. Sirve de constancia para el transportista y para que el comprador verifique las cantidades recibidas de conformidad.", nota: "Es un documento puramente administrativo y de control de inventario. NO se contabiliza en los libros principales porque no altera valores económicos por sí mismo." },
    { name: "Recibo", emite: "Cobrador (Acreedor)", destino: "Pagador (Deudor)", efecto: "Registrable", desc: "Constancia formal que acredita haber recibido una determinada suma de dinero, cheques u otros valores en concepto de pago total o parcial de una deuda.", nota: "Es la fuente de datos directa para dar de baja créditos o deudas y registrar ingresos de caja o bancos." },
    { name: "Nota de Crédito", emite: "Vendedor", destino: "Comprador", efecto: "Registrable", desc: "Comprobante que comunica al cliente que se ha disminuido su saldo deudor debido a devoluciones de mercaderías, bonificaciones por volumen o errores de facturación en exceso.", nota: "Genera una disminución en la cuenta de créditos (Deudores por Ventas) para el vendedor." }
  ];

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">Unidad III: Documentación respaldatoria y Circuitos Administrativos</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Los documentos comerciales constituyen el soporte material indispensable del proceso contable. Cumplen una triple función: <strong>Jurídica</strong> (sirven de medio de prueba en juicios), <strong>Contable</strong> (fuente de datos para las registraciones) y de <strong>Control Interno</strong> (fijan responsabilidades de los empleados).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {documentos.map((doc, idx) => (
          <button key={idx} onClick={() => setSelectedDoc(doc)} className={`p-3 text-left border rounded-xl transition-all ${selectedDoc?.name === doc.name ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-850 bg-slate-950/30 hover:border-slate-700'}`}>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold block w-max mb-1.5 ${doc.efecto === 'Registrable' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-850 text-slate-400'}`}>{doc.efecto}</span>
            <strong className="text-xs text-slate-200 block truncate">{doc.name}</strong>
            <span className="text-[10px] text-slate-500 block pt-1">Emite: {doc.emite}</span>
          </button>
        ))}
      </div>

      {selectedDoc ? (
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3 animate-fadeIn text-xs leading-relaxed text-slate-300">
          <div className="flex justify-between items-center border-b border-slate-850 pb-2">
            <h4 className="font-bold text-emerald-400 text-sm">{selectedDoc.name}</h4>
            <span className="text-[10px] font-mono text-slate-500">Circuito: {selectedDoc.emite} ➔ {selectedDoc.destino}</span>
          </div>
          <p>{selectedDoc.desc}</p>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
            <strong className="text-slate-300 block mb-1">Clave de Parcial (Cátedra):</strong>
            {selectedDoc.nota}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 bg-slate-950/20 border border-dashed border-slate-850 rounded-2xl text-xs text-slate-500">
          Seleccioná un documento del listado superior para analizar su comportamiento técnico y validez legal.
        </div>
      )}
    </div>
  );
}