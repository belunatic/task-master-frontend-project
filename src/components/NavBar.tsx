import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<nav className="flex justify-evenly items-center w-full h-10 text-white px-4 bg-red-500">
			<NavLink to="/"> Home </NavLink>
			<NavLink to="/projects"> Projects </NavLink>
		</nav>
	);
}
