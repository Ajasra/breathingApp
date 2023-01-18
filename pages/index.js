import styles from "../styles/Home.module.css";

import { useContext, useEffect, useState } from "react";
import PageHeader from "@components/UI/Header";
import Footer from "@components/UI/Footer";
import { Container, Center, Button, Title, Text } from "@mantine/core";
import { GetSettings, SaveSession } from "@utils/api";
import Clock from "@components/UI/Clock";
import { useScreenWakeLock } from "screen-wake-lock";
import { UserContext } from "@components/User/UserContext";

export default function Home(props) {
  const [subtitle, setSubtitle] = useState("");

  const [bell, setBell] = useState(null);
  const [notify, setNotify] = useState(null);

  const userDetails = useContext(UserContext);

  const [activeSession, setActiveSession] = useState(false);
  const [sessionData, setSessionData] = useState([]);

  const [sessionSettings, setSessionSettings] = useState({
    init: false,
    settingsId: null,
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
  const [averagePercent, setAveragePercent] = useState(50);

  useEffect(() => {
    closeSession();
    setBell(new Audio("../assets/sound/bell.mp3"));
    setNotify(new Audio("../assets/sound/30s.mp3"));
    if (bell != null) {
      bell.load();
      bell.loop = false;
      bell.stop();
    }
    if (notify != null) {
      notify.volume = 0;
      notify.load();
      notify.loop = false;
      notify.stop();
    }

  }, []);

  // Update user details when user changes
  useEffect(() => {
    async function getSettings() {
      const settings = await GetSettings(
        userDetails.userId,
        setSessionSettings
      );
    }
    if (userDetails) {
      getSettings();
    }
  }, [userDetails]);

  //reset session on start
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

  //close session on end
  function closeSession() {
    setActiveSession(false);
    setCountDown(sessionSettings.countDown);
    setSessionCycle(-1);
    setSessionState(-1);
    setBreathCount(-1);
    setRetentionTime(-1);
    setHoldTime(-1);
  }

  //stop retention timer
  function BreakHold() {
    AddResult();
    setSessionState(2);
  }

  function AddResult() {
    setSessionData([...sessionData, retentionTime.toFixed(1)]);
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
    if (breathCount == 0) {
      setSessionState(1);
      bell.play();
    }
    return () => clearInterval(interval);
  }, [breathCount]);

  // dealing with retention time
  useEffect(() => {
    let interval = null;
    if (retentionTime >= 0 && sessionState == 1) {
      interval = setInterval(() => {
        setRetentionTime(retentionTime + 1);
      }, 1000);
      if (retentionTime % 30 == 0) {
        notify.volume = 0.2;
        notify.play(); //play sound every 30s
      }
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
    if (holdTime == 0) {
      setSessionCycle(sessionCycle + 1);
      bell.play();
    }
    return () => clearInterval(interval);
  }, [holdTime]);

  // get current session date
  useEffect(() => {
    if (sessionData.length > 0) {
      let max = Math.max(...sessionData);
      let average =
        sessionData.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) /
        sessionData.length;
      const startOffset = average * 0.5;
      setMaxRetention(max);
      setAverageRetention(average);
      setAveragePercent(((average - startOffset) / max) * 100);
    }
  }, [sessionData]);

  useScreenWakeLock();

  return (
    <div className={styles.container}>
      <PageHeader title={subtitle} />
      <Container className={styles.main}>
        {!activeSession && (
          <Center className={styles.StartButton}>
            <Button size="xl" onClick={startSession} radius="md">
              START SESSION
            </Button>
          </Center>
        )}
        {activeSession && (
          <>
            <Container className={styles.Result}>
              {sessionData.length > 0 && (
                <>
                  <Container className={styles.Progress}>
                    <div className={styles.MaxTime}></div>
                    <div
                      className={styles.AverTime}
                      style={{ width: `${averagePercent}%` }}
                    ></div>
                  </Container>

                  <Text
                    style={{ position: "absolute", right: "1em", top: "-2em" }}
                  >
                    <Clock data={maxRetention.toFixed(1)} />
                  </Text>
                  {sessionData.length > 1 && (
                    <Text
                      style={{
                        position: "absolute",
                        left: `${averagePercent - 5}%`,
                        top: "-2em",
                      }}
                    >
                      <Clock data={averageRetention.toFixed(1)} />
                    </Text>
                  )}
                  <Text>
                    {" "}
                    Retention time: <br />
                    {sessionData.map((item, index) => (
                      <>
                        <span key={`result${index}`} className={styles.colored}>
                          <Clock data={item} />
                        </span>
                        {index == sessionData.length - 1 ? " " : " | "}
                      </>
                    ))}
                  </Text>
                </>
              )}
            </Container>
            <Container>
              {countDown > 0 && (
                <Center>
                  <Title order={1} className={styles.CountDown}>
                    Start in: {countDown}
                  </Title>
                </Center>
              )}
              {breathCount > 0 && (
                <Center>
                  <Title order={1} className={styles.CountDown}>
                    {breathCount}
                  </Title>
                </Center>
              )}
              {sessionState == 1 && (
                <>
                  <Center>
                    <Title order={1} className={styles.CountDown}>
                      <Clock data={retentionTime.toFixed(1)} />
                    </Title>
                  </Center>
                  <Center>
                    <Button
                      size="xl"
                      onClick={BreakHold}
                      radius="md"
                      className={styles.StopRetention}
                    >
                      STOP
                    </Button>
                  </Center>
                </>
              )}
              {holdTime > 0 && (
                <Center>
                  <Title order={1} className={styles.CountDown}>
                    {holdTime}
                  </Title>
                </Center>
              )}
            </Container>
            {sessionCycle > sessionSettings.cycles && (
              <Center>
                <Button
                  size="xl"
                  onClick={() => {
                    if (userDetails != null) {
                      SaveSession(
                        sessionData,
                        sessionSettings,
                        averageRetention,
                        userDetails.userId
                      );
                    }
                    closeSession();
                  }}
                  radius="md"
                  className={styles.SaveButton}
                >
                  SAVE SESSION
                </Button>
              </Center>
            )}
          </>
        )}
      </Container>
      <Footer
        closeBtn={activeSession}
        closeFunction={closeSession}
        sessionSettings={sessionSettings}
        setSessionSettings={setSessionSettings}
        className={styles.footer}
      />
    </div>
  );
}
