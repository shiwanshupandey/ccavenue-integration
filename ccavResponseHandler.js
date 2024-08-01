const ccav = require('./ccavutil');
const qs = require('querystring');

exports.postRes = function (request, response) {
  const workingKey = 'YOUR_WORKING_KEY'; // 32-Bit key shared by CCAvenue.
  let ccavEncResponse = '';
  let ccavResponse = '';
  
  request.on('data', function (data) {
    ccavEncResponse += data;
    const ccavPOST = qs.parse(ccavEncResponse);
    const encryption = ccavPOST.encResp;
    ccavResponse = ccav.decrypt(encryption, workingKey);
  });
  
  request.on('end', function () {
    let pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>';
    pData += ccavResponse.replace(/=/g, '</td><td>').replace(/&/g, '</td></tr><tr><td>') + '</td></tr></table>';
    const htmlcode = `
      <html>
        <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head>
        <body><center><font size="4" color="blue"><b>Response Page</b></font><br>${pData}</center><br></body>
      </html>
    `;
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(htmlcode);
    response.end();
  });
};
