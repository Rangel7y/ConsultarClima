
/* GET ELEMENT TIME-DATE */
const dateTime = document.getElementById("date-time");
/* GET ELEMENT NAME-CITY */
const nameCity = document.getElementById("name-city");

/* GET ELEMENT BTN-SEARCH-CITY */
const formSearchCity = document.getElementById("form-search-city");

/* KEY ID (API) */
const keyID = '5d15ac2d';

/* Request Api Data */
const getData = async (cityName) => {
    try {
        const APIResponse = await axios.get(
            `https://api.hgbrasil.com/weather?format=json-cors&key=${keyID}&city_name=${cityName}`, {
                headers: {
                "Content-Type": "application/json",
                },
            }
        );
        const data = APIResponse.data;

        const secResSearch = document.getElementById("sec-res-search");
        const ulResSearch = document.getElementById("ul-res-search");

        secResSearch.style.display = "flex";

        /* Datetime */
        dateTime.innerText = APIResponse.data['results']['date'];
        /* City name */
        nameCity.innerText = APIResponse.data['results']['city'];

        for(var i = 0; i < data['results']['forecast'].length; i++){
            let liRes, divRes1, pResWeekday, pResDateTime, imgResCondition, divRes2, pResMin, pResMax, divResInfoCondition, pResDesc, pResWindSpeedy;

            /* Create Li */
            liRes = document.createElement('li');
            ulResSearch.appendChild(liRes);

            /* Create Div 1 (Weekday and Datetime) */
            divRes1 = document.createElement('div');
            divRes1.setAttribute('class', 'res-weekday-time');
            liRes.appendChild(divRes1);

            pResWeekday = document.createElement('p');
            pResWeekday.setAttribute('class', 'res-weekday');
            pResWeekday.innerText = data['results']['forecast'][`${i}`]['weekday'];
            divRes1.appendChild(pResWeekday);

            pResDateTime = document.createElement('p');
            pResDateTime.innerText = data['results']['forecast'][`${i}`]['date'];
            divRes1.appendChild(pResDateTime);

            /* Create Image (Condition) */
            imgResCondition = document.createElement('img');
            imgResCondition.setAttribute('src', `https://assets.hgbrasil.com/weather/icons/conditions/${data['results']['forecast'][`${i}`]['condition']}.svg`);
            imgResCondition.setAttribute('alt', 'Weather Condition');
            imgResCondition.setAttribute('class', 'res-img-condition');
            liRes.appendChild(imgResCondition);

            /* Create Div 2 (Min and Max Temperature) */
            divRes2 = document.createElement('div');
            liRes.appendChild(divRes2);

            pResMin = document.createElement('p');
            pResMin.setAttribute('class', 'res-min');
            pResMin.innerText = data['results']['forecast'][`${i}`]['min'];
            divRes2.appendChild(pResMin);

            pResMax = document.createElement('p');
            pResMax.setAttribute('class', 'res-max');
            pResMax.innerText = data['results']['forecast'][`${i}`]['max'];
            divRes2.appendChild(pResMax);

            /* Create Div (Info Condition) */
            divResInfoCondition = document.createElement('div');
            divResInfoCondition.setAttribute('class', 'res-info-condition');
            liRes.appendChild(divResInfoCondition);

            pResDesc = document.createElement('p');
            pResDesc.setAttribute('class', 'res-desc');
            pResDesc.innerText = data['results']['forecast'][`${i}`]['description'];
            divResInfoCondition.appendChild(pResDesc);

            pResWindSpeedy = document.createElement('p');
            pResWindSpeedy.setAttribute('class', 'res-wind-speedy');
            pResWindSpeedy.innerText = data['results']['forecast'][`${i}`]['wind_speedy'];
            divResInfoCondition.appendChild(pResWindSpeedy);
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

/* Button Search City */
formSearchCity.addEventListener("submit", (event) => {
    event.preventDefault();

    const inpNameCity = document.getElementById("inp-name-city");

    if(inpNameCity.value != 0){
        getData(inpNameCity.value);
    }
});
