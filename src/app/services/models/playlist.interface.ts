export interface Playlist {
  id: number;
  name: string;
  list: Video[];
}

export interface Video {
  title: string;
  artist: string;
  url: string;
}
