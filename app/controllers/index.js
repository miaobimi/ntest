

// index page
exports.index = function(req, res) {

  res.render('index', {
    title: 'imooc 首页'
  })
}