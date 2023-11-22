import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Link,
} from "@radix-ui/themes";

import { Project } from "../components/Project";

export default async function Page() {
  return (
    <Flex direction="column" gap="6">
      <CalloutRoot color="gray" size="3">
        <CalloutIcon>
          <InfoCircledIcon />
        </CalloutIcon>

        <CalloutText>
          These stats are gathered from{" "}
          <Link href="https://demo.browser.care">demo.browser.care</Link>
        </CalloutText>
      </CalloutRoot>

      <Project period="7d" type="demo" />
    </Flex>
  );
}