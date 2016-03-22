var fs = require('fs')
  , express = require('express');


module.exports = function(app) {
  
  var router = express.Router();
  
  // Filesystem middleware helper
  router.use(function(req, res, next){
    
    req.path = req.query.path || app.get('public');

    fs.stat(req.path, function(err, stats){
      if(err) return next(err);
      if(!stats.isDirectory()) return next(new Error("Directory not found"));
      fs.readdir(req.path, function(err, files){
        if(err) return next(err);
        req.files = files;
        next();
      })
    });
    
  });
  
  router.get('/', function(req, res, next) {

    var files = req.files;

    // what should dimensions be for a given # of files to make a "square like" shape?
    function getArrayDimensions(length) {
      x = Math.round(Math.sqrt(length));
      y = Math.ceil(Math.sqrt(length)); // this makes our boxes err on being "taller"
      return { columns: x, rows: y };
    }
  
    var files_array_dimensions = getArrayDimensions(files.length);
    console.log(files_array_dimensions);

    var rows = files_array_dimensions['rows'];
    var columns = files_array_dimensions['columns'];

    var FILE_BOX_WIDTH = 1;
    var FILE_BOX_BORDER = 0.5;

    // create the "bounding" box to hold files based on dimensions
    bounding_box_width = columns * FILE_BOX_WIDTH + ((columns + 1) * FILE_BOX_BORDER); // 3 cols: 3 + 4*.5 = 5
    bounding_box_depth = rows * FILE_BOX_WIDTH + ((rows + 1) * FILE_BOX_BORDER); //
    //
    console.log("Bounding box Width: " + bounding_box_width + " Depth: " + bounding_box_depth);

    var topleft_pos = { x: bounding_box_width / -2, y: 0, z: bounding_box_depth / -2 };

    var files_array = [];
    for(var i = 0; i < rows; i++) {

      var row = [];
      for(var j = 0; j < columns; j++) {
        if (files.length > 0) {
          filename = files.pop();
          var column = { filename: filename, dir: (filename.indexOf('.') === -1) };
          row.push(column);
        }
      };

      files_array.push(row);
    };

    res.render('fsn.html', {
      files_array: files_array,
      rows: rows,
      columns: columns,
      FILE_BOX_WIDTH: FILE_BOX_WIDTH,
      FILE_BOX_BORDER: FILE_BOX_BORDER,
      FILE_BOX_DELTA: FILE_BOX_WIDTH + FILE_BOX_BORDER,
      bounding_box_width: bounding_box_width,
      bounding_box_depth: bounding_box_depth,
      topleft_pos: topleft_pos,
      req_query_path: req.query.path,
      path: req.path});
  });
  
  return router;
  
}