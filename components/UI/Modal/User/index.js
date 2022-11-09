import {
  Modal,
  Title,
  TypographyStylesProvider,
  Center,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import LoginForm from "@components/UI/Forms/Login";
import RegisterForm from "@components/UI/Forms/Register";
import { UserContext, UserDispatchContext } from "@components/User/UserContext";

export default function ModalUser({ opened, setOpened }) {
  const [login, setLogin] = useState(true);

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

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
            <span
              style={{ cursor: "pointer", opacity: login ? "1" : "0.5" }}
              onClick={() => setLogin(true)}
            >
              LOGIN
            </span>{" "}
            /{" "}
            <span
              style={{ cursor: "pointer", opacity: !login ? "1" : "0.5" }}
              onClick={() => setLogin(false)}
            >
              REGISTER
            </span>
          </Title>

          <Text size="lg">
            Welcome to BreathingApp! Please login or register to save your data.
            We do not store any personal data or password on our server.
          </Text>
          <br />
          {userDetails != null ? (
            <Center>
              <Button
                onClick={() => {
                  setOpened(false);
                  setUserDetails(null);
                }}
              >
                LOG OUT
              </Button>
            </Center>
          ) : login ? (
            <LoginForm setOpened={setOpened} />
          ) : (
            <RegisterForm setOpened={setOpened} />
          )}
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
