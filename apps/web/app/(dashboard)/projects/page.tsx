import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Box, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Page() {
  const supabase = createSupabaseServerClient(cookies());
  const query = await supabase.from('projects').select('id, name, teams(name)');

  return (
    <Flex direction="column" gap="4">
      <Heading>Your projects</Heading>

      <Grid columns="4" gap="3" width="auto">
        {query.data?.map((project) => (
          <Box key={project.id} mb="4">
            <Card asChild>
              <Link href={`/projects/${project.id}`}>
                {project.teams!.name}/{project.name}
              </Link>
            </Card>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}
