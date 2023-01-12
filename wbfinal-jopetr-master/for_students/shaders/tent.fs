/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

varying vec3 v_normal;

const vec3 lightDir = vec3(0,0,1);
const vec3 baseColor = vec3(1,.8,.4);

uniform vec3 light1;
uniform vec3 dark1;
uniform vec3 dark2;

/* number of checks over the UV range */
uniform float checks;
uniform float width;

void main()
{
     vec3 nhat = normalize(v_normal);

    // deal with two sided lighting
    // light comes from above and below (use clamp rather than abs to get one sided)
    float light = abs(dot(nhat, lightDir));

    // brighten the base color
    //gl_FragColor = vec4(light * baseColor,1);

    float xp = v_uv.x * checks/2.0;
    float yp = v_uv.y * checks/2.0;

    float x = xp/0.5+yp;
    float y = xp/0.5-yp;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    //float d = sqrt(dx*dx + dy*dy);
    float d = abs(dx*dy);
    float dc = step(d,width);
    //float dc = .5;
    vec3 dark = dark1;
    if (mod(x, 1.0)==mod(x,2.0)) {
        dark = dark2;
    }

    vec3 m = mix(light1,dark,dc);
    if ((mod(x, 1.0)==mod(x,2.0) && mod(y, 1.0)!=mod(y,2.0)) || (mod(x, 1.0)!=mod(x,2.0) && mod(y, 1.0)==mod(y,2.0))) {
        m = mix(light1,light1,dc);
    }
    gl_FragColor = vec4(light*m, 1.);
}

