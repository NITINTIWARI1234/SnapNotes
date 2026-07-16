import Navbar from "../components/Navbar";
import UrlInput from "../components/UrlInput";
import GenerateButton from "../components/GenerateButton";
import { useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [videoData, setVideoData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleReset = () => {
        setYoutubeUrl("");
        setVideoData(null);
        setError("");
    };
    const handleGenerate = async () => {
        if (!youtubeUrl.trim()) {
            setError("Please enter a YouTube URL.");
            return;
        }

        try {
            setError("");
            setVideoData(null);
            setLoading(true);

            const response = await api.post("/pdf/generate", {
                url: youtubeUrl,
            });

            setVideoData(response.data.data);

        } catch (error) {
            setError(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center">
                <h2 className="text-5xl font-bold text-white">
                    Turn YouTube Videos into PDF Notes
                </h2>

                <p className="mt-4 text-slate-400">
                    Paste a YouTube video link and generate a PDF containing screenshots.
                </p>

                <div className="mt-10 w-full">
                    <UrlInput
                        value={youtubeUrl}
                        onChange={(e) => {
                            setYoutubeUrl(e.target.value);
                            if (error) setError("");
                        }}
                    />
                    <GenerateButton
                        onClick={handleGenerate}
                        loading={loading}
                    />

                    {loading && (
                        <div className="mt-6 flex justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}

                    {videoData && <VideoCard video={videoData} />}
                    {videoData && (
                        <button
                            onClick={handleReset}
                            className="mt-4 rounded-lg bg-slate-700 px-6 py-2 text-white transition hover:bg-slate-600"
                        >
                            Check Another Video
                        </button>
                    )}

                </div>
            </main >
        </div >
    );
}

export default Home;