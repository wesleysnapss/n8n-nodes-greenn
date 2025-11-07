const gulp = require('gulp');
const path = require('path');

// Tarefa para copiar ícones
gulp.task('build:icons', () => {
	return gulp
		.src('nodes/**/*.png')
		.pipe(gulp.dest((file) => {
			// Manter a estrutura de diretórios relativa a 'nodes/'
			const relativePath = path.relative(path.join(__dirname, 'nodes'), file.dirname);
			return path.join('dist', 'nodes', relativePath);
		}));
});

// Tarefa padrão
gulp.task('default', gulp.series('build:icons'));