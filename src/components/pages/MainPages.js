import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {

	const [selectedChar, setSelected] = useState(null)

	const onCharSelected = (id) => {
		 setSelected(id)
	}
	return (
			<>
				<Helmet>
				<meta
      			name="description"
      			content="Web site created using create-react-app"
   			 />
				 <title>Marvel App</title>
				</Helmet>
				 <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={onCharSelected}/>
                        </ErrorBoundary>
								<div>
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
								<ErrorBoundary>
									<CharSearchForm/>
								</ErrorBoundary>
								</div>
								<img className="bg-decoration" src={decoration} alt="vision"/>
                    </div>
			</>
	)
}

export default MainPage
