let continentNames = document.getElementById('continent-names')
let countryNames = document.getElementById('country-names')


queryFetch(
    `
  query {
    continents {
      name
      code
    }
  }
`, {}
)
.then(results => {
    results.data.continents.forEach((cName) => {
        let option = document.createElement('option')
        option.value = cName.code
        option.innerText = cName.name
        continentNames.append(option)
    })
});




continentNames.addEventListener('change', async e => {
    let continentCode = e.target.value
    let allCountry = await theCountries(continentCode)
    allCountry.forEach((country) => {
        countryNames.innerHTML += country.name
    })
    
})


function theCountries(continentCode){
    return queryFetch(
        `
        query getCountries($code: ID!) {
            continent(code: $code) {
              countries {
                name
              }
            }
          }
        `, {code: continentCode}
    ).then((data) => {return data.data.continent.countries})
}



//query boilerplate for the data fetching into JSON format
function queryFetch(query, variables){
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            query: query,
            variables: variables
        })
    }).then(res => res.json())
}
