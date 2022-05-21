class Rect {
  constructor(x, y, width=0, height=0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = getHexColor();
    this.genRect();
  }

  genRect() {
    let rect = document.createElement('div');
    this.target = rect;
    rect.draggable = true;
    rect.style.position = 'fixed';
    rect.style.width = `${this.width}px`;
    rect.style.height = `${this.height}px`;
    rect.style.backgroundColor = this.color;
    this.update()
  }

  update() {
    this.target.style.left = `${this.x}px`;
    this.target.style.top = `${this.y}px`;
  }

  getSize() {
    return {
      width: pixelToNumber(this.target.style.width),
      height: pixelToNumber(this.target.style.height),
      top: this.target.offsetTop,
      bottom: this.target.offsetTop + pixelToNumber(this.target.style.height),
      left: this.target.offsetLeft,
      right: this.target.offsetLeft + pixelToNumber(this.target.style.width),
    }
  }

  getPosition() {
    return {
      x: pixelToNumber(this.target.style.left),
      y: pixelToNumber(this.target.style.top),
    }
  }

}

class Container {
  
  constructor ({id}) {
    this.target = document.getElementById(id);
  }

  sizeUpdate(rects) {
    let mostTop = window.innerHeight;
    let mostBottom = 0;
    let mostLeft = window.innerWidth;
    let mostRight = 0;

    rects.forEach(rect => {
      const { top, bottom, left, right } = rect.getSize();

      mostTop = getCompareSmall(mostTop, top);
      mostLeft = getCompareSmall(mostLeft, left);
      mostBottom = getCompareBig(mostBottom, bottom);
      mostRight = getCompareBig(mostRight, right);
    })

    const height = mostBottom - mostTop; 
    const width = mostRight - mostLeft;

    const x = mostLeft
    const y = mostTop

    this.target.style.height = `${height}px`;
    this.target.style.width = `${width}px`;

    this.target.style.left = `${x}px`;
    this.target.style.top = `${y}px`;
  }
}

class ScalableLib {

  constructor({id, count=3}) {
    if (!id) throw new Error('id is required');
    
    this.rects = []

    for (let i = 0; i < count; i++) {
      this.rects.push(
        new Rect(_getRandom(100, 400), _getRandom(100, 400), 200, 200)
      );
    }

    this.container = new Container({id})
  }

  render() {
    this.rects.forEach(rect => {
      this.container.target.appendChild(rect.target);
    })
    this.container.sizeUpdate(this.rects)
  }

  addRect() {
    const rect = new Rect(_getRandom(50, 800), _getRandom(50, 800), 200, 200);
    this.rects.push(
      rect
    );
    this.container.target.appendChild(rect.target);
    this.container.sizeUpdate(this.rects)
  }

  removeRect() {
    const rect = this.rects.pop();
    rect.target.remove()
    this.container.sizeUpdate(this.rects)
    rect = null;
  }
}