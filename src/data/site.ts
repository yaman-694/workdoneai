// All site copy and structured content lives here so sections stay presentational.
// Numbers marked `example: true` are illustrative and must be replaced with real client results once we have them.
import type { ImageMetadata } from 'astro';
import leadsPhoto from '../assets/images/leads.webp';
import whatsappPhoto from '../assets/images/whatsapp.webp';
import aiAgentsPhoto from "../assets/images/ai-agents.webp";
import appointmentPhoto from '../assets/images/appointment.webp';
import crmPhoto from '../assets/images/crm.webp';
import businessWorkflowsPhoto from '../assets/images/business-workflows.webp';

export const site = {
  name: 'workdoneai',
  url: 'https://workdoneai.com',
  tagline: 'Your Property Leads, On Autopilot.',
  description:
    'workdoneai builds AI assistants and automations for real estate businesses: instant replies to property enquiries, lead qualification, site visit booking, CRM updates and follow-ups.',
  email: '[hello@workdoneai.com]',
} as const;

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Live Demo', href: '/#demo' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/#faq' },
] as const;

/** Launch offer shown in the banner above the header; full terms live on /terms. */
export const offer = {
  short: 'First month free for new clients.',
  long: 'First month free for new clients: try your automation for a month and pay only third-party costs.',
  termsHref: '/terms#first-month-free',
  terms: [
    'The offer is for new clients only, one free month per business.',
    'For the first month after your automation goes live, you pay nothing for setup, hosting or maintenance.',
    'Third-party costs are not included and are payable from day one. These include software licences, messaging fees such as the WhatsApp Business API, and AI usage.',
    'From the second month, the setup fee and monthly maintenance charges in your quote apply.',
    'There is no lock-in. If you stop before the free month ends, you pay nothing for our service, including the setup fee.',
    'We may change or end this offer at any time. Changes do not affect clients whose free month has already started.',
  ],
} as const;

export const cta = {
  primary: "Let's Automate",
  secondary: 'Try the Live Demo',
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
  /** Hidden on phones, where four stats crowd the first screen. */
  desktopOnly?: boolean;
}

export const heroStats: Stat[] = [
  { value: '< 1 min', label: 'to handle a property enquiry that used to take 45 minutes', example: true },
  { value: '73 hrs', count: 73, suffix: ' hrs', label: 'of manual work saved every month', example: true, desktopOnly: true },
  { value: '+25%', count: 25, prefix: '+', suffix: '%', label: 'revenue from faster replies and no missed leads', example: true, desktopOnly: true },
  { value: '24/7', label: 'buyers get an answer, even after hours' },
];

/** Footnote for the starred hero stats. */
export const heroEstimateNote =
  'Estimates for a typical real estate business handling about 25 enquiries a week, not results from past client projects.';

export const manualTasks = [
  'Replying to every property enquiry',
  'Asking each lead their budget',
  'Copying lead details into Excel',
  'Scheduling site visits',
  'Chasing leads who went quiet',
  'Updating the CRM after every call',
];

/**
 * Weekly time savings are estimates for a typical real estate business handling about
 * 25 enquiries a week (the same volume behind the hero's 73 hrs a month).
 * Replace them with measured client results as they come in.
 */
export const savingsBasis = 'Estimated for a real estate business handling about 25 enquiries a week.';

export interface Service {
  title: string;
  steps: string[];
  /** Estimated hours saved per week; see `savingsBasis`. */
  saves: string;
  /** Describes the photo: alt text, or the placeholder caption until a photo exists. */
  image: string;
  photo?: ImageMetadata;
}

export const services: Service[] = [
  {
    title: "Lead Qualification",
    steps: ["Enquiry", "Budget & Location", "Score", "Assign"],
    saves: "~6 hrs / week",
    image: "People walking across a sunlit plaza towards the same point",
    photo: leadsPhoto,
  },
  {
    title: "WhatsApp & Telegram Assistant",
    steps: ["Message", "Understand", "Answer", "Act"],
    saves: "~8 hrs / week",
    image: "Phone with a WhatsApp chat",
    photo: whatsappPhoto,
  },
  {
    title: "Site Visit Booking",
    steps: ["Request", "Availability", "Booking", "Reminder"],
    saves: "~5 hrs / week",
    image: "Calendar on a desk",
    photo: appointmentPhoto,
  },
  {
    title: "Real Estate CRM",
    steps: ["Lead", "Update", "Assign", "Follow-up"],
    saves: "~3 hrs / week",
    image: "Team at a laptop",
    photo: crmPhoto,
  },
  {
    title: "AI Property Agent",
    steps: ["Understand", "Match Listings", "Respond"],
    saves: "~10 hrs / week",
    image: "Customer chatting on a phone",
    photo: aiAgentsPhoto,
  },
  {
    title: "Follow-up Workflows",
    steps: ["Trigger", "Remind", "Re-engage", "Hand Over"],
    saves: "~4 hrs / week",
    image: "Operations desk",
    photo: businessWorkflowsPhoto,
  },
];

export interface Demo {
  name: string;
  kind: string;
  text: string;
  features: string[];
  href: string;
  action: string;
}

export interface Chapter {
  label: string;
  /** Seconds into the video where this chapter starts. */
  start: number;
}

/**
 * The Arav walkthrough video. Chapter starts mirror the scene timing in the demo-video project
 * (demo-video/src/timing.ts); update them together whenever the video is re-rendered.
 */
export const demoVideo = {
  duration: 66.4,
  chapters: [
    { label: 'Reply', start: 0 },
    { label: 'Qualify', start: 14.2 },
    { label: 'Match', start: 24.8 },
    { label: 'Contact', start: 33.2 },
    { label: 'Alert', start: 39.6 },
    { label: 'Visit', start: 48.8 },
  ] satisfies Chapter[],
} as const;

/** Live demos we built and run ourselves; the proof of work until client case studies exist. */
export const demos: Demo[] = [
  {
    name: 'Arav',
    kind: 'AI assistant on Telegram',
    text: 'Message Arav like a buyer would. It replies in seconds, any time of day.',
    features: [
      'Answers property enquiries',
      'Qualifies leads on budget, location and timeline',
      'Books site visits',
      'Sends every lead to the agent and the CRM',
    ],
    href: 'https://t.me/arav_realstate_bot',
    action: 'Chat with Arav',
  },
  {
    name: 'Lead Ledger',
    kind: 'Real estate CRM',
    text: "A simple CRM where Arav's leads land. Open it to see the other side of the conversation.",
    features: ['Leads with budget and location', 'Scheduled site visits', 'Properties', 'Follow-ups due'],
    href: 'https://realestate.workdoneai.com/',
    action: 'Open the CRM demo',
  },
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
    id: 'enquiry',
    label: 'New Enquiry',
    title: 'Property enquiry',
    steps: ['Buyer Message', 'AI Assistant', 'Budget & Location', 'Matching Listings', 'CRM', 'Notify Agent'],
    manual: '35 min',
    automated: '20 sec',
    result: 'Lead qualified, in the CRM, agent notified',
  },
  {
    id: 'site-visit',
    label: 'Site Visit',
    title: 'Site visit booking',
    steps: ['Visit Request', 'AI Assistant', 'Agent Calendar', 'Book Visit', 'Confirmation', 'Reminder'],
    manual: '20 min',
    automated: '15 sec',
    result: 'Visit booked, confirmed and reminded',
  },
  {
    id: 'follow-up',
    label: 'Follow-up',
    title: 'Quiet lead follow-up',
    steps: ['Lead Goes Quiet', 'Timed Reminder', 'New Matching Listing', 'Buyer Replies', 'Agent Notified'],
    manual: '15 min',
    automated: '5 sec',
    result: 'Lead re-engaged and back with the agent',
  },
];

export interface TimedStep {
  label: string;
  time: string;
}

export const beforeAfter = {
  before: [
    { label: 'New property enquiry', time: 'waits ~2 hrs' },
    { label: 'Agent checks message', time: '5 min' },
    { label: 'Asks budget and location', time: '10 min' },
    { label: 'Copies details to Excel', time: '5 min' },
    { label: 'Sends matching listings', time: '10 min' },
    { label: 'Schedules site visit', time: '10 min' },
    { label: 'Sends confirmation', time: '5 min' },
  ] as TimedStep[],
  after: [
    { label: 'New property enquiry', time: 'instant' },
    { label: 'AI responds', time: '5 sec' },
    { label: 'Lead qualified', time: '10 sec' },
    { label: 'Listings shared', time: '2 sec' },
    { label: 'CRM updated', time: '1 sec' },
    { label: 'Site visit booked', time: '2 sec' },
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
  { num: 'I.', title: 'Discover', text: 'We learn how leads reach you today and what happens to each one.' },
  { num: 'II.', title: 'Design', text: 'We pick the repetitive steps and design the automation around your team.' },
  { num: 'III.', title: 'Build', text: 'We connect your tools and build the workflow.' },
  { num: 'IV.', title: 'Launch', text: 'We test, deploy, monitor, and improve.' },
];

/** Kinds of real estate business we build for; also the contact form's business type options. */
export const audiences = ['Agent or broker', 'Developer or builder', 'Property management', 'Rentals and leasing'];

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
  { title: 'Real estate first', text: 'We build for property businesses, so we already know how leads, site visits and follow-ups work.' },
  { title: 'Custom', text: 'Your automation is designed around how your team actually sells.' },
  { title: 'Connected', text: "We connect the tools you're already using." },
  { title: 'Scalable', text: 'Start with one workflow and expand as your business grows.' },
];

/** Who runs the site, for the privacy and terms pages. workdoneai is a freelance practice, not a registered company. */
export const legal = {
  operator: 'Yaman Jain',
  email: 'yaman@workdoneai.com',
  country: 'India',
  updated: '13 October 2026',
} as const;

export const founder = {
  name: 'Yaman Jain',
  role: 'Founder, workdoneai',
  linkedin: 'https://www.linkedin.com/in/yaman-jain/',
  bio: [
    "I'm Yaman, and I started workdoneai to take the repetitive work off real estate teams.",
    'Good leads go cold while someone copies details into a spreadsheet or waits to call back. Software can handle most of that work, and agents can spend the time on buyers and site visits.',
    'I design and build every workdoneai automation, starting with Arav, our real estate assistant. You can try Arav below before we ever talk.',
  ],
};

// The timeline, cost and support answers state business policy; keep them in line with what we actually offer.
export const faqs = [
  {
    q: 'What does workdoneai do for real estate businesses?',
    a: 'We build AI assistants and automations that answer property enquiries, qualify leads, book site visits, update your CRM and follow up, so your agents spend their time with serious buyers.',
  },
  {
    q: 'Can I try it before we talk?',
    a: 'Yes. Message Arav, our real estate assistant, on Telegram, then open the CRM demo to see the lead it created. Both are linked in the Live Demo section.',
  },
  {
    q: 'Can an AI assistant qualify property leads?',
    a: 'Yes. It asks each buyer about budget, location, timeline and whether they want to buy or rent, then scores the lead and passes it to the right agent.',
  },
  {
    q: 'Can you automate WhatsApp enquiries?',
    a: 'Yes. We can answer common questions about your listings, collect buyer details, book site visits and pass conversations to your team when a person is needed.',
  },
  {
    q: 'Can you automate site visit booking?',
    a: "Yes. Buyers request a time through WhatsApp, Telegram or your website, the agent's calendar is checked, and confirmations and reminders go out automatically.",
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
    q: 'How long does an automation take?',
    a: 'It depends on the process. A single workflow is usually quicker than a multi-tool system; we give you a timeline after the discovery call.',
  },
  {
    q: 'How much does automation cost?',
    a: 'Pricing depends on the workflow and the tools involved. After we understand your process, we send a clear quote before any work starts. New clients get the first month free and pay only third-party costs, such as software licences; the setup fee and maintenance charges apply from the second month.',
  },
  {
    q: 'Do you provide ongoing support?',
    a: 'Yes. After launch we monitor your automations, fix issues and improve them as your business changes.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill in the short form below and tell us how leads reach you today. We will get back to you to talk through your workflow.',
  },
];
