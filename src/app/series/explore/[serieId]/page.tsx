import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@iptv/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@iptv/components/ui/card";
import { ACTION, BASE_URL } from "@iptv/utils/credentials";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

type Serie = {
  info: {
    name: string;
    plot: string;
    genre: string;
    cast: string;
    releaseDate: string;
    rating: string;
    cover: string;
  };
  seasons: {
    name: string;
    season_number: string;
  }[];
  episodes: {
    [key: string]: {
      id: string;
      title: string;
      episode_num: number;
      container_extension: string
      info: {
        duration: string;
        movie_image: string
      }
    }[];
  };
};

export const revalidate = 300;

const fetchSeries = cache(async (slug: string) => {
  return fetch(BASE_URL + ACTION.GET_SERIE_DATA + "&series_id=" + slug, {
    next: { revalidate },
  }).then((res) => res.json());
});

export default async function Page({ params }: { params: { serieId: string } }) {
  const { serieId } = params;
  const serie: Serie = await fetchSeries(serieId);

  if (!serie || !serie.info) {
    return <div className="text-center text-gray-500">Série introuvable.</div>;
  }

  return (
    <div className="flex flex-col gap-8 overflow-scroll">
      {/* Card d'information de la série */}
      <Card className="w-full flex">
        {serie.info.cover && (
          <Image src={serie.info.cover} alt={serie.info.name} width={192} height={108} />
        )}
        <div>
          <CardHeader>
            <CardTitle>
              {serie.info.name.includes("|") ? serie.info.name.split("|")[1] : serie.info.name}
            </CardTitle>
            <CardDescription>{serie.info.plot}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div>
              <p className="text-sm font-semibold">Genre</p>
              <p className="text-sm text-gray-600">{serie.info.genre}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Casting</p>
              <p className="text-sm text-gray-600">{serie.info.cast}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Date de sortie</p>
              <p className="text-sm text-gray-600">
                {new Date(serie.info.releaseDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Note</p>
              <p className="text-sm text-gray-600">{serie.info.rating}/10</p>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Liste des saisons */}
      <h1 className="font-semibold">Saisons</h1>
     {
      serie.seasons ? ( <Accordion type="single" collapsible className="w-full">
        {serie.seasons.map((season,i ) => (
          <AccordionItem value={season.name} key={i}>
            <AccordionTrigger>{season.name}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-5 gap-2" key={i}>
                {serie.episodes[season.season_number]?.map((episode) => (
                  <div key={episode.id}>
                    <Link href={`/series/stream/${episode.id}?ext=${episode.container_extension}`}>
                      <Card className="flex overflow-hidden">
                         <Image src={episode.info.movie_image} alt={episode.title} width={64} height={64} className="bg-contain" /> 
                        <CardHeader>
                          <CardTitle>{episode.title}</CardTitle>
                          <CardDescription>Épisode {episode.episode_num}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>) : ( <Accordion type="single" collapsible className="w-full">
        {Object.keys(serie.episodes).map((i) => (
          <AccordionItem value={i} key={i}>
            <AccordionTrigger>Saison {i}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-5 gap-2" key={i}>
                {serie.episodes[i].map((episode) => (
                  <div key={episode.id}>
                    <Link href={`/series/stream/${episode.id}?ext=${episode.container_extension}`}>
                      <Card className="flex overflow-hidden">
                         <Image src={episode.info.movie_image} alt={episode.title} width={64} height={64} className="bg-contain" /> 
                        <CardHeader>
                          <CardTitle>{episode.title}</CardTitle>
                          <CardDescription>Épisode {episode.episode_num}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>)
     }
    </div>
  );
}
