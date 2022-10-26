import { Center, Container, Tooltip } from "@mantine/core";
import { Cross1Icon } from "@radix-ui/react-icons";

import styles from "@styles/MainMenu.module.css";

export default function CloseButton(props) {
  const { onClick } = props;

  return (
    <Container className={styles.CloseButton}>
      <Center className={styles.Button} onClick={onClick}>
        <Tooltip label="Close">
          <Cross1Icon className={styles.SvgIcon} />
        </Tooltip>
      </Center>
    </Container>
  );
}
