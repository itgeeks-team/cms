module.exports = function(req, res, next){
  req.viewData = {};
  if (req.xhr === true) {
    req.viewData.view = req.param("view");
  } else {
    req.viewData.view = "layout";
  }
  next();
};
