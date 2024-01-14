import { motion } from 'framer-motion';
import { Player, PlayerFooter } from '..';
import cn from '@/lib/cn';
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
    urls: string[];
    hasWindow: boolean;
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
    setUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PlayerContainer({
    setSettings,
    settings,
    setUrls,
    urls,
    hasWindow,
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
    return (
        <motion.section className='scrollbar-hide min-h-60 grow overflow-auto rounded-t-xl bg-zinc-950 md:bg-zinc-900'>
            <figure
                className={cn(
                    'grid aspect-video h-full w-full gap-2',
                    urls.length === 1 && 'grid-cols-1 grid-rows-1',
                    !(theaterMode || fullScreenMode || urls.length !== 1) &&
                        'max-h-[750px]',
                    urls.length === 2 && 'grid-cols-2 grid-rows-1',
                    (urls.length === 3 || urls.length === 4) &&
                        'grid-cols-2 grid-rows-2'
                )}
            >
                {hasWindow &&
                    urls.map((url, index) => (
                        <Player
                            key={index}
                            url={url}
                            showCamera={showCamera}
                            currentTime={currentTime}
                            setChatIsHidden={setChatIsHidden}
                            chatIsHidden={chatIsHidden}
                            setCurrentTime={setCurrentTime}
                            customControls={settings.customControls}
                            setFullScreenMode={setFullScreenMode}
                            fullScreenMode={fullScreenMode}
                            setTheaterMode={setTheaterMode}
                            theaterMode={theaterMode}
                        />
                    ))}
            </figure>
            <PlayerFooter
                theaterMode={theaterMode}
                fullScreenMode={fullScreenMode}
                settings={settings}
                setSettings={setSettings}
                urls={urls}
                setUrls={setUrls}
                currentTime={currentTime}
            />
        </motion.section>
    );
}
