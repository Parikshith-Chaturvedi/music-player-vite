import React from 'react';
import { SongList } from './components/SongList';
import { SearchBar } from './components/SearchBar';
import { useMusicLibrary } from './hooks/useMusicLibrary';
import { AddSongForm } from './components/AddSongForm';

interface MusicLibraryProps {
  userRole: 'admin' | 'user';
  userId: string;
}

const App: React.FC<MusicLibraryProps> = ({ userRole, userId }) => {
  const {
    songs,
    searchTerm,
    setSearchTerm,
    filterGenre,
    setFilterGenre,
    genres,
    addSong,
    removeSong,
    sortBy,
    sortConfig
  } = useMusicLibrary();

  const [showAddForm, setShowAddForm] = React.useState(false);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Music Collection</h2>
        {userRole === 'admin' && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Song
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <SongList
        songs={songs}
        onRemove={userRole === 'admin' ? removeSong : undefined}
        onSort={sortBy}
        sortConfig={sortConfig}
      />

      {showAddForm && userRole === 'admin' && (
        <AddSongForm
          onAdd={addSong}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default App;