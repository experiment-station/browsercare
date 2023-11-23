"use client";

import {
  ArrowRightIcon,
  DotsHorizontalIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import {
  Blockquote,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  ScrollArea,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useChat } from "ai/react";

type Props = {
  data: any;
};

export const ProjectAI = (props: Props) => {
  const { handleInputChange, handleSubmit, input, messages } = useChat({
    api: "/api/ai",
  });

  return (
    <Card style={{ height: "100%" }}>
      <Flex direction="column" gap="4" height="100%" justify="between">
        <Text weight="medium">Chat with browsercare AI</Text>

        <ScrollArea style={{ height: 600 }} type="auto">
          <Flex direction="column" gap="2" pr="8">
            {messages.map((message, index) => (
              <Blockquote
                color={message.role === "user" ? "mint" : "gray"}
                key={index}
                size="2"
              >
                {message.content}
              </Blockquote>
            ))}
          </Flex>
        </ScrollArea>

        <Flex asChild direction="column" gap="2" mt="auto">
          <form onSubmit={handleSubmit}>
            <TextArea
              onChange={handleInputChange}
              placeholder="Type something..."
              value={input}
            />

            <Box ml="auto">
              <Button size="1" type="submit">
                Send
                <ArrowRightIcon />
              </Button>
            </Box>
          </form>
        </Flex>
      </Flex>
    </Card>
  );
};
