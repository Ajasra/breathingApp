import { Center, Tooltip, Group } from "@mantine/core";
import { GearIcon, InfoCircledIcon, PersonIcon } from "@radix-ui/react-icons";

import styles from "@styles/MainMenu.module.css";
import { useContext, useState } from "react";
import ModalControl from "@components/UI/Modal/Control";
import ModalInfo from "@components/UI/Modal/Info";
import { UserContext } from "@components/User/UserContext";
import ModalUser from "@components/UI/Modal/User";

export default function MainMenu(props) {
  const userDetails = useContext(UserContext);

  const [controlOpen, setControlOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [userOpen, setUserOpenned] = useState(false);

  return (
    <>
      <Group className={styles.MainMenu} spacing="xs">
        <Center className={styles.Button}>
          <Tooltip label="Settings">
            <GearIcon
              className={styles.SvgIcon}
              onClick={() => {
                setControlOpen(true);
              }}
            />
          </Tooltip>
        </Center>
        <Center className={styles.Button}>
          <Tooltip label="About">
            <InfoCircledIcon
              className={styles.SvgIcon}
              onClick={() => {
                setInfoOpen(true);
              }}
            />
          </Tooltip>
        </Center>
        <Center className={styles.Button}>
          <Tooltip label="Login">
            <PersonIcon
              className={styles.SvgIcon}
              onClick={() => {
                setUserOpenned(true);
              }}
              style={{ opacity: userDetails != null ? 1 : 0.2 }}
            />
          </Tooltip>
        </Center>
      </Group>

      <ModalControl
        opened={controlOpen}
        setOpened={setControlOpen}
        {...props}
      />
      <ModalInfo infoOpen={infoOpen} setInfoOpen={setInfoOpen} {...props} />
      <ModalUser opened={userOpen} setOpened={setUserOpenned} {...props} />
    </>
  );
}
