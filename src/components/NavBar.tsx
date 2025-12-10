import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<nav className="flex justify-evenly items-center w-full h-10 text-white px-4 py-2 font-semibold border-b border-white">
			<NavLink to="/"> Home </NavLink>
			<NavLink to="/projects"> Projects </NavLink>
			<NavLink to="/auth">Signin/Signup</NavLink>
		</nav>
	);
}
