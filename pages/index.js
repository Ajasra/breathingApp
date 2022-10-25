import styles from "../styles/Home.module.css";

import axios from "axios";

import { useEffect, useState } from "react";
import PageHeader from "@components/UI/Header";
import Footer from "@components/UI/Footer";
import { Container, Center, Button, Title, Text } from "@mantine/core";

export default function Home() {
  const [title, setTitle] = useState("GET READY");
  const [subtitle, setSubtitle] = useState("");

  const [userId, setUserId] = useState(1);

  const [activeSession, setActiveSession] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [sessionSettings, setSessionSettings] = useState({
    speed: 30,
    count: 30,
    cycles: 3,
    countDown: 3,
    holdTime: 15,
  });
  const [sessionCycle, setSessionCycle] = useState(-1);
  const [sessionState, setSessionState] = useState(-1);
  const [breathCount, setBreathCount] = useState(-1);
  const [retentionTime, setRetentionTime] = useState(-1);
  const [holdTime, setHoldTime] = useState(-1);
  const [countDown, setCountDown] = useState(3);

  const [maxRetention, setMaxRetention] = useState(0);
  const [averageRetention, setAverageRetention] = useState(0);

  useEffect(() => {
    closeSession();
  }, []);

  function startSession() {
    setActiveSession(true);
    setSubtitle("Get ready to start your breathing session");
    setSessionData([]);
    setSessionCycle(-1);
    setSessionState(-1);
    setBreathCount(-1);
    setRetentionTime(-1);
    setHoldTime(-1);
    setAverageRetention(0);
    setMaxRetention(0);
  }

  function closeSession() {
    setActiveSession(false);
    setCountDown(sessionSettings.countDown);
    setSessionCycle(-1);
    setSessionState(-1);
    setBreathCount(-1);
    setRetentionTime(-1);
    setHoldTime(-1);
  }

  function BreakHold() {
    AddResult();
    setSessionState(2);
  }

  function AddResult() {
    setSessionData([...sessionData, retentionTime.toFixed(1)]);
  }

  function saveSession(data, settings) {
    let retention_time = "";
    data.map((item, index) => {
      if (index == 0) retention_time = item;
      else retention_time = retention_time + "," + item;
    });
    let set =
      settings.speed +
      "," +
      settings.count +
      "," +
      settings.cycles +
      "," +
      settings.holdTime;

    try {
      const response = axios.post(
        "http://localhost:1337/api/br-sessions?populate=br_user",
        {
          data: {
            br_user: [userId],
            retention_time: retention_time,
            settings: set,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // here we are doing countdown before experience starts
  useEffect(() => {
    let interval = null;
    if (activeSession && countDown > 0) {
      interval = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeSession, countDown]);
  useEffect(() => {
    if (activeSession && countDown == 0) setSessionCycle(1);
  }, [countDown]);

  // dealing with the session cycles
  useEffect(() => {
    if (sessionCycle > 0 && sessionCycle <= sessionSettings.cycles) {
      setSessionState(0);
    }
    if (sessionCycle > sessionSettings.cycles) {
      setSubtitle("You have completed your session");
      saveSession(sessionData, sessionSettings);
    }
  }, [sessionCycle]);

  //dealing with the session states
  useEffect(() => {
    switch (sessionState) {
      case 0:
        setBreathCount(sessionSettings.count);
        setSubtitle("Inhale / Exhale");
        break;
      case 1:
        setRetentionTime(0);
        setSubtitle("Hold your breath");
        break;
      case 2:
        setHoldTime(sessionSettings.holdTime);
        setSubtitle("Hold In");
        break;
      default:
        break;
    }
  }, [sessionState]);

  // dealing with breath count
  useEffect(() => {
    let interval = null;
    if (
      breathCount > 0 &&
      breathCount <= sessionSettings.count &&
      sessionState == 0
    ) {
      interval = setInterval(() => {
        setBreathCount(breathCount - 1);
      }, 60000 / sessionSettings.speed);
    } else {
      clearInterval(interval);
    }
    if (breathCount == 0) setSessionState(1);
    return () => clearInterval(interval);
  }, [breathCount]);

  // dealing with retention time
  useEffect(() => {
    let interval = null;
    if (retentionTime >= 0 && sessionState == 1) {
      interval = setInterval(() => {
        setRetentionTime(retentionTime + 0.1);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [retentionTime]);

  // dealing with hold time
  useEffect(() => {
    let interval = null;
    if (holdTime > 0 && holdTime <= 15 && sessionState == 2) {
      interval = setInterval(() => {
        setHoldTime(holdTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (holdTime == 0) setSessionCycle(sessionCycle + 1);
    return () => clearInterval(interval);
  }, [holdTime]);

  // get current session date
  useEffect(() => {
    if (sessionData.length > 0) {
      let max = Math.max(...sessionData);
      let average =
        sessionData.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) /
        sessionData.length;
      setMaxRetention(max);
      setAverageRetention(average);
    }
  }, [sessionData]);

  return (
    <div className={styles.container}>
      <PageHeader
        title={title}
        closeBtn={activeSession}
        closeFunction={closeSession}
      />

      <Container className={styles.main}>
        {!activeSession && (
          <Center>
            <Button size="xl" onClick={startSession}>
              START
            </Button>
          </Center>
        )}

        {activeSession && (
          <>
            <Container>
              <Title order={3}>{subtitle}</Title>
            </Container>
            <Container>
              {sessionData.length > 0 && (
                <>
                  <Text>Maximum retention time: {maxRetention.toFixed(1)}</Text>
                  <Text>
                    Average retention time: {averageRetention.toFixed(1)}
                  </Text>
                </>
              )}

              {sessionData.map((item, index) => (
                <>
                  <Text key={index}>
                    round {index}: {item}
                  </Text>
                </>
              ))}
            </Container>
            <Container>
              {countDown > 0 && <h1>Start in: {countDown}</h1>}
              {breathCount > 0 && <h1>Breath: {breathCount}</h1>}
              {sessionState == 1 && (
                <>
                  <Button size="xl" onClick={BreakHold}>
                    Stop
                  </Button>
                  <h1>Hold: {retentionTime.toFixed(1)}</h1>
                </>
              )}
              {holdTime > 0 && <h1>Hold: {holdTime}</h1>}
            </Container>
          </>
        )}
      </Container>

      <Footer />
    </div>
  );
}
