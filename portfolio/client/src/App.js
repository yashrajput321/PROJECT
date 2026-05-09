import { useEffect, useState } from "react";
import io from "socket.io-client";

import Header from "./components/Header";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import LiveCursor from "./components/LiveCursor";

const socket = io("http://localhost:5000");

export default function App() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.on("users", (data) => setUsers(data));

    const move = (e) => {
      socket.emit("move", {
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div>
      <Header />
      <Projects />
      <Footer />
      <LiveCursor users={users} />
    </div>
  );
}