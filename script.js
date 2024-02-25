
document.getElementById("pass-txt").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const enteredPassword = event.target.value;
        const bodyele = document.getElementById("body-id");
        const passdiv = document.getElementById("pass-div");

        if ("SURvbnRLbm93VGhlUGFzc3dvcmQ=" === btoa(enteredPassword)) {
            bodyele.style.display = "block";
            passdiv.style.display = "none";
        } else {
            alert("Incorrect password. Access denied.");
        }
    }
});


// const bodyele = document.getElementById("body-id");
// const passdiv = document.getElementById("pass-div");
// bodyele.style.display = "block";
// passdiv.style.display = "none";