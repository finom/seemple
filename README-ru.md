# Matreshka v1.1 RC
=======

[![Сайт Матрешки](http://matreshka.io/img/mk5-logo_full-vert.svg)](http://ru.matreshka.io)

### [Скачать](https://github.com/finom/matreshka/releases)

[![Чат https://gitter.im/finom/matreshka/ru](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/finom/matreshka/ru)

```html
<script src="matreshka.min.js"></script>
<input type="text" class="my-input">
<script>
<<<<<<< HEAD
var app = new Matreshka();
app.bindNode('x', '.my-input');
app.x = 'Двустороннее связывание данных в JS? Серьезно?;
=======
var app = new Matreshka;
app.bindNode( 'x', '.my-input' );
app.x = 'Двустороннее связывание данных в JS? Серьезно?';
>>>>>>> 309d35f552c0bba43753295035e6e8f4e4b2d97f
</script>
```

Матрешка - компактный, но мощный фреймвок, позволяющий строить одностраничные веб-приложения настолько легко, насколько возможно:

* Двустороннее связывание в JavaScript коде.
* Матрешка проста. Серьезно. Не нужно читать тонны статей, чтоб начать с ней работать.
* Произвольная архитектура. Вы сами выбираете способ структурирования разрабатываемого приложения.

## [Список релизов](http://ru.matreshka.io/#whats-new)

## [Голосуйте за фичи](https://trello.com/b/E5KcQESk/matreshka-js-features)

------------------------------------

## Ресурсы
[**Основной сайт**](http://matreshka.io)

[**Сайт с русскоязычной документацией**](http://ru.matreshka.io/)

[**Файлы JSDoc для IDE**](https://github.com/finom/matreshka_docs)

[**TodoMVC**](https://github.com/finom/matreshka_todomvc)

[**Сообщить о проблеме**](https://github.com/finom/matreshka/issues)

[**Сообщить о проблеме, если не знаете английского**](https://github.com/matreshkajs-ru/matreshkajs-ru.github.io/issues)

**Автор:** Андрей Губанов <a@odessite.com.ua>

**Лицензия:** [MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)
