'use client';

import cn from '@/lib/cn';
import ReactPlayer from 'react-player';
import { IconArrowBarLeft, IconVideoOff } from '@tabler/icons-react';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PlayerTimer from '../Timer';
import PlayerTimeline from '../TimeLine';
import PlayerMisc from '../Misc';

interface Props {
    theaterMode: boolean;
    setTheaterMode: React.Dispatch<React.SetStateAction<boolean>>;
    fullScreenMode: boolean;
    setFullScreenMode: React.Dispatch<React.SetStateAction<boolean>>;
    chatIsHidden: boolean;
    setChatIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    showCamera: boolean;
    currentTime: number;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    customControls: boolean;
    url: string;
}

export default function Player({
    url,
    customControls,
    currentTime,
    setCurrentTime,
    showCamera,
    theaterMode,
    setTheaterMode,
    fullScreenMode,
    setFullScreenMode,
    chatIsHidden,
    setChatIsHidden,
}: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<ReactPlayer | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [showControls, setShowControls] = useState(false);
    const [loadedTime, setLoadedTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.1);
    const [duration, setDuration] = useState(0);

    const changeVideoTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const seconds = ((Number(value) / 100) * duration).toFixed(0);
        if (playerRef.current) {
            playerRef.current.seekTo(Number(seconds));
            setCurrentTime(Number(seconds));
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        parentRef.current?.addEventListener('mousemove', () => {
            clearTimeout(timeout);
            setShowControls(true);
            timeout = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        });
    }, []);

    return (
        <section
            ref={parentRef}
            className='relative aspect-video size-full overflow-hidden rounded-xl'
        >
            <ReactPlayer
                ref={playerRef}
                key={`${customControls}`}
                onProgress={(state) => {
                    setCurrentTime(state.playedSeconds);
                    setLoadedTime(state.loadedSeconds);
                }}
                onDuration={(duration) => setDuration(duration)}
                controls={!customControls}
                volume={volume}
                playing={isPlaying}
                width={'100%'}
                height={'100%'}
                url={url}
            />
            <section
                className={cn(
                    'absolute left-0 top-0 flex w-full flex-col',
                    customControls &&
                        'absolute left-0 top-0 flex size-full flex-col bg-gradient-to-b transition-all',
                    showControls
                        ? 'from-zinc-950/60 via-zinc-950/0 to-zinc-950/60'
                        : 'from-zinc-950/0 via-zinc-950/0 to-zinc-950/0'
                )}
            >
                <AnimatePresence>
                    {(showControls || customControls) && (
                        <motion.section
                            initial={{
                                opacity: 0,
                                padding: '0rem 0rem',
                                maxHeight: '0rem',
                            }}
                            animate={{
                                opacity: 1,
                                padding: '2rem 2rem',
                                maxHeight: 'auto',
                            }}
                            exit={{
                                opacity: 0,
                                padding: '0rem 0rem',
                                maxHeight: '0rem',
                            }}
                            className='flex items-center justify-between opacity-100'
                        >
                            <p className='rounded-xl bg-rose-500 px-5 py-1.5 text-xs font-medium text-white'>
                                En directo
                            </p>
                            <AnimatePresence>
                                {chatIsHidden && (
                                    <motion.button
                                        onClick={() => setChatIsHidden(false)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        whileHover={{
                                            backgroundColor: 'rgb(24,24,27)',
                                        }}
                                        className='flex size-10 items-center justify-center rounded-xl text-white'
                                    >
                                        <IconArrowBarLeft className='size-4' />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.section>
                    )}
                </AnimatePresence>
                {customControls && (
                    <>
                        <motion.section
                            ref={containerRef}
                            className='relative flex-grow'
                        >
                            {showCamera && (
                                <motion.figure
                                    whileDrag={{ cursor: 'grabbing' }}
                                    whileHover={{ cursor: 'grab' }}
                                    drag
                                    dragConstraints={containerRef}
                                    className='absolute left-5 top-5 flex aspect-video h-1/4 min-h-32 flex-col items-center justify-center gap-5 rounded-xl bg-zinc-900 text-sm text-zinc-400'
                                >
                                    El streamer no tiene cámara
                                    <IconVideoOff className='ml-2 size-5' />
                                </motion.figure>
                            )}
                        </motion.section>
                        <AnimatePresence>
                            {showControls && (
                                <motion.section
                                    initial={{
                                        opacity: 1,
                                        padding: '0.625rem 0.625rem',
                                    }}
                                    exit={{ opacity: 0, padding: '0rem 0rem' }}
                                    className='flex flex-col gap-2'
                                >
                                    <PlayerTimer
                                        currentTime={currentTime}
                                        duration={duration}
                                    />
                                    <PlayerTimeline
                                        changeVideoTime={changeVideoTime}
                                        currentTime={currentTime}
                                        duration={duration}
                                        loadedTime={loadedTime}
                                    />
                                    <PlayerMisc
                                        isPlaying={isPlaying}
                                        setIsPlaying={setIsPlaying}
                                        volume={volume}
                                        setVolume={setVolume}
                                        theaterMode={theaterMode}
                                        setTheaterMode={setTheaterMode}
                                        fullScreenMode={fullScreenMode}
                                        setFullScreenMode={setFullScreenMode}
                                    />
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </section>
        </section>
    );
}
