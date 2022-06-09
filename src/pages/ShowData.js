import React, { Component } from "react";
import PokemonTeamDataAccess from "../services/database-caller";
import PokemonDbCountText from "../components/PokemonDbCountText";

class ShowData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoaded: false,
            currentTeamCount: {},
        }
    }

    async componentDidMount() {
        await new Promise(resolve => setTimeout(resolve, 2500));
        PokemonTeamDataAccess.getProcessedData()
        .then( res => {
            this.setState({
                data: res.data
            })
        })
    }

    componentDidUpdate() {
        if (!this.state.isLoaded)
            this.findPokeOccurence();
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <>
                    <img src={require('../media/all_pokemon_2x.jpg')} className="sd-background" alt="field of pokemon on grass"/>
                    <div className="sd-container is-flex is-justify-content-center">
                        <div className="sd-loader-container">
                            <img src={require('../media/pokeball_loader.gif')} alt="pokeball loader"></img>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <>
                    <img src={require('../media/all_pokemon_2x.jpg')} className="sd-background" alt="field of pokemon on grass"/>
                    <div className="sd-container is-flex is-justify-content-center">
                        <div className="sd-data-container is-flex is-flex-direction-column is-align-items-center">
                            <p>Your team consists of <span style={{color: 'aliceblue'}}>{Object.keys(this.state.data.currentUser[0]).length - 1}</span> pokemon.</p>
                            {Object.keys(this.state.currentTeamCount).map( (key, index) => 
                                <PokemonDbCountText pokemonName={this.state.currentTeamCount[key].name} count={this.state.currentTeamCount[key].count} total={this.state.data.allData.length - 1} key={index}/>
                            )}
                        </div>
                    </div>
                </>
            )
        }
    }

    findPokeOccurence()  {
        let pokeCount = {}
        for(const userPoke in this.state.data.currentUser[0]) {
            if (userPoke === "_id")
                continue;
            else {
                let currentPokemonName = this.state.data.currentUser[0][userPoke].name;
                pokeCount[userPoke] = {
                    name: currentPokemonName,
                    count: 0
                }

                for(let i = 0; i < this.state.data.allData.length - 1; i++) {
                    for(const pokemon in this.state.data.allData[i]) {
                        if (this.state.data.allData[i][pokemon].name === currentPokemonName) {
                            pokeCount[userPoke].count = pokeCount[userPoke].count + 1;
                            break;
                        }
                    }
                }
            }
        }


        this.setState({ 
            currentTeamCount: pokeCount,
            isLoaded: true
        });
    }

}

export default ShowData;
