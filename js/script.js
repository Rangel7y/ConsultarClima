/* 
// CURRENT DAY INFOS
const cityName = document.querySelector('.cityName');
const cityDate = document.querySelector('.cityDate');
const cityTime = document.querySelector('.cityTime');
const cityTemp = document.querySelector('.cityTemp');
const imgDayCondition = document.querySelector('.imgDayCondition');
const dayDescCondition = document.querySelector('.dayDescCondition');

const cityHighTemp = document.querySelector('.cityHighTemp');
const cityMinTemp = document.querySelector('.cityMinTemp');
const cityWindSpeed = document.querySelector('.cityWindSpeed');
const cityRain = document.querySelector('.cityRain');
const citySunrise = document.querySelector('.citySunrise');
const citySunset = document.querySelector('.citySunset');

// WEEK DAYS WEATHER INFOS PREVISIONS
// MONDAY TEMP MAX-MIN
const weekday01 = document.querySelector('.text_weekday01'); // NAME WEEKDAY MONDAY
const weekday01Date = document.querySelector('.weekday01_date'); // DATE WEEKDAY MONDAY
const day01HighTemp = document.querySelector('.day01HighTemp');
const day01MinTemp = document.querySelector('.day01MinTemp');
const weekdayImg01 = document.querySelector('.weekdayImg01'); // GET IMAGE CONDITION WEEKDAY MONDAY
const weekdayCondition01 = document.querySelector('.weekdayCondition01');
//
// TUESDAY TEMP MAX-MIN
const weekday02 = document.querySelector('.text_weekday02'); // NAME WEEKDAY TUESDAY
const weekday02Date = document.querySelector('.weekday02_date'); // DATE WEEKDAY TUESDAY
const day02HighTemp = document.querySelector('.day02HighTemp');
const day02MinTemp = document.querySelector('.day02MinTemp');
const weekdayImg02 = document.querySelector('.weekdayImg02');
const weekdayCondition02 = document.querySelector('.weekdayCondition02');
//
// WEDNESDAY TEMP MAX-MIN
const weekday03 = document.querySelector('.text_weekday03'); // NAME WEEKDAY WEDNESDAY
const weekday03Date = document.querySelector('.weekday03_date'); // DATE WEEKDAY WEDNESDAY
const day03HighTemp = document.querySelector('.day03HighTemp');
const day03MinTemp = document.querySelector('.day03MinTemp');
const weekdayImg03 = document.querySelector('.weekdayImg03');
const weekdayCondition03 = document.querySelector('.weekdayCondition03');
//
// THURSDAY TEMP MAX-MIN 
const weekday04 = document.querySelector('.text_weekday04'); // NAME WEEKDAY THURSDAY
const weekday04Date = document.querySelector('.weekday04_date'); // DATE WEEKDAY THURSDAY
const day04HighTemp = document.querySelector('.day04HighTemp');
const day04MinTemp = document.querySelector('.day04MinTemp');
const weekdayImg04 = document.querySelector('.weekdayImg04');
const weekdayCondition04 = document.querySelector('.weekdayCondition04');
//
// FRIDAY TEMP MAX-MIN
const weekday05 = document.querySelector('.text_weekday05'); // NAME WEEKDAY FRIDAY
const weekday05Date = document.querySelector('.weekday05_date'); // DATE WEEKDAY FRIDAY
const day05HighTemp = document.querySelector('.day05HighTemp');
const day05MinTemp = document.querySelector('.day05MinTemp');
const weekdayImg05 = document.querySelector('.weekdayImg05');
const weekdayCondition05 = document.querySelector('.weekdayCondition05');
//
// SATURDAY TEMP MAX-MIN
const weekday06 = document.querySelector('.text_weekday06'); // NAME WEEKDAY SATURDAY
const weekday06Date = document.querySelector('.weekday06_date'); // DATE WEEKDAY SATURDAY
const day06HighTemp = document.querySelector('.day06HighTemp');
const day06MinTemp = document.querySelector('.day06MinTemp');
const weekdayImg06 = document.querySelector('.weekdayImg06');
const weekdayCondition06 = document.querySelector('.weekdayCondition06');
//
// NEXT WEEK SUNDAY TEMP MAX-MIN
const weekday07 = document.querySelector('.text_weekday07'); // NAME NEXT WEEKDAY SUNDAY
const weekday07Date = document.querySelector('.weekday07_date'); // DATE WEEKDAY NEXT SUNDAY
const day07HighTemp = document.querySelector('.day07HighTemp');
const day07MinTemp = document.querySelector('.day07MinTemp');
const weekdayImg07 = document.querySelector('.weekdayImg07');
const weekdayCondition07 = document.querySelector('.weekdayCondition07');
//

// GET FORM INFO
const formCity = document.querySelector('#form_search');
const inputSearchCity = document.querySelector('.input_search');

// TOKEN API
const appToken = '99885e84';

// DEFAULT CONFIGS CITY
const appCity = "Teixeira de Freitas";
const appState = "BA";
const appCityID = '7969';

let currently = "";

const getCity = async(city) =>{
  const APIResponse = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${appToken}&city_name=${city}`);

  if(APIResponse.status == 200){
      const data = await APIResponse.json();
      return data;
  }
}

const findCity = async(city) =>{
  const data = await getCity(city);
  
  if(data){
    inputSearchCity.value = ''; // RESET INPUT FORM

    // INFOS PULLED FROM API TO MAIN PANEL
    cityName.innerHTML = data['results']['city']; // TEXT NAME CITY
    cityTime.innerHTML = data['results']['time'];
    cityDate.innerHTML = data['results']['date'];
    cityTemp.innerHTML = data['results']['temp']; // TEXT TODAY TEMP

    currently = data['results']['currently'];

    getDescriptionDay(data['results']['description'],imgDayCondition);
    
    dayDescCondition.innerHTML = data['results']['description'];
    cityHighTemp.innerHTML = data['results']['forecast']['0']['max'] + "°"; // TEXT HIGH TEMP
    cityMinTemp.innerHTML = data['results']['forecast']['0']['min'] + "°"; // TEXT MIN TEMP
    cityWindSpeed.innerHTML = data['results']['wind_speedy']; // CITY WIND SPEED
    cityRain.innerHTML = data['results']['rain']; // CITY RAIN
    citySunrise.innerHTML = data['results']['sunrise']; // CITY SUNRISE
    citySunset.innerHTML = data['results']['sunset']; // CITY SUNSET

    // INFOS PULLED FROM API TO PANEL WEEK PREVISION
    // MONDAY TEMP PREVISION
    weekday01.innerHTML = data['results']['forecast']['1']['weekday'];
    weekday01Date.innerHTML = data['results']['forecast']['1']['date'];
    day01HighTemp.innerHTML = data['results']['forecast']['1']['max'] + "°";
    day01MinTemp.innerHTML = data['results']['forecast']['1']['min'] + "°";
    getDescriptionDay(data['results']['forecast']['1']['description'],weekdayImg01);
    weekdayCondition01.innerHTML = data['results']['forecast']['1']['description'];
    //
    // TUESDAY TEMP PREVISION
    weekday02.innerHTML = data['results']['forecast']['2']['weekday'];
    weekday02Date.innerHTML = data['results']['forecast']['2']['date'];
    day02HighTemp.innerHTML = data['results']['forecast']['2']['max'] + "°";
    day02MinTemp.innerHTML = data['results']['forecast']['2']['min'] + "°";
    getDescriptionDay(data['results']['forecast']['2']['description'],weekdayImg02);
    weekdayCondition02.innerHTML = data['results']['forecast']['2']['description'];
    //
    // WEDNESDAY TEMP PREVISION
    weekday03.innerHTML = data['results']['forecast']['3']['weekday'];
    weekday03Date.innerHTML = data['results']['forecast']['3']['date'];
    day03HighTemp.innerHTML = data['results']['forecast']['3']['max'] + "°";
    day03MinTemp.innerHTML = data['results']['forecast']['3']['min'] + "°";
    getDescriptionDay(data['results']['forecast']['3']['description'],weekdayImg03);
    weekdayCondition03.innerHTML = data['results']['forecast']['3']['description'];
    //
    // THURSDAY TEMP PREVISION
    weekday04.innerHTML = data['results']['forecast']['4']['weekday'];
    weekday04Date.innerHTML = data['results']['forecast']['4']['date'];
    day04HighTemp.innerHTML = data['results']['forecast']['4']['max'] + "°";
    day04MinTemp.innerHTML = data['results']['forecast']['4']['min'] + "°";
    getDescriptionDay(data['results']['forecast']['4']['description'],weekdayImg04);
    weekdayCondition04.innerHTML = data['results']['forecast']['4']['description'];
    //
    // FRIDAY TEMP PREVISION
    weekday05.innerHTML = data['results']['forecast']['5']['weekday'];
    weekday05Date.innerHTML = data['results']['forecast']['5']['date'];
    day05HighTemp.innerHTML = data['results']['forecast']['5']['max'] + "°";
    day05MinTemp.innerHTML = data['results']['forecast']['5']['min'] + "°";
    getDescriptionDay(data['results']['forecast']['5']['description'],weekdayImg05);
    weekdayCondition05.innerHTML = data['results']['forecast']['5']['description'];
    //
    // SATURDAY TEMP PREVISION
    weekday06.innerHTML = data['results']['forecast']['6']['weekday'];
    weekday06Date.innerHTML = data['results']['forecast']['6']['date'];
    day06HighTemp.innerHTML = data['results']['forecast']['6']['max'] + "°";
    day06MinTemp.innerHTML = data['results']['forecast']['6']['min'] + "°";
    getDescriptionDay(data['results']['forecast']['6']['description'],weekdayImg06);
    weekdayCondition06.innerHTML = data['results']['forecast']['6']['description'];
    //
    // NEXT WEEK SUNDAY TEMP PREVISION
    weekday07.innerHTML = data['results']['forecast']['7']['weekday'];
    weekday07Date.innerHTML = data['results']['forecast']['7']['date'];
    day07HighTemp.innerHTML = data['results']['forecast']['7']['max'] + "°";
    day07MinTemp.innerHTML = data['results']['forecast']['7']['min'] + "°";
    getDescriptionDay(data['results']['forecast']['7']['description'],weekdayImg07);
    weekdayCondition07.innerHTML = data['results']['forecast']['7']['description'];

    console.log(data); 
  }
  else{
    // RESET INFOS IF NOT FOUND
    inputSearchCity.value = ''; // INPUT FORM
    
    cityName.innerHTML = 'Not Found'; // TEXT NAME CITY
  
    // RESET PANEL WEEK PREVISION
    // MONDAY TEMP PREVISION
    weekday01.innerHTML = '';
    day01HighTemp.innerHTML = '';
    day01MinTemp.innerHTML = '';
    //
    // TUESDAY TEMP PREVISION
    weekday02.innerHTML = '';
    day02HighTemp.innerHTML = '';
    day02MinTemp.innerHTML = '';
    //
    // WEDNESDAY TEMP PREVISION
    weekday03.innerHTML = '';
    day03HighTemp.innerHTML = '';
    day03MinTemp.innerHTML = '';
    //
    // THURSDAY TEMP PREVISION
    weekday04.innerHTML = '';
    day04HighTemp.innerHTML = '';
    day04MinTemp.innerHTML = '';
    //
    // FRIDAY TEMP PREVISION
    weekday05.innerHTML = '';
    day05HighTemp.innerHTML = '';
    day05MinTemp.innerHTML = '';
    //
    // SATURDAY TEMP PREVISION
    weekday06.innerHTML = '';
    day06HighTemp.innerHTML = '';
    day06MinTemp.innerHTML = '';
    //
    // NEXT WEEK SUNDAY TEMP PREVISION
    weekday07.innerHTML = '';
    day07HighTemp.innerHTML = '';
    day07MinTemp.innerHTML = '';
    //    
  }
}

function getDescriptionDay(forecastId,imageCondition){
  switch (forecastId) {
    case 'Tempestade forte':{
      imageCondition.src = "./assets/icon-storm-strong.png";
      break;
    }
    case 'Furacão':
      imageCondition.src = "./assets/icon-hurricane.png";
      break;
    case 'Misto de neve e chuva':
      imageCondition.src = "./assets/icon-rain-with-snow.png";
      break;
    case 'Misto chuva e gelo':
      imageCondition.src = "./assets/icon-rain-with-snow.png";
      break;
    case 'Geada fina':
      imageCondition.src = "./assets/icon-fine-frost.png";
      break;
    case 'Chuviscos':
      imageCondition.src = "./assets/icon-sprinkles.png";
      break;
    case 'Congelamento chuva':
      imageCondition.src = "./assets/icon-fine-frost.png";
      break;
    case 'Alguns chuviscos':
      imageCondition.src = "./assets/icon-some-sprinkles.png";
      break;
    case 'Neve baixa':
      imageCondition.src = "./assets/icon-snow.png";
      break;
    case 'Tempestade com neve':
      imageCondition.src = "./assets/icon-storm-snow.png";
      break;
    case 'Ventania com neve':
      imageCondition.src = "./assets/icon-blowing-snow.png";
      break;
    case 'Neve':
      imageCondition.src = "./assets/icon-snow.png";
      break;
    case 'Poeira':
      imageCondition.src = "./assets/icon-dust.png";
      break;
    case 'Neblina':
      imageCondition.src = "./assets/icon-mist.png";
      break;
    case 'Tempestade de areia':
      imageCondition.src = "./assets/icon-duststorm.png";
      break;
    case 'Fumacento':
      imageCondition.src = "./assets/icon-climate-care.png";
      break;
    case 'Ventania':
      imageCondition.src = "./assets/icon-gale.png";
      break;
    case 'Tempo frio':
      imageCondition.src = "./assets/icon-cold.png";
      break;
    case 'Tempo nublado':
      if(currently == "noite"){
        imageCondition.src = "./assets/icon-partly-coudly-night.png";
      }else{
        imageCondition.src = "./assets/icon-partly-coudly-day.png";
      }
      break;
    case 'Parcialmente nublado':
      imageCondition.src = "./assets/icon-partly-coudly-day.png";
      break;
    case 'Ensolarado':
      imageCondition.src = "./assets/icon-smiling-sun.png";
      break;
    case 'Estrelado':
      imageCondition.src = "./assets/icon-sky-scarry.png";
      break;
    case 'Ensolarado com muitas nuvens':
      imageCondition.src = "./assets/icon-sun.png";
      break;
    case 'Misto chuva e granizo':
      imageCondition.src = "./assets/icon-hail.png";
      break;
    case 'Ar quente':
      imageCondition.src = "./assets/icon-dry.png";
      break;
    case 'Trovoadas dispersas':
      imageCondition.src = "./assets/icon-lightning.png";
      break;
    case 'Chuva':
      imageCondition.src = "./assets/icon-rain.png";
      break;
    case 'Chuvas esparsas':
      imageCondition.src = "./assets/icon-rain.png";
      break;
    case 'Tempo limpo':
      imageCondition.src = "./assets/icon-rainbow.png";
      break;
    default:
      console.log('Valor não encontrado');
      break;
    }
}

formCity.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(inputSearchCity.value != 0){
      findCity(inputSearchCity.value.toLowerCase());
    }
    else{
      console.error("Preencha o campo de pesquisa!");
    }
});

findCity(appCity);


 */