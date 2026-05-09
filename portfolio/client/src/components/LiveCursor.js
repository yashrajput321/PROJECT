import { useEffect, useState } from "react";

export default function LiveCursor({ users }) {
  const [smooth, setSmooth] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setSmooth(prev => {
        let updated = { ...prev };

        Object.keys(users).forEach(id => {
          const t = users[id];
          const c = prev[id] || t;

          updated[id] = {
            ...t,
            x: c.x + (t.x - c.x) * 0.2,
            y: c.y + (t.y - c.y) * 0.2
          };
        });

        return updated;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [users]);

  return (
    <>
      {Object.values(smooth).map(user => (
        <div key={user.id}
          style={{
            position: "fixed",
            left: user.x,
            top: user.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9999
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: user.color,
              boxShadow: `0 0 20px ${user.color}, 0 0 40px ${user.color}`
            }}
          />
          <div style={{
            fontSize: 10,
            color: user.color,
            textAlign: "center",
            marginTop: 4
          }}>
            {user.name}
          </div>
        </div>
      ))}
    </>
  );
}