# Изображения для сайта Zanzibar Vibe Tours

## Структура папок

```
public/images/
├── logo.png              # Логотип компании (512×512px)
├── favicon-32x32.png     # Favicon 32×32
├── favicon-16x16.png     # Favicon 16×16
├── apple-touch-icon.png  # Apple touch icon 180×180
├── about/
│   ├── me.jpg            # Фото основателя (для страницы About)
│   ├── photo1.jpg        # Фото для слайдера About
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   └── photo5.jpg
├── tours/
│   ├── 001/
│   │   ├── title.jpg
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── ...
├── hotels/
│   ├── hotel_01/
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── ...
├── gallery/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
└── vid/
    └── video1.mp4
```

## Обязательные файлы

### 1. logo.png
- **Размер:** 512×512px (рекомендуется)
- **Формат:** PNG с прозрачностью
- **Расположение:** `public/images/logo.png`
- **Использование:** Header, Footer, главная страница (Hero)

### 2. me.jpg
- **Размер:** 400×400px или больше
- **Формат:** JPG
- **Расположение:** `public/images/about/me.jpg`
- **Использование:** Страница About (вместо контактов)

### 3. Favicon
- `favicon-32x32.png` — 32×32px
- `favicon-16x16.png` — 16×16px
- `apple-touch-icon.png` — 180×180px

## Временные изображения (fallback)

Если изображения не загружены, сайт автоматически использует placeholder-изображения с picsum.photos для демонстрации.

## Цветовая палитра логотипа

- **Navy:** #1B3A5F
- **Teal:** #2AAFB5
- **Orange:** #F5A623
- **Cream:** #FBF3D5

## Примечания

- Все изображения должны быть оптимизированы для веба
- Рекомендуется использовать WebP формат для лучшей производительности
- Максимальный размер файла: 500KB для фото, 100KB для иконок
