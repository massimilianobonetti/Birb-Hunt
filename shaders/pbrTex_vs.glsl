#version 300 es

/**
 Position of the vertex in local space
 */
in vec3 inPosition;
/**
 Normal vector on the vertex in local space
 */
in vec3 inNormal;
/**
 Uv coordinates on the vertex
*/
in vec2 inUv;
/**
 Position of the vertex in camera space
 */
out vec3 fsPosition;
/**
 Normal vector on the vertex in camera space
 */
out vec3 fsNormal;
/**
 Uv coordinates on the vertex
*/
out vec2 fsUv;


/**
 World-View-Projection matrix
 */
uniform mat4 wvpMatrix;
/**
 Matrix used to transform the normal vector. It is the inverse transpose
 of the World-View matrix
 */
uniform mediump mat4 normalMatrix;
/**
 World-View matrix
 */
uniform mat4 wvMatrix;

/**
 It calculates for each vertex: the uv coordinates, the normal vector in camera space, the position in camera space and the position in clipping space.
 */
void main() {
    fsUv = inUv;
    fsNormal = mat3(normalMatrix)*inNormal;
    fsPosition = (wvMatrix*vec4(inPosition,1.0)).xyz;
    gl_Position = wvpMatrix * vec4(inPosition,1.0);
}
