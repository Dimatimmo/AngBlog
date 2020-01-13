import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service'

@Directive({
  selector: '[hideAdminButtons]'
})
export class HideAdminButtonsDirective {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private firebaseService: FirebaseService) { }
  @Input() set hideAdminButtons(status) {
    if (status) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
