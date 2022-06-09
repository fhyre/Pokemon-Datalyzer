import React, { Component } from "react";
import CurrentTeamBar from "../components/CurrentTeamBar";
import PokemonSelection from "../components/PokemonSelection";
import { MAX_TEAM_SIZE } from "../Constants";

class TeamSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTeam: [],
    }
  }

  render() {
    return (
      <>
        <CurrentTeamBar currTeam={this.state.currentTeam} />
        <div className="ps-main-inner-box-containe m-4">  
          <div className="box is-flex is-justify-content-space-around is-flex-wrap-wrap ps-container">
            <PokemonSelection getUserSelection={ this.handlePokemonSelection } />
          </div>
          <footer></footer>
        </div>
      </>
    );
  }

  handlePokemonSelection = (pokemonData) => {
    if (this.state.currentTeam.length < MAX_TEAM_SIZE) {
      this.setState({
        currentTeam: [...this.state.currentTeam, pokemonData],
      })
    }
  }
    
  
}

export default TeamSelection;
