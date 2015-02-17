## [Что нового?](#whats-new)
### Матрешка 1.0
* Убраны предупреждения об использовании устаревших методов и событий, очищен код.

### [Матрешка 0.3](https://github.com/finom/matreshka/releases/tag/v0.3.0)
**Новые возможности**
* Метод {@link Matreshka.randomString}
* Метод {@link Matreshka#onDebounce}
* Метод {@link Matreshka#bindOptionalNode}
* Метод {@link Matreshka#delay}
* Методы ``Matreshka.Array``, позволяющие передать объект события (``push_``, ``sort_``, ``splice_``...). См. {@link Matreshka.Array#METHOD_}
* Свойство {@link Matreshka.version}
* Новый односторонний байндер {@link Matreshka.binders.visibility}
* Свойство ``on`` у привязчика может быть функцией
* Добавлен флаг ``skipMediator`` для методов ``Matreshka.Array``
* Переопределение {@link Matreshka.Array#itemRenderer} свойством ``renderer`` дочернего элемента
* Свойство {@link Matreshka.Array#renderIfPossible}
* Функция {@link Matreshka.lookForBinder} теперь статичный метод класса {@link Matreshka}
* Для привязки песочницы теперь используется ключ ``sandbox`` вместо ``__this__``
* События ``addone`` и ``removeone`` для {@link Matreshka.Array}
* {@link Matreshka.Array#push} и {@link Matreshka.Array#unshift} теперь возвращают длину массива вместо себя (как и в нативном массиве)
* Реализованы привязчики для всех HTML5 элементов формы
* Новые служебные флаги для метода  {@link Matreshka#set}: ``silentHTML``, ``skipLinks``
* {@link Matreshka.Array#itemRenderer} теперь поддерживает строку, как значение
* Добавлен ключ ``self`` для всех событий ``Matreshka.Array``
* Можно менять {@link Matreshka.Array#Model} динамически
* Вызывать событие ``change``, если при привязке Матрешка меняет значение свойства на состояние элемента (если свойство не определено и не передан флаг ``assignDefaultValue: false``)
* Новые селекторы: ``:sandbox`` и ``:bound(KEY)``
* Поддержка свойства ``attributes`` для функции ``Balalaika.create``
* Экспериментальный шаблонизатор для {@link Matreshka.Array#itemRenderer} если {@link Matreshka.Array#itemRenderer} установлен, как ``true``
* Перенесены все привязчики в объект {@link Matreshka.binders}
* {@link Matreshka.Array#pull} теперь поддерживает объект в качестве аргумента
* Короткая запись для делегированных событий DOM внутри песоницы (click::(.selector) вместо click::sandbox(.selector))
* Поддержка цикла ``for..of`` для {@link Matreshka.ArrayЪ и {@link Matreshka.ObjectЪ
* Свойство ``domEvent`` содержащее объект события для событий DOM
* Делегированные DOM события (``this.on( 'click::something(.x > .y)' )``)

**Устаревшие методы и события**
* Все методы, имя которых начинается с ``silent`` (``silentPush``, ``silentSplice``, ``silentSort`` ...) удалены. Для этих целей теперь используются методы с нижним подчеркиванием в конце имени и флагом ``silent`` (например, ``this.push_(1,2,3, {silent: true})``)
* Метод ``Matreshka#initMK`` удален, теперь используется ленивая инициализация
* Метод ``Matreshka#defineNotEnum`` удален по причине неиспользуемости
* Matreshka.Array#initializeSmartArray -> {@link Matreshka.Array#rerender}
* Matreshka#setMediator -> {@link Matreshka#mediate}
* Matreshka#bindElement -> {@link Matreshka#bindNode}
* Matreshka#unbindElement -> {@link Matreshka#unbindNode}
* Matreshka#addDependency -> {@link Matreshka#linkProps}
* Matreshka.Array#setItemMediator -> {@link Matreshka.Array#mediateItem}
* Matreshka.Object#addJSONKeys -> {@link Matreshka.Object#addDataKeys}
* Matreshka.Object#removeJSONKeys -> {@link Matreshka.Object#removeDataKeys}
* Matreshka.procrastinate -> {@link Matreshka.debounce}
* Удалено событие ``itemrender`` из Matreshka.Array. Можно использовать ``@render`` вместо него


**Исправленные баги**
* Фиксы в {@link $b Балалайке} для старых браузеров WebKit, например, iOS 5 Safari
* Обработчик DOM события вызывался несколько раз
* {@link Matreshka#off} теперь возвращает себя
* Исправлен баг в {@link Matreshka#defineGetter}
* Исправлен баг в {@link Matreshka.Array#concat}
* Исправлен баг в {@link Matreshka#once}
* Исправлен баг в {@link Matreshka.Array#itemMediator}
* Исправлен баг в механизме рендеринга {@link Matreshka.Array}
* Небольшие исправления в {@link Matreshka#bindNode}
* Небольшие исправления для стандартных байндеров
* Делегированные события не работали для {@link Matreshka.Object}
* Всегда возвращать ``null`` из {@link Matreshka#bound} если элемент не найден
* Исправлен неоевидный баг в {@link Matreshka#set}, возникающий при использовании {@link Matreshka.Array#mediateItem} и {@link Matreshka.Array#linkProps} вместе
* Использовать событие ``delete`` вместо ``remove``
* ``binder.setValue`` вызывался даже если значение свойства не было изменено
* Привязанные HTML элементы не обновлялись поесле вызова {@link Matreshka#mediate}
* Фиксы для Internet Explorer 8
* Matreshka.lookForBinder теперь возвращает ``undefined`` если байндер не найден
* Генерировать события модификации Matreshka.Array **только тогда** коллекция изменилась


**Изменения в коде**
* Оптимизирована генерация событий
* Созданы методы _on и _off для внутреннего использования и улучшения производительности
* Создан приватный метод Matreshka#_initMK
* Оптимизирован код {@link Matreshka.Object}
* Убран полифил Number.isNaN
=======
## [Переход на новую версию](#how-to-update)
Переход на версию 1.0 с любой предыдущей версии должен произойти относительно безболезненно, хотя и требует вмешательства в старый код.
* Сначала нужно обновиться до переходной версии 0.3, которая включает все исправления и нововведения, для первой версии.
* После обновления вы увидете в консоли исключения с инструкциями, что нужно исправить, например убрать вызов устаревшего метода ``initMK``. Пользуясь инструментами разработчика, отследите источники исключений с помощью stack trace. Так же, можете воспользоваться поиском по JavaScript файлам для отслеживания поиска устаревших методов.
* Потестируйте своё приложение и, если исключения больше не возникают, обновитесь до верии 1.0.