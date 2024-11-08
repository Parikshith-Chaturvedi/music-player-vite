import { useState, useMemo } from 'react';
import { Song } from '../types';
import { sampleSongs } from '../data/sampleData';

type SortKey = 'title' | 'artist' | 'album' | 'year';
type SortDirection = 'asc' | 'desc';

interface UseMusicLibraryProps {
  initialSongs?: Song[];
}

export const useMusicLibrary = ({ initialSongs = sampleSongs }: UseMusicLibraryProps = {}) => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'title',
    direction: 'asc'
  });
  const [filterGenre, setFilterGenre] = useState<string>('');

  const filteredAndSortedSongs = useMemo(() => {
    let result = [...songs];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(song =>
        Object.values(song).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply genre filter
    if (filterGenre) {
      result = result.filter(song => song.genre === filterGenre);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [songs, searchTerm, sortConfig, filterGenre]);

  const addSong = (song: Omit<Song, 'id'>) => {
    const newSong = {
      ...song,
      id: Math.random().toString(36).substr(2, 9)
    };
    setSongs(prev => [...prev, newSong]);
  };

  const removeSong = (id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id));
  };

  const sortBy = (key: SortKey) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const genres = useMemo(() => 
    Array.from(new Set(songs.map(song => song.genre))),
    [songs]
  );

  return {
    songs: filteredAndSortedSongs,
    searchTerm,
    setSearchTerm,
    sortConfig,
    sortBy,
    filterGenre,
    setFilterGenre,
    genres,
    addSong,
    removeSong
  };
};