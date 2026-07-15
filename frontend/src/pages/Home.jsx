import Navbar from "../components/Navbar";
import UrlInput from "../components/UrlInput";
import GenerateButton from "../components/GenerateButton";

function Home() {
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
          <UrlInput />
          <GenerateButton />
        </div>
      </main>
    </div>
  );
}

export default Home;