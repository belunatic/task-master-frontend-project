import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Project } from "../types";
import TasksDashboard from "../components/tasks/TasksDashboard";

export default function ProjectDetailsPage() {
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	//get the projectId
	const { projectId } = useParams();

	useEffect(() => {
		const fetchProjectDetails = async () => {
			try {
				setLoading(true);
				const res = await apiClient.get(`/api/projects/${projectId}`);
				console.log(res.data);
				setProject(res.data);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.log(error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProjectDetails();
	}, [projectId]);

	if (loading) return <div className="text-2xl text-white">Loading</div>;

	return (
		<div>
			<h1 className="text-3xl font-bold text-white">Projects Details Page</h1>
			{error && <div>{error}</div>}
			<div className="mt-10 text-white">
				<div className="text-3xl">{project?.name}</div>
				<div className="text-xl">{project?.description}</div>
			</div>

			<TasksDashboard projectId={projectId ?? ""} />
		</div>
	);
}
