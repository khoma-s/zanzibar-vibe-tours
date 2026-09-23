# 🌴 Zanzibar Vibe Tours

Статический двуязычный (IT/PL) туристический сайт для агентства Zanzibar Vibe Tours.

## 🛠 Технологии

- **React 18** + **TypeScript**
- **Vite** — сборка
- **Tailwind CSS 4** — стили
- **React Router** — маршрутизация
- **Lucide React** — иконки

## 📋 Структура проекта

```
src/
├── App.tsx                    # Главный компонент с роутингом
├── main.tsx                   # Точка входа
├── index.css                  # Глобальные стили + палитра
├── context/
│   └── LangContext.tsx        # Контекст языка (IT/PL) + переводы
├── components/
│   ├── Header.tsx             # Шапка с навигацией и language switcher
│   ├── Footer.tsx             # Подвал с контактами и newsletter
│   ├── Lightbox.tsx           # Полноэкранный просмотр фото
│   ├── Loading.tsx            # Индикатор загрузки
│   ├── ScrollToTop.tsx        # Скролл наверх при навигации
│   ├── ScrollToTopButton.tsx  # Кнопка "наверх"
│   └── SEO.tsx                # Динамические мета-теги
└── pages/
    ├── HomePage.tsx           # Главная (hero + превью)
    ├── ToursPage.tsx          # Туры (список + детальная)
    ├── HotelsPage.tsx         # Отели с модальной галереей
    ├── GalleryPage.tsx        # Галерея (фото + видео)
    ├── BlogPage.tsx           # Блог с модалками
    ├── AboutPage.tsx          # О нас + 5 фото-слайдов
    └── NotFoundPage.tsx       # 404

public/
├── data/
│   ├── it/                    # Итальянские данные
│   │   ├── tours.json
│   │   ├── hotels.json
│   │   ├── posts.json
│   │   ├── about.json
│   │   └── gallery.json
│   └── pl/                    # Польские данные
│       ├── tours.json
│       ├── hotels.json
│       ├── posts.json
│       ├── about.json
│       └── gallery.json
├── images/                    # Изображения (логотип, фото)
├── robots.txt
├── sitemap.xml
└── INSTRUCTIONS.md            # Инструкция для заказчика
```

## 🎨 Палитра

| Роль | HEX |
|------|-----|
| Navy | #1B3A5F |
| Teal | #2AAFB5 |
| Orange | #F5A623 |
| Cream | #FBF3D5 |
| Red | #E63946 |

## 🌐 Маршруты

| Страница | IT | PL |
|----------|----|----|
| Главная | `/it/` | `/pl/` |
| Туры | `/it/tour` | `/pl/wycieczka` |
| Детальная тура | `/it/tour/:id` | `/pl/wycieczka/:id` |
| Отели | `/it/hotel` | `/pl/hotel` |
| Галерея | `/it/galleria` | `/pl/galeria` |
| Блог | `/it/blog` | `/pl/blog` |
| About | `/it/chi-siamo` | `/pl/o-nas` |

## 🚀 Запуск

```bash
npm install
npm run dev      # Разработка
npm run build    # Сборка для продакшена
```

## 📅 План разработки

| День | Статус | Задачи |
|------|--------|--------|
| 1 | ✅ | Структура JSON, слаги, палитра, шрифты |
| 2 | ✅ | Каркас: Header, Footer, language switcher, навигация, SEO, Matomo, favicon |
| 3 | ✅ | Главная (Hero + Features + CTA), Туры (фильтры, детальная), Отели (удобства, рейтинг) |
| 4 | ⏳ | Галерея, Блог |
| 5 | ⏳ | About, 404, локализация, SEO-теги |
| 6 | ⏳ | Тестирование, адаптивность |
| 7 | ⏳ | Финальная сборка, деплой |

## 📸 Загрузка изображений

См. `public/INSTRUCTIONS.md` для полной инструкции по загрузке логотипа, фото и видео.
