const float PI = 3.1415926535897932384626433832795;

uniform float uTime;
varying float vTime;
varying vec2 vUv;

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + 4.);
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + 4.);
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + 4.);
  // trip.xyz += warpsScale * .0125 * cos(21. * trip.yzx + (vTime * .25));
}



void main()

{




  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  coswarp(modelPosition.xyz, 1.);

  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

   gl_PointSize = 120.;

  // gl_Position = vec4(position, 1.0);
  // //

  vUv = uv;
  vTime = uTime;


}
