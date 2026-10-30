import { ApplicationStage } from '@job-tracker/shared';

// Spanish dictionary. Its shape defines the `Dictionary` type that every other
// locale must match, so a missing key in another language is a compile error.
const stageLabels: Record<ApplicationStage, string> = {
  [ApplicationStage.Saved]: 'Guardada',
  [ApplicationStage.Applied]: 'Aplicada',
  [ApplicationStage.Screening]: 'Screening',
  [ApplicationStage.Technical]: 'Técnica',
  [ApplicationStage.Offer]: 'Oferta',
  [ApplicationStage.Rejected]: 'Rechazada',
};

export const es = {
  app: {
    title: 'Seguimiento de postulaciones',
    subtitle: 'Gestiona tus postulaciones de empleo',
  },
  common: {
    loading: 'Cargando…',
  },
  list: {
    empty: 'Aún no tienes postulaciones. ¡Crea la primera!',
    new: 'Nueva postulación',
    edit: 'Editar',
    delete: 'Eliminar',
    confirmDelete: '¿Eliminar esta postulación?',
  },
  form: {
    company: 'Empresa',
    role: 'Cargo',
    url: 'Enlace de la vacante',
    salary: 'Salario',
    stack: 'Stack (separa con comas)',
    appliedDate: 'Fecha de aplicación',
    stage: 'Etapa',
    notes: 'Notas',
    save: 'Guardar',
    cancel: 'Cancelar',
    creating: 'Nueva postulación',
    editing: 'Editar postulación',
  },
  auth: {
    loginTitle: 'Iniciar sesión',
    registerTitle: 'Crear cuenta',
    email: 'Correo',
    password: 'Contraseña',
    passwordHint: 'Mínimo 8 caracteres',
    loginSubmit: 'Entrar',
    registerSubmit: 'Registrarme',
    logout: 'Cerrar sesión',
    noAccount: '¿No tienes cuenta?',
    registerLink: 'Regístrate',
    haveAccount: '¿Ya tienes cuenta?',
    loginLink: 'Inicia sesión',
    invalidCredentials: 'Correo o contraseña incorrectos.',
    emailTaken: 'Ese correo ya está registrado.',
    registerError: 'No se pudo crear la cuenta. Revisa los datos.',
  },
  stage: stageLabels,
  errors: {
    load: 'No se pudieron cargar las postulaciones.',
    save: 'No se pudo guardar. Revisa los datos.',
    delete: 'No se pudo eliminar.',
  },
};

// The shape every locale dictionary must satisfy.
export type Dictionary = typeof es;
