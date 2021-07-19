#version 300 es
/**
 Position of the vertex in device coordinates, including the z component
 */
in vec3 inPosition;

/**
 X of the vertex in percentage from the first vertex on the left
 */
out float fsXPercentage;

/**
 Lower x of the life indicator
 */
uniform float startX;
/**
 Length of the life indicator
 */
uniform float width;

/**
 Width of the canvas
 */
uniform float canvasWidth;
/**
 Height of the canvas
 */
uniform float canvasHeight;



/**
 It calculates the homogeneous clipping coordinates of the vertex and the X of the vertex in percentage from the first vertex on the left
 */
void main() {
    fsXPercentage = (inPosition.x-startX)/width*100.0;
    gl_Position = vec4(2.0*inPosition.x/(canvasWidth-1.0)-1.0, -2.0*inPosition.y/(canvasHeight-1.0)+1.0, inPosition.z, 1.0);
}
