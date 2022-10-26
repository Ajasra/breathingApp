import { Center, Tooltip, Group} from "@mantine/core";
import { GearIcon, InfoCircledIcon } from "@radix-ui/react-icons";

import styles from "@styles/MainMenu.module.css";

export default function MainMenu(props) {
  return (
    <Group  className={styles.MainMenu} spacing="xs">
      <Center className={styles.Button}>
        <Tooltip label="Settings">
          <GearIcon className={styles.SvgIcon} />
        </Tooltip>
      </Center>
      <Center className={styles.Button}>
        <Tooltip label="About">
          <InfoCircledIcon className={styles.SvgIcon} />
        </Tooltip>
      </Center>
    </Group >
  );
}
