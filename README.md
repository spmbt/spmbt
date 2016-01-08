spmbt
=====

##### [spmbt pages](http://spmbt.github.io/spmbt/) *(в html-формате)*

*(в хронологии)*

* [Падающие снежинки на Canvas](https://jsfiddle.net/spmbt/963b3cyg/) *(JS)*; функции. [Репо со скриптами падающего снега](https://github.com/spmbt/snowfalls) (много ссылок на песочницы и демо). [Статья об алгоритмах снега и их сравнении](http://habrahabr.ru/post/274535/) (хабр). 2015-12.<br>
&nbsp;&nbsp;Анимируется падение снежинок со случайными девиациями скорости. Скрипт оптимизирован для несильной загрузки процессора. Аналогичные скрипты не на Canvas с числом элементов в 3-4 раза меньше - нагружают аналогично.<br>
&nbsp;&nbsp;Далее, созданы 12 песочниц для 3 разных алгоритмов на HTML и Canvas, написана статья, выложено в репо и jsFiddle-s.<br>
&nbsp;&nbsp;Алгоритм <b>jSnow</b> - восстановленный из обфусцированного скрипта 2009-2010 годов,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;добавлен вариант плагина, работающего по коллекции jQuery (ранее - работал только в полном окне).<br>
&nbsp;&nbsp;Алгоритм <b>falling-snow</b> - перезапущенный в современном доктайпе, без переделок, лишь добавлена кнопка остановки.<br>
&nbsp;&nbsp;Алгоритм <b>snow-canvas</b> - написанный с нуля на канвасе (2 модификации).
* [Удалитель слов](http://spmbt.github.io/spmbt/wk/xmpJs.htm) кликами мыши (JS); функции:<br>
&nbsp;&nbsp;на странице заготавливается любой текст в BODY, включая теги с пробелами внутри (но без ">" внутри). При открывании страницы текст подготавливается так, что в нём способны удаляться отдельные (любые) слова кликами мыши на них. Для удобства, эти слова подсвечиваются при наведении; 2015-05. Упрощённый аналог описан <a href="http://stackoverflow.com/questions/4643432/get-word-click-in-paragraphs">здесь</a> (получение слов по кликам).
* [Адаптивная вёрстка страницы](http://spmbt.github.io/spmbt/wk/xmpCss.htm) - до 512px, до 700 и шире (CSS); функции:<br>
&nbsp;&nbsp;изменяя ширину браузера, наблюдаем изменение представления списка, диаграммы на странице и поведения фоновой картинки в шапке; IE9+, Opera 12 и современные Fx-Chrome 38-42; 2015-05
* [Справочник методов объекта console</a> в различных (7) браузерах и средах исполнения Javascript](http://spmbt.github.io/jsConsoleApiReference/jsConsoleApiReference-ru.htm) *(документация)* ; функции:<br>
&nbsp;&nbsp;представление в 3 видах: сжатое (1 строка на метод), 2 строки на метод и развёрнутое, с описанием для каждого метода;<br>
&nbsp;&nbsp;индивидуальное или общее разворачивание описаний методов;<br>
&nbsp;&nbsp;мультиязычность данных с единым форматом документов;<br>
&nbsp;&nbsp;представления каждого документа в Markdown и HTML (основа для хранения данных - HTML);<br>
&nbsp;&nbsp; 2015-03
* [Формат данных jsonComm](https://github.com/spmbt/jsonComm) *(утилиты)* для поддержки комментариев в JSON; функции:<br>
&nbsp;&nbsp;для перевода JSON с комментариями в обычный JSON (без потери структуры);<br>
&nbsp;&nbsp;для оформления комментариев рядом с парами "ключ-значение" как валидных значений;<br>
&nbsp;&nbsp;для изменения ключей и значений исходного jsonComm без затрагивания комментариев;<br>
&nbsp;&nbsp; *[пример](http://spmbt.github.io/jsonComm/) с бенчмарком*, 2015-01
* [Навигация по группам квадратов](http://spmbt.github.io/spmbt/wk/squares.htm) на <i>Bootstrap 3.1</i> - перемещение активного квадрата в 3-уровневом списке клавишами направлений и PgUp-PgDn, добавление новых списков, 2014-03
* [Редактируемая телефонная книга](http://spmbt.github.io/spmbt/wk/angularList/listFiddle.htm) (Address Book App) на <i>Angular 1.2, Bootstrap 3.1</i> с подсписком "spam", переносом между списками, фильтром, юнит-тестами (без бекенда) (копия на [jsfiddle](http://jsfiddle.net/spmbt/hDPqV/)), 2014-03
* [Пример Grunt-файла](http://spmbt.github.io/spmbt/wk/Gruntfile.js) в одном из проектов, Node.JS (470 строк, 8 модулей, 5 функций: сборка, досборка, Sass-компиляция на лету), 2013-11
* [Палитра 216 цветов](http://jsfiddle.net/spmbt/6943a/) [в малом объёме](http://spmbt.github.io/spmbt/colorPickerMin.htm ) кода (JS,CSS, *ручная минификация*), 2013-11

* [API консоли Javascript](http://habrahabr.ru/post/198372/) *(утилиты)*, 2013-10,<br>
 код [http://jsfiddle.net/spmbt/Wgah8/](http://jsfiddle.net/spmbt/Wgah8/)

* [кнопки в поиске Гугла](https://github.com/spmbt/googleSearchExtraButtons) c параметрами *(юзерскрипт)*, 2013-05

* [4-числовая система нумерации версий](http://habrahabr.ru/post/175187/) *(регекспы)*, 2013-04,<br>
код [http://jsfiddle.net/spmbt/dk346/3/](http://jsfiddle.net/spmbt/dk346/3/)

* [фильтрация больших списков на клиенте](http://spmbt.github.io/spmbt/wk/test1-20130517.htm) и [подсветка найденных слов](http://spmbt.github.io/spmbt/wk/test2-20130517.htm) *(производительность)*, 2013-04 (2 шт.)

* [увеличение по наведению](http://jsfiddle.net/spmbt/ySjmY/1/) и просмотр в новом окне по клику, 2013-02: 
* [JS-валидация](http://jsfiddle.net/spmbt/Z3Hy4/) по отправке формы.

* [таблица логов](http://spmbt.github.io/spmbt/wk/37.20.115.43.xml) на XML+XSLT *(экзотические технологии)*, [статья о пагинаторе](http://habrahabr.ru/post/174977/) 2013-03

* [Инсайд-активность на Гитхабе](http://img221.imageshack.us/img221/800/githubactivity.png) в 2012 (скриншот)

* [Реинжиниринг машины Тьюринга](http://habrahabr.ru/post/146444/) от Гугла, 2012-06 (->)
* [реинжиниринг огня на чистом CSS](http://habrahabr.ru/post/149392/) (Fx-Chrome), 2012-08 

* [Виджет индекса доверия](http://spmbt.github.io/spmbt/wk/widgetFomIndexes.htm) с графиками *(ООП, шаблоны)*, 2011-08

* [Мешап из флагов стран](http://habrahabr.ru/post/123804/) и статьи из Википедии *(интеграция скриптов)*, 2011-07<br>
код [http://spmbt.github.io/spmbt/wk/showFlags/showFlags.htm](http://spmbt.github.io/spmbt/wk/showFlags/showFlags.htm)

* [Игра "Жизнь"](http://spmbt.github.io/spmbt/lifeConway.htm) Конвея (текст и canvas) *(алгоритм)*, 2011-01 <br>
статья [http://habrahabr.ru/post/111686/](http://habrahabr.ru/post/111686/)

* Вёрстка и JS, простые задания: 1-2, 3-4, 5-6, 2009-05<br>
[zadanie1_2-2.htm](http://spmbt.github.io/spmbt/wk/zadanie1_2-2.htm)<br>
[zadanie3_4.htm](http://spmbt.github.io/spmbt/wk/zadanie3_4.htm)<br>
[zadanie1-2.htm](http://spmbt.github.io/spmbt/wk/zadanie1-2.htm)

* [https://greasyfork.org/en/users/2323-spmbt](https://greasyfork.org/en/users/2323-spmbt) - юзерскрипты, [http://userscripts-mirror.org/scripts/show/121690](http://userscripts-mirror.org/scripts/show/121690) - старый адрес (не обновляется; только для просмотра описаний), и [http://userstyles.org/styles/36690](http://userstyles.org/styles/36690) - и стили;