import type { Project } from "../../pages/types";
import { Link } from "react-router-dom";

interface ProjectListProps {
	projects: Project[];
	editProject: (id: string, name: string, description: string) => void;
}

export default function ProjectList({
	projects,
	editProject,
}: ProjectListProps) {
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mt-10">
			{projects &&
				projects.map((project) => (
					<div
						key={project._id}
						className="text-white flex flex-col gap-4 border border-red-500 rounded-sm p-2">
						<h1>{project.name}</h1>
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
					</div>
				))}
		</div>
	);
}
