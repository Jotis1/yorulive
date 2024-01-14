import { AnimatePresence, motion } from 'framer-motion';

type color =
    | 'text-red-500'
    | 'text-yellow-500'
    | 'text-green-500'
    | 'text-blue-500'
    | 'text-indigo-500'
    | 'text-purple-500'
    | 'text-pink-500';
interface User {
    name: string;
    color: color;
    saveMessages: boolean;
    isMod: boolean;
    isSub: boolean;
}

interface Props {
    showChangeUserSettings: boolean;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    colores: string[];
}

export default function ChatSettings({
    colores,
    showChangeUserSettings,
    user,
    setUser,
}: Props) {
    const handleUserChange = (e: any) => {
        e.preventDefault();
        const user = document.getElementById('user') as HTMLInputElement;
        const color = document.getElementById('color') as HTMLSelectElement;
        const saveMessages = document.getElementById(
            'saveMessages'
        ) as HTMLInputElement;
        const isMod = document.getElementById('isMod') as HTMLInputElement;
        const isSub = document.getElementById('isSub') as HTMLInputElement;
        setUser({
            name: user.value,
            color: color.value as color,
            saveMessages: saveMessages.checked,
            isMod: false,
            isSub: false,
        });
        localStorage.setItem(
            'user',
            JSON.stringify({
                name: user.value,
                color: color.value,
                saveMessages: saveMessages.checked,
                isMod: isMod.checked,
                isSub: isSub.checked,
            })
        );
    };

    return (
        <AnimatePresence>
            {showChangeUserSettings && (
                <motion.form
                    initial={{
                        opacity: 0,
                        maxHeight: '0rem',
                        padding: '0rem 0rem',
                        y: 100,
                    }}
                    animate={{
                        opacity: 1,
                        maxHeight: '40rem',
                        padding: '0.625rem 0rem',
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        maxHeight: '0rem',
                        padding: '0rem 0rem',
                        y: 100,
                    }}
                    onSubmit={handleUserChange}
                    className='flex w-full flex-col gap-4 bg-zinc-950 *:flex *:items-center *:justify-between *:gap-2 *:text-sm *:font-medium *:text-zinc-400'
                >
                    <label htmlFor={`user`}>
                        <p className='flex-grow'>Nombre en el chat</p>
                        <section className='flex items-center gap-5'>
                            <input
                                onChange={handleUserChange}
                                required
                                name={`user`}
                                id={`user`}
                                type='text'
                                className='h-8 flex-grow rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                defaultValue={user.name}
                            />
                        </section>
                    </label>
                    <label htmlFor={`color`}>
                        <p>Color del chat</p>
                        <section className='flex items-center gap-5'>
                            <select
                                onChange={handleUserChange}
                                required
                                name={`color`}
                                id={`color`}
                                className='flex-grow rounded-xl border-0 bg-zinc-900 text-sm text-white focus:ring-0'
                                defaultValue={user.color}
                            >
                                {colores.map((color, index) => (
                                    <option
                                        className='font-sans'
                                        key={index}
                                        value={color}
                                    >
                                        {color.split('-')[1]}
                                    </option>
                                ))}
                            </select>
                        </section>
                    </label>
                    <label htmlFor={`saveMessages`}>
                        <p className='flex-grow'>Guardar mensajes en local</p>
                        <section className='flex items-center gap-5 pr-2.5'>
                            <input
                                onChange={() => {
                                    let saveMessages = (
                                        document.getElementById(
                                            'saveMessages'
                                        ) as HTMLInputElement
                                    ).checked;
                                    localStorage.setItem(
                                        'user',
                                        JSON.stringify({
                                            ...user,
                                            saveMessages,
                                        })
                                    );
                                    setUser({ ...user, saveMessages });
                                }}
                                name={`saveMessages`}
                                id={`saveMessages`}
                                type='checkbox'
                                className='text-indigo size-5 rounded border-0 bg-zinc-900 text-sm focus:ring-0'
                                defaultChecked={user.saveMessages}
                            />
                        </section>
                    </label>
                    <label htmlFor={`isMod`}>
                        <p className='flex-grow'>Mostrar icono de admin</p>
                        <section className='flex items-center gap-5 pr-2.5'>
                            <input
                                onChange={() => {
                                    let isMod = (
                                        document.getElementById(
                                            'isMod'
                                        ) as HTMLInputElement
                                    ).checked;
                                    localStorage.setItem(
                                        'user',
                                        JSON.stringify({
                                            ...user,
                                            isMod,
                                        })
                                    );
                                    setUser({ ...user, isMod });
                                }}
                                name={`isMod`}
                                id={`isMod`}
                                type='checkbox'
                                className='text-indigo size-5 rounded border-0 bg-zinc-900 text-sm focus:ring-0'
                                defaultChecked={user.isMod}
                            />
                        </section>
                    </label>
                    <label htmlFor={`isSub`}>
                        <p className='flex-grow'>Mostrar icono de sub</p>
                        <section className='flex items-center gap-5 pr-2.5'>
                            <input
                                onChange={() => {
                                    let isSub = (
                                        document.getElementById(
                                            'isSub'
                                        ) as HTMLInputElement
                                    ).checked;
                                    localStorage.setItem(
                                        'user',
                                        JSON.stringify({
                                            ...user,
                                            isSub,
                                        })
                                    );
                                    setUser({ ...user, isSub });
                                }}
                                name={`isSub`}
                                id={`isSub`}
                                type='checkbox'
                                className='text-indigo size-5 rounded border-0 bg-zinc-900 text-sm focus:ring-0'
                                defaultChecked={user.isSub}
                            />
                        </section>
                    </label>
                </motion.form>
            )}
        </AnimatePresence>
    );
}
