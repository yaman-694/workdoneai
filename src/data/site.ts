// All homepage copy and structured content lives here so sections stay presentational.
// Numbers marked `example: true` are illustrative and must be replaced with real client results before launch.

export const site = {
  name: 'workdoneai',
  url: 'https://workdoneai.com',
  tagline: 'Your Business, On Autopilot.',
  description:
    'workdoneai designs and builds custom business automation: WhatsApp, appointments, CRM, lead follow-up and AI agents, built around how your business actually works.',
  email: '[hello@workdoneai.com]',
} as const;

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Industries', href: '/#industries' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
] as const;

export const cta = {
  primary: "Let's Automate",
  secondary: 'See How It Works',
  nav: "Let's Talk",
} as const;

export interface Stat {
  value: string;
  /** Numeric part animated by the counter, when there is one. */
  count?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  example?: boolean;
}

export const heroStats: Stat[] = [
  { value: '< 1 min', label: 'to handle an enquiry that used to take 45 minutes', example: true },
  { value: '73 hrs', count: 73, suffix: ' hrs', label: 'of manual work saved every month', example: true },
  { value: '+25%', count: 25, prefix: '+', suffix: '%', label: 'revenue from faster replies and no missed leads', example: true },
  { value: '24/7', label: 'customers get an answer, even after hours' },
];

export const manualTasks = [
  'Manually checking WhatsApp',
  'Copying customer information',
  'Sending appointment reminders',
  'Updating your CRM',
  'Following up with leads',
  'Creating repetitive reports',
];

export interface Service {
  title: string;
  steps: string[];
  saves: string;
  image: string;
}

export const services: Service[] = [
  { title: 'Lead Automation', steps: ['Capture', 'Qualify', 'Assign', 'Follow-up'], saves: '[X hrs / week]', image: 'Sales inbox' },
  { title: 'WhatsApp Automation', steps: ['Message', 'Understand', 'Respond', 'Act'], saves: '[X hrs / week]', image: 'Phone with a WhatsApp chat' },
  { title: 'Appointment Automation', steps: ['Request', 'Availability', 'Booking', 'Reminder'], saves: '[X hrs / week]', image: 'Calendar on a desk' },
  { title: 'CRM Automation', steps: ['Lead', 'Update', 'Assign', 'Follow-up'], saves: '[X hrs / week]', image: 'Team at a laptop' },
  { title: 'AI Agents', steps: ['Understand', 'Decide', 'Execute'], saves: '[X hrs / week]', image: 'Customer chatting on a phone' },
  { title: 'Business Workflows', steps: ['Trigger', 'Process', 'Connect', 'Complete'], saves: '[X hrs / week]', image: 'Operations desk' },
];

export interface Flow {
  id: string;
  label: string;
  title: string;
  steps: string[];
  manual: string;
  automated: string;
  result: string;
}

export const flows: Flow[] = [
  {
    id: 'doctor',
    label: 'Doctor',
    title: 'Doctor appointment',
    steps: ['Patient', 'WhatsApp', 'AI Assistant', 'Check Availability', 'Book Appointment', 'Confirmation', 'Reminder'],
    manual: '40 min',
    automated: '30 sec',
    result: 'Appointment booked, confirmed and reminded',
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    title: 'Real estate lead',
    steps: ['Website / WhatsApp', 'New Lead', 'AI Qualifies', 'CRM', 'Notify Agent', 'Follow-up'],
    manual: '35 min',
    automated: '20 sec',
    result: 'Lead qualified, in the CRM, agent notified',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    title: 'Restaurant reservation',
    steps: ['Customer Message', 'AI Assistant', 'Reservation', 'Calendar', 'Confirmation', 'Reminder'],
    manual: '15 min',
    automated: '10 sec',
    result: 'Table reserved, confirmed and reminded',
  },
];

export interface TimedStep {
  label: string;
  time: string;
}

export const beforeAfter = {
  before: [
    { label: 'New enquiry', time: 'waits ~2 hrs' },
    { label: 'Someone checks message', time: '5 min' },
    { label: 'Copies details', time: '5 min' },
    { label: 'Updates spreadsheet', time: '5 min' },
    { label: 'Calls customer', time: '10 min' },
    { label: 'Checks availability', time: '5 min' },
    { label: 'Books appointment', time: '10 min' },
    { label: 'Sends confirmation', time: '5 min' },
  ] as TimedStep[],
  after: [
    { label: 'New enquiry', time: 'instant' },
    { label: 'Automation', time: '1 sec' },
    { label: 'AI responds', time: '5 sec' },
    { label: 'CRM updated', time: '1 sec' },
    { label: 'Calendar checked', time: '1 sec' },
    { label: 'Appointment booked', time: '2 sec' },
    { label: 'Confirmation sent', time: '1 sec' },
  ] as TimedStep[],
  beforeTotal: '45 min',
  afterTotal: '< 1 min',
  enquiriesPerMonth: 100,
  manualHours: 75,
  automatedHours: 2,
  savedHours: 73,
};

export const processSteps = [
  { num: 'I.', title: 'Discover', text: 'We understand how your business works today.' },
  { num: 'II.', title: 'Design', text: 'We identify repetitive processes and design the automation.' },
  { num: 'III.', title: 'Build', text: 'We connect your tools and build the workflow.' },
  { num: 'IV.', title: 'Launch', text: 'We test, deploy, monitor, and improve.' },
];

export const industries = [
  { name: 'Healthcare', text: 'Appointment booking, reminders, enquiries.', image: 'Clinic reception' },
  { name: 'Real Estate', text: 'Lead qualification, property enquiries, follow-ups.', image: 'Property viewing' },
  { name: 'Restaurants', text: 'Reservations, customer enquiries, notifications.', image: 'Restaurant floor' },
  { name: 'Professional Services', text: 'Lead intake, scheduling, documents, follow-ups.', image: 'Consultant with a client' },
  { name: 'Local Businesses', text: 'Bookings, enquiries, reminders, reviews.', image: 'Salon or local shop' },
  { name: 'E-commerce', text: 'Customer communication, order notifications, support workflows.', image: 'Packing orders' },
];

// Only list tools we actually support (see PLAN.md section 4.8).
export const integrations = [
  'WhatsApp',
  'Google Calendar',
  'Gmail',
  'Slack',
  'Telegram',
  'Google Sheets',
  'HubSpot',
  'Salesforce',
  'Notion',
  'n8n',
];

export const reasons = [
  { title: 'Custom', text: 'Your automation is designed around your actual workflow.' },
  { title: 'Connected', text: "We connect the tools you're already using." },
  { title: 'Practical', text: 'We focus on removing real repetitive work.' },
  { title: 'Scalable', text: 'Start with one workflow and expand as your business grows.' },
];

// Answers marked REVIEW state business policy and need confirming before launch.
export const faqs = [
  {
    q: 'What is business automation?',
    a: 'Business automation means letting software handle repetitive tasks, such as replying to enquiries, booking appointments or updating your CRM, so your team does not have to do them by hand.',
  },
  {
    q: 'What type of business processes can workdoneai automate?',
    a: 'Anything repetitive and rule-based: lead capture and follow-up, WhatsApp replies, appointment booking and reminders, CRM updates, notifications, reports and multi-step workflows between your tools.',
  },
  {
    q: 'Can you automate WhatsApp?',
    a: 'Yes. We can answer common questions, collect customer details, book appointments and pass conversations to your team when a person is needed.',
  },
  {
    q: 'Can you automate appointment booking?',
    a: 'Yes. Customers can request a time through WhatsApp or your website, availability is checked against your calendar, and confirmations and reminders go out automatically.',
  },
  {
    q: 'Can you connect my existing CRM?',
    a: 'In most cases, yes. We connect to CRMs and tools that offer an API or integration, so leads and updates land where your team already works.',
  },
  {
    q: 'Do I need to change my existing software?',
    a: 'Usually not. We build around the tools you already use and only suggest changes when they clearly save time.',
  },
  {
    q: 'Can you build AI agents?',
    a: 'Yes. We build AI agents that understand messages, make simple decisions and take actions in your tools, with clear rules for when to hand over to a person.',
  },
  {
    q: 'How long does an automation take?',
    a: '[REVIEW] It depends on the process. A single workflow is usually quicker than a multi-tool system; we give you a timeline after the discovery call.',
  },
  {
    q: 'How much does automation cost?',
    a: '[REVIEW] Pricing depends on the workflow and the tools involved. After we understand your process, we send a clear quote before any work starts.',
  },
  {
    q: 'Do you provide ongoing support?',
    a: '[REVIEW] Yes. After launch we monitor your automations, fix issues and improve them as your business changes.',
  },
  {
    q: 'Can you automate a custom process?',
    a: 'Yes. Most of our work is custom. Tell us how the process runs today and we will design the automation around it.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill in the short form below and tell us what takes too much time. We will get back to you to talk through your workflow.',
  },
];
