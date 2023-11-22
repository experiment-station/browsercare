import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { BarList } from "@tremor/react";
import { cookies } from "next/headers";

const DEMO_PROJECT_ID = 3;

type Props =
  | {
      id: number;
    }
  | {
      type: "demo";
    };

export const Project = async (props: Props) => {
  const supabase =
    "type" in props
      ? createSupabaseServiceClient()
      : createSupabaseServerClient(cookies());

  const projectId = "type" in props ? DEMO_PROJECT_ID : props.id;

  const project = await supabase
    .from("projects")
    .select("name, teams(name), events(*)")
    .eq("id", projectId)
    .limit(1, { foreignTable: "teams" })
    .maybeSingle();

  if (!project.data) {
    throw new Error("Project not found");
  }

  const eventSummaryQueries = await Promise.all(
    [
      {
        label: "Browser",
        query: {
          group_type: "browser_name",
        },
      },
      {
        label: "Browser version",
        query: {
          group_type: "browser_name_major",
        },
      },
      {
        label: "Browser engine",
        query: {
          group_type: "engine",
        },
      },
      {
        label: "Device type",
        query: {
          group_type: "device_type",
        },
      },
      {
        label: "Device model",
        query: {
          group_type: "device_vendor_model",
        },
      },
      {
        label: "Operating system",
        query: {
          group_type: "os_name_version",
        },
      },
    ].map(async ({ label, query }) => ({
      data: await supabase
        .rpc("get_event_summary", {
          days: 7,
          event_project_id: projectId,
          ...query,
        })
        .then((response) => response.data),
      label: label,
      query: query,
    }))
  );

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="2">
        <Heading>
          {project.data.teams!.name}/{project.data.name}
        </Heading>
      </Flex>

      <Grid columns="3" gap="4" width="auto">
        {eventSummaryQueries.map(({ data, label, query }) => (
          <Card key={query.group_type}>
            <Text weight="medium">{label}</Text>

            <Box my="2">
              <ScrollArea
                scrollbars="vertical"
                style={{ height: 200 }}
                type="auto"
              >
                <Box pr="4">
                  <BarList
                    color="cyan"
                    data={data!.map((item) => {
                      let name =
                        item.grouped_column1 === null
                          ? "Other"
                          : item.grouped_column1;

                      if (item.grouped_column2) {
                        name += ` ${item.grouped_column2}`;
                      }

                      return {
                        name,
                        value: item.event_count,
                      };
                    })}
                  />
                </Box>
              </ScrollArea>
            </Box>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
};
