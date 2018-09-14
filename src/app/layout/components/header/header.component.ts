import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UtilService, PasswordPattern, UsersService, AuthenticationService } from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    @ViewChild('changePasswordContent') changePasswordContent;
    @ViewChild('profileContent') profileContent;
    userNameSubscriber: any;
    userModel: any = {};
    passwordPattern: string = '';
    isLoading: boolean;
    modalRef: any;
    profilePicFile: any = null;
    isUserNameExist = false;
    isUserNameChecking = false;
    isProfilePicUpdating = false;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private modalService: NgbModal,
        public utilService: UtilService,
        public usersService: UsersService,
        public authenticationService: AuthenticationService
    ) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.passwordPattern = PasswordPattern;

    }

    checkUserNameExistOrnot(username) {
        var input = document.getElementById('username');
        if (this.userNameSubscriber) {
            this.userNameSubscriber.unsubscribe();
        }
        this.userNameSubscriber = fromEvent(input, 'keyup').pipe(
            debounceTime(500),
            map(params => params)
        ).subscribe(res => {
            this.usernameViaApi(username)
        });
    }

    usernameViaApi(username) {
        if (username.length < 1)
            return;
        this.isUserNameChecking = true;
        this.usersService.checkUserName(username).subscribe(res => {
            this.isUserNameChecking = false;
            this.isUserNameExist = !res;
        }, err => {
            this.isUserNameChecking = false;
            this.utilService.showErrorCall(err);
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        // this.authenticationService.logout().subscribe(res => {
        //     console.log(res);
        //     if (res.status == 'success') {
        // this.utilService.showErrorSuccess(res.message);
        this.router.navigate(['landing'])
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('access_token');
        //     }
        //     else {
        //         // this.utilService.showErrorCall(res.message);
        //     }
        // }, err => {
        //     this.isLoading = false;
        //     this.utilService.showErrorCall(err);
        // });
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    openChangePassword() {
        this.userModel = {};
        this.modalRef = this.modalService.open(this.changePasswordContent, { size: 'lg' });
    }

    openProfileModal() {
        this.profilePicFile = null;
        this.getProfileDetail();
        this.modalRef = this.modalService.open(this.profileContent, { size: 'lg' });
    }

    openFileSelecter(id) {
        this.utilService.openFileSelecter(id);
    }

    onPicSelected(event) {
        if (event.target.files && event.target.files.length > 0) {
            this.profilePicFile = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (e: any) => {
                this.userModel.profilepicurl = e.target.result;
                this.changeProfilePic();
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    changeProfilePic() {
        this.isProfilePicUpdating = true;
        let formData = new FormData();
        formData.append('file', this.profilePicFile);
        this.usersService.changeProfilePic(formData).subscribe(res => {
            debugger
            this.isProfilePicUpdating = false;
        }, err => {
            this.isProfilePicUpdating = false;
            this.utilService.showErrorCall(err);
        });
    }

    getProfileDetail() {
        this.isLoading = true;
        this.usersService.getUserById(this.utilService.getAccountDetails().Id).subscribe(res => {
            this.isLoading = false;
            let user: any = {};
            Object.keys(res.data).forEach(key => {
                user[key.toLowerCase()] = res.data[key];
            });
            this.userModel = _.clone(user);
        }, err => {
            this.modalRef.close();
            this.isLoading = false;
            this.utilService.showErrorCall(err);
        });
    }

    updateProfile() {
        this.isLoading = true;
        let model = _.clone(this.userModel);
        delete model.profilepicurl;
        this.usersService.updateProfile(model).subscribe(res => {
            this.isLoading = false;
            this.utilService.showErrorSuccess('', "Profile changed successfully.");
            this.modalRef.close();
        }, err => {
            this.isLoading = false;
            this.utilService.showErrorCall(err);
        });
    }

    updatePassword() {
        this.isLoading = true;
        this.usersService.changePassword(this.userModel).subscribe(res => {
            this.isLoading = false;
            this.utilService.showErrorSuccess('', "Passoword changed successfully.");
            this.modalRef.close();
        }, err => {
            this.isLoading = false;
            this.utilService.showErrorCall(err);
        });
    }
}
