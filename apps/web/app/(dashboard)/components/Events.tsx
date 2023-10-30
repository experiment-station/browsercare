import { Tables } from "@/types/supabase/database";
import { Box, Card, Grid, ScrollArea, Text } from "@radix-ui/themes";
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
  Object.entries(eventGroups)
    .map(([key, value]) => ({
      name: key,
      value: value.length,
    }))
    .sort((a, b) => b.value - a.value);

const BarListWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box my="2">
    <ScrollArea scrollbars="vertical" style={{ height: 180 }} type="auto">
      <Box pr="5">{children}</Box>
    </ScrollArea>
  </Box>
);

export const Events = ({ data = [] }: { data: Tables<"events">[] }) => {
  const events = data.map(decodeEvent);

  return (
    <Grid columns="3" gap="4" width="auto">
      <Card>
        <Text weight="medium">Browser</Text>

        <BarListWrapper>
          <BarList
            color="cyan"
            data={getGroupCounts(
              groupBy(events, (event) => event.browser.name)
            )}
          />
        </BarListWrapper>
      </Card>

      <Card>
        <Text weight="medium">Browser version</Text>

        <BarListWrapper>
          <BarList
            color="cyan"
            data={getGroupCounts(
              groupBy(
                events,
                (event) => event.browser.name + " " + event.browser.major
              )
            )}
          />
        </BarListWrapper>
      </Card>

      <Card>
        <Text weight="medium">Browser engine</Text>

        <BarListWrapper>
          <BarList
            color="cyan"
            data={getGroupCounts(groupBy(events, (event) => event.engine.name))}
          />
        </BarListWrapper>
      </Card>

      <Card>
        <Text weight="medium">Device type</Text>

        <BarListWrapper>
          <BarList
            color="pink"
            data={getGroupCounts(
              groupBy(events, (event) => event.device.type || "desktop")
            )}
          />
        </BarListWrapper>
      </Card>

      <Card>
        <Text weight="medium">Device vendor</Text>

        <BarListWrapper>
          <BarList
            color="pink"
            data={getGroupCounts(
              groupBy(events, (event) => event.device.vendor)
            )}
          />
        </BarListWrapper>
      </Card>

      <Card>
        <Text weight="medium">Operating system</Text>

        <BarListWrapper>
          <BarList
            color="pink"
            data={getGroupCounts(groupBy(events, (event) => event.os.name))}
          />
        </BarListWrapper>
      </Card>
    </Grid>
  );
};
