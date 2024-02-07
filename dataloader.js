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
const codingMemCon1 = document.getElementById('coding-mem1-con');
const codingMem2 = document.getElementById('coding-mem2');
const codingMemCon2 = document.getElementById('coding-mem2-con');


const webMem1 = document.getElementById('web-mem1');
const webMemCon1 = document.getElementById('web-mem1-con');
const webMem2 = document.getElementById('web-mem2');
const webMemCon2 = document.getElementById('web-mem2-con');


const quizMem1 = document.getElementById('quiz-mem1');
const quizMemCon1 = document.getElementById('quiz-mem1-con');
const quizMem2 = document.getElementById('quiz-mem2');
const quizMemCon2 = document.getElementById('quiz-mem2-con');


const debateMem1 = document.getElementById('debate-mem1');
const debateMemCon1 = document.getElementById('debate-mem1-con');

const danceMem1 = document.getElementById('dance-mem1');
const danceMemCon1 = document.getElementById('dance-mem1-con');
const danceMem2 = document.getElementById('dance-mem2');
const danceMemCon2 = document.getElementById('dance-mem2-con');
const danceMem3 = document.getElementById('dance-mem3');
const danceMemCon3 = document.getElementById('dance-mem3-con');
const danceMem4 = document.getElementById('dance-mem4');
const danceMemCon4 = document.getElementById('dance-mem4-con');
const danceMem5 = document.getElementById('dance-mem5');
const danceMemCon5 = document.getElementById('dance-mem5-con');
const danceMem6 = document.getElementById('dance-mem6');
const danceMemCon6 = document.getElementById('dance-mem6-con');
const danceMem7 = document.getElementById('dance-mem7');
const danceMemCon7 = document.getElementById('dance-mem7-con');


const photographyMem1 = document.getElementById('photo-mem1');
const photographyMemCon1 = document.getElementById('photo-mem1-con');

const gamingMem1 = document.getElementById('game-mem1');
const gamingMemCon1 = document.getElementById('game-mem1-con');
const gamingMem2 = document.getElementById('game-mem2');
const gamingMemCon2 = document.getElementById('game-mem2-con');

const treasureMem1 = document.getElementById('thunt-mem1');
const treasureMemCon1 = document.getElementById('thunt-mem1-con');
const treasureMem2 = document.getElementById('thunt-mem2');
const treasureMemCon2 = document.getElementById('thunt-mem2-con');

const productMem1 = document.getElementById('product-mem1');
const productMemCon1 = document.getElementById('product-mem1-con');

const itManagerMem1 = document.getElementById('itman-mem1');
const itManagerMemCon1 = document.getElementById('itman-mem1-con');

const designingMem1 = document.getElementById('desig-mem1');
const designingMemCon1 = document.getElementById('desig-mem1-con');

const dumbchMem1 = document.getElementById('dumb-mem1');
const dumbchMemCon1 = document.getElementById('dumb-mem1-con');
const dumbchMem2 = document.getElementById('dumb-mem2');
const dumbchMemCon2 = document.getElementById('dumb-mem2-con');

const loader = document.getElementById("loader-lottie-div");




const adminOptions = {
  headers: {
    'auth-token': 'IDontKnowThePassword',
  },
};


const fetchTeams = async () => {
  try {
    // add auth header to fetch

    const response = await fetch(`${API_URL}/admin/get-ids`, adminOptions);
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

  updateUI(teams[0]._id);
};

teamList.addEventListener('click', async (event) => {
  const clickedTeamId = await event.target.dataset.teamId;
  updateUI(clickedTeamId);
});

const updateUI = async (teamId) => {
  teamDetails(teamId);
  teamPayment(teamId);
  accommoNo(teamId);
  fetchDataAndUpdateUI(teamId);
}


const teamDetails = async (teamId) => {

  teamIdInput.value = teamId;

  const res = await fetch(`${API_URL}/admin/get-ids/${teamId}`, adminOptions);
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
      'auth-token': 'IDontKnowThePassword',
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


const dumbCharadesSection = document.querySelector(".ug-hide");
const itManagerSection = document.querySelector(".pg-hide1");
const designSection = document.querySelector(".pg-hide2");

const displayUGFields = () => {
  dumbCharadesSection.classList.remove("hide");
  itManagerSection.classList.add("hide");
  designSection.classList.add("hide");
};

const displayPGFields = () => {
  dumbCharadesSection.classList.add("hide");
  itManagerSection.classList.remove("hide");
  designSection.classList.remove("hide");
};
// payment


const savePaymentBtn = document.querySelector("#payment-btn");
const teamPayment = async (teamId) => {
  console.log(teamId);

  if (teamId) {
    try {
      const res = await fetch(`${API_URL}/team/${teamId}`);
      const data = await res.json();
      const paymentData = data.paymentStatus;
      transChk.checked = paymentData.verificationStatus;

      if (paymentData.screenshot) {
        paymentImg.style.display = 'block';
        paymentImg.src = paymentData.screenshot
      }
      else {
        paymentImg.style.display = 'none';
      }

      if (paymentData.transactionId) {
        transId.value = paymentData.transactionId;
      }

      if (paymentData.verificationStatus) {
        transChk.disabled = true;
        savePaymentBtn.disabled = true;
      } else {
        transId.value = 'Payment still pending';
        transChk.disabled = false;
        savePaymentBtn.disabled = false;
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  } else {
    console.error('Team ID is undefined.');
  }
};

savePaymentBtn.onclick = async (event) => {

  const paymentData = {
    paymentStatus: {
      verificationStatus: transChk.checked
    }
  };
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'auth-token': 'IDontKnowThePassword',
    },
    body: JSON.stringify(paymentData),
  };

  console.log(paymentData);

  try {
    const res = await fetch(`${API_URL}/admin/update-team-status/${teamIdInput.value}`, options);

    if (res.status === 200) {
      return openAlert("Data saved successfully");
    }
    else if (res.status == 400) {
      return openAlert(res.message);
    }
    else {
      console.error("Error saving data. Server responded with:", res.status);
      // Log the response text for more details
      const responseText = await res.json();
      console.error("Response Text:", responseText);
    }
  } catch (error) {
    console.error("ERROR:", error);
  }
};


// accommodation

const accommoNo = async () => {

  const res = await fetch(`${API_URL}/team/${teamIdInput.value}`);
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


const accommodationBtn = document.getElementById("accommo-btn");

accommodationBtn.onclick = async () => {

  const accommodationData = {
    accommodation: {
      countOfBoys: accommonb.value,
      countOfGirls: accommong.value,
    },
  };
  try {
    const res = await fetch(`${API_URL}/team/${teamIdInput.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accommodationData),
    });
    const data = await res.json();
    console.log(data.accommodation);
    openAlert("Updated Accommodation Details")
  } catch (err) {
    console.error(err);
    openAlert("Error Updating Details")
  }

}







// events
const events = async (teamId) => {
  const eventData = new EventData(data);
  const res = await fetch(`${API_URL}/team/${teamId}`);
  const data = await res.json();
  updateUITextFields(eventData);

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

const updateUITextFields = (eventData) => {
  // codingMemCon1.value = 'N/A'
  // codingMem1.placeholder = 'input placeholder'

  let codingData = eventData.getCoding();

  if (codingData && codingData.length == 2) {
    codingMem1.value = codingData[0].name;
    codingMemCon1.value = codingData[0].phone;

    codingMem2.value = codingData[1].name;
    codingMemCon2.value = codingData[1].phone;
  }

  let webData = eventData.getWeb();
  if (webData && webData.length == 2) {
    webMem1.value = eventData.getWeb()[0].name;
    webMemCon1.value = eventData.getWeb()[0].phone;

    webMem2.value = eventData.getWeb()[1].name;
    webMemCon2.value = eventData.getWeb()[1].phone;
  }

  let quizData = eventData.getQuiz();
  if (quizData && quizData.length == 2) {
    quizMem1.value = eventData.getQuiz()[0].name;
    quizMemCon1.value = eventData.getQuiz()[0].phone;

    quizMem2.value = eventData.getQuiz()[1].name;
    quizMemCon2.value = eventData.getQuiz()[1].phone;
  }

  let debateData = eventData.getDebate();
  if (debateData) {
    debateMem1.value = eventData.getDebate().name;
    debateMemCon1.value = eventData.getDebate().phone;
  }

  let danceData = eventData.getDance();

  if (danceData && danceData.length > 1) {
    danceMem1.value = "N/A";
    danceMemCon1.value = "N/A";

    danceMem2.value = "N/A";
    danceMemCon2.value = "N/A";

    danceMem3.value = "N/A";
    danceMemCon3.value = "N/A";

    danceMem4.value = "N/A";
    danceMemCon4.value = "N/A";

    danceMem5.value = "N/A";
    danceMemCon5.value = "N/A";

    danceMem6.value = "N/A";
    danceMemCon6.value = "N/A";

    danceMem7.value = "N/A";
    danceMemCon7.value = "N/A";

    const danceMembers = [
      { name: danceMem1, phone: danceMemCon1 },
      { name: danceMem2, phone: danceMemCon2 },
      { name: danceMem3, phone: danceMemCon3 },
      { name: danceMem4, phone: danceMemCon4 },
      { name: danceMem5, phone: danceMemCon5 },
      { name: danceMem6, phone: danceMemCon6 },
      { name: danceMem7, phone: danceMemCon7 },
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
    photographyMem1.value = eventData.getPhotography().name;
    photographyMemCon1.value = eventData.getPhotography().phone;
  }

  let gamingData = eventData.getGaming();
  if (gamingData && gamingData.length == 2) {
    gamingMem1.value = eventData.getGaming()[0].name;
    gamingMemCon1.value = eventData.getGaming()[0].phone;

    gamingMem2.value = eventData.getGaming()[1].name;
    gamingMemCon2.value = eventData.getGaming()[1].phone;
  }

  let treasureData = eventData.getTreasure();
  if (treasureData && treasureData.length == 2) {
    treasureMem1.value = eventData.getTreasure()[0].name;
    treasureMemCon1.value = eventData.getTreasure()[0].phone;

    treasureMem2.value = eventData.getTreasure()[1].name;
    treasureMemCon2.value = eventData.getTreasure()[1].phone;
  }

  let productData = eventData.getProductLaunch();
  if (productData) {
    productMem1.value = eventData.getProductLaunch().name;
    productMemCon1.value = eventData.getProductLaunch().phone;
  }

  let dumbCharadesData = eventData.getDumbCharades();
  if (dumbCharadesData && dumbCharadesData.length == 2) {
    dumbchMem1.value = eventData.getDumbCharades()[0].name;
    dumbchMemCon1.value = eventData.getDumbCharades()[0].phone;

    dumbchMem2.value = eventData.getDumbCharades()[1].name;
    dumbchMemCon2.value = eventData.getDumbCharades()[1].phone;
  }

  let itManagerData = eventData.getITManager();

  if (itManagerData) {
    itManagerMem1.value = eventData.getITManager().name;
    itManagerMemCon1.value = eventData.getITManager().phone;
  }

  let designingData = eventData.getDesigning();
  if (designingData) {
    designingMem1.value = eventData.getDesigning().name;
    designingMemCon1.value = eventData.getDesigning().phone;
  }
};


const fetchData = async (teamId) => {
  try {
    const response = await fetch(`${API_URL}/team/${teamId}`,);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};




const fetchDataAndUpdateUI = async (teamId) => {
  const data = await fetchData(teamId);
  const eventData = new EventData(data);

  const isUG = data.isUG;

  if (isUG) {
    displayUGFields();
  } else {
    displayPGFields();
  }

  updateUITextFields(eventData);
};



const getEventData = () => {
  const codingData = [
    { name: codingMem1.value, phone: codingMemCon1.value },
    { name: codingMem2.value, phone: codingMemCon2.value },
  ];

  const webData = [
    { name: webMem1.value, phone: webMemCon1.value },
    { name: webMem2.value, phone: webMemCon2.value },
  ];

  const quizData = [
    { name: quizMem1.value, phone: quizMemCon1.value },
    { name: quizMem2.value, phone: quizMemCon2.value },
  ];

  const danceData = [
    { name: danceMem1.value, phone: danceMemCon1.value },
    { name: danceMem2.value, phone: danceMemCon2.value },
    { name: danceMem3.value, phone: danceMemCon3.value },
    { name: danceMem4.value, phone: danceMemCon4.value },
    { name: danceMem5.value, phone: danceMemCon5.value },
    { name: danceMem6.value, phone: danceMemCon6.value },
    { name: danceMem7.value, phone: danceMemCon7.value },
  ];

  const gamingData = [
    { name: gamingMem1.value, phone: gamingMemCon1.value },
    { name: gamingMem2.value, phone: gamingMemCon2.value },
  ];

  const treasureData = [
    { name: treasureMem1.value, phone: treasureMemCon1.value },
    { name: treasureMem2.value, phone: treasureMemCon2.value },
  ];

  const dumbCharadesData = [
    { name: dumbchMem1.value, phone: dumbchMemCon1.value },
    { name: dumbchMem2.value, phone: dumbchMemCon2.value },
  ];

  const eventData = {
    events: {
      coding: codingData,
      web: webData,
      quiz: quizData,
      dance: danceData,
      gaming: gamingData,
      treasure: treasureData,
      dumbCharades: dumbCharadesData,
      itManager: { name: itManagerMem1.value, phone: itManagerMemCon1.value },
      photography: {
        name: photographyMem1.value,
        phone: photographyMemCon1.value,
      },
      productLaunch: { name: productMem1.value, phone: productMemCon1.value },
      designing: { name: designingMem1.value, phone: designingMemCon1.value },
      debate: { name: debateMem1.value, phone: debateMemCon1.value },
    },
  };

  return eventData;
};



const eventSaveBtn = document.querySelector("#events-btn");

eventSaveBtn.onclick = async () => {

  loader.style.display = "block";
  const eventData = getEventData();

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  };

  try {
    const res = await fetch(`${API_URL}/team/${teamIdInput.value}`, options);

    if (res.status === 200) {
      openAlert("Data saved successfully");
      loader.style.display = "none";
    } else {
      openAlert("Error saving data");
      loader.style.display = "none";
    }
  } catch (error) {
    console.error("ERROR: " + error);
    loader.style.display = "none";
  }


};


function openAlert(text) {
  const alertBox = document.querySelector(".info");
  const alertTitle = document.getElementById("alert-title");
  const closeButton = document.querySelector(".info__close");

  // Check if text is provided
  if (text) {
    // Set the alert title dynamically
    alertTitle.textContent = text;

    // Display the alert box
    alertBox.style.display = "flex";

    // Close the alert box after 3 seconds
    setTimeout(closeAlert, 3000);
    closeButton.addEventListener("click", closeAlert);
  }
}

function closeAlert() {
  const alertBox = document.querySelector(".info");
  alertBox.style.display = "none";
}
//To close using close button
document.querySelector(".info__close").addEventListener("click", function () {
  closeAlert();
});


const dumbDownBtn = document.getElementById("dumb-down");
const productDownBtn = document.getElementById("product-down");
const thuntDownBtn = document.getElementById("thunt-down");
const gameDownBtn = document.getElementById("game-down");
const photoDownBtn = document.getElementById("photo-down");
const danceDownBtn = document.getElementById("dance-down");
const debateDownBtn = document.getElementById("debate-down");
const quizDownBtn = document.getElementById("quiz-down");
const webDownBtn = document.getElementById("web-down");
const codingDownBtn = document.getElementById("coding-down");
const itmanDownBtn = document.getElementById("itman-down");
const desigDownBtn = document.getElementById("desig-down");

const loaderDumb = document.getElementById("loader-lottie-div-dumb");


// Function to handle button click and initiate download
const handleButtonClick = async (apiEndpoint, fileName) => {

  try {
    loaderDumb.style.display = "block";
    const response = await fetch(`${API_URL}/admin/${apiEndpoint}`, adminOptions);

    if (!response.ok) {
      loaderDumb.style.display = "none";
      throw new Error('Failed to fetch data');
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.href = blobUrl;
    downloadLink.download = fileName;
    downloadLink.click();

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    openAlert(error);
    loaderDumb.style.display = "none";
  }
  loaderDumb.style.display = "none";
};

// Attach click event handlers to each button
dumbDownBtn.onclick = () => handleButtonClick('get-dumbcharades-mems', 'dumbcharades_members.pdf');
productDownBtn.onclick = () => handleButtonClick('get-productlaunch-mems', 'productlaunch_members.pdf');
thuntDownBtn.onclick = () => handleButtonClick('get-treasure-mems', 'treasure_members.pdf');
gameDownBtn.onclick = () => handleButtonClick('get-gaming-mems', 'gaming_members.pdf');
photoDownBtn.onclick = () => handleButtonClick('get-photography-mems', 'photography_members.pdf');
danceDownBtn.onclick = () => handleButtonClick('get-dance-mems', 'dance_members.pdf');
debateDownBtn.onclick = () => handleButtonClick('get-debate-mems', 'debate_members.pdf');
quizDownBtn.onclick = () => handleButtonClick('get-quiz-mems', 'quiz_members.pdf');
webDownBtn.onclick = () => handleButtonClick('get-web-mems', 'web_members.pdf');
codingDownBtn.onclick = () => handleButtonClick('get-coding-mems', 'coding_members.pdf');
itmanDownBtn.onclick = () => handleButtonClick('get-itmanger-mems', 'itmanger_members.pdf');
desigDownBtn.onclick = () => handleButtonClick('get-designing-mems', 'designing_members.pdf');


