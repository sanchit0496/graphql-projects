fetch('https://countries.trevorblades.com/')
.then(x => x.json())
.then(y => console.log(y));