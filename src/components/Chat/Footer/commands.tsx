import { AnimatePresence, motion } from "framer-motion";

interface Command {
    title: string
    description: string
    command: string
}

interface Props {
    showCommands: boolean
}

export default function Commands({ showCommands }: Props) {

    const commands: Command[] = [
        {
            title: "/clear",
            command: "/clear",
            description: "Limpia el chat"
        },
        {
            title: "/say",
            command: "/say [username] [message]",
            description: "Envía un mensaje como si fueras el usuario"
        }
    ]

    return (
        <AnimatePresence>
            {showCommands && (
                <motion.section
                    initial={{ opacity: 0, maxHeight: "0rem", padding: "0rem 0rem", y: 100 }}
                    animate={{ opacity: 1, maxHeight: "40rem", padding: "0.625rem 0rem", y: 0 }}
                    exit={{ opacity: 0, maxHeight: "0rem", padding: "0rem 0rem", y: 100 }}
                    className="w-full flex flex-col gap-4 bg-zinc-950">
                    <section className="flex items-center justify-between text-white">
                        <p className="text-sm text-center">Comandos</p>
                    </section>
                    <aside className="flex flex-col gap-2.5">
                        {commands.map((command, index) => (
                            <article key={index} className="text-white flex items-center gap-4 text-sm">
                                <button
                                    onClick={() => {
                                        const input = document.getElementById("sendMessageInput") as HTMLInputElement
                                        input.value = command.command
                                    }}
                                    className="font-mono px-2.5 py-1.5 rounded-md font-bold text-indigo-300 text-xs bg-zinc-900">{command.title}</button>
                                <p>{command.description}</p>
                            </article>
                        ))}
                    </aside>
                </motion.section>
            )}
        </AnimatePresence>
    )
}