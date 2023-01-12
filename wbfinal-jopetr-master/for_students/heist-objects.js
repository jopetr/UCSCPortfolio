import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Box2, MirroredRepeatWrapping, Texture } from "../libs/CS559-Three/build/three.module.js";

export class GetawayCar extends GrObject {
    constructor() {
        let c = new T.Group();
        let num = Math.random();
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
        let tl1 = new T.TextureLoader().load("./images/car/carfront1.png");
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
        let tl2 = new T.TextureLoader().load("./images/car/car1.png");
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
        let tl3 = new T.TextureLoader().load("./images/car/carback1.png");
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
        let tl4 = new T.TextureLoader().load("./images/car/carwindow1.png");
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
        let d = new T.Group();
        s.add(d);
        super("GetawayCar", s);
        this.time = 0;
        this.obj = s;
        this.drift = d;
        this.drifting = 0;
        this.rideable = s;
    }
    stepWorld(delta, timeOfDay) {
        this.time+=delta/20;
        let u = ((this.time-20)%200)/200;
        /*
            g.objects[0].rotation.y = 0;
            g.objects[0].position.set(-42,0,-12);

            g.objects[0].position.set(-42,0,-3);
            g.objects[0].rotation.y = Math.PI/2;


            g.objects[0].position.set(-13,0,-3);
            circle
            g.objects[0].position.set(-4,0,13);
            g.objects[0].position.set(-4,0,57);
        */
       if (u<0.05) {
            this.obj.rotation.y = 0;    
            this.obj.position.set(-42, 0.4, -12 + 9*(u/0.05));
       }
       else if (u<0.14) {
            this.obj.rotation.y = Math.PI/2;
            this.obj.position.set(-42+29*(u-0.05)/0.09, 0.4, -3);
       }
       else if (u<0.15) {
        this.obj.rotation.y = 0;
        this.obj.position.set(-13, 0.4, -3+3*(u-0.14)/0.01);
       }
       else if (u<0.35) {
           if (this.drifting==0) {
                for (let i=0; i<20; i++) {
                    let val = 0.5+0.5*Math.random();
                    let g = new T.SphereGeometry(0.5*Math.random());
                    let m = new T.MeshStandardMaterial({transparent:true, opacity:0.1, color: new T.Color(val, val, val)});
                    let s = new T.Mesh(g,m);
                    this.drift.add(s);
                    this.drifting = 1;
                }
           }
            this.obj.position.set(-13*Math.cos(2*Math.PI*(u-0.15)/0.2), 0.4, 13*Math.sin(2*Math.PI*(u-0.15)/0.2));
            this.obj.lookAt(0,0.4,0);
        if (u<0.25) {
            for (let i=0; i<this.drift.children.length; i++) {
                this.drift.children[i].position.set(Math.random()*8*((u-0.15)/0.1), 0.25, (5-15*Math.random())*((u-0.15)/0.1));
            }
            this.drifting = 0;
            this.obj.rotation.y+=Math.PI/4;
        }
        else {
            for (let i=0; i<this.drift.children.length; i++) {
                this.drift.children[i].position.set(Math.random()*8*(1-(u-0.25)/0.1), 0.25, (5-15*Math.random())*(1-(u-0.25)/0.1));
            }
            this.obj.rotation.y-=Math.PI/4;
        }

       }
       else if (u<0.40) {
        this.drift.clear();
        this.obj.position.set(-13+9*(u-0.35)/0.05, 0.4, 13*(u-0.35)/0.05);
        this.obj.lookAt(-4,0.4,13);
       }
       else if (u<0.50) {
        this.obj.position.set(-4, 0.4, 13+44*(u-0.4)/0.1);
        this.obj.lookAt(-4,0.4,57);
       }
       else {
            this.obj.rotation.y = 0;
            this.obj.position.set(-42, 0.4, -12);
       }
        
    }

    }

    export class PoliceCar1 extends GrObject {
        constructor() {
            let c = new T.Group();
            let num = Math.random();
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
            let tl1 = new T.TextureLoader().load("./images/car/carfront4.png");
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
            let tl2 = new T.TextureLoader().load("./images/car/car4.png");
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
            let tl3 = new T.TextureLoader().load("./images/car/carback4.png");
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
            let tl4 = new T.TextureLoader().load("./images/car/carwindow4.png");
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
            let d = new T.Group();
            s.add(d);
            super("PoliceCar1", s);
            this.time = 0;
            this.obj = s;
            this.siren = d;
            this.chase = 1;
            this.rideable = s;
    
        }
        stepWorld(delta, timeOfDay) {
            this.time+=delta/20;
            let u = ((this.time-20)%200)/200;
            if (this.chase==1) {
                if ((u%0.02)<0.01) {
                    this.siren.clear();
                    let g1 = new T.BoxGeometry(1.5,0.2,0.5);
                    let m1 = new T.MeshStandardMaterial({color: "black"});
                    let m1s = new T.MeshStandardMaterial({color: "red"});
                    let s1 = new T.Mesh(g1,m1);
                    let s1s = new T.Mesh(g1,m1s);
                    this.siren.add(s1);
                    s1.position.set(-0.75,2,-0.5);
                    this.siren.add(s1s);
                    s1s.position.set(0.75,2,-0.5);
                }
                else {
                    this.siren.clear();
                    let g1 = new T.BoxGeometry(1.5,0.2,0.5);
                    let m1 = new T.MeshStandardMaterial({color: "cyan"});
                    let m1s = new T.MeshStandardMaterial({color: "black"});
                    let s1 = new T.Mesh(g1,m1);
                    let s1s = new T.Mesh(g1,m1s);
                    this.siren.add(s1);
                    s1.position.set(-0.75,2,-0.5);
                    this.siren.add(s1s);
                    s1s.position.set(0.75,2,-0.5);

                }
            }
            else {
                this.siren.clear();
                let g1 = new T.BoxGeometry(1.5,0.2,0.5);
                let m1 = new T.MeshStandardMaterial({color: "navy"});
                let m1s = new T.MeshStandardMaterial({color: "maroon"});
                let s1 = new T.Mesh(g1,m1);
                let s1s = new T.Mesh(g1,m1s);
                this.siren.add(s1);
                s1.position.set(-0.75,2,-0.5);
                this.siren.add(s1s);
                s1s.position.set(0.75,2,-0.5);

            }
            
            
            this.chase = 1;
           if (u<0.05) {
            this.obj.position.set(20,0.4,31);
            this.obj.lookAt(4,0.4,31);
           }
           else if (u<0.15) {
            this.obj.position.set(20-16*((u-0.05)/0.1),0.4,31);
            this.obj.lookAt(4,0.4,31);
           }
           else if (u<0.25) {
            this.obj.position.set(4,0.4,31-15*((u-0.15)/0.1));
            this.obj.lookAt(4,0.4,16);    
           }
           else if (u<0.3) {
            this.obj.position.set(4+12*(u-0.25)/0.05,0.4,16-16*(u-0.25)/0.05);
            this.obj.lookAt(16,0.4,0);
           }
           else if (u<0.35) {
            this.obj.position.set(16-16*(u-0.3)/0.05,0.4,-16*(u-0.3)/0.05);
            this.obj.lookAt(0,0.4,-16);
           }
           else if (u<0.4) {
            this.obj.position.set(-16*(u-0.35)/0.05,0.4,-16+16*(u-0.35)/0.05);
            this.obj.lookAt(-16,0.4,0);
           }
           else if (u<0.45) {
            this.obj.position.set(-16+12*(u-0.4)/0.05,0.4,13*(u-0.4)/0.05);
            this.obj.lookAt(-4,0.4,13);
           }
           else if (u<0.55) {
            this.obj.position.set(-4,0.4,13+44*(u-0.45)/0.1);
            this.obj.lookAt(-4,0.4,57);

           }
           else if (u<0.6) {
            this.obj.position.set(-42, 0.4, -12);
           }
           else {
               this.chase = 0;

            this.obj.position.set(20,0.4,31);
            this.obj.lookAt(4,0.4,31);
           }
            
        }
    
        }

export class PoliceCar2 extends GrObject {
constructor() {
    let c = new T.Group();
    let num = Math.random();
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
    let tl1 = new T.TextureLoader().load("./images/car/carfront4.png");
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
    let tl2 = new T.TextureLoader().load("./images/car/car4.png");
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
    let tl3 = new T.TextureLoader().load("./images/car/carback4.png");
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
    let tl4 = new T.TextureLoader().load("./images/car/carwindow4.png");
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
    let d = new T.Group();
    s.add(d);
    super("PoliceCar2", s);
    this.time = 0;
    this.obj = s;
    this.siren = d;
    this.chase = 1;

    this.rideable = s;

}
stepWorld(delta, timeOfDay) {
    this.time+=delta/20;
    let u = ((this.time-30)%200)/200;
    if (this.chase==1) {
        if ((u%0.02)<0.01) {
            this.siren.clear();
            let g1 = new T.BoxGeometry(1.5,0.2,0.5);
            let m1 = new T.MeshStandardMaterial({color: "black"});
            let m1s = new T.MeshStandardMaterial({color: "red"});
            let s1 = new T.Mesh(g1,m1);
            let s1s = new T.Mesh(g1,m1s);
            this.siren.add(s1);
            s1.position.set(-0.75,2,-0.5);
            this.siren.add(s1s);
            s1s.position.set(0.75,2,-0.5);
        }
        else {
            this.siren.clear();
            let g1 = new T.BoxGeometry(1.5,0.2,0.5);
            let m1 = new T.MeshStandardMaterial({color: "cyan"});
            let m1s = new T.MeshStandardMaterial({color: "black"});
            let s1 = new T.Mesh(g1,m1);
            let s1s = new T.Mesh(g1,m1s);
            this.siren.add(s1);
            s1.position.set(-0.75,2,-0.5);
            this.siren.add(s1s);
            s1s.position.set(0.75,2,-0.5);

        }
    }
    else {
        this.siren.clear();
        let g1 = new T.BoxGeometry(1.5,0.2,0.5);
        let m1 = new T.MeshStandardMaterial({color: "navy"});
        let m1s = new T.MeshStandardMaterial({color: "maroon"});
        let s1 = new T.Mesh(g1,m1);
        let s1s = new T.Mesh(g1,m1s);
        this.siren.add(s1);
        s1.position.set(-0.75,2,-0.5);
        this.siren.add(s1s);
        s1s.position.set(0.75,2,-0.5);

    }

    
    
    this.chase = 1;
    if (u<0.05) {
    this.obj.position.set(30,0.4,31);
    this.obj.lookAt(4,0.4,31);
    }
    else if (u<0.15) {
    this.obj.position.set(30-26*((u-0.05)/0.1),0.4,31);
    this.obj.lookAt(4,0.4,31);
    }
    else if (u<0.25) {
    this.obj.position.set(4,0.4,31-15*((u-0.15)/0.1));
    this.obj.lookAt(4,0.4,16);    
    }
    else if (u<0.3) {
    this.obj.position.set(4+12*(u-0.25)/0.05,0.4,16-16*(u-0.25)/0.05);
    this.obj.lookAt(16,0.4,0);
    }
    else if (u<0.35) {
    this.obj.position.set(16-16*(u-0.3)/0.05,0.4,-16*(u-0.3)/0.05);
    this.obj.lookAt(0,0.4,-16);
    }
    else if (u<0.4) {
    this.obj.position.set(-16*(u-0.35)/0.05,0.4,-16+16*(u-0.35)/0.05);
    this.obj.lookAt(-16,0.4,0);
    }
    else if (u<0.45) {
    this.obj.position.set(-16+12*(u-0.4)/0.05,0.4,13*(u-0.4)/0.05);
    this.obj.lookAt(-4,0.4,13);
    }
    else if (u<0.55) {
    this.obj.position.set(-4,0.4,13+44*(u-0.45)/0.1);
    this.obj.lookAt(-4,0.4,57);

    }
    else {
        this.chase = 0;

    this.obj.position.set(30,0.4,31);
    this.obj.lookAt(4,0.4,31);
    }
    
}

}