import React, { useState } from "react";
import { apiClient } from "../clients/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function AuthPage() {
	const [showRegister, setShowRegister] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [registerValidation, setRegisterValidation] = useState({
		username: false,
		email: false,
		password: false,
	});

	//context
	const { logIn, setToken, setUser } = useAuth();

	//navigation
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			setError("");

			setLoading(true);

			const res = await apiClient.post("/api/users/login", { email, password });
			//set token and user
			setToken(res.data.token);
			setUser(res.data.dbUser);
			await logIn(res.data.dbUser, res.data.token);
			navigate("/projects");

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error(error.response.data.message);
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			//remove validation text
			setRegisterValidation({ username: false, email: false, password: false });
			if (username === "") {
				return setRegisterValidation((prev) => ({ ...prev, username: true }));
			}
			if (!/.+@.+\..+/.test(email)) {
				return setRegisterValidation((prev) => ({ ...prev, email: true }));
			}
			if (password.length <= 7) {
				return setRegisterValidation((prev) => ({ ...prev, password: true }));
			}
			setError("");
			setLoading(true);
			// api call here
			await apiClient.post("/api/users/register", {
				username,
				email,
				password,
			});
			//show login page
			setShowRegister(false);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error(error.response.data.message);
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="text-white flex flex-col items-center justify-center gap-y-4">
			<h1 className="text-3xl font-bold mt-10 text-center">
				Start managing your projects.
			</h1>

			{/* ERROR  */}

			{error && <div className="text-red-500 pt-2">{error}</div>}

			{/* FORM  */}

			{showRegister ? (
				<form
					onSubmit={handleRegister}
					className="border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded">
					<div className="text-xl font-bold">Register</div>

					<label htmlFor="username">
						Username:
						<input
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="ml-2 border rounded"
						/>
						{registerValidation.username && (
							<p className="text-sm text-red-500 py-1">
								Please enter a username
							</p>
						)}
					</label>

					<label htmlFor="email">
						Email:
						<input
							type="text"
							name="email"
							id="email"
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
							className="ml-10 border rounded"
						/>
						{registerValidation.email && (
							<p className="text-sm text-red-500 py-1">Invalid Email</p>
						)}
					</label>

					<label htmlFor="password">
						Password:
						<input
							type="password"
							name="password"
							required
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="ml-3 border rounded"
						/>
						{registerValidation.password && (
							<p className="text-sm text-red-500 py-1">
								password must be 8 character long
							</p>
						)}
					</label>

					<input
						type="submit"
						value="Register"
						className="border py-2 px-4 rounded cursor-pointer"
					/>

					{/* LOADING  */}

					{loading && <div className="animate-pulse">...</div>}
				</form>
			) : (
				<form
					onSubmit={handleLogin}
					className="border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded">
					<div className="text-xl font-bold">Login</div>

					<label htmlFor="email">
						Email:
						<input
							type="text"
							name="email"
							id=""
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="ml-10 border rounded"
						/>
					</label>

					<label htmlFor="password">
						Password:
						<input
							type="password"
							name="password"
							id=""
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="ml-3 border rounded"
						/>
					</label>

					<input
						type="submit"
						value="Login"
						className="border py-2 px-4 rounded cursor-pointer"
					/>

					{/* LOADING  */}

					{loading && <div className="animate-pulse">...</div>}
				</form>
			)}

			{/* TOGGLE FORM  */}

			{showRegister ? (
				<div>
					Already have an account?{" "}
					<span
						className="text-blue-500 hover:cursor-pointer"
						onClick={() => setShowRegister(false)}>
						Sign in
					</span>{" "}
				</div>
			) : (
				<div>
					Don't have an account?{" "}
					<span
						className="text-blue-500 hover:cursor-pointer"
						onClick={() => setShowRegister(true)}>
						Sign up
					</span>{" "}
				</div>
			)}
		</div>
	);
}

export default AuthPage;
