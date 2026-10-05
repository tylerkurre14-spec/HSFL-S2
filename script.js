const conferenceButton = document.getElementById("conferenceButton");
const conferenceMenu = document.getElementById("conferenceMenu");
const conferenceName = document.getElementById("conferenceName");
const standingsBody = document.getElementById("standingsBody");

const americanTeams = [
  {
    name: "AUBURN TIGERS",
    logo: "auburn.png.PNG",
    className: "auburn"
  },
  {
    name: "PARKER THUNDERING HERD",
    logo: "parker.png.PNG.PNG",
    className: "parker"
  },
  {
    name: "CORNER CANYON",
    logo: "chargers.png.PNG",
    className: "chargers"
  },
  {
    name: "ST. FRANCES ACADEMY",
    logo: "stfrances.png.PNG",
    className: "stfrances"
  },
  {
    name: "BUFORD WOLVES",
    logo: "buford.png.PNG",
    className: "buford"
  },
  {
    name: "ST. JOHN BOSCO",
    logo: "bosco.png.PNG",
    className: "bosco"
  }
];

const nationalTeams = [
  {
    name: "CENTENNIAL HUSKIES",
    logo: "centennial.png.PNG",
    className: "centennial"
  },
  {
    name: "IMG ACADEMY",
    logo: "img.png.PNG",
    className: "imgacademy"
  },
  {
    name: "NORLAND VIKINGS",
    logo: "norland.png.PNG",
    className: "norland"
  },
  {
    name: "SARALAND SPARTANS",
    logo: "saraland.png.PNG",
    className: "saraland"
  },
  {
    name: "MCKINNEY LIONS",
    logo: "mckinney.png.PNG",
    className: "mckinney"
  },
  {
    name: "DENTON GUYER WILDCATS",
    logo: "guyer.png.PNG",
    className: "guyer"
  }
];

function showTeams(teams) {

  standingsBody.innerHTML = "";

  teams.forEach(team => {

    standingsBody.innerHTML += `
      <div class="standings-row">

        <div class="standing-team">

          <div class="standing-logo ${team.className}">
            <img src="${team.logo}" alt="${team.name}">
          </div>

          <strong>${team.name}</strong>

        </div>

        <b>0</b>
        <b>0</b>
        <b>0</b>

      </div>
    `;

  });

}

conferenceButton.addEventListener("click", () => {
  conferenceMenu.classList.toggle("show");
});

document.querySelectorAll(".conference-option").forEach(option => {

  option.addEventListener("click", () => {

    const conference = option.dataset.conference;

    if (conference === "american") {

      conferenceName.textContent = "AMERICAN";

      showTeams(americanTeams);

    } else {

      conferenceName.textContent = "NATIONAL";

      showTeams(nationalTeams);

    }

    conferenceMenu.classList.remove("show");

  });

});
