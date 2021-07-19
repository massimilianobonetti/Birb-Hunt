#version 300 es

precision mediump float;

/**
 X of the vertex in percentage from the first vertex on the left
 */
in float fsXPercentage;
/**
 Final color of the fragment
 */
out vec4 outColor;

/**
 Life of the player
 */
uniform float life;

/**
 Color of the life of the player
 */
#define LIFE_COLOR vec3(17.0/255.0, 186.0/255.0, 39.0/255.0)
/**
Color of the damages of the player
*/
#define DAMAGES_COLOR vec3(186.0/255.0, 17.0/255.0, 17.0/255.0)

/**
 It calculates the final color of the fragment. In particular it calculates the life indicator of the player.
 The life is colored with LIFE_COLOR, while the damages are colored with DAMAGES_COLOR.
 */
void main() {
    if(fsXPercentage<=ceil(life)) {
        outColor = vec4(LIFE_COLOR, 1.0);
    } else {
        outColor = vec4(DAMAGES_COLOR, 1.0);
    }
}
