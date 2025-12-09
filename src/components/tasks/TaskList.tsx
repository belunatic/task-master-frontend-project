import type { Tasks } from "../../pages/types";
import { taskStatusBorder, taskStatusText } from "../../utils/const";

interface TaskListProp {
	tasks: Tasks[];
}

export default function TaskList({ tasks }: TaskListProp) {
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
