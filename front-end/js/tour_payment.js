let All = document.querySelector(".All");
let Menu = Array.from(All.children);
let payment = document.querySelector(".payment");
let tagNode12 = document.querySelector(".tagNode12");
let tagNode21 = document.querySelector(".tagNode21");
let tagNode23 = document.querySelector(".tagNode23");
let tagNode32 = document.querySelector(".tagNode32");
let myInfo = document.querySelector(".myInfo");
let card = document.querySelector(".card");
let myTable = document.querySelector(".myTable");
let myBill = document.querySelector(".myBill");
let myStage2 = document.querySelector(".myStage2");
let myStage3 = document.querySelector(".myStage3");
let tag1 = document.querySelector(".tag1");
let tag2 = document.querySelector(".tag2");
let tag3 = document.querySelector(".tag3");
Menu.push(payment);
for (let i = 0; i < Menu.length; i++) {
  Menu[i].setAttribute(
    "style",
    `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
  );
}
All.setAttribute("style", `height: ${window.innerHeight}px`);
window.addEventListener("resize", function () {
  for (let i = 0; i < Menu.length; i++) {
    Menu[i].setAttribute(
      "style",
      `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
    );
  }
  All.setAttribute("style", `height: ${window.innerHeight}px`);
});
tagNode12.onclick = function () {
  myTable.classList.toggle("hidden");
  myBill.classList.toggle("hidden");
  myStage2.classList.toggle("toPayment2");
  tag1.classList.toggle("toPayment2");
  tag2.classList.toggle("toPayment2");
};
tagNode21.onclick = function () {
  myTable.classList.toggle("hidden");
  myBill.classList.toggle("hidden");
  myStage2.classList.toggle("toPayment2");
  tag1.classList.toggle("toPayment2");
  tag2.classList.toggle("toPayment2");
};
tagNode23.onclick = function () {
  myInfo.classList.toggle("opacity");
  setTimeout(() => {
    myInfo.classList.toggle("None");
    card.classList.toggle("None");
    setTimeout(() => {
      card.classList.toggle("opacity");
    }, 200);
  }, 500);
  myStage3.classList.toggle("toPayment3");
  tag2.classList.toggle("toPayment2");
  tag3.classList.toggle("toPayment3");
};
tagNode32.onclick = function () {
  card.classList.toggle("opacity");
  setTimeout(() => {
    card.classList.toggle("None");
    myInfo.classList.toggle("None");
    setTimeout(() => {
      myInfo.classList.toggle("opacity");
    }, 200);
  }, 500);
  myStage3.classList.toggle("toPayment3");
  tag2.classList.toggle("toPayment2");
  tag3.classList.toggle("toPayment3");
};

// xu ly du lieu
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const tourId = params.get("tour_id");

  if(tourId) {
      fetch(`http://127.0.0.1:5000/tours/${tourId}`)
      .then(response => response.json())
      .then(tour => {
          document.getElementById("tourName").textContent = tour.name;
          document.getElementById("tourImage").src = tour.img;
          document.getElementById("destination").textContent = tour.destination;
          document.getElementById("startDate").textContent = tour.start_date;
          document.getElementById("endDate").textContent = tour.end_date;
          document.getElementById("maxPeople").textContent = tour.max_people;
          document.getElementById("price").textContent = tour.price;
      })
      .catch(error => console.error("Error fetching tour details: ", error));
  }

  // handle form when user click register
  document.getElementById("registrationForm").addEventListener("submit", event => {
      event.preventDefault();

      // get data from form
      const registrationData = {
          name: document.getElementById("name").value,
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value,
          cccd: document.getElementById("cccd").value,
          email: document.getElementById("email").value,
          paymentMethod: document.getElementById("paymentMethod").value,
          numPeople: document.getElementById("numPeople").value,
          tour_id: tourId // Gửi kèm tour_id để xác định tour
      };
      // send POST command to register
      fetch("http://127.0.0.1:5000/tours/register_tour", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(registrationData)
      })
      .then(response => response.json())
      .then(data => {
          alert("Registration successful");
          window.location.href = "http://127.0.0.1:5500/front-end/tours.html";
      })
      .catch(error => console.error("Error registering tour:", error));
  });
});