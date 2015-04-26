# Matreshka v1.0.5

[![Сайт Матрешки](http://matreshka.io/img/mk5-logo_full-vert.svg)](http://ru.matreshka.io)

### [Скачать](https://github.com/finom/matreshka/releases)

[![Чат https://gitter.im/finom/matreshka/ru](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/finom/matreshka/ru) 

```html
<script src="matreshka.min.js"></script>
<input type="text" class="my-input">
<script>
var app = new Matreshka;
app.bindNode( 'x', '.my-input' );
app.x = 'Двустороннее связывание данных в JS? Серьезно?;
</script>
``` 

Матрешка - компактный, но мощный фреймвок, позволяющий строить одностраничные веб-приложения настолько легко, насколько возможно:

* Двустороннее связывание в JavaScript коде. Никакого {{нового.синтаксиса}} в HTML файлах.
* Матрешка проста. Серьезно. Не нужно читать тонны статей, чтоб начать с ней работать.
* Произвольная архитектура. Вы сами выбираете способ структурирования разрабатываемого приложения.

## [Список релизов](http://ru.matreshka.io/#whats-new)

## Todo
* Генерировать событие ``remove`` и ``modify``, когда из экземпляра ``Matreshka.Object`` удаляется ключ, отвечающий за данные
* Флаг ``force`` для событий ``Matreshka.Array`` (на случай, если изменений не произошло)
* Позволить методу ``Matreshka#off`` удалять делегированные DOM события с определенным селектором
* Сделать рефакторинг методов ``Matreshka#_on`` и ``Matreshka#_off``
* Удалять обработчик события из списка обработчиков при использовании метода ``Matreshka#once``
* Свойство байндера ``destroy``, которое вызывается при использовании ``Matreshka#unbindNode``
* Флаг ``private``, запрещающий прослушку делегированных событий другими экземплярами Матрешки
* Генерировать сбытие ``remove`` когда удаляются данные из ``Matreshka.Object`` (сейчас можно слушать удаление любых свойств, в том числе и не-данных, с помощью события ``remove``)
* Экспорт Матрешки с помощью синтаксиса ES6 (как это сделать, пока не понятно; SystemJS не предоставляет метода для эксорта)
* ``Matreshka.to``, конвертирующий обычный многоуровневый объект или массив в экземпляры ``Matreshka.Array`` и ``Matreshka.Object``
* Найти способ получения родительских объектов при использовании делегированных событий (например, получить объекты ``a`` и ``b`` при использовании ``a@b@c@change:x)
* ``this.bound.key`` в качестве альтернативы ``this.bound('key')``
* Автоматическое тестирование всех методов
* Комментировать все части исходника
* ``Matreshka.Array.of``
* ``Matreshka.Array.from``
* Свойство ``getValue`` для односторонних байндеров из ``Matreshka.binders``

**Возможно, будет добавлено в следующих версиях**
* Метод ``toJSONString``
* Метод ``bindSandbox``, который принимает единственный аргумент-песочницу и опциональный объект события 

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



