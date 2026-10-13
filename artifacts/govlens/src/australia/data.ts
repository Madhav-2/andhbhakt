export interface Program {
  slug: string;
  name: string;
  category: string;
  period: string;
  agency: string;
  status:
    | "Audit concerns"
    | "Partly effective"
    | "Delivery reported"
    | "Outcome tracking";
  metric: string;
  metricLabel: string;
  promise: string;
  finding: string;
  caveat: string;
  source: string;
  sourceLabel: string;
}

// Curated source snapshots, not a live feed. Keep reporting periods explicit.
export const programs: Program[] = [
  {
    slug: "community-sport",
    name: "Community Sport Infrastructure",
    category: "Sport & communities",
    period: "ANAO · 15 January 2020",
    agency: "Australian Sports Commission",
    status: "Audit concerns",
    metric: "A$100m",
    metricLabel: "grants awarded · 2018–19",
    promise:
      "Improve access to community sporting facilities through competitive grants.",
    finding:
      "ANAO found weaknesses in the assessment and advice underpinning grant awards. Successful projects did not consistently reflect the highest assessed merit.",
    caveat:
      "A historical audit of grant selection, not a finding about every funded project or its eventual outcome.",
    source:
      "https://www.anao.gov.au/work/performance-audit/award-funding-under-the-community-sport-infrastructure-program",
    sourceLabel: "ANAO report 23 · 2019–20",
  },
  {
    slug: "commuter-car-parks",
    name: "Commuter Car Park Projects",
    category: "Infrastructure",
    period: "ANAO · 28 June 2021",
    agency: "Department of Infrastructure",
    status: "Audit concerns",
    metric: "A$660.4m",
    metricLabel: "committed · at 31 March 2021",
    promise: "Expand commuter parking as part of the Urban Congestion Fund.",
    finding:
      "ANAO concluded that administration of the commuter car park projects was not effective.",
    caveat:
      "The commitment is not expenditure. Findings describe the period examined in the 2021 audit, not current construction progress.",
    source:
      "https://www.anao.gov.au/work/performance-audit/administration-commuter-car-park-projects-within-the-urban-congestion-fund",
    sourceLabel: "ANAO report 47 · 2020–21",
  },
  {
    slug: "building-better-regions",
    name: "Building Better Regions Fund",
    category: "Infrastructure",
    period: "ANAO · 2022 audit",
    agency: "Department of Infrastructure",
    status: "Partly effective",
    metric: "5 rounds",
    metricLabel: "examined by the audit",
    promise:
      "Support infrastructure and community investment in regional Australia.",
    finding:
      "ANAO assessed funding awards as partly effective. It identified shortcomings in how decisions used departmental advice and how their basis was recorded.",
    caveat:
      "This assessment covers the first five funding rounds. It is not a ranking of regional communities.",
    source:
      "https://www.anao.gov.au/work/performance-audit/award-funding-under-the-building-better-regions-fund",
    sourceLabel: "ANAO · funding performance audit",
  },
  {
    slug: "housing-fund",
    name: "Social & Affordable Housing",
    category: "Housing",
    period: "Housing Australia · 2024–25 report",
    agency: "Housing Australia",
    status: "Delivery reported",
    metric: "18,650",
    metricLabel: "homes in the reported pipeline",
    promise:
      "Support 40,000 social and affordable homes across the Housing Australia Future Fund Facility and National Housing Accord Facility.",
    finding:
      "The 2024–25 annual report records a pipeline of 18,650 homes from the first two rounds.",
    caveat:
      "A pipeline is not completed housing. This is an agency-reported snapshot, not an independent audit or a current delivery count.",
    source:
      "https://www.transparency.gov.au/publications/treasury-i/housing_australia/housing-australia-annual-report-2024-25/housing-australia-future-fund-facility-and-housing-australia-accord-facility",
    sourceLabel: "Housing Australia · annual report 2024–25",
  },
  {
    slug: "closing-the-gap",
    name: "Closing the Gap",
    category: "First Nations",
    period: "Productivity Commission · source dashboard",
    agency: "Australian governments and Coalition of Peaks",
    status: "Outcome tracking",
    metric: "17",
    metricLabel: "socio-economic outcome areas",
    promise:
      "Track the outcomes and reforms in the National Agreement on Closing the Gap.",
    finding:
      "The Productivity Commission dashboard provides target-level evidence and available disaggregations. Open the source for the latest assessment of each target.",
    caveat:
      "No aggregate success score is assigned here. Targets have different measures, timeframes and data availability.",
    source: "https://www.pc.gov.au/closing-the-gap-data/dashboard/",
    sourceLabel: "Productivity Commission · Closing the Gap",
  },
];

export const jurisdictions = [
  {
    code: "NSW",
    name: "New South Wales",
    capital: "Sydney",
    audit: "https://www.audit.nsw.gov.au/",
    government: "https://www.nsw.gov.au/",
  },
  {
    code: "VIC",
    name: "Victoria",
    capital: "Melbourne",
    audit: "https://www.audit.vic.gov.au/",
    government: "https://www.vic.gov.au/",
  },
  {
    code: "QLD",
    name: "Queensland",
    capital: "Brisbane",
    audit: "https://www.qao.qld.gov.au/",
    government: "https://www.qld.gov.au/",
  },
  {
    code: "WA",
    name: "Western Australia",
    capital: "Perth",
    audit: "https://audit.wa.gov.au/",
    government: "https://www.wa.gov.au/",
  },
  {
    code: "SA",
    name: "South Australia",
    capital: "Adelaide",
    audit: "https://www.audit.sa.gov.au/",
    government: "https://www.sa.gov.au/",
  },
  {
    code: "TAS",
    name: "Tasmania",
    capital: "Hobart",
    audit: "https://www.audit.tas.gov.au/",
    government: "https://www.tas.gov.au/",
  },
  {
    code: "ACT",
    name: "Australian Capital Territory",
    capital: "Canberra",
    audit: "https://www.audit.act.gov.au/",
    government: "https://www.act.gov.au/",
  },
  {
    code: "NT",
    name: "Northern Territory",
    capital: "Darwin",
    audit: "https://www.nt.gov.au/ntao/",
    government: "https://nt.gov.au/",
  },
];

export const resources = {
  parliament: [
    {
      title: "Members’ interests",
      label: "HOUSE OF REPRESENTATIVES",
      text: "Read the published declarations of financial and other registrable interests. A declaration alone does not establish misconduct.",
      url: "https://www.aph.gov.au/senators_and_members/members/register",
    },
    {
      title: "Senators’ interests",
      label: "THE SENATE",
      text: "Explore tabled statements and changes to senators’ registrable interests.",
      url: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Senators_Interests/Tabled_volumes",
    },
    {
      title: "Find your representatives",
      label: "PARLIAMENT OF AUSTRALIA",
      text: "Find federal members and senators, their electorates, parliamentary work and contact details.",
      url: "https://www.aph.gov.au/Senators_and_Members",
    },
  ],
  funding: [
    {
      title: "Follow political funding",
      label: "AEC TRANSPARENCY REGISTER",
      text: "Search official financial disclosures from political parties, donors, candidates and other participants.",
      url: "https://transparency.aec.gov.au/",
    },
    {
      title: "Election returns",
      label: "AUSTRALIAN ELECTORAL COMMISSION",
      text: "Find published election disclosure returns and information on the periods they cover.",
      url: "https://www.aec.gov.au/Parties_and_Representatives/financial_disclosure/transparency-register/election-returns.htm",
    },
    {
      title: "Understand the disclosures",
      label: "SOURCE GUIDE",
      text: "Check the AEC’s current disclosure guidance before comparing returns. Receipts and donations are not interchangeable measures.",
      url: "https://www.aec.gov.au/Parties_and_Representatives/financial_disclosure/",
    },
  ],
  outcomes: [
    {
      title: "People & population",
      label: "AUSTRALIAN BUREAU OF STATISTICS",
      text: "Compare national, state and territory population releases, with reporting periods and source tables.",
      url: "https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population",
    },
    {
      title: "Closing the Gap",
      label: "PRODUCTIVITY COMMISSION",
      text: "Explore target-level progress on First Nations outcomes, with context on available data.",
      url: "https://www.pc.gov.au/closing-the-gap-data/dashboard/",
    },
    {
      title: "Government services",
      label: "PRODUCTIVITY COMMISSION",
      text: "Explore the Report on Government Services for comparable evidence on public services.",
      url: "https://www.pc.gov.au/ongoing/report-on-government-services",
    },
  ],
};
