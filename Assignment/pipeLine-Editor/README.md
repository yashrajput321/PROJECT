# 🔧 DAG Builder – React Flow Pipeline Editor

A visual pipeline (DAG) editor built with **React Flow**, allowing users to:

- 🖱️ Add and connect nodes
- 📍 Right-click for context menu (Rename, Delete)
- 🔁 Auto-layout the graph using DAG algorithms
- ✅ Validate if the graph is a Directed Acyclic Graph (DAG)

## ✨ Features

- **Add Nodes** with custom labels
- **Connect Nodes** with draggable edges
- **Right-Click Context Menu** on nodes:
  - Rename
  - Delete
- **Auto Layout** using `dagre` algorithm
- **Validation**: Detects if graph is a valid DAG
- **Live JSON Viewer** of the graph structure
- **Keyboard Support**: Delete selected nodes/edges using `Delete` key

## 📸 Preview

![App Screenshot](./src/assets/Screenshot%202025-07-04%20at%2010.26.34 AM.png)


---

## 🛠️ Tech Stack

- **React** (w/ Hooks)
- **TypeScript**
- **React Flow**
- **Tailwind CSS**
- **Dagre** (for layout)
- **uuid** (for unique IDs)

---

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/yashrajput321/PROJECT/tree/main/Assignment/pipeLine-Editor
cd dag-builder


## Install Dependencies
npm install

## Start the Development Server
npm run dev

## Author
Made with  by **Yash Rajput**
