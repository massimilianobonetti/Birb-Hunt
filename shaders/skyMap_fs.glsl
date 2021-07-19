#version 300 es

precision mediump float;

/**
 Direction vector that is used to sample the color from the sky box
 */
in vec3 sampleDir;
/**
 Final color of the fragment
 */
out vec4 outColor;

/**
 Sky box
 */
uniform samplerCube textureSampler;
/**
 Inverse of the View-Projection matrix
 */
uniform mat4 inverseViewProjMatrix;

/**
 Whether it is night in the game
 */
uniform bool isNight;

/**
 When it is night the light is reduced by a factor of LIGHT_REDUCTION_AT_NIGHT
 */
#define LIGHT_REDUCTION_AT_NIGHT 0.3

/**
 It calculates the final color of the fragment. In particular it calculates the sky box of the game, by trasforming
 the direction vector sampler of the fragment into the world space and by sampling the sky box with the resulting normalized
 vector.
 If it is night the light is reduced by a factor of LIGHT_REDUCTION_AT_NIGHT.
 */
void main() {
    
    vec4 sampleDirTransformed = inverseViewProjMatrix*vec4(sampleDir, 1.0);
    
    vec3 sampleDirTransformed3 = normalize(sampleDirTransformed.xyz / sampleDirTransformed.w);
    
    vec4 rgba = texture(textureSampler, vec3(-sampleDirTransformed3.x, sampleDirTransformed3.y, sampleDirTransformed3.z));
    
    if(isNight) {
        rgba = rgba*LIGHT_REDUCTION_AT_NIGHT;
    }
    
    outColor = vec4(clamp(rgba.rgb, 0.0, 1.0), 1.0);
}
