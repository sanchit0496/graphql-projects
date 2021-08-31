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




continentNames.addEventListener('change', e => {
    let continentCode = e.target.value

    fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
         query: `
         query getCountries($code:ID!){
            continent(continentCode: $code){
                  countries {
                    name
                  }
                }
          }
        `, 
        }),
        variables: {
            code: continentCode
        },
    }).then(res => res.json())
    .then((result) => console.log(result))
    

    
    }
)


   