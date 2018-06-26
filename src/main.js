const usersData = '../data/cohorts/lim-2018-03-pre-core-pw/users.json'
const progressData = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json'
const cohortsData = '../data/cohorts.json'

//Creating a function where the url and the onload property are parameters
const getData = (url, onload) => {
//xmlhttprecuest es para volver la pagina asincrona
   let dataRequest = new XMLHttpRequest();
   dataRequest.open('GET', url);
   dataRequest.onload = onload;
   dataRequest.onerror = handleError;
   dataRequest.send();
};

//We declare the global object dataCohort, it's empty and will be fill when we call the data  
window.dataCohort = {}

const saveUsersData = (event) => {
   //jason son los datos con los que vamos a interactuar
   dataCohort.users = JSON.parse(event.target.responseText);
}

const saveProgressData = (event) => {
    //Saving progress data
   dataCohort.progress = JSON.parse(event.target.responseText);
}

const saveCohortsData = (event) => {
    //Saving cohorts data
   dataCohort.cohorts = JSON.parse(event.target.responseText);  
}

const handleError= () => {
 console.log('hay un error')
};


getData(usersData, saveUsersData);
getData(progressData, saveProgressData);
getData(cohortsData, saveCohortsData);

console.log(getData);