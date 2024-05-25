const userToken = localStorage.getItem('user_token')
console.log('authentication', userToken)

if(!userToken) {
    window.location.replace('./user/login.html')
}