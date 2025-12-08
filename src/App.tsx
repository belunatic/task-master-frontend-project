import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/NavBar";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

function App() {
	return (
		<>
			<div className="p-5 bg-zinc-900 h-min-screen">
				<NavBar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/projects" element={<ProjectsPage />} />
					<Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
