var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

var paths = {
	scripts: ["src/js/**"]
};

gulp.task("browserify", function() {
	browserify()
	.add("./src/js/index.js")
	.bundle()
	.pipe(source("index.js"))
	.pipe(gulp.dest("www/js"));
});

gulp.task('default', ["browserify"], function() {
  gulp.watch(paths.scripts, ['browserify']);
});