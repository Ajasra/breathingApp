import { Container, Grid, Title, Center } from "@mantine/core";
import MainMenu from "@components/UI/MainMenu";
import CloseButton from "@components/UI/CloseButton";

import styles from "@styles/Header.module.css";

export default function PageHeader(props) {
  const { title, closeBtn, closeFunction } = props;

  return (
    <Container className={styles.PageHeader}>
      <Center>
        <Title order={1} align="center" color="cyan.8" className={styles.Title}>
          {title}
        </Title>
      </Center>
    </Container>
  );
}
