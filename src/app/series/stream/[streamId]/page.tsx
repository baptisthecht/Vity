import { Player } from "@iptv/components/player";


export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ streamId: string }>
  searchParams: Promise<{ ext: string }>
}) {
  const slug = (await params).streamId
  const ext = (await searchParams).ext

  const mimeTypes: Record<string, string> = {
    mkv: "video/x-matroska",
    mp4: "video/mp4",
    webm: "video/webm",
    avc: "video/avc"
  }

  const MT = mimeTypes[ext]

  return <div>
    {ext !== "m3u8" ? (<>
    <video controls>
      <source src={ "http://wfdmakv.mmastertv.xyz/series/5157954183/1998162577/" + slug + "." + ext } type={MT} />
      Votre navigateur ne supporte pas la lecture de cette vidéo.
    </video>
    </>) : (<> <Player slug={slug} ext={ext} type="series" mimeType={MT} /> </>)}
   
  </div>
}