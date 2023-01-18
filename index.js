// Define a função que converte longitude em coordenada de tile x
const long2tile = function (lon, zoom) {
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
}
  
  // Define a função que converte latitude em coordenada de tile y
const lat2tile = function (lat, zoom) {
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
}
  
  // Chame a função com a coordenada, o zoom mínimo e máximo desejados
  //const tiles = getTilesAtCoordinate(51.505, -0.09, 14,14);
const getTilesInCoordinate = function (lat, lon, minZoom, maxZoom) {
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
  //const tiles = getTilesInRegion(51.505, -0.09, 51.505, -0.09, 14,14);
  
const getTilesInBoundingBox  = function (bbox, minZoom, maxZoom) {
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
    
    
  //Exemplo::
  // console.log(getTilesInCoordinate(51.505, -0.09, 8,18))
  // console.log(getTilesInBoundingBox([-63.80030144248754,-9.027423880337274,-63.21144564212207,-8.661633120201714], 12,12))
  
  
  
  module.exports = { getTilesInBoundingBox, getTilesInCoordinate }
