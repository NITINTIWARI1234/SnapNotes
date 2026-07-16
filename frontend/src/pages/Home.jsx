import Navbar from "../components/Navbar";
import UrlInput from "../components/UrlInput";
import GenerateButton from "../components/GenerateButton";
import { useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleGenerate = async () => {
        if (!youtubeUrl.trim()) {
            alert("Please enter a YouTube URL.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/pdf/generate", {
                url: youtubeUrl,
            });

            setVideoData(response.data.data);

        } catch (error) {
            alert(
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
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                    />
                    <GenerateButton onClick={handleGenerate} />

                    {loading && (
                        <p className="mt-4 text-white">
                            Loading...
                        </p>
                    )}

                    {videoData && <VideoCard video={videoData} />}

        </div>
            </main >
        </div >
    );
}

export default Home;