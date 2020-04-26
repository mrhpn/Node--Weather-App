const locationForm = document.querySelector(".form");
const search = document.querySelector(".form__input");

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});
