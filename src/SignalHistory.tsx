import { useEffect, useState } from "react";

function SignalHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await fetch("http://localhost:5000/api/history");
        const data = await response.json();

        if (data.success) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadHistory();

    const interval = setInterval(loadHistory, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>📜 AI Signal History</h2>

      <table style={{ width: "100%", color: "white" }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Pair</th>
            <th>Signal</th>
            <th>Entry</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{item.pair}</td>
              <td>{item.signal}</td>
              <td>{item.entry}</td>
              <td>{item.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SignalHistory;