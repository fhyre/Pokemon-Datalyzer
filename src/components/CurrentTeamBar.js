import React, { Component } from "react";
import { Link } from "react-router-dom";
import PokemonTile from "./PokemonTile";
import PokemonTeamDataAccess from "../services/database-caller";


class CurrentTeamBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTeam: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentTeam.length === 0) {
            this.handleTeamUpdate(this.props.currTeam);
        } else if ( prevProps.currTeam !== this.props.currTeam ) {
            this.handleTeamUpdate(this.props.currTeam);
        }

    }   
    

    render() {
        return(
            <>
                <div className="ctb-container is-flex is-justify-content-space-around">
                    <h1>Team Builder</h1>
                    <div className="is-flex is-justify-content-center is-flex-wrap-wrap">
                        { this.state.currentTeam.map( (pokemon, index) => <PokemonTile name={pokemon.name} url={pokemon.url} key={index} /> ) }
                    </div>
                    <Link to='/analyzer' className='ctb-button big-padding button is-success is-medium' onClick={ () => this.handleDataSend()}>
                        Continue
                    </Link>
                </div>
            </>
        )
    }

    handleTeamUpdate(pokemon) {
        this.setState({
            currentTeam: pokemon
        })
    }

    handleDataSend() {
        const pokeObjData = {};

        for(let i = 0; i < this.state.currentTeam.length; i++) {
            pokeObjData[`pokemon${i}`] = {
                name: this.state.currentTeam.at(i).name,
                types: this.state.currentTeam.at(i).types
            }
        }

        PokemonTeamDataAccess.createTeam(pokeObjData);
    }
}

export default CurrentTeamBar;

