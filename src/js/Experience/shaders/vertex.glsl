uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uProgress;
uniform vec3 uResolution;
uniform vec2 uQuadsize;

attribute vec2 uv;
attribute vec3 position;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec4 defaultState = modelMatrix * vec4(position, 1.0);
    vec4 fullScreenState = vec4(position, 1.0);

    fullScreenState.x *= uResolution.x / uQuadsize.x;
    fullScreenState.y *= uResolution.y / uQuadsize.y;

    vec4 finalState = mix(defaultState, fullScreenState, uProgress);
    
    // Applique les transformations de vue et de projection
    gl_Position = projectionMatrix * viewMatrix * finalState;
}