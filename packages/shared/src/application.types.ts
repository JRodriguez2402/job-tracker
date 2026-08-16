import { ApplicationStage } from './application-stage.enum';

/**
 * Canonical shape of a job application, as stored and sent over the wire.
 * Declared once here and reused by both the API and the web app so the two can
 * never drift apart.
 */
export interface Application {
  id: string;
  company: string;
  role: string;
  url: string | null;
  salary: string | null;
  stack: string[];
  appliedDate: string | null; // ISO date, 'YYYY-MM-DD'
  stage: ApplicationStage;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Payload accepted when creating an application (the server fills in the rest). */
export type CreateApplicationInput = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

/** Payload accepted when updating one; every field optional (PATCH semantics). */
export type UpdateApplicationInput = Partial<CreateApplicationInput>;
