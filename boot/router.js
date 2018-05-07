// var controller = require('../app/controller')
var app = require('../boot/app')
var fs = require('fs')
let {extname} = require('path')
var {response} = require('./response')
var {render} = require('./view')



function router(pathname, req, res) {
    console.log("Processing Request:: " + pathname);
    var routes = JSON.parse(
      fs.readFileSync("./app/web.json")
    );
    const checkFile = fileExists(pathname);

    if (routes[pathname]) {
    
      var controller = routes[pathname].controller
      resolveController(controller, req, res)
      
    
    }else if(checkFile.exists && pathname !== `/`){

      var ext = extname(checkFile.path).slice(1)
      var content = fs.readFileSync(checkFile.path);
      response(content, res, 200, {"Content-Type": `text/${ext}`} )

    }else{
      console.log("No request handler found for " + pathname);
      render(404, res)
    }
}

function resolveController(controller, req, res){
    var {viewError} = require("./view")
    controller = controller.toString();
    index = controller.indexOf('@');
    if(index > 0){
        file = controller.slice(0, index)
        method = controller.slice(index+1)
        try{
          var controller = require(`../app/controller/${file}`)      
        }catch(e){
          return viewError(`Controller '${file}' not found in '../app/controller/'`, res)
        }
        return controller[method](req, res)
    }
    return viewError(`Controller Field Not Set Correctly:: ${controller}`, res)
}

function fileExists(relativePath){
  var app = require("./app")
  var paths = app.paths.public;

  let fullPath = null
  let exists = {exists: false, path:fullPath} 
  for(path of paths){
    fullPath = `${path}${relativePath.slice(1)}`; 
    if(fs.existsSync(fullPath) && !fs.statSync(fullPath).isDirectory()){
      exists = {exists: true, path:fullPath}
      break;
    }
  }
  return exists
}
  
exports.router = router;