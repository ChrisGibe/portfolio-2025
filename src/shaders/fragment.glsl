uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform float uProgress;

varying vec2 vUv;
varying vec2 vSize;

vec2 getUV(vec2 uv, vec2 textureSize, vec2 quadSize) {
    vec2 tempUV = uv - vec2(0.5);

    float quadAspect = quadSize.x / quadSize.y;
    float textureAspect = textureSize.x / textureSize.y;

    if(quadAspect<textureAspect){
        tempUV = tempUV*vec2(quadAspect/textureAspect, 1.);
    }else {
        tempUV = tempUV*vec2(1., textureAspect/quadAspect);
    }

    tempUV += vec2(0.5);
    return tempUV;
}

void main() {
    vec2 correctUV = getUV(vUv, uTextureSize, vSize);
    vec4 image = texture(uTexture, correctUV);
    gl_FragColor = vec4(vUv, 0., 1.);
    gl_FragColor = image;
}
