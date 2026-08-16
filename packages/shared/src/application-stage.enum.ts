/**
 * Stages of the job-application pipeline.
 *
 * Keys are the names used in code; the string values are the codes persisted in
 * the database and sent over the wire. User-facing labels are resolved from the
 * i18n dictionary, so these codes stay language-neutral.
 */
export enum ApplicationStage {
  Saved = 'SAVED',
  Applied = 'APPLIED',
  Screening = 'SCREENING',
  Technical = 'TECHNICAL',
  Offer = 'OFFER',
  Rejected = 'REJECTED',
}

/** All stages in pipeline order; handy for rendering a select in the UI. */
export const APPLICATION_STAGES: ApplicationStage[] = Object.values(ApplicationStage);
