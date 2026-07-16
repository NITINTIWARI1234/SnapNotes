function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} min ${remainingSeconds} sec`;
}

function VideoCard({ video }) {
  return (
    <div className="mt-8 rounded-xl bg-slate-800 p-6 text-left shadow-lg">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="mb-5 w-full rounded-lg"
      />

      <h2 className="text-2xl font-bold text-white">
        {video.title}
      </h2>

      <p className="mt-3 text-slate-300">
        <span className="font-semibold">Channel:</span> {video.uploader}
      </p>

      <p className="mt-2 text-slate-300">
        <span className="font-semibold">Duration:</span>{" "}
        {formatDuration(video.duration)}
      </p>
    </div>
  );
}

export default VideoCard;