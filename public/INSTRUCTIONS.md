# Zanzibar Vibe Tours — Instrukcja wgrywania plików

## 📸 Jak dodać logo

1. Przygotuj plik logo w formacie **PNG** (zalecane 512×512 px)
2. Zapisz plik jako `logo.png`
3. Umieść go w folderze: `public/images/logo.png`
4. Logo pojawi się automatycznie w nagłówku (Header) i stopce (Footer)

### Favicon
- `public/images/favicon-32x32.png` — 32×32 px
- `public/images/favicon-16x16.png` — 16×16 px  
- `public/images/apple-touch-icon.png` — 180×180 px

---

## 📁 Struktura folderów dla obrazów

```
public/images/
├── logo.png              # Logo firmy (512×512 px)
├── favicon-32x32.png     # Favicon 32×32
├── favicon-16x16.png     # Favicon 16×16
├── apple-touch-icon.png  # Apple touch icon 180×180
├── about/                # Zdjęcia na stronę About (5 sztuk)
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   └── photo5.jpg
├── tours/
│   ├── 001/
│   │   ├── title.jpg     # Zdjęcie główne wycieczki
│   │   ├── 1.jpg         # Zdjęcia do galerii
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   ├── 002/
│   │   └── ...
│   └── ...
├── hotels/
│   ├── hotel_01/
│   │   ├── 1.jpg         # Pierwsze zdjęcie = miniatura
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── ...
├── gallery/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
└── vid/
    └── video1.mp4        # Wideo do galerii
```

---

## 📝 Edycja plików JSON

Wszystkie dane znajdują się w `public/data/{lang}/`:

### Wycieczki (`tours.json`)
```json
{
  "tour_id": "001",           // Unikalny ID
  "img_title": "/images/tours/001/title.jpg",  // Zdjęcie główne
  "imgs": ["/images/tours/001/1.jpg", ...],    // Zdjęcia do galerii
  "info": "Pełny opis...",
  "title": "Nazwa wycieczki",
  "short_desc": "Krótki opis",
  "currency": "EUR",          // EUR dla IT, PLN dla PL
  "price": 1500
}
```

### Hotele (`hotels.json`)
```json
{
  "hotel_id": "hotel_01",
  "name": "Nazwa hotelu",
  "imgs": ["/images/hotels/hotel_01/1.jpg", ...],
  "odescription": "Opis hotelu..."
}
```

### About (`about.json`)
```json
{
  "history": "Historia firmy...",
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

### Galeria (`gallery.json`)
```json
{
  "albumsEnabled": false,
  "photos": ["/images/gallery/photo1.jpg", ...],
  "videos": ["/images/vid/video1.mp4"],
  "albums": []
}
```

### Blog (`posts.json`)
```json
{
  "post_id": "001",
  "title": "Tytuł wpisu",
  "text": "Pełny tekst wpisu..."
}
```

---

## 🎨 Paleta kolorów

| Rola | HEX | Zastosowanie |
|------|-----|--------------|
| Navy (główny) | #1B3A5F | Header, footer, tekst podstawowy |
| Teal (akcent) | #2AAFB5 | Linki, przyciski, akcenty |
| Orange (dodatkowy) | #F5A623 | CTA, hover, ceny |
| Cream (tło) | #FBF3D5 | Główne tło stron |
| Red (ważne) | #E63946 | Ostrzeżenia, ważne informacje |
| White | #FFFFFF | Tekst na ciemnym tle |

---

## 🌐 Slugi (URL)

| Strona | IT | PL |
|--------|----|----|
| Strona główna | /it/ | /pl/ |
| Wycieczki | /it/tour | /pl/wycieczka |
| Szczegóły wycieczki | /it/tour/{id} | /pl/wycieczka/{id} |
| Hotele | /it/hotel | /pl/hotel |
| Galeria | /it/galleria | /pl/galeria |
| Blog | /it/blog | /pl/blog |
| About (O nas) | /it/chi-siamo | /pl/o-nas |

---

## 🔧 SEO

- `robots.txt` — w katalogu głównym witryny
- `sitemap.xml` — w katalogu głównym witryny, z tagami hreflang
- Meta tagi są aktualizowane dynamicznie przez komponent SEO
- Matomo analytics — podłączona w index.html (zamień YOUR_MATOMO_DOMAIN i YOUR_SITE_ID)

---

## 🚀 Wdrożenie

1. Uruchom `npm run build`
2. Skopiuj zawartość `dist/` na serwer vh.pl
3. Upewnij się, że wszystkie obrazy zostały wgrane do `public/images/`
4. Sprawdź działanie Matomo (zamień placeholder w index.html)
