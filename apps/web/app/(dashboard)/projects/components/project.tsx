import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseServiceClient } from '@/lib/supabase/service';
import { Flex, Heading } from '@radix-ui/themes';
import { cookies } from 'next/headers';

import type { ProjectDataPeriod } from '../constants';

import { ProjectEvents } from './project-events';
import { ProjectPeriodSelect } from './project-period-selector';

type Props = {
  period?: string;
} & (
  | {
      demo: true;
    }
  | {
      demo?: boolean;
      id: number;
    }
);

const normalizeProjectDataPeriod = (
  period: Props['period'],
): ProjectDataPeriod => {
  switch (period) {
    case '24h':
    case '7d':
    case '14d':
    case '30d':
      return period;

    default:
      return '24h';
  }
};

export const Project = async (props: Props) => {
  const period = normalizeProjectDataPeriod(props.period);

  const supabase = props.demo
    ? createSupabaseServiceClient()
    : createSupabaseServerClient(cookies());

  const projectId = props.demo ? 3 : props.id;

  const project = await supabase
    .from('projects')
    .select('name, teams(name), events(*)')
    .eq('id', projectId)
    .limit(1, { foreignTable: 'teams' })
    .maybeSingle();

  if (!project.data?.teams) {
    throw new Error('Project not found');
  }

  return (
    <Flex direction="column" gap="4">
      <Flex direction="row" justify="between">
        <Heading>
          {project.data.teams.name}/{project.data.name}
        </Heading>

        <ProjectPeriodSelect period={period} />
      </Flex>

      <ProjectEvents
        period={period}
        projectId={projectId}
        supabase={supabase}
      />
    </Flex>
  );
};
