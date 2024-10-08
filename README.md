# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Описание данных

### Интерфейс IMenu
Отвечает за данные и их типы главного меню

Свойства:
- total (тип number) — количество помещённых в корзину товаров
- cards (тип string[]) — список товаров в меню

### Интерфейс ICard
Отвечает за данные и их типы карточек товаров

Свойства:
- id (тип string) — уникальный id карточки
- category (тип string) — категория товара
- title (тип string) — название товара
- image (тип string) — иконка товара
- price (тип number | null) — цена товара
- description (тип string) — описание товара

### Интерфейс IOrder
Отвечает за данные и их типы формы оплаты

Свойства:
- cards (тип string[]) — список товаров в корзине
- total (тип number) — итоговая стоимость заказа
- payment (тип string) — способ оплаты
- address (тип string) — адресс доставки
- email (тип string) — электронная почта
- phone (тип number) — номер телефона

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
