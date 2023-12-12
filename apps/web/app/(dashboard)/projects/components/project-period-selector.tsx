'use client';

import { Select } from '@radix-ui/themes';
import { usePathname, useRouter } from 'next/navigation';

import type { ProjectDataPeriod } from '../constants';

import { PROJECT_DATA_PERIODS } from '../constants';

type Props = {
  period: ProjectDataPeriod;
};

export function ProjectPeriodSelect({ period }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select.Root
      defaultValue={period}
      onValueChange={(value) => {
        const params = new URLSearchParams();
        params.set('period', value);
        router.replace(`${pathname}?${params.toString()}`);
      }}
    >
      <Select.Trigger />

      <Select.Content highContrast>
        {PROJECT_DATA_PERIODS.map((p) => (
          <Select.Item key={p.value} value={p.value}>
            {p.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
