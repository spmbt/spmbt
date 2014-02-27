// Обязательная обёртка
module.exports = function(grunt){ // Задачи

    grunt.task.registerTask('help', 'Output help.txt', function(){ //var help = grunt.file.read('help.txt');
        var help ='\
===============================================================================\n\
      ИНСТРУМЕНТ для сборки javascript-проектов портала MTS: GRUNT\n\
\n\
  Управление выполняется с помощью нескольких коротких команд, именуемых \n\
      задачами. Домашняя страница инструмента: http://gruntjs.com/\n\
\n\
      ОПИСАНИЕ\n\
  Одним словом: автоматизация. Минимизация повседневных операций,\n\
  повторяющихся изо дня в день.\n\
\n\
      ЗАДАЧИ для проекта "portal-mts"\n\
\n\
  > grunt build  --  сборка портала. Убедитесь, что   /src/webapp/   содержит\n\
      необходимую версию проекта, а номер версии вписан в /build/package.json;\n\
  > grunt afterBuild  --  досборка  портала,  если  она  прервана из-за\n\
      невозможности удаления папки /OUT. Обеспечьте возможность удаления /OUT\n\
      (это бывает в Windows, если другой процесс удерживает файлы - редактор,\n\
      менеджер файлов, Word) и продолжайте сборку этой командой.\n\
  > grunt watchSass  -- (для разработчиков) - компиляция редактируемых файлов\n\
      /scss/*.scss в /css/*.css "на лету"; при старте - начальная компиляция;\n\
  > grunt clean  --  удалить все сгенерированные сборщиком файлы;\n\
  > grunt help или просто > grunt  --  вывод данного сообщения.\n\
===============================================================================\n';
        grunt.log.write(help);
    });

    var packageJson = grunt.file.readJSON('package.json'),
        NOWforFile = grunt.template.today("-yyyy-mm-dd_HH.MM"),
        NOW = grunt.template.today("dd.mm.yyyy HH:MM:ss"),
    h ={
        pkg: packageJson,

        meta: {
            // общая информация для сборки
            paths: {
            //вход
                src: '../src/webapp',
                res: '/resources/makeup',
                srcJs: '<%= meta.paths.src %>/js/fw',
                srcJsLib: '<%= meta.paths.src %>/js/libs',
                srcApp: '<%= meta.paths.src %>/js/app',
                srcImg: '<%= meta.paths.src %><%= meta.paths.res %>/images',
                srcCss: '<%= meta.paths.src %><%= meta.paths.res %>/scss',
            //для временных файлов
                tmp: '../tmp', //существует на время сборки, остаётся только при аварийных завершениях
                js: '<%= meta.paths.tmp %>/js/fw',
                jsLib: '<%= meta.paths.tmp %>/js/libs',
                app: '<%= meta.paths.tmp %>/js/app',
                img: '<%= meta.paths.tmp %><%= meta.paths.res %>/images',
                css: '<%= meta.paths.tmp %><%= meta.paths.res %>/css',
                cssWatch: '<%= meta.paths.src %><%= meta.paths.res %>/css',
            //выход
                out: '../OUT',
                doc: '<%= meta.paths.out %>/doc',
                portal: '/portals',
                outPort: '<%= meta.paths.out %><%= meta.paths.portal %>'
            },

            banners: {
                versionDate: '/*! ' +
                    '<%= pkg.name %>(<%= pkg.homepage %>) ' +
                    '- v<%= pkg.version %> ' +
                    '- <%= grunt.template.today("dd.mm.yyyy HH:MM:ss") %>' +
                    ' */'
            }
        },

        clean: {
            options: {
                force: true //для стирания за пределами рабочего каталога
            },
            out: '<%= meta.paths.out %>',
            tmp: '<%= meta.paths.tmp %>'
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.srcImg %>',
                    src: '**',
                    dest: '<%= meta.paths.img %>'
                },{
                    expand: true,
                    cwd: '<%= meta.paths.srcJsLib %>',
                    src: '**',
                    dest: '<%= meta.paths.jsLib %>'
                },{
                    expand: true,
                    cwd: '<%= meta.paths.src %>',
                    src: '*.html',
                    dest: '<%= meta.paths.tmp %>'
                }]
            },
            settings: { //переписать на несжатые файлы с комментариями
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.srcApp %>/settings',
                    src: '**',
                    dest: '<%= meta.paths.app %>/settings'
                }]
            },
            portals: { //--шаблон и действующая - на столько копий портала, сколько папок в /env
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.tmp %>',
                    src: '@',
                    dest: '<%= meta.paths.outPort %>'
                },{
                    expand: true,
                    cwd: '<%= meta.paths.src %>/env',
                    src: 'settings.js',
                    dest: '<%= meta.paths.outPort %>'
                }]
            }
        },

        groundskeeper: {
            compile: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.srcJs %>',
                    src: '**/*.js',
                    dest: '<%= meta.paths.js %>'
                },{
                    expand: true,
                    cwd: '<%= meta.paths.srcApp %>',
                    src: '**/*.js',
                    dest: '<%= meta.paths.app %>'
                }],
                options: {  // this options only affect the compile task
                    //console: !true, // remove console statements by default and if is false
                    //debugger: !true, // remove debugger statements
                    pragmas: ['development'], // don't remove pragmas such as //<development>\n...\n\n...//</development>
                    namespace: ['App.logger'], // Remove functions that live inside the App.logger namespace
                    replace: '/*==DEL==*/' // Replace removed statements for the given string (note the extra quotes)
                }
            }
        },

        uglify: { // Сжимаем
            main: {
                options: {
                    banner: '<%= meta.banners.versionDate %>',
                    separator: ';'
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.js %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.paths.js %>'
                },{
                    expand: true,
                    cwd: '<%= meta.paths.app %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.paths.app %>'
                },{
                    expand: true,
                    cwd: '<%= meta.paths.src %>/js',
                    src: ['loader.js'],
                    dest: '<%= meta.paths.tmp %>/js'
                }]
            }
        },

        yuidoc: { // Сборка документации с помощью yuidoc (в /OUT)
            compile: {
                name: '<%= pkg.name %>',
                version: '<%= pkg.version %>',
                description: '<%= pkg.description %>',
                homepage: '<%= pkg.url %>',
                logo: '<%= pkg.logo %>',
                options: {
                    paths: ['<%= meta.paths.srcJs %>'],
                    outdir: '<%= meta.paths.doc %>',
                    linkNatives: true,
                    attributesEmit: true,
                    selleck: true,
                    helpers: ['./path.js'],
                    themedir: 'yuidoc_theme/'
                }
            }
        },

        sass: {
            build: { //для сборки порталов
                options: {
                    style: 'compressed',
                    unixNewlines: true,
                    banner: '<%= meta.banners.versionDate %>'
                    //sourcemap: true //no if "banner"
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.srcCss %>',
                    src: ['*.scss'],
                    dest: '<%= meta.paths.css %>',
                    ext: '.css'
                }]
            },
            watchStart: { //для сборки порталов
                options: {
                    style: 'expanded',
                    unixNewlines: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.srcCss %>',
                    src: ['*.scss'],
                    dest: '<%= meta.paths.cssWatch %>',
                    ext: '.css'
                }]
            },
            one: { // --шаблон и рабочая задача для отслеживания изменений--
                options: {
                    style: 'expanded',
                    unixNewlines: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.paths.srcCss %>',
                    src: [], //--важно, что пустой массив (ничего не делает, только rename)
                    dest: '<%= meta.paths.cssWatch %>',
                    ext: '.css',
                    rename: function(dest, src){
                        console.log('=='+ sassAction +'== ', sassPath);
                        return dest +'/'+ ((sassPath.match(/([^/\\]+)$/)||[])[1] || '__unknown.css').replace(/scss$/,'css');
                    }
                }]
            }
        },
        compress: { // --шаблон
            portal: {
                options: {
                    archive: '<%= meta.paths.outPort %>/(patt).zip'
                },
                files: [{
                    src: '<%= meta.paths.outPort %>/*.*'
                }]
            }
        },
        watch: {
            css: { // --шаблон, для изменений файлов sass--
                files: '<%= meta.paths.srcCss %>/*.scss',
                tasks: ['sass:one'],
                options: {
                    debounceDelay: 2000,
                    livereload: true,
                    spawn: false
                }
                //TODO создание и удаление файлов *.scss (перезапускать Grunt)
            },
            globalSass: { //чтобы заменять все файлы CSS и учесть последствия замены общего файла
                files: '<%= meta.paths.srcCss %>/_global.scss',
                tasks: ['sass:watchStart'],
                options: {
                    debounceDelay: 2000,
                    livereload: true
                }
            }
        }
    };
    //подготовка слежения за sass
    var $x = function(el, h){if(h) for(var i in h) el[i] = h[i]; return el;}; //===extend===

    var fs = require('fs'); //======работаем с файлами и путями перед тем как запустить Grunt======

    var portalDirs = fs.readdirSync(h.meta.paths.src +'/env'); // read number of directories in h.meta.paths.src
    //--(для списка выходных каталогов и имён архивов)
    for(var i = portalDirs.length -1; i >=0; i--){ //попытка найти скрытые каталоги в списке (успешность может зав. от ОС)
        var pI = portalDirs[i];
        if(/^\./.test(pI) )
            pI.splice(i, 1);
    }

    var sasS = fs.readdirSync(h.meta.paths.src + h.meta.paths.res +'/scss'); //путь к файлам sass
    for(var i in sasS){ //сформировать список слежения за файлами sass
        var sI = sasS[i]; if(sI){
        if(/_global/.test(sI) || !/\.s[ca]ss$/.test(sI) ) //удаление неотслеживаемых файлов (*_global*.scss следится по другим правилам)
            sasS.splice(i, 1);
        else
            sasS[i] = sI.replace(/\.s[ca]ss$/,'');
    }} //console.log(sasS)
    var composeSassWatch = function(){ //группа настроек слежения за каждым файлом. Чтобы менялся только тот файл, где произошло изменение
        for(var i in sasS){ var sI = sasS[i]; if(sI){
            if(!sI) continue;
            h.watch[sI] = {};
            h.watch[sI].files = h.watch.css.files.replace(/\*/, sI); //за каким файлом
            h.watch[sI].tasks = ['sass:'+ sI]; //подзадача перекодирования в CSS
            $x(h.watch[sI].options ={}, h.watch.css.options); //(подсписок)

            h.sass[sI] = {options:{}, files:[]}; //задача изменения файла SCSS в CSS
            $x(h.sass[sI].options, h.sass.one.options);
            $x(h.sass[sI].files[0] ={}, h.sass.one.files[0]);
            h.sass[sI].files[0].src = [sI +'.scss']; //для какого файла задача
        }}
    };
    composeSassWatch();

    var composeCopies = function(){ //копирование каждого портала
        var files = h.copy.portals.files;
        for(var i in portalDirs){ var pI = portalDirs[i]; if(pI){  // папка /tmp в /portals/<имя_портала>
            files.push($x({}, files[0]) );
            var filesLast = files[files.length -1];
            filesLast.cwd = files[0].cwd;
            filesLast.src = files[0].src.replace(/@/,'**');
            filesLast.dest = files[0].dest +'/'+ pI;
        }}
        for(var i in portalDirs){ var pI = portalDirs[i]; if(pI){  // папка /env/<имя_портала> в /portals/<имя_портала>
            files.push($x({}, files[1]) );
            var filesLast = files[files.length -1];
            filesLast.cwd = files[1].cwd +'/'+ pI;
            filesLast.dest = files[1].dest +'/'+ pI;
        }}
    };
    composeCopies();

    var composeArchives = function(){ //архивирование каждого портала
        for(var i in portalDirs){ var pI = portalDirs[i]; if(pI){
            h.compress[pI] = {options:{}, files:[]};
            h.compress[pI].options.archive = h.compress.portal.options.archive.replace(/\(patt\)/,
                packageJson.name
                    +'-'+ packageJson.version
                    +'-'+ pI); //позже вставляется дата коммита после pI
            h.compress[pI].files.push({
                src: h.compress.portal.files[0].src.replace(/\*\.\*/, pI +'/**')
            } ); //брать соотв. каталог
        }}
        delete h.compress.portal; //console.log(packageJson)
    };
    composeArchives();


    grunt.initConfig(h); //========================== initConfig() ====================================

    var sassPath, sassAction;
    grunt.event.on('watch', function(action, filepath, target) {
        //grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
        sassPath = filepath;
        sassAction = action;
    });

    var commitDate ='0'; //Unix format
    grunt.task.registerTask('versionJson','Описание сборки из Git', function(ret){
        var done = this.async(),
            exec = require('child_process').exec,
            complete = 0, //счёт условия завершения сбора данных для version.json
            completes = 3, //количество exec-вызовов
            branch,
            gitDescribe;
        function writeVersionJson(branch, gitDescribe){ // формирование файла version.json в портале
            var objectVersion ={
                    version: grunt.config('pkg.version'),
                    date: NOW,
                    gitBranch: branch,
                    gitDescribe: gitDescribe,
                    commitDate: grunt.template.date(commitDate *1000, 'yyyy-mm-dd, hh:mm:ss')
                };
            for(var i in portalDirs){ var pI = portalDirs[i]; if(pI){ //разбрасывание version.json по порталам
                grunt.file.write(
                    grunt.config('meta.paths.outPort') +'/'+ pI +'/version.json',
                    JSON.stringify($x(objectVersion, {env: pI}), null,'    ')
                );
            }}
        }
        function checkCompleteExec(force){ //если завершён набор параметров или force - записать version.json
            if(!force)
                complete++;
            if(force || completes == complete){
                writeVersionJson(branch, gitDescribe);
                done(force ? false : undefined);
            }
        }
//эти копипейсты я бы поставил циклом или вообще одним запросом, как уже сделано в коммите d8fb30833a00ef4ee56cd665f7969371b78edb4b
        exec('git rev-parse --abbrev-ref HEAD', function(err, stdout){ //из Git: текущая ветвь - ? version.json
            if(!err)
                branch = stdout.replace(/\r?\n$/,'');
            else
                grunt.log.error('Ошибка: команда git rev-parse не выполнена.');
            checkCompleteExec(err);
        });

        exec('git describe --long', function(err, stdout){ //вывод информации о Git (describe) в version.json
            if(!err)
                gitDescribe = stdout.replace(/\r?\n$/,'');
            else
                grunt.log.error('Ошибка: команда git describe не выполнена.');
            checkCompleteExec(err);
        });

        exec('git show -s --format="%ct"', function(err, stdout){ //из Git: дата последнего коммита
            if(!err)
                commitDate = stdout.replace(/\r?\n$/,'');
            else
                grunt.log.error('Ошибка: команда git show не выполнена.');
            checkCompleteExec(err);
        });
    });

    grunt.task.registerTask('renameCompressed','дописываем дату коммита в имена архивов',function(){
        for(var i in portalDirs){ var pI = portalDirs[i]; if(pI){
            var ext = (grunt.config('compress.'+ pI +'.options.archive').match(/\.(\w+)$/)||[0,''])[1], //расширение архива (zip, tar, etc.)
                oldPath = grunt.config('meta.paths.outPort') +'/'+ packageJson.name +'-'+ packageJson.version +'-'+ pI +'.'+ ext;
            fs.renameSync(oldPath,
                oldPath.replace(RegExp('\\.'+ ext +'$'), grunt.template.date(commitDate *1000,'-yyyy-mm-dd_hh.mm') +'.'+ ext ) );
        }}
    });

    // сборка проекта
    var afterBuild;
    grunt.registerTask('build',[
        'clean:tmp', //контрольная очистка
        'copy:main',
        'groundskeeper',
        'uglify',
        'sass:build',
        'copy:settings'
    ].concat(afterBuild =[
        'clean:out',
        'copy:portals',
        'versionJson',
        'yuidoc',
        'compress',
        'renameCompressed',
        'outInfoAboutBuild',
        'clean:tmp'
    ]) );
    grunt.registerTask('afterBuild', afterBuild); //досборка порталов, если сразу не удалось стереть /OUT

    grunt.registerTask('default',['help']); // задача по умолчанию

    grunt.registerTask('watchSass', ['sass:watchStart','watch']); //отработка изменений sass-файлов (для разработчиков)

    // вывод информации о сборке
    grunt.task.registerTask('outInfoAboutBuild', 'Output information about build', function(){ //TODO нет инфы об успешности
        var info = '\n' +
            '================================================================= \n' +
            'BUILD SUCCESS. \n' +
            '================================================================= \n' +
            'FROM: ' + grunt.config('meta.paths.src') + '\n' +
            'TO: ' + grunt.config('meta.paths.out') +
            '\n';
        grunt.log.write(info);
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-groundskeeper');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
};

//==test of groundskeeper: copy to any JS file in project for test==
function print_console(text, bLog){
     log = console.log;
     log(33); //not removed
    if(bLog) {            console.log(text
    ,line2('of console.log()'));
    } else { //a=2; }
        console.error(text, /*)*/33);}
    debugger; //debug keyword
    App.logger.fun(123124) //namespaces
    if(1)
        console.warn(text); //here it will be error
    //<development2>
    a=1;  //--pragmas (only one and clean pragma bracket per line)
    //</development2>
}