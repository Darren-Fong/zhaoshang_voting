"use client";
import { useEffect, useState } from "react";
import AV from "../../../leancloud";

export default function VotePage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [votes, setVotes] = useState<string[]>([]);
  const maxVotes = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      setError("");
      try {
        const query = new AV.Query("Photo");
        query.ascending("createdAt");
        const results = await query.find();
        setPhotos(
          results.map((p, i) => ({
            id: p.id,
            url: p.get("url"),
            number: i + 1,
          }))
        );
      } catch (err: any) {
        setError(err.message || "Failed to load photos.");
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  const handleVote = (id: string) => {
    if (votes.length < maxVotes && !votes.includes(id)) {
      setVotes([...votes, id]);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    try {
      const Vote = AV.Object.extend("Vote");
      const voteObj = new Vote();
      voteObj.set("photoIds", votes);
      await voteObj.save();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit votes.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Vote for Photos</h1>
      {loading ? (
        <div>Loading photos...</div>
      ) : error ? (
        <div className="text-red-500 mb-2">{error}</div>
      ) : (
        <>
          <p className="mb-4">You have {maxVotes - votes.length} votes left.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
            {photos.map((photo) => (
              <div key={photo.id} className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-200 flex items-center justify-center mb-2">
                  <img
                    src={photo.url}
                    alt={`Photo ${photo.number}`}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <span className="font-mono mb-2">Photo #{photo.number}</span>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                  disabled={votes.includes(photo.id) || votes.length >= maxVotes}
                  onClick={() => handleVote(photo.id)}
                >
                  {votes.includes(photo.id) ? "Voted" : "Vote"}
                </button>
              </div>
            ))}
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={votes.length === 0}
            onClick={handleSubmit}
          >
            Submit Votes
          </button>
          {success && (
            <div className="text-green-600 mt-2">Votes submitted!</div>
          )}
        </>
      )}
    </div>
  );
}
