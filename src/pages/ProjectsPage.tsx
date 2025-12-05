import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "./types";

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [name, setName] = useState("");
	const [description, seDescription] = useState("");

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await apiClient.post("/api/projects", { name, description });
			setProjects((prev) => [...prev, res.data]);
			setName("");
			seDescription("");
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

			<form
				onSubmit={handleSubmit}
				className=" text-white border p-2 h-50 mt-10 flex flex-col gap-2 rounded">
				<label htmlFor="project-name">Project Name: </label>
				<input
					type="text"
					name="project-name"
					className="border"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="project-description">Project Description</label>
				<input
					type="text"
					name="project-description"
					className="border"
					value={description}
					onChange={(e) => seDescription(e.target.value)}
				/>
				<input
					type="submit"
					value="Create Project"
					className="mt-auto bg-sky-500 rounded"
				/>
			</form>
			{error && <div>{error}</div>}
			<div className="w-full flex mt-10 gap-x-6">
				{projects &&
					projects.map((project) => (
						<div
							key={project._id}
							className="text-white w-50 flex flex-col gap-4 border-1 border-red-500 rounded-sm p-2">
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
