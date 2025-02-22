uniform float uTime;
varying float pulse;

void main() {
  vec3 newPosition = position;
  newPosition.z = sin(newPosition.x * 30. + uTime) * 0.1;
  pulse = 2. * newPosition.z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0);
}