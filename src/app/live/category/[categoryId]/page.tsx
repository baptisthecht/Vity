import { Card, CardHeader, CardTitle } from "@iptv/components/ui/card";
import { ACTION, BASE_URL } from "@iptv/utils/credentials";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

const fetchLiveStreams = cache(async (slug: string) => {
  return fetch(BASE_URL + ACTION.GET_LIVE + "&category_id=" + slug).then((res) => res.json());
});

export default async function Page({
  params,
}: {
  params: Promise<{ serieId: string }>;
}) {
  const slug = (await params).serieId;
  const items = await fetchLiveStreams(slug);

  return (
    <div className="grid grid-cols-5 gap-2">
      {items.map((item) => (
        <Link key={item.stream_id} href={"/live/stream/" + item.stream_id+ "?name=" + item.name+"&icon_uri="+item.stream_icon}>
          <Card>
            <CardHeader>
              {
                item.stream_icon && (<Image src={item.stream_icon.trim()} alt={item.name || "image"} width={64} height={64} />)
              }
              <CardTitle>
                {item.name.split("|").length === 2 ? item.name.split("|")[1] : item.name}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
