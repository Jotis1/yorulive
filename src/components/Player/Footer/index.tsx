import Image from "next/image"
import { IconHeart, IconEyeFilled, IconClockFilled, IconX, IconDotsVertical } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

interface Props {
  currentTime: number
  urls: string[]
  setUrls: React.Dispatch<React.SetStateAction<string[]>>
  settings: {
    streamer: string
    game: string
    title: string
    camera: boolean
    customControls: boolean
    viewers: number
    streamerImage: string
  }
  setSettings: React.Dispatch<React.SetStateAction<{
    streamer: string
    game: string
    title: string
    camera: boolean
    customControls: boolean
    viewers: number
    streamerImage: string
  }>>
  fullScreenMode: boolean
  theaterMode: boolean
}

export default function PlayerFooter({ theaterMode, fullScreenMode, settings, setSettings, currentTime, urls, setUrls }: Props) {

  const [showChangeUrls, setShowChangeUrls] = useState(false)
  const [showChangeSettings, setShowChangeSettings] = useState(false)

  function formatTime(time: number) {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(1, '0')
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
  const currentTimeString = formatTime(currentTime)
  const handleChangeStreams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const urls = Array.from(data.values())
    let filteredUrls = urls.filter((url) => url !== "");
    setUrls(filteredUrls as string[])
    localStorage.setItem("urls", JSON.stringify(filteredUrls))
    setShowChangeUrls(false)
  }

  const handleChangeSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const streamer = data.get("streamer") as string
    const game = data.get("game") as string
    const title = data.get("title") as string
    const streamerImage = data.get("streamerImage") as string
    const viewers = Number(data.get("viewers") as string)
    const customControls = Boolean(data.get("customControls") as string)
    const camera = Boolean(data.get("camera") as string)
    setSettings({ ...settings, streamer, game, title, streamerImage, viewers, customControls, camera })
    localStorage.setItem("settings", JSON.stringify({ ...settings, streamer, game, title, streamerImage, viewers, customControls, camera }))
    setShowChangeSettings(false)
  }

  return (
    <AnimatePresence>
      {!(fullScreenMode || theaterMode) && (
        <motion.section
          initial={{ opacity: 0, padding: "0rem" }}
          animate={{ opacity: 1, padding: "1.25rem" }}
          exit={{ opacity: 0, padding: "0rem" }}
          className="p-5">
          <header className="flex flex-col w-full min-w-52 items-center gap-2.5 line-clamp-1 px-2.5">
            <p className="flex-grow w-full text-white truncate text-xl font-extrabold">{settings.title}</p>
            <section className="w-full py-2.5 flex gap-5 items-center flex-grow">
              <figure className="relative min-w-14 size-14 ring ring-offset-2 ring-rose-500 ring-offset-zinc-950 rounded-full">
                <Image className="object-cover rounded-full" fill alt="Streamer Profile Picture" src={settings.streamerImage}></Image>
              </figure>
              <section className="flex gap-2.5 flex-grow flex-col">
                <p className="text-sm text-white line-clamp-2">{settings.streamer}
                  <span className="text-zinc-300"> está retransmitiendo</span>
                  <span className="text-rose-300"> {settings.game}</span>
                </p>
                <section className="flex justify-start items-center gap-5 text-xs">
                  <p className="text-rose-300 flex items-center gap-1">
                    <IconEyeFilled className="size-4" />
                    {settings.viewers}
                  </p>
                  <p className="text-zinc-300 flex items-center gap-1">
                    <IconClockFilled className="size-4" />
                    {currentTimeString}
                  </p>
                </section>
              </section>
            </section>
          </header>
          <section className="flex mt-5 rounded-xl bg-zinc-800 justify-between items-center gap-2.5 p-5 h-full">
            <button onClick={() => {
              setShowChangeUrls(!showChangeUrls)
              setShowChangeSettings(false)
            }} className="truncate text-indigo-300 text-sm font-medium underline transition-all hover:decoration-indigo-300 decoration-transparent">Añadir directos o vídeos</button>
            <section className="flex items-center gap-5">
              <button className="h-10 px-5 bg-indigo-500 rounded-xl text-sm font-medium text-white">Suscribirse</button>
              <button className="flex items-center justify-center h-10 min-w-10 bg-indigo-500 rounded-xl text-sm font-medium text-white">
                <IconHeart size={20} />
              </button>
              <button onClick={() => {
                setShowChangeUrls(false)
                setShowChangeSettings(!showChangeSettings)

              }} className="flex items-center hover:bg-zinc-950 transition-all justify-center h-10 min-w-10 rounded-xl text-sm font-medium text-white">
                <IconDotsVertical size={20} />
              </button>
            </section>
          </section>
          <AnimatePresence>
            {showChangeUrls && (
              <motion.form
                key={"urls"}
                initial={{ opacity: 0, padding: "0rem" }}
                animate={{ opacity: 1, padding: "1.25rem" }}
                exit={{ opacity: 0, padding: "0rem" }}
                onSubmit={handleChangeStreams} className="bg-zinc-950 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col gap-2.5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <label key={index} htmlFor={`${index}`} className="text-sm text-zinc-400  font-medium flex flex-col gap-2">
                    <p>Vídeo {index + 1}</p>
                    <section className="flex items-center gap-5">
                      <input required={index === 0} name={`${index}`} id={`${index + 1}`} type="text" className="focus:ring-0 h-10 rounded-xl w-72 border-0 bg-zinc-900 text-white text-sm" defaultValue={urls[index] || ""} />
                      <button
                        onClick={() => {
                          let obj = document.getElementById(`${index + 1}`) as HTMLInputElement;
                          obj.value = ""
                        }}
                        className="size-10 flex items-center justify-center hover:text-rose-300">
                        <IconX className="size-5"></IconX>
                      </button>
                    </section>
                  </label>
                ))}
                <button className="text-sm font-medium text-white h-10 px-2.5 rounded-xl bg-indigo-500 mt-5">
                  Cambiar
                </button>
              </motion.form>
            )}
            {showChangeSettings && (
              <motion.form
                key={"settings"}
                initial={{ opacity: 0, padding: "0rem" }}
                animate={{ opacity: 1, padding: "1.25rem" }}
                exit={{ opacity: 0, padding: "0rem" }}
                onSubmit={handleChangeSettings} className="z-100 bg-zinc-950 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col gap-2.5">
                <label htmlFor={`streamer`} className="text-sm text-zinc-400  font-medium flex flex-col gap-2">
                  <p>Streamer</p>
                  <section className="flex items-center gap-5">
                    <input required name={`streamer`} id={`streamer`} type="text" className="focus:ring-0 h-10 rounded-xl w-72 border-0 bg-zinc-900 text-white text-sm" defaultValue={settings.streamer} />
                    <button
                      onClick={() => {
                        let obj = document.getElementById(`streamer`) as HTMLInputElement;
                        obj.value = ""
                      }}
                      className="size-10 flex items-center justify-center hover:text-rose-300">
                      <IconX className="size-5"></IconX>
                    </button>
                  </section>
                </label>
                <label htmlFor={`game`} className="text-sm text-zinc-400  font-medium flex flex-col gap-2">
                  <p>Juego</p>
                  <section className="flex items-center gap-5">
                    <input required name={`game`} id={`game`} type="text" className="focus:ring-0 h-10 rounded-xl w-72 border-0 bg-zinc-900 text-white text-sm" defaultValue={settings.game} />
                    <button
                      onClick={() => {
                        let obj = document.getElementById(`game`) as HTMLInputElement;
                        obj.value = ""
                      }}
                      className="size-10 flex items-center justify-center hover:text-rose-300">
                      <IconX className="size-5"></IconX>
                    </button>
                  </section>
                </label>
                <label htmlFor={`title`} className="text-sm text-zinc-400  font-medium flex flex-col gap-2">
                  <p>Título</p>
                  <section className="flex items-center gap-5">
                    <input required name={`title`} id={`title`} type="text" className="focus:ring-0 h-10 rounded-xl w-72 border-0 bg-zinc-900 text-white text-sm" defaultValue={settings.title} />
                    <button
                      onClick={() => {
                        let obj = document.getElementById(`title`) as HTMLInputElement;
                        obj.value = ""
                      }}
                      className="size-10 flex items-center justify-center hover:text-rose-300">
                      <IconX className="size-5"></IconX>
                    </button>
                  </section>
                </label>
                <label htmlFor={`streamerImage`} className="text-sm text-zinc-400  font-medium flex flex-col gap-2">
                  <p>Imagen streamer</p>
                  <section className="flex items-center gap-5">
                    <input required name={`streamerImage`} id={`streamerImage`} type="text" className="focus:ring-0 h-10 rounded-xl w-72 border-0 bg-zinc-900 text-white text-sm" defaultValue={settings.streamerImage} />
                    <button
                      onClick={() => {
                        let obj = document.getElementById(`streamerImage`) as HTMLInputElement;
                        obj.value = ""
                      }}
                      className="size-10 flex items-center justify-center hover:text-rose-300">
                      <IconX className="size-5"></IconX>
                    </button>
                  </section>
                </label>
                <label htmlFor={`viewers`} className="text-sm text-zinc-400  font-medium flex flex-col gap-2">
                  <p>Viewers</p>
                  <section className="flex items-center gap-5">
                    <input required name={`viewers`} id={`viewers`} type="text" className="focus:ring-0 h-10 rounded-xl w-72 border-0 bg-zinc-900 text-white text-sm" defaultValue={settings.viewers} />
                    <button
                      onClick={() => {
                        let obj = document.getElementById(`viewers`) as HTMLInputElement;
                        obj.value = ""
                      }}
                      className="size-10 flex items-center justify-center hover:text-rose-300">
                      <IconX className="size-5"></IconX>
                    </button>
                  </section>
                </label>
                <label htmlFor={`customControls`} className=" text-sm text-zinc-400  font-medium flex items-center gap-2">
                  <p className="flex-grow">Controles personalizados</p>
                  <section className="flex items-center gap-5 pr-2.5">
                    <input name={`customControls`} id={`customControls`} type="checkbox" className="focus:ring-0 size-5 rounded border-0 bg-zinc-900 text-indigo text-sm" defaultChecked={settings.customControls} />
                  </section>
                </label>
                <label htmlFor={`camera`} className=" text-sm text-zinc-400  font-medium flex items-center gap-2">
                  <section>
                    <p className="flex-grow">Mostrar cámara</p>
                    <span className="text-xs text-zinc-600">Sólo se mostrará si los controles personalizados están activados</span>
                  </section>
                  <section className="flex items-center gap-5 pr-2.5">
                    <input name={`camera`} id={`camera`} type="checkbox" className="focus:ring-0 size-5 rounded border-0 bg-zinc-900 text-indigo text-sm" defaultChecked={settings.camera} />
                  </section>
                </label>
                <button className="text-sm font-medium text-white h-10 px-2.5 rounded-xl bg-indigo-500 mt-5">
                  Cambiar
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  )
}