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
import { GetSessions } from "@utils/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@components/User/UserContext";
import { AreaChart } from "@tremor/react";
import StatChart from "@components/UI/Chart";

export default function ModalStatistic({ opened, setOpened }) {
  const userDetails = useContext(UserContext);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function getData() {
      if (userDetails) {
        const stats = await GetSessions(userDetails.userId, setSessions);
      }
    }
    getData();
  }, [userDetails]);

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
          <StatChart sessions={sessions} />
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
