import { useHttp } from "../hooks/http.hook";


const useMarvelServices = () => {
	const {request, clearError, process, setProcess} = useHttp()

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=7ce0b0498efd70847df3898d7a999563";
	const _baseOffset = 210
	
	const getCharacters = async (offset = 0) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
  }

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`) 
		return _transformCharacter(res.data.results[0])
	}

	const getComics = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
		return res.data.results.map(_transformComics)
	}

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	
	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

	const _transformCharacter = (char) => {
		const textDescription = "The character description has not been added yet."
	 return	{
			id: char.id,
			name: char.name,
        description: char.description ? (char.description.length > 250 ? `${char.description.substring(0, 200)}...`: char.description): textDescription.toUpperCase(),
        thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
		  comics: char.comics.items
	}}

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	}

	return {
				process,
				setProcess,
				getCharacter,
				getCharacters,
				getCharacterByName,
				clearError,
				getComics,
				getComic}
}

export default useMarvelServices