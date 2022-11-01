import {
  Blockquote,
  Button,
  Center,
  Container,
  Group,
  Modal,
  Slider,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { Cross1Icon, Link2Icon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {toast} from "react-toastify";

export default function ModalControl({
  opened,
  setOpened,
  sessionSettings,
  setSessionSettings,
}) {
  const [speed, setSpeed] = useState(sessionSettings.speed - 10);
  const [count, setCount] = useState(sessionSettings.count - 30);
  const [cycles, setCycles] = useState(sessionSettings.cycles - 1);

  function saveSettings() {
    setSessionSettings({
      speed: speed + 10,
      count: count + 30,
      cycles: cycles + 1,
      countDown: 3,
      holdTime: 15,
    });
      toast.success("Settings saved", { closeButton: true, autoClose: 15000 });
  }

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
        <Container>
          <Title order={1}  color="cyan.7">Settings</Title>
          <br />
          <Text size="lg" color="cyan.7" >Breath rate (per minute)</Text>
          <Text>Adjust to the speed of your breath.</Text>
          <Slider
            size="xl"
            radius="xl"
            min={0}
            max={70}
            label={(value) => `${value + 10}`}
            step={1}
            // defaultValue={sessionSettings.speed - 10}
            value={speed}
            onChange={setSpeed}
            marks={[
              { value: 0, label: "10" },
              { value: 10, label: "20" },
              { value: 20, label: "30" },
              { value: 30, label: "40" },
              { value: 40, label: "50" },
              { value: 50, label: "60" },
              { value: 60, label: "70" },
              { value: 70, label: "80" },
            ]}
          />
          <br />
          <br />
          <Text size="lg" color="cyan.7">Breath count</Text>
          <Text>Number of breath before holding breath.</Text>
          <Slider
            size="xl"
            radius="xl"
            label={(value) => `${value + 30}`}
            min={0}
            max={30}
            step={5}
            // defaultValue={sessionSettings.count - 30}
            value={count}
            onChange={setCount}
            marks={[
              { value: 0, label: "30" },
              { value: 10, label: "40" },
              { value: 20, label: "50" },
              { value: 30, label: "60" },
            ]}
          />
          <br />
          <br />
          <Text size="lg" color="cyan.7">Rounds</Text>
          <Text>How many rounds you want in the session.</Text>
          <Slider
            size="xl"
            radius="xl"
            label={(value) => `${value + 1}`}
            min={0}
            max={4}
            step={1}
            defaultValue={sessionSettings.cycles - 1}
            value={cycles}
            onChange={setCycles}
            marks={[
              { value: 0, label: "1" },
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4, label: "5" },
            ]}
          />
          <br />
          <br />
          <Center>
            <Button onClick={saveSettings}>SAVE</Button>
          </Center>
        </Container>

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
