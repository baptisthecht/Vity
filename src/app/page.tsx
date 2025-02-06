import { TypeCard } from "@iptv/components/type-card";
import { Film, RadioTower, Tv2 } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="flex flex-col justify-between sm:grid sm:grid-cols-3 sm:gap-10 h-full">
        <TypeCard label="LIVE" href="/live" icon={RadioTower} />
        <TypeCard label="SERIES" href="/series" icon={Tv2} />
        <TypeCard label="FILMS" href="/movies" icon={Film} />
      </div>
      <div className="p-10 flex flex-col items-center justify-center">Expiration</div>
    </>
  );
};

export default Home;
