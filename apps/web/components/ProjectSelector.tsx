"use client";

import { Database } from "@/types/supabase/database";
import { Select, SelectItem } from "@tremor/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  organizations: Database["public"]["Tables"]["organizations"]["Row"][];
  projects: Database["public"]["Tables"]["projects"]["Row"][];
  selectedProjectId: Database["public"]["Tables"]["projects"]["Row"]["id"];
};

export const ProjectSelector = (props: Props) => {
  const [value, setValue] = useState(props.selectedProjectId.toString());
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="max-w-sm">
      <Select
        enableClear={false}
        onValueChange={(value) => {
          setValue(value);

          const params = new URLSearchParams(searchParams);
          params.set("project_id", value);

          replace(`${pathname}?${params.toString()}`);
        }}
        value={value}
      >
        {props.projects.map((project) => {
          const organization = props.organizations.find(
            (organization) => organization.id === project.organization_id
          );

          return (
            <SelectItem key={project.id} value={project.id.toString()}>
              {organization!.name}/{project.name}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
};
