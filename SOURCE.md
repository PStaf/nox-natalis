# Источник расчётного движка

Этот проект не загружает готовый сторонний JavaScript/WASM-wrapper Swiss Ephemeris.

При каждом деплое GitHub Actions:

1. получает официальный исходный код Swiss Ephemeris из репозитория `aloistr/swisseph`;
2. фиксирует релиз `v2.10.3bfinal`;
3. компилирует официальный C-код в WebAssembly через Emscripten;
4. добавляет только маленький `bridge.c`, который экспортирует в браузер `swe_calc_ut`,
   `swe_houses`, `swe_julday` и `swe_close`;
5. публикует полученные `vendor/swisseph.js` и `vendor/swisseph.wasm` вместе с сайтом.

Таким образом, в рабочей цепочке нет зависимости от `prolaxu/swisseph-wasm` или другого
готового Swiss Ephemeris wrapper-пакета. Тонкий bridge является частью исходников этого
репозитория и доступен пользователям вместе с остальным кодом.

Официальный upstream:
https://github.com/aloistr/swisseph

Версия зафиксирована в `.github/workflows/pages.yml`.
