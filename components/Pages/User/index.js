import {
  Button,
  Center,
  Container,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext, UserDispatchContext } from "@components/User/UserContext";
import LoginForm from "@components/UI/Forms/Login";
import RegisterForm from "@components/UI/Forms/Register";

export default function UserPage() {
  const [login, setLogin] = useState(true);

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  return (
    <Container className="mainContainer">
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
                setUserDetails(null);
              }}
            >
              LOG OUT
            </Button>
          </Center>
        ) : login ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </TypographyStylesProvider>
    </Container>
  );
}
