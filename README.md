# Smart Home Manager - Projekt na Programowanie Użytkowe

Witaj w **Smart Home Manager**! Jest to nowoczesna aplikacja typu Full-Stack, stworzona w ramach laboratoriów z przedmiotu Programowanie Użytkowe. Projekt umożliwia zarządzanie inteligentnymi urządzeniami w domu, monitorowanie ich zużycia energii oraz organizację w pokojach.

Aplikacja składa się z wydajnego backendu opartego na **FastAPI** oraz responsywnego frontendu napisanego w **React**.

## 🚀 Funkcjonalności

### Frontend (React)
*   **Dashboard**: Przejrzysta strona główna z szybkim dostępem do kluczowych sekcji.
*   **Zarządzanie Urządzeniami**:
    *   Wyświetlanie listy urządzeń w formie kafelków.
    *   Dodawanie, edycja i usuwanie urządzeń.
    *   Filtrowanie urządzeń (aktywne/nieaktywne/wszystkie).
    *   Wizualizacja zużycia energii na wykresie kołowym (Recharts).
*   **Pokoje**:
    *   Tworzenie i edycja pokoi.
    *   Przypisywanie urządzeń do konkretnych pomieszczeń.
    *   Szybkie sterowanie urządzeniami (włącz/wyłącz) bezpośrednio z widoku pokoju.
*   **UX/UI**:
    *   Tryb ciemny i jasny (Dark/Light Mode).
    *   Responsywny design (Bootstrap 5).
    *   Globalny loader (Pacman) podczas ładowania danych.
    *   Powiadomienia Toast (sukces/błąd).
    *   Customowe okna potwierdzenia (React Confirm Alert).

### Backend (FastAPI)
*   **REST API**: Pełna obsługa metod HTTP (GET, POST, PUT, DELETE).
*   **Baza Danych**: Wykorzystanie SQLAlchemy (SQLite) do trwałego przechowywania danych.
*   **Relacje**: Obsługa relacji jeden-do-wielu (Jeden pokój -> Wiele urządzeń).
*   **Walidacja**:
    *   Sprawdzanie poprawności danych wejściowych (Pydantic).
    *   Logika biznesowa po stronie serwera (np. blokada usuwania aktywnych urządzeń, limit mocy 3000W).
*   **CORS**: Skonfigurowana obsługa Cross-Origin Resource Sharing dla komunikacji z frontendem.

## 🛠️ Technologie

**Backend:**
*   Python 3.x
*   FastAPI
*   SQLAlchemy
*   SQLite
*   Pydantic
*   Uvicorn

**Frontend:**
*   React (Vite/CRA)
*   Bootstrap 5
*   Axios
*   React Router DOM
*   React Icons
*   Recharts
*   React Toastify
*   React Spinners
*   React Confirm Alert

## ⚙️ Instrukcja Uruchomienia

### 1. Backend (API)

Wymagany Python zainstalowany w systemie.

1.  Przejdź do folderu `API`:
    ```bash
    cd API
    ```
2.  (Opcjonalnie) Utwórz i aktywuj wirtualne środowisko:
    ```bash
    python -m venv venv
    # Windows:
    venv\Scripts\activate
    # Linux/Mac:
    source venv/bin/activate
    ```
3.  Zainstaluj zależności:
    ```bash
    pip install fastapi uvicorn sqlalchemy pydantic
    ```
4.  Uruchom serwer:
    ```bash
    uvicorn main:app --reload
    ```
    Serwer wystartuje pod adresem: `http://127.0.0.1:8000`
    Dokumentacja Swagger UI dostępna pod: `http://127.0.0.1:8000/docs`

### 2. Frontend (Klient)

Wymagany Node.js i npm.

1.  Przejdź do folderu `Klient`:
    ```bash
    cd Klient
    ```
2.  Zainstaluj zależności:
    ```bash
    npm install
    ```
3.  Uruchom aplikację:
    ```bash
    npm start
    ```
    Aplikacja otworzy się w przeglądarce pod adresem: `http://localhost:3000`

## 📝 Autor

**Mikołaj Manowski**
Projekt wykonany na zaliczenie laboratoriów.
