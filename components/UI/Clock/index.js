function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

export default function Clock(props) {

    const {data} = props;

    let minutes = Math.floor(data / 60);
    let seconds = data - minutes * 60;

    return (
        <>
            {pad2(minutes)}:{pad2(seconds.toFixed(0))}
        </>
    )
}