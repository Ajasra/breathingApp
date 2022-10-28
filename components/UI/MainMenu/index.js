import { Center, Tooltip, Group } from "@mantine/core";
import { GearIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import styles from "@styles/MainMenu.module.css";
import { useState } from "react";
import ModalControl from "@components/UI/Modal/Control";
import ModalInfo from "@components/UI/Modal/Info";

export default function MainMenu(props) {
  const { sessionSettings, setSessionSettings } = props;

  const [controlOpen, setControlOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

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
      </Group>

      <ModalControl
        opened={controlOpen}
        setOpened={setControlOpen}
        {...props}
      />
      <ModalInfo infoOpen={infoOpen} setInfoOpen={setInfoOpen} {...props} />
    </>
  );
}
