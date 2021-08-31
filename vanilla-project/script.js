let continentNames = document.getElementById('continent-names')
let countryNames = document.getElementById('country-names')

fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
     query: `
     query{
        continents{
          code
          name
        }
      }
     `
    })
})

.then(data => data.json())
.then(results => {
    results.data.continents.forEach((cName) => {
        let option = document.createElement('option')
        option.value = cName.code
        option.innerText = cName.name
        continentNames.append(option)
    })
});

continentNames.addEventListener('change', getCountries(e.target.value))

function getCountries(continentCode){

}