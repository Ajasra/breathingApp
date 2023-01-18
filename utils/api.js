import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiActive = process.env.NEXT_PUBLIC_API_ACTIVE;

export function SaveSession(data, settings, average, userId) {
  const setSerialized = JSON.stringify(settings);
  const dataSerialized = JSON.stringify({
    rounds: data,
    average: average.toFixed(2),
  });

  if (apiActive) {
    try {
      const response = axios.post(
        `${apiUrl}/api/br-sessions?populate=br_user`,
        {
          data: {
            br_user: [userId],
            retention_time: dataSerialized,
            settings: setSerialized,
          },
        }
      );
      console.log(response);
      // toast.success("Session saved", { closeButton: true, autoClose: 15000 });
    } catch (e) {
      console.log(e);
      // toast.error("No image selected", { closeButton: true, autoClose: 15000 });
    }
  } else {
    console.log("API disabled");
  }
}

export function GetSettings(userId, setSessionSettings) {
  if (apiActive) {
    try {
      axios
        .get(
          `${apiUrl}/api/br-settings?populate=br_user&filters[br_user][id][$eq]=${userId}`
        )
        .then((res) => {
          const settingsData = res.data.data;
          if (settingsData.length > 0) {
            let savedSettings = JSON.parse(settingsData[0].attributes.setting);
            savedSettings.settingsId = settingsData[0].id;
            savedSettings.init = true;
            setSessionSettings(savedSettings);
          }
        });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("API disabled");
  }
}

export function SaveSettings(settings, userId, setSessionSettings) {
  const setSerialized = JSON.stringify(settings);

  if (settings.settingsId == null) {
    // create new record
    try {
      const response = axios
        .post(`${apiUrl}/api/br-settings/`, {
          data: {
            setting: setSerialized,
            br_user: [userId],
          },
        })
        .then((res) => {
          setSessionSettings({
            settingsId: res.data.data.id,
            speed: settings.speed,
            count: settings.count,
            cycles: settings.cycles,
            countDown: settings.countDown,
            holdTime: settings.holdTime,
          });
        });
      console.log(response);
      // toast.success("Settings saved", { closeButton: true, autoClose: 15000 });
    } catch (e) {
      console.log(e);
      // toast.error("No image selected", { closeButton: true, autoClose: 15000 });
    }
  } else {
    // update record
    try {
      const response = axios
        .put(`${apiUrl}/api/br-settings/${settings.settingsId}`, {
          data: {
            setting: setSerialized,
          },
        })
        .then((res) => {
          console.log(res);
        });
    } catch (e) {
      console.log(e);
    }
  }
}

export function GetSessions(userId, setSessions) {
  if (apiActive) {
    try {
      axios
        .get(
          `${apiUrl}/api/br-sessions?populate=br_user&filters[br_user][id][$eq]=${userId}&sort[0]=createdAt%3Aasc&pagination[pageSize]=100`
        )
        .then((res) => {
          const sessionsData = res.data.data;
          if (sessionsData.length > 0) {
            let sessions = [];
            sessionsData.forEach((session) => {
              let sessionData = JSON.parse(session.attributes.retention_time);
              let rounds = sessionData.rounds.map((round) => parseFloat(round));
              let max = Math.max(...rounds);
              let min = Math.min(...rounds);
              let date = new Date(session.attributes.createdAt);
              let month = date.toLocaleString("default", { month: "short" });
              let day = date.getDate();
              let year = date.getFullYear();
              // let formattedDate = month + " " + day + ", " + year;
              let formattedDate = month + " " + day;

              sessions.push({
                id: session.id,
                date: formattedDate,
                rounds: sessionData.rounds,
                max: max,
                min: min,
                average: parseFloat(sessionData.average),
              });
            });
            setSessions(sessions);
          }
        });
    } catch (e) {
      console.log(e);
      setSessions([]);
    }
  } else {
    console.log("API disabled");
    setSessions([]);
  }
}
