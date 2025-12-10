export interface Project {
	name: string;
	description: string;
	_id: string;
}

export type Status = "todo" | "in-progress" | "done";

export interface Tasks {
	_id: string;
	name: string;
	description: string;
	status: "todo" | "in-progress" | "done";
}

export interface TasksDashboardProps {
	projectId: string;
}

export interface User {
	_id: string;
	username: string;
	email: string;
	githubId?: string;
}
