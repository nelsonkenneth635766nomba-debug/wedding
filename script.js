
const cover = document.getElementById("cover");
const openButton = document.getElementById("openButton");

const envelopeStage = document.getElementById("envelopeStage");
const weddingPage = document.getElementById("weddingPage");

const calendar = document.getElementById("calendar");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

let isOpening = false;

openButton.addEventListener("click", function () {
    if (isOpening) return;

    isOpening = true;

    // 1. Fade away the full-screen cover
    cover.classList.add("cover-hidden");

    // 2. Show the closed envelope
    setTimeout(function () {
        envelopeStage.classList.add("active");
    }, 600);

    // 3. Open the flap and lift the invitation card
    setTimeout(function () {
        envelopeStage.classList.add("opening");
    }, 1100);

    // 4. Fade away the envelope
    setTimeout(function () {
        envelopeStage.classList.add("envelope-hidden");
    }, 3100);

    // 5. Reveal the wedding website
    setTimeout(function () {
        weddingPage.classList.add("page-visible");
    }, 3200);
});

// Create the March 2027 calendar
function renderCalendar() {
    const year = 2027;
    const month = 2; // March: January is 0

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendar.innerHTML = "";

    const weekdays = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    weekdays.forEach(function (day) {
        const heading = document.createElement("span");
        heading.textContent = day;
        calendar.appendChild(heading);
    });

    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement("span"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = document.createElement("span");
        date.textContent = day;

        if (day === 20) {
            date.classList.add("wedding-day");
            date.setAttribute("aria-label", "Wedding day, March 20");
        }

        calendar.appendChild(date);
    }
}

renderCalendar();

// COUNTDOWN TIMER
// Change this date to your actual wedding date.
const weddingDate = new Date("July 17, 2027 14:00:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


const friends = document.querySelectorAll(".friend-name");

// Create the popup
const popup = document.createElement("div");
popup.className = "friend-popup";

popup.innerHTML = `
    <div class="popup-content">
        <button class="close-popup" aria-label="Close">&times;</button>

        <h2 class="popup-title"></h2>

        <p class="popup-message">
            It would mean so much to have you by my side!
        </p>

        <button class="accept-btn">Yes, I will!</button>
    </div>
`;

document.body.appendChild(popup);

const popupTitle = popup.querySelector(".popup-title");
const popupMessage = popup.querySelector(".popup-message");
const closePopup = popup.querySelector(".close-popup");
const acceptBtn = popup.querySelector(".accept-btn");

// Store the accepted names separately
const acceptedFriends = new Set();

let selectedFriend = null;

// Open a separate popup for each name
friends.forEach((friend) => {
    friend.addEventListener("click", () => {
        selectedFriend = friend;

        const name = friend.textContent.trim();
        const group = friend.closest(".friends-group");
        const heading = group.querySelector(".group-title")
            .textContent.trim().toLowerCase();

        const role = heading.includes("groomsmen")
            ? "Groomsman"
            : "Bridesmaid";

        popupTitle.textContent = `Will you be my ${role}?`;
        popupMessage.textContent =
            `Dear ${name}, it would mean so much to have you by my side!`;

        if (acceptedFriends.has(friend)) {
            popupMessage.textContent =
                `${name}, you have already accepted! Thank you for being part of our special day.`;

            acceptBtn.textContent = "Accepted";
            acceptBtn.disabled = true;
        } else {
            acceptBtn.textContent = "Yes, I will!";
            acceptBtn.disabled = false;
        }

        acceptBtn.style.display = "inline-block";
        popup.style.display = "flex";
    });
});

// Accept only the currently selected name
acceptBtn.addEventListener("click", () => {
    if (!selectedFriend || acceptedFriends.has(selectedFriend)) {
        return;
    }

    acceptedFriends.add(selectedFriend);

    const name = selectedFriend.textContent.trim();

    popupTitle.textContent = "Thank You!";
    popupMessage.textContent =
        `${name}, your acceptance has been recorded on this page. We are happy to have you!`;

    acceptBtn.textContent = "Accepted";
    acceptBtn.disabled = true;
});

// Close popup
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
    selectedFriend = null;
});

// Close when clicking outside
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
        selectedFriend = null;
    }
});


