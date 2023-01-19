// Define a função que converte longitude em coordenada de tile x
const long2tile = function (lon, zoom) {
  return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
}
  
// Define a função que converte latitude em coordenada de tile y
const lat2tile = function (lat, zoom) {
  return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
}
  
// Chame a função com a coordenada, o zoom mínimo e máximo desejados
const getTilesInCoordinate = function (lat, lon, minZoom, maxZoom) {
  if(!(lat && lon)) {
    return "Lat and Lon must be informed. Example: -63.80030,-9.02742";
  }
  else if (!minZoom){
    return "Min Zoom must be informed.";
  }
  else if(!maxZoom){
    maxZoom = minZoom
  }
  // Crie uma matriz para armazenar os tiles
  const tiles = [];
  
  // Percorra os níveis de zoom especificados
  for (let zoom = minZoom; zoom <= maxZoom; zoom++) {
    // Obtenha as coordenadas x e y do tile na coordenada especificada
    const tileX = long2tile(lon, zoom);
    const tileY = lat2tile(lat, zoom);

    // Adicione o tile à matriz
    tiles.push({ z: zoom,  y: tileY, x: tileX });
  }
  
  return tiles;
}
  
// Chame a função com os limites da região, o zoom mínimo e máximo desejados
const getTilesInBoundingBox  = function (bbox, minZoom, maxZoom) {
  if(!Array.isArray(bbox)) {
    return "Bounding Box must be informed. Type of ARRAY, example: [-63.80030,-9.02742,-63.21144,-8.66163]";
  }
  else if (!minZoom){
    return "Min Zoom must be informed.";
  }
  else if(!maxZoom){
    maxZoom = minZoom
  }
  // Crie uma matriz para armazenar os tiles
  const [west, south, east, north] = bbox;

  const tiles = [];

  // Percorra os níveis de zoom especificados
  for (let zoom = minZoom; zoom <= maxZoom; zoom++) {
    // Obtenha as coordenadas x e y do tile mínimo e máximo da região
    const minTileX = long2tile(west, zoom);
    const maxTileX = long2tile(east, zoom);
    const minTileY = lat2tile(north, zoom);
    const maxTileY = lat2tile(south, zoom);

    // Percorra os tiles x e y na região
    for (let x = minTileX; x <= maxTileX; x++) {
      for (let y = minTileY; y <= maxTileY; y++) {
        // Adicione o tile à matriz
        tiles.push({ x, y, z: zoom });
      }
    }
  }
  return tiles;
}
    
module.exports = { getTilesInBoundingBox, getTilesInCoordinate }
