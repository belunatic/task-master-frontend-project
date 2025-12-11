import { useState } from "react";
import type { Status } from "../../types";

interface TaskAddFormProps {
	updateTask: (
		id: string,
		name: string,
		description: string,
		status: Status
	) => void;
	editName: string;
	editDescription: string;
	editId: string;
	editStatus: Status;
	closeEditForm: () => void;
}

export default function TaskEditForm({
	updateTask,
	editName,
	editDescription,
	editId,
	editStatus,
	closeEditForm,
}: TaskAddFormProps) {
	const [name, setName] = useState(editName);
	const [description, setDescription] = useState(editDescription);
	const [status, setStatus] = useState<Status>(editStatus);
	const [error, setError] = useState({ name: false, description: false });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (name === "") {
			return setError((prev) => ({ ...prev, name: true }));
		}
		if (description === "") {
			return setError((prev) => ({ ...prev, description: true }));
		}
		updateTask(editId, name, description, status);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className=" text-white border p-2 h-full mt-10 flex flex-col gap-2 rounded py-4">
			<label htmlFor="project-name">Project Name: </label>
			<input
				type="text"
				name="project-name"
				className="border px-2 py-1"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			{error.name && <p className="text-red-500 text-sm">Invalid name</p>}
			<label htmlFor="project-description">Project Description:</label>
			<input
				type="text"
				name="project-description"
				className="border px-2 py-1"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			{error.description && (
				<p className="text-red-500 text-sm">Invalid description</p>
			)}
			<label htmlFor="project-status">Project Description:</label>
			<select
				name="project-status"
				className="border px-2 py-1 bg-zinc-900"
				value={status}
				onChange={(e) => setStatus(e.target.value as Status)}>
				<option value="todo" selected={status === "todo"}>
					To Do
				</option>
				<option value="in-progress" selected={status === "in-progress"}>
					In Progress
				</option>
				<option value="done" selected={status === "done"}>
					Done
				</option>
			</select>
			<input
				type="submit"
				value="Update Task"
				className="mt-auto bg-sky-500 rounded cursor-pointer"
			/>
			<input
				type="button"
				value="Cancel"
				className="mt-auto bg-green-500 rounded cursor-pointer"
				onClick={closeEditForm}
			/>
		</form>
	);
}
