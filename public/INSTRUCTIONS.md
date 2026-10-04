# 🌴 Zanzibar Vibe Tours - Dokumentacja dla użytkownika

## 📋 Spis treści
1. [Przegląd projektu](#przegląd-projektu)
2. [Struktura plików JSON](#struktura-plików-json)
3. [Ładowanie obrazów](#ładowanie-obrazów)
4. [Edycja treści](#edycja-treści)
5. [Formatowanie Markdown](#formatowanie-markdown)
6. [Informacje kontaktowe](#informacje-kontaktowe)
7. [Często zadawane pytania](#często-zadawane-pytania)

---

## 📖 Przegląd projektu

**Zanzibar Vibe Tours** - to dwujęzyczna (włoska/polska) strona turystyczna promująca wycieczki na Zanzibar.

### Główne funkcje:
- ✅ Dwie wersje językowe: włoska (/it/) i polska (/pl/)
- ✅ Automatyczne wykrywanie języka przeglądarki
- ✅ Responsywny design dla wszystkich urządzeń
- ✅ Dynamiczne ładowanie obrazów z folderów
- ✅ Formatowanie Markdown dla artykułów bloga
- ✅ Centralne zarządzanie kontaktami

---

## 📁 Struktura plików JSON

Wszystkie dane są przechowywane w folderze `public/data/` i podzielone według języków:

```
public/data/
├── kontakts.json          # Informacje kontaktowe (wspólny plik)
├── it/                    # Wersja włoska
│   ├── tours.json
│   ├── hotels.json
│   ├── posts.json
│   ├── about.json
│   └── gallery.json
└── pl/                    # Wersja polska
    ├── tours.json
    ├── hotels.json
    ├── posts.json
    ├── about.json
    └── gallery.json
```

### 1. kontakts.json - Informacje kontaktowe

**Ścieżka:** `public/data/kontakts.json`

Ten plik zawiera wszystkie dane kontaktowe używane na całej stronie.

```json
{
  "tel": "39 347 584 9637",
  "email": "info@zanzibarvibetours.com",
  "whatsapp": "393475849637",
  "address": "Zanzibar, Tanzania",
  "facebook": "https://www.facebook.com/1172238702643016",
  "instagram": "https://www.instagram.com/kuzdravioletta",
  "tiktok": "https://www.tiktok.com/@violetta.kuzdra"
}
```

**Pola:**
- `tel` - numer telefonu (wyświetlany w stopce i sekcji CTA)
- `email` - adres email (wyświetlany w stopce i sekcji CTA)
- `whatsapp` - numer WhatsApp bez "+" (używany do linków wa.me)
- `address` - adres (wyświetlany w stopce)
- `facebook` - link do strony Facebook
- `instagram` - link do profilu Instagram
- `tiktok` - link do profilu TikTok

---

### 2. tours.json - Wycieczki

**Ścieżka:** `public/data/it/tours.json` i `public/data/pl/tours.json`

```json
[
  {
    "tour_id": "001",
    "img_title": "/images/tours/001/title.jpg",
    "imgs": "/images/tours/001/",
    "info": "Pełny opis wycieczki...",
    "currency": "EUR",
    "price": 1500,
    "title": "Nazwa wycieczki",
    "short_desc": "Krótki opis",
    "key_points": "Punkt 1,Punkt 2,Punkt 3",
    "duration": "1-3 dni",
    "group": "2-10 osób",
    "location": "Zanzibar, Tanzania"
  }
]
```

**Pola:**
- `tour_id` - unikalny identyfikator wycieczki (używany w URL)
- `img_title` - ścieżka do głównego obrazu wycieczki
- `imgs` - ścieżka do folderu z obrazami wycieczki (wszystkie zdjęcia z tego folderu będą wyświetlane w galerii)
- `info` - pełny opis wycieczki (obsługuje Markdown)
- `currency` - kod waluty: "EUR" (€) lub "PLN" (zł)
- `price` - cena wycieczki (liczba)
- `title` - nazwa wycieczki
- `short_desc` - krótki opis dla karty
- `key_points` - kluczowe punkty wycieczki, oddzielone przecinkami (wyświetlane jako tagi)
- `duration` - czas trwania wycieczki
- `group` - wielkość grupy
- `location` - lokalizacja

**Ważne:**
- Waluta jest pobierana z pola `currency`, a nie określana według języka
- Wszystkie obrazy z folderu `imgs` są automatycznie ładowane do galerii wycieczki
- `key_points` są oddzielone przecinkami bez spacji po przecinku

---

### 3. hotels.json - Hotele

**Ścieżka:** `public/data/it/hotels.json` i `public/data/pl/hotels.json`

```json
[
  {
    "hotel_id": "hotel_01",
    "name": "Nazwa hotelu",
    "imgs": "/images/hotels/hotel_01/",
    "odescription": "Opis hotelu (do 300 znaków wyświetlanych w karcie)",
    "key_points": "WiFi,Basen,Restauracja"
  }
]
```

**Pola:**
- `hotel_id` - unikalny identyfikator hotelu
- `name` - nazwa hotelu
- `imgs` - ścieżka do folderu z obrazami hotelu
- `odescription` - opis hotelu (w karcie wyświetlane jest do 300 znaków)
- `key_points` - kluczowe cechy hotelu, oddzielone przecinkami

**Ważne:**
- Wszystkie obrazy z folderu `imgs` są automatycznie ładowane do galerii hotelu
- Opis jest automatycznie przycinany do 300 znaków z dodaniem "..."
- `key_points` są wyświetlane jako tagi pod opisem

---

### 4. posts.json - Artykuły bloga

**Ścieżka:** `public/data/it/posts.json` i `public/data/pl/posts.json`

```json
[
  {
    "post_id": "001",
    "title": "Tytuł artykułu",
    "text": "Tekst artykułu z obsługą formatowania **Markdown**...",
    "category": "Porady"
  }
]
```

**Pola:**
- `post_id` - unikalny identyfikator artykułu
- `title` - tytuł artykułu
- `text` - pełny tekst artykułu (obsługuje Markdown)
- `category` - kategoria artykułu (wyświetlana jako tag)

**Obsługiwane kategorie:**
- `Porady` / `Consigli` - Porady
- `Kultura` / `Cultura` - Kultura
- `Przygody` / `Aventures` - Przygody
- `Natura` - Natura

**Ważne:**
- Na stronie głównej wyświetlane są 3 losowe artykuły
- Tekst obsługuje formatowanie Markdown (patrz sekcja poniżej)
- Pola `date` i `read_time` zostały usunięte

---

### 5. about.json - O firmie

**Ścieżka:** `public/data/it/about.json` i `public/data/pl/about.json`

```json
{
  "history": "Historia firmy...",
  "email": "info@zanzibarvibetours.com",
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

**Pola:**
- `history` - historia firmy
- `email` - email (używany do kontaktu)
- `phone` - telefon (używany do kontaktu)
- `about_photos_path` - ścieżka do folderu ze zdjęciami
- `about_photos` - tablica ścieżek do zdjęć dla slidera

---

### 6. gallery.json - Galeria

**Ścieżka:** `public/data/it/gallery.json` i `public/data/pl/gallery.json`

```json
{
  "albumsEnabled": false,
  "photos": [
    "/images/gallery/"
  ],
  "videos": [
    "/images/vid/"
  ],
  "albums": []
}
```

**Ważne:**
- W polu `photos` podawana jest tylko ścieżka do folderu `/images/gallery/`
- W polu `videos` podawana jest tylko ścieżka do folderu `/images/vid/`
- Wszystkie obrazy i filmy z tych folderów są automatycznie ładowane
- Liczba wyświetlanych plików = liczba rzeczywistych plików w folderach

---

## 🖼️ Ładowanie obrazów

### Struktura folderów dla obrazów:

```
public/images/
├── logo.png                    # Logo (512×512px)
├── logo_in_line.png            # Poziome logo dla Header
├── favicon-32x32.png           # Favicon 32×32
├── favicon-16x16.png           # Favicon 16×16
├── apple-touch-icon.png        # Apple touch icon 180×180
├── matemwe_beach_16x9.png      # Obraz tła dla sekcji Hero
├── about/
│   ├── me.jpg                  # Zdjęcie założyciela
│   ├── photo1.jpg              # Zdjęcia dla slidera About
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   └── photo5.jpg
├── tours/
│   ├── 001/
│   │   ├── title.jpg           # Główne zdjęcie wycieczki
│   │   ├── 1.jpg               # Zdjęcia galerii wycieczki
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   ├── 002/
│   │   └── ...
│   └── ...
├── hotels/
│   ├── hotel_01/
│   │   ├── 1.jpg               # Pierwsze zdjęcie = miniatura
│   │   ├── 2.jpg
│   │   └── 3.jpg
│   └── ...
├── gallery/
│   ├── photo1.jpg              # Zdjęcia dla galerii
│   ├── photo2.jpg
│   └── ...
└── vid/
    └── video1.mp4              # Filmy dla galerii
```

### Wymagania dla obrazów:

**Loga:**
- `logo.png` - kwadratowe, 512×512px, PNG z przezroczystością
- `logo_in_line.png` - poziome, dla Header

**Zdjęcia wycieczek:**
- `title.jpg` - główne zdjęcie, zalecane 1200×600px
- Pozostałe zdjęcia - dowolna rozdzielczość, zalecane 800×600px
- Format: JPG, JPEG, PNG, WebP

**Zdjęcia hoteli:**
- Minimum 3 zdjęcia na hotel
- Pierwsze zdjęcie (1.jpg) używane jako miniatura
- Zalecane 800×600px

**Zdjęcia galerii:**
- Dowolna liczba plików
- Nazwy plików: photo1.jpg, photo2.jpg, ... lub 1.jpg, 2.jpg, ...
- Zalecane 800×600px

**Filmy:**
- Format: MP4, WebM
- Zalecana rozdzielczość 1280×720 lub wyższa

**Ogólne wymagania:**
- Maksymalny rozmiar pliku: 500KB dla zdjęć, 100KB dla ikon
- Optymalizuj obrazy dla webu
- Używaj formatu WebP dla lepszej wydajności (opcjonalnie)

---

## ✏️ Edycja treści

### Dodawanie nowej wycieczki:

1. Otwórz plik `public/data/it/tours.json` i `public/data/pl/tours.json`
2. Dodaj nowy obiekt do tablicy:

```json
{
  "tour_id": "005",
  "img_title": "/images/tours/005/title.jpg",
  "imgs": "/images/tours/005/",
  "info": "Opis nowej wycieczki...",
  "currency": "EUR",
  "price": 2000,
  "title": "Nowa wycieczka",
  "short_desc": "Krótki opis",
  "key_points": "Punkt 1,Punkt 2,Punkt 3",
  "duration": "5 dni",
  "group": "2-15 osób",
  "location": "Zanzibar"
}
```

3. Utwórz folder `public/images/tours/005/`
4. Załaduj obrazy:
   - `title.jpg` - główne zdjęcie
   - `1.jpg`, `2.jpg`, `3.jpg` - zdjęcia dla galerii

### Dodawanie nowego hotelu:

1. Otwórz plik `public/data/it/hotels.json` i `public/data/pl/hotels.json`
2. Dodaj nowy obiekt:

```json
{
  "hotel_id": "hotel_04",
  "name": "Nowy hotel",
  "imgs": "/images/hotels/hotel_04/",
  "odescription": "Opis hotelu...",
  "key_points": "WiFi,Basen,Restauracja,Spa"
}
```

3. Utwórz folder `public/images/hotels/hotel_04/`
4. Załaduj minimum 3 zdjęcia: `1.jpg`, `2.jpg`, `3.jpg`

### Dodawanie nowego artykułu bloga:

1. Otwórz plik `public/data/it/posts.json` i `public/data/pl/posts.json`
2. Dodaj nowy obiekt:

```json
{
  "post_id": "005",
  "title": "Nowy artykuł",
  "text": "Tekst artykułu z **pogrubionym** i *kursywą*...",
  "category": "Porady"
}
```

3. Używaj Markdown do formatowania tekstu (patrz sekcja poniżej)

### Zmiana informacji kontaktowych:

1. Otwórz plik `public/data/kontakts.json`
2. Zmień potrzebne pola:

```json
{
  "tel": "+255 777 123 456",
  "email": "new-email@example.com",
  "whatsapp": "393475849637",
  "address": "Nowy adres",
  "facebook": "https://www.facebook.com/new-page",
  "instagram": "https://www.instagram.com/new-profile",
  "tiktok": "https://www.tiktok.com/@new-profile"
}
```

3. Zapisz plik - zmiany zostaną automatycznie zastosowane na całej stronie

---

## 📝 Formatowanie Markdown

W artykułach bloga (`posts.json`) obsługiwane jest podstawowe formatowanie Markdown.

### Pogrubiony tekst
Używaj podwójnych gwiazdek: `**pogrubiony tekst**`

**Przykład:**
```json
{
  "text": "To jest **pogrubiony tekst** w artykule"
}
```

**Wynik:** To jest **pogrubiony tekst** w artykule

### Kursywa
Używaj pojedynczych gwiazdek: `*kursywa*`

**Przykład:**
```json
{
  "text": "To jest *kursywa* w artykule"
}
```

**Wynik:** To jest *kursywa* w artykule

### Formatowanie kombinowane
Można łączyć pogrubienie i kursywę:

**Przykład:**
```json
{
  "text": "To jest **pogrubiony i *kursywa* tekst**"
}
```

**Wynik:** To jest **pogrubiony i *kursywa* tekst**

### Przenoszenie wierszy
Używaj `\n` do przenoszenia wierszy:

**Przykład:**
```json
{
  "text": "Pierwszy wiersz\nDrugi wiersz\nTrzeci wiersz"
}
```

### Pełny przykład artykułu z Markdown:

```json
{
  "post_id": "001",
  "title": "10 najpiękniejszych plaż Zanzibaru",
  "text": "Zanzibar słynie z **rajskich plaż**. Oto nasz ranking:\n\n1. **Nungwi** — najsłynniejsza plaża z *najbielszym piaskiem*\n2. **Kendwa** — idealna do *relaksu*\n\nWięcej informacji znajdziesz na naszej stronie.",
  "category": "Porady"
}
```

---

## 📞 Informacje kontaktowe

Wszystkie dane kontaktowe są scentralizowane w pliku `kontakts.json`.

### Gdzie używane są kontakty:

**Stopka strony:**
- Email
- WhatsApp (z ikoną WhatsApp)
- Adres
- Linki do mediów społecznościowych (Facebook, Instagram, TikTok)

**Strona główna (sekcja CTA):**
- Email (przycisk)
- WhatsApp (przycisk z numerem telefonu)

**Strona Tours (szczegóły wycieczki):**
- Przycisk "Zarezerwuj teraz" / "Prenota ora" → prowadzi do WhatsApp

**Strona Hotels (karty hoteli):**
- Przycisk "Zapytaj o szczegóły" / "Richiedi informazioni" → prowadzi do WhatsApp

### Format linku WhatsApp:

Numer w `kontakts.json` powinien być bez "+":
```json
{
  "whatsapp": "393475849637"
}
```

Strona automatycznie tworzy link: `https://wa.me/393475849637`

---

## ❓ Często zadawane pytania

### P: Jak dodać nowe zdjęcie do galerii?
**O:** Po prostu umieść plik w folderze `public/images/gallery/`. Strona automatycznie go wykryje i wyświetli. Nie trzeba edytować `gallery.json`.

### P: Jak usunąć zdjęcie z galerii?
**O:** Po prostu usuń plik z folderu `public/images/gallery/`. Strona automatycznie przestanie go wyświetlać.

### P: Dlaczego moje wycieczki się nie wyświetlają?
**O:** Sprawdź:
1. Poprawność pliku JSON (użyj https://jsonlint.com/)
2. Obecność wszystkich wymaganych pól
3. Poprawność ścieżek do obrazów
4. Brak pominiętych przecinków w JSON

### P: Jak zmienić walutę dla wycieczki?
**O:** Zmień pole `currency` w `tours.json`:
- `"EUR"` - dla euro (€)
- `"PLN"` - dla polskich złotych (zł)
- `"USD"` - dla dolarów ($)
- `"GBP"` - dla funtów (£)

### P: Jak dodać więcej zdjęć do wycieczki?
**O:** Po prostu umieść dodatkowe zdjęcia w folderze wycieczki (np. `public/images/tours/001/`). Wszystkie zdjęcia automatycznie pojawią się w galerii wycieczki.

### P: Dlaczego przycisk WhatsApp nie działa?
**O:** Sprawdź:
1. Poprawność numeru w `kontakts.json` (bez "+")
2. Obecność internetu na urządzeniu
3. Czy WhatsApp jest zainstalowany na urządzeniu

### P: Jak zmienić liczbę wyświetlanych wycieczek na stronie głównej?
**O:** W pliku `src/pages/HomePage.tsx` znajdź linię:
```typescript
.then(data => setTours(data.slice(0, 4)))
```
Zmień liczbę `4` na potrzebną ilość.

### P: Jak zmienić liczbę losowych zdjęć w galerii na stronie głównej?
**O:** W pliku `src/pages/HomePage.tsx` znajdź linię:
```typescript
setGalleryImages(shuffled.slice(0, 5));
```
Zmień liczbę `5` na potrzebną ilość.

### P: Jak zmienić liczbę losowych artykułów na stronie głównej?
**O:** W pliku `src/pages/HomePage.tsx` znajdź linię:
```typescript
setPosts(shuffled.slice(0, 3));
```
Zmień liczbę `3` na potrzebną ilość.

---

## 🔧 Szczegóły techniczne

### Wersja projektu
- JavaScript: ~260 KB (gzip: ~76 KB)
- CSS: ~58 KB (gzip: ~10 KB)
- Całkowity rozmiar: ~86 KB (gzip)

### Obsługiwane przeglądarki
- Chrome (najnowsza wersja)
- Firefox (najnowsza wersja)
- Safari (najnowsza wersja)
- Edge (najnowsza wersja)
- Safari iOS
- Chrome Android

### Responsywność
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Testowanie
Aby przetestować responsywność, dodaj `?test=1` do URL lub naciśnij `Ctrl+Shift+T`.

---

## 📞 Wsparcie

Jeśli masz pytania lub problemy:

**Email:** khomyak_slava@gmail.com  
**WhatsApp:** +48 608 185 112  
**Telefon:** +48 608 185 112

---

**Ostatnia aktualizacja:** 2026-10-02  
**Wersja dokumentu:** 2.0  
**Język:** Polski