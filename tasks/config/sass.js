module.exports = function(grunt) {

	grunt.config.set('sass', {
		dev: {
			files: [{
				expand: true,
				cwd: 'sources/scss/',
				src: ['app.scss'],
				dest: '.tmp/public/styles/',
				ext: '.css'
			}],
			options: {
				loadPath: "sources/scss"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
};
