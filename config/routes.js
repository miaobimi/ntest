var Index = require('../app/controllers/index')
var Vedio = require('../app/controllers/vedio')

module.exports = function(app) {

  // Index
  app.get('/', Index.index)

  //vedio
  app.get('/vedio',Vedio.index)
}