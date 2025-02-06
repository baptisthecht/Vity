import { Player } from "@iptv/components/player"
import Image from "next/image"

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ streamId: string }>
  searchParams: Promise<{ name: string, icon_uri: string }>
}) {
  const slug = (await params).streamId
  const sp = await searchParams
  const name = sp.name
  const icon_uri = sp.icon_uri

  return <div className="flex flex-col items-center justify-center gap-4 p-4 h-full w-full">
   <div className="flex items-center gap-2 p-2">
    <Image src={icon_uri} alt={name} width={64} height={64} />
     <h1 className="font-semibold">{name}</h1>
   </div>
    <div className="flex-1 w-full max-w-xl">
      <Player slug={slug} />
    </div>
  </div>
}