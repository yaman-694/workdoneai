import {
  OTHER_OPTION,
  callTimeField,
  industryField,
  manualEnquiriesField,
  teamSizeField,
} from '../../data/contact-form';

interface TextRule {
  max: number;
  required: boolean;
}

const TEXT_RULES = {
  name: { max: 100, required: true },
  email: { max: 254, required: true },
  whatsapp: { max: 30, required: false },
  company: { max: 150, required: true },
  callTimeOther: { max: 100, required: false },
  dayToDay: { max: 2000, required: false },
  page: { max: 200, required: false },
} as const satisfies Record<string, TextRule>;

const SELECT_FIELDS = {
  industry: industryField,
  teamSize: teamSizeField,
  manualEnquiries: manualEnquiriesField,
  callTime: callTimeField,
} as const;

const FIELD_NAMES = [...Object.keys(TEXT_RULES), ...Object.keys(SELECT_FIELDS)] as FieldName[];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Name of the hidden spam-trap input; real people leave it empty. */
const SPAM_TRAP_FIELD = 'website';

type FieldName = keyof typeof TEXT_RULES | keyof typeof SELECT_FIELDS;

export type ContactSubmission = Record<FieldName, string>;

export type RequestBody = Record<string, unknown>;

/** Reads a trimmed string field, treating anything that is not a string as empty. */
export function readString(body: RequestBody, name: string): string {
  const value = body[name];
  return typeof value === 'string' ? value.trim() : '';
}

export function isSpamTrapFilled(body: RequestBody): boolean {
  return readString(body, SPAM_TRAP_FIELD) !== '';
}

function isValidText(value: string, rule: TextRule): boolean {
  return value.length <= rule.max && (!rule.required || value.length > 0);
}

function hasValidTextFields(submission: ContactSubmission): boolean {
  return Object.entries(TEXT_RULES).every(([name, rule]) => isValidText(submission[name as FieldName], rule));
}

function hasValidSelectFields(submission: ContactSubmission): boolean {
  return Object.entries(SELECT_FIELDS).every(([name, field]) => field.options.includes(submission[name as FieldName]));
}

/** The free-text call time is required only when "Other" is picked. */
function hasValidCallTimeOther(submission: ContactSubmission): boolean {
  return submission.callTime !== OTHER_OPTION || submission.callTimeOther !== '';
}

function isValidSubmission(submission: ContactSubmission): boolean {
  return (
    hasValidTextFields(submission) &&
    hasValidSelectFields(submission) &&
    EMAIL_PATTERN.test(submission.email) &&
    hasValidCallTimeOther(submission)
  );
}

/**
 * Keeps only the known contact form fields and checks them against the same
 * options and limits the form enforces. Returns null when anything is off.
 */
export function parseSubmission(body: RequestBody): ContactSubmission | null {
  const submission = Object.fromEntries(FIELD_NAMES.map((name) => [name, readString(body, name)])) as ContactSubmission;
  if (submission.callTime !== OTHER_OPTION) submission.callTimeOther = '';
  return isValidSubmission(submission) ? submission : null;
}
