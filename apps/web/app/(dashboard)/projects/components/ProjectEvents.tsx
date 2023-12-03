import { createSupabaseServerClient } from '@/lib/supabase/server';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Box,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Card,
  Code,
  Flex,
  Grid,
  ScrollArea,
  Text,
} from '@radix-ui/themes';
import { BarList } from '@tremor/react';
import { Suspense } from 'react';

import type { ProjectDataPeriod } from '../constants';

const projectDataPeriodToDays = (period: ProjectDataPeriod) => {
  switch (period) {
    case '24h':
      return 1;

    case '7d':
      return 7;

    case '14d':
      return 14;

    case '30d':
      return 30;

    default:
      throw new Error('Invalid period');
  }
};

const ProjectEvent = async ({
  period,
  projectId,
  supabase,
  type,
}: {
  period: ProjectDataPeriod;
  projectId: number;
  supabase: ReturnType<typeof createSupabaseServerClient>;
  type: string;
}) => {
  const query = await supabase.rpc('get_event_summary', {
    days: projectDataPeriodToDays(period),
    event_project_id: projectId,
    group_type: type,
  });

  const data = query.data || [];

  if (query.error) {
    return (
      <CalloutRoot color="red">
        <CalloutIcon>
          <InfoCircledIcon />
        </CalloutIcon>
        <CalloutText>
          Failed to load data:
          <Code variant="outline">{query.error.message}</Code>
        </CalloutText>
      </CalloutRoot>
    );
  }

  return (
    <Box pr="5">
      <BarList
        color="cyan"
        data={data.map((item) => {
          let name =
            item.grouped_column1 === null ? 'Other' : item.grouped_column1;

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
  );
};

const ProjectEventLoading = () => (
  <Flex direction="column" gap="2">
    {Array.from({ length: 3 }).map((_, i) => (
      <CalloutRoot className="animate-pulse" color="gray" key={i}>
        <Box height="2" width="100%" />
      </CalloutRoot>
    ))}
  </Flex>
);

export const ProjectEvents = async ({
  period,
  projectId,
  supabase,
}: {
  period: ProjectDataPeriod;
  projectId: number;
  supabase: ReturnType<typeof createSupabaseServerClient>;
}) => {
  const eventGroups = [
    {
      label: 'Browser',
      type: 'browser_name',
    },
    {
      label: 'Browser version',
      type: 'browser_name_major',
    },
    {
      label: 'Engine',
      type: 'engine',
    },
    {
      label: 'Device type',
      type: 'device_type',
    },
    {
      label: 'Device model',
      type: 'device_vendor_model',
    },
    {
      label: 'Operating system',
      type: 'os_name_version',
    },
  ];

  return (
    <Grid columns="3" gap="4" grow="1" width="auto">
      {eventGroups.map(({ label, type }) => (
        <Card key={type}>
          <Text weight="medium">{label}</Text>

          <Box my="2">
            <ScrollArea
              scrollbars="vertical"
              style={{ height: 180 }}
              type="auto"
            >
              <Suspense fallback={<ProjectEventLoading />} key={type + period}>
                <ProjectEvent
                  period={period}
                  projectId={projectId}
                  supabase={supabase}
                  type={type}
                />
              </Suspense>
            </ScrollArea>
          </Box>
        </Card>
      ))}
    </Grid>
  );
};
