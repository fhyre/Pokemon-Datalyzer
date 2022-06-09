import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    let navigate = useNavigate();

    return (
        <>
        <div className='bg-image-settings'>
            <div className='shadow-filter p-1'></div>
        </div>

        <div className='app-main-container slide-down'>
            <div className='app-main-heading-container '>
                <h1>Pokémon Datalyzer</h1>
            </div>
            
            <div className='app-sub-container is-flex is-flex-direction-column is-align-items-center'>
                <h2 className='big-padding app-sub-heading'>Create your own team and see if others chose similarly!</h2>
                <button className='big-padding button is-primary is-medium' onClick={ () => navigate('/team-selection')}>
                    Choose Your Team!
                </button>
            </div>
        </div>
        </>
        
        
    );
};

export default HomePage;
