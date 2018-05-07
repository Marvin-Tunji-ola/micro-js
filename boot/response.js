function response (content, response, status = 200, header={"Content-Type": "*"}){
    response.writeHead(status, header);
    response.write(content);
    response.end();
}

exports.response = response;