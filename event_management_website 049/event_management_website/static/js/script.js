// SEARCH FUNCTION
let searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let filter = searchInput.value.toLowerCase();
        let cards = document.getElementsByClassName("event-card");

        for (let i = 0; i < cards.length; i++) {
            let text = cards[i].innerText.toLowerCase();
            cards[i].style.display = text.includes(filter) ? "" : "none";
        }
    });
}
// FORM VALIDATION
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let tickets = document.getElementById("tickets").value;

    // Empty check
    if (name === "" || email === "" || phone === "") {
        alert("All fields are required!");
        return false;
    }

    // Email validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Enter valid email!");
        return false;
    }

    // Phone validation
    if (phone.length !== 10 || isNaN(phone)) {
        alert("Enter valid 10-digit phone number!");
        return false;
    }

    // Tickets validation
    if (tickets === "" || tickets <= 0) {
        alert("Enter valid number of tickets!");
        return false;
    }

    alert("Registration Successful!");
    return true;
}