import {
  Modal,
  Title,
  TypographyStylesProvider,
  Center,
  Text,
  Container,
  Group,
  Button,
  List,
  Card,
} from "@mantine/core";
import { Cross1Icon } from "@radix-ui/react-icons";
import StatChart from "@components/UI/Chart";

export default function ModalStatistic({ opened, setOpened }) {

  return (
    <>
      <Modal
        radius="md"
        centered
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        size="xl"
      >
        <TypographyStylesProvider>
          <Title order={1} color="cyan.7">
            STATISTIC
          </Title>
          <StatChart />
        </TypographyStylesProvider>
        <Container className="controls">
          <Center className="btn">
            <Cross1Icon
              className="svg-icon"
              onClick={() => {
                setOpened(false);
              }}
            />
          </Center>
        </Container>
      </Modal>

      <Group position="center" hidden>
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}
