import Image from 'next/image';
import {
    IconHeart,
    IconEyeFilled,
    IconClockFilled,
    IconX,
    IconDotsVertical,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import cn from '@/lib/cn';

interface Props {
    currentTime: number;
    urls: string[];
    setUrls: React.Dispatch<React.SetStateAction<string[]>>;
    settings: {
        streamer: string;
        game: string;
        title: string;
        camera: boolean;
        customControls: boolean;
        viewers: number;
        streamerImage: string;
    };
    setSettings: React.Dispatch<
        React.SetStateAction<{
            streamer: string;
            game: string;
            title: string;
            camera: boolean;
            customControls: boolean;
            viewers: number;
            streamerImage: string;
        }>
    >;
    fullScreenMode: boolean;
    theaterMode: boolean;
}

export default function PlayerFooter({
    theaterMode,
    fullScreenMode,
    settings,
    setSettings,
    currentTime,
    urls,
    setUrls,
}: Props) {
    const [showChangeUrls, setShowChangeUrls] = useState(false);
    const [showChangeSettings, setShowChangeSettings] = useState(false);

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
    const handleChangeStreams = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const urls = Array.from(data.values());
        let filteredUrls = urls.filter((url) => url !== '');
        setUrls(filteredUrls as string[]);
        localStorage.setItem('urls', JSON.stringify(filteredUrls));
        setShowChangeUrls(false);
    };

    const handleChangeSettings = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const streamer = data.get('streamer') as string;
        const game = data.get('game') as string;
        const title = data.get('title') as string;
        const streamerImage = data.get('streamerImage') as string;
        const viewers = Number(data.get('viewers') as string);
        const customControls = Boolean(data.get('customControls') as string);
        const camera = Boolean(data.get('camera') as string);
        setSettings({
            ...settings,
            streamer,
            game,
            title,
            streamerImage,
            viewers,
            customControls,
            camera,
        });
        localStorage.setItem(
            'settings',
            JSON.stringify({
                ...settings,
                streamer,
                game,
                title,
                streamerImage,
                viewers,
                customControls,
                camera,
            })
        );
        setShowChangeSettings(false);
    };

    return (
        <AnimatePresence>
            {!(fullScreenMode || theaterMode) && (
                <motion.section
                    initial={{ opacity: 0, padding: '0rem' }}
                    animate={{ opacity: 1, padding: '1.25rem' }}
                    exit={{ opacity: 0, padding: '0rem' }}
                    className='p-5'
                >
                    <header className='line-clamp-1 flex w-full min-w-52 flex-col items-center gap-2.5 px-2.5'>
                        <p className='w-full flex-grow truncate text-xl font-extrabold text-white'>
                            {settings.title}
                        </p>
                        <section className='flex w-full flex-grow items-center gap-5 py-2.5'>
                            <figure className='relative size-14 min-w-14 rounded-full ring ring-rose-500 ring-offset-2 ring-offset-zinc-950'>
                                <Image
                                    className='rounded-full object-cover'
                                    fill
                                    alt='Streamer Profile Picture'
                                    src={settings.streamerImage}
                                ></Image>
                            </figure>
                            <section className='flex flex-grow flex-col gap-2.5'>
                                <p className='line-clamp-2 text-sm text-white'>
                                    {settings.streamer}
                                    <span className='text-zinc-300'>
                                        {' '}
                                        está retransmitiendo
                                    </span>
                                    <span className='text-rose-300'>
                                        {' '}
                                        {settings.game}
                                    </span>
                                </p>
                                <section className='flex items-center justify-start gap-5 text-xs'>
                                    <p className='flex items-center gap-1 text-rose-300'>
                                        <IconEyeFilled className='size-4' />
                                        {settings.viewers}
                                    </p>
                                    <p className='flex relative items-center gap-1 text-zinc-300'>
                                        <IconClockFilled className='size-4' />
                                        {currentTimeString}
                                    </p>
                                </section>
                            </section>
                        </section>
                    </header>
                    <section className='mt-5 flex h-full items-center justify-between gap-2.5 rounded-xl bg-zinc-800 p-5'>
                        <button
                            onClick={() => {
                                setShowChangeUrls(!showChangeUrls);
                                setShowChangeSettings(false);
                            }}
                            className='truncate text-sm font-medium text-indigo-300 underline decoration-transparent transition-all hover:decoration-indigo-300'
                        >
                            Añadir directos o vídeos
                        </button>
                        <section className='flex items-center gap-5'>
                            <button className='h-10 rounded-xl bg-indigo-500 px-5 text-sm font-medium text-white'>
                                Suscribirse
                            </button>
                            <button className='flex h-10 min-w-10 items-center justify-center rounded-xl bg-indigo-500 text-sm font-medium text-white'>
                                <IconHeart size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    setShowChangeUrls(false);
                                    setShowChangeSettings(!showChangeSettings);
                                }}
                                className='flex h-10 min-w-10 items-center justify-center rounded-xl text-sm font-medium text-white transition-all hover:bg-zinc-950'
                            >
                                <IconDotsVertical size={20} />
                            </button>
                        </section>
                    </section>
                    <AnimatePresence>
                        {showChangeUrls && (
                            <motion.form
                                key={'urls'}
                                initial={{ opacity: 0, padding: '0rem' }}
                                animate={{ opacity: 1, padding: '1.25rem' }}
                                exit={{ opacity: 0, padding: '0rem' }}
                                onSubmit={handleChangeStreams}
                                className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2.5 rounded-xl bg-zinc-950'
                            >
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <label
                                        key={index}
                                        htmlFor={`${index}`}
                                        className='flex flex-col  gap-2 text-sm font-medium text-zinc-400'
                                    >
                                        <p>Vídeo {index + 1}</p>
                                        <section className='flex items-center gap-5'>
                                            <input
                                                required={index === 0}
                                                name={`${index}`}
                                                id={`${index + 1}`}
                                                type='text'
                                                className='h-10 w-72 rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                                defaultValue={urls[index] || ''}
                                            />
                                            <button
                                                onClick={() => {
                                                    let obj =
                                                        document.getElementById(
                                                            `${index + 1}`
                                                        ) as HTMLInputElement;
                                                    obj.value = '';
                                                }}
                                                className='flex size-10 items-center justify-center hover:text-rose-300'
                                            >
                                                <IconX className='size-5'></IconX>
                                            </button>
                                        </section>
                                    </label>
                                ))}
                                <button className='mt-5 h-10 rounded-xl bg-indigo-500 px-2.5 text-sm font-medium text-white'>
                                    Cambiar
                                </button>
                            </motion.form>
                        )}
                        {showChangeSettings && (
                            <motion.form
                                key={'settings'}
                                initial={{ opacity: 0, padding: '0rem' }}
                                animate={{ opacity: 1, padding: '1.25rem' }}
                                exit={{ opacity: 0, padding: '0rem' }}
                                onSubmit={handleChangeSettings}
                                className='z-100 absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2.5 rounded-xl bg-zinc-950'
                            >
                                <label
                                    htmlFor={`streamer`}
                                    className='flex flex-col  gap-2 text-sm font-medium text-zinc-400'
                                >
                                    <p>Streamer</p>
                                    <section className='flex items-center gap-5'>
                                        <input
                                            required
                                            name={`streamer`}
                                            id={`streamer`}
                                            type='text'
                                            className='h-10 w-72 rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                            defaultValue={settings.streamer}
                                        />
                                        <button
                                            onClick={() => {
                                                let obj =
                                                    document.getElementById(
                                                        `streamer`
                                                    ) as HTMLInputElement;
                                                obj.value = '';
                                            }}
                                            className='flex size-10 items-center justify-center hover:text-rose-300'
                                        >
                                            <IconX className='size-5'></IconX>
                                        </button>
                                    </section>
                                </label>
                                <label
                                    htmlFor={`game`}
                                    className='flex flex-col  gap-2 text-sm font-medium text-zinc-400'
                                >
                                    <p>Juego</p>
                                    <section className='flex items-center gap-5'>
                                        <input
                                            required
                                            name={`game`}
                                            id={`game`}
                                            type='text'
                                            className='h-10 w-72 rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                            defaultValue={settings.game}
                                        />
                                        <button
                                            onClick={() => {
                                                let obj =
                                                    document.getElementById(
                                                        `game`
                                                    ) as HTMLInputElement;
                                                obj.value = '';
                                            }}
                                            className='flex size-10 items-center justify-center hover:text-rose-300'
                                        >
                                            <IconX className='size-5'></IconX>
                                        </button>
                                    </section>
                                </label>
                                <label
                                    htmlFor={`title`}
                                    className='flex flex-col  gap-2 text-sm font-medium text-zinc-400'
                                >
                                    <p>Título</p>
                                    <section className='flex items-center gap-5'>
                                        <input
                                            required
                                            name={`title`}
                                            id={`title`}
                                            type='text'
                                            className='h-10 w-72 rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                            defaultValue={settings.title}
                                        />
                                        <button
                                            onClick={() => {
                                                let obj =
                                                    document.getElementById(
                                                        `title`
                                                    ) as HTMLInputElement;
                                                obj.value = '';
                                            }}
                                            className='flex size-10 items-center justify-center hover:text-rose-300'
                                        >
                                            <IconX className='size-5'></IconX>
                                        </button>
                                    </section>
                                </label>
                                <label
                                    htmlFor={`streamerImage`}
                                    className='flex flex-col  gap-2 text-sm font-medium text-zinc-400'
                                >
                                    <p>Imagen streamer</p>
                                    <section className='flex items-center gap-5'>
                                        <input
                                            required
                                            name={`streamerImage`}
                                            id={`streamerImage`}
                                            type='text'
                                            className='h-10 w-72 rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                            defaultValue={
                                                settings.streamerImage
                                            }
                                        />
                                        <button
                                            onClick={() => {
                                                let obj =
                                                    document.getElementById(
                                                        `streamerImage`
                                                    ) as HTMLInputElement;
                                                obj.value = '';
                                            }}
                                            className='flex size-10 items-center justify-center hover:text-rose-300'
                                        >
                                            <IconX className='size-5'></IconX>
                                        </button>
                                    </section>
                                </label>
                                <label
                                    htmlFor={`viewers`}
                                    className='flex flex-col  gap-2 text-sm font-medium text-zinc-400'
                                >
                                    <p>Viewers</p>
                                    <section className='flex items-center gap-5'>
                                        <input
                                            required
                                            name={`viewers`}
                                            id={`viewers`}
                                            type='text'
                                            className='h-10 w-72 rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                            defaultValue={settings.viewers}
                                        />
                                        <button
                                            onClick={() => {
                                                let obj =
                                                    document.getElementById(
                                                        `viewers`
                                                    ) as HTMLInputElement;
                                                obj.value = '';
                                            }}
                                            className='flex size-10 items-center justify-center hover:text-rose-300'
                                        >
                                            <IconX className='size-5'></IconX>
                                        </button>
                                    </section>
                                </label>
                                <label
                                    htmlFor={`customControls`}
                                    className=' flex items-center  gap-2 text-sm font-medium text-zinc-400'
                                >
                                    <p className='flex-grow'>
                                        Controles personalizados
                                    </p>
                                    <section className='flex items-center gap-5 pr-2.5'>
                                        <input
                                            name={`customControls`}
                                            id={`customControls`}
                                            type='checkbox'
                                            className='text-indigo size-5 rounded border-0 bg-zinc-900 text-sm focus:ring-0'
                                            defaultChecked={
                                                settings.customControls
                                            }
                                        />
                                    </section>
                                </label>
                                <label
                                    htmlFor={`camera`}
                                    className=' flex items-center  gap-2 text-sm font-medium text-zinc-400'
                                >
                                    <section>
                                        <p className='flex-grow'>
                                            Mostrar cámara
                                        </p>
                                        <span className='text-xs text-zinc-600'>
                                            Sólo se mostrará si los controles
                                            personalizados están activados
                                        </span>
                                    </section>
                                    <section className='flex items-center gap-5 pr-2.5'>
                                        <input
                                            name={`camera`}
                                            id={`camera`}
                                            type='checkbox'
                                            className='text-indigo size-5 rounded border-0 bg-zinc-900 text-sm focus:ring-0'
                                            defaultChecked={settings.camera}
                                        />
                                    </section>
                                </label>
                                <button className='mt-5 h-10 rounded-xl bg-indigo-500 px-2.5 text-sm font-medium text-white'>
                                    Cambiar
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.section>
            )
            }
        </AnimatePresence >
    );
}
