export const groups = [
  {
    name: 'Start a business',
    label: 'Incorporation',
    icon: 'building',
    items: ['Proprietorship', 'Private Limited Company', 'Limited Liability Partnership', 'One Person Company', 'Section 8 Company', 'Partnership Firm'],
  },
  {
    name: 'GST services',
    label: 'GST',
    icon: 'receipt',
    items: ['GST Registration', 'GST Return Filing', 'GST LUT Filing', 'GST Amendment', 'GST Cancellation'],
  },
  {
    name: 'Income Tax services',
    label: 'Income Tax',
    icon: 'calculator',
    items: ['Income Tax Return', 'TDS Return Filing', 'Income Tax Notice Assistance'],
  },
  {
    name: 'Business registrations',
    label: 'Registrations',
    icon: 'badge',
    items: ['MSME / Udyam Registration', 'FSSAI Registration', 'Import Export Code (IEC)', 'Trademark Registration', 'Professional Tax Registration'],
  },
  {
    name: 'Accounting & compliance',
    label: 'Compliance',
    icon: 'chart',
    items: ['Bookkeeping & Accounting', 'Payroll Management', 'Virtual CFO', 'Statutory Audit', 'Annual MCA Compliance', 'PF & ESIC Registration', 'PAN & TAN Application'],
  },
];

export const slugify = (text: string) => text.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const servicePricing = {
  'Proprietorship': { basic: '₹999', standard: '₹1,999', premium: '₹3,999' },
  'Private Limited Company': { basic: '₹4,999', standard: '₹7,999', premium: '₹12,999' },
  'Limited Liability Partnership': { basic: '₹3,999', standard: '₹6,999', premium: '₹10,999' },
  'One Person Company': { basic: '₹4,999', standard: '₹7,999', premium: '₹11,999' },
  'Section 8 Company': { basic: '₹7,999', standard: '₹14,999', premium: '₹24,999' },
  'Partnership Firm': { basic: '₹1,499', standard: '₹2,999', premium: '₹5,999' },
  'GST Registration': { basic: '₹499', standard: '₹1,499', premium: '₹2,999' },
  'GST Return Filing': { basic: '₹999/month', standard: '₹1,999/month', premium: '₹3,999/month' },
  'GST LUT Filing': { basic: '₹799', standard: '₹1,499', premium: '₹2,499' },
  'GST Amendment': { basic: '₹999', standard: '₹1,999', premium: '₹3,499' },
  'Income Tax Return': { basic: '₹999', standard: '₹2,999', premium: '₹5,999' },
  'TDS Return Filing': { basic: '₹999/qtr', standard: '₹1,999/qtr', premium: '₹3,999/qtr' },
  'MSME / Udyam Registration': { basic: '₹499', standard: '₹999', premium: '₹1,999' },
  'FSSAI Registration': { basic: '₹999', standard: '₹1,999', premium: '₹3,999' },
  'Import Export Code (IEC)': { basic: '₹999', standard: '₹1,999', premium: '₹3,499' },
  'Trademark Registration': { basic: '₹1,999', standard: '₹4,999', premium: '₹8,999' },
  'Professional Tax Registration': { basic: '₹1,499', standard: '₹2,499', premium: '₹4,499' },
  'Bookkeeping & Accounting': { basic: '₹2,999/month', standard: '₹5,999/month', premium: '₹11,999/month' },
  'Payroll Management': { basic: '₹1,499/month', standard: '₹2,999/month', premium: '₹5,999/month' },
  'Virtual CFO': { basic: '₹9,999/month', standard: '₹19,999/month', premium: '₹39,999/month' },
  'Statutory Audit': { basic: '₹9,999', standard: '₹19,999', premium: '₹39,999+' },
  'Annual MCA Compliance': { basic: '₹4,999/year', standard: '₹8,999/year', premium: '₹14,999/year' },
  'PF & ESIC Registration': { basic: '₹1,999', standard: '₹3,999', premium: '₹6,999' },
  'GST Cancellation': { basic: '₹1,499', standard: '₹2,999', premium: '₹4,999' },
  'Income Tax Notice Assistance': { basic: '₹1,999', standard: '₹4,999', premium: '₹9,999' },
  'PAN & TAN Application': { basic: '₹499', standard: '₹999', premium: '₹1,999' },
} as const;

const descriptions: Record<string, string> = {
  'Proprietorship': 'Start a business as a single owner, without incorporating a company. Get help identifying the registrations your activity needs, preparing documents and understanding your responsibilities. There is no single central proprietorship incorporation certificate.',
  'GST LUT Filing': 'LUT means Letter of Undertaking. Eligible GST-registered businesses use it to export goods, export qualifying services or supply SEZs for authorised operations without paying IGST upfront, subject to legal conditions.',
  'GST Cancellation': 'Closing your business or no longer need GST registration? Get help checking eligibility, preparing the cancellation application and understanding remaining return obligations.',
  'Income Tax Notice Assistance': 'Understand your income tax notice and the information it asks for. Get help reviewing your records and preparing a response before the stated deadline.',
  'PAN & TAN Application': 'Apply for PAN or TAN with help selecting the correct application, checking your documents and tracking the acknowledgement. Government application charges are separate.',
  'GST Registration': 'Get your business GST-ready. We help you understand eligibility, prepare your documents and submit your registration application.',
  'GST Return Filing': 'Keep your GST returns organised, accurate and on schedule, with help reconciling sales, purchases and input tax credit.',
  'Income Tax Return': 'File your income tax return with clarity. Get help choosing the right return, reviewing income and claiming eligible deductions.',
  'Private Limited Company': 'Turn your business idea into a registered company. Get guided support with names, documents and incorporation filings.',
  'Bookkeeping & Accounting': 'Know where your business stands. Keep your records organised and turn day-to-day transactions into useful financial reports.',
  'Virtual CFO': 'Get a clearer view of cash flow, planning and business performance with financial guidance tailored to your business.',
};

export type PriceKey = 'basic' | 'standard' | 'premium';

// Proposed package scopes are confirmed with the client before engagement.
const packageDetails: Record<string, readonly [string, string, string, string, string]> = {
  "Proprietorship": [
    "Single-owner business and activity checklist",
    "Applicable registration eligibility guidance",
    "Preparation assistance for one agreed registration",
    "Owner and business document review",
    "Tax and ongoing-compliance consultation"
  ],
  "Private Limited Company": [
    "Name availability guidance",
    "Director and office document checklist",
    "Incorporation application preparation",
    "Draft constitutional documents review",
    "Post-incorporation compliance consultation"
  ],
  "Limited Liability Partnership": [
    "Partner and address document checklist",
    "LLP name application guidance",
    "Incorporation form preparation",
    "LLP agreement information review",
    "Partner obligations and compliance consultation"
  ],
  "One Person Company": [
    "Director and nominee document checklist",
    "Company name application guidance",
    "OPC incorporation preparation",
    "Nominee and declaration review",
    "Post-registration compliance consultation"
  ],
  "Section 8 Company": [
    "Charitable-object information checklist",
    "Director and office document guidance",
    "Section 8 application preparation",
    "Objects and supporting declarations review",
    "Governance and compliance consultation"
  ],
  "Partnership Firm": [
    "Partner and business details checklist",
    "Partnership deed preparation guidance",
    "Registration application assistance",
    "Capital and profit-sharing terms review",
    "Partner responsibilities consultation"
  ],
  "GST Registration": [
    "GST eligibility and category check",
    "Business and address document checklist",
    "Registration application assistance",
    "Application details and document review",
    "Registration queries and next-step consultation"
  ],
  "GST Return Filing": [
    "Sales and purchase records checklist",
    "GST return preparation",
    "Return submission assistance",
    "Sales and input tax credit reconciliation",
    "Mismatch review and GST consultation"
  ],
  "GST LUT Filing": [
    "Exporter eligibility check",
    "LUT document checklist",
    "LUT application preparation",
    "Export and undertaking details review",
    "LUT renewal and export-compliance consultation"
  ],
  "GST Amendment": [
    "Registration change checklist",
    "Supporting document guidance",
    "Amendment application preparation",
    "Core and non-core change review",
    "Related GST updates consultation"
  ],
  "GST Cancellation": [
    "Cancellation eligibility check",
    "Outstanding returns checklist",
    "Cancellation application preparation",
    "Liabilities and supporting records review",
    "Final-return and closure consultation"
  ],
  "Income Tax Return": [
    "Income and deduction document checklist",
    "Applicable ITR selection guidance",
    "Return preparation and filing assistance",
    "Form 26AS and AIS reconciliation",
    "Tax-position and filing follow-up consultation"
  ],
  "TDS Return Filing": [
    "Deductor and payment records checklist",
    "TDS return preparation",
    "Quarterly return submission assistance",
    "Challan and deduction reconciliation",
    "Correction requirements consultation"
  ],
  "Income Tax Notice Assistance": [
    "Notice type and deadline review",
    "Requested-records checklist",
    "Draft response preparation guidance",
    "AIS and supporting records reconciliation",
    "Response strategy and follow-up consultation"
  ],
  "MSME / Udyam Registration": [
    "Business eligibility check",
    "PAN and business details checklist",
    "Udyam application assistance",
    "Activity and enterprise classification review",
    "Registration update consultation"
  ],
  "FSSAI Registration": [
    "Food business category guidance",
    "Identity and premises checklist",
    "Registration application assistance",
    "Business activity and document review",
    "Renewal and compliance consultation"
  ],
  "Import Export Code (IEC)": [
    "Business and bank details checklist",
    "IEC application preparation",
    "Application submission assistance",
    "Business and banking records review",
    "IEC update and annual confirmation consultation"
  ],
  "Trademark Registration": [
    "Proposed mark and activity checklist",
    "Trademark class guidance",
    "Application preparation assistance",
    "Preliminary similar-mark search review",
    "Application status and next-step consultation"
  ],
  "Professional Tax Registration": [
    "State applicability check",
    "Employer and employee details checklist",
    "Registration application assistance",
    "Salary and liability information review",
    "Professional tax compliance consultation"
  ],
  "Bookkeeping & Accounting": [
    "Monthly transaction records collection",
    "Sales and expense entry support",
    "Monthly ledger summary",
    "Bank reconciliation and ledger review",
    "Management reporting and accounts consultation"
  ],
  "Payroll Management": [
    "Employee and attendance checklist",
    "Monthly salary calculation",
    "Payslip preparation",
    "Deductions and payroll records review",
    "Payroll reporting and compliance consultation"
  ],
  "Virtual CFO": [
    "Monthly financial records checklist",
    "Cash-flow snapshot",
    "Financial performance summary",
    "Budget and variance review",
    "Business planning and decision consultation"
  ],
  "Statutory Audit": [
    "Audit readiness document checklist",
    "Ledger and evidence organisation",
    "Audit coordination assistance",
    "Financial statement and control review",
    "Findings discussion and next-step consultation"
  ],
  "Annual MCA Compliance": [
    "Annual filing document checklist",
    "Company and director details review",
    "Applicable MCA form preparation",
    "Financial and annual-return records review",
    "Annual compliance planning consultation"
  ],
  "PF & ESIC Registration": [
    "Employer applicability check",
    "Employee and wage document checklist",
    "Registration application assistance",
    "Employee and employer information review",
    "Contribution and ongoing-compliance consultation"
  ],
  "PAN & TAN Application": [
    "PAN or TAN application guidance",
    "Identity and address document checklist",
    "Application preparation assistance",
    "Applicant details and supporting proof review",
    "Application tracking and correction consultation"
  ]
};

// All tiers are scope-based proposals, not verified market averages or final quotes.

export const services = groups.flatMap(group => group.items.map(name => {
  const pricing = servicePricing[name as keyof typeof servicePricing];
  if (!pricing) throw new Error(`Missing Basic, Standard, and Premium prices for ${name}`);

  const detail = packageDetails[name];
  if (!detail) throw new Error(`Missing package details for ${name}`);
  const packages = {
    basic: { description: 'Essential preparation for a straightforward requirement.', features: detail.slice(0, 3) },
    standard: { description: 'Essential support plus a closer review of your records.', features: [...detail.slice(0, 3), detail[3]] },
    premium: { description: 'Detailed review plus a consultation on your next steps.', features: [...detail.slice(0, 3), detail[3], detail[4]] },
  };

  return {
    name,
    slug: slugify(name === 'Import Export Code (IEC)' ? 'Import Export Code' : name),
    category: group.name,
    description: descriptions[name] ?? `Make ${name.toLowerCase()} simpler with alohaTax. Our team helps you understand the requirements, organise your documents and move forward with confidence.`,
    pricing,
    packages,
    suggestedPricing: true,
  };
}));

export type Service = typeof services[number];

export const offices = [
  { name: 'Rama Vihar · Uttam Nagar', address: 'WE-82, Rama Park Road, Mohan Garden, Uttam Nagar, New Delhi – 110059', main: true },
  { name: 'Dwarka', address: 'RZ-126, A-Block, Dharampura Colony, Najafgarh, New Delhi – 110043' },
  { name: 'Mahavir Enclave', address: 'RZF-22, Road No. 4, Mahavir Enclave, New Delhi – 110045' },
  { name: 'Palam Colony', address: 'RZ-GM-24, Street No. 9, Raj Nagar-2, Palam Colony, New Delhi – 110077' },
  { name: 'Burari', address: 'House No. 235, Street No. 3/17A, B-Block, Kaushik Enclave, Burari, New Delhi – 110084' },
  { name: 'Sushant Lok', address: 'C-173, G/F, Sushant Lok-3, Sector-57, Gurgaon, Haryana' },
  { name: 'Siraspur', address: 'Flat No. 984, C-1 Block, DDA, Siraspur, Ekta Apartment, Delhi – 110042' },
];

export const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/alohaaindia/?hl=en' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590999298328' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/106129462/' },
  { name: 'YouTube', href: 'https://alohatax.in/' },
  { name: 'X', href: 'https://x.com/alohaindia2021' },
];

export const metadata = (title: string, description: string) => ({ meta: [{ title: `${title} | alohaTax` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | alohaTax` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] });

export function documentsFor(service: Service) {
  if (service.name === 'Proprietorship') return ['Proprietor PAN and identity proof', 'Business address and ownership / rental proof', 'Proposed business activity and trade name', 'Bank details and activity-specific documents'];
  if (service.name === 'GST LUT Filing') return ['GSTIN and authorised signatory details', 'Previous LUT acknowledgement, if available', 'Export / SEZ contracts or invoice details', 'Export eligibility, payment and SEZ authorisation records, as applicable'];
  if (service.name === 'Income Tax Notice Assistance') return ['Copy of the notice and response deadline', 'PAN and relevant assessment year', 'Previously filed return and computation', 'Supporting income, payment and transaction records'];
  if (service.name === 'GST Cancellation') return ['GST registration details', 'Reason and date of business closure or cancellation', 'Filed returns and outstanding liability details', 'Stock and business closure records, where applicable'];
  if (service.name === 'PAN & TAN Application') return ['Applicant identity and address proof', 'Date of birth or incorporation proof', 'Business constitution details, if applicable', 'Authorised signatory and contact details'];
  if (service.category === 'Start a business') return ['Identity and PAN of directors / partners', 'Registered office address proof', 'Proposed business names and activity', 'Ownership or rental documents'];
  if (service.category === 'Income Tax services') return ['PAN and Aadhaar details', 'Form 16 / income statements', 'Bank interest and investment statements', 'Previous return, if available'];
  if (service.category === 'GST services') return ['PAN and identity proof', 'Business address proof', 'Bank account details', 'Business constitution / transaction records'];
  return ['PAN and identity proof', 'Business registration details', 'Business address proof', 'Relevant financial or activity records'];
}