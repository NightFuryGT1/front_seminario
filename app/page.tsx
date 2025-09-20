// app/page.tsx — Landing one-page para escuela primaria usando Next.js + Material UI Grid

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar,Toolbar, IconButton, Typography, Button, Box, Container, Grid, Stack, Card, CardContent, CardMedia, Tabs, Tab, Chip,
  Accordion, AccordionSummary, AccordionDetails, TextField, MenuItem, Snackbar, Alert, Dialog, DialogContent, 
  Divider, Tooltip, Badge, CssBaseline } from '@mui/material';
  import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import SchoolIcon from '@mui/icons-material/School';
import ShieldIcon from '@mui/icons-material/Shield';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
//import { auth } from '../../auth';
import { redirect } from 'next/navigation';

// ===== Configuración de marca y constantes =====
const PHONE = '+502 59679733';
const WHATSAPP_NUMBER = '59679733'; // solo dígitos para wa.me
const WHATSAPP_MSG = encodeURIComponent('Hola, me gustaría agendar una visita al campus.');
const CALENDLY_URL = 'https://calendly.com/tucuenta/visita-campus';

// PDF en /public/pdfs
const PDF_PENSUM_URL = '/pdfs/pensum.pdf';
const PDF_REGLAMENTO_URL = '/pdfs/reglamento.pdf';

// Imágenes en /public/img
const HERO_IMG = '/img/3334.jpg';
const GALLERY = [
  '/img//img/3334.jpg',
  '/img/galeria2.webp',
  '/img/galeria3.webp',
  '/img/galeria4.webp',
  '/img/galeria5.webp',
  '/img/galeria6.webp',
  '/img/galeria7.webp',
  '/img/galeria8.webp',
  '/img/galeria9.webp',
];

// ===== Tema y modo de color =====
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2878C9',
      light: '#5CA0EC',
      dark: '#165D9E',
      contrastText: '#FFFFFF',
    },
    // Acento cálido para energía y llamadas a la acción
    secondary: {
      main: '#F6B500',
      light: '#FFD35E',
      dark: '#B37700',
      contrastText: '#0F172A',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F6F8FC',
    },
    // Texto oscuro para legibilidad AA sobre blanco y “paper”
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      disabled: '#94A3B8',
    },
    error: { main: '#E53935' },
    warning: { main: '#F59E0B' },
    info: { main: '#0EA5E9' },
    success: { main: '#22C55E' },
    divider: 'rgba(15,23,42,0.12)',
    action: {
      hover: 'rgba(40,120,201,0.08)',
      selected: 'rgba(40,120,201,0.12)',
      focus: 'rgba(40,120,201,0.20)',
      disabledOpacity: 0.38,
    },
    contrastThreshold: 3,
    tonalOffset: 0.1,
  },

  typography: {
    fontFamily:
      '"Nunito", "Inter", "Roboto", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    fontSize: 15,
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    subtitle1: { color: '#475569' },
    button: { fontWeight: 700 },
    body1: { lineHeight: 1.65 },
    body2: { lineHeight: 1.65 },
  },

  shape: { borderRadius: 14 },

  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 12, height: 44 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
  },
});




// ===== Util: ancla scroll suave =====
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ===== Header fijo =====
function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const items = [
    { id: 'beneficios', label: 'Beneficios' },
     { id: 'institucional', label: 'Institucional' },
    { id: 'metodologia', label: 'Metodología' },
    { id: 'vida', label: 'Vida escolar' },
    { id: 'admision', label: 'Admisión' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacto', label: 'Contacto' },
  ];
  return (
    <AppBar position="fixed" color="inherit" elevation={1} sx={{ backdropFilter: 'saturate(180%) blur(8px)' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => scrollToId('inicio')}>
          <Image src="/img/logo.png" alt="Logo de la escuela" width={48} height={48} />
          <Typography variant="h6" fontWeight={700}>Escuela Oficial Rural Mixta Ruben Dario Escobar Ruiz, Canton el Milagro</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {items.map((i) => (
            <Button key={i.id} onClick={() => scrollToId(i.id)}>{i.label}</Button>
          ))}
          <Button variant="contained" color="secondary" href={CALENDLY_URL} target="_blank" rel="noopener" aria-label="Agendar visita">Agendar visita</Button>
          <Button variant="outlined" href="#admision" onClick={() => scrollToId('admision')} aria-label="Admisiones">Admisiones</Button>
          <Tooltip title="ES/EN">
            <IconButton aria-label="Cambiar idioma"><LanguageIcon /></IconButton>
          </Tooltip>
          <Tooltip title={PHONE}>
            <IconButton component="a" href={`tel:${PHONE.replace(/\s/g, '')}`} aria-label="Llamar"><PhoneInTalkIcon /></IconButton>
          </Tooltip>
          <Tooltip title="WhatsApp">
            <IconButton component="a" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener" aria-label="WhatsApp">
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {/* Mobile actions */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
          <Badge color="secondary" variant="dot">
            <IconButton component="a" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} aria-label="WhatsApp"><WhatsAppIcon /></IconButton>
          </Badge>
          <IconButton onClick={() => setMobileOpen((v) => !v)} aria-label="Abrir menú"><MenuIcon /></IconButton>
        </Box>
      </Toolbar>
      {/* Mobile drawer simple */}
      {mobileOpen && (
        <Box sx={{ px: 2, pb: 2, display: { md: 'none' } }}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={1}>
            {items.map((i) => (
              <Grid key={i.id} size={{ xs: 4 }}>
                <Button fullWidth onClick={() => { scrollToId(i.id); setMobileOpen(false); }}>{i.label}</Button>
              </Grid>
            ))}
            <Grid size={{ xs: 4 }}>
              <Button fullWidth variant="contained" color="secondary" href={CALENDLY_URL} target="_blank">Agendar visita</Button>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Button fullWidth variant="outlined" onClick={() => { scrollToId('admision'); setMobileOpen(false); }}>Admisiones</Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </AppBar>
  );
}

// ===== Hero =====
function Hero() {
  return (
    <Box id="inicio" component="section" sx={{ pt: { xs: 10, md: 12 }, pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 3, md: 6 }} alignItems="center">
          <Grid size={{ xs: 4, md: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h2" fontWeight={800} sx={{ fontSize: { xs: 36, md: 48 } }}>
                Educación integral con valores y tecnología
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: 18, md: 20 } }}>
                Primaria bilingüe, grupos pequeños y ambiente seguro para desarrollar habilidades del siglo XXI.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button size="large" variant="contained" color="secondary" href={CALENDLY_URL} target="_blank">Agendar visita</Button>
                <Button size="large" variant="outlined" onClick={() => scrollToId('contacto')}>Solicitar información</Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 4, md: 6 }}>
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
              <Image src={HERO_IMG} alt="Niños aprendiendo en el campus" fill sizes="(max-width: 768px) 100vw, 50vw" priority />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ===== Beneficios =====
function Beneficios() {
  const beneficios = [
    { icon: <SchoolIcon />, t: 'Docentes expertos' },
    { icon: <ShieldIcon />, t: 'Seguridad 24/7' },
    { icon: <GroupsIcon />, t: 'Grupos pequeños' },
    { icon: <LanguageIcon />, t: 'Bilingüe' },
    { icon: <VerifiedIcon />, t: 'Acreditaciones' },
    { icon: <AccessTimeIcon />, t: 'Horario extendido' },
  ];
  return (
    <Box id="beneficios" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h3" fontWeight={800}>Beneficios clave</Typography>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }}>
            {beneficios.map((b) => (
              <Grid key={b.t} size={{ xs: 4, sm: 4, md: 4 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={1.5} direction="row" alignItems="center">
                      <Box aria-hidden>{b.icon}</Box>
                      <Typography variant="h6">{b.t}</Typography>
                    </Stack>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>Beneficio explicado en una línea.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

// ===== Metodología (Tabs/Pills) =====
function Metodologia() {
  const [tab, setTab] = React.useState(0);
  return (
    <Box id="metodologia" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>Programas y metodología</Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons allowScrollButtonsMobile aria-label="Secciones de metodología">
          <Tab label="Grados" />
          <Tab label="Enfoque" />
          <Tab label="Horarios" />
          <Tab label="Pensum" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {tab === 0 && (
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={3}>
              {['1º', '2º', '3º', '4º', '5º', '6º'].map((g) => (
                <Grid key={g} size={{ xs: 4, sm: 4, md: 4 }}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircleIcon color="primary" />
                        <Typography variant="h6">Grado {g}</Typography>
                      </Stack>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>Grupos de 20 alumnos máx.</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {tab === 1 && (
            <Stack spacing={2}>
              <Typography>Aprendizaje activo, proyectos STEAM, enfoque socioemocional y bilingüe.</Typography>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
                {['STEAM', 'Lectoescritura', 'Pensamiento lógico', 'Arte y deporte'].map((t) => (
                  <Grid key={t} size={{ xs: 4, sm: 4, md: 3 }}>
                    <Chip label={t} variant="outlined" />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}
          {tab === 2 && (
            <Stack spacing={1}>
              <Typography>Día escolar: 7:30–14:30. Extensión 14:30–17:30.</Typography>
              <Typography>Transporte opcional por zonas cercanas.</Typography>
            </Stack>
          )}
          {tab === 3 && (
            <Stack spacing={2}>
              <Typography>Descarga los documentos oficiales en PDF.</Typography>
              <Stack direction="row" spacing={2}>
                <Button startIcon={<FolderOpenIcon />} variant="outlined" component={Link} href={PDF_PENSUM_URL} target="_blank">Pensum</Button>
                <Button startIcon={<FolderOpenIcon />} variant="outlined" component={Link} href={PDF_REGLAMENTO_URL} target="_blank">Reglamento</Button>
              </Stack>
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}

// ===== Vida escolar: mini-galería con lightbox =====
function VidaEscolar() {
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState<string | null>(null);
  const openImg = (src: string) => { setImg(src); setOpen(true); };
  return (
    <Box id="vida" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Typography variant="h3" fontWeight={800}>Vida escolar</Typography>
          <Typography color="text.secondary">Extracurriculares, alimentación, transporte e instalaciones.</Typography>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
            {GALLERY.map((src) => (
              <Grid key={src} size={{ xs: 4, sm: 4, md: 4 }}>
                <Card sx={{  cursor: 'zoom-in', }} onClick={() => openImg(src)}>
                 <CardMedia sx={{ pt: '56.25%', position: 'relative' }}>
                    <Image src={src} alt="Vida escolar" fill sizes="(max-width:768px) 100vw, 33vw" loading="lazy" />
                  </CardMedia>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)} aria-label="Visor de imagen">
        <DialogContent sx={{ p: 0 }}>
          {img && (
            <Box sx={{ position: 'relative', width: { xs: 320, sm: 560, md: 800 }, height: { xs: 240, sm: 420, md: 600 } }}>
              <Image src={img} alt="Foto de galería" fill sizes="100vw" />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}



// ===== Proceso de admisión =====
function Admision() {
  const pasos = [
    'Completa el formulario de preinscripción',
    'Agenda y realiza la visita',
    'Evaluación diagnóstica',
    'Entrega de documentos',
    'Inscripción y pago de matrícula',
  ];
  return (
    <Box id="admision" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Typography variant="h3" fontWeight={800}>Proceso de admisión</Typography>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
            {pasos.map((p, i) => (
              <Grid key={p} size={{ xs: 4, sm: 4, md: 4 }}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip label={i + 1} color="primary" />
                      <Typography>{p}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button size="large" variant="contained" color="secondary" onClick={() => scrollToId('contacto')}>Iniciar preinscripción</Button>
        </Stack>
      </Container>
    </Box>
  );
}

// ===== FAQ =====
function FAQ() {
  const faqs = Array.from({ length: 10 }).map((_, i) => ({ q: `Pregunta frecuente #${i + 1}`, a: 'Respuesta breve y clara de 2–3 líneas.' }));
  return (
    <Box id="faq" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>Preguntas frecuentes</Typography>
        {faqs.map((f, i) => (
          <Accordion key={i} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-${i}-content`} id={`faq-${i}-header`}>
              <Typography>{f.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{f.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

// ===== Contacto con mapa y formulario =====
function Contacto() {
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget) as any);
    // TODO: Validar con zod y reCAPTCHA. Enviar a /api/contact.
    console.log('Lead', data);
    setSnackbar({ open: true, message: 'Gracias. Te contactaremos pronto.', severity: 'success' });
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <Box id="contacto" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>Ubicación y contacto</Typography>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 4, md: 6 }}>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography><strong>Dirección:</strong> 1a Calle 1-11, Zona X, Ciudad de Guatemala</Typography>
              <Typography><strong>Horario:</strong> Lun–Vie 7:30–17:30</Typography>
              <Stack direction="row" spacing={1}>
                <Button startIcon={<PhoneInTalkIcon />} component="a" href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</Button>
                <Button startIcon={<WhatsAppIcon />} component="a" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener">WhatsApp</Button>
               
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 4, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>Solicitar información</Typography>
                <Box component="form" onSubmit={onSubmit} noValidate>
                  <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
                    <Grid size={{ xs: 4, md: 6 }}>
                      <TextField name="parentName" label="Nombre del padre/madre" fullWidth required />
                    </Grid>
                    <Grid size={{ xs: 4, md: 6 }}>
                      <TextField name="studentName" label="Nombre del estudiante" fullWidth required />
                    </Grid>
                    <Grid size={{ xs: 4, md: 6 }}>
                      <TextField select name="grade" label="Grado de interés" fullWidth required>
                        {['1º', '2º', '3º', '4º', '5º', '6º'].map((g) => (<MenuItem key={g} value={g}>{g}</MenuItem>))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 4, md: 6 }}>
                      <TextField name="phone" label="Teléfono (+502)" fullWidth required inputProps={{ inputMode: 'tel', pattern: '^\+?502[0-9]{8}$' }} />
                    </Grid>
                    <Grid size={{ xs: 4, md: 6 }}>
                      <TextField name="email" type="email" label="Email" fullWidth required />
                    </Grid>
                    <Grid size={{ xs: 4, md: 6 }}>
                      <TextField select name="contactPref" label="Preferencia de contacto" fullWidth>
                        {['Llamada', 'WhatsApp', 'Email'].map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <TextField name="message" label="Comentario" fullWidth multiline minRows={3} />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button type="submit" variant="contained" color="secondary">Enviar</Button>
                        <Button variant="outlined" href={CALENDLY_URL} target="_blank">Agendar visita</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}


// ===== Institucional: Misión, Visión y Valores =====
function Institucional() {
  return (
    <Box id="institucional" component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h3" fontWeight={800}>Nuestra identidad</Typography>
          <Typography color="text.secondary">
            Conoce nuestra misión, visión y los valores que guián cada actividad dentro y fuera del aula.
          </Typography>

          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }}>
            {/* Misión */}
            <Grid size={{ xs: 6, md: 5 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box aria-hidden><FlagIcon color="primary" /></Box>
                    <Typography variant="h5">Misión</Typography>
                  </Stack>
                  <Typography color="text.secondary"  sx={{ mt: 1.5, fontSize: { xs: 16, sm: 17, md: 18, lg: 19 }, lineHeight: 1.85 }}>
                    Ofrecemos una educación de calidad en los niveles de preprimaria  y primaria, que integren
                    valores que favorezcan a un adecuado desarrollo cognitivo, social y psicomotor en cada uno de los
                    niños y niñas de nuestra comunidad, a través de modelos pedagogicos, estrategicos, recursos tecnologicos,
                    que propone el ministerio de educación; acorde a la realidad de los nuevos tiempos.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Visión */}
            <Grid size={{ xs: 6, md: 5 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box aria-hidden><VisibilityIcon color="primary" /></Box>
                    <Typography variant="h5">Visión</Typography>
                  </Stack>
                  <Typography color="text.secondary"  sx={{ mt: 1.5, fontSize: { xs: 16, sm: 17, md: 18, lg: 19 }, lineHeight: 1.85 }}>
                    Ser un centro educativo modelo de educación de calidad de los niveles preprimaria y primaria,
                    mediante estrategis pedagógicas innovadoras, aplicando metodologías y tecnologías modernas, en 
                    un ambiente agradable para el estudiante, con un personal altamente calificado en el aspecto moral y académico,
                    para impartir una formación de calidad en una sociedad cambiante.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Valores */}
            <Grid size={{ xs: 6, md: 5 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box aria-hidden><FavoriteIcon color="primary" /></Box>
                    <Typography variant="h5">Valores</Typography>
                  </Stack>
                  <Typography color="text.secondary"  sx={{ mt: 1.5, fontSize: { xs: 16, sm: 17, md: 18, lg: 19 }, lineHeight: 1.85 }}>
                    Nos centramos en un alto nivel de logros, animados a la iniciativa individual, logramos nuestros objetivos
                    trabajando en equipo, alentamos a la flexibilidad y la innovación. Motivamos la responsabilidad y honestidad,
                    trabajamos la exelencia académica, contribuimos y gestionamos un ambiente agradable; la planificación, evaluación
                    y disciplina, son el eje central de nuestro trabajo. Fomentamos oportunidades artísticas basadas en el respeto a la vida
                    y se dirige para coordinar acciones del ministerio de educación.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

// ===== Footer con legales =====
function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, py: 4, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
          <Grid size={{ xs: 4, md: 6 }}>
            <Typography variant="h6">Escuela Primaria</Typography>
            <Typography color="text.secondary">&copy; {new Date().getFullYear()} Todos los derechos reservados.</Typography>
          </Grid>
          <Grid size={{ xs: 4, md: 3 }}>
            <Typography variant="subtitle2">Legales</Typography>
            <Stack>
              <Link href="/aviso-privacidad">Aviso de privacidad</Link>
              <Link href="/uso-imagen-menores">Uso de imagen de menores</Link>
              <Link href="/licencias">Licencias</Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 4, md: 3 }}>
            <Typography variant="subtitle2">Redes y boletín</Typography>
            <Stack>
              <Link href="https://facebook.com" target="_blank">Facebook</Link>
              <Link href="https://instagram.com" target="_blank">Instagram</Link>
              <Link href="/boletin">Suscribirme</Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}




// ===== Página principal =====
export default function Page() {



  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
          <Hero />
          <Beneficios />
          <Institucional />
          <Metodologia />
          <VidaEscolar />
          {/* <Testimonios /> */}
          <Admision />
          <FAQ />
          <Divider />
          <Contacto />
        </main>
        <Footer />
        {/* <CookieBanner /> */}
      </ThemeProvider>
    </>
  );
}


