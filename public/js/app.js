const domString = {
  searched: ".searched",
  result: ".result",
  loading: ".loading",
  searching: ".searching",
  locationForm: ".form",
  searchInput: ".form__input",
  searchedAddress: ".searched__address",
  temperatureBox: ".temperature",
  precipProbBox: ".precipProbability",
  humidityBox: ".humidity",
  summaryBox: ".summary__box--text",
  dailyBoxText: ".daily__box--text",
  dailyBoxIcon: ".daily__box--icon",
};

const searched = document.querySelector(domString.searched);
const result = document.querySelector(domString.result);
const loading = document.querySelector(domString.loading);
const searching = document.querySelector(domString.searching);

const locationForm = document.querySelector(domString.locationForm);
const searchInput = document.querySelector(domString.searchInput);

const searchedAddress = document.querySelector(domString.searchedAddress);
const temperatureBox = document.querySelector(domString.temperatureBox);
const precipProbBox = document.querySelector(domString.precipProbBox);
const humidityBox = document.querySelector(domString.humidityBox);
const summaryBox = document.querySelector(domString.summaryBox);
const dailyBoxText = document.querySelector(domString.dailyBoxText);
const dailyBoxIcon = document.querySelector(domString.dailyBoxIcon);

searched.classList.add("hide");
result.classList.add("hide");

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchInput.value || "yangon";

  loading.classList.remove("hide");
  searching.textContent = `Searching for ${location} . . .`;

  searched.classList.add("hide");
  result.classList.add("hide");

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          searched.classList.remove("hide");
          result.classList.remove("hide");
          loading.classList.add("hide");

          searchedAddress.textContent = data.location;
          temperatureBox.textContent =
            data.forecast.currently.temperature + "°C";
          precipProbBox.textContent =
            data.forecast.currently.precipProbability + "%";
          humidityBox.textContent = data.forecast.currently.humidity + " grams";
          dailyBoxText.textContent = data.forecast.daily;
          summaryBox.textContent = data.forecast.currently.summary;
          dailyBoxIcon.innerHTML = `<canvas id="${data.forecast.currently.icon}" width="64" height="64" style="display: block"></canvas>`;
          // var canvas = document.createElement("CANVAS");
          // canvas.width = "64";
          // canvas.height = "64";
          // canvas.id = data.forecast.currently.icon;
          // document.body.appendChild(canvas);
          // dailyBoxIcon.appendChild(canvas);
        }
      });
    }
  );
});

/***************************************
 * Skycons Configurations
 */
var icons = new Skycons({ color: "orange" });

icons.set("clear-day", Skycons.CLEAR_DAY);
icons.set("clear-night", Skycons.CLEAR_NIGHT);
icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
icons.set("cloudy", Skycons.CLOUDY);
icons.set("rain", Skycons.RAIN);
icons.set("sleet", Skycons.SLEET);
icons.set("snow", Skycons.SNOW);
icons.set("wind", Skycons.WIND);
icons.set("fog", Skycons.FOG);

icons.play();
