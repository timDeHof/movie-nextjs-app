type SearchMeta = {
  currentPage: number;
  total_pages: number;
  total_results: number;
};

export type SearchResult = {
  results: Movies[];
  meta: SearchMeta;
};

export type Movies = {
  movie_id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  watched: boolean;
  runtime: number;
};
