import { Container, Center } from "@mantine/core";

export default function Footer(props) {
  return (
    <Container className="footer">
      <Center>
        Based on the &nbsp;
        <a href="https://www.wimhofmethod.com/" target="_blank">
          Wim Hof Method
        </a>
        . Developed by &nbsp;
        <a href="https://twitter.com/Vasily_onl" target="_blank">
          Vasily
        </a>
        .
      </Center>
    </Container>
  );
}
