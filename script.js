let tempfield = document.querySelector('.magnitude');
let tempSelect = document.querySelector('.tempSelector')
let timefield = document.getElementById('time');
let locfield = document.getElementById('loc');
let weatherfield = document.querySelector('.weather');
let searchField = document.querySelector('.search_field');
const formfield = document.querySelector('form');
let targetLoc = ''
let flag = 'celcius'

formfield.addEventListener('submit', searchForloc) 
tempSelect.addEventListener('submit', tempSelector)

const fetchResult = async (targetLoc) => {
    try{
        let url =`http://api.weatherapi.com/v1/current.json?key=634652e0e97d49fd800182407242408&q=${targetLoc}&aqi=no`
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
    
        let locName = data.location.name
        // if (flag == 'celcius'){
            let tempLoc = data.current.temp_c
        // }
        // else{
        //     let tempLoc = data.current.temp_f
        // }    
        let time = data.location.localtime
        let cond = data.current.condition.text
        updateValue(tempLoc,locName,time,cond)
    }
    catch(error){
        updateIfError()
    }
}

function updateValue(temp,loc,time,weather){
    tempfield.innerText = temp
    timefield.innerText = time
    locfield.innerText = loc
    weatherfield.innerText = weather
}
function updateIfError(){
    tempfield.innerText = 'Oops, location not found'
    timefield.innerText = ''
    locfield.innerText = ''
    weatherfield.innerText = ''
}
function searchForloc(e){
    e.preventDefault()
    target = searchField.value
    fetchResult(target)
    searchField.value= ''
}
function tempSelector(){
    if (flag == 'celcius'){
        flag = 'farenheit'
    }
    else{
        flag = 'celcius'
    }
}
fetchResult(target)