import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailPattern, PasswordPattern, UtilService, AuthenticationService } from '../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordForm') forgotPasswordForm: NgForm;
    @ViewChild('verificationcode') verificationcode: NgForm;
    @ViewChild('PasswordForm') PasswordForm: NgForm;
    @ViewChild('SucessContentweb') SucessContentweb;
    @ViewChild('verfycode') verfycode;
    @ViewChild('verfycode2') verfycode2;
    @ViewChild('passwordsucess') passwordsucess;
    @ViewChild('passwordsucess_OK') passwordsucess_OK;
    public forgotPasswordModel: any = {};
    public verificationdModel: any = {};
    public PasswordModel: any = {};
    public emailPattern: string = EmailPattern;
    passwordPattern: string = PasswordPattern;
    modalRef: any;
    forgot: boolean = true;
    verification: boolean = false;
    
    resetpassword: boolean = false;
    pass_reset: boolean = false;
    verification_code: boolean = false;
    constructor(
        public router: Router,
        private modalService: NgbModal,
        private authenticationService: AuthenticationService,
        private utilService: UtilService
    ) {

    }

    ngOnInit() { }

    // checkForgotPassword() {
    //     this.router.navigate(['login']);
    // }
    openChangePassword() {
        console.log(this.forgotPasswordModel);

        // this.authenticationService.ForgotpasswordUsingemail(this.forgotPasswordModel).subscribe(res => {
        //     console.log(res);
        //     this.modalRef = this.modalService.open(this.SucessContentweb, { size: 'sm' });
        //     // this._utilService.showErrorSuccess(res.message);
        // }, err => {
        //     this.utilService.showErrorCall(err);
        // });
        this.modalRef = this.modalService.open(this.verfycode, { size: 'lg', windowClass: 'verification-model' });
    }
    openChangePassword1() {

    }
    varificationCode() {

    }
    closeSuccess(key) {
        this.forgot = false;
        this.verification = false;
        this.resetpassword = false;
        if (key == 'code') {
            // this.verification = true;
        }
        else if (key == 'password') {
            this.verifyotp();
        }
        else if (key == 'conform') {
            this.Resetpassword();
        }
    }
    verifyotp() {
        // this.verificationdModel['email'] = this.forgotPasswordModel.email;
        // this.authenticationService.verifyotp(this.verificationdModel).subscribe(res => {
        //     console.log(res);
        //     this.resetpassword = true;
        //     // this._utilService.showErrorSuccess(res.message);
        // }, err => {
        //     this.utilService.showErrorCall(err);
        // });
        this.resetpassword = true;
    }
    Resetpassword() {
        
        // this.authenticationService.passwordreset({ 'password': this.PasswordModel.password, 'email': this.forgotPasswordModel.email }).subscribe(res => {
        //     console.log(res);
        //     this.router.navigate(['/login'])
        //     // this._utilService.showErrorSuccess(res.message);
        // }, err => {
        //     this.utilService.showErrorCall(err);
        // });

        // this.router.navigate(['/login'])
         this.modalRef = this.modalService.open(this.passwordsucess_OK, { size: 'lg', windowClass: 'password-ok-model' });
       
    }
    verify() {
        this.verification_code = true;
    }
    verify_code2() {
        // this.verification_code = false;
        this.modalRef.close();
        this.resetpassword = true;

    }
    openChangePassword2(){
        // this.modalRef = this.modalService.open(this.passwordsucess, { size: 'lg', windowClass: 'verification-model' });

    }
    ok_success(){
        console.log('dsv');
          this.modalRef.close();
        this.router.navigate(['/login'])

    }
}
