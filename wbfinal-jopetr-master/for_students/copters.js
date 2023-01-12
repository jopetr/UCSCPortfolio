
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class Copter extends GrObject {
    constructor() {
        let c = new T.Group();
        let dmat = new T.MeshStandardMaterial({ color: "red" , roughness: 1.0, metalness: 0.5});
        let bmat = new T.MeshStandardMaterial({ color: "black" , roughness: 1.0, metalness: 1.0});
        let dgeo1 = new T.CylinderGeometry(0.5, 0.4, 1);
        let d1 = new T.Mesh(dgeo1, dmat);
        let dgeo2 = new T.CylinderGeometry(0.7, 0.5, 0.5);
        let d2 = new T.Mesh(dgeo2, dmat);
        d1.add(d2);
        d2.position.y+=0.75;
        let dgeo3 = new T.CylinderGeometry(0.5, 0.7, 1);
        let d3 = new T.Mesh(dgeo3, dmat);
        d1.add(d3);
        d3.position.y+=1.5;
        let dgeo4 = new T.CylinderGeometry(0, 0.5, 0.5);
        let d4 = new T.Mesh(dgeo4, dmat);
        d1.add(d4);
        d4.position.y+=2.25;
        let dgeo5 = new T.CylinderGeometry(0.4, 0.2, 2);
        let d5 = new T.Mesh(dgeo5, dmat);
        d1.add(d5);
        d5.position.y-=1.5;
        let dgeo6 = new T.BoxGeometry(0.4, 0.4, 0.4);
        let d6 = new T.Mesh(dgeo6, dmat);
        d1.add(d6);
        d6.position.y-=2.7;
        let dgeo7 = new T.BoxGeometry(0.2, 0.3, 0.6);
        let d7 = new T.Mesh(dgeo7, dmat);
        d1.add(d7);
        d7.position.y-=2.65;
        d7.position.z+=0.5;
        d1.rotateX(3*Math.PI/2)
        let dgeo8 = new T.CylinderGeometry(0, 0.5, 0.3); 
        let d8 = new T.Mesh(dgeo8, bmat);
        d8.position.y+=1.59;
        d8.position.z+=0.59;
        d1.add(d8);
        d8.rotateX(-3*Math.PI/2);
        let dgeo9 = new T.BoxGeometry(5, 0.1, 0.2);
        let d9 = new T.Mesh(dgeo9, dmat);
        d9.position.y+=1;
        d9.position.z+=0.7;
        d1.add(d9);
        d9.rotateX(-3*Math.PI/2);
        let dgeo10 = new T.SphereGeometry(0.1);
        let d10 = new T.Mesh(dgeo10, dmat);
        d10.position.y+=1;
        d10.position.z+=0.8;
        d10.position.x-=2.4;
        d1.add(d10);
        d10.rotateX(-3*Math.PI/2);
        let d11 = new T.Mesh(dgeo10, dmat);
        d11.position.y+=1;
        d11.position.z+=0.8;
        d11.position.x+=2.4;
        d1.add(d11);
        d11.rotateX(-3*Math.PI/2);
        let pgeo1 = new T.BoxGeometry(3, 0.05,0.1);
        let p1 = new T.Mesh(pgeo1, bmat);
        let p2 = new T.Mesh(pgeo1, bmat);
        let p3 = new T.Mesh(pgeo1, bmat);
        let p4 = new T.Mesh(pgeo1, bmat);
        d11.add(p1);
        d11.add(p2);
        d10.add(p3);
        d10.add(p4);
        p2.rotateY(Math.PI/2);
        p4.rotateY(Math.PI/2);
        d1.position.y+=8;
        d1.scale.x = 0.5;
        d1.scale.y = 0.5;
        d1.scale.z = 0.5;
        c.add(d1);
        super("Copter", c);
        this.d1 = d1;
        this.d10 = d10;
        this.d11 = d11;
        this.time = 0;
    }

    stepWorld(delta, timeOfDay) {
        this.time+=delta;
        this.d10.rotateY(0.4);
        this.d11.rotateY(0.4);
        let theta = this.time / 1000;
        let x = 3 * Math.cos(theta);
        let z = 3 * Math.sin(theta);
        let hyp = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
        let dx = x/hyp;
        let dz = z/hyp;
        let ang = 0;
        if (dz<=0) {
            ang = Math.acos(dx);
        }
        else {
            ang = 2*Math.PI - Math.acos(dx);
        }
        this.d1.position.x = 3*x;
        this.d1.position.z = 3*z;
        this.d1.rotation.z = Math.PI+ang;
    }
}