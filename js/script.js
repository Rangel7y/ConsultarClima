
/* GET ELEMENT TIME-DATE */
const dateTime = document.getElementById("date-time");
/* GET ELEMENT NAME-CITY */
const nameCity = document.getElementById("name-city");

/* GET ELEMENT BTN-SEARCH-CITY */
const formSearchCity = document.getElementById("form-search-city");

/* KEY ID (API) */
const keyID = '5d15ac2d';

/* Last Request Name City */
let lastRequestCity = "";

/* Request Api Data */
const getData = async (cityName) => {

    const btnForm = document.getElementById("btn-form-search");
    const iconSearch = document.getElementById("icon-search");

    btnForm.setAttribute("disabled", "disabled");

    iconSearch.src = "./assets/arrow-clockwise.svg";

    iconSearch.style.animation = "1s spinIcon linear infinite";
   
    try {
        const APIResponse = await axios.get(
            `https://api.hgbrasil.com/weather?format=json-cors&key=${keyID}&city_name=${cityName}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        setTimeout(() => {
            btnForm.removeAttribute("disabled");

            const data = APIResponse.data;

            const secResSearch = document.getElementById("sec-res-search");
            const ulResSearch = document.getElementById("ul-res-search");

            secResSearch.style.display = "flex";

            /* Datetime */
            dateTime.innerText = APIResponse.data['results']['date'];
            /* City name */
            nameCity.innerText = APIResponse.data['results']['city'];

            for(var i = 0; i < data['results']['forecast'].length; i++){
                let liRes, divInfoLeft, divWind, pWindLabel, pWindSpeedy, divInfoRight, divDateTime, pResWeekday, pDate, divMinMax, divMin, pMinLabel, pResMin, divMax, pMaxLabel, pResMax, divInfoCondition, divInfoDesc, imgResCondition, pResDesc;

                /* Create Li */
                liRes = document.createElement('li');
                ulResSearch.appendChild(liRes);

                /* Create Div (Info Left) */
                divInfoLeft = document.createElement('div');
                divInfoLeft.setAttribute('class', 'res-info-side-left');
                liRes.appendChild(divInfoLeft);

                divWind = document.createElement('div');
                divInfoLeft.appendChild(divWind);

                pWindLabel = document.createElement('p');
                pWindLabel.setAttribute('style', 'font-size: 0.80rem; color: var(--LightGray);');
                pWindLabel.innerText = "Vento";
                divWind.appendChild(pWindLabel);

                /* Wind Speed (Text) */
                pWindSpeedy = document.createElement('p');
                pWindSpeedy.setAttribute('class', 'res-wind-speedy');
                pWindSpeedy.setAttribute('style', 'font-size: 0.95rem; color: var(--LightGray);');
                pWindSpeedy.innerText = data['results']['forecast'][`${i}`]['wind_speedy'];
                divWind.appendChild(pWindSpeedy);

                /* Create Div (Info Right) */
                divInfoRight = document.createElement('div');
                divInfoRight.setAttribute('class', 'res-info-side-right');
                liRes.appendChild(divInfoRight);

                /* Create Div (Date and Time) */
                divDateTime = document.createElement('div');
                divDateTime.setAttribute('class', 'res-date-time');
                divInfoRight.appendChild(divDateTime);

                pResWeekday = document.createElement('p');
                pResWeekday.setAttribute('class', 'res-weekday');
                pResWeekday.innerText = data['results']['forecast'][`${i}`]['weekday'];
                divDateTime.appendChild(pResWeekday);

                pDate = document.createElement('p');
                pDate.innerText = data['results']['forecast'][`${i}`]['date'];
                divDateTime.appendChild(pDate);

                /* Create Div (Min and Max Temperature) */
                divMinMax = document.createElement('div');
                divMinMax.setAttribute('class', 'res-min-max');
                divInfoRight.appendChild(divMinMax);

                /* Create Div (Min) */
                divMin = document.createElement('div');
                divMinMax.appendChild(divMin);

                pMinLabel = document.createElement('p');
                pMinLabel.setAttribute('style', 'font-size: 0.75rem; color: var(--YellowTulip);');
                pMinLabel.innerText = "Mín";
                divMin.appendChild(pMinLabel);

                pResMin = document.createElement('p');
                pResMin.setAttribute('style', 'color: var(--YellowTulip);');
                pResMin.innerText = data['results']['forecast'][`${i}`]['min'];
                divMin.appendChild(pResMin);

                /* Create Div (Max) */
                divMax = document.createElement('div');
                divMinMax.appendChild(divMax);

                pMaxLabel = document.createElement('p');
                pMaxLabel.setAttribute('style', 'font-size: 0.80rem; color: var(--Goldfinger);');
                pMaxLabel.innerText = "Máx";
                divMax.appendChild(pMaxLabel);

                pResMax = document.createElement('p');
                pResMax.setAttribute('style', 'color: var(--Goldfinger);');
                pResMax.innerText = data['results']['forecast'][`${i}`]['max'];
                divMax.appendChild(pResMax);

                /* Create Div (Info Condition) */
                divInfoCondition = document.createElement('div');
                divInfoCondition.setAttribute('class', 'res-info-condition');
                liRes.appendChild(divInfoCondition);

                divInfoDesc = document.createElement('div');
                divInfoDesc.setAttribute('class', 'res-info-desc');
                divInfoCondition.appendChild(divInfoDesc);

                /* Icon Condition */
                imgResCondition = document.createElement('img');
                imgResCondition.setAttribute('src', `https://assets.hgbrasil.com/weather/icons/conditions/${data['results']['forecast'][`${i}`]['condition']}.svg`);
                imgResCondition.setAttribute('alt', 'Weather Condition');
                imgResCondition.setAttribute('class', 'res-img-condition');
                divInfoDesc.appendChild(imgResCondition);

                pResDesc = document.createElement('p');
                pResDesc.setAttribute('class', 'res-desc');
                pResDesc.innerText = data['results']['forecast'][`${i}`]['description'];
                divInfoDesc.appendChild(pResDesc);
            }

            iconSearch.style.animation = "";
            iconSearch.src = "./assets/search.svg";

            document.location.href = "#sec-res-search";

            console.log(data);
        }, 1000)
    } catch (error) {
        console.log(error);
    }
};

/* Button Search City */
formSearchCity.addEventListener("submit", (event) => {
    event.preventDefault();

    const inpNameCity = document.getElementById("inp-name-city");

    if(inpNameCity.value === lastRequestCity){
        return false;
    }

    if(inpNameCity.value != 0){
        lastRequestCity = inpNameCity.value;
        getData(inpNameCity.value);
    }
});
