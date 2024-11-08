export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    year: number;
    duration: string;
    coverUrl?: string;
}

export interface User {
    id: string;
    username: string;
    role: 'admin' | 'user';
  }
  
  export interface MusicPlayerProps {
    user?: User;
  }