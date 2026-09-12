/*
 * Minimal browser bridge for Swiss Ephemeris.
 * The generated ./vendor/swisseph.js/.wasm/.data are built by GitHub Actions
 * directly from the official Astrodienst Swiss Ephemeris sources and data.
 */
import createModule from './vendor/swisseph.js';

const BODY = {
  Sun:0, Moon:1, Mercury:2, Venus:3, Mars:4, Jupiter:5, Saturn:6,
  Uranus:7, Neptune:8, Pluto:9, TrueNode:11, Chiron:15,
  MeanApogee:12, WhiteMoon:56
};

export async function createSwissEph(){
  const Module = await createModule({
    locateFile(path){ return new URL('./vendor/'+path, import.meta.url).href; }
  });

  const malloc = Module._malloc, free = Module._free;
  const cInit = Module.cwrap('bridge_init',null,[]);
  const cLastError = Module.cwrap('bridge_last_error','string',[]);
  const cJulday = Module.cwrap('swe_julday','number',['number','number','number','number','number']);
  const cCalc = Module.cwrap('bridge_calc_ut','number',['number','number','number','number']);
  const cHouses = Module.cwrap('bridge_houses','number',['number','number','number','number','number','number']);
  const cClose = Module.cwrap('swe_close',null,[]);
  const getValue = Module.getValue;

  /* Point Swiss Ephemeris at the Emscripten virtual filesystem. */
  cInit();

  function calc_ut(jd, body, flags){
    const ptr=malloc(6*8);
    try{
      const rc=cCalc(jd,body,flags,ptr);
      if(rc<0){
        const detail=cLastError();
        throw new Error(detail || ('Swiss Ephemeris: ошибка расчёта объекта '+body));
      }
      const a=Array.from({length:6},(_,i)=>getValue(ptr+i*8,'double'));
      return {longitude:a[0],latitude:a[1],distance:a[2],
              longitudeSpeed:a[3],latitudeSpeed:a[4],distanceSpeed:a[5],
              flags:rc};
    } finally { free(ptr); }
  }

  function houses(jd,lat,lon,system='P'){
    const cuspPtr=malloc(13*8), ascmcPtr=malloc(10*8);
    try{
      const rc=cHouses(jd,lat,lon,system.charCodeAt(0),cuspPtr,ascmcPtr);
      if(rc<0) throw new Error('Система домов Плацидуса не определена для этой широты');
      const raw=Array.from({length:13},(_,i)=>getValue(cuspPtr+i*8,'double'));
      const a=Array.from({length:10},(_,i)=>getValue(ascmcPtr+i*8,'double'));
      return {cusps:raw.slice(1,13),ascmc:a,ascendant:a[0],midheaven:a[1]};
    } finally { free(cuspPtr); free(ascmcPtr); }
  }

  return {
    SEFLG_SWIEPH:2, SEFLG_SPEED:256,
    SE_TRUE_NODE:BODY.TrueNode, SE_CHIRON:BODY.Chiron,
    SE_MEAN_APOG:BODY.MeanApogee, SE_WHITE_MOON:BODY.WhiteMoon,
    julday(y,m,d,h){ return cJulday(y,m,d,h,1); },
    calc_ut, houses,
    close(){ cClose(); }
  };
}
