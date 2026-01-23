import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/hello");
        if (!res.ok) return;

        const data = await res.json();
        setMessage(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, []);
  return (
    <p className="font-bold p-9 mt-7 text-9xl text-amber-950">{message}</p>
  );
}

export default App;
