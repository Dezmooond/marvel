import { useState, useEffect } from 'react'; 
import setContent from '../utils/SetContent';
import useMarvelServices from '../services/MarvelServices'; 
import PropTypes from 'prop-types'; 
import './charInfo.scss'; 
 
const CharInfo = (props) => { 
    const [char, setChar] = useState(null); 
 
    const {process, setProcess, getCharacter, clearError} = useMarvelServices(); 
 
    useEffect(() => { 
        updateChar(); 
    }, [props.charId]); 
 
    
 
    const updateChar = () => { 
        const { charId } = props; 
        if (!charId) { 
            return; 
        } 
            clearError()
            getCharacter(charId) 
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"))
    }; 
 
    const onCharLoaded = (char) => { 
        setChar(char); 
    }; 
     
    return ( 
        <div className="char__info"> 
            {setContent(process, View, char)}
        </div> 
    ); 
}; 
 
const View = ({data}) => { 
    const notImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"; 
    const {name, description, thumbnail, homepage, wiki, comics } = data; 
     
    const comicsList = comics.slice(0, 11).map((item, i) => { 
        return ( 
            <li className="char__comics-item" key={i}> 
                {item.name}  
            </li> 
        ); 
    }); 
 
    return ( 
        <> 
            <div className="char__basics"> 
                <img src={thumbnail} style={thumbnail === notImage ? {objectFit: "contain"} : null } alt={name}/> 
                <div> 
                    <div className="char__info-name">{name}</div> 
                    <div className="char__btns"> 
                        <a href={homepage} className="button button__main"> 
                            <div className="inner">homepage</div> 
                        </a> 
                        <a href={wiki} className="button button__secondary"> 
                            <div className="inner">Wiki</div> 
                        </a> 
                    </div> 
                </div> 
            </div> 
            <div className="char__descr"> 
                {description} 
            </div> 
            <div className="char__comics">Comics:</div> 
            <ul className="char__comics-list"> 
                {comics.length === 0 ? <li>The comics of this character have not yet been released</li> : comicsList} 
            </ul> 
        </> 
    ); 
}; 
 
CharInfo.propTypes = { 
    charId: PropTypes.number 
}; 
 
export default CharInfo;