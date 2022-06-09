import React, { Component } from "react";
import { COLORS } from "../Constants";

class PokemonTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokeData: {},
            isLoaded: false,
            error: null,
        }
    }

    async componentDidMount() {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.fetchPokemonData();
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message} </div>
        } else if (!this.state.isLoaded) {
            return <img className="loader-img" src={require('../media/pokeball_loader.gif')} alt="loading pokeball" />
        } else if (this.props.onClickGetSelection) {
            return (
                <>  
                    <div onClick={ () => this.props.onClickGetSelection(this.getProperReturnData()) } style={{backgroundImage: `${this.findProperTypes(this.state.pokeData.types)}`}} className="tile box is-2 m-3 p-0 poke-tile">
                        <div className="pt-tile-inner-container is-flex is-align-items-center is-flex-direction-column">
                            <div> {this.state.pokeData.id} </div>
                            <img src={this.state.pokeData.sprites.front_default} alt={this.props.name}/>
                            <div> {this.state.pokeData.name[0].toUpperCase() + this.state.pokeData.name.slice(1) } </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>  
                    <div style={{backgroundImage: `${this.findProperTypes(this.state.pokeData.types)}`}} className="tile box is-2 m-1 p-0 poke-tile-in-tb">
                        <div className="pt-tile-inner-container is-flex is-align-items-center is-flex-direction-column">
                            <img src={this.state.pokeData.sprites.front_default} alt={this.props.name}/>
                            <div> {this.state.pokeData.name[0].toUpperCase() + this.state.pokeData.name.slice(1) } </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    fetchPokemonData = () => {        
        fetch(this.props.url)
        .then(res => res.json())
        .then(data => {
            this.setState({
                pokeData: data,
                isLoaded: true,
            })
        })
        .catch( error => {
            this.setState({
                error: error,
                isLoaded: true,
            })
        })
    }

    findProperTypes = types => {
        return `linear-gradient(to top left, ${types.length > 1 ? COLORS[types[1].type.name] : COLORS[types[0].type.name]} 50%, ${COLORS[types[0].type.name]} 50%)`;
    }

    getProperReturnData = () => {
        const types = this.state.pokeData.types.length < 2 ? [this.state.pokeData.types[0].type.name] : [this.state.pokeData.types[0].type.name, this.state.pokeData.types[1].type.name];

        const dataToSend = {
            pokeId: this.state.pokeData.id,
            name: this.props.name, 
            types: types,
            url: this.props.url
        }

        return dataToSend;
    }

    
}

export default PokemonTile;
