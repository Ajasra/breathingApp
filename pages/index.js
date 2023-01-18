import styles from "../styles/Home.module.css";

import { useState } from "react";
import Footer from "@components/UI/Footer";
import Timer from "@components/Pages/Timer";
import SettingsPage from "@components/Pages/Settings";
import StatisticsPage from "@components/Pages/Statistics";
import InformationPage from "@components/Pages/Information";
import UserPage from "@components/Pages/User";

export default function Home() {
  const [activeSession, setActiveSession] = useState(false);
  const [sessionSettings, setSessionSettings] = useState({
    init: false,
    settingsId: null,
    speed: 30,
    count: 30,
    cycles: 3,
    countDown: 3,
    holdTime: 15,
  });

  const [page, setPage] = useState("timer");

  function closeSession() {
    setActiveSession(false);
  }
  
  console.log(sessionSettings);

  return (
    <div className={styles.container}>
      {page === "timer" && (
        <Timer
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          sessionSettings={sessionSettings}
          setSessionSettings={setSessionSettings}
        />
      )}
      {page === "settings" && (
        <SettingsPage
          sessionSettings={sessionSettings}
          setSessionSettings={setSessionSettings}
          setPage={setPage}
        />
      )}
      {page === "statistics" && <StatisticsPage />}
      {page === "information" && <InformationPage />}
      {page === "user" && <UserPage />}

      <Footer
        closeBtn={activeSession}
        closeFunction={closeSession}
        sessionSettings={sessionSettings}
        setSessionSettings={setSessionSettings}
        className={styles.footer}
        setPage={setPage}
      />
    </div>
  );
}
