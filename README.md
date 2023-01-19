# path2tiles
Simple package for building the tiles paths. From a coordinate or Bounding Box.
To build the complete address for your service you should use the fragment of information show in exemples.


## Install
```node
npm install path2tiles
```

## Examples
```javascript
import path2tiles from 'path2tiles'
```

#### getTilesInCoordinate(lat, lon, minZoom, maxZoom)
```javascript
path2tiles.getTilesInCoordinate(-63.80030,-9.02742, 7,10)

```
##### Response
```javascript
[
  { z: 7, y: 93, x: 60 },
  { z: 8, y: 187, x: 121 },
  { z: 9, y: 374, x: 243 },
  { z: 10, y: 749, x: 486 }
]
```

#### getTilesInBoundingBox(bbox, minZoom, maxZoom)
```javascript
path2tiles.getTilesInBoundingBox([-63.80030,-9.02742,-63.21144,-8.66163], 7,10)

```
##### Response
```javascript
[
  { x: 41, y: 67, z: 7 },
  { x: 82, y: 134, z: 8 },
  { x: 83, y: 134, z: 8 },
  { x: 165, y: 268, z: 9 },
  { x: 166, y: 268, z: 9 },
  { x: 330, y: 536, z: 10 },
  { x: 330, y: 537, z: 10 },
  { x: 331, y: 536, z: 10 },
  { x: 331, y: 537, z: 10 },
  { x: 332, y: 536, z: 10 },
  { x: 332, y: 537, z: 10 }
]
```
