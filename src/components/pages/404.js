import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"


const Page404 = () => {
	return (
		<>
		<ErrorMessage/>
		<h2><Link to="/">Back to main page</Link></h2>
		</>
	)
}

export default Page404