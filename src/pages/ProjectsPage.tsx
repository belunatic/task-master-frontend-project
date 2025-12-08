import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import type { Project } from "./types";
import ProjectAddForm from "../components/projects/ProjectAddForm";
import ProjectList from "../components/projects/ProjectList";

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true);
				const res = await apiClient.get("/api/projects");
				console.log(res.data);
				setProjects(res.data);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.log(error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	//create new Project
	const createProject = async (name: string, description: string) => {
		try {
			setLoading(true);
			const res = await apiClient.post("/api/projects", {
				name,
				description,
			});
			setProjects((prev) => [...prev, res.data]);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div className="text-2xl text-white">Loading</div>;

	return (
		<div>
			<h1 className="text-3xl font-bold text-white">Projects Page</h1>

			<ProjectAddForm createProject={createProject} />
			{error && <div>{error}</div>}

			<ProjectList projects={projects} />
		</div>
	);
}
