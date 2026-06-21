import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';

export default function ProfesorIA() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "¡Hola Leonnel! Soy tu Profesor Virtual de Contabilidad I. Estoy acá para explicarte cualquier tema de las Unidades 1 a 5 con ejemplos prácticos de la calle. ¿Qué concepto o regla de imputación querés repasar hoy?" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      let botResponse = "Es un tema excelente. Para entenderlo a nivel de examen de la UGD, pensalo con este ejemplo: Imaginá una distribuidora de alimentos acá en Posadas. Si compra un camión de mercaderías a crédito, el camión entra al Activo porque tiene un valor de uso y controlamos sus beneficios futuros, pero en paralelo nos nace una Obligación a Pagar (Pasivo) con el fabricante. Es un hecho permutativo puro.";
      
      const t = userText.toLowerCase();
      if (t.includes('devengado') || t.includes('devengamiento')) {
        botResponse = "¡El famoso devengamiento! Grabátelo así: Las pérdidas y ganancias se registran cuando ocurren temporalmente, no cuando se mueve la plata. Ejemplo de examen: Si los empleados de tu local trabajan todo el mes de mayo, el gasto de sueldos se 'devengó' en mayo y lo tenés que registrar ahí, aunque la plata física se las pagues recién el 5 de junio. Afecta al resultado de mayo sí o sí.";
      } else if (t.includes('rt 54') || t.includes('norma')) {
        botResponse = "La RT 54 es clave porque es la nueva norma unificada de exposición contable. Su fin es simplificar la presentación de los estados contables para que sean más legibles, eliminando redundancias y unificando criterios de los rubros que estudiamos en la Unidad V (como Caja y Bancos o Créditos).";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto h-[500px] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
      {/* Top Banner del Chat */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-500/15 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1">
              Tutor Contable Inteligente <Sparkles className="w-3 h-3 text-emerald-400" />
            </h4>
            <span className="text-[10px] text-emerald-400 font-medium">Línea activa de consulta • Cátedra UGD</span>
          </div>
        </div>
      </div>

      {/* Caja de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/30">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-xl border shrink-0 h-max ${
              m.role === 'user' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}>
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
              m.role === 'user' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-tr-none' : 'bg-slate-900 text-slate-200 border border-slate-800/60 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="p-2 bg-slate-900 text-slate-400 border border-slate-800 rounded-xl shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-900 border border-slate-800/60 px-4 py-2.5 rounded-2xl rounded-tl-none text-xs text-slate-500 font-medium animate-pulse">
              El profesor está redactando una explicación...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de Envíos */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Preguntale al profesor sobre devengamiento, variaciones patrimoniales o cuentas..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          onClick={handleSend}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-2 rounded-xl transition-colors shrink-0 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}