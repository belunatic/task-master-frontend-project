import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import type { Project } from "./types";
import ProjectAddForm from "../components/projects/ProjectAddForm";
import ProjectList from "../components/projects/ProjectList";
import ProjectEditForm from "../components/projects/ProjectEditForm";

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	//edit form state
	const [editId, setEditId] = useState("");
	const [editName, setEditName] = useState("");
	const [editDescription, setEditDescription] = useState("");
	const [showEditForm, setShowEditForm] = useState(false);

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

	//update new Project
	const updateProject = async (
		id: string,
		name: string,
		description: string
	) => {
		try {
			setLoading(true);
			const res = await apiClient.put(`/api/projects/${id}`, {
				name,
				description,
			});
			setProjects((prev) =>
				prev.map((project) => {
					return project._id === id
						? { ...project, name, description }
						: project;
				})
			);
			console.log(res.data);
			setShowEditForm(false);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	//set up the update project values
	const editProject = (id: string, name: string, description: string) => {
		setEditName(name);
		setEditDescription(description);
		setEditId(id);
		setShowEditForm(true);
		console.log("This is a form edit form");
	};

	//clear the edit form and close it
	const closeEditForm = () => {
		setEditName("");
		setEditDescription("");
		setEditId("");
		setShowEditForm(false);
	};

	if (loading) return <div className="text-2xl text-white">Loading</div>;

	return (
		<div>
			<h1 className="text-3xl font-bold text-white">Projects Page</h1>

			<ProjectAddForm createProject={createProject} />
			{error && <div>{error}</div>}

			{showEditForm && (
				<ProjectEditForm
					editId={editId}
					editName={editName}
					editDescription={editDescription}
					updateProject={updateProject}
					closeEditForm={closeEditForm}
				/>
			)}
			<ProjectList projects={projects} editProject={editProject} />
		</div>
	);
}
