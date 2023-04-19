import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[toolTip]'
})
export class ToolTipDirective {
  @HostListener ('mouseenter') onMouseEnter() {
    this.mouseEnter();
  };
  @HostListener ('mouseleave') onMouseLeave () {
    this.mouseLeave();
  }

  eleHeight!: number;
  eleWidth!: number;
  eleTop!: number;
  eleLeft!: number;

  @Input() toolTipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() toolTipAlignment: 'start' | 'center' | 'end' = 'center';
  @Input() toolTipClass!: string;
  @Input() toolTipMessage!: string;

  objtt!: HTMLElement;

  constructor(
    private readonly eleRef: ElementRef
  ) {}

  mouseEnter() {
    this.setElementValues();

    this.objtt = document.createElement('div');

    this.objtt.style.display = 'flex';
    this.objtt.style.justifyContent = 'center';
    this.objtt.style.alignItems = 'center';
    this.objtt.style.position = 'absolute';
    this.objtt.style.opacity = '0';
    this.objtt.style.transition = 'all .25s ease-in-out';
    this.objtt.style.borderRadius = '.25rem';
    this.objtt.style.padding = '.25rem .5rem';

    if (this.toolTipClass) {
      this.objtt.classList.add(this.toolTipClass);
    } else {
      this.objtt.style.backgroundColor = 'black';
      this.objtt.style.color = 'white';
      this.objtt.style.fontSize = '12px';
    }

    this.objtt.innerHTML = this.toolTipMessage;

    document.body.appendChild(this.objtt);

    this.setTopPosition();
    this.setLeftPosition();

    setTimeout(() => this.objtt.style.opacity = '1', 0);
  }

  mouseLeave() {
    this.objtt.remove();
  }

  private setElementValues(): void {
    this.eleHeight = this.eleRef.nativeElement.offsetHeight;
    this.eleWidth = this.eleRef.nativeElement.offsetWidth;
    this.eleTop = this.eleRef.nativeElement.offsetTop;
    this.eleLeft = this.eleRef.nativeElement.offsetLeft;
  }

  private setTopPosition(): void {
    let top: number;
    if (this.toolTipPosition === 'right' || this.toolTipPosition === 'left') {
      top = (this.eleTop + (this.eleHeight / 2)) - (this.objtt.clientHeight / 2);
    } else if (this.toolTipPosition === 'bottom') {
      top = this.eleTop + this.eleHeight + 5;
    } else {
      top = this.eleTop - this.objtt.clientHeight - 5;
    }

    this.objtt.style.top = `${top}px`;
  }

  private setLeftPosition(): void {
    let left: number;
    if (this.toolTipPosition === 'left') {
      left = this.eleLeft - this.objtt.clientWidth - 5;
    } else if (this.toolTipPosition === 'right') {
      left = this.eleLeft + this.eleWidth + 5;
    } else {
      if (this.toolTipAlignment === 'start') {
        left = this.eleLeft;
      } else if (this.toolTipAlignment === 'end') {
        left = (this.eleLeft + this.eleWidth) - this.objtt.clientWidth;
      } else {
        left = (this.eleLeft + (this.eleWidth / 2)) - (this.objtt.clientWidth / 2);
      }
    }

    this.objtt.style.left = `${left}px`;
  }
}