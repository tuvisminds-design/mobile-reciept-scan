export interface SubRole {
  title: string
  bullets: string[]
  whyItMatters: string
}

export interface Experience {
  title: string
  company: string
  period: string
  location: string
  subRoles?: SubRole[]
  bullets?: string[]
  whyItMatters?: string
}

export interface Project {
  name: string
  description: string
  tags: string[]
  link?: string
  category: 'product' | 'case-study'
}

export interface Certification {
  name: string
  issuer: string
  platform: string
  date: string
}

export interface Education {
  degree: string
  institution: string
  period: string
  gpa?: string
  highlights?: string[]
}

export const personal = {
  name: 'Madhwaraj Kulkarni',
  title: 'Business Analyst',
  subtitle: 'Aspiring AI Product Manager',
  location: 'Pune, Maharashtra',
  email: 'kulkarni.madhwaraj@gmail.com',
  phone: '+91 9075085119',
  linkedin: 'https://www.linkedin.com/in/madhwaraj-kulkarni',
  medium: 'https://medium.com/@madhwarajkulkarni',
  drivePortfolio: 'https://drive.google.com/drive/folders/1XtlCmWl_YmXhqNf6ZkKpoZXRm5OqUls9',
}

export const highlights = [
  { value: '1.5+', label: 'Years in AI & BA roles' },
  { value: '12', label: 'BA case studies' },
  { value: '8', label: 'Professional certifications' },
  { value: '2', label: 'Business degrees' },
]

export const about = {
  summary:
    'Business Analyst with 1.5 years of experience in AI automation support, chatbot requirement gathering, and data analysis — looking to grow into AI Product Management at an early-stage startup.',
  details: [
    'I have built foundational exposure to LLM tools, RPA workflows, and product thinking through real work and self-initiated projects, and I am eager to learn and contribute in a hands-on PM environment.',
    'Currently at VIT Infotech, I contribute to AI-driven automation initiatives involving workflow mapping, user story creation, product validation, and proposed solution development using the IntelliBuddies platform.',
    'With an MBA in Digital Transformation from Symbiosis International University and a Business Analytics background from Christ University, I enjoy solving business problems through process thinking, data-driven insights, and user-focused product analysis.',
  ],
  interests: [
    'AI Product Management',
    'Product Analytics',
    'Workflow Automation',
    'Digital Transformation',
    'User Experience Optimization',
  ],
}

export const experience: Experience[] = [
  {
    title: 'Business Analyst',
    company: 'VIT Infotech',
    period: 'Jan 2025 – Present',
    location: 'Pune',
    subRoles: [
      {
        title: 'AI Product Testing & Workflow Analysis',
        bullets: [
          'Supported testing/validation for an in-house AI customer support bot and an Australian dealer management system client',
          'Created and refined user stories for workflow scenarios; analyzed edge cases',
          'Evaluated user flow clarity, identified friction points, contributed to requirement validation',
        ],
        whyItMatters:
          'Hands-on reps in the core PM loop — writing user stories, spotting UX friction, and validating requirements against real product behavior.',
      },
      {
        title: 'AI Automation Consulting — IntelliBuddies (IB-X Platform)',
        bullets: [
          'Assisted in developing automation solutions using IB-X',
          'Mapped business workflows, identified automation opportunities, structured process flows for consulting initiatives',
          'Aligned automation capabilities with business pain points, weighing usability and scalability',
        ],
        whyItMatters:
          'Practiced translating a business problem into a structured solution — the same muscle used in scoping a feature or writing a PRD.',
      },
      {
        title: 'Pre-Sales & Market Research Support',
        bullets: [
          'Supported email drip campaigns; segmented target lists using Seamless.ai',
          'Assisted personalized outreach content; helped narrow high-potential customer segments',
        ],
        whyItMatters:
          'Early exposure to the go-to-market side of product — understanding who the customer is before you build for them.',
      },
    ],
  },
  {
    title: 'Market Research Analyst Intern',
    company: 'Enabling Fundamentals',
    period: 'Jul – Aug 2022',
    location: 'Nashik',
    bullets: [
      'Ran LinkedIn campaigns targeting founders/decision-makers with personalized messaging',
      'Supported early-stage business development for the founder',
    ],
    whyItMatters:
      'Direct exposure to startup-stage decision-making — small team, high ownership, fast iteration.',
  },
  {
    title: 'Business Analyst Intern',
    company: 'PV Clean Mobility Technologies',
    period: 'Jul – Sep 2021',
    location: 'Pune',
    bullets: [
      'Conducted root cause analysis on process inefficiencies',
      'Built Looker Studio dashboards for operational visibility and data-driven decisions',
    ],
    whyItMatters:
      'Built the habit of diagnosing "why" before proposing "what" — a core PM instinct — and communicating findings visually to stakeholders.',
  },
]

export const productProjects: Project[] = [
  {
    name: 'SpeakEasy — AI Public Speaking Assistant',
    description:
      'Independent product concept to practice product thinking. Identified problem space for introverts and novice speakers, conducted competitive analysis of 6+ platforms, and designed user journeys and wireframes.',
    tags: ['Product Thinking', 'User Research', 'Wireframing', 'Competitive Analysis'],
    category: 'product',
  },
  {
    name: 'TRAF-FIX — Real-Time Traffic Alert App',
    description:
      'Academic project contributing to design and planning of a real-time traffic alert application with UI mock-ups, user workflows, and system requirements for congestion tracking.',
    tags: ['UI Design', 'Requirements', 'Market Research'],
    category: 'product',
  },
  {
    name: 'Waste Management Optimization',
    description:
      'Analyzed operational inefficiencies in a heavy machinery manufacturing environment and translated findings into Figma wireframes with stakeholder presentations.',
    tags: ['Data Analysis', 'Figma', 'Process Improvement'],
    category: 'product',
  },
  {
    name: 'Power BI Business Insights Dashboard',
    description:
      'Built an interactive Power BI dashboard using real-world datasets to analyze trends and communicate insights through data visualization.',
    tags: ['Power BI', 'Data Visualization', 'Analytics'],
    category: 'product',
  },
]

export const caseStudies: Project[] = [
  { name: 'Agile Vs Waterfall', description: 'Comparative analysis of project management methodologies for enterprise delivery.', tags: ['BA', 'Methodology'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Budget Variance', description: 'Financial variance analysis and reporting for business decision support.', tags: ['Finance', 'Analytics'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Conversation AI', description: 'AI chatbot requirements and workflow design for customer interaction.', tags: ['AI', 'Chatbot'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Document Processing', description: 'Automated document intake and processing workflow analysis.', tags: ['Automation', 'RPA'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Employee Onboarding', description: 'End-to-end onboarding process mapping and automation opportunities.', tags: ['HR', 'Workflow'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Employee Offboarding', description: 'Offboarding workflow design with compliance and handover requirements.', tags: ['HR', 'Process'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Expense Reimbursement', description: 'Expense claim process analysis with policy validation and approval flows.', tags: ['Finance', 'Automation'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Invoice Processing', description: 'Accounts payable automation with OCR and exception handling workflows.', tags: ['AP', 'RPA'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Migration Project', description: 'System migration planning with stakeholder alignment and risk assessment.', tags: ['Migration', 'BA'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Payroll', description: 'Payroll process automation and compliance workflow documentation.', tags: ['HR', 'Payroll'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'Purchase Order Creation', description: 'Procurement workflow from requisition to PO generation.', tags: ['Procurement', 'Workflow'], link: personal.drivePortfolio, category: 'case-study' },
  { name: 'UiPath', description: 'RPA automation projects using UiPath for business process optimization.', tags: ['RPA', 'UiPath'], link: personal.drivePortfolio, category: 'case-study' },
]

export const skills = {
  'AI & Automation': [
    'LLM Tools',
    'Prompt Engineering',
    'Chatbot Requirement Support',
    'AI/ML Workflow Observation',
    'RPA (IntelliBuddies)',
    'Generative AI',
  ],
  'Product Thinking': [
    'User Stories',
    'Requirements Documentation',
    'Wireframing',
    'Competitor Research',
    'User Workflow Mapping',
  ],
  'Data & Analytics': [
    'Power BI',
    'Data Visualisation',
    'Google Trends',
    'Customer Segmentation',
  ],
  'Business & Research': [
    'Market Research',
    'Pre-Sales Support',
    'Root Cause Analysis',
    'SWOT',
    'McKinsey 7S',
  ],
  Tools: [
    'Microsoft Power BI',
    'Figma',
    'ChatGPT',
    'IntelliBuddies RPA',
    'MS Office',
  ],
  'Soft Skills': [
    'Stakeholder Communication',
    'Analytical Thinking',
    'Self-directed Learning',
    'Attention to Detail',
  ],
}

export const education: Education[] = [
  {
    degree: 'MBA — Digital Transformation',
    institution: 'Symbiosis International University',
    period: '2023 – 2025',
    gpa: '6.18',
    highlights: ['Digital Transformation', 'Business Analytics', 'Process Diagrams'],
  },
  {
    degree: 'BBA — Business Analytics',
    institution: 'Christ University',
    period: '2020 – 2023',
    gpa: '8.2',
    highlights: ['Business Analytics', 'Data Visualization', 'Project Management', 'Process Analysis'],
  },
]

export const certifications: Certification[] = [
  { name: 'IBM AI Product Management Professional Certificate', issuer: 'IBM', platform: 'Coursera', date: 'Mar 2026' },
  { name: 'IBM Product Management Professional Certificate', issuer: 'IBM', platform: 'Coursera', date: 'Mar 2026' },
  { name: 'AI For Everyone', issuer: 'DeepLearning.AI', platform: 'Coursera', date: 'Mar 2025' },
  { name: 'Prompt Engineering with ChatGPT', issuer: 'Vanderbilt University', platform: 'Coursera', date: 'Jan 2025' },
  { name: 'Google Project Management Professional Certificate', issuer: 'Google', platform: 'Coursera', date: 'Feb 2024' },
  { name: 'Leadership Skills', issuer: 'IIM Ahmedabad', platform: 'IIMA Exec Ed', date: 'Feb 2024' },
  { name: 'Microsoft Power BI Data Analyst Professional Certificate', issuer: 'Microsoft', platform: 'Coursera', date: 'Ongoing' },
  { name: 'Google Data Analytics Professional Certificate', issuer: 'Google', platform: 'Coursera', date: 'Feb 2022' },
]

export const contactInterests = [
  'Product Management',
  'AI Products',
  'Business Analysis',
  'Workflow Automation',
  'Dashboard Analytics',
  'Digital Transformation',
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]
