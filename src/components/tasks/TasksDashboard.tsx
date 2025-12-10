import { useEffect, useState } from "react";
import { apiClient } from "../../clients/api";
import TaskAddForm from "./TaskAddForm";
import type { Status, Tasks, TasksDashboardProps } from "../../pages/types";
import TaskList from "./TaskList";
import TaskEditForm from "./TaskEditForm";

export default function TasksDashboard({ projectId }: TasksDashboardProps) {
	const [tasks, setTasks] = useState<Tasks[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	//form state
	const [editId, setEditId] = useState("");
	const [editName, setEditName] = useState("");
	const [editStatus, setEditStatus] = useState<Status>("todo");
	const [editDescription, setEditDescription] = useState("");
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

	//update Task
	const updateTask = async (
		id: string,
		name: string,
		description: string,
		status: Status
	) => {
		try {
			setLoading(true);
			const res = await apiClient.put(`/api/tasks/${id}`, {
				name,
				description,
			});
			setTasks((prev) =>
				prev.map((tasks) => {
					return tasks._id === id
						? { ...tasks, name, description, status }
						: tasks;
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
	const editTask = (
		id: string,
		name: string,
		description: string,
		status: Status
	) => {
		setEditName(name);
		setEditDescription(description);
		setEditId(id);
		setEditStatus(status);
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

	const openAddForm = () => {
		//in case the edit form is open, close and clear it.
		closeEditForm();
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

			{/* edit task form */}
			{showEditForm && (
				<TaskEditForm
					updateTask={updateTask}
					editName={editName}
					editDescription={editDescription}
					editStatus={editStatus}
					editId={editId}
					closeEditForm={closeEditForm}
				/>
			)}
			<div>
				{/* error */}
				{error && <div>{error}</div>}
				{/* No tasks message */}
				{tasks.length == 0 && <h2 className="text-2xl">No Tasks</h2>}
				{/* task add form */}
				{/* show tasks */}

				{tasks && <TaskList tasks={tasks} editTask={editTask} />}
			</div>
		</div>
	);
}
