class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }

    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        // First curve
        let curve1 = [
            { x: 50, y: 100 },
            { x: 150, y: 300 },
            { x: 250, y: 200 },
            { x: 350, y: 300 }
        ];
        let curve1Color = [255, 0, 0, 255];
        this.drawBezierCurve(curve1[0], curve1[1], curve1[2], curve1[3], this.num_curve_sections, curve1Color, framebuffer);
        if (this.show_points) {
            this.drawVertex(curve1[0], curve1Color, framebuffer);
            this.drawVertex(curve1[3], curve1Color, framebuffer);

            this.drawControlPoint(curve1[1], curve1Color, framebuffer);
            this.drawControlPoint(curve1[2], curve1Color, framebuffer);
        }

        // Second curve
        let curve2 = [
            { x: 450, y: 105 },
            { x: 550, y: 475 },
            { x: 650, y: 175 },
            { x: 750, y: 510 }
        ];
        let curve2Color = [0, 0, 255, 255];
        this.drawBezierCurve(curve2[0], curve2[1], curve2[2], curve2[3], this.num_curve_sections, curve2Color, framebuffer);
        if (this.show_points) {
            this.drawVertex(curve2[0], curve2Color, framebuffer);
            this.drawVertex(curve2[3], curve2Color, framebuffer);

            this.drawControlPoint(curve2[1], curve2Color, framebuffer);
            this.drawControlPoint(curve2[2], curve2Color, framebuffer);
        }

        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        // this.drawLine({ x: 100, y: 100 }, { x: 600, y: 300 }, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        // First circle
        let circle1 = { center: { x: 250, y: 300 }, radius: 200 };
        let circle1Color = [255, 0, 0, 255];
        this.drawCircle(circle1.center, circle1.radius, this.num_curve_sections, circle1Color, framebuffer);
        if (this.show_points) {
            this.drawControlPoint(circle1.center, circle1Color, framebuffer);
        }

        // Second circle
        let circle2 = { center: { x: 600, y: 450 }, radius: 100 };
        let circle2Color = [0, 0, 255, 255];
        this.drawCircle(circle2.center, circle2.radius, this.num_curve_sections, circle2Color, framebuffer);
        if (this.show_points) {
            this.drawControlPoint(circle2.center, circle2Color, framebuffer);
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        // First polygon
        let polygon1 = [
            { x: 150, y: 200 },
            { x: 180, y: 220 },
            { x: 200, y: 240 },
            { x: 180, y: 260 },
            { x: 150, y: 250 },
            { x: 120, y: 220 }
        ];
        let polygon1Color = [255, 0, 0, 127];
        this.drawConvexPolygon(polygon1, polygon1Color, framebuffer);

        // Second polygon
        let polygon2 = [
            { x: 400, y: 500 },
            { x: 350, y: 400 },
            { x: 370, y: 350 },
            { x: 500, y: 150 },
            { x: 550, y: 160 },
            { x: 540, y: 300 },
            { x: 620, y: 330 },
            { x: 575, y: 450 }
        ];
        let polygon2Color = [0, 0, 255, 127];
        this.drawConvexPolygon(polygon2, polygon2Color, framebuffer);

        // Following lines are example of drawing a single triangle
        // (this should be removed after you implement the polygon)
        // let point_a = { x: 80, y: 40 };
        // let point_b = { x: 320, y: 160 };
        // let point_c = { x: 240, y: 360 };
        // this.drawTriangle(point_a, point_c, point_b, [0, 128, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        let color = [255, 0, 0, 255];

        // 'A'
        this.drawLine({ x: 100, y: 100 }, { x: 150, y: 200 }, color, framebuffer);
        this.drawLine({ x: 150, y: 200 }, { x: 200, y: 100 }, color, framebuffer);
        let polygonA = [
            { x: 120, y: 150 },
            { x: 180, y: 150 },
            { x: 150, y: 200 }
        ];
        this.drawConvexPolygon(polygonA, color, framebuffer);

        // 'N'
        this.drawLine({ x: 250, y: 200 }, { x: 250, y: 100 }, color, framebuffer);
        this.drawLine({ x: 250, y: 200 }, { x: 300, y: 100 }, color, framebuffer);
        this.drawLine({ x: 300, y: 100 }, { x: 300, y: 200 }, color, framebuffer);

        // 'D'
        let controlPointsD = [
            { x: 325, y: 200 },
            { x: 375, y: 200 },
            { x: 375, y: 100 },
            { x: 325, y: 100 }
        ];
        this.drawBezierCurve(controlPointsD[0], controlPointsD[1], controlPointsD[2], controlPointsD[3], this.num_curve_sections, color, framebuffer);
        this.drawLine({ x: 325, y: 200 }, { x: 325, y: 100 }, color, framebuffer);
        if (this.show_points) {
            this.drawVertex(controlPointsD[0], color, framebuffer);
            this.drawVertex(controlPointsD[3], color, framebuffer);

            this.drawControlPoint(controlPointsD[1], color, framebuffer);
            this.drawControlPoint(controlPointsD[2], color, framebuffer);
        }

        // 'R'
        this.drawLine({ x: 400, y: 200 }, { x: 400, y: 100 }, color, framebuffer);
        let centerR = { x: 425, y: 175 };
        this.drawCircle(centerR, 25, this.num_curve_sections, color, framebuffer);
        this.drawLine({ x: 400, y: 150 }, { x: 450, y: 100 }, color, framebuffer);
        if (this.show_points) {
            this.drawControlPoint(centerR, color, framebuffer);
        }

        // 'E'
        this.drawLine({ x: 500, y: 200 }, { x: 500, y: 100 }, color, framebuffer);
        this.drawLine({ x: 500, y: 200 }, { x: 550, y: 200 }, color, framebuffer);
        this.drawLine({ x: 500, y: 150 }, { x: 550, y: 150 }, color, framebuffer);
        this.drawLine({ x: 500, y: 100 }, { x: 550, y: 100 }, color, framebuffer);

        // 'W'
        this.drawLine({ x: 600, y: 200 }, { x: 625, y: 100 }, color, framebuffer);
        this.drawLine({ x: 625, y: 100 }, { x: 650, y: 200 }, color, framebuffer);
        this.drawLine({ x: 650, y: 200 }, { x: 675, y: 100 }, color, framebuffer);
        this.drawLine({ x: 675, y: 100 }, { x: 700, y: 200 }, color, framebuffer);
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let start = p0;
        for (let t = 0; t <= 1.000001; t += 1 / num_edges) {
            let x = Math.pow((1 - t), 3) * p0.x + 3 * Math.pow((1 - t), 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
            let y = Math.pow((1 - t), 3) * p0.y + 3 * Math.pow((1 - t), 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;
            let next = { x: Math.round(x), y: Math.round(y) };
            this.drawLine(start, next, color, framebuffer);
            if (this.show_points) {
                this.drawVertex(next, color, framebuffer);
            }
            start = next;
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let start = { x: center.x + radius, y: center.y };
        for (let i = 0; i <= num_edges; i++) {
            let angle = (i / num_edges) * 2 * Math.PI;
            let x = center.x + radius * Math.cos(angle);
            let y = center.y + radius * Math.sin(angle);
            let next = { x: Math.round(x), y: Math.round(y) };
            this.drawLine(start, next, color, framebuffer);
            if (this.show_points) {
                this.drawVertex(next, color, framebuffer);
            }
            start = next;
        }
    }

    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        let num_vertices = vertex_list.length;
        let first_vertex = vertex_list[0];
        for (let i = 1; i < num_vertices - 1; i++) {
            let current_vertex = vertex_list[i];
            let next_vertex = vertex_list[i + 1];
            this.drawTriangle(first_vertex, current_vertex, next_vertex, color, framebuffer);
        }
        if (vertex_list.length == 8) {
            color = [0, 0, 255, 255];
        } else {
            color = [255, 0, 0, 255];
        }
        if (this.show_points) {
            vertex_list.forEach(vertex => {
                this.drawVertex(vertex, color, framebuffer);
            });
        }
    }

    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        let size = 5;
        this.drawLine({ x: v.x - size, y: v.y - size }, { x: v.x + size, y: v.y - size }, color, framebuffer);
        this.drawLine({ x: v.x + size, y: v.y - size }, { x: v.x + size, y: v.y + size }, color, framebuffer);
        this.drawLine({ x: v.x + size, y: v.y + size }, { x: v.x - size, y: v.y + size }, color, framebuffer);
        this.drawLine({ x: v.x - size, y: v.y + size }, { x: v.x - size, y: v.y - size }, color, framebuffer);
    }

    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawControlPoint(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        this.drawLine({ x: v.x - 4, y: v.y - 4 }, { x: v.x + 4, y: v.y + 4 }, color, framebuffer);
        this.drawLine({ x: v.x + 4, y: v.y - 4 }, { x: v.x - 4, y: v.y + 4 }, color, framebuffer);
    }

    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
        return 4 * y * framebuffer.width + 4 * x;
    }

    setFramebufferColor(color, x, y, framebuffer) {
        let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }

    swapPoints(a, b) {
        let tmp = { x: a.x, y: a.y };
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;

        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;

        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }

    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = { x: p0.x, y: p0.y };
        p1 = { x: p1.x, y: p1.y };
        p2 = { x: p2.x, y: p2.y };
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);

        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            { x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y) }, // edge01
            { x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y) }, // edge02
            { x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y) }  // edge12
        ];

        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = { x: p1.x - p0.x, y: p1.y - p0.y };
        let v02 = { x: p2.x - p0.x, y: p2.y - p0.y };
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;

        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }

        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
