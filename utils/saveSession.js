import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

 export function saveSession(data, settings, average, userId) {
    const setSerialized = JSON.stringify(settings);
    const dataSerialized = JSON.stringify({
        rounds: data,
        average: average.toFixed(2),
    });

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
    } catch (error) {
        console.log(error);
    }
}