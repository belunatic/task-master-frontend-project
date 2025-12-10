import axios from "axios";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	// headers: {
	// 	Authorization:
	// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzBiNjBjYTNiNmQzZThhNGUwYzY4ZiIsInVzZXJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzY1MzE5MjQzLCJleHAiOjE3NjU0MDU2NDN9.h6VnttSRMXWiq54ke02TwOKSx6wQyHxQi_trLJ-wgaY",
	// },
});
