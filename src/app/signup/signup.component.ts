import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailPattern, PasswordPattern } from '../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    @ViewChild('signUpForm') signUpForm: NgForm;
    @ViewChild('emailverify') emailverify;
    public registrationModel: any = {};
    public emailPattern: string = EmailPattern;
    public passwordPattern: string = PasswordPattern;
    modalRef: any;
    public emailVerify: boolean = true;
    public emailCode: boolean = false;
    public phoneCode: boolean = false;
    public phoneVerify: boolean = false;
    public phoneVerificationCode: boolean = false;
    public setprofile: boolean = false;
    public signup: boolean = true;

    constructor(
        public router: Router,
        public modalService: NgbModal
    ) {

    }

    ngOnInit() { }

    register() {
        // localStorage.setItem('isLoggedin', 'true');
        // this.router.navigate(['dashboard']);
    }

    openModal() {
        this.modalRef = this.modalService.open(this.emailverify, { size: 'lg', windowClass: 'modal-trans' });
    }

    next() {
        this.emailVerify = false;
        this.emailCode = true;
        this.phoneCode = false;
        this.phoneVerify = false;
        this.phoneVerificationCode = false;
    }

    next1() {
        this.emailVerify = false;
        this.emailCode = false;
        this.phoneCode = true;
        this.phoneVerify = false;
        this.phoneVerificationCode = false;
    }

    next2() {
        this.emailVerify = false;
        this.emailCode = false;
        this.phoneCode = false;
        this.phoneVerify = true;
        this.phoneVerificationCode = false;
    }

    next3() {
        this.emailVerify = false;
        this.emailCode = false;
        this.phoneCode = false;
        this.phoneVerify = false;
        this.phoneVerificationCode = true;
    }
    Setprofile() {
        this.signup = false;
        this.modalRef.close();
        this.setprofile = true;
    }
    finish() {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['dashboard']);
    }
}
