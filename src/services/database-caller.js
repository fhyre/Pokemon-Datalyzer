import http from '../http-handler';

class PokemonTeamDataAccess {
    createTeam(data) {
        return http.post("/new_team", data);
    }
    
    getProcessedData() {
        return http.get("/userteams")
    }
}

export default new PokemonTeamDataAccess();
