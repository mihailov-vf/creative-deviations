export default class BaseObject
{
    constructor(position, mass = 1, velocity = createVector(), acceleration = createVector())
    {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.mass = mass;
    }

    applyForce(force)
    {
        force.div(this.mass);
        this.acceleration.add(force);
    }

    update()
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    checkCollision(target)
    {
        return false;
    }

    clearAcceleration()
    {
        this.acceleration.mult(0);
    }
}