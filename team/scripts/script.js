getAndRenderData()
// postAndRenderData()
function getAndRenderData () {
    const getURL = 'https://tribe.api.fdnd.nl/v1/list'
    // const getURL = 'https://api.punkapi.com/v2/beers'
    fetch(getURL).then(response => response.json())
    .then(response => {
        const team4 = response.data.filter(member => {
            //return member.teams[0].teamId
            //console.log(member.teams[0].teamId)
            teamNumbers = member.teams[0].teamId
            console.log(teamNumbers)   
           teamNumbers = Array()
              
        })



        // console.log(response)
        // response.data.map(member => {
        //     console.log("member: ", member.teams[0].teamId)
        //     document.body.insertAdjacentHTML('beforebegin',`<p>${member.teams}</p>`)
        // })


        // response.map(beer => {
        //     document.body.insertAdjacentHTML('beforebegin', `<p>${beer.food_pairing}</p>`)
        // })
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