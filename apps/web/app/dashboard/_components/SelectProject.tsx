"use client";

import type { Tables } from "@/types/supabase/database";

import { Select } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  organizations: Array<Tables<"organizations">>;
  projects: Array<Tables<"projects">>;
  selectedProjectId: Tables<"projects">["id"];
};

export const SelectProject = (props: Props) => {
  const [value, setValue] = useState(props.selectedProjectId.toString());
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <Select.Root
      onValueChange={(value) => {
        setValue(value);
        const params = new URLSearchParams(searchParams);
        params.set("project_id", value);
        replace(`${pathname}?${params.toString()}`);
      }}
      value={value}
    >
      <Select.Trigger />

      <Select.Content>
        {props.projects.map((project) => {
          const organization = props.organizations.find(
            (organization) => organization.id === project.organization_id
          );

          return (
            <Select.Item key={project.id} value={project.id.toString()}>
              {organization!.name}/{project.name}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};
