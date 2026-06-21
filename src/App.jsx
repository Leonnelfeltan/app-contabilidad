import React, { useState, useMemo } from "react";
import {
  BookOpen, CheckCircle2, XCircle, ChevronRight, ChevronLeft,
  RotateCcw, FileText, Receipt, Banknote, GraduationCap,
  Sparkles, Filter, Award, FolderOpen
} from "lucide-react";

/* ============================== DATA ============================== */

const UNITS = [
  { id: "u1", n: "1", label: "Organizaciones", color: "#1F5C45" },
  { id: "u2", n: "2", label: "Proceso contable", color: "#A8311F" },
  { id: "u4", n: "4", label: "Cuentas", color: "#9C6B14" },
  { id: "u3", n: "3", label: "Comprobantes", color: "#3D5A80" },
];

const FLASHCARDS = [
  // UNIDAD 1
  { unit: "u1", q: "¿Qué es una organización?", a: "Conjunto de personas que utiliza recursos (humanos, materiales e inmateriales) para alcanzar un fin determinado, mediante una actividad." },
  { unit: "u1", q: "¿Qué es una empresa?", a: "Unidad económica que combina factores de producción (tierra, trabajo y capital) para obtener bienes o servicios con fines de lucro. Es un \"patrimonio en movimiento\"." },
  { unit: "u1", q: "Ecuación patrimonial básica", a: "Activo − Pasivo = Patrimonio Neto" },
  { unit: "u1", q: "Fuentes de financiación propia", a: "Aportes de los propietarios y resultados no distribuidos." },
  { unit: "u1", q: "Fuentes de financiación ajena", a: "Créditos otorgados por proveedores de bienes y créditos otorgados por prestadores de dinero (temporarias o estables)." },
  { unit: "u1", q: "Requisitos de la información contable", a: "Pertinencia, confiabilidad (credibilidad, neutralidad, integridad), sistematicidad, comparabilidad y claridad — condicionados por la oportunidad y la relación costo-beneficio." },
  { unit: "u1", q: "¿Qué es la RT 54 (FACPCE)?", a: "Es la \"Norma Unificada Argentina de Contabilidad\" (NUA): la norma profesional marco vigente, que reemplazó a varias RT anteriores y define los criterios de reconocimiento de activo, pasivo y patrimonio neto." },
  { unit: "u1", q: "Estados contables principales", a: "Estado de Situación Patrimonial, Estado de Resultados, Estado de Evolución del Patrimonio Neto y Estado de Flujo de Fondos." },

  // UNIDAD 2 — zona más floja del parcial
  { unit: "u2", q: "Las 4 etapas del proceso contable", a: "1) Captación de datos (comprobantes) → 2) Registración (libro diario, partida doble) → 3) Clasificación o resumen (libro mayor, balance de sumas y saldos) → 4) Informe (estados contables)." },
  { unit: "u2", q: "Principio de partida doble", a: "Toda transacción afecta como mínimo a dos cuentas por igual monto: no hay débito sin crédito. Así A = P + PN se mantiene siempre en equilibrio." },
  { unit: "u2", q: "Definí ACTIVO", a: "Recurso económico controlado por la entidad como consecuencia de hechos ya ocurridos. Un recurso económico es un bien o derecho con capacidad de generar beneficios económicos (valor de uso o de cambio)." },
  { unit: "u2", q: "Definí PASIVO", a: "Conjunto de deudas y obligaciones contraídas por la empresa a una fecha determinada (proveedores, documentos a pagar, acreedores, anticipos de clientes, impuestos a pagar, préstamos)." },
  { unit: "u2", q: "Definí PATRIMONIO NETO", a: "Es igual al Activo menos el Pasivo. Incluye los aportes de los propietarios (o asociados) y los resultados acumulados." },
  { unit: "u2", q: "Costo vs. Gasto", a: "Costo: egreso para generar ingresos futuros (consumido o no consumido). Gasto: costo ya incurrido/consumido en el período (sueldos, alquiler)." },
  { unit: "u2", q: "Variación PERMUTATIVA", a: "Operación que NO modifica el Capital/PN. Solo involucra cuentas de Activo y/o Pasivo (cobrar un crédito, pagar a un proveedor)." },
  { unit: "u2", q: "Variación MODIFICATIVA", a: "Operación que aumenta o disminuye el PN por una ganancia o una pérdida. Involucra cuentas patrimoniales y de resultado." },
  { unit: "u2", q: "Perfeccionamiento inmediato vs. continuo", a: "Inmediato: nace y termina en un solo momento (compra, venta, cobranza). Continuo: se devenga momento a momento (alquileres, intereses, luz)." },
  { unit: "u2", q: "Principio de lo devengado", a: "Los efectos patrimoniales se registran en el período en que ocurren, con independencia de cuándo se cobra o paga el dinero." },
  { unit: "u2", q: "Regla de resultados positivos (ganancias)", a: "Si está vinculado a una venta: se registra al entregar el bien/prestar el servicio. Si está vinculado a un período: se registra en ese período. Si no se vincula con ninguno: cuando se lo conoce (ej. una lotería)." },

  // UNIDAD 4
  { unit: "u4", q: "¿Qué es una cuenta?", a: "El conjunto de hechos y actos económicos homogéneos debidamente cuantificados. Se compone de Sujeto, Objeto y Valor." },
  { unit: "u4", q: "Debe / Haber / Saldo", a: "Debitar = anotar en el Debe. Acreditar = anotar en el Haber. Debe > Haber: saldo deudor. Haber > Debe: saldo acreedor. Iguales: cuenta saldada." },
  { unit: "u4", q: "¿En qué consiste el análisis de una cuenta?", a: "En estudiar los movimientos del Debe y del Haber de la cuenta durante un período para determinar y verificar su saldo, identificar qué partidas lo componen y si ese saldo refleja razonablemente la realidad patrimonial." },
  { unit: "u4", q: "Cuentas patrimoniales activas / pasivas / PN", a: "Activas: bienes y derechos, saldo deudor (caja, bancos, mercaderías). Pasivas: deudas, saldo acreedor (proveedores). Patrimonio Neto: aportes y resultados acumulados, saldo acreedor." },
  { unit: "u4", q: "Cuentas de resultado positivas / negativas", a: "Positivas: ingresos o ganancias, saldo acreedor. Negativas: gastos o pérdidas, saldo deudor." },
  { unit: "u4", q: "Cuentas regularizadoras de ACTIVO", a: "Corrigen/ajustan el valor de una cuenta activa. Tienen saldo ACREEDOR y se exponen restando a la cuenta de activo que regularizan." },
  { unit: "u4", q: "Cuentas regularizadoras de PASIVO", a: "Corrigen/ajustan el valor de una cuenta pasiva. Siempre tienen saldo DEUDOR." },
  { unit: "u4", q: "Analíticas vs. Sintéticas", a: "Analíticas: cuentas individuales (Cliente A, Cliente B). Sintéticas: agrupan varias analíticas de igual naturaleza (Deudores por Ventas, Proveedores)." },
  { unit: "u4", q: "Compuestas vs. Recompuestas", a: "Compuestas: reúnen varias sintéticas; se llaman \"rubros\" y no se usan para registrar (Caja y Bancos, Bienes de Cambio). Recompuestas: reúnen varias compuestas (Activo, Pasivo, PN)." },
  { unit: "u4", q: "Plan de cuentas — características", a: "Debe ser sistematizado, flexible, homogéneo y claro en su terminología. Ordena el Activo por liquidez y el Pasivo por exigibilidad." },

  // UNIDAD 3
  { unit: "u3", q: "Ciclo de una operación comercial", a: "Orden de Compra → Remito (con la mercadería) → Factura → Pago → Recibo." },
  { unit: "u3", q: "Factura A — ¿quién a quién?", a: "La emite un Responsable Inscripto (RI) a otro RI o a un Monotributista. Discrimina IVA." },
  { unit: "u3", q: "Factura B — ¿quién a quién?", a: "La emite un RI a un Consumidor Final o a un Exento. No discrimina IVA." },
  { unit: "u3", q: "Factura C — ¿quién a quién?", a: "La emiten Monotributistas o Exentos, a cualquier destinatario. No discrimina IVA." },
  { unit: "u3", q: "Nota de Débito / Nota de Crédito", a: "Débito: el vendedor avisa que AUMENTÓ la deuda del comprador. Crédito: avisa que la DISMINUYÓ (devolución, error de facturación, bonificación). Ambas registrables, en duplicado." },
  { unit: "u3", q: "Recibo \"X\"", a: "Comprobante que el vendedor entrega al comprador como constancia de haber recibido dinero/cheques/pagarés. Lleva la leyenda \"documento no válido como factura\"." },
  { unit: "u3", q: "IVA: Débito Fiscal vs. Crédito Fiscal", a: "Débito Fiscal: IVA que la empresa cobra en sus ventas. Crédito Fiscal: IVA que paga en sus compras. Alícuota general: 21%." },
  { unit: "u3", q: "Categorías frente al IVA", a: "Responsable Inscripto, Monotributista (régimen simplificado, con tope anual de facturación), Responsable Exento y Consumidor Final." },
  { unit: "u3", q: "Pagaré — partes que intervienen", a: "Librador (lo firma y promete pagar), Beneficiario (a su nombre se emite), Tenedor/Portador (lo recibió por endoso), Endosante (lo transfiere)." },
  { unit: "u3", q: "Cheque común vs. cheque de pago diferido", a: "Común: una sola fecha, 30 días corridos para presentarlo, medio de pago. Diferido: dos fechas distintas, 1 a 360 días de plazo, instrumento de crédito, 30 días desde la fecha de pago para presentarlo." },
  { unit: "u3", q: "Endosos permitidos", a: "Cheque común: hasta 1 endoso + 1 firma de depósito. Cheque de pago diferido: hasta 2 endosos + 1 firma de depósito." },
];

const QUIZ = [
  { q: "Según el Principio del Devengado, los efectos patrimoniales de las transacciones se reconocen…",
    options: [
      "cuando efectivamente se cobran o se pagan",
      "en el período en el cual ocurren, con independencia del momento del cobro o pago",
      "cuando se toma la mejor decisión posible",
      "ninguna de las anteriores",
    ], correct: 1,
    explain: "El devengado registra el hecho económico en el período en que ocurre, sin importar cuándo entra o sale el efectivo." },
  { q: "¿Qué es una cuenta contable?",
    options: [
      "Hechos económicos debidamente cuantificados",
      "El conjunto de hechos y actos económicos de similares características debidamente cuantificados",
      "Los hechos homogéneos que se agrupan para obtener mayor información",
      "Ninguna de las anteriores",
    ], correct: 1,
    explain: "Es la definición exacta de \"cuenta\": agrupa partidas de la misma naturaleza, mismo concepto o finalidad similar." },
  { q: "Las cuentas regularizadoras…",
    options: [
      "Ajustan la medición, permitiendo dejar bien valuado el activo, el pasivo y el patrimonio neto",
      "Solo brindan mayor detalle sobre la composición de otra cuenta",
      "No pueden tener saldo al cierre del ejercicio",
      "Ninguna de las anteriores",
    ], correct: 0,
    explain: "Su función central es corregir/ajustar la medición de la cuenta relacionada (ej.: Previsión para incobrables resta a Deudores)." },
  { q: "¿Cuál es el orden correcto de las etapas del proceso contable?",
    options: [
      "Informe → Registración → Captación → Resumen",
      "Captación → Registración → Clasificación/Resumen → Informe",
      "Registración → Captación → Informe → Resumen",
      "Clasificación → Captación → Informe → Registración",
    ], correct: 1,
    explain: "Primero se capta el dato (comprobante), luego se registra (libro diario), se resume (libro mayor) y por último se informa (estados contables)." },
  { q: "¿Cuál de las siguientes es una variación PERMUTATIVA?",
    options: [
      "Vender mercaderías obteniendo una ganancia",
      "Cobrar en efectivo un crédito a un cliente",
      "Pagar sueldos del personal",
      "Sufrir la pérdida de mercaderías por un incendio",
    ], correct: 1,
    explain: "Cobrar un crédito solo mueve cuentas de Activo (Caja sube, Deudores baja): no toca el Patrimonio Neto." },
  { q: "¿Cuál de las siguientes es una variación MODIFICATIVA?",
    options: [
      "Depositar efectivo en el banco",
      "Pagar la deuda a un proveedor",
      "Venta de mercaderías con ganancia",
      "Comprar un bien de uso a crédito",
    ], correct: 2,
    explain: "La venta con ganancia genera un resultado positivo que aumenta el PN: interviene una cuenta de resultado." },
  { q: "Un Responsable Inscripto le vende a un Consumidor Final. ¿Qué factura emite?",
    options: ["Factura A", "Factura B", "Factura C", "Factura M"], correct: 1,
    explain: "RI a Consumidor Final o Exento → Factura B (no discrimina IVA)." },
  { q: "Un Monotributista le vende a un Responsable Inscripto. ¿Qué factura emite?",
    options: ["Factura A", "Factura B", "Factura C", "No puede facturar"], correct: 2,
    explain: "El Monotributista siempre emite Factura C, sin importar quién sea el destinatario." },
  { q: "¿Qué documento acompaña físicamente la entrega de la mercadería?",
    options: ["Factura", "Remito", "Recibo \"X\"", "Orden de Compra"], correct: 1,
    explain: "El Remito confecciona el vendedor y acompaña la entrega; el comprador lo firma de conformidad." },
  { q: "El IVA que la empresa paga en sus COMPRAS se llama…",
    options: ["Débito Fiscal", "Crédito Fiscal", "IVA exento", "Retención"], correct: 1,
    explain: "Crédito Fiscal es el IVA pagado en compras; Débito Fiscal es el IVA cobrado en ventas." },
  { q: "¿Cuál es el plazo de presentación de un cheque común desde su emisión?",
    options: ["15 días", "30 días corridos", "60 días", "360 días"], correct: 1,
    explain: "El cheque común tiene 30 días corridos de plazo de presentación desde la emisión." },
  { q: "El Pagaré se transfiere mediante…",
    options: ["Cesión civil", "Endoso", "Escritura pública", "No se puede transferir"], correct: 1,
    explain: "El endoso es el acto por el cual se transfieren los derechos de cobro firmando al dorso del documento." },
  { q: "Las cuentas regularizadoras de PASIVO tienen saldo…",
    options: ["Deudor", "Acreedor", "Nulo siempre", "Depende del caso"], correct: 0,
    explain: "A diferencia de las regularizadoras de activo (saldo acreedor), las de pasivo siempre tienen saldo deudor." },
  { q: "Mercaderías destruidas por un incendio, sin seguro, generan una variación…",
    options: ["Permutativa", "Modificativa (pérdida)", "No genera variación", "Modificativa (ganancia)"], correct: 1,
    explain: "Es una pérdida extraordinaria: disminuye el Activo y, al no haber contrapartida, también el Patrimonio Neto." },
  { q: "En el Plan de Cuentas, el ACTIVO se ordena según…",
    options: ["Exigibilidad", "Liquidez", "Orden alfabético", "Antigüedad"], correct: 1,
    explain: "El Activo se ordena de lo más líquido a lo menos líquido. El Pasivo, en cambio, según exigibilidad." },
  { q: "La RT 54 de FACPCE es conocida como…",
    options: [
      "Norma Unificada Argentina de Contabilidad (NUA)",
      "Código de Comercio",
      "Ley General de Sociedades",
      "Plan de Cuentas Nacional",
    ], correct: 0,
    explain: "La RT 54 (\"NUA\") unificó y reemplazó a varias resoluciones técnicas anteriores como marco conceptual y normas de medición vigentes." },
];

const COMPROBANTES = [
  { situacion: "Compra de mercaderías a crédito a otro Responsable Inscripto. Documento que recibe el comprador.",
    options: ["Factura \"A\" original", "Factura \"B\" original", "Remito", "Recibo \"X\""], correct: 0,
    explain: "RI a RI → Factura A. El comprador se queda con el original; el vendedor archiva el duplicado." },
  { situacion: "Pago de esa factura. Documento que recibe quien paga.",
    options: ["Factura duplicado", "Recibo \"X\" original", "Nota de crédito", "Pagaré"], correct: 1,
    explain: "El que cobra entrega el Recibo X original a quien le pagó, como constancia del cobro." },
  { situacion: "Recibe las mercaderías solicitadas al proveedor (entrega física).",
    options: ["Orden de Compra", "Remito firmado de conformidad", "Factura", "Boleta de depósito"], correct: 1,
    explain: "El Remito acompaña la mercadería; el comprador lo firma para conformar la recepción." },
  { situacion: "Recibe el documento que determina el importe adeudado y las condiciones de pago.",
    options: ["Remito", "Orden de Compra", "Factura", "Ticket"], correct: 2,
    explain: "La Factura es el comprobante que comunica el importe de la operación y, si es a plazo, sus condiciones." },
  { situacion: "Venta a un Consumidor Final por mostrador, con controlador fiscal.",
    options: ["Factura \"A\"", "Ticket (tique fiscal)", "Remito", "Carta de crédito"], correct: 1,
    explain: "Para ventas a Consumidor Final por controlador fiscal se usa el Ticket; también podría usarse Factura B." },
  { situacion: "Compra de mercaderías a un Monotributista.",
    options: ["Factura \"A\"", "Factura \"B\"", "Factura \"C\"", "Factura \"M\""], correct: 2,
    explain: "El Monotributista siempre emite Factura C, sin discriminar IVA." },
  { situacion: "El proveedor avisa que facturó de menos y debe cobrar un importe adicional.",
    options: ["Nota de Crédito", "Nota de Débito", "Recibo \"X\"", "Factura B"], correct: 1,
    explain: "La Nota de Débito comunica un AUMENTO de la deuda del comprador." },
  { situacion: "El proveedor avisa que acepta la devolución de mercadería y disminuye la deuda.",
    options: ["Nota de Débito", "Nota de Crédito", "Remito", "Pagaré"], correct: 1,
    explain: "La Nota de Crédito comunica una DISMINUCIÓN de la deuda (devolución, bonificación, error de facturación)." },
  { situacion: "Compra a plazo y el comprador firma un compromiso formal de pago futuro.",
    options: ["Cheque", "Pagaré", "Recibo \"X\"", "Boleta de depósito"], correct: 1,
    explain: "El Pagaré es la promesa pura y simple de pagar una suma de dinero en un plazo determinado." },
  { situacion: "Se entrega una orden de pago librada contra un banco, con dos fechas distintas (emisión y cobro).",
    options: ["Cheque común", "Cheque de pago diferido", "Pagaré", "E-cheq al portador"], correct: 1,
    explain: "Tener dos fechas distintas (emisión ≠ cobro) es la característica que define al cheque de pago diferido." },
  { situacion: "Se deposita dinero en efectivo en la cuenta bancaria de la empresa.",
    options: ["Boleta de depósito", "Carta de crédito", "Ticket", "Recibo \"X\""], correct: 0,
    explain: "La Boleta de Depósito respalda el ingreso de dinero al banco; se emite en 2 ejemplares." },
  { situacion: "Cliente Responsable Inscripto al que ya se le facturó, y ahora paga su saldo.",
    options: ["Se le entrega una nueva factura", "Se le entrega Recibo \"X\" original", "Se le entrega un Remito", "No se emite ningún comprobante"], correct: 1,
    explain: "El cobro de una venta ya facturada se respalda con un Recibo \"X\", no con una nueva factura." },
];

const VARIACIONES = [
  { hecho: "Se cobra el 70% de los créditos a clientes, en efectivo.",
    correct: "Permutativa",
    explain: "Sube Caja, baja Deudores por Ventas. Solo cuentas de Activo: no toca el PN." },
  { hecho: "Se abona la totalidad de la deuda por sueldos, con débito automático bancario.",
    correct: "Permutativa",
    explain: "Baja el Pasivo (Sueldos a Pagar) y baja el Activo (Banco) por el mismo importe." },
  { hecho: "Venta de mercaderías por $230.000 (50% efectivo, 50% cheque a 15 días). Costo de la mercadería vendida: $135.000.",
    correct: "Modificativa",
    explain: "Hay un ingreso por la venta (ganancia, sube el PN) y un gasto por el costo de la mercadería vendida (pérdida, baja el PN): intervienen cuentas de resultado." },
  { hecho: "Se paga en efectivo el saldo adeudado a un proveedor.",
    correct: "Permutativa",
    explain: "Baja el Pasivo (Proveedores) y baja el Activo (Caja). No hay ganancia ni pérdida." },
  { hecho: "Se compra una notebook a crédito a 60 días.",
    correct: "Permutativa",
    explain: "Sube el Activo (Bienes de Uso) y sube el Pasivo (Proveedores/Acreedores) por igual monto." },
  { hecho: "Se abre una cuenta en una billetera virtual, ingresando dinero por débito automático desde el banco.",
    correct: "Permutativa",
    explain: "Es una transferencia entre dos cuentas de Activo: baja Banco, sube Billetera Virtual." },
  { hecho: "Mercaderías de la empresa se destruyen por un incendio. No había seguro vigente.",
    correct: "Modificativa",
    explain: "Es una pérdida extraordinaria: baja el Activo (Mercaderías) sin contrapartida, por lo que también baja el PN." },
  { hecho: "Se declara la incobrabilidad de un cliente por haber entrado en estado de insolvencia.",
    correct: "Modificativa",
    explain: "Es una pérdida por incobrables: baja el Activo (Deudores por Ventas) y baja el PN." },
  { hecho: "Se cobra el saldo pendiente de una venta ya facturada anteriormente.",
    correct: "Permutativa",
    explain: "Sube Caja/Banco y baja Deudores por Ventas. El resultado de esa venta ya se reconoció antes, al facturarla." },
];

/* ============================== HELPERS ============================== */

function unitMeta(id) {
  return UNITS.find((u) => u.id === id) || UNITS[0];
}

function Stamp({ ok, big }) {
  return (
    <div className={`stamp ${ok ? "stamp-ok" : "stamp-no"} ${big ? "stamp-big" : ""}`}>
      {ok ? "CORRECTO" : "A REVISAR"}
    </div>
  );
}

function ProgressDots({ total, current, results }) {
  return (
    <div className="progress-row">
      {Array.from({ length: total }).map((_, i) => {
        let cls = "dot";
        if (i < current) cls += results[i] ? " dot-ok" : " dot-no";
        else if (i === current) cls += " dot-active";
        return <span key={i} className={cls} />;
      })}
    </div>
  );
}

function ScoreCard({ score, total, onRestart, label }) {
  const pct = Math.round((score / total) * 100);
  const pass = pct >= 60;
  return (
    <div className="score-card">
      <div className={`score-circle ${pass ? "circle-ok" : "circle-no"}`}>
        <span className="score-num">{score}</span>
        <span className="score-den">/ {total}</span>
      </div>
      <h3 className="score-title">{label}</h3>
      <p className="score-msg">
        {pass
          ? "Buen puntaje — repasá lo que falló y seguís sumando."
          : "Por debajo del 60%. Volvé al resumen de esos temas y reintentá."}
      </p>
      <button className="btn btn-primary" onClick={onRestart}>
        <RotateCcw size={16} /> Reintentar
      </button>
    </div>
  );
}

/* ============================== FLASHCARDS TAB ============================== */

function Resumen() {
  const [filter, setFilter] = useState("all");
  const [flipped, setFlipped] = useState(new Set());

  const cards = useMemo(
    () => (filter === "all" ? FLASHCARDS : FLASHCARDS.filter((c) => c.unit === filter)),
    [filter]
  );

  function toggle(i) {
    setFlipped((prev) => {
      const next = new Set(prev);
      const key = filter + i;
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  return (
    <div>
      <div className="note-card">
        <Sparkles size={18} />
        <p>
          En el primer parcial, lo que más costó fue <strong>Unidad 2</strong> (definiciones de
          activo/pasivo/PN, variaciones patrimoniales) y la <strong>identificación de comprobantes</strong> de
          Unidad 3. Esas tarjetas están marcadas para repasar primero.
        </p>
      </div>

      <div className="chip-row">
        <button className={`chip ${filter === "all" ? "chip-active" : ""}`} onClick={() => setFilter("all")}>
          <Filter size={13} /> Todas
        </button>
        {UNITS.map((u) => (
          <button
            key={u.id}
            className={`chip ${filter === u.id ? "chip-active" : ""}`}
            style={filter === u.id ? { background: u.color, borderColor: u.color } : { borderColor: u.color, color: u.color }}
            onClick={() => setFilter(u.id)}
          >
            U{u.n} · {u.label}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {cards.map((c, i) => {
          const key = filter + i;
          const isFlipped = flipped.has(key);
          const meta = unitMeta(c.unit);
          return (
            <div className="flash-outer" key={key} onClick={() => toggle(i)}>
              <div className={`flash-inner ${isFlipped ? "is-flipped" : ""}`}>
                <div className="flash-face flash-front" style={{ borderColor: meta.color }}>
                  <span className="flash-tag" style={{ background: meta.color }}>U{meta.n}</span>
                  <p className="flash-text">{c.q}</p>
                  <span className="flash-hint">tocar para ver la respuesta</span>
                </div>
                <div className="flash-face flash-back" style={{ borderColor: meta.color, background: meta.color }}>
                  <p className="flash-text flash-answer">{c.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== QUIZ TAB ============================== */

function Quiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  const q = QUIZ[idx];

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
  }

  function next() {
    const ok = selected === q.correct;
    const newResults = [...results, ok];
    setResults(newResults);
    setSelected(null);
    if (idx + 1 < QUIZ.length) setIdx(idx + 1);
    else setDone(true);
  }

  function restart() {
    setIdx(0);
    setSelected(null);
    setResults([]);
    setDone(false);
  }

  if (done) {
    const score = results.filter(Boolean).length;
    return <ScoreCard score={score} total={QUIZ.length} onRestart={restart} label="Quiz teórico" />;
  }

  return (
    <div>
      <ProgressDots total={QUIZ.length} current={idx} results={results} />
      <div className="section-label">Pregunta {idx + 1} de {QUIZ.length}</div>
      <div className="quiz-card">
        <h3 className="quiz-q">{q.q}</h3>
        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = "option";
            if (selected !== null) {
              if (i === q.correct) cls += " option-correct";
              else if (i === selected) cls += " option-wrong";
            }
            return (
              <button key={i} className={cls} onClick={() => pick(i)}>
                <span className="option-letter">{String.fromCharCode(97 + i)}</span>
                <span>{opt}</span>
                {selected !== null && i === q.correct && <CheckCircle2 size={18} className="option-icon" />}
                {selected !== null && i === selected && i !== q.correct && <XCircle size={18} className="option-icon" />}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="explain-box">
            <Stamp ok={selected === q.correct} />
            <p>{q.explain}</p>
          </div>
        )}
        {selected !== null && (
          <button className="btn btn-primary btn-full" onClick={next}>
            {idx + 1 < QUIZ.length ? "Siguiente" : "Ver resultado"} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================== COMPROBANTES PRACTICE ============================== */

function ComprobantesPractice() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  const item = COMPROBANTES[idx];

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
  }
  function next() {
    const ok = selected === item.correct;
    const newResults = [...results, ok];
    setResults(newResults);
    setSelected(null);
    if (idx + 1 < COMPROBANTES.length) setIdx(idx + 1);
    else setDone(true);
  }
  function restart() {
    setIdx(0); setSelected(null); setResults([]); setDone(false);
  }

  if (done) {
    const score = results.filter(Boolean).length;
    return <ScoreCard score={score} total={COMPROBANTES.length} onRestart={restart} label="Práctica: comprobantes" />;
  }

  return (
    <div>
      <ProgressDots total={COMPROBANTES.length} current={idx} results={results} />
      <div className="section-label">Situación {idx + 1} de {COMPROBANTES.length}</div>
      <div className="quiz-card ticket-card">
        <div className="ticket-edge" />
        <Receipt size={20} className="ticket-icon" />
        <h3 className="quiz-q">{item.situacion}</h3>
        <div className="quiz-options">
          {item.options.map((opt, i) => {
            let cls = "option";
            if (selected !== null) {
              if (i === item.correct) cls += " option-correct";
              else if (i === selected) cls += " option-wrong";
            }
            return (
              <button key={i} className={cls} onClick={() => pick(i)}>
                <span className="option-letter">{String.fromCharCode(97 + i)}</span>
                <span>{opt}</span>
                {selected !== null && i === item.correct && <CheckCircle2 size={18} className="option-icon" />}
                {selected !== null && i === selected && i !== item.correct && <XCircle size={18} className="option-icon" />}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="explain-box">
            <Stamp ok={selected === item.correct} />
            <p>{item.explain}</p>
          </div>
        )}
        {selected !== null && (
          <button className="btn btn-primary btn-full" onClick={next}>
            {idx + 1 < COMPROBANTES.length ? "Siguiente" : "Ver resultado"} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================== VARIACIONES PRACTICE ============================== */

function VariacionesPractice() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  const item = VARIACIONES[idx];
  const options = ["Permutativa", "Modificativa"];

  function pick(opt) {
    if (selected !== null) return;
    setSelected(opt);
  }
  function next() {
    const ok = selected === item.correct;
    const newResults = [...results, ok];
    setResults(newResults);
    setSelected(null);
    if (idx + 1 < VARIACIONES.length) setIdx(idx + 1);
    else setDone(true);
  }
  function restart() {
    setIdx(0); setSelected(null); setResults([]); setDone(false);
  }

  if (done) {
    const score = results.filter(Boolean).length;
    return <ScoreCard score={score} total={VARIACIONES.length} onRestart={restart} label="Práctica: variaciones patrimoniales" />;
  }

  return (
    <div>
      <ProgressDots total={VARIACIONES.length} current={idx} results={results} />
      <div className="section-label">Hecho económico {idx + 1} de {VARIACIONES.length}</div>
      <div className="quiz-card">
        <h3 className="quiz-q">{item.hecho}</h3>
        <div className="quiz-options two-col">
          {options.map((opt) => {
            let cls = "option option-big";
            if (selected !== null) {
              if (opt === item.correct) cls += " option-correct";
              else if (opt === selected) cls += " option-wrong";
            }
            return (
              <button key={opt} className={cls} onClick={() => pick(opt)}>
                <span>{opt}</span>
                {selected !== null && opt === item.correct && <CheckCircle2 size={18} className="option-icon" />}
                {selected !== null && opt === selected && opt !== item.correct && <XCircle size={18} className="option-icon" />}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="explain-box">
            <Stamp ok={selected === item.correct} />
            <p>{item.explain}</p>
          </div>
        )}
        {selected !== null && (
          <button className="btn btn-primary btn-full" onClick={next}>
            {idx + 1 < VARIACIONES.length ? "Siguiente" : "Ver resultado"} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================== APP SHELL ============================== */

const TABS = [
  { id: "resumen", label: "Resumen", icon: BookOpen },
  { id: "quiz", label: "Quiz teórico", icon: GraduationCap },
  { id: "comprobantes", label: "Práctica · Comprobantes", icon: Receipt },
  { id: "variaciones", label: "Práctica · Variaciones", icon: Banknote },
];

export default function App() {
  const [tab, setTab] = useState("resumen");

  return (
    <div className="carpeta-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .carpeta-app {
          --paper: #F3ECDC;
          --paper-deep: #E9DEBE;
          --rule: #D2C09A;
          --ink: #28221B;
          --ink-soft: #6c6151;
          --green: #1F5C45;
          --green-deep: #143E32;
          --red: #A8311F;
          --gold: #9C6B14;
          font-family: 'IBM Plex Sans', sans-serif;
          color: var(--ink);
          max-width: 880px;
          margin: 0 auto;
          padding: 14px;
        }
        .carpeta-app * { box-sizing: border-box; }

        .header-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 18px;
          padding: 4px 4px 14px 4px;
          border-bottom: 2px solid var(--rule);
        }
        .header-icon {
          background: var(--green);
          color: #F3ECDC;
          border-radius: 10px;
          padding: 10px;
          flex-shrink: 0;
        }
        .header-title {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.15;
          margin: 0;
        }
        .header-sub {
          font-size: 0.82rem;
          color: var(--ink-soft);
          margin: 4px 0 0 0;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.02em;
        }

        .tabs-row {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .tab-btn {
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 600;
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          border: 2px solid var(--rule);
          border-bottom: none;
          border-radius: 10px 10px 0 0;
          background: var(--paper-deep);
          color: var(--ink-soft);
          cursor: pointer;
          position: relative;
          top: 2px;
          transition: all 0.15s ease;
        }
        .tab-btn:hover { color: var(--ink); }
        .tab-btn.tab-active {
          background: var(--paper);
          color: var(--green-deep);
          border-color: var(--green);
          top: 0;
          box-shadow: 0 -2px 0 0 var(--green) inset;
        }

        .panel {
          background: var(--paper);
          border: 2px solid var(--green);
          border-radius: 0 10px 10px 10px;
          padding: 22px;
          background-image: repeating-linear-gradient(
            to bottom, transparent, transparent 31px, var(--rule) 32px
          );
          min-height: 420px;
        }

        .note-card {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background: rgba(31, 92, 69, 0.08);
          border: 1.5px dashed var(--green);
          border-radius: 8px;
          padding: 12px 14px;
          margin-bottom: 16px;
          font-size: 0.88rem;
          color: var(--ink);
        }
        .note-card svg { color: var(--green); flex-shrink: 0; margin-top: 2px; }
        .note-card p { margin: 0; line-height: 1.45; }

        .chip-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
        .chip {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.74rem;
          font-weight: 500;
          display: flex; align-items: center; gap: 5px;
          padding: 6px 11px;
          border-radius: 999px;
          border: 1.5px solid var(--ink-soft);
          background: transparent;
          color: var(--ink-soft);
          cursor: pointer;
        }
        .chip-active { color: #fff !important; }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 14px;
        }
        .flash-outer { perspective: 1200px; cursor: pointer; height: 150px; }
        .flash-inner {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.5s cubic-bezier(.4,.2,.2,1);
          transform-style: preserve-3d;
        }
        .flash-inner.is-flipped { transform: rotateY(180deg); }
        .flash-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          border-radius: 10px;
          border: 2px solid;
          padding: 14px;
          display: flex; flex-direction: column;
        }
        .flash-front { background: #fffaf0; }
        .flash-back { transform: rotateY(180deg); color: #fff; justify-content: center; }
        .flash-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.66rem; font-weight: 700;
          color: #fff; padding: 2px 7px; border-radius: 4px;
          align-self: flex-start; margin-bottom: 8px;
        }
        .flash-text { font-size: 0.86rem; line-height: 1.4; margin: 0; flex: 1; }
        .flash-answer { font-size: 0.82rem; }
        .flash-hint {
          font-size: 0.68rem; color: var(--ink-soft);
          font-style: italic; margin-top: 6px;
        }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.78rem; color: var(--ink-soft);
          margin-bottom: 10px;
        }
        .progress-row { display: flex; gap: 5px; margin-bottom: 10px; flex-wrap: wrap; }
        .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--rule); display: inline-block; }
        .dot-ok { background: var(--green); }
        .dot-no { background: var(--red); }
        .dot-active { background: var(--gold); transform: scale(1.3); }

        .quiz-card { background: #fffaf0; border: 2px solid var(--ink); border-radius: 10px; padding: 20px; position: relative; }
        .ticket-card { border-style: dashed; }
        .ticket-icon { color: var(--green); margin-bottom: 8px; }
        .quiz-q {
          font-family: 'Fraunces', serif; font-weight: 600;
          font-size: 1.05rem; line-height: 1.4; margin: 0 0 16px 0;
        }
        .quiz-options { display: flex; flex-direction: column; gap: 9px; }
        .quiz-options.two-col { flex-direction: row; flex-wrap: wrap; }
        .option {
          display: flex; align-items: center; gap: 10px;
          text-align: left;
          padding: 11px 13px;
          border: 1.5px solid var(--ink-soft);
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          font-size: 0.86rem;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: all 0.12s ease;
        }
        .option:hover { border-color: var(--green); background: #f5f1e4; }
        .option-big { flex: 1; min-width: 150px; justify-content: center; font-weight: 600; font-size: 0.95rem; }
        .option-letter {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 700; color: var(--ink-soft);
          width: 18px; flex-shrink: 0;
        }
        .option-icon { margin-left: auto; flex-shrink: 0; }
        .option-correct { border-color: var(--green); background: rgba(31,92,69,0.12); color: var(--green-deep); }
        .option-wrong { border-color: var(--red); background: rgba(168,49,31,0.10); color: var(--red); }

        .explain-box {
          margin-top: 16px; padding: 13px 14px;
          border-left: 3px solid var(--gold);
          background: rgba(156,107,20,0.08);
          border-radius: 0 8px 8px 0;
          font-size: 0.84rem; line-height: 1.5;
          display: flex; gap: 12px; align-items: flex-start;
          flex-wrap: wrap;
        }
        .explain-box p { margin: 0; flex: 1; min-width: 180px; }

        .stamp {
          font-family: 'Fraunces', serif;
          font-weight: 800;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          border: 2.5px solid;
          border-radius: 6px;
          padding: 5px 9px;
          transform: rotate(-6deg);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .stamp-ok { color: var(--green); border-color: var(--green); }
        .stamp-no { color: var(--red); border-color: var(--red); }
        .stamp-big { font-size: 1.1rem; padding: 8px 16px; }

        .btn {
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 600; font-size: 0.86rem;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 18px; border-radius: 8px;
          border: none; cursor: pointer;
        }
        .btn-primary { background: var(--green); color: #fff; }
        .btn-primary:hover { background: var(--green-deep); }
        .btn-full { width: 100%; justify-content: center; margin-top: 14px; }

        .score-card {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 30px 10px;
        }
        .score-circle {
          width: 130px; height: 130px; border-radius: 50%;
          border: 4px solid;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transform: rotate(-3deg);
        }
        .circle-ok { border-color: var(--green); color: var(--green-deep); }
        .circle-no { border-color: var(--red); color: var(--red); }
        .score-num { font-family: 'Fraunces', serif; font-size: 2.2rem; font-weight: 800; line-height: 1; }
        .score-den { font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem; }
        .score-title { font-family: 'Fraunces', serif; margin: 0 0 6px 0; }
        .score-msg { font-size: 0.86rem; color: var(--ink-soft); max-width: 320px; margin: 0 0 18px 0; }

        @media (max-width: 540px) {
          .header-title { font-size: 1.2rem; }
          .panel { padding: 14px; }
          .quiz-options.two-col { flex-direction: column; }
        }
      `}</style>

      <div className="header-row">
        <div className="header-icon"><FolderOpen size={26} /></div>
        <div>
          <h1 className="header-title">Carpeta del Recuperatorio</h1>
          <p className="header-sub">CONTABILIDAD I · UNIDADES 1–4 · RT 54 FACPCE (NUA)</p>
        </div>
      </div>

      <div className="tabs-row">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? "tab-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="panel">
        {tab === "resumen" && <Resumen />}
        {tab === "quiz" && <Quiz />}
        {tab === "comprobantes" && <ComprobantesPractice />}
        {tab === "variaciones" && <VariacionesPractice />}
      </div>
    </div>
  );
}
