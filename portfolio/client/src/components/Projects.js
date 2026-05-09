import projects from "../data/projects";

export default function Projects() {
  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {projects.map((p, i) => (
        <a key={i} href={p.link} target="_blank"
          className="bg-gray-900 p-6 rounded-xl hover:scale-105 transition hover:shadow-blue-500/20">
          <h2 className="text-lg font-semibold">{p.title}</h2>
          <p className="text-gray-400 mt-2">{p.desc}</p>
        </a>
      ))}
    </div>
  );
}