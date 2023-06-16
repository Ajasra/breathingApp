import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiActive = process.env.NEXT_PUBLIC_API_ACTIVE;

export function SaveSession(data, settings, average, userId) {
  
  try {
    axios
        .post(`${apiUrl}/api/save_session`, {
            data: data,
            settings: settings,
            average: average,
            userId: userId
        }).then((res) => {
            if(res.data.code == 200) {
                // toast.success("Session saved", { closeButton: true, autoClose: 15000 });
            }else{
                console.error("Can't save session");
              // toast.error("No image selected", { closeButton: true, autoClose: 15000 });
            }
        });
  }catch (e) {
    console.error(e);
  }
}

export function GetSettings(userId, setSessionSettings) {
  if (apiActive) {
    
    try {
      axios
          .post(`${apiUrl}/api/get_settings`, { userId: userId })
            .then((res) => {
              const settingsData = res.data.settings;
              if (settingsData) {
                let savedSettings = JSON.parse(settingsData.settings);
                savedSettings.settingsId = settingsData.id;
                savedSettings.init = true;
                setSessionSettings(savedSettings);
              }
            });
    }catch (e) {
      console.error(e);
    }

  } else {
    console.log("API disabled");
  }
}

export function SaveSettings(settings, userId, setSessionSettings) {
  const setSerialized = JSON.stringify(settings);
  
  try {
    // update record with new settings at /api/save_settings endpoint and return the updated settings
    axios
        .post(`${apiUrl}/api/save_settings`, {
            settings: settings,
            user_id: userId
        }).then((res) => {
            if(res.data.code == 200) {
                setSessionSettings(res.data.settings);
                // toast.success("Settings saved", { closeButton: true, autoClose: 15000 });
            }else{
                console.error("Can't save settings");
              // toast.error("No image selected", { closeButton: true, autoClose: 15000 });
            }
        })
  } catch (e) {
    console.error(e);
  }
}

export function GetSessions(userId, setSessions, dates) {
  try {
    axios
        .post(`${apiUrl}/api/get_sessions`, {
            user_id: userId,
            dates: dates
        }).then((res) => {
            setSessions(res.data.sessions);
        })
  }catch (e) {
    console.error(e);
  }
}
