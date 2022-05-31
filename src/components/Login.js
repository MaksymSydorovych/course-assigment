import Heading from "./Heading";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import axios from "axios";
import { TOKEN_PATH } from "../constants/api";
import AuthContext from "./Auth";
import { useNavigate } from "react-router-dom";
import Validation from "./Validtion";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Login() {
	const url = TOKEN_PATH;
	const schema = yup.object().shape({
		username: yup.string().required("Please enter your username"),
		password: yup.string().required("Please enter your password"),
	});
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [auth, setAuth] = useContext(AuthContext);
	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);
			setAuth(response.data);
			navigate.push("./admin");
			console.log(url);
		} catch (error) {
			console.log("error", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Container>
			<Heading title='Login' />
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group>
					<Form.Text className='text-muted '>
						Please enter your username
					</Form.Text>
					<Form.Control placeholder='Username' {...register("username")} />

					{errors.username && <Validation>{loginError}</Validation>}
				</Form.Group>
				<Form.Group>
					<Form.Text className='text-muted '>
						Please enter your password
					</Form.Text>
					<Form.Control placeholder='Password' {...register("password")} />

					{errors.password && <Validation>{loginError}</Validation>}
				</Form.Group>

				<Button variant='primary' type='submit' className='mt-4'>
					{submitting ? "Loggin in..." : "Login"}
				</Button>
			</Form>
		</Container>
	);
}
