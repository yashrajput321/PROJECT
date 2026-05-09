import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const [img, setImg] = useState(false);
  const [email, setEmail] = useState(false);

  return (
    <div className="flex flex-col items-center py-10 gap-4">

      <motion.img
        whileHover={{ scale: 1.1 }}
        onClick={() => setImg(true)}
        src="/profile.jpg"
        className="w-32 h-32 rounded-full border-2 border-blue-500 cursor-pointer"
      />

      <div className="flex gap-6">
        <button onClick={() => setEmail(true)}>Email</button>
        <a href="https://linkedin.com" target="_blank">LinkedIn</a>
        <a href="/cv.pdf" target="_blank">CV</a>
      </div>

      {/* Image Modal */}
      {img && (
        <div onClick={() => setImg(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <img src="/profile.jpg" className="w-96 rounded-lg" />
        </div>
      )}

      {/* Email Modal */}
      {email && (
        <div onClick={() => setEmail(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg">
            <p>your@email.com</p>
            <a
              href="https://mail.google.com/mail/?view=cm&to=your@email.com"
              className="text-blue-400"
            >
              Email Me
            </a>
          </div>
        </div>
      )}
    </div>
  );
}