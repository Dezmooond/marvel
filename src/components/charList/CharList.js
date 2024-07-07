import React, { useState, useEffect, useRef } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/spiner';
import useMarvelServices from '../services/MarvelServices';
import PropTypes from 'prop-types';
import './charList.scss';

const CharList = (props) => {

    const [offset, setOffset] = useState(210)
    const [charList, setCharList] = useState([])
    const [newItemLOading, setNewItemLoading] = useState(false)
    const [charEnded, setCharEnded] = useState(false)
    
    const {loading, error, getCharacters} = useMarvelServices()

    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getCharacters(offset)
            .then(onCharsloader)
   }


   const onCharsloader = (newCharList) => {
        let ended = false
            if (newCharList.length < 9) {
                ended = true
            }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLOading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
        
}

    const onClickHandler = (id, index) => { 
        focusOnItem(index); 
        props.onCharSelected(id); 
      }

    const itemRefs = useRef([]);


    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading && !newItemLOading ? <Spinner/> : null
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                   { charList.map((char, i) => (<li
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        key={char.id}
                        onClick={() => onClickHandler(char.id, i)}>
                        <img src={char.thumbnail} alt="abyss"/>
                        <div className="char__name">{char.name}</div>
                    </li>))
                    }   
                   
                </ul>
                <button className="button button__main button__long"
                        disabled={newItemLOading}
                        style={{'display': charEnded ? 'none' : 'block'}}
						 onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;