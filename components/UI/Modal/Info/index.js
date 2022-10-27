import {Blockquote, Modal, Title, TypographyStylesProvider, Center, Text, Container, Group, Button} from "@mantine/core";
import {Cross1Icon, Link2Icon, TwitterLogoIcon} from "@radix-ui/react-icons";

export default function ModalInfo({infoOpen, setInfoOpen}) {

  return (
    <>
      <Modal
        radius="md"
        centered
        withCloseButton={false}
        opened={infoOpen}
        onClose={() => setInfoOpen(false)}
        size="xl"
      >
        <TypographyStylesProvider>
          <Title order={1}>
            About
          </Title>
          <Blockquote className="list_notify">
            Symbiosis with entropy and uncertainty to create.
          </Blockquote>

          <Text size="lg">
            I am an entropy artist, New Media director of Sokaris studio,
            educator, and Founder of LiaisonDAO (you will hear more about it
            soon). My main area of interest is self-organized systems, such as
            the environment, society, Technium, our body, or any complex object.
            So, I can say everything.
          </Text>
          <br />
          <Text size="lg">
            My story is relatively short but with an extensive scope of
            experience. With a background in mathematics and computer science, a
            masters degree in cinema studies. Full-time work as a photographer,
            developer, designer, and new media artist.
          </Text>
        </TypographyStylesProvider>
        <Container className="controls">
          <Center className="btn">
            <a href="https://Vasily.onl" target="_blank" rel="noreferrer" >
              <Link2Icon className="svg-icon" />
            </a>
          </Center>
          <Center className="btn">
            <a href="https://twitter.com/Vasily_onl" target="_blank" rel="noreferrer" >
              <TwitterLogoIcon className="svg-icon" />
            </a>
          </Center>
          <Center className="btn">
            <Cross1Icon
              className="svg-icon"
              onClick={() => {
                setInfoOpen(false);
              }}
            />
          </Center>
        </Container>
      </Modal>

      <Group position="center" hidden>
        <Button onClick={() => setInfoOpen(true)}>Open Modal</Button>
      </Group>
    </>
  );
}
