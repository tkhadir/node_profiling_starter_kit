let register = () => {
    let username = $("#register-username").val()
    let password = $("#register-password").val()
    let confirmation = $("#confirm-password").val()

    if (password !== confirmation) {
        alert('password must be equal to confirmation')
    } else {
        let options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:3000/register?username=' + username + '&password=' + password, options)
        .then(response => {
            alert('registration done')
        })
        .catch(error => {
            console.error(error)
            alert('an error occcured during fetchall : ' + error)
        })
    }
}

let login = () => {
    let username = $("#login-username").val()
    let password = $("#login-password").val()

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('http://localhost:3000/auth?username=' + username + '&password=' + password, options)
    .then(response => {
            alert('login done')
    })
    .catch(error => {
            console.error(error)
            alert('an error occcured during fetchall : ' + error)
    })
}

$("#register-form" ).submit(function(event) {
    register()
    event.preventDefault()
})
$("#login-form" ).submit(function(event) {
    login()
    event.preventDefault()
})