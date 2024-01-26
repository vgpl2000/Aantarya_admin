const API_URL = "https://mca-fest-v1.onrender.com";

const teamList = document.getElementById('clg-list');

const teamIdInput = document.getElementById("team-id");
const teamNameInput = document.getElementById("team-name");
const collegeNameInput = document.getElementById("clg-name");
const categoryInput = document.getElementById("category-input");

const fetchTeams = async () => {
    try {
        const response = await fetch(`${API_URL}/admin/get-ids`);
        const teams = await response.json();
        displayTeams(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

const displayTeams = (teams) => {
    teamList.innerHTML = '';

    teams
        .sort((a, b) => a.teamName.localeCompare(b.teamName))
        .forEach(team => {
            const listItem = document.createElement('li');
            listItem.textContent = team.teamName;
            listItem.dataset.teamId = team._id;
            listItem.classList.add('team-item-list');
            teamList.appendChild(listItem);
        });
};

teamList.addEventListener('click', (event) => {
    const clickedTeamId = event.target.dataset.teamId;
    teamDetails(clickedTeamId);
    console.log('Clicked Team ID:', clickedTeamId);
});


const teamDetails = async (teamId) => {

    teamIdInput.value = teamId;

    const res = await fetch(`${API_URL}/admin/get-ids/${teamId}`);
    const data = await res.json();

    console.log(data);
    teamNameInput.value = data.teamName;
    collegeNameInput.value = data.collegeName;
    console.log(data.isUG);
    console.log(typeof data.isUG);
    categoryInput.value = data.isUG ? 'UG' : 'PG';


};




fetchTeams();
