var fs = require("fs");
var {response} = require('./response')

function render(view, res){
    if(viewExist(view).exists){
        console.log("Rendering:: " + viewExist(view).path);    
        var content = fs.readFileSync(viewExist(view).path);
        response(content, res)
    }else{
        error(`View: "${view}" not found`, res)
    }
}

function error(message, res){
    renderWith("error", "error", message, res)
 }

function renderWith(view, key, value, res){
    //try-catch for file read operation block
        const checkView = viewExist(view)
        var content = null;

        if(checkView.exists){
            console.log("Rendering:: " + viewExist(view).path);    
            content = fs.readFileSync(checkView.path);
            if(key && value){
                if(content.indexOf("<script>") >= 0)
                content =  content.toString().replace("<script>",`<script> var ${key} = "${value}"` )
                else if(content.indexOf("<script") >= 0)
                content =  content.toString().replace("<script",`<script> var ${key} = "${value}"</script><script` )                
                else
                content = content.toString().concat(`<script> var ${key} = "${value}" </script>` )
            }
            
            response(content, res)
        }else 
            error(`View not found :: \'${view}\'`, res)

} 

function viewExist(view){
    var app = require("./app")
    var paths = app.paths.views;

    let fullPath = null
    let exists = {exists: false, path:fullPath} 
    for(path of paths){
        fullPath = `${path}${view}.html`; 
        if(fs.existsSync(fullPath)){
            exists = {exists: true, path:fullPath}
            break;
        }
    }
  return exists
}

exports.viewExist = viewExist;
exports.renderWith = renderWith;
exports.render = render;
exports.viewError = error;