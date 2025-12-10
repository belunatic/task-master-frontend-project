import type { Status, Tasks } from "../../pages/types";
import { taskStatusBorder, taskStatusText } from "../../utils/const";
import { useState } from "react";

interface TaskListProp {
	tasks: Tasks[];
	editTask: (
		id: string,
		name: string,
		description: string,
		status: Status
	) => void;
	deleteTask: (id: string) => void;
}

export default function TaskList({
	tasks,
	editTask,
	deleteTask,
}: TaskListProp) {
	const [confirm, setConfirm] = useState(false);
	const [DeleteId, setDeleteId] = useState("");

	//delete project
	const handleDelete = (id: string) => {
		deleteTask(id);
		setConfirm(false);
	};

	//open the only clicked confirmBox
	const openConfirmBox = (id: string) => {
		setDeleteId(id);
		setConfirm(true);
	};

	const closeConfirmBox = () => {
		setDeleteId("");
		setConfirm(false);
	};
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mt-10">
			{tasks &&
				tasks.map((task) => (
					<div
						key={task._id}
						className={`text-white flex flex-col gap-4 border ${
							taskStatusBorder[task.status]
						} rounded-sm p-2`}>
						<h1 className="text-lg font-bold capitalize">{task.name}</h1>
						<p>{task.description}</p>
						<p className={`${taskStatusText[task.status]} capitalize`}>
							{" "}
							Status: {task.status}
						</p>
						{/* <Link
								to={`/projects/${project._id}`}
								className="mt-auto bg-sky-500 rounded text-center cursor-pointer">
								See Project
							</Link> */}
						<button
							type="button"
							onClick={() =>
								editTask(task._id, task.name, task.description, task.status)
							}
							className="mt-auto bg-green-500 rounded text-center cursor-pointer">
							Edit
						</button>
						{!confirm || task._id !== DeleteId ? (
							<button
								type="button"
								onClick={() => openConfirmBox(task._id)}
								className="mt-auto bg-red-500 rounded text-center cursor-pointer">
								delete
							</button>
						) : (
							<div className="flex flex-col gap-y-2 justify-center">
								<p className="text-center">Are you sure?</p>
								<div className="flex gap-x-2">
									<button
										className="bg-red-500 p-2 w-full cursor-pointer"
										onClick={() => handleDelete(task._id)}>
										Yes
									</button>
									<button
										className="bg-green-500 p-2 w-full cursor-pointer"
										onClick={closeConfirmBox}>
										No
									</button>
								</div>
							</div>
						)}
					</div>
				))}
		</div>
	);
}
