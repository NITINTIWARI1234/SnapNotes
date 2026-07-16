function GenerateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Generate PDF
    </button>
  );
}

export default GenerateButton;