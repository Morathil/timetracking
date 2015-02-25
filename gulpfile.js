var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");

var paths = {
	scripts: ["src/js/**/*"],
	vendor: ["src/vendor/**/*"],
	statics: ["src/*.html", "src/img/**/*", "src/css/**/*"]
};

gulp.task("vendor", function() {
	gulp.src(paths.vendor)
	.pipe(plugins.concat("vendor.js"))
	.pipe(gulp.dest("www/vendor"));
});

gulp.task("statics", function(){
	gulp.src(paths.statics, {base: "src"})
	.pipe(gulp.dest("www"));
});

gulp.task("browserify", function() {
	browserify()
	.add("./src/js/index.js")
	.transform(reactify)
	.bundle()
	.pipe(source("index.js"))
	.pipe(gulp.dest("www/js"))
});

gulp.task("default", ["vendor", "statics", "browserify"], function() {
	gulp.watch(paths.scripts, ["browserify"]);
	gulp.watch(paths.vendor, ["vendor", "browserify"]);
	gulp.watch(paths.statics, ["statics", "browserify"]);
});