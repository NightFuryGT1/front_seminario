// app/page.tsx — Landing one-page para escuela primaria usando Next.js + Material UI Grid

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
// ===== Configuración de marca y constantes =====
const PHONE = '+502 59679733';
const WHATSAPP_NUMBER = '59679733'; // solo dígitos para wa.me
const WHATSAPP_MSG = encodeURIComponent('Hola, me gustaría agendar una visita al campus.');
const CALENDLY_URL = 'https://calendly.com/tucuenta/visita-campus';
const SYSTEM_URL = 'https://escuelaelmilagro.onrender.com'; // ⬅️ reemplaza por la URL real
const FULL_SCHOOL_NAME = 'Escuela Oficial Rural Mixta Ruben Dario Escobar Ruiz, cantón El Milagro';
const SHORT_SCHOOL_NAME = 'Escuela El Milagro';
const EMAIL = 'escuelarubendarioescobarruiz@gmail.com'; // cambia por el real

// PDF en /public/pdfs
const PDF_PENSUM_URL = '/pdfs/pensum.pdf';
const PDF_REGLAMENTO_URL = '/pdfs/reglamento.pdf';

// Imágenes en /public/img
const HERO_IMG = '/img/galeria3.webp';
const GALLERY = [
  '/img/galeria1.webp',
  '/img/galeria2.webp',
  '/img/hero.webp',
  '/img/galeria4.webp',
  '/img/galeria5.webp',
  '/img/galeria6.webp',
  '/img/galeria7.webp',
  '/img/galeria8.webp',
  '/img/galeria9.jpg',
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
  const [nameOpen, setNameOpen] = React.useState(false); // dialog con nombre completo en móvil

  const theme = createTheme(); // si ya tienes theme global, usa useTheme()
  // Si usas ThemeProvider global, cambia la línea anterior por:
  // const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const logoSize = mdUp ? 48 : 36;

  const items = [
    { id: 'beneficios', label: 'Beneficios' },
    { id: 'institucional', label: 'Institucional' },
    { id: 'metodologia', label: 'Metodología' },
    { id: 'vida', label: 'Vida escolar' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacto', label: 'Contacto' },
  ];
  
  return (
    <AppBar position="fixed" color="inherit" elevation={1} sx={{ backdropFilter: 'saturate(180%) blur(8px)' }}>
      <Toolbar sx={{ gap: 2, minHeight: { xs: 56, md: 64 } }}>
        {/* Logo + nombre (dinámico) */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', overflow: 'hidden' }}
          onClick={() => scrollToId('inicio')}
          aria-label="Ir al inicio"
        >
          <Image src="/img/logo.jpg" alt="Logo de la escuela" width={logoSize} height={logoSize} />
          {/* Nombre corto en xs/sm, completo en md+ */}
          {mdUp ? (
            <Typography variant="h6" fontWeight={700} noWrap sx={{ maxWidth: 760 }}>
              {FULL_SCHOOL_NAME}
            </Typography>
          ) : (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="subtitle1" fontWeight={800} noWrap sx={{ maxWidth: 200 }}>
                {SHORT_SCHOOL_NAME}
              </Typography>
              {/* Botón para ver el nombre completo en un modal (móvil) */}
              <Tooltip title="Ver nombre completo">
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); setNameOpen(true); }} aria-label="Ver nombre completo">
                  <InfoOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
          {items.map((i) => (
            <Button key={i.id} onClick={() => scrollToId(i.id)}>
              {i.label}
            </Button>
          ))}

          {/* Sistema interno */}
          <Button
            variant="contained"
            color="secondary"
            href={SYSTEM_URL}
            target="_blank"
            rel="noopener"
            aria-label="Sistema interno"
          >
            Sistema interno
          </Button>


          <Tooltip title={PHONE}>
            <IconButton component="a" href={`tel:${PHONE.replace(/\s/g, '')}`} aria-label="Llamar"><PhoneInTalkIcon /></IconButton>
          </Tooltip>
          <Tooltip title="WhatsApp">
            <IconButton
              component="a"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Mobile actions */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
          <Badge color="secondary" variant="dot">
            <IconButton
              component="a"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>
          </Badge>
          <IconButton onClick={() => setMobileOpen((v) => !v)} aria-label="Abrir menú">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile drawer simple */}
      {mobileOpen && (
        <Box sx={{ px: 2, pb: 2, display: { md: 'none' } }}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={1}>
            {items.map((i) => (
              <Grid key={i.id} size={{ xs: 4 }}>
                <Button fullWidth onClick={() => { scrollToId(i.id); setMobileOpen(false); }}>
                  {i.label}
                </Button>
              </Grid>
            ))}
            <Grid size={{ xs: 4 }}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                href={SYSTEM_URL}
                target="_blank"
                rel="noopener"
                onClick={() => setMobileOpen(false)}
              >
                Sistema interno
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Dialog con nombre completo (solo se abre en móvil cuando tocan el "i") */}
      <Dialog open={nameOpen} onClose={() => setNameOpen(false)} aria-label="Nombre completo de la escuela">
        <DialogContent>
          <Typography variant="h6" fontWeight={800} gutterBottom>
            {FULL_SCHOOL_NAME}
          </Typography>
          <Typography color="text.secondary">
          </Typography>
        </DialogContent>
      </Dialog>
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
                Primaria y pre-primaria, grupos pequeños y ambiente seguro para desarrollar habilidades del siglo XXI.
              </Typography>
              <Stack direction="row" spacing={2}>
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
    {
      icon: <SchoolIcon />,
      t: 'Docentes comprometidos',
      d: 'Equipo con formación continua y vocación de servicio.',
    },
    {
      icon: <ShieldIcon />,
      t: 'Ambiente seguro',
      d: 'Control básico de ingreso y protocolos de emergencia.',
    },
    {
      icon: <GroupsIcon />,
      t: 'Grupos adecuados',
      d: 'Tamaños de clase que permiten atención cercana al estudiante.',
    },
    {
      icon: <AccessTimeIcon />,
      t: 'Refuerzo académico',
      d: 'Apoyo por las tardes según disponibilidad y demanda.',
    },
    {
      icon: <FolderOpenIcon />,
      t: 'Materiales accesibles',
      d: 'Uso responsable de recursos y reutilización de materiales.',
    },
    {
      icon: <CheckCircleIcon />,
      t: 'Comunidad y valores',
      d: 'Trabajo conjunto con familias para fomentar respeto y responsabilidad.',
    },
  ];

  return (
    <Box id="beneficios" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h3" fontWeight={800}>Beneficios clave</Typography>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }}>
            {beneficios.map((b) => (
              <Grid key={b.t} size={{ xs: 4, sm: 4, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform .25s ease, box-shadow .25s ease',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Stack spacing={1.5} direction="row" alignItems="center">
                      <Box aria-hidden>{b.icon}</Box>
                      <Typography variant="h6">{b.t}</Typography>
                    </Stack>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {b.d}
                    </Typography>
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
        <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>
          Programas y metodología
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="Secciones de metodología"
        >
          <Tab label="Enfoque" />
          <Tab label="Horarios" />
          <Tab label="Pensum" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {/* Enfoque (tab = 0) */}
          {tab === 0 && (
            <Stack spacing={2}>
              <Typography color="text.secondary">
                Priorizamos el aprendizaje activo con recursos accesibles: proyectos sencillos,
                lectura guiada, resolución de problemas cotidianos y participación de las familias.
                Fomentamos valores, hábitos de estudio y el respeto por la comunidad.
              </Typography>

              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2}>
                {[
                  'Lectoescritura y comprensión',
                  'Razonamiento lógico y matemático',
                  'Ciencias con materiales simples',
                  'Expresión artística y deporte',
                  'Hábitos y valores',
                  'Trabajo en equipo y comunidad',
                  'Tecnología básica cuando es posible',
                ].map((t) => (
                  <Grid key={t} size={{ xs: 4, sm: 4, md: 3 }}>
                    <Chip label={t} variant="outlined" />
                  </Grid>
                ))}
              </Grid>

              <Typography color="text.secondary">
                No contamos con programa bilingüe ni transporte escolar. En su lugar, reforzamos
                la comunicación efectiva en español y la colaboración con las familias para el traslado.
              </Typography>
            </Stack>
          )}

          {/* Horarios (tab = 1) */}
          {tab === 1 && (
            <Stack spacing={1}>
              <Typography>Día escolar: 7:30–14:30.</Typography>
              <Typography>
                Refuerzo académico por las tardes según disponibilidad docente y demanda familiar.
              </Typography>
              <Typography color="text.secondary">
                No ofrecemos transporte escolar. Las familias organizan el traslado de los estudiantes.
              </Typography>
            </Stack>
          )}

          {/* Pensum (tab = 2) */}
          {tab === 2 && (
            <Stack spacing={2}>
              <Typography color="text.secondary">
                Documentos de referencia y reglamentos disponibles en formato PDF.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  startIcon={<FolderOpenIcon />}
                  variant="outlined"
                  component={Link}
                  href={PDF_PENSUM_URL}
                  target="_blank"
                >
                  Pensum
                </Button>
                <Button
                  startIcon={<FolderOpenIcon />}
                  variant="outlined"
                  component={Link}
                  href={PDF_REGLAMENTO_URL}
                  target="_blank"
                >
                  Reglamento
                </Button>
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



// ===== FAQ =====
function FAQ() {
  const faqs = [
    {
      q: '¿Cuál es el horario de clases y hay horario extendido?',
      a: 'La jornada regular es de 7:30 a 14:30. En algunas épocas del año podemos ofrecer refuerzo académico por las tardes según disponibilidad de docentes y demanda.',
    },
    {
      q: '¿Ofrecen transporte escolar o programa bilingüe?',
      a: 'No contamos con transporte escolar ni con programa bilingüe. La enseñanza se imparte en español y las familias organizan el traslado de los estudiantes.',
    },
    {
      q: '¿Cuáles son los costos y qué materiales necesito?',
      a: 'La inscripción y los aportes son accesibles; la lista de útiles y uniformes se entrega al momento de la preinscripción. Procuramos usar materiales económicos y reutilizables cuando es posible.',
    },
    {
      q: '¿Cómo es el proceso de admisión?',
      a: 'Completa la preinscripción, agenda una visita al plantel, realizamos una evaluación diagnóstica y, con la documentación completa, se efectúa la inscripción.',
    },
  ];

  return (
    <Box id="faq" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
          Preguntas frecuentes
        </Typography>
        {faqs.map((f, i) => (
          <Accordion key={i} disableGutters
            sx={{ transition: 'transform .2s ease, box-shadow .2s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: 2 } }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${i}-content`}
              id={`faq-${i}-header`}
            >
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

// ===== Contacto (sin formulario) =====
function Contacto() {
  return (
    <Box id="contacto" component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>Ubicación y contacto</Typography>

        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 4, md: 12 }}>
            <Card>
              <CardContent>
                <Stack spacing={1.5}>
                  <Typography><strong>Dirección:</strong> Barrio El Milagro, Chiquimulilla Santa Rosa</Typography>
                  <Typography><strong>Horario:</strong> Lun–Vie 7:30–17:30</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button startIcon={<PhoneInTalkIcon />} component="a" href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</Button>
                    <Button startIcon={<WhatsAppIcon />} component="a" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener">WhatsApp</Button>
                    <Button startIcon={<EmailIcon />} component="a" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Solicitud de información')}`}>{EMAIL}</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}




// ===== Institucional: Misión, Visión y Valores =====
function Institucional() {
  // Estados independientes por tarjeta
  const [openMision, setOpenMision] = React.useState(false);
  const [openVision, setOpenVision] = React.useState(false);
  const [openValores, setOpenValores] = React.useState(false);

  // Estilo del párrafo (legible y consistente)
  const descSx = { mt: 1.5, fontSize: { xs: 15.5, sm: 16, md: 17 }, lineHeight: 1.85 };

  // Card con hover (sin height: '100%')
  const cardSx = {
    transition: 'transform .25s ease, box-shadow .25s ease',
    '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
  } as const;

  return (
    <Box id="institucional" component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h3" fontWeight={800}>Nuestra identidad</Typography>
          <Typography color="text.secondary">
            Conoce nuestra misión, visión y los valores que guían cada actividad dentro y fuera del aula.
          </Typography>

          <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            spacing={{ xs: 2, md: 3 }}
            alignItems="flex-start"  // ✅ evita que todas igualen altura
          >
            {/* Misión */}
            <Grid size={{ xs: 4, md: 4 }}>
              <Card sx={cardSx}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box aria-hidden><FlagIcon color="primary" /></Box>
                    <Typography variant="h6">Misión</Typography>
                  </Stack>

                  <Collapse in={openMision} collapsedSize={96}>
                    <Typography color="text.secondary" sx={descSx}>
                      Ofrecemos una educación de calidad en los niveles de preprimaria y primaria, que integren
                      valores que favorezcan un adecuado desarrollo cognitivo, social y psicomotor en cada uno
                      de los niños y niñas de nuestra comunidad, a través de modelos pedagógicos, estratégicos,
                      recursos humanos y tecnológicos, que propone el Ministerio de Educación; acorde a la
                      realidad de los nuevos tiempos.
                    </Typography>
                  </Collapse>

                  <Button
                    size="small"
                    onClick={() => setOpenMision((v) => !v)}
                    endIcon={openMision ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ mt: 1 }}
                  >
                    {openMision ? 'Ver menos' : 'Ver más'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Visión */}
            <Grid size={{ xs: 4, md: 4 }}>
              <Card sx={cardSx}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box aria-hidden><VisibilityIcon color="primary" /></Box>
                    <Typography variant="h6">Visión</Typography>
                  </Stack>

                  <Collapse in={openVision} collapsedSize={96}>
                    <Typography color="text.secondary" sx={descSx}>
                      Ser un centro educativo modelo de educación de calidad de los niveles preprimaria y primaria,
                      mediante estrategias pedagógicas innovadoras, aplicando metodologías y tecnologías modernas,
                      en un ambiente agradable para el estudiante, con un personal altamente calificado en el aspecto
                      moral y académico, para impartir una formación de calidad en una sociedad cambiante.
                    </Typography>
                  </Collapse>

                  <Button
                    size="small"
                    onClick={() => setOpenVision((v) => !v)}
                    endIcon={openVision ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ mt: 1 }}
                  >
                    {openVision ? 'Ver menos' : 'Ver más'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Valores */}
            <Grid size={{ xs: 4, md: 4 }}>
              <Card sx={cardSx}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box aria-hidden><FavoriteIcon color="primary" /></Box>
                    <Typography variant="h6">Valores</Typography>
                  </Stack>

                  <Collapse in={openValores} collapsedSize={96}>
                    <Typography color="text.secondary" sx={descSx}>
                      Nos centramos en un alto nivel de logros, animados a la iniciativa individual; logramos
                      nuestros objetivos trabajando en equipo, alentamos la flexibilidad y la innovación.
                      Motivamos la responsabilidad y honestidad, trabajamos la excelencia académica, contribuimos
                      y gestionamos un ambiente agradable; la planificación, evaluación y disciplina son el eje
                      central en nuestro trabajo. Fomentamos oportunidades artísticas basadas en el respeto a la vida
                      y coordinamos acciones con el Ministerio de Educación.
                    </Typography>
                  </Collapse>

                  <Button
                    size="small"
                    onClick={() => setOpenValores((v) => !v)}
                    endIcon={openValores ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    sx={{ mt: 1 }}
                  >
                    {openValores ? 'Ver menos' : 'Ver más'}
                  </Button>
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


