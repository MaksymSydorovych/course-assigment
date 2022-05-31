import { BASE_URL } from "../constants/api";
import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Heading from "./Heading";

export default function Home() {
	const [pages, setPages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function getData() {
			try {
				const response = await axios.get(BASE_URL + "wp-json/wp/v2/pages");

				setPages(response.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getData();
	}, []);

	if (loading) return <div>Loading...</div>;

	if (error) return <div>An error :</div>;

	return (
		<Container className='mt-4'>
			<Heading title='Welcome to assigment' />
			{pages.map(data => {
				return (
					<Card key={data.id} className='mt-4 card'>
						<Link to={`/detail/${data.id}`}>
							<Card.Body>
								<Card.Title className='card-title text-center my-1'>
									{data.title.rendered}
								</Card.Title>
								<Card.Text
									dangerouslySetInnerHTML={{
										__html: `${data.excerpt.rendered}`,
									}}
								></Card.Text>
							</Card.Body>
						</Link>
					</Card>
				);
			})}
		</Container>
	);
}
