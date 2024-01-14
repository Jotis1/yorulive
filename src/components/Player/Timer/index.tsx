export default function PlayerTimer({
    currentTime,
    duration,
}: {
    currentTime: number;
    duration: number;
}) {
    function formatTime(time: number) {
        const hours = Math.floor(time / 3600)
            .toString()
            .padStart(1, '0');
        const minutes = Math.floor((time % 3600) / 60)
            .toString()
            .padStart(2, '0');
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    const currentTimeString = formatTime(currentTime);
    const durationString = formatTime(duration);

    if (isNaN(currentTime) || isNaN(duration) || !isFinite(duration))
        return null;

    return (
        <section className='flex items-center justify-between text-xs font-medium text-white'>
            <p>{currentTimeString}</p>
            <p>{durationString}</p>
        </section>
    );
}
