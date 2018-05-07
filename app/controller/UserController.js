var fs = require("fs");
var {render, renderWith} = require("../../boot/view")

function index(request, response){
    render("home", response)
}

exports.index = index;