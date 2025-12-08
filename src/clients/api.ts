import axios from "axios";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		Authorization:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzBiNjBjYTNiNmQzZThhNGUwYzY4ZiIsInVzZXJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzY1MjI5MDM0LCJleHAiOjE3NjUzMTU0MzR9.CbrNipgAn6F5yJePSQ675IyXbvinpcCOkztm9a3w3d4",
	},
});
