const log = require('..')

const record = [{
  topic: 'open',
  fulfill: true
}, {
  topic: 'menu',
  fulfill: true,
  value: {
    version: 'v3F'
  }
}, {
  topic: 'selftest',
  fulfill: false,
  value: {
    VREF: {value: '3.30'},
    VBAT: {value: '3.77'},
    VCAP: {value: '4'},
    WST: {value: '5'},
    WOS: {value: '4'},
    MAG: {value: 'inactive'},
    IGNR: {value: 'good'}
  }
}, {
  topic: 'configure',
  fulfill: true,
  value: {
    g: 200, n: 99, m: 200, k: 0, p: 4, d: 5, l: 6, f: 4, u: 1, v: 2
  }
}, {
  topic: 'arm',
  fulfill: false
}]

log(record, __dirname)

