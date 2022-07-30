
function setStatusRenderError(res, statusCode, message) 
{
    res.status(statusCode);
    res.render('errors', 
    {
      message
    });
}
  
  module.exports = {
    setStatusRenderError
  };