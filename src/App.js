import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { AuthProvider } from "./components/Auth";
import Admin from "./components/Admin";
import "./sass/style.scss";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar bg='dark' variant='dark' expand='lg'>
					<Navbar.Brand as={Link} to='/'>
						Maksym
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto '>
							<Nav.Link as={Link} to='/'>
								Home
							</Nav.Link>
							<Nav.Link as={Link} to='/contact'>
								Contact
							</Nav.Link>
							<Nav.Link as={Link} to='/login'>
								Login
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/login' element={<Login />} />
					<Route path='/admin' element={<Admin />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
