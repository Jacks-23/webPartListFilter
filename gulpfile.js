'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

let tailwindBuild = build.subTask('build-tailwind', (gulp, buildOptions, done) => {
  const postcss = require('gulp-postcss');

  gulp.src(`${buildOptions.srcFolder}/tailwind.css`)
    .pipe(postcss([
      require('tailwindcss')('./tailwind.config.js'),
      require('gulp-autoprefixer')
    ]))
    .pipe(gulp.dest(buildOptions.libFolder));

  done();
});

build.rig.addPostBuildTask(tailwindBuild);

build.initialize(require('gulp'));
