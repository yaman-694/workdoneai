import { audiences } from './site';

export interface SelectField {
  name: string;
  label: string;
  placeholder: string;
  options: readonly string[];
}

/** Value of the option that reveals a free-text box next to its select. */
export const OTHER_OPTION = 'Other';

export const industryField: SelectField = {
  name: 'industry',
  label: 'Business type',
  placeholder: 'Select business type',
  options: [...audiences, OTHER_OPTION],
};

export const teamSizeField: SelectField = {
  name: 'teamSize',
  label: 'Team size',
  placeholder: 'Select size',
  options: ['Just me', '2-10', '11-50', '51-200', '200+'],
};

export const manualEnquiriesField: SelectField = {
  name: 'manualEnquiries',
  label: 'Property enquiries you handle by hand each day',
  placeholder: 'Select range',
  options: ['Under 20', '20-50', '50-200', '200+', 'Not sure'],
};

export const callTimeField: SelectField = {
  name: 'callTime',
  label: 'Best time for a call (IST)',
  placeholder: 'Select a time slot',
  options: ['9 AM - 12 PM', '12 PM - 5 PM', '5 PM - 9 PM', OTHER_OPTION],
};
