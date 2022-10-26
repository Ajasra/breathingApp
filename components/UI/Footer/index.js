import { Container, Grid, Group, Text } from "@mantine/core";
import MainMenu from "@components/UI/MainMenu";
import CloseButton from "@components/UI/CloseButton";

import styles from "@styles/Footer.module.css";

export default function Footer(props) {
  const { closeBtn, closeFunction } = props;

  return (
    <Container className={styles.Footer}>
      {/*<Text align="center">*/}
      {/*  Based on the{" "}*/}
      {/*  <a href="https://www.wimhofmethod.com/" target="_blank">*/}
      {/*    Wim Hof Method*/}
      {/*  </a>*/}
      {/*  . Developed by{" "}*/}
      {/*  <a href="https://twitter.com/Vasily_onl" target="_blank">*/}
      {/*    Vasily*/}
      {/*  </a>*/}
      {/*  .*/}
      {/*</Text>*/}

      <Container className={styles.Menu}>
        <MainMenu />
        {closeBtn && <CloseButton onClick={closeFunction} />}
      </Container>
    </Container>
  );
}
