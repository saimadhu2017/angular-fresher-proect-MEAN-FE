import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouseHover]'
})
export class MouseHoverDirective {

  constructor(private el: ElementRef, private re: Renderer2) {
    re.setStyle(el.nativeElement, 'cursor', 'pointer');
  }

}
