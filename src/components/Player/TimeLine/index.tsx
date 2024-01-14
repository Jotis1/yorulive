interface Props {
    currentTime: number
    loadedTime: number
    duration: number
    changeVideoTime: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function PlayerTimeline({ currentTime, duration, loadedTime, changeVideoTime }: Props) {

    const timePlayed = ((currentTime * 100) / duration)
    const timeLoaded = ((loadedTime * 100) / duration)

    if (isNaN(timePlayed) || isNaN(timeLoaded)) return null

    return (
        <section
            className='group relative w-full'>
            <section
                className='transition-all relative w-full flex group-hover:h-2 h-1 rounded-md overflow-hidden bg-zinc-700'>
                <section
                    className='h-full z-[1] rounded-r-md bg-indigo-500'
                    style={{
                        width: `${timePlayed}% `,
                    }}
                ></section>
                <section
                    className='absolute left-0 top-0 h-full bg-zinc-400 rounded-r-md'
                    style={{
                        width: `${timeLoaded}% `,
                    }}
                ></section>
            </section>
            <input
                type='range'
                onChange={changeVideoTime}
                className='transition-all z-[1] opacity-0 overflow-hidden cursor-pointer absolute top-0 w-full group-hover:h-2 h-1 appearance-none'
                defaultValue={0}
                step={`0.05`}
                max={100}
            />
        </section>
    )
}