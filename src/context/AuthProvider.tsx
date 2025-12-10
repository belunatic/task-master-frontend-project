import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { User } from "../types";
import { apiClient } from "../clients/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
	user: User | null;
	setUser: (user: User) => void;
	logIn: (email: string, password: string) => void;
	register: (username: string, email: string, password: string) => void;
	logOut: () => void;
	token: string | null;
	setToken: (token: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
	//navigation
	const navigate = useNavigate();

	// Check if there is a token in localStorage and set them in state
	const [user, setUser] = useState<User | null>(() => {
		try {
			const value = localStorage.getItem("user");

			if (value) {
				return JSON.parse(value);
			} else return null;
		} catch (error) {
			console.error(error);
		}
	});

	const [token, setToken] = useState<string | null>(() => {
		try {
			const value = localStorage.getItem("token");

			if (value) {
				return JSON.parse(value);
			} else return null;
		} catch (error) {
			console.error(error);
		}
	});

	//check for login user

	useEffect(() => {
		const IsTokenExpire = async () => {
			try {
				if (token) {
					//check if the token is valid
					const decodedToken = jwtDecode(token);
					//get the current time in second
					const dateNow = Math.floor(new Date().getTime() / 1000);
					//compare the time
					if (decodedToken?.exp > dateNow) {
						//then set the Authorization header
						apiClient.defaults.headers.common[
							"Authorization"
						] = `Bearer ${token}`;
						console.log("hello");
						navigate("/projects");
					} else {
						setToken(null);
						setUser(null);
						localStorage.removeItem("user");
						localStorage.removeItem("token");
						console.log("hello remove");
					}
				}
			} catch (error) {
				console.error(error);
			}
		};

		IsTokenExpire();
	}, [token]);

	const logIn = async (email: string, password: string) => {
		try {
			const res = await apiClient.post("/api/users/login", { email, password });
			//set token and user
			setToken(res.data.token);
			setUser(res.data.dbUser);
			//save the locally
			localStorage.setItem("token", JSON.stringify(res.data.token));
			localStorage.setItem("user", JSON.stringify(res.data.dbUser));
			apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		} catch (error) {
			console.log(error);
		}
	};

	const register = async (
		username: string,
		email: string,
		password: string
	) => {
		try {
			console.log({ username, email, password });
			await apiClient.post("/api/users/register", {
				email,
				password,
				username,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<AuthContext.Provider
			value={{ user, setUser, logIn, register, logOut, token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
}
