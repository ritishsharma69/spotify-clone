import React, { useState, useEffect } from 'react';
import MusicList from './components/MusicList';
import MusicPlayer from './components/MusicPlayer';
import './styles.scss';

const App: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('For You');
  const [musicPlayerBackground, setMusicPlayerBackground] = useState<string>('linear-gradient(45deg, #1db954, #121212)'); // Default gradient
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    const storedRecentlyPlayed = JSON.parse(sessionStorage.getItem('recentlyPlayed') || '[]');
    setRecentlyPlayed(storedRecentlyPlayed);
  }, []);

  const handleSongSelect = (song: any) => {
    setCurrentSong(song);
    const updatedRecentlyPlayed = [song, ...recentlyPlayed.filter((s) => s.id !== song.id).slice(0, 9)];
    setRecentlyPlayed(updatedRecentlyPlayed);
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecentlyPlayed));
    setMusicPlayerBackground(getGradientForSong(song)); // Set dynamic gradient for Music Player
  };

  const handleFavorite = (song: any) => {
    const updatedFavorites = favorites.some((fav) => fav.id === song.id)
      ? favorites.filter((fav) => fav.id !== song.id)
      : [...favorites, song];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const getGradientForSong = (song: any) => {
    // Define gradients for each song
    const gradients: { [key: string]: string } = {
      "The Weekend": "linear-gradient(45deg, #e74c3c, #121212)", // Red
      "Demons": "linear-gradient(45deg, #3498db, #121212)", // Blue
      "North of the River": "linear-gradient(45deg, #2ecc71, #121212)", // Green
      "Ghost Stories": "linear-gradient(45deg, #9b59b6, #121212)", // Purple
      "Sparks": "linear-gradient(45deg, #e67e22, #121212)", // Orange
      "Viva La Vida": "linear-gradient(45deg, #1abc9c, #121212)", // Teal
      "Hymn for the Weekend": "linear-gradient(45deg, #f1c40f, #121212)", // Yellow
      "Pain": "linear-gradient(45deg, #e84393, #121212)", // Pink
    };
    return gradients[song.title] || "linear-gradient(45deg, #1db954, #121212)"; // Default gradient
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      {/* Sidebar Toggle Button for Mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Spotify Clone</h2>
        <ul>
          {['For You', 'Recently Played', 'Favourite'].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false); // Close sidebar on tab change in mobile view
              }}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Music List */}
        <MusicList
          onSelectSong={handleSongSelect}
          onFavorite={handleFavorite}
          favorites={favorites}
          recentlyPlayed={activeTab === 'Recently Played' ? recentlyPlayed : []}
          activeTab={activeTab}
        />

        {/* Music Player */}
        {currentSong && (
          <div className="music-player-container" style={{ background: musicPlayerBackground }}>
            <MusicPlayer
              song={currentSong}
              onFavorite={() => handleFavorite(currentSong)}
              isFavorite={favorites.some((fav) => fav.id === currentSong.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;