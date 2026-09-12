# Third-party notices

## Swiss Ephemeris

Natal-chart calculations use Swiss Ephemeris, built directly from the official
Astrodienst upstream source during the GitHub Actions deployment.

Upstream:
https://github.com/aloistr/swisseph

Official information:
https://www.astro.com/swisseph/

Swiss Ephemeris is dual-licensed by Astrodienst AG: GNU AGPL or a Professional License.
This open-source build selects the AGPL route. The upstream copyright and license notices
are copied into the deployed `vendor/` directory by the build workflow.

No precompiled third-party Swiss Ephemeris JavaScript/WASM wrapper is used by this package.

## GeoNames

City-reference data is attributed in the site footer to GeoNames:
https://www.geonames.org/

The site footer links to CC BY 4.0:
https://creativecommons.org/licenses/by/4.0/
