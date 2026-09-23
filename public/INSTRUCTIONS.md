# Zanzibar Vibe Tours — Инструкция по загрузке файлов

## 📸 Как загрузить логотип

1. Подготовьте файл логотипа в формате **PNG** (рекомендуется 512×512px)
2. Сохраните файл как `logo.png`
3. Поместите в папку: `public/images/logo.png`
4. Логотип автоматически появится в Header и Footer

### Favicon
- `public/images/favicon-32x32.png` — 32×32px
- `public/images/favicon-16x16.png` — 16×16px  
- `public/images/apple-touch-icon.png` — 180×180px

---

## 📁 Структура папок для изображений

```
public/images/
├── logo.png              # Логотип компании (512×512px)
├── favicon-32x32.png     # Favicon 32×32
├── favicon-16x16.png     # Favicon 16×16
├── apple-touch-icon.png  # Apple touch icon 180×180
├── about/                # Фото для страницы About (5 штук)
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   └── photo5.jpg
├── tours/
│   ├── 001/
│   │   ├── title.jpg     # Главное фото тура
│   │   ├── 1.jpg         # Фото галереи
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   ├── 002/
│   │   └── ...
│   └── ...
├── hotels/
│   ├── hotel_01/
│   │   ├── 1.jpg         # Первое фото = миниатюра
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── ...
├── gallery/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
└── vid/
    └── video1.mp4        # Видео для галереи
```

---

## 📝 Редактирование JSON-файлов

Все данные находятся в `public/data/{lang}/`:

### Туры (`tours.json`)
```json
{
  "tour_id": "001",           // Уникальный ID
  "img_title": "/images/tours/001/title.jpg",  // Главное фото
  "imgs": ["/images/tours/001/1.jpg", ...],    // Фото галереи
  "info": "Полное описание...",
  "title": "Название тура",
  "short_desc": "Краткое описание",
  "currency": "EUR",          // EUR для IT, PLN для PL
  "price": 1500
}
```

### Отели (`hotels.json`)
```json
{
  "hotel_id": "hotel_01",
  "name": "Название отеля",
  "imgs": ["/images/hotels/hotel_01/1.jpg", ...],
  "odescription": "Описание отеля..."
}
```

### About (`about.json`)
```json
{
  "history": "История компании...",
  "email": "info@example.com",
  "phone": "+255 777 123 456",
  "about_photos_path": "/images/about/",
  "about_photos": [
    "/images/about/photo1.jpg",
    "/images/about/photo2.jpg",
    "/images/about/photo3.jpg",
    "/images/about/photo4.jpg",
    "/images/about/photo5.jpg"
  ]
}
```

### Галерея (`gallery.json`)
```json
{
  "albumsEnabled": false,
  "photos": ["/images/gallery/photo1.jpg", ...],
  "videos": ["/images/vid/video1.mp4"],
  "albums": []
}
```

### Блог (`posts.json`)
```json
{
  "post_id": "001",
  "title": "Заголовок поста",
  "text": "Полный текст поста..."
}
```

---

## 🎨 Цветовая палитра

| Роль | HEX | Использование |
|------|-----|---------------|
| Navy (основной) | #1B3A5F | Header, footer, основной текст |
| Teal (акцент) | #2AAFB5 | Ссылки, кнопки, акценты |
| Orange (вторичный) | #F5A623 | CTA, hover, цены |
| Cream (фон) | #FBF3D5 | Основной фон страниц |
| Red (важное) | #E63946 | Предупреждения, важное |
| White | #FFFFFF | Текст на тёмном фоне |

---

## 🌐 Slug'и (URL)

| Страница | IT | PL |
|----------|----|----|
| Главная | /it/ | /pl/ |
| Туры | /it/tour | /pl/wycieczka |
| Детальная тура | /it/tour/{id} | /pl/wycieczka/{id} |
| Отели | /it/hotel | /pl/hotel |
| Галерея | /it/galleria | /pl/galeria |
| Блог | /it/blog | /pl/blog |
| About | /it/chi-siamo | /pl/o-nas |

---

## 🔧 SEO

- `robots.txt` — в корне сайта
- `sitemap.xml` — в корне сайта с hreflang тегами
- Meta-теги обновляются динамически через компонент SEO
- Matomo analytics — подключён в index.html (замените YOUR_MATOMO_DOMAIN и YOUR_SITE_ID)

---

## 🚀 Деплой

1. Запустите `npm run build`
2. Скопируйте содержимое `dist/` на сервер vh.pl
3. Убедитесь, что все изображения загружены в `public/images/`
4. Проверьте работу Matomo (замените placeholder в index.html)
