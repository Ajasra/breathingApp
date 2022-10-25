import { Container, Grid, Title } from "@mantine/core";
import MainMenu from "@components/UI/MainMenu";
import CloseButton from "@components/UI/CloseButton";

export default function PageHeader(props) {
  const { title, closeBtn, closeFunction } = props;

  return (
    <Container className="PageHeader">
      <Grid grow>
        <Grid.Col span={2}>
          <MainMenu />
        </Grid.Col>
        <Grid.Col span={6} className="Title">
          <Title order={1} align="center">
            {title}
          </Title>
        </Grid.Col>
        <Grid.Col span={1}>
          {closeBtn && <CloseButton onClick={closeFunction} />}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
