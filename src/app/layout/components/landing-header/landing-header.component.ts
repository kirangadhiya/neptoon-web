import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UtilService, PasswordPattern, UsersService } from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
    selector: 'landing-header',
    templateUrl: './landing-header.component.html',
    styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
    @ViewChild('loginForm') loginForm: NgForm;
    public loginModel: any = {
        device_type: '3',
        device_token: ''
    };
    public isLoading: boolean = false;
    constructor(
        public router: Router
    ) {

    }
    ngOnInit() {


    }
    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['dashboard']);
    }
}