/* Global Variables */
const baseurl="http://api.openweathermap.org/geo/1.0/direct?q=";
const apikey="&appid=2048f6593105226a02893ef1be0ae191&units=imperial";
 const feelings=document.getElementById("feelings").value;
const limit ="&limit=10";

let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const gen=document.getElementById("generate");
gen.addEventListener("click",start,"false")
function start(){


    GetCord(baseurl,limit,apikey);
  
  
}


 const GetCord = async (baseURL, limit, key)=>{

  const zip=document.getElementById("zip").value;
  console.log(baseURL+zip+limit+key)
    const res = await fetch(baseURL+zip+limit+key)

    try {

      const data = await res.json();
      console.log(data)
      console.log(data[0].lat,data[0].lon)
   
      const SecondURL="https://api.openweathermap.org/data/2.5/weather?lat="
         getRealWeather(SecondURL,data[0].lat,data[0].lon,key)
   
    
    }  catch(error) {
    
      console.log("error", error);
    }
  }


const getRealWeather = async (baseURL, lat,lon, key)=>{

  console.log(baseURL+lat+lon+key)
    const res = await fetch(baseURL+lat+"&lon="+lon+key)

    try {

      const data = await res.json();
      console.log(data)

    
         postData("/addWeather",{temperature:data.main.temp,Date:newDate,Resp:document.getElementById("feelings").value});
     
    updateUI();
    }  catch(error) {
      
      console.log("error", error);
    }
  }




const postData = async ( url = '', data = {})=>{

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
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {

  const allData = await request.json()
  }
  catch(error) {
    console.log("error", error);
 
  }
}

const updateUI=async()=>{
  const request=await fetch('/all')
  try {
const alldata =await request.json();
document.getElementById("date").innerHTML=alldata.Date;
document.getElementById("temp").innerHTML=alldata.temperature;
document.getElementById("content").innerHTML=alldata.Resp;
  }
  catch(error){
console.log(error)
  }
}



