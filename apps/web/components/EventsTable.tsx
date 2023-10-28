"use client";

import { UAParser } from "@ua-parser-js/pro-business";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { Database } from "@/types/supabase/database";

type Event = Database["public"]["Tables"]["events"]["Row"];

const formatEvent = (event: Event) => {
  const parser = new UAParser(event.user_agent);
  const device = parser.getDevice();
  const browser = parser.getBrowser();

  return {
    createdAt: event.created_at,
    id: event.id,
    device,
    browser,
  };
};

const Json = ({ children }: { children: any }) => (
  <pre>{JSON.stringify(children, null, 2)}</pre>
);

export const EventsTable = ({ events }: { events: Event[] }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Timestamp</TableHeaderCell>
        <TableHeaderCell>Device</TableHeaderCell>
        <TableHeaderCell>Browser</TableHeaderCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {events.map(formatEvent).map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.createdAt}</TableCell>

          <TableCell>
            <Json>{item.device}</Json>
          </TableCell>

          <TableCell>
            <Json>{item.browser}</Json>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
