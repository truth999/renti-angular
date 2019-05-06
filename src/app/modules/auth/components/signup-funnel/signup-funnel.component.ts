import { Component, OnInit } from '@angular/core';
import { config } from '../../../../../config';
import { CONFIG_CONST } from '../../../../../config/config-const';
import { Landlord, Tenant } from '../../../../shared/models';

@Component({
  selector: 'app-signup-funnel',
  templateUrl: './signup-funnel.component.html',
  styleUrls: ['./signup-funnel.component.scss']
})
export class SignupFunnelComponent implements OnInit {
  accountType: string;
  currentStep = CONFIG_CONST.signupSteps.TYPE_USERNAME;
  stepNo = 0;

  STEPS: string[] = [];
  CONFIG_CONST = CONFIG_CONST;

  constructor() { }

  ngOnInit() {
  }

  onSelectAccountType(type: string) {
    this.accountType = type;
    this.STEPS = config.signupSteps[type];
  }

  nextStep() {
    this.stepNo++;
    this.currentStep = this.STEPS[this.stepNo];
  }

  previewStep() {
    this.stepNo--;
    this.currentStep = this.STEPS[this.stepNo];
  }

}
