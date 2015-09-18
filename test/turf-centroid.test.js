var test = require('tape');
var centroid = require('turf-centroid');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

test('./turf-centroid.js --version', function(t) {
    exec(__dirname + '/../turf-centroid.js --version', function(err, stdout, stderr) {
        t.equals(stdout, require('../package.json').version+'\n', 'prints version');
        t.notok(stderr, 'no errors');
        t.end();
    });
});

test('./turf-centroid.js -v', function(t) {
    exec(__dirname + '/../turf-centroid.js --version', function(err, stdout, stderr) {
        t.equals(stdout, require('../package.json').version+'\n', 'prints version');
        t.notok(stderr, 'no errors');
        t.end();
    });
});

test('./turf-centroid.js --help', function(t) {
    exec(__dirname + '/../turf-centroid.js --help', function(err, stdout, stderr) {
        t.ok(stdout.match(/Usage/), 'Usage category');
        t.notok(stderr, 'no errors');
        t.end();
    });
});


test('./turf-centroid.js fixtures/polygons.geojson', function(t) {
    exec(__dirname + '/../turf-centroid.js /' + path.join(__dirname, '/fixtures/polygons.geojson'), function(err, stdout, stderr) {
        t.equals(stdout, '{ "type": "FeatureCollection", "features": [{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.60693359375,37.998442573067855]},"properties":{}},\n{"type":"Feature","geometry":{"type":"Point","coordinates":[-76.307373046875,40.21932610779005]},"properties":{}}]}\n');
        t.notok(stderr, 'no errors');
        t.end();
    });
});

test('cat | ./turf-centroid.js', function(t) {
    exec('cat ' + path.join(__dirname, '/fixtures/polygons.geojson') + ' | ' + __dirname + '/../turf-centroid.js', function(err, stdout, stderr) {
        t.notok(stderr, 'no errors');
        t.equals(stdout, '{ "type": "FeatureCollection", "features": [{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.60693359375,37.998442573067855]},"properties":{}},\n{"type":"Feature","geometry":{"type":"Point","coordinates":[-76.307373046875,40.21932610779005]},"properties":{}}]}\n');
        t.end();
    }); 
});
