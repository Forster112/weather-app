console.log("Frontend js loaded");

const wform = document.querySelector("form")
const locationInput = document.querySelector("input");
const report = document.querySelector(".weather-report");
const errorpara = document.querySelector(".error")

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

  fetch(`/weather?address=${location}`).then(
    (res) => {
      res
        .json()
        .then((data) => {
          errorpara.innerHTML = ""
          report.innerHTML = `${data.forcast} in ${data.location}`;
        })
        .catch((err) => {
          report.innerHTML = ""
          errorpara.innerHTML = "Please check your internet or provide a valid location"
        });
    }
  );

})
