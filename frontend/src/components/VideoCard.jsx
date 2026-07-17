import formatDuration from "../utils/formatDuration";


function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} min ${remainingSeconds} sec`;
}

function VideoCard({ video }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-xl transition hover:shadow-2xl">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
          ✓ Ready to Generate PDF
        </span>

        <h2 className="mt-4 text-2xl font-bold text-white">
          {video.title}
        </h2>

        <div className="mt-6 space-y-3 text-slate-300">
          <p>
            <span className="font-semibold text-white">
              Channel:
            </span>{" "}
            {video.uploader}
          </p>

          <p>
            <span className="font-semibold text-white">
              Duration:
            </span>{" "}
            {formatDuration(video.duration)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;