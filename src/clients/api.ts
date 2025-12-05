import axios from "axios";

export const apiClient = axios.create({
	baseURL: "http://localhost:4000",
	headers: {
		Authorization:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzBiNjBjYTNiNmQzZThhNGUwYzY4ZiIsInVzZXJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzY0OTU2MTk3LCJleHAiOjE3NjQ5NjMzOTd9.otLU13ZjiHmXu31Mz4_lvUQdajTDeGTGYPeg3PHRzDk",
	},
});
