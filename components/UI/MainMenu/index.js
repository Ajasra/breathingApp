import { Container, Center, Tooltip } from "@mantine/core";
import { GearIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export default function MainMenu(props) {
  return (
    <Container className="MainMenu">
      <Center className="btn">
        <Tooltip label="Settings">
          <GearIcon className="svg-icon" />
        </Tooltip>
      </Center>
      <Center className="btn">
        <Tooltip label="About">
          <InfoCircledIcon className="svg-icon" />
        </Tooltip>
      </Center>
    </Container>
  );
}
