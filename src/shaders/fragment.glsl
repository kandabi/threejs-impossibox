

varying vec3 vNormal;

uniform samplerCube cubeMap;

void main() {
  gl_FragColor = textureCube(cubeMap, normalize(vNormal));
}