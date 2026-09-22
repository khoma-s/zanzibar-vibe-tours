# Zanzibar Vibe Tours — Инструкция по загрузке файлов

## 📸 Как загрузить логотип для проверки цветовой гаммы

1. Подготовьте файл логотипа в формате **PNG** (рекомендуется 512×512px или больше)
2. Сохраните файл как `logo.png`
3. Поместите в папку: `public/images/logo.png`
4. Обновите компонент Header.tsx, заменив эмодзи 🌴 на:
   ```html
   <img src="/images/logo.png" alt="Zanzibar Vibe Tours" className="w-12 h-12 rounded-full" />
   ```

### Favicon
- `public/images/favicon-32x32.png` — 32×32px
- `public/images/favicon-16x16.png` — 16×16px  
- `public/images/apple-touch-icon.png` — 180×180px

---

## 📁 Структура папок для изображений

```
public/images/
├── logo.png              # Логотип компании
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

| Роль | HEX |
|------|-----|
| Navy (основной) | #1B3A5F |
| Teal (акцент) | #2AAFB5 |
| Orange (вторичный) | #F5A623 |
| Cream (фон) | #FBF3D5 |
| Red (важное) | #E63946 |
| White | #FFFFFF |

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
