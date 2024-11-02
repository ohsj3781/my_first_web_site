import React, {useEffect, useState} from "react";
import axios from "axios";


const Tracklist = ({ playlist, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Tracklist</h2>
      <ul>
        {playlist.length ? (
          playlist.map(({ id, artist, song }) => (
            <li
              key={id}
              onClick={() => onDelete(id)}
              className="py-1 flex justify-between items-center"
            >
              {`${artist} - ${song}`}
              <button
                onClick={() => onDelete(id)}
                className="text-red-500 hover:text-red-700"
              >
                &#10005;
              </button>
            </li>
          ))
        ) : (
          <span>Playlist is Empty</span>
        )}
      </ul>
    </div>
  );
};

const PlaylistForm = ({
  artist,
  song,
  playlist,
  setArtist,
  setSong,
  handleAddTrack,
  fetchPlaylist,
}) => {
  return (
    <form onSubmit={handleAddTrack}>
      <label className="block">Artist</label>
      <input
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="w-full border border-gray-300"
      ></input>
      <label className="block">Song</label>
      <input
        value={song}
        onChange={(e) => setSong(e.target.value)}
        className="w-full border border-gray-300"
      ></input>
      <button
        type="submit"
        className={`w-full bg-blue-500
          text-white rounded-md py-1 my-3`}
      >
        Add Track
      </button>
      <button
        type="button"
        onClick={fetchPlaylist}
        className="w-full bg-blue-500
        text-white rounded-md py-1"
      >Update
      </button>
    </form>
  );
};

const Playlist = () => {
  const [playlist, setPlaylist] = React.useState([,
  ]);
  const [nextId, setNextId] = React.useState(4);
  const [artist, setArtist] = React.useState("");
  const [song, setSong] = React.useState("");
  const [loading,setLoading]=React.useState(true);
  const [error,setError]=React.useState(null);
  const handleAddTrack = async(e) => {
    e.preventDefault();
    const newTrack = {
      id: nextId,
      artist: artist.trim(),
      song: song.trim(),
    };
    try{
      const response= await axios.post("http://localhost:10000/v1/playlist",newTrack
      );
      setPlaylist((prev) => [...prev, newTrack]);
      setNextId((prev) => prev + 1);
      setArtist("");
      setSong("");
    }catch(err){
      console.error("Error adding track:",err);
    };
   
  };

  const handleDeleteTrack = async(id) => {
    try {
      await axios.delete(`http://localhost:10000/v2/playlist/${id}`);
      setPlaylist((prev) => prev.filter((track) => track.id !== id));
    } catch (err) {
      console.error("Error deleting track:", err);
    }
  };

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get("http://localhost:10000/v2/playlist");
      setPlaylist(response.data);
    } catch (err) {
      console.error("Error fetching playlist:", err);
    }
  };

  return (
    <div className="flex w-3/4 p-3 gap-2">
      <div className="flex-1">
        <h2 className="text-2xl font-bold">Add Track</h2>
        <PlaylistForm
          artist={artist}
          song={song}
          playlist={playlist}
          setArtist={setArtist}
          setSong={setSong}
          handleAddTrack={handleAddTrack}
          fetchPlaylist={fetchPlaylist}
        />
      </div>
      <div className="flex-1">
        <Tracklist playlist={playlist} onDelete={handleDeleteTrack} />
      </div>
    </div>
  );
};

export default Playlist;

