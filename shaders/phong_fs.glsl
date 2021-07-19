#version 300 es

precision mediump float;

/**
 Position of the fragment in camera space
*/
in vec3 fsPosition;
/**
 Normal vector on the fragment in camera space
 */
in vec3 fsNormal;
/**
 Uv coordinates on the fragment
*/
in vec2 fsUv;
/**
 Final color of the fragment
 */
out vec4 outColor;

/**
 Direction of the directional light
 */
uniform vec3 lightDirection;
/**
 Color of the directional light
 */
uniform vec3 lightColor;

/**
 Upper light of the hemispheric light
 */
uniform vec3 hemiLightUpper;
/**
 Lower light of the hemispheric light
*/
uniform vec3 hemiLightLower;
/**
 Direction vector of the hemispheric light
 */
uniform vec3 hemisphericD;

/**
 Albedo texture
 */
uniform sampler2D albedoTexture;
/**
 Whether to use the texture for the normal vector
 */
uniform bool useNormalTexture;
/**
 Texture that contains the encoding of the normal vectors
 */
uniform sampler2D normalTexture;




/**
 Color of the first point light
 */
uniform vec3 pl1Color;
/**
 Position of the first point light
 */
uniform vec3 pl1Pos;

/**
 Color of the second point light
 */
uniform vec3 pl2Color;
/**
 Position of the second point light
 */
uniform vec3 pl2Pos;

/**
 Target of the point light, it is the distance at which the light reduction is 1
 */
uniform float plTarget;
/**
 Decay factor of the point light
 */
uniform float plDecay;


/**
 Color of the spot light
 */
uniform vec3 spotlColor;
/**
 Position of the spot light
 */
uniform vec3 spotPos;
/**
 Direction of the spot light
 */
uniform vec3 spotDirection;
/**
 Target of the spot light, it is the distance at which the light reduction is 1
 */
uniform float spotTarget;
/**
 Decay factor of the spot light
 */
uniform float spotDecay;
/**
 Angle of the inside cone of the spot light
 */
uniform float spotConeIn;
/**
 Angle of the outside cone of the spot light
 */
uniform float spotConeOut;

/**
 Whether it is night in the game
 */
uniform bool isNight;


/**
 Constant Pi
 */
#define PI 3.14159265359
/**
 Power of clamp(dot(viewDirection, r), 0.0, 1.0) used in Phong specular
 reflection model
 */
#define GAMMA 50.0



/**
 It returns the BRDF (Bidirectional Reflectance Distribution Function)
 as a sum of Lambert diffuse reflection and Phong specular reflection
 */
vec3 lambertPhong(vec3 mD, vec3 nNormal, vec3 viewDirection, vec3 lightDirNorm) {
    vec3 mS = vec3(1.0, 1.0, 1.0);
    vec3 fDiffuse = clamp(mD * clamp(dot(lightDirNorm, nNormal), 0.0, 1.0), 0.0, 1.0);
    vec3 r = -reflect(lightDirNorm, nNormal);
    vec3 fSpecular = clamp(mS*pow(clamp(dot(viewDirection, r), 0.0, 1.0), GAMMA), 0.0, 1.0);
    vec3 lambertPhongLight = fDiffuse+fSpecular;
    return lambertPhongLight;
}


/**
 It calculates the final color of the fragment.
 First it calculates the normal vector: if the normal texture is used, the normal
 vector is calculated from the tangent space normal map.
 It calculates the hemispheric light and the directional light.
 If it is night, it calculates also the two point lights and the spot light.
 Finally it sums the contributions of the light to obtain the final color.
 The BRDF model that is used is the Lambert diffuse reflection and the Phong spcular reflection.
 */
void main() {
    
    ////Tangent space normal map
    vec3 n_x = fsNormal;
    vec3 n = normalize(n_x); //normal vector
    
    if(useNormalTexture) {
        // compute derivations of the position
        vec3 p_dx = dFdx(fsPosition);
        vec3 p_dy = dFdy(fsPosition);
        // compute derivations of the texture coordinate
        vec2 tc_dx = dFdx(fsUv);
        vec2 tc_dy = dFdy(fsUv);
        // tangent vector
        vec3 t_x = (tc_dy.y * p_dx - tc_dx.y * p_dy) / (tc_dx.x*tc_dy.y - tc_dy.x*tc_dx.y);
        vec3 t = normalize(t_x);
        t = normalize(t - dot(t, n)*n);
        vec3 b = normalize(cross(t, n));
        mat3 tbn = mat3(t, b, n);
        vec3 n_mc = vec3(texture(normalTexture, fsUv).xyz); //color of the normal map
        vec3 m = 2.0*n_mc - 1.0;
        n = normalize(tbn * m);
    }
    
    vec3 nNormal = n; //final normal vector
    
    
    vec3 viewDirection = normalize(-fsPosition);
    
    vec3 mD = vec3(texture(albedoTexture, fsUv).xyz);
    
    
    ////Hemispheric light
    vec3 ambientLightReflectionColor = mD;
    float nNormalDotD = dot(nNormal, hemisphericD);
    vec3 hemisphericLight = (nNormalDotD+1.0)/2.0*hemiLightUpper+(1.0-nNormalDotD)/2.0*hemiLightLower;
    
    vec3 directionalLight;
    vec3 pl1FinalLight;
    vec3 pl2FinalLight;
    vec3 spotFinalLight;
    
    if(isNight) {
        ////pointLight1
        float pl1reduction = pow(plTarget / length(pl1Pos - fsPosition), plDecay);
        vec3 lightDirNorm = normalize(pl1Pos - fsPosition);
        vec3 fpl1 = lambertPhong(mD, nNormal, viewDirection, lightDirNorm);
        pl1FinalLight = pl1Color * pl1reduction * fpl1;
        
        ////pointLight2
        float pl2reduction = pow(plTarget / length(pl2Pos - fsPosition), plDecay);
        lightDirNorm = normalize(pl2Pos - fsPosition);
        vec3 fpl2 = lambertPhong(mD, nNormal, viewDirection, lightDirNorm);
        pl2FinalLight = pl2Color * pl2reduction * fpl2;
        
        ////spotLight
        float cout = cos(radians(spotConeOut/2.0));
        float cin = cos(radians(spotConeIn/2.0));
        lightDirNorm = normalize(spotPos - fsPosition);
        float spotReduction = pow(spotTarget / length(spotPos - fsPosition), spotDecay);
        float cosAlpha = dot(normalize(spotPos - fsPosition), -spotDirection);
        float spotConeDimmingEffect = clamp(((cosAlpha-cout)/(cin-cout)), 0.0, 1.0);
        vec3 fSpot = lambertPhong(mD, nNormal, viewDirection, lightDirNorm);
        spotFinalLight = spotlColor * spotReduction * spotConeDimmingEffect * fSpot;

    } else {
        pl1FinalLight = vec3(0.0, 0.0, 0.0);
        pl2FinalLight = vec3(0.0, 0.0, 0.0);
        spotFinalLight = vec3(0.0, 0.0, 0.0);
    }
    
    ////directional light
    vec3 lightDirNorm = normalize(-lightDirection);
    vec3 fDirectional = lambertPhong(mD, nNormal, viewDirection, lightDirNorm);
    directionalLight = lightColor*fDirectional;
    
    
    vec4 totalLight = vec4(directionalLight + pl1FinalLight + pl2FinalLight + spotFinalLight + hemisphericLight*ambientLightReflectionColor, 1.0);
    
    
    outColor = clamp(totalLight, 0.0, 1.0);
}

