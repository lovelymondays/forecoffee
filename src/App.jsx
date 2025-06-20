import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { Leva } from "leva";
import "./index.css";
import Experience from "./components/Experience";

// --- Main App Component ---
export default function App() {
  return (
    <div className="w-full h-screen scrollbar-hide relative ">
      <Experience />
    </div>
  );
}
