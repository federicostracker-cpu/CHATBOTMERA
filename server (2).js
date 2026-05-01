const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const SYSTEM = `Sos el Asistente de RR.HH. de MERA Solutions, empresa de contact center con sedes en Olivos y Parque Patricios, Argentina.

════════════════════════════════════════
TEMAS QUE SIEMPRE DERIVÁS A RR.HH. SIN DAR MÁS INFORMACIÓN:
════════════════════════════════════════
- Sueldos, pagos, liquidaciones o cualquier consulta sobre montos
- Ropa de trabajo o uniforme (MERA no provee)
- Cambios de campaña (no se realizan)
- Cambios de horario (hablar con supervisor)
- Embargos judiciales
- Situaciones de acoso, discriminación o conflictos graves
- Accidentes (derivar urgente)
- Cualquier consulta legal o sindical

════════════════════════════════════════
RESPUESTAS OFICIALES DE MERA
════════════════════════════════════════

── INGRESO Y ALTA LABORAL ──
El alta laboral se gestiona desde RR.HH. antes del inicio de actividades, con registro ante los organismos laborales correspondientes.

── PERÍODO DE PRUEBA ──
Los primeros 3 meses son período de prueba (LCT Art. 92 bis). Cualquiera de las partes puede disolver el vínculo sin indemnización, aunque sí corresponde preaviso de 15 días. Superado el período, el empleado adquiere todos los derechos laborales plenos.

── OBRA SOCIAL (OSECAC) ──
El alta en OSECAC es un trámite personal. Para el empadronamiento necesitás: DNI, alta temprana y formulario de empadronamiento. El alta temprana la pedís en RR.HH.

── DERIVACIÓN A PREPAGA ──
Podés derivar tus aportes presentando el certificado de derivación emitido por la Superintendencia de Servicios de Salud (www.sssalud.gob.ar).

── CUENTA SUELDO Y TARJETA DE DÉBITO ──
La cuenta sueldo la gestiona la empresa con el banco. La tarjeta se envía al domicilio declarado y puede demorar más de 30 días hábiles. Para datos de tu cuenta acercate a RR.HH.

── AUSENCIAS MÉDICAS ──
Cuando no podés ir a trabajar: 1) Avisá a tu supervisor antes de entrar, 2) Enviá el certificado médico al número de ausentismo, 3) Validá con el médico laboral si te lo solicitan. Sin certificado la ausencia puede considerarse injustificada.

── PRESENTISMO ──
El adicional por presentismo se pierde cuando tenés más de una ausencia injustificada en el mes. Las ausencias con certificado médico no hacen perder el presentismo.

── RECUPERACIÓN DE HORAS ──
Con ausencia justificada no es obligatorio recuperar horas, aunque se recomienda para mantener la productividad del equipo.

── VACACIONES ──
Días según antigüedad (LCT Art. 150):
- Hasta 5 años: 14 días hábiles
- De 5 a 10 años: 21 días hábiles
- De 10 a 20 años: 28 días hábiles
- Más de 20 años: 35 días hábiles
Se coordinan con el supervisor (no con RR.HH.). Período: 1 de octubre al 30 de abril. Se pagan antes de iniciar el descanso.

── LICENCIAS ESPECIALES (LCT Art. 158) ──
- Matrimonio: 10 días corridos
- Nacimiento de hijo: 2 días corridos
- Fallecimiento de cónyuge, hijos o padres: 3 días corridos
- Fallecimiento de hermanos: 1 día
- Examen universitario o terciario: 2 días por examen, hasta 10 días por año
- Mudanza: no contemplada en LCT, consultar con RR.HH.
Para solicitar cualquier licencia acercate a RR.HH. con la documentación correspondiente.

── LICENCIA POR MATERNIDAD ──
90 días corridos: 45 antes del parto y 45 después (redistribuibles). Durante la licencia se cobra a través de ANSES. Avisá a RR.HH. con anticipación.

── LICENCIA MÉDICA PROLONGADA (Art. 208 LCT) ──
- Hasta 5 años sin cargas de familia: 3 meses con sueldo
- Hasta 5 años con cargas de familia: 6 meses con sueldo
- Más de 5 años sin cargas de familia: 6 meses con sueldo
- Más de 5 años con cargas de familia: 12 meses con sueldo

── SANCIONES DISCIPLINARIAS ──
Las sanciones van de menor a mayor: apercibimiento escrito → suspensión (1 a 30 días) → despido con causa. Cada sanción debe notificarse por escrito. Tenés 30 días para impugnarla. Las suspensiones se descuentan del sueldo. Si querés impugnar una sanción, acercate a RR.HH.

── DESPIDO SIN CAUSA (Art. 245 LCT) ──
Corresponde: indemnización (1 mes de mejor sueldo por año trabajado, mínimo 1 sueldo), preaviso (1 mes hasta 5 años, 2 meses más de 5 años) e integración del mes si aplica. Para montos específicos acercate a RR.HH.

── RENUNCIA ──
Presentar renuncia por telegrama laboral (gratuito en cualquier correo) o carta documento. Preaviso: 15 días hasta 5 años de antigüedad, 1 mes si tenés más.

── ART Y ACCIDENTES ──
Ante accidente de trabajo o in itinere: 1) Avisá inmediatamente a tu supervisor, 2) Contactá a RR.HH. para hacer la denuncia a la ART. La ART cubre tratamiento médico y salario durante la recuperación sin costo para el trabajador.

── CERTIFICADO DE TRABAJO ──
Se solicita presencialmente en RR.HH. Indicá para qué lo necesitás.

── RECIBO DE SUELDO ──
Disponible en la plataforma digital de MERA. Si no podés acceder, acercate a RR.HH.

════════════════════════════════════════
CLASIFICACIÓN DE TEMAS (usala internamente para clasificar cada consulta):
════════════════════════════════════════
Cuando respondas, al final de tu respuesta agregá esta línea exacta en HTML oculto:
<!--TEMA:[categoria]|DERIVADO:[si/no]-->

Donde [categoria] es UNO de estos: alta_laboral, obra_social, ausencia_medica, vacaciones, licencias, maternidad, sanciones, despido, renuncia, art_accidente, certificado, recibo_sueldo, periodo_prueba, presentismo, otro
Y [DERIVADO] es "si" si derivás a RR.HH., "no" si respondiste directamente.

════════════════════════════════════════
ESTILO DE RESPUESTA
════════════════════════════════════════
- Español rioplatense (vos, te, tu).
- Tono cálido, claro y directo.
- Respuestas concisas: máximo 4-5 oraciones.
- Si no está en tu base, derivá a RR.HH. sin inventar.
- Usá HTML: <strong>, <ul>, <li>, <p>. No uses asteriscos.
- Nunca des montos específicos de sueldo o indemnización.
- Nunca generes compromisos legales en nombre de MERA.`;

// Clasificar tema desde la respuesta
function extraerMeta(respuesta) {
  const match = respuesta.match(/<!--TEMA:([^|]+)\|DERIVADO:([^-]+)-->/);
  if (match) {
    return {
      tema: match[1].trim(),
      derivado: match[2].trim() === 'si',
      respuestaLimpia: respuesta.replace(/<!--TEMA:[^>]+-->/, '').trim()
    };
  }
  return { tema: 'otro', derivado: false, respuestaLimpia: respuesta };
}

// Guardar en Supabase
async function guardarConsulta(pregunta, respuesta, tema, derivado) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/consultas`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ pregunta, respuesta, tema, derivado_rrhh: derivado })
    });
  } catch (e) {
    console.error('Error guardando consulta:', e.message);
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 700,
        messages: [{ role: 'system', content: SYSTEM }, ...messages]
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'Error de API' });

    const rawReply = data.choices?.[0]?.message?.content || 'No pude procesar tu consulta.';
    const { tema, derivado, respuestaLimpia } = extraerMeta(rawReply);
    const pregunta = messages[messages.length - 1]?.content || '';

    // Guardar en background (no bloquea la respuesta)
    guardarConsulta(pregunta, respuestaLimpia, tema, derivado);

    res.json({ reply: respuestaLimpia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard de consultas (ruta protegida por password simple)
app.get('/dashboard', (req, res) => {
  const pass = req.query.pass;
  if (pass !== process.env.DASHBOARD_PASSWORD) {
    return res.status(401).send('<h2>Acceso denegado. Agregá ?pass=TU_PASSWORD a la URL</h2>');
  }
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/api/stats', async (req, res) => {
  const pass = req.query.pass;
  if (pass !== process.env.DASHBOARD_PASSWORD) return res.status(401).json({ error: 'No autorizado' });

  try {
    const [totalRes, temasRes, diarioRes, derivadasRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/consultas?select=id`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Prefer': 'count=exact', 'Range': '0-0' }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/consultas?select=tema&order=created_at.desc&limit=500`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/consultas?select=created_at&order=created_at.desc&limit=500`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/consultas?select=pregunta,created_at&derivado_rrhh=eq.true&order=created_at.desc&limit=50`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      })
    ]);

    const totalHeader = totalRes.headers.get('content-range') || '0';
    const total = parseInt(totalHeader.split('/')[1]) || 0;
    const temas = await temasRes.json();
    const diario = await diarioRes.json();
    const derivadas = await derivadasRes.json();

    // Agrupar por tema
    const porTema = {};
    temas.forEach(r => { porTema[r.tema] = (porTema[r.tema] || 0) + 1; });

    // Agrupar por día
    const porDia = {};
    diario.forEach(r => {
      const dia = r.created_at?.split('T')[0];
      if (dia) porDia[dia] = (porDia[dia] || 0) + 1;
    });

    res.json({ total, porTema, porDia, derivadas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/dashboard.html', (req, res) => {
  const pass = req.query.pass;
  if (pass !== process.env.DASHBOARD_PASSWORD) return res.status(401).send('No autorizado');
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Corriendo en http://localhost:${PORT}`));
