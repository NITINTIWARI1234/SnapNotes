import { useState } from "react";
import Navbar from "../components/Navbar";
import UrlInput from "../components/UrlInput";
import GenerateButton from "../components/GenerateButton";
import VideoCard from "../components/VideoCard";
import api from "../services/api";

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

    // Fetch video information
    const handleGenerate = async () => {
        if (!youtubeUrl.trim()) {
            setError("Please enter a YouTube URL.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setVideoData(null);

            const response = await api.post("/pdf/generate", {
                url: youtubeUrl,
            });

            setVideoData(response.data.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    // Download PDF
    const handleDownload = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                "/pdf/download",
                {
                    url: youtubeUrl,
                },
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "SnapNotes.pdf";

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            setError("Failed to generate PDF.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center">

                <h1 className="text-5xl font-bold text-white">
                    Turn YouTube Videos into PDF Notes
                </h1>

                <p className="mt-4 text-slate-400">
                    Paste a YouTube video link and generate a PDF containing screenshots.
                </p>

                <div className="mt-10 w-full">

                    <UrlInput
                        value={youtubeUrl}
                        onChange={(e) => {
                            setYoutubeUrl(e.target.value);

                            if (error) setError("");

                            // Hide previous video when URL changes
                            setVideoData(null);
                        }}
                    />

                    <GenerateButton
                        onClick={handleGenerate}
                        loading={loading}
                    />

                    {error && (
                        <p className="mt-4 font-medium text-red-400">
                            {error}
                        </p>
                    )}

                    {loading && (
                        <div className="mt-6 flex justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}

                    {videoData && (
                        <>
                            <VideoCard
                                video={videoData}
                                onDownload={handleDownload}
                                loading={loading}
                            />

                            <button
                                onClick={handleReset}
                                className="mt-4 rounded-lg bg-slate-700 px-6 py-2 text-white transition hover:bg-slate-600"
                            >
                                Check Another Video
                            </button>
                        </>
                    )}

                </div>

            </main>
        </div>
    );
}

export default Home;