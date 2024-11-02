import React from "react";

const Tracklist = ({ playlist }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Tracklist</h2>
      <ul>
        {playlist.length ? (
          playlist.map(({ id, artist, song }) => (
            <li key={id}>{`${artist} - ${song}`}</li>
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
    </form>
  );
};

const Playlist = () => {
  const [playlist, setPlaylist] = React.useState([
    { id: 1, artist: "Saya Gray", song: "DIZZY PPL BECOME BLURRY" },
    { id: 2, artist: "SBTRKT", song: "CLASSIC THEME" },
    { id: 3, artist: "Sally Oldfield", song: "Blue Water" },
  ]);
  const [nextId, setNextId] = React.useState(4);
  const [artist, setArtist] = React.useState("");
  const [song, setSong] = React.useState("");

  const handleAddTrack = (e) => {
    e.preventDefault();
    const newTrack = {
      id: nextId,
      artist: artist.trim(),
      song: song.trim(),
    };
    setPlaylist((prev) => [...prev, newTrack]);
    setNextId((prev) => prev + 1);
    setArtist("");
    setSong("");
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
        />
      </div>
      <div className="flex-1">
        <Tracklist playlist={playlist} />
      </div>
    </div>
  );
};

export default Playlist;
