// ================================
// HSFL S2 - LIVE HOMEPAGE SCRIPT
// ================================


// ================================
// SUPABASE PUBLIC CONNECTION
// ================================
//
// This is a PUBLISHABLE key.
// It is safe to use on the public website.
// Database security controls what visitors
// are allowed to change.
//

const SUPABASE_URL =
  "https://btjpzkgblmuetsomnvpw.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_9FmVKyCrGSsBbu3LIni6eQ_U95Fl0Vj";



// ================================
// FALLBACK TEAM DATA
// ================================
//
// If the database ever fails to load,
// the website still works.
//

let teams = {

  saraland: {
    name: "SARALAND SPARTANS",
    short: "SAR",
    logo: "saraland.png.PNG",
    className: "saraland",
    conference: "national",
    displayOrder: 10
  },

  mckinney: {
    name: "MCKINNEY LIONS",
    short: "MCK",
    logo: "mckinney.png.PNG",
    className: "mckinney",
    conference: "national",
    displayOrder: 11
  },

  img: {
    name: "IMG ACADEMY",
    short: "IMG",
    logo: "img.png.PNG",
    className: "imgacademy",
    conference: "national",
    displayOrder: 8
  },

  buford: {
    name: "BUFORD WOLVES",
    short: "BUF",
    logo: "buford.png.PNG",
    className: "buford",
    conference: "american",
    displayOrder: 5
  },

  auburn: {
    name: "AUBURN TIGERS",
    short: "AUB",
    logo: "auburn.png.PNG",
    className: "auburn",
    conference: "american",
    displayOrder: 1
  },

  bosco: {
    name: "ST. JOHN BOSCO BRAVES",
    short: "SJB",
    logo: "bosco.png.PNG",
    className: "bosco",
    conference: "american",
    displayOrder: 6
  },

  stjames: {
    name: "ST. JAMES ACADEMY STRIVERS",
    short: "STJ",
    logo: "stjames.png.PNG",
    className: "stjames",
    conference: "other",
    displayOrder: 13
  },

  norland: {
    name: "NORLAND VIKINGS",
    short: "NOR",
    logo: "norland.png.PNG",
    className: "norland",
    conference: "national",
    displayOrder: 9
  },

  parker: {
    name: "PARKER THUNDERING HERD",
    short: "PAR",
    logo: "parker.png.PNG.PNG",
    className: "parker",
    conference: "american",
    displayOrder: 2
  },

  stfrances: {
    name: "ST. FRANCES ACADEMY",
    short: "SFA",
    logo: "stfrances.png.PNG",
    className: "stfrances",
    conference: "american",
    displayOrder: 4
  },

  guyer: {
    name: "DENTON GUYER WILDCATS",
    short: "GUY",
    logo: "guyer.png.PNG",
    className: "guyer",
    conference: "national",
    displayOrder: 12
  },

  centennial: {
    name: "CENTENNIAL HUSKIES",
    short: "CEN",
    logo: "centennial.png.PNG",
    className: "centennial",
    conference: "national",
    displayOrder: 7
  },

  cornercanyon: {
    name: "CORNER CANYON CHARGERS",
    short: "CCY",
    logo: "chargers.png.PNG",
    className: "chargers",
    conference: "american",
    displayOrder: 3
  },

  dutchfork: {
    name: "DUTCH FORK SILVER FOXES",
    short: "DFK",
    logo: "silverfoxes.png.PNG",
    className: "silverfoxes",
    conference: "other",
    displayOrder: 14
  }

};



// ================================
// FALLBACK SCHEDULE
// ================================

let schedule = {

  1: [

    {
      away: "saraland",
      home: "mckinney",
      awayScore: null,
      homeScore: null,
      status: "upcoming",
      featured: false
    },

    {
      away: "img",
      home: "buford",
      awayScore: null,
      homeScore: null,
      status: "upcoming",
      featured: false
    },

    {
      away: "auburn",
      home: "bosco",
      awayScore: null,
      homeScore: null,
      status: "upcoming",
      featured: false
    },

    {
      away: "stjames",
      home: "norland",
      awayScore: null,
      homeScore: null,
      status: "upcoming",
      featured: false
    },

    {
      away: "parker",
      home: "stfrances",
      awayScore: null,
      homeScore: null,
      status: "upcoming",
      featured: false
    },

    {
      away: "guyer",
      home: "centennial",
      awayScore: null,
      homeScore: null,
      status: "upcoming",
      featured: true
    },

    {
      away: "cornercanyon",
      home: "dutchfork",
      awayScore: null,
      homeScore: null,
      status: "upcoming",
      featured: false
    }

  ]

};



// ================================
// TEAM RECORDS
// ================================

let teamRecords = {};

let currentWeek = 1;



// ================================
// PAGE ELEMENTS
// ================================

const gamesContainer =
  document.getElementById(
    "gamesContainer"
  );


const weekButton =
  document.getElementById(
    "weekButton"
  );


const weekMenu =
  document.getElementById(
    "weekMenu"
  );


const selectedWeek =
  document.getElementById(
    "selectedWeek"
  );


const weekPill =
  document.getElementById(
    "weekPill"
  );


const conferenceButton =
  document.getElementById(
    "conferenceButton"
  );


const conferenceMenu =
  document.getElementById(
    "conferenceMenu"
  );


const conferenceName =
  document.getElementById(
    "conferenceName"
  );


const standingsBody =
  document.getElementById(
    "standingsBody"
  );


const comparisonOverlay =
  document.getElementById(
    "comparisonOverlay"
  );


const comparisonClose =
  document.getElementById(
    "comparisonClose"
  );


const comparisonContent =
  document.getElementById(
    "comparisonContent"
  );



// ================================
// DATABASE GET
// ================================

async function databaseGet(
  table,
  query = ""
) {

  const url =
    `${SUPABASE_URL}/rest/v1/${table}` +
    (
      query
        ? `?${query}`
        : ""
    );


  const response =
    await fetch(
      url,
      {

        method: "GET",

        headers: {

          apikey:
            SUPABASE_KEY,

          Accept:
            "application/json"

        }

      }
    );


  if (!response.ok) {

    throw new Error(
      `Database request failed: ${response.status}`
    );

  }


  return await response.json();

}



// ================================
// LOAD LIVE DATABASE DATA
// ================================

async function loadLiveData() {

  try {

    const [
      teamRows,
      gameRows,
      overrideRows,
      settingsRows
    ] =
      await Promise.all([

        databaseGet(
          "hsfl_teams",
          "select=*&active=eq.true&order=display_order.asc"
        ),

        databaseGet(
          "hsfl_games",
          "select=*&season=eq.2&order=week.asc,created_at.asc"
        ),

        databaseGet(
          "hsfl_team_record_overrides",
          "select=*"
        ),

        databaseGet(
          "hsfl_settings",
          "select=*&key=eq.league"
        )

      ]);


    // ================================
    // TEAMS
    // ================================

    if (
      Array.isArray(teamRows)
      &&
      teamRows.length
    ) {

      const liveTeams =
        {};


      teamRows.forEach(
        row => {

          liveTeams[
            row.slug
          ] = {

            name:
              row.name,

            short:
              row.short,

            logo:
              row.logo_path,

            className:
              row.class_name,

            conference:
              row.conference,

            displayOrder:
              Number(
                row.display_order || 0
              )

          };

        }
      );


      teams =
        liveTeams;

    }



    // ================================
    // SCHEDULE
    // ================================

    if (
      Array.isArray(gameRows)
      &&
      gameRows.length
    ) {

      const liveSchedule =
        {};


      gameRows.forEach(
        game => {

          const week =
            Number(
              game.week
            );


          if (
            !liveSchedule[
              week
            ]
          ) {

            liveSchedule[
              week
            ] = [];

          }


          liveSchedule[
            week
          ].push({

            id:
              game.id,

            away:
              game.away_team,

            home:
              game.home_team,

            awayScore:
              game.away_score,

            homeScore:
              game.home_score,

            status:
              game.status,

            featured:
              Boolean(
                game.featured
              )

          });

        }
      );


      schedule =
        liveSchedule;

    }



    // ================================
    // SETTINGS
    // ================================

    if (
      Array.isArray(
        settingsRows
      )
      &&
      settingsRows.length
    ) {

      const leagueSettings =
        settingsRows[0]
          .value
        ||
        {};


      if (
        Number(
          leagueSettings.current_week
        ) > 0
      ) {

        currentWeek =
          Number(
            leagueSettings.current_week
          );

      }

    }



    // ================================
    // RECORDS
    // ================================

    teamRecords =
      calculateTeamRecords(
        gameRows,
        overrideRows
      );

  }

  catch (error) {

    console.warn(
      "HSFL live data could not load.",
      error
    );


    // Keep website working
    // with fallback information.

    teamRecords =
      calculateTeamRecords(
        getFallbackGames(),
        []
      );

  }

}



// ================================
// FALLBACK GAME LIST
// ================================

function getFallbackGames() {

  const games =
    [];


  Object.entries(
    schedule
  )
  .forEach(
    ([week, weekGames]) => {

      weekGames.forEach(
        game => {

          games.push({

            ...game,

            week:
              Number(week),

            away_team:
              game.away,

            home_team:
              game.home,

            away_score:
              game.awayScore,

            home_score:
              game.homeScore

          });

        }
      );

    }
  );


  return games;

}



// ================================
// CALCULATE LIVE STANDINGS
// ================================

function calculateTeamRecords(
  games,
  overrides
) {

  const records =
    {};


  Object.keys(
    teams
  )
  .forEach(
    teamID => {

      records[
        teamID
      ] = {

        wins: 0,
        losses: 0,
        pd: 0

      };

    }
  );


  if (
    Array.isArray(games)
  ) {

    games.forEach(
      game => {

        const awayID =
          game.away_team
          ||
          game.away;


        const homeID =
          game.home_team
          ||
          game.home;


        const awayScore =
          game.away_score
          ??
          game.awayScore;


        const homeScore =
          game.home_score
          ??
          game.homeScore;


        const status =
          game.status;


        if (
          !records[awayID]
          ||
          !records[homeID]
        ) {

          return;

        }


        const counts =
          (
            status === "final"
            ||
            status === "forfeit"
          );


        const hasScore =
          Number.isFinite(
            Number(awayScore)
          )
          &&
          Number.isFinite(
            Number(homeScore)
          )
          &&
          awayScore !== null
          &&
          homeScore !== null;


        if (
          !counts
          ||
          !hasScore
        ) {

          return;

        }


        const away =
          Number(
            awayScore
          );


        const home =
          Number(
            homeScore
          );


        records[
          awayID
        ].pd +=
          away - home;


        records[
          homeID
        ].pd +=
          home - away;


        if (
          away > home
        ) {

          records[
            awayID
          ].wins++;


          records[
            homeID
          ].losses++;

        }

        else if (
          home > away
        ) {

          records[
            homeID
          ].wins++;


          records[
            awayID
          ].losses++;

        }

      }
    );

  }



  // ================================
  // MANUAL ADMIN OVERRIDES
  // ================================

  if (
    Array.isArray(
      overrides
    )
  ) {

    overrides.forEach(
      row => {

        const teamID =
          row.team_slug;


        if (
          !records[
            teamID
          ]
        ) {

          return;

        }


        if (
          row.wins !== null
        ) {

          records[
            teamID
          ].wins =
            Number(
              row.wins
            );

        }


        if (
          row.losses !== null
        ) {

          records[
            teamID
          ].losses =
            Number(
              row.losses
            );

        }


        if (
          row.pd !== null
        ) {

          records[
            teamID
          ].pd =
            Number(
              row.pd
            );

        }

      }
    );

  }


  return records;

}



// ================================
// WEEK DROPDOWN
// ================================

function buildWeekMenu() {

  weekMenu.innerHTML =
    "";


  const weeks =
    Object.keys(
      schedule
    )
    .map(Number)
    .sort(
      (a,b) =>
        a - b
    );


  weeks.forEach(
    week => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "week-option";


      button.textContent =
        `Week ${week}`;


      button.addEventListener(
        "click",
        () => {

          loadWeek(
            week
          );


          weekMenu.classList.remove(
            "show"
          );

        }
      );


      weekMenu.appendChild(
        button
      );

    }
  );

}



weekButton.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    weekMenu.classList.toggle(
      "show"
    );


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
    schedule[
      week
    ]
    ||
    [];


  selectedWeek.textContent =
    `Week ${week}`;


  weekPill.textContent =
    `WEEK ${week}`;


  gamesContainer.innerHTML =
    "";


  if (
    games.length === 0
  ) {

    gamesContainer.innerHTML = `

      <div
        style="
          padding:25px 10px;
          text-align:center;
          color:#999;
          font-size:10px;
          font-weight:800;
        "
      >
        No games scheduled.
      </div>

    `;


    return;

  }


  games.forEach(
    game => {

      if (
        game.featured
      ) {

        const gotw =
          document.createElement(
            "div"
          );


        gotw.className =
          "gotw";


        gotw.textContent =
          "★ GAME OF THE WEEK";


        gamesContainer.appendChild(
          gotw
        );

      }


      const away =
        teams[
          game.away
        ];


      const home =
        teams[
          game.home
        ];


      if (
        !away
        ||
        !home
      ) {

        return;

      }


      const hasScore =
        game.awayScore !== null
        &&
        game.homeScore !== null
        &&
        game.awayScore !== ""
        &&
        game.homeScore !== "";


      let middleDisplay =
        "VS";


      if (
        hasScore
      ) {

        middleDisplay =
          `${game.awayScore} - ${game.homeScore}`;

      }


      const gameRow =
        document.createElement(
          "button"
        );


      gameRow.type =
        "button";


      gameRow.className =
        game.featured

          ? "game-row featured clickable-game"

          : "game-row clickable-game";


      gameRow.innerHTML = `

        <div class="team left-team">

          <div
            class="
              team-logo
              ${away.className}
            "
          >

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

          <div
            class="vs-box"
            style="
              font-weight:900;
              white-space:nowrap;
            "
          >
            ${middleDisplay}
          </div>

          <div class="compare">

            ${
              game.status ===
              "final"

              ? "FINAL · COMPARE ⇄"

              : game.status ===
                "live"

              ? "LIVE · COMPARE ⇄"

              : "COMPARE ⇄"
            }

          </div>

        </div>


        <div class="team right-team">

          <span>
            ${home.short}
          </span>

          <div
            class="
              team-logo
              ${home.className}
            "
          >

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

    }
  );

}



// ================================
// CONFERENCE DROPDOWN
// ================================

conferenceButton.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    conferenceMenu.classList.toggle(
      "show"
    );


    weekMenu.classList.remove(
      "show"
    );

  }
);



document
.querySelectorAll(
  ".conference-option"
)
.forEach(
  option => {

    option.addEventListener(
      "click",
      () => {

        const conference =
          option.dataset.conference;


        showConference(
          conference
        );


        conferenceMenu.classList.remove(
          "show"
        );

      }
    );

  }
);



// ================================
// GET CONFERENCE TEAMS
// ================================

function getConferenceTeams(
  conference
) {

  return Object.keys(
    teams
  )
  .filter(
    teamID => {

      return (
        teams[
          teamID
        ].conference ===
        conference
      );

    }
  )
  .sort(
    (a,b) => {

      const aRecord =
        teamRecords[a]
        ||
        {
          wins:0,
          losses:0,
          pd:0
        };


      const bRecord =
        teamRecords[b]
        ||
        {
          wins:0,
          losses:0,
          pd:0
        };


      if (
        bRecord.wins !==
        aRecord.wins
      ) {

        return (
          bRecord.wins -
          aRecord.wins
        );

      }


      if (
        aRecord.losses !==
        bRecord.losses
      ) {

        return (
          aRecord.losses -
          bRecord.losses
        );

      }


      if (
        bRecord.pd !==
        aRecord.pd
      ) {

        return (
          bRecord.pd -
          aRecord.pd
        );

      }


      return (

        teams[a]
          .displayOrder

        -

        teams[b]
          .displayOrder

      );

    }
  );

}



// ================================
// SHOW STANDINGS
// ================================

function showConference(
  conference
) {

  const teamList =
    getConferenceTeams(
      conference
    );


  conferenceName.textContent =
    conference.toUpperCase();


  standingsBody.innerHTML =
    "";


  teamList.forEach(
    teamID => {

      const team =
        teams[
          teamID
        ];


      const record =
        teamRecords[
          teamID
        ]
        ||
        {
          wins: 0,
          losses: 0,
          pd: 0
        };


      const row =
        document.createElement(
          "div"
        );


      row.className =
        "standings-row";


      row.innerHTML = `

        <div class="standing-team">

          <div
            class="
              standing-logo
              ${team.className}
            "
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
          ${formatPD(
            record.pd
          )}
        </b>

      `;


      standingsBody.appendChild(
        row
      );

    }
  );

}



// ================================
// FORMAT POINT DIFFERENTIAL
// ================================

function formatPD(
  number
) {

  const value =
    Number(
      number || 0
    );


  if (
    value > 0
  ) {

    return `+${value}`;

  }


  return value;

}



// ================================
// MATCHUP COMPARISON
// ================================

function openComparison(
  awayID,
  homeID
) {

  const away =
    teams[
      awayID
    ];


  const home =
    teams[
      homeID
    ];


  const awayRecord =
    teamRecords[
      awayID
    ]
    ||
    {
      wins:0,
      losses:0,
      pd:0
    };


  const homeRecord =
    teamRecords[
      homeID
    ]
    ||
    {
      wins:0,
      losses:0,
      pd:0
    };


  const enoughData =
    (
      awayRecord.wins
      +
      awayRecord.losses
      +
      homeRecord.wins
      +
      homeRecord.losses
    ) > 0;


  let predictionHTML =
    "";


  if (
    !enoughData
  ) {

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

  }

  else {

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

          ${prediction.awayPercent}%
          ${away.short}

          &nbsp; • &nbsp;

          ${prediction.homePercent}%
          ${home.short}

        </p>

      </div>

    `;

  }


  comparisonContent.innerHTML = `

    <div class="comparison-teams">


      <div class="comparison-team">

        <div
          class="
            comparison-logo
            ${away.className}
          "
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
          class="
            comparison-logo
            ${home.className}
          "
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
          ${formatPD(
            awayRecord.pd
          )}
        </span>

        <strong>
          POINT DIFF
        </strong>

        <span>
          ${formatPD(
            homeRecord.pd
          )}
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

function calculatePrediction(
  awayID,
  homeID
) {

  const away =
    teamRecords[
      awayID
    ];


  const home =
    teamRecords[
      homeID
    ];


  let awayScore =
    50
    +
    (
      away.wins * 7
    )
    -
    (
      away.losses * 5
    )
    +
    (
      away.pd * 0.3
    );


  let homeScore =
    50
    +
    (
      home.wins * 7
    )
    -
    (
      home.losses * 5
    )
    +
    (
      home.pd * 0.3
    );


  awayScore =
    Math.max(
      10,
      awayScore
    );


  homeScore =
    Math.max(
      10,
      homeScore
    );


  const total =
    awayScore
    +
    homeScore;


  let awayPercent =
    Math.round(

      (
        awayScore
        /
        total
      )
      *
      100

    );


  awayPercent =
    Math.max(
      20,
      Math.min(
        80,
        awayPercent
      )
    );


  const homePercent =
    100
    -
    awayPercent;


  const favorite =
    awayPercent >=
    homePercent

      ? teams[
          awayID
        ]

      : teams[
          homeID
        ];


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
// RENDER HOMEPAGE
// ================================

function renderHomepage() {

  buildWeekMenu();


  const availableWeeks =
    Object.keys(
      schedule
    )
    .map(Number)
    .sort(
      (a,b) =>
        a - b
    );


  let weekToShow =
    currentWeek;


  if (
    !schedule[
      weekToShow
    ]
  ) {

    weekToShow =
      availableWeeks[0]
      ||
      1;

  }


  loadWeek(
    weekToShow
  );


  showConference(
    "american"
  );

}



// ================================
// INITIAL PAGE LOAD
// ================================
//
// Show fallback immediately.
// Then replace it with live database
// information when it loads.
//

teamRecords =
  calculateTeamRecords(
    getFallbackGames(),
    []
  );


renderHomepage();


loadLiveData()
  .then(
    () => {

      renderHomepage();

    }
  );
