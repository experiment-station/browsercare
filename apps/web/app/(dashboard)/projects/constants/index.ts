export const PROJECT_DATA_PERIODS = [
  {
    label: 'Last 24 hours',
    value: '24h',
  },
  {
    label: 'Last 7 days',
    value: '7d',
  },
  {
    label: 'Last 14 days',
    value: '14d',
  },
  {
    label: 'Last 30 days',
    value: '30d',
  },
] as const;

export type ProjectDataPeriod = (typeof PROJECT_DATA_PERIODS)[number]['value'];
