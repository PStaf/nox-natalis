#include "swephexp.h"

/* Thin ABI only: calculations remain in the official Swiss Ephemeris C code. */
int bridge_calc_ut(double jd_ut, int body, int flags, double *out6) {
    char serr[AS_MAXCH];
    return swe_calc_ut(jd_ut, body, flags, out6, serr);
}

int bridge_houses(double jd_ut, double lat, double lon, int hsys,
                  double *cusps13, double *ascmc10) {
    return swe_houses(jd_ut, lat, lon, hsys, cusps13, ascmc10);
}
