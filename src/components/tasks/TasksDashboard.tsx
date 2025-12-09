import { useEffect, useState } from "react";
import { apiClient } from "../../clients/api";
import TaskAddForm from "./TaskAddForm";
import type { Tasks, TasksDashboardProps } from "../../pages/types";
import TaskList from "./TaskList";

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
			<div>
				{/* error */}
				{error && <div>{error}</div>}
				{/* No tasks message */}
				{tasks.length == 0 && <h2 className="text-2xl">No Tasks</h2>}
				{/* task add form */}
				{/* show tasks */}

				{tasks && <TaskList tasks={tasks} />}
			</div>
		</div>
	);
}
