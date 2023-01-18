import { Container } from "@mantine/core";
import MainMenu from "@components/UI/MainMenu";
import CloseButton from "@components/UI/CloseButton";

import styles from "@styles/Footer.module.css";

export default function Footer(props) {
  const {
    closeBtn,
    closeFunction,
    sessionSettings,
    setSessionSettings,
    setPage,
  } = props;

  return (
    <Container className={styles.Footer}>
      <Container className={styles.Menu}>
        <MainMenu
          sessionSettings={sessionSettings}
          setSessionSettings={setSessionSettings}
          setPage={setPage}
        />
        {closeBtn && <CloseButton onClick={closeFunction} />}
      </Container>
    </Container>
  );
}
