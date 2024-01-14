/**
 * @version 1.0.0
 * @description Al ser una demo, está compuesa por la página principal, la cual contiene las barras lateral y superior, el reproductor y el chat.
 * @author Juan Manuel Cuellar Cardoso
 */
'use client';
/**
 * @imports
 * @description Importación de componentes y librerías necesarias para el funcionamiento de la página principal.
 */
import { SideBar, PlayerContainer, Chat, NavBar } from '@/components';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
/**
 * @description Página principal
 * @returns {JSX.Element}
 */
export default function Home() {
    const [theaterMode, setTheaterMode] = useState(false);
    const [fullScreenMode, setFullScreenMode] = useState(false);
    const [chatIsHidden, setChatIsHidden] = useState(false);
    const [hasWindow, setHasWindow] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [urls, setUrls] = useState([
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ]);
    const [settings, setSettings] = useState({
        streamer: 'Tu streamer (o video) favorito',
        game: 'Visualizando un video',
        title: 'El título de tu stream (o video)',
        camera: false,
        customControls: true,
        viewers: 73,
        streamerImage: '/rickastley.jpg',
    });
    /**
     * @description Efecto para cambiar el estado de la ventana
     */
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasWindow(true);
        }
        const storagedUrls = localStorage.getItem('urls');
        const storagedSettings = localStorage.getItem('settings');
        if (storagedUrls) {
            setUrls(JSON.parse(storagedUrls));
        }
        if (storagedSettings) {
            setSettings(JSON.parse(storagedSettings));
        }
    }, []);

    return (
        <main className='relative flex h-dvh w-dvw flex-col'>
            <NavBar fullScreenMode={fullScreenMode} />
            <section className='flex max-w-full grow items-center overflow-hidden'>
                <SideBar
                    fullScreenMode={fullScreenMode}
                    theaterMode={theaterMode}
                />
                <motion.main className='flex h-full max-w-full grow flex-col md:flex-row'>
                    <PlayerContainer
                        urls={urls}
                        setUrls={setUrls}
                        settings={settings}
                        setSettings={setSettings}
                        hasWindow={hasWindow}
                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}
                        setTheaterMode={setTheaterMode}
                        theaterMode={theaterMode}
                        setFullScreenMode={setFullScreenMode}
                        fullScreenMode={fullScreenMode}
                        setChatIsHidden={setChatIsHidden}
                        chatIsHidden={chatIsHidden}
                        showCamera={settings.camera}
                    />
                    <Chat
                        chatIsHidden={chatIsHidden}
                        setChatIsHidden={setChatIsHidden}
                        fullScreenMode={fullScreenMode}
                    />
                </motion.main>
            </section>
        </main>
    );
}
