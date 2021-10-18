const { register, login } = require("../database/users");

function index(url, data = {}, params = ""){
    if(url = "/register") register(data);
    if(url = "/login") {
        const result = login(data);
        return result;
    };
}

module.exports = {
    index
}