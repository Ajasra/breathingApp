import { Container, Title, TypographyStylesProvider } from "@mantine/core";
import StatChart from "@components/UI/Chart";

export default function StatisticsPage(props) {
  return (
    <Container className="mainContainer">
      <TypographyStylesProvider>
        <Title order={1} color="cyan.7">
          STATISTIC
        </Title>
        <StatChart />
      </TypographyStylesProvider>
    </Container>
  );
}
