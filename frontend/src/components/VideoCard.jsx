import formatDuration from "../utils/formatDuration";

function VideoCard({ video, onDownload, loading }) {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-xl">

            <img
                src={video.thumbnail}
                alt={video.title}
                className="h-64 w-full object-cover"
            />

            <div className="p-6">

                <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                    ✓ Video Found
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

                <button
                    onClick={onDownload}
                    disabled={loading}
                    className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Generating PDF..." : "Download PDF"}
                </button>

            </div>

        </div>
    );
}

export default VideoCard;