const studySpots = [
    {
        name: "University Library",
        location: "Main Building - 2nd Floor",
        noise: "quiet",
        wifi: "high",
        outlets: "many",
        type: ["individual", "programming"],
        details: {
            noise: "Very Quiet",
            wifi: "Excellent",
            outlets: "Many",
            crowd: "Low"
        }
    },
    {
        name: "Computer Laboratory 2",
        location: "Technology Building",
        noise: "moderate",
        wifi: "high",
        outlets: "many",
        type: ["individual", "programming"],
        details: {
            noise: "Moderate",
            wifi: "Excellent",
            outlets: "Many",
            crowd: "Medium"
        }
    },
    {
        name: "Student Lounge",
        location: "Student Center",
        noise: "moderate",
        wifi: "high",
        outlets: "some",
        type: ["group", "individual"],
        details: {
            noise: "Moderate",
            wifi: "Good",
            outlets: "Some",
            crowd: "Medium"
        }
    },
    {
        name: "Cafeteria Study Area",
        location: "Main Cafeteria - 2nd Floor",
        noise: "moderate",
        wifi: "medium",
        outlets: "some",
        type: ["group", "individual"],
        details: {
            noise: "Moderate",
            wifi: "Average",
            outlets: "Some",
            crowd: "High"
        }
    },
    {
        name: "Engineering Reading Room",
        location: "Engineering Building",
        noise: "quiet",
        wifi: "high",
        outlets: "some",
        type: ["individual", "programming"],
        details: {
            noise: "Very Quiet",
            wifi: "Excellent",
            outlets: "Some",
            crowd: "Low"
        }
    },
    {
        name: "Open Campus Garden",
        location: "Central Campus",
        noise: "quiet",
        wifi: "medium",
        outlets: "some",
        type: ["individual"],
        details: {
            noise: "Quiet",
            wifi: "Average",
            outlets: "Some",
            crowd: "Low"
        }
    }
];


function getStudyType(spot) {
    if (spot.type.indexOf("programming") !== -1) {
        return "Programming";
    }
    if (spot.type.indexOf("group") !== -1) {
        return "Group Study";
    }
    return "Individual Study";
}


function createDetail(label, value) {
    const box = document.createElement("div");
    box.className = "detail";

    box.appendChild(document.createTextNode(label));

    const strong = document.createElement("strong");
    strong.textContent = value;
    box.appendChild(strong);

    return box;
}

function createCard(spot) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "spot-card";

    const icon = document.createElement("div");
    icon.className = "spot-icon";
    icon.textContent = spot.icon;
    card.appendChild(icon);

    const title = document.createElement("h3");
    title.textContent = spot.name;
    card.appendChild(title);

    const location = document.createElement("p");
    location.className = "location";
    location.textContent = spot.location;
    card.appendChild(location);

    const details = document.createElement("div");
    details.className = "details";
    details.appendChild(createDetail("Noise", spot.details.noise));
    details.appendChild(createDetail("Wi-Fi", spot.details.wifi));
    details.appendChild(createDetail("Outlets", spot.details.outlets));
    details.appendChild(createDetail("Crowd", spot.details.crowd));
    card.appendChild(details);

    const rec = document.createElement("div");
    card.appendChild(rec);

    col.appendChild(card);
    return col;
}

function displaySpots(spots) {
    const container = document.getElementById("spotContainer");

    if (!container) {
        return;
    }
    container.innerHTML = "";

    if (spots.length === 0) {
        const emptyCol = document.createElement("div");
        emptyCol.className = "col-12";

        const empty = document.createElement("div");
        empty.className = "spot-card";

        const title = document.createElement("h3");
        title.textContent = "No matching spots found.";
        empty.appendChild(title);

        const note = document.createElement("p");
        note.className = "location";
        note.textContent = "Try changing your preferences.";
        empty.appendChild(note);

        emptyCol.appendChild(empty);
        container.appendChild(emptyCol);
        return;
    }

    for (let i = 0; i < spots.length; i++) {
        const card = createCard(spots[i]);
        container.appendChild(card);
    }
}

function findStudySpots() {
    const noise = document.getElementById("noise").value;
    const wifi = document.getElementById("wifi").value;
    const outlets = document.getElementById("outlets").value;
    const studyType = document.getElementById("studyType").value;

    const results = studySpots.filter(function (spot) {
        const matchNoise = (noise === "any" || spot.noise === noise);
        const matchWifi = (wifi === "any" || spot.wifi === wifi);
        const matchOutlets = (outlets === "any" || spot.outlets === outlets);
        const matchType = (studyType === "any" || spot.type.indexOf(studyType) !== -1);

        return matchNoise && matchWifi && matchOutlets && matchType;
    });

    displaySpots(results);
    document.getElementById("spots").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("findButton").addEventListener("click", findStudySpots);

displaySpots(studySpots);