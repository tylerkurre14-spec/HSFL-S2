// ================================
// HSFL S2 - HOMEPAGE SCRIPT
// ================================


// ================================
// TEAM DATA
// ================================

const teams = {
  saraland: {
    name: "SARALAND SPARTANS",
    short: "SAR",
    logo: "saraland.png.PNG",
    className: "saraland"
  },

  mckinney: {
    name: "MCKINNEY LIONS",
    short: "MCK",
    logo: "mckinney.png.PNG",
    className: "mckinney"
  },

  img: {
    name: "IMG ACADEMY",
    short: "IMG",
    logo: "img.png.PNG",
    className: "imgacademy"
  },

  buford: {
    name: "BUFORD WOLVES",
    short: "BUF",
    logo: "buford.png.PNG",
    className: "buford"
  },

  auburn: {
    name: "AUBURN TIGERS",
    short: "AUB",
    logo: "auburn.png.PNG",
    className: "auburn"
  },

  bosco: {
    name: "ST. JOHN BOSCO",
    short: "SJB",
    logo: "bosco.png.PNG",
    className: "bosco"
  },

  stjames: {
    name: "ST. JAMES ACADEMY STRIVERS",
    short: "STJ",
    logo: "stjames.png.PNG",
    className: "stjames"
  },

  norland: {
    name: "NORLAND VIKINGS",
    short: "NOR",
    logo: "norland.png.PNG",
    className: "norland"
  },

  parker: {
    name: "PARKER THUNDERING HERD",
    short: "PAR",
    logo: "parker.png.PNG.PNG",
    className: "parker"
  },

  stfrances: {
    name: "ST. FRANCES ACADEMY",
    short: "SFA",
    logo: "stfrances.png.PNG",
    className: "stfrances"
  },

  guyer: {
    name: "DENTON GUYER WILDCATS",
    short: "GUY",
    logo: "guyer.png.PNG",
    className: "guyer"
  },

  centennial: {
    name: "CENTENNIAL HUSKIES",
    short: "CEN",
    logo: "centennial.png.PNG",
    className: "centennial"
  },

  cornercanyon: {
    name: "CORNER CANYON CHARGERS",
    short: "CCY",
    logo: "chargers.png.PNG",
    className: "chargers"
  },

  dutchfork: {
    name: "DUTCH FORK SILVER FOXES",
    short: "DFK",
    logo: "silverfoxes.png.PNG",
    className: "silverfoxes"
  }
};


// ================================
// SCHEDULE
// ================================
//
// When we create Week 2 later,
// we add:
//
// 2: [
//   { away: "...", home: "..." },
//   ...
// ]
//
// Then Week 2 AUTOMATICALLY appears
// in the dropdown.
//

const schedule = {

  1: [

    {
      away: "saraland",
      home: "mckinney"
    },

    {
      away: "img",
      home: "buford"
    },

    {
      away: "auburn",
      home: "bosco"
    },

    {
      away: "stjames",
      home: "norland"
    },

    {
      away: "parker",
      home: "stfrances"
    },

    {
      away: "guyer",
      home: "centennial",
      featured: true
    },

    {
      away: "cornercanyon",
      home: "dutchfork"
    }

  ]

};


// ================================
// CURRENT TEAM RECORDS
// ================================
//
// KEEPING EVERYTHING 0-0 FOR NOW
//

const teamRecords = {

  saraland: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  mckinney: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  img: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  buford: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  auburn: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  bosco: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  stjames: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  norland: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  parker: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  stfrances: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  guyer: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  centennial: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  cornercanyon: {
    wins: 0,
    losses: 0,
    pd: 0
  },

  dutchfork: {
    wins: 0,
    losses: 0,
    pd: 0
  }

};


// ================================
// CONFERENCES
// ================================

const conferences = {

  american: [
    "auburn",
    "parker",
    "cornercanyon",
    "stfrances",
    "buford",
    "bosco"
  ],

  national: [
    "centennial",
    "img",
    "norland",
    "saraland",
    "mckinney",
    "guyer"
  ]

};


// ================================
// PAGE ELEMENTS
// ================================

const gamesContainer =
  document.getElementById("gamesContainer");

const weekButton =
  document.getElementById("weekButton");

const weekMenu =
  document.getElementById("weekMenu");

const selectedWeek =
  document.getElementById("selectedWeek");

const weekPill =
  document.getElementById("weekPill");


const conferenceButton =
  document.getElementById("conferenceButton");

const conferenceMenu =
  document.getElementById("conferenceMenu");

const conferenceName =
  document.getElementById("conferenceName");

const standingsBody =
  document.getElementById("standingsBody");


const comparisonOverlay =
  document.getElementById("comparisonOverlay");

const comparisonClose =
  document.getElementById("comparisonClose");

const comparisonContent =
  document.getElementById("comparisonContent");


// ================================
// WEEK DROPDOWN
// ================================

function buildWeekMenu() {

  weekMenu.innerHTML = "";

  const weeks = Object.keys(schedule);

  weeks.forEach(week => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "week-option";

    button.textContent =
      `Week ${week}`;

    button.addEventListener(
      "click",
      () => {

        loadWeek(week);

        weekMenu.classList.remove(
          "show"
        );

      }
    );

    weekMenu.appendChild(button);

  });

}


weekButton.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    weekMenu.classList.toggle("show");

    conferenceMenu.classList.remove(
      "show"
    );

  }
);


// ================================
// LOAD WEEK
// ================================

function loadWeek(week) {

  const games =
    schedule[week];

  selectedWeek.textContent =
    `Week ${week}`;

  weekPill.textContent =
    `WEEK ${week}`;

  gamesContainer.innerHTML = "";


  games.forEach(game => {

    if (game.featured) {

      const gotw =
        document.createElement("div");

      gotw.className = "gotw";

      gotw.textContent =
        "★ GAME OF THE WEEK";

      gamesContainer.appendChild(gotw);

    }


    const away =
      teams[game.away];

    const home =
      teams[game.home];


    const gameRow =
      document.createElement("button");


    gameRow.type = "button";

    gameRow.className =
      game.featured
        ? "game-row featured clickable-game"
        : "game-row clickable-game";


    gameRow.innerHTML = `

      <div class="team left-team">

        <div class="team-logo ${away.className}">

          <img
            src="${away.logo}"
            alt="${away.name}"
          >

        </div>

        <span>
          ${away.short}
        </span>

      </div>


      <div class="game-middle">

        <div class="vs-box">
          VS
        </div>

        <div class="compare">
          COMPARE ⇄
        </div>

      </div>


      <div class="team right-team">

        <span>
          ${home.short}
        </span>

        <div class="team-logo ${home.className}">

          <img
            src="${home.logo}"
            alt="${home.name}"
          >

        </div>

      </div>

    `;


    gameRow.addEventListener(
      "click",
      () => {

        openComparison(
          game.away,
          game.home
        );

      }
    );


    gamesContainer.appendChild(
      gameRow
    );

  });

}


// ================================
// CONFERENCE DROPDOWN
// ================================

conferenceButton.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    conferenceMenu.classList.toggle(
      "show"
    );

    weekMenu.classList.remove("show");

  }
);


document
  .querySelectorAll(
    ".conference-option"
  )
  .forEach(option => {

    option.addEventListener(
      "click",
      () => {

        const conference =
          option.dataset.conference;

        showConference(conference);

        conferenceMenu.classList.remove(
          "show"
        );

      }
    );

  });


// ================================
// SHOW STANDINGS
// ================================

function showConference(conference) {

  const teamList =
    conferences[conference];

  conferenceName.textContent =
    conference.toUpperCase();

  standingsBody.innerHTML = "";


  teamList.forEach(teamID => {

    const team =
      teams[teamID];

    const record =
      teamRecords[teamID];


    const row =
      document.createElement("div");

    row.className =
      "standings-row";


    row.innerHTML = `

      <div class="standing-team">

        <div
          class="standing-logo ${team.className}"
        >

          <img
            src="${team.logo}"
            alt="${team.name}"
          >

        </div>

        <strong>
          ${team.name}
        </strong>

      </div>


      <b>
        ${record.wins}
      </b>


      <b>
        ${record.losses}
      </b>


      <b>
        ${formatPD(record.pd)}
      </b>

    `;


    standingsBody.appendChild(row);

  });

}


// ================================
// FORMAT POINT DIFFERENTIAL
// ================================

function formatPD(number) {

  if (number > 0) {
    return `+${number}`;
  }

  return number;

}


// ================================
// MATCHUP COMPARISON
// ================================

function openComparison(
  awayID,
  homeID
) {

  const away =
    teams[awayID];

  const home =
    teams[homeID];

  const awayRecord =
    teamRecords[awayID];

  const homeRecord =
    teamRecords[homeID];


  // Right now every team is 0-0,
  // so we DO NOT make up a winner.

  const enoughData =
    (
      awayRecord.wins +
      awayRecord.losses +
      homeRecord.wins +
      homeRecord.losses
    ) > 0;


  let predictionHTML = "";


  if (!enoughData) {

    predictionHTML = `

      <div class="prediction-box">

        <span class="prediction-label">
          HSFL PREDICTION
        </span>

        <strong>
          NOT ENOUGH DATA YET
        </strong>

        <p>
          A prediction will appear once
          games and team stats are recorded.
        </p>

      </div>

    `;

  } else {

    const prediction =
      calculatePrediction(
        awayID,
        homeID
      );


    predictionHTML = `

      <div class="prediction-box">

        <span class="prediction-label">
          HSFL PREDICTION
        </span>

        <strong>
          ${prediction.favorite.name}
        </strong>

        <p>
          ${prediction.awayPercent}% ${away.short}
          &nbsp; • &nbsp;
          ${prediction.homePercent}% ${home.short}
        </p>

      </div>

    `;

  }


  comparisonContent.innerHTML = `

    <div class="comparison-teams">


      <div class="comparison-team">

        <div
          class="comparison-logo ${away.className}"
        >

          <img
            src="${away.logo}"
            alt="${away.name}"
          >

        </div>

        <strong>
          ${away.name}
        </strong>

        <span>
          ${awayRecord.wins}-${awayRecord.losses}
        </span>

      </div>



      <div class="comparison-vs">
        VS
      </div>



      <div class="comparison-team">

        <div
          class="comparison-logo ${home.className}"
        >

          <img
            src="${home.logo}"
            alt="${home.name}"
          >

        </div>

        <strong>
          ${home.name}
        </strong>

        <span>
          ${homeRecord.wins}-${homeRecord.losses}
        </span>

      </div>


    </div>



    <div class="comparison-stats">


      <div class="comparison-stat-row">

        <span>
          ${awayRecord.wins}-${awayRecord.losses}
        </span>

        <strong>
          RECORD
        </strong>

        <span>
          ${homeRecord.wins}-${homeRecord.losses}
        </span>

      </div>


      <div class="comparison-stat-row">

        <span>
          ${formatPD(awayRecord.pd)}
        </span>

        <strong>
          POINT DIFF
        </strong>

        <span>
          ${formatPD(homeRecord.pd)}
        </span>

      </div>


    </div>


    ${predictionHTML}

  `;


  comparisonOverlay.classList.add(
    "show"
  );

  comparisonOverlay.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


// ================================
// PREDICTION SYSTEM
// ================================
//
// This is intentionally simple.
//
// Once real games exist,
// record + point differential
// influence the prediction.
//
// It does NOT randomly pick teams.
//

function calculatePrediction(
  awayID,
  homeID
) {

  const away =
    teamRecords[awayID];

  const home =
    teamRecords[homeID];


  let awayScore =
    50 +
    (away.wins * 7) -
    (away.losses * 5) +
    (away.pd * 0.3);


  let homeScore =
    50 +
    (home.wins * 7) -
    (home.losses * 5) +
    (home.pd * 0.3);


  awayScore =
    Math.max(10, awayScore);

  homeScore =
    Math.max(10, homeScore);


  const total =
    awayScore + homeScore;


  let awayPercent =
    Math.round(
      (awayScore / total) * 100
    );


  let homePercent =
    100 - awayPercent;


  // Keep percentages reasonable

  awayPercent =
    Math.max(
      20,
      Math.min(
        80,
        awayPercent
      )
    );


  homePercent =
    100 - awayPercent;


  const favorite =
    awayPercent >= homePercent
      ? teams[awayID]
      : teams[homeID];


  return {
    awayPercent,
    homePercent,
    favorite
  };

}


// ================================
// CLOSE COMPARISON
// ================================

function closeComparison() {

  comparisonOverlay.classList.remove(
    "show"
  );

  comparisonOverlay.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


comparisonClose.addEventListener(
  "click",
  closeComparison
);


comparisonOverlay.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      comparisonOverlay
    ) {

      closeComparison();

    }

  }
);


// ================================
// CLOSE DROPDOWNS
// ================================

document.addEventListener(
  "click",
  event => {

    if (
      !event.target.closest(
        ".week-picker"
      )
    ) {

      weekMenu.classList.remove(
        "show"
      );

    }


    if (
      !event.target.closest(
        ".conference-picker"
      )
    ) {

      conferenceMenu.classList.remove(
        "show"
      );

    }

  }
);


// ================================
// INITIAL PAGE LOAD
// ================================

buildWeekMenu();

loadWeek(1);

showConference("american");
