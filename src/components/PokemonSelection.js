import React, { Component } from "react";
import { MAX_NUM_POKEMON, OFFSET, LIMIT } from "../Constants"
import PokemonTile from "./PokemonTile";

const getProperOffset = (currOffset) => {
    if (currOffset + OFFSET >= MAX_NUM_POKEMON)
        return currOffset;
    else
        return currOffset + OFFSET;
}

const getProperLimit = (currOffset) => {
    if (currOffset + OFFSET > MAX_NUM_POKEMON) 
        return MAX_NUM_POKEMON - currOffset;
    else
        return LIMIT;
}

class PokemonSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            currOffset: 0,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currOffset + 98 === MAX_NUM_POKEMON)
            window.removeEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return(
            <>
                { this.state.pokemons.map( (pokemon, index) => <PokemonTile name={pokemon.name} url={pokemon.url} key={index} 
                    onClickGetSelection={ this.handleSelectionClick } /> ) }
            </>
        )   
    }

    fetchData = (offset) => {
        let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${getProperLimit(offset)}&offset=${offset}`;

        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            this.setState({
                pokemons: [...this.state.pokemons, ...data.results]
            })
        })
    }

    handleScroll = () => {
        if (document.querySelector('.ps-container').getBoundingClientRect().bottom <= window.innerHeight) {
            let newOffset = getProperOffset(this.state.currOffset);
            this.setState({ currOffset: newOffset });
            this.fetchData(newOffset);
        }
    }

    handleSelectionClick = (data) => {
        this.props.getUserSelection(data);
    }


}

export default PokemonSelection;
