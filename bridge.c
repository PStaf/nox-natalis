#include "swephexp.h"
#include <string.h>

/* Thin ABI only: calculations remain in the official Swiss Ephemeris C code. */
static char bridge_error[AS_MAXCH] = "";

void bridge_init(void) {
    /* Emscripten preloads the official ephemeris files at this virtual path. */
    swe_set_ephe_path("/ephe");
    bridge_error[0] = '\0';
}

const char *bridge_last_error(void) {
    return bridge_error;
}

int bridge_calc_ut(double jd_ut, int body, int flags, double *out6) {
    char serr[AS_MAXCH] = "";
    int rc = swe_calc_ut(jd_ut, body, flags, out6, serr);
    if (serr[0] != '\0') {
        strncpy(bridge_error, serr, AS_MAXCH - 1);
        bridge_error[AS_MAXCH - 1] = '\0';
    } else {
        bridge_error[0] = '\0';
    }
    return rc;
}

int bridge_houses(double jd_ut, double lat, double lon, int hsys,
                  double *cusps13, double *ascmc10) {
    bridge_error[0] = '\0';
    return swe_houses(jd_ut, lat, lon, hsys, cusps13, ascmc10);
}
