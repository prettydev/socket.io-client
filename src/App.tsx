import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

// const ENDPOINT = "http://178.17.13.115:8500";
const ENDPOINT = "http://localhost:8500";
const socket = socketIOClient(`${ENDPOINT}`,
  {
    "transports": [
      "websocket"
    ]
  }
);

function App() {
  const [response, setResponse] = useState<Date>();

  useEffect(() => {
    socket.on("ServerTime", (data: Date) => {
      setResponse(data);
    });
    return socket.close();
  }, []);

  return (
    <div className="w-1/3 mx-auto my-12 text-center flex flex-col gap-8">
      <div className="text-5xl font-semibold text-red-500">Hello World</div>
      <p className="text-lg text-gray-500">
        It's {response}
      </p>
    </div>
  );
}

export default App;