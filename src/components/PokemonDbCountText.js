import React from "react";

export default function PokemonDbCountText({pokemonName, count, total}) {
    return(
        <>
            <div className="pdct-container">You and <span style={{color: 'gold'}}>{count}</span> other player(s) selected <span style={{color: 'pink'}}>{pokemonName[0].toUpperCase() + pokemonName.slice(1)}</span> to be a part of their team.</div>
        </>
    )
}
