"use client";

import { Select } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { PROJECT_DATA_PERIODS, ProjectDataPeriod } from "../constants";

type Props = {
  period: ProjectDataPeriod;
};

export const ProjectPeriodSelect = ({ period }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select.Root
      defaultValue={period}
      onValueChange={(value) => {
        const params = new URLSearchParams();
        params.set("period", value);
        router.replace(`${pathname}?${params.toString()}`);
      }}
    >
      <Select.Trigger />

      <Select.Content>
        {PROJECT_DATA_PERIODS.map((period) => (
          <Select.Item key={period.value} value={period.value}>
            {period.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
