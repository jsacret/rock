module.exports.cacheman = {
  driver: 'memory',
  
  memory: {
    engine: 'cacheman-memory'
  },
  cache: new (require('cacheman'))('Rocks'),
}
