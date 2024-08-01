const ccav = require('./ccavutil');
const qs = require('querystring');

exports.postReq = function (request, response) {
  const workingKey = '0FE75E3BE2B757339D6D20CD1A849CCD'; // 32-Bit key shared by CCAvenue.
  const accessCode = 'AVJD08LH37AB73DJBA'; // Access Code shared by CCAvenue.
  let encRequest = '';
  let formbody = '';
  
  request.on('data', function (data) {
    encRequest = ccav.encrypt(data.toString(), workingKey);
    formbody = `
      <form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
        <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
        <script language="javascript">document.redirect.submit();</script>
      </form>
    `;
  });
  
  request.on('end', function () {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(formbody);
    response.end();
  });
};
