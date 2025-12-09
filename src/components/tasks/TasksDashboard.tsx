import { useEffect, useState } from "react";
import { apiClient } from "../../clients/api";
import TaskAddForm from "./TaskAddForm";

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

	//form state
	const [showEditForm, setShowEditForm] = useState(false);
	const [showAddForm, setShowAddForm] = useState(false);

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

	//create new task
	const createTask = async (
		name: string,
		description: string,
		status: "todo" | "in-progress" | "done"
	) => {
		try {
			setLoading(true);
			const res = await apiClient.post(`api/projects/${projectId}/tasks`, {
				name,
				description,
				status,
			});
			setTasks((prev) => [...prev, res.data]);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const openAddForm = () => {
		//in case the edit form is open, close and clear it.
		//closeEditForm();
		setShowAddForm(true);
	};

	const closeAddForm = () => {
		setShowAddForm(false);
	};

	//loading
	if (loading) return <div className="text-2xl text-white">Loading</div>;

	return (
		<div>
			{/* Task header */}
			{tasks && (
				<div className="flex justify-between items-center mt-10 border-t pt-4 border-white">
					<h1 className="w-full md:w-3/4 text-3xl font-bold text-white">
						Tasks
					</h1>
					<button
						onClick={openAddForm}
						className="bg-sky-500 text-white p-2 w-full cursor-pointer md:w-1/4 rounded-sm">
						Add Task
					</button>
				</div>
			)}
			{/* add task form */}
			{showAddForm && (
				<TaskAddForm createTask={createTask} closeAddForm={closeAddForm} />
			)}
			<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mt-10">
				{/* error */}
				{error && <div>{error}</div>}
				{/* No tasks message */}
				{tasks.length == 0 && <h2 className="text-2xl">No Tasks</h2>}
				{/* task add form */}
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
		</div>
	);
}
