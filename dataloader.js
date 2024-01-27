const API_URL = "https://mca-fest-v1.onrender.com";

const teamList = document.getElementById('clg-list');

const teamIdInput = document.getElementById("team-id");
const teamNameInput = document.getElementById("team-name");
const collegeNameInput = document.getElementById("clg-name");
const categoryInput = document.getElementById("category-input");

const paymentImg = document.getElementById("screenshot");
const transId = document.getElementById("tran-id");
const transChk = document.getElementById("pay-check-id");

const accommocheck = document.getElementById("accommo-check");
const accommonb = document.getElementById("accommo-no-b");
const accommong = document.getElementById("accommo-no-g");



const codingMem1 = document.getElementById('coding-mem1');
const codingMem1Con = document.getElementById('coding-mem1-con');
const codingMem2 = document.getElementById('coding-mem2');
const codingMem2Con = document.getElementById('coding-mem2-con');
const webMem1 = document.getElementById('web-mem1');
const webMem1Con = document.getElementById('web-mem1-con');
const webMem2 = document.getElementById('web-mem2');
const webMem2Con = document.getElementById('web-mem2-con');
const quizMem1 = document.getElementById('quiz-mem1');
const quizMem1Con = document.getElementById('quiz-mem1-con');
const quizMem2 = document.getElementById('quiz-mem2');
const quizMem2Con = document.getElementById('quiz-mem2-con');
const debateMem1 = document.getElementById('debate-mem1');
const debateMem1Con = document.getElementById('debate-mem1-con');
const danceMem1 = document.getElementById('dance-mem1');
const danceMem1Con = document.getElementById('dance-mem1-con');
const danceMem2 = document.getElementById('dance-mem2');
const danceMem2Con = document.getElementById('dance-mem2-con');
const danceMem3 = document.getElementById('dance-mem3');
const danceMem3Con = document.getElementById('dance-mem3-con');
const danceMem4 = document.getElementById('dance-mem4');
const danceMem4Con = document.getElementById('dance-mem4-con');
const danceMem5 = document.getElementById('dance-mem5');
const danceMem5Con = document.getElementById('dance-mem5-con');
const danceMem6 = document.getElementById('dance-mem6');
const danceMem6Con = document.getElementById('dance-mem6-con');
const danceMem7 = document.getElementById('dance-mem7');
const danceMem7Con = document.getElementById('dance-mem7-con');
const photoMem1 = document.getElementById('photo-mem1');
const photoMem1Con = document.getElementById('photo-mem1-con');
const gameMem1 = document.getElementById('game-mem1');
const gameMem1Con = document.getElementById('game-mem1-con');
const gameMem2 = document.getElementById('game-mem2');
const gameMem2Con = document.getElementById('game-mem2-con');
const thuntMem1 = document.getElementById('thunt-mem1');
const thuntMem1Con = document.getElementById('thunt-mem1-con');
const thuntMem2 = document.getElementById('thunt-mem2');
const thuntMem2Con = document.getElementById('thunt-mem2-con');
const productMem1 = document.getElementById('product-mem1');
const productMem1Con = document.getElementById('product-mem1-con');
const itmanMem1 = document.getElementById('itman-mem1');
const itmanMem1Con = document.getElementById('itman-mem1-con');
const desigMem1 = document.getElementById('desig-mem1');
const desigMem1Con = document.getElementById('desig-mem1-con');
const dumbMem1 = document.getElementById('dumb-mem1');
const dumbMem1Con = document.getElementById('dumb-mem1-con');
const dumbMem2 = document.getElementById('dumb-mem2');
const dumbMem2Con = document.getElementById('dumb-mem2-con');


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
    teamPayment(clickedTeamId);
    accommoNo(clickedTeamId);
});


const teamDetails = async (teamId) => {

    teamIdInput.value = teamId;

    const res = await fetch(`${API_URL}/admin/get-ids/${teamId}`);
    const data = await res.json();

    teamNameInput.value = data.teamName;
    collegeNameInput.value = data.collegeName;
    
    categoryInput.value = data.isUG ? 'UG' : 'PG';


};


fetchTeams();


// payment


const teamPayment = async (teamId) => {

    const res = await fetch(`${API_URL}/team/${teamId}`);
    const data = await res.json();
    
    paymentImg.src = data.paymentStatus.screenshot;
    transId.value = data.paymentStatus.transactionId;
    transChk.checked = data.paymentStatus.verificationStatus ? true : false ;
};


// accommodation

const accommoNo = async (teamId) => {

    const res = await fetch(`${API_URL}/team/${teamId}`);
    const data = await res.json();
    
    if(data.accommodation !== undefined){
        accommocheck.value = 'Yes';
        accommonb.value= data.accommodation.countOfBoys;
        accommong.value= data.accommodation.countOfGirls;
    }
    else{
        accommocheck.value = 'No';
        accommonb.value= "0";
        accommong.value= "0";
    }
};


// events
const events = async (teamId) => {

    const res = await fetch(`${API_URL}/team/${teamId}/events`);
    const data = await res.json();

    
    


    
};