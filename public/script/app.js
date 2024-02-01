console.log("Frontend js loaded");

const wform = document.querySelector("form")
const locationInput = document.querySelector("input");
const report = document.querySelector(".weather-report");

// fetch('http://127.0.0.1:3000/weather?address=?p23').then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   }).catch((err) => {
//     console.log("Error: ", err.message);
//   })
// })


wform.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const location = locationInput.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (res) => {
      res
        .json()
        .then((data) => {
          report.innerHTML = `${data.forcast} in ${data.location}`;
          console.log(data);
        })
        .catch((err) => {
          console.log("Error: ", err.message);
        });
    }
  );

})
