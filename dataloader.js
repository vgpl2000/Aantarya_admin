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

fetchTeams();


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

teamList.addEventListener('click', async(event) => {
    const clickedTeamId = await event.target.dataset.teamId;
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



//save team details btn
const saveBtn = document.querySelector("#team-btn");
saveBtn.onclick = async (event) => {
    const teamData = getTeamData();
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
    };

    try {
        const res = await fetch(`${API_URL}/admin/get-ids/${teamIdInput.value}`, options);

        if (res.status === 200) {
            alert("Data saved successfully");
        } else {
            console.error("Error saving data. Server responded with:", res.status);
            // Log the response text for more details
            const responseText = await res.text();
            //alert(responseText);
            console.error("Response Text:", responseText);
            alert("Error saving data");
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
};



const getTeamData = () => {
    const teamData = {
        collegeName: collegeNameInput.value,
        teamName: teamNameInput.value,
        isUG: categoryInput.value
    };
    return teamData;
};



// payment


const teamPayment = async (teamId) => {
  console.log(teamId);

  if (teamId) {
      try {
          const res = await fetch(`${API_URL}/team/${teamId}`);
          const data = await res.json();
          const paymentData = data.paymentStatus;
          transChk.checked = paymentData.verificationStatus;

          if (paymentData.verificationStatus) {
              paymentImg.src = paymentData.screenshot;
              transId.value = paymentData.transactionId;
          } else {
              transId.value = 'Payment still pending';
              paymentImg.src = 'https://aantarya-admin-4plus1.netlify.app/assets/screenshot_sample.jpg';
          }
      } catch (error) {
          console.error('Error fetching team data:', error);
      }
  } else {
      console.error('Team ID is undefined.');
  }
};



// accommodation

const accommoNo = async (teamId) => {

    const res = await fetch(`${API_URL}/team/${teamId}`);
    const data = await res.json();

    if (data.accommodation) {
        accommocheck.value = 'Yes';
        accommonb.value = data.accommodation.countOfBoys;
        accommong.value = data.accommodation.countOfGirls;
    }
    else {
        accommocheck.value = 'No';
        accommonb.value = "0";
        accommong.value = "0";
    }
};


// events
const events = async (teamId) => {
    const eventData = new EventData(data);
    const res = await fetch(`${API_URL}/team/${teamId}`);
    const data = await res.json();
    updateUITextFields(eventData);

    //coding
    // const codingData = {
    //     name: codingMem1.value,
    //     phone: codingMem1Con.value
    // };

    // const codingData2 = {
    //     name: codingMem2.value,
    //     phone: codingMem2Con.value
    // };

    // const coding = [codingData, codingData2]; 

    // //web
    // const webData = {
    //     name: webMem1.value,
    //     phone: webMem1Con.value
    // };

    // const webData2 = {
    //     name: webMem2.value,
    //     phone: webMem2Con.value
    // };

    // const web = [webData, webData2];



};

const updateUITextFields = (eventData) => {
    // codingMemCon1.value = 'N/A'
    // codingMem1.placeholder = 'input placeholder'
  
    let codingData = eventData.getCoding();
  
    if (codingData && codingData.length == 2) {
      codingMem1.value = codingData[0].name;
      codingMem1Con.value = codingData[0].phone;
  
      codingMem2.value = codingData[1].name;
      codingMem2Con.value = codingData[1].phone;
    }
  
    let webData = eventData.getWeb();
    if (webData && webData.length == 2) {
      webMem1.value = eventData.getWeb()[0].name;
      webMem1Con.value = eventData.getWeb()[0].phone;
  
      webMem2.value = eventData.getWeb()[1].name;
      webMem2Con.value = eventData.getWeb()[1].phone;
    }
  
    let quizData = eventData.getQuiz();
    if (quizData && quizData.length == 2) {
      quizMem1.value = eventData.getQuiz()[0].name;
      quizMem1Con.value = eventData.getQuiz()[0].phone;
  
      quizMem2.value = eventData.getQuiz()[1].name;
      quizMem2Con.value = eventData.getQuiz()[1].phone;
    }
  
    let debateData = eventData.getDebate();
    if (debateData) {
      debateMem1.value = eventData.getDebate().name;
      debateMem1Con.value = eventData.getDebate().phone;
    }
  
    let danceData = eventData.getDance();
  
    if (danceData && danceData.length > 1) {
      danceMem1.value = "N/A";
      danceMem1Con.value = "N/A";
  
      danceMem2.value = "N/A";
      danceMem2Con.value = "N/A";
  
      danceMem3.value = "N/A";
      danceMem3Con.value = "N/A";
  
      danceMem4.value = "N/A";
      danceMem4Con.value = "N/A";
  
      danceMem5.value = "N/A";
      danceMem5Con.value = "N/A";
  
      danceMem6.value = "N/A";
      danceMem6Con.value = "N/A";
  
      danceMem7.value = "N/A";
      danceMem7Con.value = "N/A";
  
      const danceMembers = [
        { name: danceMem1, phone: danceMem1Con },
        { name: danceMem2, phone: danceMem2Con },
        { name: danceMem3, phone: danceMem3Con },
        { name: danceMem4, phone: danceMem4Con },
        { name: danceMem5, phone: danceMem5Con },
        { name: danceMem6, phone: danceMem6Con },
        { name: danceMem7, phone: danceMem7Con },
      ];
  
      const danceData = eventData.getDance();
  
      danceMembers.forEach((member, index) => {
        if (danceData[index]) {
          member.name.value = danceData[index].name;
          member.phone.value = danceData[index].phone;
        }
      });
    }
  
    let photographyData = eventData.getPhotography();
    if (photographyData) {
      photoMem1.value = eventData.getPhotography().name;
      photoMem1Con.value = eventData.getPhotography().phone;
    }
  
    let gamingData = eventData.getGaming();
    if (gamingData && gamingData.length == 2) {
      gameMem1.value = eventData.getGaming()[0].name;
      gameMem1Con.value = eventData.getGaming()[0].phone;
  
      gameMem2.value = eventData.getGaming()[1].name;
      gameMem2Con.value = eventData.getGaming()[1].phone;
    }
  
    let treasureData = eventData.getTreasure();
    if (treasureData && treasureData.length == 2) {
      thuntMem1.value = eventData.getTreasure()[0].name;
      thuntMem1Con.value = eventData.getTreasure()[0].phone;
  
      thuntMem2.value = eventData.getTreasure()[1].name;
      thuntMem2Con.value = eventData.getTreasure()[1].phone;
    }
  
    let productData = eventData.getProductLaunch();
    if (productData) {
      productMem1.value = eventData.getProductLaunch().name;
      productMem1Con.value = eventData.getProductLaunch().phone;
    }
  
    let dumbCharadesData = eventData.getDumbCharades();
    if (dumbCharadesData && dumbCharadesData.length == 2) {
      dumbMem1.value = eventData.getDumbCharades()[0].name;
      dumbMem1Con.value = eventData.getDumbCharades()[0].phone;
  
      dumbMem2.value = eventData.getDumbCharades()[1].name;
      dumbMem2Con.value = eventData.getDumbCharades()[1].phone;
    }
  
    let itManagerData = eventData.getITManager();
  
    if (itManagerData) {
      itmanMem1.value = eventData.getITManager().name;
      itmanMem1Con.value = eventData.getITManager().phone;
    }
  
    let designingData = eventData.getDesigning();
    if (designingData) {
      desigMem1.value = eventData.getDesigning().name;
      desigMem1Con.value = eventData.getDesigning().phone;
    }
  };

  class EventData {
    constructor(data) {
      this.data = data || {};
    }
  
    static repeatObject(object, size) {
      return Array.from({ length: size }, () => ({ ...object }));
    }
  
    getITManager() {
      return this.data.events && this.data.events.itManager
        ? this.data.events.itManager
        : { name: "N/A", phone: "N/A" };
    }
  
    getPhotography() {
      return this.data.events && this.data.events.photography
        ? this.data.events.photography
        : { name: "N/A", phone: "N/A" };
    }
  
    getProductLaunch() {
      return this.data.events && this.data.events.productLaunch
        ? this.data.events.productLaunch
        : { name: "N/A", phone: "N/A" };
    }
  
    getDesigning() {
      return this.data.events && this.data.events.designing
        ? this.data.events.designing
        : { name: "N/A", phone: "N/A" };
    }
  
    getCoding() {
      return this.data.events &&
        this.data.events.coding &&
        this.data.events.coding.length == 2
        ? this.data.events.coding
        : EventData.repeatObject({ name: "N/A", phone: "N/A" }, 2);
    }
  
    getWeb() {
      return this.data.events &&
        this.data.events.web &&
        this.data.events.web.length == 2
        ? this.data.events.web
        : EventData.repeatObject({ name: "N/A", phone: "N/A" }, 2);
    }
  
    getQuiz() {
      return this.data.events &&
        this.data.events.quiz &&
        this.data.events.quiz.length == 2
        ? this.data.events.quiz
        : EventData.repeatObject({ name: "N/A", phone: "N/A" }, 2);
    }
  
    getDebate() {
      return this.data.events && this.data.events.debate
        ? this.data.events.debate
        : { name: "N/A", phone: "N/A" };
    }
  
    getDance() {
      return this.data.events &&
        this.data.events.dance &&
        this.data.events.dance.length > 1
        ? this.data.events.dance
        : EventData.repeatObject({ name: "N/A", phone: "N/A" }, 7);
    }
  
    getGaming() {
      return this.data.events &&
        this.data.events.gaming &&
        this.data.events.gaming.length == 2
        ? this.data.events.gaming
        : EventData.repeatObject({ name: "N/A", phone: "N/A" }, 2);
    }
  
    getTreasure() {
      return this.data.events &&
        this.data.events.treasure &&
        this.data.events.treasure.length == 2
        ? this.data.events.treasure
        : EventData.repeatObject({ name: "N/A", phone: "N/A" }, 2);
    }
  
    getDumbCharades() {
      return this.data.events &&
        this.data.events.dumbCharades &&
        this.data.events.dumbCharades.length == 2
        ? this.data.events.dumbCharades
        : EventData.repeatObject({ name: "N/A", phone: "N/A" }, 2);
    }
  }
