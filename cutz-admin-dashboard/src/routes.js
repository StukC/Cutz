import Index from "views/Index.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
import ManageClients from "views/clients/ManageClients";
import ClientsRecord from "views/clients/ClientsRecord.js";
import ClientsSchedule from "views/clients/ClientsSchedule.js";
import Notification from "views/Notification.js";
import Description from "views/Description.js";
import Volunteers from "./views/volunteers/Volunteers";
import VolunteersSchedule from "./views/volunteers/VolunteersSchedule";
import VolunteersRecord from "./views/volunteers/VolunteersRecord";
import ManageEvent from "./views/events/ManageEvent";
import EventRecord from "./views/events/EventRecord";
import CreateEvent from "./views/events/CreateEvent";


var routes = [
	{
		path: "/index",
		name: "Organizations",
		component: <Index />,
		layout: "/admin",
		icon: "fa-solid fa-users-between-lines"
	},
	{
		path: "/clients",
		name: "Clients",
		icon: "fas fa-users-cog",
		// layout: "/admin",
		children: [
			{
				path: "/admin/clients/manageclients",
				name: "Manage Clients",
				component: <ManageClients />,
				layout: "/admin",
			},
			{
				path: "/admin/clients/clientschedule",
				name: "Client Schedules",
				component: <ClientsSchedule />,
				layout: "/admin",
			},
			{
				path: "/admin/clients/clientrecord",
				name: "Client Records",
				component: <ClientsRecord />,
				layout: "/admin",
			},
		],
	},
	{
		path: "/vlounteers",
		name: "Volunteers",
		icon: "fa-sharp fa-solid fa-user-gear",
		layout: "/admin",
		children: [
			{
				path: "/admin/vlounteers/managevolunteers",
				name: "Manage Volunteers",
				component: <Volunteers />,
				layout: "/admin",
			},
			{
				path: "/admin/vlounteers/volunteerschedule",
				name: "Volunteer Schedules",
				component: <VolunteersSchedule />,
				layout: "/admin",
			},
			{
				path: "/admin/vlounteers/volunteersrecord",
				name: "Volunteer Records",
				component: <VolunteersRecord />,
				layout: "/admin"
			}
		],
	},
	{
		path: "/events",
		name: "Events",
		icon: "fa-solid fa-calendar-days",
		layout: "/admin",
		children: [
			{
				path: "/admin/Events/manageevent",
				name: "Manage Events",
				component: <ManageEvent />,
				layout: "/admin",
			},
			{
				path: "/admin/Events/eventrecord",
				name: "Event Records",
				component: <EventRecord />,
				layout: "/admin",

			},
		],
	},
	// {
	// 	path: "/maps",
	// 	name: "Maps",
	// 	icon: "ni ni-pin-3 text-orange",
	// 	component: <Notification />,
	// 	layout: "/admin",
	// },
	// {
	// 	path: "/user-profile",
	// 	name: "User Profile",
	// 	icon: "ni ni-single-02 text-yellow",
	// 	component: <Description />,
	// 	layout: "/admin",
	// },
	// {
	// 	path: "/tables",
	// 	name: "Tables",
	// 	icon: "ni ni-bullet-list-67 text-red",
	// 	component: <Tables />,
	// 	layout: "/admin",
	// },
	// {
	// 	path: "/login",
	// 	name: "Login",
	// 	icon: "ni ni-key-25 text-info",
	// 	component: <Login />,
	// 	layout: "/auth",
	// },
	// {
	// 	path: "/register",
	// 	name: "Register",
	// 	icon: "ni ni-circle-08 text-pink",
	// 	component: <Register />,
	// 	layout: "/auth",
	// },
];
export default routes;
