import BaseObject from 'js/physics/object'

export default class Bubble extends BaseObject
{
    constructor(position, size)
    {
        super(position, size/100);
        this.size = size
    }

    draw()
    {
        colorMode(HSB);

        noStroke()
        fill(0, 0, 30);
        ellipse(this.position.x, this.position.y, this.size);

        fill(0, 0, 25);
        ellipse(this.position.x, this.position.y, this.size * 0.95);

        fill(0, 0, 20);
        ellipse(this.position.x, this.position.y, this.size * 0.65);
    }
}
