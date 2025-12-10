import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function NavBar() {
	const { user, logOut } = useContext(AuthContext);
	return (
		<nav className="flex justify-evenly items-center w-full h-10 text-white px-4 py-2 font-semibold border-b border-white">
			<NavLink to="/"> Home </NavLink>
			{!user && <NavLink to="/auth">Signin/Signup</NavLink>}
			{user && <NavLink to="/projects"> Projects </NavLink>}
			{user && (
				<NavLink to="/" onClick={logOut}>
					Logout
				</NavLink>
			)}
		</nav>
	);
}
