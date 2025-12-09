import { useEffect, useState } from "react";
import { apiClient } from "../../clients/api";

interface TasksDashboardProps {
	projectId: string;
}

interface Tasks {
	_id: string;
	name: string;
	description: string;
	status: "todo" | "in-progress" | "done";
}

export default function TasksDashboard({ projectId }: TasksDashboardProps) {
	const [tasks, setTasks] = useState<Tasks[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	//retrieve the tasks
	useEffect(() => {
		const fetchProjectDetails = async () => {
			try {
				setLoading(true);
				const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
				console.log(res.data);
				setTasks(res.data);
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

	//loading
	if (loading) return <div className="text-2xl text-white">Loading</div>;

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mt-10">
			{/* error */}
			{error && <div>{error}</div>}
			{/* No tasks message */}
			{tasks.length == 0 && <h2 className="text-2xl">No Tasks</h2>}
			{/* show tasks */}
			{tasks &&
				tasks.map((task) => (
					<div
						key={task._id}
						className="text-white flex flex-col gap-4 border border-red-500 rounded-sm p-2">
						<h1>{task.name}</h1>
						<p>{task.description}</p>
						{/* <Link
								to={`/projects/${project._id}`}
								className="mt-auto bg-sky-500 rounded text-center cursor-pointer">
								See Project
							</Link> */}
						{/* <button
								type="button"
								onClick={() =>
									editProject(project._id, project.name, project.description)
								}
								className="mt-auto bg-green-500 rounded text-center cursor-pointer">
								Edit
							</button>
							{!confirm || project._id !== DeleteId ? (
								<button
									type="button"
									onClick={() => openConfirmBox(project._id)}
									className="mt-auto bg-red-500 rounded text-center cursor-pointer">
									delete
								</button>
							) : (
								<div className="flex flex-col gap-y-2 justify-center">
									<p className="text-center">Are you sure?</p>
									<div className="flex gap-x-2">
										<button
											className="bg-red-500 p-2 w-full cursor-pointer"
											onClick={() => handleDelete(project._id)}>
											Yes
										</button>
										<button
											className="bg-green-500 p-2 w-full cursor-pointer"
											onClick={closeConfirmBox}>
											No
										</button>
									</div>
								</div>
							)} */}
					</div>
				))}
		</div>
	);
}
