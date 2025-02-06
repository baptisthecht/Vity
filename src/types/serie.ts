export type Serie = {
    series_id: string;
    name: string;
    genre: string;
    cover: string;
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