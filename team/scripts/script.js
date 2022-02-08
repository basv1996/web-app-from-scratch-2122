getAndRenderData()
// postAndRenderData()
function getAndRenderData () {
    //const getURL = 'https://tribe.api.fdnd.nl/v1/list'
    const getURL = 'https://api.punkapi.com/v2/beers'
    fetch(getURL).then(response => response.json())
    .then(response => {
        console.log(response)
        // response.data.forEach(member => {
        //     document.body.insertAdjacentHTML('beforebegin',`<p>${member.teams[2]}</p>`)
        // })
        response.map(beer => {
            document.body.insertAdjacentHTML('beforebegin', `<p>${beer.food_pairing}</p>`)
        })
    }).catch(error => document.body.insertAdjacentHTML('beforebegin', error))
}
// function postAndRenderData () {
//     const postURL = 'https://tribe.api.fdnd.nl/v1/member'
//     const options = {
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             squadId:1,
//             type:'docent',
//             nickname:'Faab',
//             name: 'Joost',
//             prefix:'',
//             surname:'Faber',
//             avatar:'',
//             githubHandle:'',
//             bio:'',
//             url:''
//         })
//     }
//     console.log(options)
//     fetch(postURL,options).then(response => response.json())
//     .then(data => {
//         console.log(data)
//     }).catch(err => {
//         console.log(err)
//     })
//}