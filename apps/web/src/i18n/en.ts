import { ApplicationStage } from '@job-tracker/shared';
import type { Dictionary } from './es';

const stageLabels: Record<ApplicationStage, string> = {
  [ApplicationStage.Saved]: 'Saved',
  [ApplicationStage.Applied]: 'Applied',
  [ApplicationStage.Screening]: 'Screening',
  [ApplicationStage.Technical]: 'Technical',
  [ApplicationStage.Offer]: 'Offer',
  [ApplicationStage.Rejected]: 'Rejected',
};

// `: Dictionary` forces this to match the Spanish dictionary exactly — a missing
// or extra key fails the build.
export const en: Dictionary = {
  app: {
    title: 'Job applications tracker',
    subtitle: 'Track your job applications',
  },
  common: {
    loading: 'Loading…',
  },
  dashboard: {
    title: 'Your funnel',
    total: 'applications',
  },
  list: {
    empty: "You don't have any applications yet. Create your first one!",
    new: 'New application',
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: 'Delete this application?',
  },
  form: {
    company: 'Company',
    role: 'Role',
    url: 'Job posting link',
    salary: 'Salary',
    stack: 'Stack (comma-separated)',
    appliedDate: 'Applied date',
    stage: 'Stage',
    notes: 'Notes',
    save: 'Save',
    cancel: 'Cancel',
    creating: 'New application',
    editing: 'Edit application',
  },
  auth: {
    loginTitle: 'Sign in',
    registerTitle: 'Create account',
    email: 'Email',
    password: 'Password',
    passwordHint: 'At least 8 characters',
    loginSubmit: 'Sign in',
    registerSubmit: 'Sign up',
    logout: 'Sign out',
    noAccount: "Don't have an account?",
    registerLink: 'Sign up',
    haveAccount: 'Already have an account?',
    loginLink: 'Sign in',
    invalidCredentials: 'Wrong email or password.',
    emailTaken: 'That email is already registered.',
    registerError: "Couldn't create the account. Check your details.",
  },
  stage: stageLabels,
  share: {
    button: 'Share',
    copied: 'Link copied!',
    readOnly: 'Read-only view',
  },
  errors: {
    load: "Couldn't load the applications.",
    save: "Couldn't save. Check your details.",
    delete: "Couldn't delete.",
  },
};
