function Body(position, mass, radius, colorString)
{
    this.mass = mass;
    this.radius = radius;
    this.color = color(colorString);

    this.position = position;
    this.velocity = createVector();
    this.acceleration = createVector();

    this.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.draw = function() {
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }

    this.applyForce = function (force) {
        force.div(this.mass);
        this.acceleration.add(force);
    }

    this.attract = function(target) {
        var force = p5.Vector.sub(this.position, target.position);
        var distance = force.mag();

        force.normalize();
        force.mult((System.G * this.mass * target.mass) / distance * distance);

        target.applyForce(force);
    }
}

function BodyCreator(system) {
    this.system = system;

    this.init = function(positionX, positionY) {
        var mass = Math.floor(Math.random() * 10000) + 3000;
        var position = createVector(positionX, positionY);
        var radius = 30;
        var color = Math.floor(Math.random() * 255);

        this.body = new Body(position, mass, radius, 'hsb(' + color + ', 100%, 50%)');
        this.creationMode = true;
    }

    this.onClick = function(positionX, positionY) {
        this.system.add(this.body);
        this.creationMode = false;
        this.body = null;
    }

    this.onPress = function(positionX, positionY) {
        if (!this.creationMode) {
            this.init(positionX, positionY);
        }
        console.log(this.body.position);
    }

    this.onDrag = function(positionX, positionY) {
        var position = createVector(positionX, positionY);
        this.body.radius = p5.Vector.sub(this.body.position, position).mag()
        this.body.mass = this.body.radius * 500;
    }

    this.onRelease = function(positionX, positionY) {

    }

    this.draw = function() {
        if (this.creationMode) {
            this.body.draw();
            fill(255);
            textAlign(CENTER);
            text(Math.round(this.body.mass) + " t", this.body.position.x, this.body.position.y);
        }
    }
}

function System()
{
    this.bodies = [];

    this.add = function(body) {
        this.bodies.push(body);
    }

    this.update = function() {
        for (var bodyI in this.bodies) {
            var bodyOne = this.bodies[bodyI];
            for (var bodyJ in this.bodies) {
                var bodyTwo = this.bodies[bodyJ];
                if (bodyOne === bodyTwo) {
                    continue;
                }
                bodyTwo.attract(bodyOne);
                bodyTwo.update();
            }
        }
    }

    this.draw = function() {
        for (var i in this.bodies) {
            var body = this.bodies[i];
            body.draw();
        }
    }

    this.getPositionInfo = function(x,y) {
        var position = createVector(x,y);

        for (var i in this.bodies) {
            var body = this.bodies[i];
            var distance = p5.Vector.sub(position, body.position);

            if (distance.mag() <= body.radius) {
                console.log(body);
            }
        }
    }
}

System.G = 6.67408 * 1/100000000;
