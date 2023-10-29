import { Tables } from "@/types/supabase/database";
import { Box, Card, Grid, Text } from "@radix-ui/themes";
import { BarList } from "@tremor/react";
import { UAParser } from "@ua-parser-js/pro-business";
import { groupBy } from "remeda";

const decodeEvent = (event: Tables<"events">) => {
  const { user_agent } = event;
  const uaParser = new UAParser(user_agent);
  const ua = uaParser.getResult();
  return ua;
};

type DecodedEvent = ReturnType<typeof decodeEvent>;

const getGroupCounts = (eventGroups: Record<string, DecodedEvent[]>) =>
  Object.entries(eventGroups).map(([key, value]) => ({
    name: key,
    value: value.length,
  }));

export const Events = ({ data = [] }: { data: Tables<"events">[] }) => {
  const events = data.map(decodeEvent);

  return (
    <Grid columns="3" gap="4" width="auto">
      <Card>
        <Text weight="medium">Browser</Text>

        <Box my="2">
          <BarList
            color="cyan"
            data={getGroupCounts(
              groupBy(events, (event) => event.browser.name)
            )}
          />
        </Box>
      </Card>

      <Card>
        <Text weight="medium">Browser version</Text>

        <Box my="2">
          <BarList
            color="cyan"
            data={getGroupCounts(
              groupBy(
                events,
                (event) => event.browser.name + " " + event.browser.major
              )
            )}
          />
        </Box>
      </Card>

      <Card>
        <Text weight="medium">Browser engine</Text>

        <Box my="2">
          <BarList
            color="cyan"
            data={getGroupCounts(groupBy(events, (event) => event.engine.name))}
          />
        </Box>
      </Card>

      <Card>
        <Text weight="medium">Device type</Text>

        <Box my="2">
          <BarList
            color="pink"
            data={getGroupCounts(
              groupBy(events, (event) => event.device.type || "desktop")
            )}
          />
        </Box>
      </Card>

      <Card>
        <Text weight="medium">Device vendor</Text>

        <Box my="2">
          <BarList
            color="pink"
            data={getGroupCounts(
              groupBy(events, (event) => event.device.vendor)
            )}
          />
        </Box>
      </Card>

      <Card>
        <Text weight="medium">Operating system</Text>

        <Box my="2">
          <BarList
            color="pink"
            data={getGroupCounts(groupBy(events, (event) => event.os.name))}
          />
        </Box>
      </Card>
    </Grid>
  );
};
