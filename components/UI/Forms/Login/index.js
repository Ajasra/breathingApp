import { Container, Input, PasswordInput, Button } from "@mantine/core";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";

import styles from "@styles/Forms.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import { UserDispatchContext } from "@components/User/UserContext";

import bcrypt from "bcryptjs";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const salt = "$2a$10$yij57FQYMJtkvplP9u73yO";

export default function LoginForm(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const setUserDetails = useContext(UserDispatchContext);

  async function Login() {
    let continueLogin = true;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      continueLogin = false;
    } else {
      setNameError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      continueLogin = false;
    } else {
      setPasswordError("");
    }

    if (continueLogin) {
      const hashedPassword = bcrypt.hashSync(password, salt);

      try {
        axios
          .get(
            `${apiUrl}/api/br-users/?filters[name][$eq]=${name}&filters[password][$eq]=${hashedPassword}`
          )
          .then((res) => {
            const usersData = res.data.data;
            if (usersData.length > 0) {
              setUserDetails({
                userId: usersData[0].id,
                username: usersData[0].attributes.name,
              });
              // setOpened(false);
            } else {
              setUserDetails(null);
              setNameError("User not found");
            }
          });
      } catch (error) {
        if (!error.response) {
          console.log("Network error");
        } else if (error.response.status == 401) {
          console.log("Unauthorized");
        } else if (error.response.status == 400) {
          console.log("Bad request");
        }
      }
    } else {
      console.log("login failed");
    }
  }

  return (
    <Container className={styles.LoginForm}>
      <Input.Wrapper id="login" withAsterisk label="Username" error={nameError}>
        <Input
          id="login"
          icon={<PersonIcon />}
          placeholder="Your name"
          onChange={(val) => {
            setName(val.currentTarget.value);
          }}
        />
      </Input.Wrapper>
      <br />
      <PasswordInput
        placeholder="Password"
        label="Password"
        withAsterisk
        icon={<LockClosedIcon />}
        error={passwordError}
        onChange={(val) => {
          setPassword(val.currentTarget.value);
        }}
      />
      <br />
      <Button onClick={Login}>Login</Button>
    </Container>
  );
}
