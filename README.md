# Натальная карта — GitHub Pages

Эта версия рассчитана на GitHub Pages и собирает Swiss Ephemeris **напрямую из официального
исходного репозитория Astrodienst** при каждом деплое. Готовый сторонний JS/WASM wrapper
больше не используется.

## Как опубликовать

1. Создайте публичный GitHub-репозиторий.
2. Загрузите в корень всё содержимое этого архива, включая папку `.github`.
3. В GitHub откройте `Settings → Pages`.
4. В `Build and deployment → Source` выберите **GitHub Actions**.
5. Сделайте push в ветку `main`.
6. Workflow `Build Swiss Ephemeris and deploy Pages` сам:
   - скачает официальный Swiss Ephemeris `v2.10.3bfinal`;
   - соберёт его в WebAssembly;
   - развернёт сайт на GitHub Pages.

Первый деплой будет дольше обычного из-за установки Emscripten и компиляции C-кода.

## Файлы

- `index.html` — сайт;
- `interpretations.json` — база трактовок;
- `swisseph-runtime.js` — наш маленький JS-адаптер;
- `bridge.c` — наш тонкий C ABI к официальным функциям Swiss Ephemeris;
- `.github/workflows/pages.yml` — воспроизводимая сборка и деплой;
- `SOURCE.md` — откуда берётся расчётный движок;
- `LICENSE.md`, `THIRD_PARTY_NOTICES.md` — лицензирование и атрибуция.

## Лицензирование

Эта открытая версия подготовлена под AGPL-модель Swiss Ephemeris. До закрытого
коммерческого запуска необходимо отдельно решить вопрос Professional License.
