/*pegando todos os elementos que será usado no manipulamento de DOM */

let hor = document.getElementById("hours")
let min = document.getElementById("minuter")
let seg = document.getElementById("seguntes")

//pegando o elemento do smart
let shor = document.getElementById("shours")
let smin = document.getElementById("sminuter")
let sseg = document.getElementById("sseguntes")
let sem = document.getElementById("semana")
let yea = document.getElementById("full_years")
//function responsavel pela hora no relogio de todos os relogios

function hours(){
    //pegando uma function responsavel pela data em js e salvando ela em uma variavel.
    let data = new Date();

    //salvado as horas em variaveis.
    let hours = data.getHours()
    let minutes = data.getMinutes()
    let seconds = data.getSeconds()
    
    //passando para os elementos que se encontra no DOM.
    hor.textContent = hours;
    shor.textContent = hours;
    min.textContent = minutes;
    smin.textContent = minutes;
    sseg.textContent = seconds;
    seg.textContent = seconds;

    //condição para concatenar 0 no começo das horas;

    /*fiz uma condição desse jeito para melhor entendimento
    toda essa condição apenas ferifica se os horarios e menor que 10 se sim adicione o 0 na frente de cada numero para ficar com o padrão 01:05:07
    */
    if(hours < 10 ){
        hor.textContent = "0" + hours;
        shor.textContent = "0" + hours;
    }else if(minutes < 10){
        min.textContent = "0" + minutes;
        smin.textContent = "0" + minutes;

    }else if(seconds < 10){
        seg.textContent ="0" + seconds;
        sseg.textContent = "0" + seconds;

    }

    //pegando ano e montando para retorna pro DOM.
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    yea.textContent = `${dia < 10 ? "0" + dia : dia }/${mes < 10 ? "0" + mes : mes}/${data.getFullYear()}`


    //chamando functions responsavel pela semana e o ano.
    sem.textContent = semans(data.getDay());
    getUserPosition()
}
setInterval(hours, 1000)

function semans(semana){
    
    switch(semana){
        
        case 0:
            return "DOM";
            break;
        case 1:
            return "SEG";
            break;
        case 2:
            return "TER";
            break;
        case 3:
            return "QUA";
            break;
        case 4:
            return "QUI"
            break;
        case 5:
            return "SEX";
            break;
        case 6: 
            return "SAB";
            break;
        default:
            return "";
    }

}

//function onde pega dados de uma api e traz pro dom.


//{API key}

function getUserPosition() {
    let url = ''
    navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude
    let long = pos.coords.longitude
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=134cac5417bfb1302386286079791c4c`
    fetchApi(url)
    })
}

function fetchApi(url){

    let city = document.getElementById("local_geometric");
    let temperature = document.getElementById("graus");
    let humidity = document.getElementById("qualidade_ar")

    let api = url;

    fetch(api).then((data) => {
    return data.json()
  
    })
    .then((data) => {
        //let tempInCelsius = ((data.main.temp-32) * (5/9)).toFixed(1);
        let temp = ((data.main.temp) - 273.15).toFixed(0)
        //cidade
        city.textContent = data.name
        temperature.textContent = "🌡" + temp
        humidity.innerHTML = `💧${data.main.humidity}%`
    })
    .catch((err) => {
        city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
        temperature.innerHTML = `-`;
    })
}
