import {
  Container,
  List,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";

export default function InformationPage() {
  return (
    <Container className="mainContainer">
      <TypographyStylesProvider>
        <Title order={1} color="cyan.7">
          About
        </Title>

        <Text size="lg">
          This simple app was created first of all for a personal use based on
          Wim Hof method. You can use original{" "}
          <a
            href="https://www.wimhofmethod.com"
            target="_blank"
            rel="noreferrer"
          >
            app
          </a>{" "}
          or follow the instruction on{" "}
          <a
            href="https://www.youtube.com/watch?v=tybOi4hjZFQ"
            target="_blank"
            rel="noreferrer"
          >
            youtube
          </a>{" "}
          . This app is not affiliated with Wim Hof.
        </Text>
        <br />
        <Text size="lg">
          I decided to create this app as a simple exercise to learn React and
          create a tool where i could have more control over the settings and
          track my performance. I decided to open it to the public in case you
          find it useful.
        </Text>
        <Text size="lg">
          Please support Wim Hof and his work by{" "}
          <a
            href="https://www.wimhofmethod.com/"
            target="_blank"
            rel="noreferrer"
          >
            buying his book or courses.
          </a>
          . You also always can support me by following me on{" "}
          <a
            href="https://twitter.com/Vasily_onl"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>{" "}
          or buying me a{" "}
          <span style={{ textDecoration: "line-through cyan" }}>coffee</span>{" "}
          <a
            href="https://www.buymeacoffee.com/vasilyonl"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            book
          </a>{" "}
          .
        </Text>
        <br />
        <Text size="lg">
          This is work in progress and I will improve it based on my needs, but
          I also open for your feedback and suggestions. You can contact me on
          twitter.
        </Text>
        <br />
        <Title order={3}>Roadmap</Title>
        <List>
          <List.Item>
            Dashboard and statistics for recorded sessions and settings
            (correlation how different settings affect result).
          </List.Item>
          <List.Item>
            Add heartbeat record (manual, need to see how it will better
            represent actual data)
          </List.Item>
        </List>
        <br />
        <Text>
          <a
              href="https://github.com/Ajasra/breathingApp"
              target="_blank"
              rel="noreferrer"
          >
            Source code
          </a>
        </Text>
      </TypographyStylesProvider>
    </Container>
  );
}
