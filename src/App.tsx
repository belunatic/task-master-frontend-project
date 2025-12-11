import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/NavBar";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AuthPage from "./pages/AuthPage";

function App() {
	return (
		<main className=" bg-zinc-900 text-white h-screen">
			<section className=" max-w-[85rem] mx-auto flex flex-col gap-y-4">
				<div className="p-5 bg-zinc-900 h-min-screen">
					<NavBar />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/projects" element={<ProjectsPage />} />
						<Route
							path="/projects/:projectId"
							element={<ProjectDetailsPage />}
						/>
						<Route path="/auth" element={<AuthPage />} />
					</Routes>
				</div>
			</section>
		</main>
	);
}

export default App;
