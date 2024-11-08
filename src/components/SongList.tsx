import React from 'react';
import { Song, User } from '../types';

interface SongListProps {
  songs: Song[];
  onRemove: (id: string) => void;
  currentUser?: User | null;
}

export const SongList: React.FC<SongListProps> = ({ songs, onRemove, currentUser }) => {
  const isAdmin = currentUser?.role === 'admin';

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <p className="mt-4 text-lg text-gray-600">No songs found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {songs.map(song => (
        <div
          key={song.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                  {song.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-1">{song.artist}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {song.album} • {song.year}
                </p>
              </div>
              {isAdmin && (
                <button
                  onClick={() => onRemove(song.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  aria-label="Remove song"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {song.genre}
              </span>
              <span className="text-xs text-gray-500">{song.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};