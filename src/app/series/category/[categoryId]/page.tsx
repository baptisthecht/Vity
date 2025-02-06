import { Card, CardDescription, CardHeader, CardTitle } from "@iptv/components/ui/card";
import { Serie } from "@iptv/types/serie";
import { ACTION, BASE_URL } from "@iptv/utils/credentials";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

export const revalidate = 300;

const fetchSeries = cache(async (slug: string) => {
  return fetch(BASE_URL + ACTION.GET_SERIES + "&category_id=" + slug, {
    next: { revalidate },
  }).then((res) => res.json());
});

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const slug = (await params).categoryId;
  const items: Serie[] = await fetchSeries(slug);

  return (
    <div className="grid grid-cols-8 gap-2 overflow-scroll">
      {items.map((item, i) => (
        <Link key={i} href={"/series/explore/" + item.series_id}>
          <Card>
            <CardHeader>
              <Image src={item.cover} alt={item.name} width={64} height={64} className="w-full" />
              <CardTitle className="pt-2 text-center uppercase">
                {item.name.split("|").length === 2 ? item.name.split("|")[1] : item.name}
              </CardTitle>
              <CardDescription className="text-center">{item.genre}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
