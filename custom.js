const inputSerch = document.querySelector(".inputSerch");
const serchBtn = document.querySelector(".serchBtn");
const TextWarning = document.querySelector(".TextWarning");
const countries = document.querySelector(".countries");


//* returned template 
function renderData(data) {
    const Card = `<div class="col-lg-4 col-md-6 col-sm-12 p-3  mx-auto">
                <div class="col-lg-10 ">
                    <div class="card" style="width:400px">
                        <img style="width:100%" class="card-img-top img-fluid" src=" ${data.flags.svg} ">
                        <div class="card-body">
                        <h4 class="card-title">${data.name.official}</h4>
                        <p class="card-text">${data.region}</p>
                        <ul style="list-style: none;">
                            <li>POP :${(+data.population / 1000000).toFixed(1)}  Million </li>
                            <li>LANG :${Object.values(data.languages)[0]} </li>
                            <li li > CUR :${Object.values(data.currencies)[0].name} </li >
                        </ul>
                        </div>
                    </div>
                </div>
            </div>`;
    countries.insertAdjacentHTML(`beforeend`, Card);
}

//* connect api and get data 

serchBtn.addEventListener('click' , function () {
    const Search = inputSerch.value
    if (Search) {

       
        function GetCountry(Search) {
            const Request = fetch(`https://restcountries.com/v3.1/name/${Search}`)
                .then(response => response.json())
                .then(data => {

                    renderData(data[0]);
                        
                    const neighbours = data[0].borders[1];                            
                        if (!neighbours) return;

                        return fetch(`https://restcountries.com/v3.1/alpha/${neighbours}`)
                  
                })
                .then(response => response.json())
                .then(NeighbourData => {
                    renderData(NeighbourData[0], 'neighbours')
                }).catch(error => TextWarning.textContent = ` oops  ${error.message} `)
                
        }
        GetCountry(Search)
        inputSerch.value = ""


    }

})












// function GetCountries(country) {
    
//     const countries = document.querySelector(".countries");

//     const Request = new XMLHttpRequest();
//         Request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//         Request.send()
    
//     Request.addEventListener('load', function () {
        
//         const [data] =JSON.parse(this.responseText);
//         console.log(data);
     
//         const Card = `<div class="col-lg-4 col-md-6 col-sm-12 p-3  mx-auto">
//                 <div class="col-lg-10 ">

//                     <div class="card" style="width:400px">
//                         <img class="card-img-top img-fluid" src="${data.flags.png}" alt="Card image" style="width:100%">
//                         <div class="card-body">
//                         <h4 class="card-title">${data.name.official}</h4>
//                         <p class="card-text">${data.region}</p>
//                         <ul style="list-style: none;">
//                             <li>POP :${(+data.population / 1000000 ).toFixed(1)}  Million </li>
//                             <li>LANG :${Object.values(data.languages)[0]} </li>
//                             <li li > CUR :${Object.values(data.currencies)[0].name} </li >
//                         </ul>
//                         </div>
//                     </div>

//                 </div>
//             </div>`;


//         countries.insertAdjacentHTML(`beforeend`, Card);

//     })
  


// }


// GetCountries("usa")


