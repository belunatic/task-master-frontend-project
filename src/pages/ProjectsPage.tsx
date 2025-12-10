import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import type { Project } from "../types";
import ProjectAddForm from "../components/projects/ProjectAddForm";
import ProjectList from "../components/projects/ProjectList";
import ProjectEditForm from "../components/projects/ProjectEditForm";

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	//form state
	const [editId, setEditId] = useState("");
	const [editName, setEditName] = useState("");
	const [editDescription, setEditDescription] = useState("");
	const [showEditForm, setShowEditForm] = useState(false);
	const [showAddForm, setShowAddForm] = useState(false);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true);
				const res = await apiClient.get("/api/projects");
				console.log(res.data);
				setProjects(res.data);
				setError("");
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

	//update Project
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

	//update new Project
	const deleteProject = async (id: string) => {
		try {
			setLoading(true);
			const res = await apiClient.delete(`/api/projects/${id}`);
			setProjects((prev) => prev.filter((project) => project._id !== id));
			console.log(res.data);
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
		setShowAddForm(false);
		console.log("This is a form edit form");
	};

	//clear the edit form and close it
	const closeEditForm = () => {
		setEditName("");
		setEditDescription("");
		setEditId("");
		setShowEditForm(false);
	};

	const openAddForm = () => {
		//in case the edit form is open, close and clear it.
		closeEditForm();
		setShowAddForm(true);
	};

	const closeAddForm = () => {
		setShowAddForm(false);
	};

	if (loading) return <div className="text-2xl text-white">Loading</div>;

	return (
		<div>
			<div className="flex justify-between items-center mt-10">
				<h1 className="w-full md:w-3/4 text-3xl font-bold text-white">
					Projects
				</h1>
				<button
					onClick={openAddForm}
					className="bg-sky-500 text-white p-2 w-full cursor-pointer md:w-1/4 rounded-sm">
					Add Project
				</button>
			</div>
			{showAddForm && (
				<ProjectAddForm
					createProject={createProject}
					closeAddForm={closeAddForm}
				/>
			)}
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
			<ProjectList
				projects={projects}
				editProject={editProject}
				deleteProject={deleteProject}
			/>
		</div>
	);
}
