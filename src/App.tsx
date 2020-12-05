import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

function App() {
  const [response, setResponse] = useState<Date>();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("ServerTime", (data: Date) => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's {response}
    </p>
  );
}

export default App;