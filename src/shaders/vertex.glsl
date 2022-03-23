const float PI = 3.1415926535897932384626433832795;

uniform float uTime;
varying float vTime;
varying vec2 vUv;




void main()

{




  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

   gl_PointSize = 120.;

  // gl_Position = vec4(position, 1.0);
  // //

  vUv = uv;
  vTime = uTime;


}
