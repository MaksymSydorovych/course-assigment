import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/api";
import Heading from "./Heading";
export default function Detail() {
	const [page, setPage] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();
	if (!id) {
		navigate("/");
	}

	const url = BASE_URL + "wp-json/wp/v2/pages/" + id;

	useEffect(
		function () {
			async function getData() {
				try {
					const response = await axios.get(url);
					console.log("response", response.data);
					setPage(response.data);
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}

			getData();
		},

		[url]
	);

	if (loading) return <div>Loading...</div>;

	if (error) return <div>An error :</div>;
	const DateDisplay = ({ date }) => <>{date.toString()}</>;
	const options = { year: "numeric", month: "long", day: "2-digit" };
	return (
		<Container className='mt-4'>
			<Card className='px-5'>
				<Heading title='Detail' />
				<Card.Title className='card-title text-center my-3'>
					{page.title.rendered}
				</Card.Title>
				<Card.Text
					dangerouslySetInnerHTML={{
						__html: `${page.content.rendered}`,
					}}
				></Card.Text>
				<Card.Text className='text-center'>
					Date:{" "}
					<DateDisplay
						date={new Date(page.date).toLocaleDateString("en-US", options)}
					/>
				</Card.Text>
			</Card>
		</Container>
	);
}
