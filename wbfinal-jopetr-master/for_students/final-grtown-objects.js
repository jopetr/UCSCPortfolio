/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Box2, MirroredRepeatWrapping, Texture } from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "../libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class Ground extends GrObject {
    constructor() {
        let s = new T.Group();
        let g = new T.BoxGeometry(115,1,115);
        let tex = new T.TextureLoader().load("./images/asphalt.jpeg");
        let m = new T.MeshStandardMaterial({map: tex})
        let sm = new T.Mesh(g, m);
        sm.position.y-=0.5;
        s.add(sm);
        super("Ground", s);
    }
}

export class ConstructionSite extends GrObject {
    constructor() {
        let c = new T.Group();
        let g1 = new T.BoxGeometry(14, 0.1, 39);
        let tex = new T.TextureLoader().load("./images/dirt.jpeg");
        let m1 = new T.MeshStandardMaterial({map: tex, bumpMap: tex, bumpScale: 0.4});
        let c1 = new T.Mesh(g1, m1);
        c.add(c1);
        let am = new T.MeshStandardMaterial({
            color: "#888888",
            metalness: 0.6,
            roughness: 0.3
          });
        let g2 = new T.BoxGeometry(14, 0.1, 0.1);
        let g3 = new T.BoxGeometry(0.1, 0.1, 39);
        let g4 = new T.BoxGeometry(0.1, 1, 0.1);
        let pos = [7, 0.5, -19.5,
                    7, 0.5, -9.75,
                    7, 0.5, 0,
                    7, 0.5, 9.75,
                    7, 0.5, 19.5,
                    0, 0.5, 19.5,
                    -7, 0.5, 19.5,
        ];
        for (let i=0; i<pos.length; i+=3) {
            let p = new T.Mesh(g4, am);
            c1.add(p);
            p.position.set(pos[i],pos[i+1],pos[i+2]);
        }
        let p1 = new T.Mesh(g3,am);
        c1.add(p1);
        p1.position.set(7, 0.5, 0);
        let p2 = new T.Mesh(g3,am);
        c1.add(p2);
        p2.position.set(7, 1, 0);
        let p3 = new T.Mesh(g2,am);
        c1.add(p3);
        p3.position.set(0, 0.5, 19.5);
        let p4 = new T.Mesh(g2,am);
        c1.add(p4);
        p4.position.set(0, 1, 19.5);
        super("ConstructionSite", c);
    }
}



export class StreetBlock extends GrObject {
    constructor(variant) {
        // Sidewalk

        let s = new T.Group();
        let sc = new T.Group();
        let arr = [];
        for (let i=0; i<10; i++) {
            let ang1 = 2*Math.PI*i*9/360;
            let ang2 = 2*Math.PI*(i+1)*9/360;
            let r1 = 10;
            let r2 = 11;
            let h = 0.1;
            let vert = new Float32Array( [
                r2*Math.cos(ang1), h, r2*Math.sin(ang1),
                r1*Math.cos(ang1), h, r1*Math.sin(ang1),
                r1*Math.cos(ang2), h, r1*Math.sin(ang2),

                r1*Math.cos(ang2), h, r1*Math.sin(ang2),
                r2*Math.cos(ang2), h, r2*Math.sin(ang2),
                r2*Math.cos(ang1), h, r2*Math.sin(ang1),

                r1*Math.cos(ang1), h, r1*Math.sin(ang1),
                r1*Math.cos(ang1), 0, r1*Math.sin(ang1),
                r1*Math.cos(ang2), 0, r1*Math.sin(ang2),

                r1*Math.cos(ang2), 0, r1*Math.sin(ang2),
                r1*Math.cos(ang2), h, r1*Math.sin(ang2),
                r1*Math.cos(ang1), h, r1*Math.sin(ang1),

                r2*Math.cos(ang2), h, r2*Math.sin(ang2),
                r2*Math.cos(ang2), 0, r2*Math.sin(ang2),
                r2*Math.cos(ang1), 0, r2*Math.sin(ang1),

                r2*Math.cos(ang1), 0, r2*Math.sin(ang1),
                r2*Math.cos(ang1), h, r2*Math.sin(ang1),
                r2*Math.cos(ang2), h, r2*Math.sin(ang2),


            ]);
            let uv = new Float32Array( [
                0,1,
                0,0,
                1,0,

                1,0,
                1,1,
                0,1,

                0,1,
                0,0,
                1,0,

                1,0,
                1,1,
                0,1,

                0,1,
                1,1,
                1,0,

                1,0,
                0,0,
                0,1,

                
            ]);

            let geo = new T.BufferGeometry();
            geo.setAttribute('position',new T.BufferAttribute(vert,3));
            geo.computeVertexNormals();
            let tl = new T.TextureLoader().load("./images/sidewalk.jpg");
            geo.setAttribute('uv',new T.BufferAttribute(uv,2));
            let mat = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            map: tl
            });
            arr[i] = new T.Mesh(geo, mat);
            sc.add(arr[i]);
            

        }
        sc.position.x+=1;
        sc.position.z+=1;
        s.add(sc);
        
        let width = 40;
        for (let i=0; i<width; i++) {
            let g = new T.BoxGeometry(1,0.1,1);
            let tex = new T.TextureLoader().load("./images/concrete.jpg");
            let m = new T.MeshStandardMaterial({map: tex})
            let ss1 = new T.Mesh(g, m);
            let ss2 = new T.Mesh(g, m);
            let ss3 = new T.Mesh(g, m);
            let ss4 = new T.Mesh(g, m);
            if (i>9 && !(i<25 && i>19)) {
                s.add(ss1);
                ss1.position.set(i+1.5,0.05,0.5);
                s.add(ss2);
                ss2.position.set(0.5,0.05,i+1.5);
            }
            if (i!=(width-1)) {
                s.add(ss3);
                ss3.position.set(i+1.5,0.05,width+0.5);
            }
            s.add(ss4);
            ss4.position.set(width+0.5,0.05,i+1.5);
            
        }

        // Grass

        arr = [];
        let gc = new T.Group();
        let verts = new Float32Array(0);
        let uvs = new Float32Array(0);
        for (let i=0; i<10; i++) {
            for (let j=0; j<9; j++) {
                let ang1 = 2*Math.PI*i*9/360;
                let ang2 = 2*Math.PI*(i+1)*9/360;
                let r1 = 11+j;
                let r2 = 12+j;
                let h = 0.1;
                let vert = new Float32Array( [
                    r2*Math.cos(ang1), h, r2*Math.sin(ang1),
                    r1*Math.cos(ang1), h, r1*Math.sin(ang1),
                    r1*Math.cos(ang2), h, r1*Math.sin(ang2),

                    r1*Math.cos(ang2), h, r1*Math.sin(ang2),
                    r2*Math.cos(ang2), h, r2*Math.sin(ang2),
                    r2*Math.cos(ang1), h, r2*Math.sin(ang1),

                    r1*Math.cos(ang1), h, r1*Math.sin(ang1),
                    r1*Math.cos(ang1), 0, r1*Math.sin(ang1),
                    r1*Math.cos(ang2), 0, r1*Math.sin(ang2),

                    r1*Math.cos(ang2), 0, r1*Math.sin(ang2),
                    r1*Math.cos(ang2), h, r1*Math.sin(ang2),
                    r1*Math.cos(ang1), h, r1*Math.sin(ang1),

                    r2*Math.cos(ang2), h, r2*Math.sin(ang2),
                    r2*Math.cos(ang2), 0, r2*Math.sin(ang2),
                    r2*Math.cos(ang1), 0, r2*Math.sin(ang1),

                    r2*Math.cos(ang1), 0, r2*Math.sin(ang1),
                    r2*Math.cos(ang1), h, r2*Math.sin(ang1),
                    r2*Math.cos(ang2), h, r2*Math.sin(ang2),


                ]);
                let uv = new Float32Array( [
                    0,1,
                    0,0,
                    1,0,

                    1,0,
                    1,1,
                    0,1,

                    0,1,
                    0,0,
                    1,0,

                    1,0,
                    1,1,
                    0,1,

                    0,1,
                    1,1,
                    1,0,

                    1,0,
                    0,0,
                    0,1,

                    
                ]);

                
                if (i%2==0 && j%2==0) {
                    if (Math.random()<0.8) {
                        let pt = new PalmTree().objects[0];
                        pt.position.set(((r1+r2)/2)*Math.cos((ang1+ang2)/2)+0.7*(Math.random()-0.5), pt.position.y, ((r1+r2)/2)*Math.sin((ang1+ang2)/2)+0.7 *(Math.random()-0.5));
                        pt.scale.set(2,2+2*Math.random(),2);
                        pt.rotateY(Math.random()*2*Math.PI);
                        gc.add(pt);
                    }
                }

                
                let temp = new Float32Array(uvs.length+uv.length);
                temp.set(uvs);
                temp.set(uv, uvs.length);
                uvs = temp;
                temp = new Float32Array(verts.length+vert.length);
                temp.set(verts);
                temp.set(vert, verts.length);
                verts = temp;
                
                
            }
            

        }
        let geo = new T.BufferGeometry();
        geo.setAttribute('position',new T.BufferAttribute(verts,3));
        geo.computeVertexNormals();
        let tl = new T.TextureLoader().load("./images/grass.jpeg");
        geo.setAttribute('uv',new T.BufferAttribute(uvs,2));
        let mat = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl
        });
        
        let gb = new T.Mesh(geo, mat);
        gc.add(gb);
        gc.position.x+=1;
        gc.position.z+=1;
        s.add(gc);

        let verts2 = new Float32Array(0);
        let uvs2 = new Float32Array(0);

        for (let i=2; i<41; i++) {
            for (let j=2; j<41; j++) {
                
                let vert = new Float32Array( [
                    
                    i-1, 0.1, j,
                    i, 0.1, j,
                    i, 0.1, j-1,

                    i, 0.1, j-1,
                    i-1, 0.1, j-1,
                    i-1, 0.1, j,
                ]);
                let uv = new Float32Array( [
                    
                    0,1,
                    1,1,
                    1,0,

                    1,0,
                    0,0,
                    0,1,
                ])
                if (!(i<27 && j<27)) {
                    let temp = new Float32Array(uvs2.length+uv.length);
                    temp.set(uvs2);
                    temp.set(uv, uvs2.length);
                    uvs2 = temp;
                    temp = new Float32Array(verts2.length+vert.length);
                    temp.set(verts2);
                    temp.set(vert, verts2.length);
                    verts2 = temp;
                }
            }
        }

        let geo2 = new T.BufferGeometry();
        geo2.setAttribute('position',new T.BufferAttribute(verts2,3));
        geo2.computeVertexNormals();
        let tl2 = new T.TextureLoader().load("./images/grass.jpeg");
        geo2.setAttribute('uv',new T.BufferAttribute(uvs2,2));
        let mat2 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl2
        });
        let gs = new T.Mesh(geo2, mat2);
        s.add(gs);

        let g1 = new T.BoxGeometry(25,0.1,0);
        let g2 = new T.BoxGeometry(0,0.1,25);
        let tex = new T.TextureLoader().load("./images/grass.jpeg");
        let m = new T.MeshStandardMaterial({map: tex})
        let gb1 = new T.Mesh(g1, m);
        let gb2 = new T.Mesh(g2, m);
        s.add(gb1);
        s.add(gb2);
        gb1.position.set(13.5, 0.05, 26);
        gb2.position.set(26, 0.05, 13.5);

        let g3 = new T.BoxGeometry(28, 1, 1);
        tex = new T.TextureLoader().load("./images/bush.jpg");
        m = new T.MeshStandardMaterial({map: tex})
        let b = new T.Mesh(g3, m);
        s.add(b);
        b.position.set(26.5, 0.6, -7.5);

        let g4 = new T.BoxGeometry(30, 0.1, 3);
        tex = new T.TextureLoader().load("./images/concrete.jpg");
        m = new T.MeshStandardMaterial({map: tex})
        let b2 = new T.Mesh(g4, m);
        s.add(b2);
        b2.position.set(26.5, 0.05, -7.5);

        s.receiveShadow = true;
        s.castShadow = true;
        super("StreetBlock"+String(variant), s);

    }
}

export class PalmTree extends GrObject {
    constructor(num) {
        let p = new T.Group();
        let g1 = new T.CylinderGeometry(0.05, 0.1, 1.5);
        let mat1 = new T.MeshStandardMaterial({
            color: "brown",
            roughness: 0.75,
        });
        let p1 = new T.Mesh(g1, mat1);
        p.add(p1);

        let g2 = new T.CylinderGeometry(0.05, 0.1, 0.5);
        let mat2 = new T.MeshStandardMaterial({
            color: "green",
            roughness: 0.75,
        });
        let mat3 = new T.MeshStandardMaterial({
            color: "darkgreen",
            roughness: 1,
        });

        let l1 = new T.Mesh(g2, mat2);
        p.add(l1);
        l1.position.y+=0.75;
        l1.rotation.x+=Math.PI/2-0.1;
        l1.position.z+=0.25;

        let l2 = new T.Mesh(g2, mat3);
        p.add(l2);
        l2.position.y+=0.75;
        l2.rotation.z+=Math.PI/2-0.1;
        l2.position.x-=0.25;

        let l3 = new T.Mesh(g2, mat2);
        p.add(l3);
        l3.position.y+=0.75;
        l3.rotation.x-=Math.PI/2-0.1;
        l3.position.z-=0.25;

        let l4 = new T.Mesh(g2, mat3);
        p.add(l4);
        l4.position.y+=0.75;
        l4.rotation.z-=Math.PI/2-0.1;
        l4.position.x+=0.25;

        let g3 = new T.CylinderGeometry(0, 0.05, 0.35);
        
        let l5 = new T.Mesh(g3, mat3);
        l1.add(l5);
        l5.position.y+=0.35;
        l5.position.z+=0.1;
        l5.rotation.x+=Math.PI/4;

        let l6 = new T.Mesh(g3, mat2);
        l2.add(l6);
        l6.position.y+=0.35;
        l6.position.x-=0.1;
        l6.rotation.z+=Math.PI/4;

        let l7 = new T.Mesh(g3, mat3);
        l3.add(l7);
        l7.position.y+=0.35;
        l7.position.z-=0.1;
        l7.rotation.x-=Math.PI/4;

        let l8 = new T.Mesh(g3, mat2);
        l4.add(l8);
        l8.position.y+=0.35;
        l8.position.x+=0.1;
        l8.rotation.z-=Math.PI/4;
        let ps = p.clone();
        ps.rotateY(Math.PI/4);
        p.add(ps);
        p.position.y+=0.6;
        p.scale.x = 0.8;
        p.scale.y = 0.8;
        p.scale.z = 0.8;
        super("PalmTree"+String(num), p);
    }
}

export class Store extends GrObject {
    constructor(variant) {
        const vertices1 = new Float32Array( [
            -1, 1, 0,     // 1A note that we need to keep this ccw
            -1, 0, 0,       // 1B
            1, 0, 0,       // 1C
            
            1, 0, 0,      // second triangle
            1, 1, 0,       // 2B
            -1, 1, 0        // 2C
        ]);
        const vertices2 = new Float32Array( [
            -0.5, 1, 0,     // 1A note that we need to keep this ccw
            -0.5, 0, 0,       // 1B
            0.5, 0, 0,       // 1C
            
            0.5, 0, 0,      // second triangle
            0.5, 1, 0,       // 2B
            -0.5, 1, 0        // 2C
        ]);
        const vertices3 = new Float32Array( [
            -1, 1, 0.5,     // 1A note that we need to keep this ccw
            1, 1, 0.5,       // 1B
            0, 1.25, 0,       // 1C
            1,1,0.5,
            1,1,-0.5,
            0, 1.25, 0
            
        ]);

        const uvs1 = new Float32Array( [
            0,0.8,
            0,0,
            1,0,
            1,0,
            1,0.8,
            0,0.8
        ]);

        const uvs3 = new Float32Array( [
            0,0,
            1,0,
            0.5,1,
            0,0,
            1,0,
            0.5,1
        ]);
        let txts = [];
        txts[0] = "./images/711front.png";
        txts[1] = "./images/blbfront.jpeg";
        txts[2] = "./images/greenroof.jpeg";
        txts[3] = "./images/blueroof.png";
        let geo1 = new T.BufferGeometry();
        geo1.setAttribute('position',new T.BufferAttribute(vertices1,3));
        geo1.computeVertexNormals();
        let tl1 = new T.TextureLoader().load(txts[variant]);
        let d = new T.Group();
        geo1.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let mat1 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl1
        });
        let s1 = new T.Mesh(geo1, mat1);
        d.add(s1);
        s1.position.z+=0.5;

        let geo2 = new T.BufferGeometry();
        geo2.setAttribute('position',new T.BufferAttribute(vertices1,3));
        geo2.computeVertexNormals();
        
        
        let tl2 = new T.TextureLoader().load("./images/grayconcrete.jpeg");
        geo2.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let mat2 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl2
        });
        let s2 = new T.Mesh(geo2, mat2);
        d.add(s2);
        s2.rotateY(Math.PI);
        s2.position.z-=0.5;

        let geo3 = new T.BufferGeometry();
        geo3.setAttribute('position',new T.BufferAttribute(vertices2,3));
        geo3.computeVertexNormals();
        geo3.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let s3 = new T.Mesh(geo3, mat2);
        d.add(s3);
        s3.rotateY(Math.PI/2);
        s3.position.x+=1;
        let s4 = new T.Mesh(geo3, mat2);
        d.add(s4);
        s4.rotateY(3*Math.PI/2);
        s4.position.x-=1;
        
        let geo4 = new T.BufferGeometry();
        geo4.setAttribute('position',new T.BufferAttribute(vertices3,3));
        geo4.computeVertexNormals();
        let tl3 = new T.TextureLoader().load(txts[2+variant]);
        geo4.setAttribute('uv',new T.BufferAttribute(uvs3,2));
        let mat3 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 1,
        map: tl3
        });
        let s5 = new T.Mesh(geo4, mat3);
        d.add(s5);
        let s6 = new T.Mesh(geo4, mat3);
        d.add(s6);
        s6.rotateY(Math.PI);


        super("Store"+String(variant), d);

    }
}

export class Resteraunt extends GrObject {
    constructor(variant) {
        const vertices1 = new Float32Array( [
            -0.75, 1, 0,     // 1A note that we need to keep this ccw
            -0.75, 0, 0,       // 1B
            0.75, 0, 0,       // 1C
            
            0.75, 0, 0,      // second triangle
            0.75, 1, 0,       // 2B
            -0.75, 1, 0        // 2C
        ]);
        const vertices2 = new Float32Array( [
            -0.5, 1, 0,     // 1A note that we need to keep this ccw
            -0.5, 0, 0,       // 1B
            0.5, 0, 0,       // 1C
            
            0.5, 0, 0,      // second triangle
            0.5, 1, 0,       // 2B
            -0.5, 1, 0        // 2C
        ]);
        const vertices3 = new Float32Array( [
            -0.75, 1, -0.5,     // 1A note that we need to keep this ccw
            -0.75, 1, 0.5,       // 1B
            -0.75, 1.25, 0,       // 1C
            -0.75,1.25,0,
            -0.75,1,0.5,
            0.75, 1, 0.5,
            0.75, 1, 0.5,
            0.75, 1.25, 0,
            -0.75, 1.25, 0
            
        ]);

        const uvs1 = new Float32Array( [
            0,1,
            0,0,
            1,0,
            1,0,
            1,1,
            0,1
        ]);

        const uvs3 = new Float32Array( [
            0,0,
            1,0,
            0.5,1,
            0,1,
            0,0,
            1,0,
            1,0,
            1,1,
            0,1
        ]);
        let txts = [];
        txts[0] = "./images/mcfront.png";
        txts[1] = "./images/kfcfront.png";
        let geo1 = new T.BufferGeometry();
        geo1.setAttribute('position',new T.BufferAttribute(vertices1,3));
        geo1.computeVertexNormals();
        let tl1 = new T.TextureLoader().load(txts[variant]);
        let d = new T.Group();
        geo1.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let mat1 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl1
        });
        let s1 = new T.Mesh(geo1, mat1);
        d.add(s1);
        s1.position.z+=0.5;

        let geo2 = new T.BufferGeometry();
        geo2.setAttribute('position',new T.BufferAttribute(vertices1,3));
        geo2.computeVertexNormals();
        
        
        let tl2 = new T.TextureLoader().load("./images/beigebrick.png");
        geo2.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let mat2 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl2
        });
        let s2 = new T.Mesh(geo2, mat2);
        d.add(s2);
        s2.rotateY(Math.PI);
        s2.position.z-=0.5;

        let geo3 = new T.BufferGeometry();
        geo3.setAttribute('position',new T.BufferAttribute(vertices2,3));
        geo3.computeVertexNormals();
        geo3.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let s3 = new T.Mesh(geo3, mat2);
        d.add(s3);
        s3.rotateY(Math.PI/2);
        s3.position.x+=0.75;
        let s4 = new T.Mesh(geo3, mat2);
        d.add(s4);
        s4.rotateY(3*Math.PI/2);
        s4.position.x-=0.75;
        
        let geo4 = new T.BufferGeometry();
        geo4.setAttribute('position',new T.BufferAttribute(vertices3,3));
        geo4.computeVertexNormals();
        let tl3 = new T.TextureLoader().load("./images/redroof.png");
        geo4.setAttribute('uv',new T.BufferAttribute(uvs3,2));
        let mat3 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 1,
        map: tl3
        });
        let s5 = new T.Mesh(geo4, mat3);
        d.add(s5);
        let s6 = new T.Mesh(geo4, mat3);
        d.add(s6);
        s6.rotateY(Math.PI);


        super("Resteraunt"+String(variant), d);

    }
}

export class ApartmentBuilding extends GrObject {
    constructor() {
        const vertices1 = new Float32Array( [
            -1,3,0,
            -1,0,0,
            1,0,0,
            1,0,0,
            1,3,0,
            -1,3,0
        ]);

        const uvs1 = new Float32Array( [
            0,1,
            0,0,
            1,0,
            1,0,
            1,1,
            0,1
        ]);

        let geo1 = new T.BufferGeometry();
        geo1.setAttribute('position',new T.BufferAttribute(vertices1,3));
        geo1.computeVertexNormals();
        let tl1 = new T.TextureLoader().load("./images/apartmentface.jpg");
        let d = new T.Group();
        geo1.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let mat1 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl1
        });
        let s1 = new T.Mesh(geo1, mat1);
        d.add(s1);
        s1.position.z+=2;
        s1.position.x-=1;
        let s2 = new T.Mesh(geo1, mat1);
        d.add(s2);
        s2.position.x+=1;
        let s3 = new T.Mesh(geo1, mat1);
        d.add(s3);
        s3.rotateY(Math.PI/2);
        s3.position.z+=1;
        let s4 = new T.Mesh(geo1, mat1);
        d.add(s4);
        s4.rotateY(Math.PI/2);
        s4.position.z-=1;
        s4.position.x+=2;
        let s5 = new T.Mesh(geo1, mat1);
        d.add(s5);
        s5.rotateY(3*Math.PI/2);
        s5.position.z-=1;
        s5.position.x-=2;
        let s6 = new T.Mesh(geo1, mat1);
        d.add(s6);
        s6.rotateY(3*Math.PI/2);
        s6.position.z+=1;
        s6.position.x-=2;
        let s7 = new T.Mesh(geo1, mat1);
        d.add(s7);
        s7.rotateY(Math.PI);
        s7.position.z-=2;
        s7.position.x+=1;
        let s8 = new T.Mesh(geo1, mat1);
        d.add(s8);
        s8.rotateY(Math.PI);
        s8.position.z-=2;
        s8.position.x-=1;

        const vertices2 = new Float32Array( [
            -2,3,2,
            0,3,2,
            -1,3.5,1,

            -1,3.5,1,
            0,3,2,
            0,3,0,

            0,3,0,
            -1,3.5,-1,
            -1,3.5,1,

            -1,3.5,-1,
            -2,3,-2,
            -2,3,2,

            -2,3,2,
            -1,3.5,1,
            -1,3.5,-1
            
        ]);

        const uvs2 = new Float32Array( [
            0,0,
            1,0,
            0.5,1,

            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1,

            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1

            
        ]);


        let geo2 = new T.BufferGeometry();
        geo2.setAttribute('position',new T.BufferAttribute(vertices2,3));
        geo2.computeVertexNormals();
        let tl2 = new T.TextureLoader().load("./images/blackroof.jpeg");
        geo2.setAttribute('uv',new T.BufferAttribute(uvs2,2));
        let mat2 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl2
        });
        let r1 = new T.Mesh(geo2, mat2);
        d.add(r1);

        let r2 = r1.clone();
        d.add(r2);
        r2.scale.set(1,1,-1);
        r2.rotateY(3*Math.PI/2);

        


        super("ApartmentBuilding", d);

    }
}

export class Bank extends GrObject {
    constructor() {
        let b = new T.Group();
        let b1 = new T.BoxGeometry(1.3,0.5,1);
        let b2 = new T.BoxGeometry(1.3, 0.5,0.01);
        let b3 = new T.BoxGeometry(0.01,0.5,1);
        let t1 = new T.TextureLoader().load("./images/grayconcrete.jpeg");
        let t2 = new T.TextureLoader().load("./images/bankfront.png");
        let t3 = new T.TextureLoader().load("./images/bankgarage.png");
        let m1 = new T.MeshStandardMaterial({map: t1});
        let m2 = new T.MeshStandardMaterial({map: t2});
        let m3 = new T.MeshStandardMaterial({map: t3});
        let bw1 = new T.Mesh(b1, m1);
        let bw2 = new T.Mesh(b2, m2);
        let bw3 = new T.Mesh(b3, m3);
        bw2.position.z-=0.5;
        bw3.position.x+=0.65;
        
        b.add(bw1);
        b.add(bw2);
        b.add(bw3);

        let em = new T.Group();
        b.add(em);
        

        super("Bank", b);
        this.time = 0;
        this.grp = em;
        this.exp = 0;

    }

    stepWorld(delta, timeOfDay) {
        this.time+=delta/20;
        let u = ((this.time-20)%200)/200;
        //console.log(u);
        if (u<0.1) {
            if (this.exp==0) {
                this.exp=1;
                for (let i=0; i<40; i++) {
                    
                    let g = new T.SphereGeometry((0.5*Math.random())/5);
                    let m = new T.MeshStandardMaterial({emissive: new T.Color( 1, Math.random(), 0.0 ), emissiveIntensity: 5, color: new T.Color( 1, Math.random(), 0.0 )});
               
                    let e = new T.Mesh(g,m);
                    this.grp.add(e);
                    e.position.set(0.65, 0.8*Math.random()-0.7, 0.26-0.2*Math.random());
                }
            }
            else {
                for (let i=0; i<40; i++) {
                    if (u<0.05) {
                        this.grp.children[i].scale.x+=0.15;
                        this.grp.children[i].scale.z+=0.15;
                    }
                    else {
                        this.grp.children[i].scale.x-=0.05;
                        this.grp.children[i].scale.z-=0.05;
                    }


                }

            }
        }
        else {
            this.exp = 0;
            this.grp.clear();
        }
      }
}

export class BackGroundCar extends GrObject {
    constructor(n) {
        let c = new T.Group();
        let num = Math.random();
        let variant = 0;
        if (num<0.25) {
            variant = 1;
        }
        else if (num<0.5) {
            variant = 2;
        }
        else if (num<0.75) {
            variant = 3;
        }
        else {
            variant = 4;
        }
        const vertices1 = new Float32Array( [
            -2, 1, 4,     // 1A note that we need to keep this ccw
            -2, 0, 4,       // 1B
            2, 0, 4,       // 1C
            
            2, 0, 4,      // second triangle
            2, 1, 4,       // 2B
            -2, 1, 4        // 2C
        
        ]);

        const uvs1 = new Float32Array( [
            0,1,
            0,0.1,
            1,0.1,

            1,0.1,
            1,1,
            0,1
        ]);
        let s = new T.Group();
        
        let geo1 = new T.BufferGeometry();
        geo1.setAttribute('position',new T.BufferAttribute(vertices1,3));
        geo1.computeVertexNormals();
        let tl1 = new T.TextureLoader().load("./images/car/carfront"+String(variant)+".png");
        geo1.setAttribute('uv',new T.BufferAttribute(uvs1,2));
        let mat1 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl1
        });
        let s1 = new T.Mesh(geo1, mat1);
        s.add(s1);
        const vertices2 = new Float32Array( [
            -2, 1, -4,     // 1A note that we need to keep this ccw
            -2, 0, -4,       // 1B
            -2, 0, 4,       // 1C
            
            -2, 0, 4,      // second triangle
            -2, 1, 4,       // 2B
            -2, 1, -4,        // 2C

            -2, 1, -4,
            -2, 1, 4,
            2, 1, 4,

            2, 1, 4,
            2, 1, -4,
            -2, 1, -4,

            -2, 0, -4,
            -2, 0, 4,
            2, 0, 4,

            2, 0, 4,
            2, 0, -4,
            -2, 0, -4,

            2, 1, 4,
            2, 0, 4,
            2, 0, -4,

            2, 0, -4,
            2, 1, -4,
            2, 1, 4,
            
            -1.5, 2, -2,
            -1.5, 2, 0,
            1.5, 2, 0,

            1.5, 2, 0,
            1.5, 2, -2,
            -1.5, 2, -2
        
        ]);

        const uvs2 = new Float32Array( [
            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1,

            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1,

            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1,

            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1,

            0,0,
            1,0,
            1,1,

            1,1,
            0,1,
            0,0
        ]);

        let geo2 = new T.BufferGeometry();
        geo2.setAttribute('position',new T.BufferAttribute(vertices2,3));
        geo2.computeVertexNormals();
        let tl2 = new T.TextureLoader().load("./images/car/car"+String(variant)+".png");
        geo2.setAttribute('uv',new T.BufferAttribute(uvs2,2));
        let mat2 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl2
        });
        let s2 = new T.Mesh(geo2, mat2);
        s.add(s2);

        const vertices3 = new Float32Array( [
            -2, 1, 4,     // 1A note that we need to keep this ccw
            -2, 0, 4,       // 1B
            2, 0, 4,       // 1C
            
            2, 0, 4,      // second triangle
            2, 1, 4,       // 2B
            -2, 1, 4        // 2C
        
        ]);

        const uvs3 = new Float32Array( [
            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1
        ]);
        
        let geo3 = new T.BufferGeometry();
        geo3.setAttribute('position',new T.BufferAttribute(vertices3,3));
        geo3.computeVertexNormals();
        let tl3 = new T.TextureLoader().load("./images/car/carback"+String(variant)+".png");
        geo3.setAttribute('uv',new T.BufferAttribute(uvs3,2));
        let mat3 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl3
        });
        let s3 = new T.Mesh(geo3, mat3);
        s3.rotateY(Math.PI);
        s.add(s3);

        const vertices4 = new Float32Array( [
            -1.5, 2, 0,
            -2, 1, 1.5,     // 1A note that we need to keep this ccw
            2, 1, 1.5,       // 1B

            2, 1, 1.5,
            1.5, 2, 0,
            -1.5, 2, 0,

            -1.5, 2, 0,
            -1.5, 2, -2,
            -2, 1, -3,

            -2, 1, -3,
            -2, 1, 1.5,
            -1.5, 2, 0,

            -1.5, 2, -2,
            1.5, 2, -2,
            2, 1, -3,

            2, 1, -3,
            -2,1,-3,
            -1.5,2,-2,

            2, 1, -3,
            1.5, 2, -2,
            1.5, 2, 0,
           

            1.5, 2, 0,
            2, 1, 1.5,
            
            2, 1, -3,
        
        ]);

        const uvs4 = new Float32Array( [
            0,1,
            0,0,
            1,0,

            1,0,
            1,1,
            0,1,

            1,1,
            0,1,
            0,0,

            0,0,
            1,0,
            1,1,

            1,1,
            0,1,
            0,0,

            0,0,
            1,0,
            1,1,

            1,1,
            0,1,
            0,0,

            0,0,
            1,0,
            1,1
        ]);
        
        let geo4 = new T.BufferGeometry();
        geo4.setAttribute('position',new T.BufferAttribute(vertices4,3));
        geo4.computeVertexNormals();
        let tl4 = new T.TextureLoader().load("./images/car/carwindow"+String(variant)+".png");
        geo4.setAttribute('uv',new T.BufferAttribute(uvs4,2));
        let mat4 = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: tl4
        });
        let s4 = new T.Mesh(geo4, mat4);
        s.add(s4);

        let g = new T.CylinderGeometry(0.8, 0.8, 0.4);
        let m =  new T.MeshStandardMaterial({color: "black"});
        let w1 = new T.Mesh(g,m);
        w1.rotateZ(Math.PI/2);
        s.add(w1);
        w1.position.x-=2;
        w1.position.z-=3;
        let w2 = new T.Mesh(g,m);
        w2.rotateZ(Math.PI/2);
        s.add(w2);
        w2.position.x-=2;
        w2.position.z+=2.5;
        let w3 = new T.Mesh(g,m);
        w3.rotateZ(Math.PI/2);
        s.add(w3);
        w3.position.x+=2;
        w3.position.z-=3;
        let w4 = new T.Mesh(g,m);
        w4.rotateZ(Math.PI/2);
        s.add(w4);
        w4.position.x+=2;
        w4.position.z+=2.5;
        s.position.y+=0.8;
        s.scale.set(0.5, 0.5, 0.5);
        super("BackGroundCar"+String(n), s);
        this.time = 0;
        this.n = n;
        this.obj = s;
        if (n==0) {
            this.rideable = s;
        }

    }
    stepWorld(delta, timeOfDay) {
        this.time+=delta/20;
        let u = ((this.time+800*this.n/12)%800)/800;
        if (this.n%2==0) {
            if (u < 0.25) {
                this.obj.position.set(55-110*(u/0.25), 0.4, -55);
                this.obj.rotation.y = 3*Math.PI/2;
            }
            else if (u<0.5) {
                this.obj.position.set(-55, 0.4, 55-110*(1-(u%0.25)/0.25));
                this.obj.rotation.y = 2*Math.PI;

            }
            else if (u<0.75) {
                this.obj.position.set(55-110*(1-(u%0.25)/0.25), 0.4, 55);
                this.obj.rotation.y =Math.PI/2;

            }
            else {

                this.obj.position.set(55, 0.4, 55-110*((u%0.25)/0.25));
                this.obj.rotation.y =Math.PI;
            }
        }
        else {
            if (u < 0.25) {
                this.obj.position.set(50, 0.4, 50-100*(1-(u%0.25)/0.25));
                this.obj.rotation.y = 0;
                
            }
            else if (u<0.5) {
                
                this.obj.position.set(50-100*((u%0.25)/0.25), 0.4, 50);
                this.obj.rotation.y = 3*Math.PI/2;

            }
            else if (u<0.75) {
                this.obj.position.set(-50, 0.4, 50-100*((u%0.25)/0.25));
                this.obj.rotation.y = Math.PI;

            }
            else {
                this.obj.position.set(50-100*(1-(u%0.25/0.25)), 0.4, -50);
                this.obj.rotation.y = Math.PI/2;
                
            }
        }
    }

    }
    
    export class PoliceStation extends GrObject {
        constructor() {
            let ps = new T.Group();
          let p = new T.Group();
          const ol = new OBJLoader();
          let ml = new MTLLoader();
          ml.load("./house-obj/house.mtl", function(mat) {ol.setMaterials(mat);});
          ol.load("./house-obj/house.obj", function(obj) {p.add(obj);});
          let s = 0.02;
          p.scale.set(s,s,s);
          ps.add(p);
          let g1 = new T.BoxGeometry(9.5, 1, 2);
          let tl = new T.TextureLoader().load("./images/policesign.png");
          let m = new T.MeshStandardMaterial({map: tl});
          let s1 = new T.Mesh(g1,m);
          ps.add(s1);
          s1.position.y+=2;
          s1.position.x+=0.2;
          
      
          super("PoliceStation", ps);
        }
      }
      
      export class StationaryCar extends GrObject {
        constructor(n) {
            let c = new T.Group();
            let num = Math.random();
            let variant = 0;
            if (num<0.25) {
                variant = 1;
            }
            else if (num<0.5) {
                variant = 2;
            }
            else if (num<0.75) {
                variant = 3;
            }
            else {
                variant = 4;
            }
            const vertices1 = new Float32Array( [
                -2, 1, 4,     // 1A note that we need to keep this ccw
                -2, 0, 4,       // 1B
                2, 0, 4,       // 1C
                
                2, 0, 4,      // second triangle
                2, 1, 4,       // 2B
                -2, 1, 4        // 2C
            
            ]);
    
            const uvs1 = new Float32Array( [
                0,1,
                0,0.1,
                1,0.1,
    
                1,0.1,
                1,1,
                0,1
            ]);
            let s = new T.Group();
            
            let geo1 = new T.BufferGeometry();
            geo1.setAttribute('position',new T.BufferAttribute(vertices1,3));
            geo1.computeVertexNormals();
            let tl1 = new T.TextureLoader().load("./images/car/carfront"+String(variant)+".png");
            geo1.setAttribute('uv',new T.BufferAttribute(uvs1,2));
            let mat1 = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            map: tl1
            });
            let s1 = new T.Mesh(geo1, mat1);
            s.add(s1);
            const vertices2 = new Float32Array( [
                -2, 1, -4,     // 1A note that we need to keep this ccw
                -2, 0, -4,       // 1B
                -2, 0, 4,       // 1C
                
                -2, 0, 4,      // second triangle
                -2, 1, 4,       // 2B
                -2, 1, -4,        // 2C
    
                -2, 1, -4,
                -2, 1, 4,
                2, 1, 4,
    
                2, 1, 4,
                2, 1, -4,
                -2, 1, -4,
    
                -2, 0, -4,
                -2, 0, 4,
                2, 0, 4,
    
                2, 0, 4,
                2, 0, -4,
                -2, 0, -4,
    
                2, 1, 4,
                2, 0, 4,
                2, 0, -4,
    
                2, 0, -4,
                2, 1, -4,
                2, 1, 4,
                
                -1.5, 2, -2,
                -1.5, 2, 0,
                1.5, 2, 0,
    
                1.5, 2, 0,
                1.5, 2, -2,
                -1.5, 2, -2
            
            ]);
    
            const uvs2 = new Float32Array( [
                0,1,
                0,0,
                1,0,
    
                1,0,
                1,1,
                0,1,
    
                0,1,
                0,0,
                1,0,
    
                1,0,
                1,1,
                0,1,
    
                0,1,
                0,0,
                1,0,
    
                1,0,
                1,1,
                0,1,
    
                0,1,
                0,0,
                1,0,
    
                1,0,
                1,1,
                0,1,
    
                0,0,
                1,0,
                1,1,
    
                1,1,
                0,1,
                0,0
            ]);
    
            let geo2 = new T.BufferGeometry();
            geo2.setAttribute('position',new T.BufferAttribute(vertices2,3));
            geo2.computeVertexNormals();
            let tl2 = new T.TextureLoader().load("./images/car/car"+String(variant)+".png");
            geo2.setAttribute('uv',new T.BufferAttribute(uvs2,2));
            let mat2 = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            map: tl2
            });
            let s2 = new T.Mesh(geo2, mat2);
            s.add(s2);
    
            const vertices3 = new Float32Array( [
                -2, 1, 4,     // 1A note that we need to keep this ccw
                -2, 0, 4,       // 1B
                2, 0, 4,       // 1C
                
                2, 0, 4,      // second triangle
                2, 1, 4,       // 2B
                -2, 1, 4        // 2C
            
            ]);
    
            const uvs3 = new Float32Array( [
                0,1,
                0,0,
                1,0,
    
                1,0,
                1,1,
                0,1
            ]);
            
            let geo3 = new T.BufferGeometry();
            geo3.setAttribute('position',new T.BufferAttribute(vertices3,3));
            geo3.computeVertexNormals();
            let tl3 = new T.TextureLoader().load("./images/car/carback"+String(variant)+".png");
            geo3.setAttribute('uv',new T.BufferAttribute(uvs3,2));
            let mat3 = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            map: tl3
            });
            let s3 = new T.Mesh(geo3, mat3);
            s3.rotateY(Math.PI);
            s.add(s3);
    
            const vertices4 = new Float32Array( [
                -1.5, 2, 0,
                -2, 1, 1.5,     // 1A note that we need to keep this ccw
                2, 1, 1.5,       // 1B
    
                2, 1, 1.5,
                1.5, 2, 0,
                -1.5, 2, 0,
    
                -1.5, 2, 0,
                -1.5, 2, -2,
                -2, 1, -3,
    
                -2, 1, -3,
                -2, 1, 1.5,
                -1.5, 2, 0,
    
                -1.5, 2, -2,
                1.5, 2, -2,
                2, 1, -3,
    
                2, 1, -3,
                -2,1,-3,
                -1.5,2,-2,
    
                2, 1, -3,
                1.5, 2, -2,
                1.5, 2, 0,
               
    
                1.5, 2, 0,
                2, 1, 1.5,
                
                2, 1, -3,
            
            ]);
    
            const uvs4 = new Float32Array( [
                0,1,
                0,0,
                1,0,
    
                1,0,
                1,1,
                0,1,
    
                1,1,
                0,1,
                0,0,
    
                0,0,
                1,0,
                1,1,
    
                1,1,
                0,1,
                0,0,
    
                0,0,
                1,0,
                1,1,
    
                1,1,
                0,1,
                0,0,
    
                0,0,
                1,0,
                1,1
            ]);
            
            let geo4 = new T.BufferGeometry();
            geo4.setAttribute('position',new T.BufferAttribute(vertices4,3));
            geo4.computeVertexNormals();
            let tl4 = new T.TextureLoader().load("./images/car/carwindow"+String(variant)+".png");
            geo4.setAttribute('uv',new T.BufferAttribute(uvs4,2));
            let mat4 = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            map: tl4
            });
            let s4 = new T.Mesh(geo4, mat4);
            s.add(s4);
    
            let g = new T.CylinderGeometry(0.8, 0.8, 0.4);
            let m =  new T.MeshStandardMaterial({color: "black"});
            let w1 = new T.Mesh(g,m);
            w1.rotateZ(Math.PI/2);
            s.add(w1);
            w1.position.x-=2;
            w1.position.z-=3;
            let w2 = new T.Mesh(g,m);
            w2.rotateZ(Math.PI/2);
            s.add(w2);
            w2.position.x-=2;
            w2.position.z+=2.5;
            let w3 = new T.Mesh(g,m);
            w3.rotateZ(Math.PI/2);
            s.add(w3);
            w3.position.x+=2;
            w3.position.z-=3;
            let w4 = new T.Mesh(g,m);
            w4.rotateZ(Math.PI/2);
            s.add(w4);
            w4.position.x+=2;
            w4.position.z+=2.5;
            s.position.y+=0.8;
            s.scale.set(0.5, 0.5, 0.5);
            super("StationaryCar"+String(n), s);
            this.time = 0;
            this.n = n;
            this.obj = s;
    
        }
    }