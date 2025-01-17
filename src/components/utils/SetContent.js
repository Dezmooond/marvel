import Spinner from "../spiner/spiner"
import Skeleton from "../skeleton/Skeleton"
import ErrorMessage from "../errorMessage/ErrorMessage"

const setContent = (process, Component, data) => {
	switch (process) {
		 case "waiting":
			  return <Skeleton/>
			  break
		 case "loading":
			  return <Spinner/>
			  break
		 case "confirmed":
			  return <Component data={data}/>
			  break
		 case "error": 
			  return <ErrorMessage/>
			  break
		 default:
			  throw new Error("Error")    
	}
}

export default setContent