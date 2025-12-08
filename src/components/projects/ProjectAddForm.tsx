import { useState } from "react";

interface ProjectAddFormProps {
	createProject: (name: string, description: string) => void;
}

export default function ProjectAddForm({ createProject }: ProjectAddFormProps) {
	const [name, setName] = useState("");
	const [description, seDescription] = useState("");
	const [error, setError] = useState({ name: false, description: false });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (name === "") {
			return setError((prev) => ({ ...prev, name: true }));
		}
		if (description === "") {
			return setError((prev) => ({ ...prev, description: true }));
		}
		createProject(name, description);
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
				onChange={(e) => seDescription(e.target.value)}
			/>
			{error.description && (
				<p className="text-red-500 text-sm">Invalid description</p>
			)}
			<input
				type="submit"
				value="Create Project"
				className="mt-auto bg-sky-500 rounded cursor-pointer"
			/>
		</form>
	);
}
