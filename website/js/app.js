/*Global Variables*/
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=48c20a7828f892dc0b943b5f17a33a06';
const countryCode = ',in';
const fahrenheit = '&units=imperial';

//Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

//Chaining Events
function performAction(e){
    const cityZipCode = document.getElementById('zip').value;
    getData(baseURL+cityZipCode+countryCode+apiKey+fahrenheit)
    .then(
        function(weather) {
            const feelings = document.getElementById('feelings').value;
            return postData('/addRecord', {temperature: weather.main.temp, date: newDate, user_feelings: feelings});
        }
    )
    .then(
        function(post_response) {
            return getData('/get');
        }
    )
    .then(
        updateUI
    )
}

// Async POST 
const postData = async (url = '', data = {})=>{
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

// Get Route
const getData = async (url = '')=>{
    const response = await fetch(url);

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

//Updating UI
function updateUI (get_response) {
    document.getElementById('date').innerHTML = 'Today Date is: &nbsp;' + get_response.date;
    document.getElementById('temp').innerHTML = 'Temperature is: &nbsp;' + get_response.temperature + '&nbsp; Ferenheit';
    document.getElementById('content').innerHTML = 'I feel: &nbsp;' + get_response.user_feelings;
}