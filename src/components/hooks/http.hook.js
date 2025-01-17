import { useState, useCallback } from "react";


export const useHttp = () => {
	const [process, setProcess] = useState("waiting")

	const request = useCallback(async (url, method = 'GET', body = null , headers = {'Content-Type': 'application/json'}) => {

		setProcess("loading")
		try {
			const response = await fetch(url, {method, body, headers})

			if (!response.ok) {
				throw new Error("Error Api")
			}

			const data = await response.json()

			return data

		} catch (error) {
			setProcess("error")
			throw(error)
		}
	}, [])

	const clearError = useCallback(() => {
		setProcess("loading")
	}, [])

	return {request, process, setProcess, clearError}
}