import { Component, ViewChild, Input } from '@angular/core';
import { ChatService } from './chat.service';

import { LoginComponent } from './auth/login/login.component';
import { ReportComponent } from './report/report.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Me | JSramverk';
    @Input()
    chatUser: string;
    chatMsg: string;

    open = 1;
    userSet: string;
    messagelist: string[] = [];

    constructor(private chat: ChatService) {
    }

    ngOnInit() {
        this.chat.getMessages().subscribe(msg => {
          console.log(msg);
          this.messagelist.push(msg);
        })
    }
    setChatUser() {
        this.userSet = this.chatUser;
        this.chatMsg = this.chatUser + " just logged in."
        this.sendMsg()
    }

    unsetChatUser() {
        this.userSet = "";
    }

    toggleChat() {
        this.open++
        console.log(this.open);
    }

    sendMsg() {
        var today = new Date();
        this.chat.sendMsg({"message": this.chatMsg, "user": this.userSet, "time": today.getHours() + ":" + today.getMinutes()});
        this.chatMsg = "";
    }


}
