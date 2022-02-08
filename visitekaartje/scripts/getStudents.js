getAndRenderData()
//postAndRenderData()

function getAndRenderData () {
    const getURL = 'https://tribe.api.fdnd.nl/v1/list'
    //const getURL = 'https://tribe.api.fdnd.nl/v1/member/25'
    fetch(getURL).then(response => response.json())
    .then(response => {
        console.log(response.data[4])
        const myName = response.data[4]

        document.querySelector('.name').insertAdjacentHTML('afterbegin',
        `<p>${myName.memberName + " "  + myName.memberSurname}</p>`)
        // response.data.forEach(member => {
        //     document.body.insertAdjacentHTML('beforebegin',`<p>${member.memberName}</p>`)
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
// }