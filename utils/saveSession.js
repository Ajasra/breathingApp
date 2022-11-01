import axios from "axios";
import {toast} from "react-toastify";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiActive = process.env.NEXT_PUBLIC_API_ACTIVE;

 export function saveSession(data, settings, average, userId) {
    const setSerialized = JSON.stringify(settings);
    const dataSerialized = JSON.stringify({
        rounds: data,
        average: average.toFixed(2),
    });

    if(apiActive){
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
            toast.success("Session saved", { closeButton: true, autoClose: 15000 });
        } catch (e) {
            console.log(e);
            toast.error("No image selected", { closeButton: true, autoClose: 15000 });
        }
    }else{
        console.log('API disabled')
    }
}