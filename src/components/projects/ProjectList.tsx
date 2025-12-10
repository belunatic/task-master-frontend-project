import { useState } from "react";
import type { Project } from "../../types";
import { Link } from "react-router-dom";

interface ProjectListProps {
	projects: Project[];
	editProject: (id: string, name: string, description: string) => void;
	deleteProject: (id: string) => void;
}

export default function ProjectList({
	projects,
	editProject,
	deleteProject,
}: ProjectListProps) {
	const [confirm, setConfirm] = useState(false);
	const [DeleteId, setDeleteId] = useState("");

	//delete project
	const handleDelete = (id: string) => {
		deleteProject(id);
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
			{projects &&
				projects.map((project) => (
					<div
						key={project._id}
						className="text-white flex flex-col gap-4 border border-red-500 rounded-sm p-2">
						<h1 className="text-md font-semibold">{project.name}</h1>
						<p>{project.description}</p>
						<Link
							to={`/projects/${project._id}`}
							className="mt-auto bg-sky-500 rounded text-center cursor-pointer">
							See Project
						</Link>
						<button
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
						)}
					</div>
				))}
		</div>
	);
}
