import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { AuthenticationService, SharedModule } from '../shared';
import { LandingHeaderComponent } from '../layout/components/landing-header/landing-header.component';
import { SignupModule } from '../signup/signup.module';
@NgModule({
    imports: [CommonModule, FormsModule, LandingRoutingModule, SignupModule, SharedModule.forRoot()],
    declarations: [LandingComponent,
        LandingHeaderComponent
    ],
    providers: [AuthenticationService]
})
export class LandingModule { }
