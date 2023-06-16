import { Container, Input, PasswordInput, Button } from "@mantine/core";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";

import styles from "@styles/Forms.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import { UserDispatchContext } from "@components/User/UserContext";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import bcrypt from "bcryptjs";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const salt = "$2a$10$yij57FQYMJtkvplP9u73yO";

export default function RegisterForm(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const setUserDetails = useContext(UserDispatchContext);

  const [continueLogin, setContinueLogin] = useState(true);

  async function Login() {
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      setContinueLogin(false);
    } else {
      setNameError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setContinueLogin(false);
    } else {
      setPasswordError("");
    }

    if (passwordConfirm !== password) {
      setPasswordConfirmError("Passwords must match");
      setContinueLogin(false);
    } else {
      setPasswordConfirmError("");
    }

    // if (continueLogin) {
        
        try {
            await axios.post(`${apiUrl}/api/register`, {
                name: name,
                password: password
            })
            .then((res) => {
                console.log(res);
                if(res.data.code == 200) {
                    setUserDetails({
                        userId: res.data.user.id,
                        username: res.data.user.name
                    });
                }else {
                    setNameError(res.data.message);
                }
                setContinueLogin(false);
            })
        } catch (error) {
            if (!error.response) {
                console.log('Network error')
            } else if (error.response.status == 401) {
                console.log('Unauthorized')
            }
            setContinueLogin(false);
        }
        
      // try {
      //   axios
      //     .get(`${apiUrl}/api/br-users/?filters[name][$eq]=${name}`)
      //     .then((res) => {
      //       const usersData = res.data.data;
      //       if (usersData.length > 0) {
      //         setNameError("User already exist");
      //         setContinueLogin(false);
      //       } else {
      //         const hashedPassword = bcrypt.hashSync(password, salt);
      //
      //         try {
      //           axios
      //             .post(`${apiUrl}/api/br-users`, {
      //               data: {
      //                 name: name,
      //                 password: hashedPassword,
      //               },
      //             })
      //             .then((res) => {
      //               setUserDetails({
      //                 userId: res.data.data.id,
      //                 username: res.data.data.attributes.name,
      //               });
      //               // setOpened(false);
      //             });
      //         } catch (error) {
      //           if (!error.response) {
      //             console.log("Network error");
      //           } else if (error.response.status == 401) {
      //             console.log("Unauthorized");
      //           } else if (error.response.status == 400) {
      //             console.log("Bad request");
      //           }
      //         }
      //       }
      //     });
      // } catch (error) {
      //   if (!error.response) {
      //     console.log("Network error");
      //   } else if (error.response.status == 401) {
      //     console.log("Unauthorized");
      //   } else if (error.response.status == 400) {
      //     console.log("Bad request");
      //   }
      //   setContinueLogin(false);
      // }
    // } else {
    //   console.log("login failed");
    // }

    setContinueLogin(true);
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
      <PasswordInput
        placeholder=" Repeat Password"
        label="Repeat Password"
        withAsterisk
        icon={<LockClosedIcon />}
        error={passwordConfirmError}
        onChange={(val) => {
          setPasswordConfirm(val.currentTarget.value);
        }}
      />
      <br />
      <Button onClick={Login}>Login</Button>
    </Container>
  );
}
