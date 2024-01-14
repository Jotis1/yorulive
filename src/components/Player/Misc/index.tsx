'use client';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconAspectRatio,
    IconCut,
    IconMaximize,
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconSettings,
    IconVolume,
    IconVolume2,
    IconVolumeOff,
} from '@tabler/icons-react';
import PlayerButton from '@/components/Player/Buttons';

const variants = {
    rest: {
        opacity: 0,
        width: '0px',
    },
    hover: {
        opacity: 1,
        width: '80px',
    },
};

interface Props {
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    theaterMode: boolean;
    setTheaterMode: React.Dispatch<React.SetStateAction<boolean>>;
    fullScreenMode: boolean;
    setFullScreenMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlayerMisc({
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    theaterMode,
    setTheaterMode,
    fullScreenMode,
    setFullScreenMode,
}: Props) {
    const isMuted = volume === 0;

    return (
        <section className='flex items-center justify-between text-white'>
            <section className='flex items-center'>
                <PlayerButton onClick={() => setIsPlaying(!isPlaying)}>
                    <AnimatePresence>
                        {isPlaying ? (
                            <motion.section
                                key={'paused'}
                                initial={{ opacity: 0, translateY: 10 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                exit={{ opacity: 0, translateY: -10 }}
                                className='absolute'
                            >
                                <IconPlayerPauseFilled className='size-5' />
                            </motion.section>
                        ) : (
                            <motion.section
                                key={'playing'}
                                initial={{ opacity: 0, translateY: 10 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                exit={{ opacity: 0, translateY: -10 }}
                                className='absolute'
                            >
                                <IconPlayerPlayFilled className='size-5' />
                            </motion.section>
                        )}
                    </AnimatePresence>
                </PlayerButton>
                <motion.section
                    initial={'rest'}
                    animate={'rest'}
                    whileHover={'hover'}
                    className='flex h-10 items-center justify-center gap-2 rounded-xl px-2.5 *:cursor-pointer hover:bg-zinc-900'
                >
                    {volume >= 0.5 ? (
                        <motion.section
                            onClick={() => setVolume(isMuted ? 0.5 : 0)}
                            key={'louder'}
                            initial={{ translateY: 10 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -10 }}
                        >
                            <IconVolume className='size-5' />
                        </motion.section>
                    ) : volume < 0.5 && volume !== 0 ? (
                        <motion.section
                            onClick={() => setVolume(isMuted ? 0.5 : 0)}
                            key={'loud'}
                            initial={{ translateY: 10 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -10 }}
                        >
                            <IconVolume2 className='size-5' />
                        </motion.section>
                    ) : (
                        <motion.section
                            onClick={() => setVolume(isMuted ? 0.5 : 0)}
                            key={'off'}
                            initial={{ translateY: 10 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -10 }}
                        >
                            <IconVolumeOff className='size-5' />
                        </motion.section>
                    )}
                    <motion.section
                        variants={variants}
                        transition={{ duration: 0.2 }}
                        className='relative flex h-1 w-20 items-center rounded-md bg-zinc-700 *:cursor-pointer'
                    >
                        <motion.section
                            animate={{ width: `${volume * 100}%` }}
                            transition={{ duration: 0 }}
                            className='h-full rounded-md bg-indigo-500'
                        ></motion.section>
                        <span className='h-2.5 w-2.5 -translate-x-[1px] rounded-full bg-indigo-500' />
                        <input
                            onChange={(e) =>
                                setVolume(Number(e.target.value) / 100)
                            }
                            className='absolute left-0 top-0 size-full opacity-0'
                            type='range'
                        />
                    </motion.section>
                </motion.section>
            </section>
            <section className='flex items-center gap-2.5'>
                {/* <PlayerButton className="group relative size-10 rounded-xl flex items-center justify-center text-white">
                    <section className="absolute group-focus-within:flex hidden flex-col gap-2.5 right-full bottom-full p-2.5 bg-zinc-900 rounded-md">
                        <label className="flex items-center cursor-pointer gap-2.5 text-sm not-italic h-10">
                            <p className="truncate">Mostrar cámara</p>
                            <input type="checkbox" className="form-checkbox text-indigo-500 rounded focus:outline-none focus:ring-0 ring-offset-0" />
                        </label>
                    </section>
                    <IconSettings className='size-5' />
                </PlayerButton>
                <PlayerButton>
                    <IconCut className='size-5' />
                </PlayerButton> */}
                <PlayerButton
                    onClick={() => {
                        setFullScreenMode(false);
                        setTheaterMode(!theaterMode);
                        if (fullScreenMode && document.fullscreenElement) {
                            document.exitFullscreen();
                        }
                    }}
                >
                    <IconAspectRatio className='size-5' />
                </PlayerButton>
                <PlayerButton
                    onClick={() => {
                        setFullScreenMode(!fullScreenMode);
                        if (fullScreenMode && document.fullscreenElement) {
                            document.exitFullscreen();
                        } else if (
                            !fullScreenMode &&
                            !document.fullscreenElement
                        ) {
                            document.documentElement.requestFullscreen();
                        }
                        setTheaterMode(false);
                    }}
                >
                    <IconMaximize className='size-5' />
                </PlayerButton>
            </section>
        </section>
    );
}
