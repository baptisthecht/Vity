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

  return <div>
    {ext === "x" ? (<>
    <video controls>
      <source src={"http://wfdmakv.mmastertv.xyz/series/5157954183/1998162577/401406083.mkv"} type="video/x-matroska" />
      Votre navigateur ne supporte pas la lecture de cette vidéo.
    </video>
    </>) : (<> <Player slug={slug} ext={ext} type="series" /></>)}
   
  </div>
}