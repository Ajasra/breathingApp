import { Center, Container, Tooltip } from "@mantine/core";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function CloseButton(props) {
  const { onClick } = props;

  return (
    <Container className="CloseButton">
      <Center className="btn" onClick={onClick}>
        <Tooltip label="Close">
          <Cross1Icon className="svg-icon" />
        </Tooltip>
      </Center>
    </Container>
  );
}
