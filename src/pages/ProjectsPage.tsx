import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "./types";
import ProjectAddForm from "../components/projects/ProjectAddForm";

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// const [name, setName] = useState("");
	// const [description, seDescription] = useState("");

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
			<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mt-10">
				{projects &&
					projects.map((project) => (
						<div
							key={project._id}
							className="text-white flex flex-col gap-4 border border-red-500 rounded-sm p-2">
							<h1>{project.name}</h1>
							<p>{project.description}</p>
							<Link
								to={`/projects/${project._id}`}
								className="mt-auto bg-sky-500 rounded text-center">
								See Project
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}
