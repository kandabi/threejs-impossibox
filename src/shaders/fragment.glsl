

varying vec3 vNormal;

uniform samplerCube cubeMap;

void main() {
  gl_FragColor = textureCube(cubeMap, normalize(vNormal));
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}