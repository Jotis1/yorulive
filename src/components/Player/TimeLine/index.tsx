interface Props {
    currentTime: number;
    loadedTime: number;
    duration: number;
    changeVideoTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PlayerTimeline({
    currentTime,
    duration,
    loadedTime,
    changeVideoTime,
}: Props) {
    const timePlayed = (currentTime * 100) / duration;
    const timeLoaded = (loadedTime * 100) / duration;

    if (isNaN(timePlayed) || isNaN(timeLoaded)) return null;

    return (
        <section className='group relative w-full'>
            <section className='relative flex h-1 w-full overflow-hidden rounded-md bg-zinc-700 transition-all group-hover:h-2'>
                <section
                    className='z-[1] h-full rounded-r-md bg-indigo-500'
                    style={{
                        width: `${timePlayed}% `,
                    }}
                ></section>
                <section
                    className='absolute left-0 top-0 h-full rounded-r-md bg-zinc-400'
                    style={{
                        width: `${timeLoaded}% `,
                    }}
                ></section>
            </section>
            <input
                type='range'
                onChange={changeVideoTime}
                className='absolute top-0 z-[1] h-1 w-full cursor-pointer appearance-none overflow-hidden opacity-0 transition-all group-hover:h-2'
                defaultValue={0}
                step={`0.05`}
                max={100}
            />
        </section>
    );
}
