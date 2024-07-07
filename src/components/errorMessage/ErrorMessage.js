import errorImg from "./error-error404.gif"

const ErrorMessage = () => {
	return (<img style={{width: "250px", display: "block", height: "250px", objectFit: "contain", margin: "0 auto"}} src={errorImg} alt="Error"/>)
}

export default ErrorMessage