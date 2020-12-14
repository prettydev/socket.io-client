import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(`${process.env.REACT_APP_SOCKETIO_ENDPOINT}`,
  {
    "transports": [
      "websocket",
      'flashsocket',
      'htmlfile',
      'xhr-polling',
      'jsonp-polling',
      'polling'
    ]
  }
);

const initial_logs = [
  "please type any messages"
]

function App() {
  const [response, setResponse] = useState<Date>();

  const [prefix, setPrefix] = useState<number>(55);
  const [msg, setMsg] = useState<string>('');
  const [logs, setLogs] = useState<string[]>(initial_logs);

  const onKeyDown = (e: any) => {
    if (e.keyCode !== 13) {
      return;
    }
    sendMsg()
  }

  const onChange = (e: any) => {
    setMsg(e.target.value)
  }

  const sendMsg = () => {
    socket.emit("msg", { prefix, msg });
    setPrefix(Math.round(Math.random() * 100));
    setMsg('');
  }

  useEffect(() => {
    socket.on("ServerTime", (data: Date) => {
      setResponse(data);
    });
    socket.on("msg", (data: string) => {
      logs.unshift(data);
      setLogs(logs);
    });
  }, []);

  return (
    <div className="w-1/3 mx-auto my-12 text-center flex flex-col gap-8">
      <div className="text-5xl font-semibold text-red-500">Hello World</div>
      <p className="text-lg text-gray-500">
        It's {response}
      </p>
      <div className="flex flex-col gap-8 px-8 py-8 bg-gray-300 mx-auto">
        <div className="flex flex-row gap-4 justify-center">
          <input className="border border-green-500 w-64 rounded-sm px-2" value={msg} onKeyDown={onKeyDown} onChange={onChange}></input>
          <button className="bg-green-500 p-2 rounded-sm shadow-xl text-white" onClick={sendMsg}>send with prefix-{prefix}</button>
        </div>
        <div className="text-yellow-800">
          {
            logs.map((log, i) => <div className="">{log}</div>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;