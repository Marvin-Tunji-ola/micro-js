var fs = require("fs");
var {render, renderWith} = require("../../boot/view")

function index(request, response){
    render("home", response)
}

function about(request, response){
    console.log(request)
    renderWith("about", "status", "Completed", response)
}

exports.index = index
exports.about = about