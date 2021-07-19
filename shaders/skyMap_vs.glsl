#version 300 es
/**
 Position of the vertex in clipping coordinates (Cartesian, 3D)
 */
in vec3 inPosition;
/**
 Direction vector that is used to sample the color from the sky box
 */
out vec3 sampleDir;

/**
 It calculates the direction vector that is used to sample the color from the sky box and homogeneous
 clipping coordinates of the vertex
 */
void main() {
    sampleDir = vec3(inPosition.x, inPosition.y, inPosition.z);
    gl_Position = vec4(inPosition.x, inPosition.y, inPosition.z, 1.0);
}
