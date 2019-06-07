import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { customHttpProvider } from './common/services/chttp.service';

import { AppComponent } from './app.component';
import { UpdateComponent } from './update/update.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

import { UserService } from './services/user.service';
import { ScrollService } from './services/scroll.service';
import { ImageService } from './services/image.service';

import { AuthGuard } from './services/auth.guard';
import { LoggedInGuard } from './services/logged-in.guard';
import { routing } from './app.routing';
import { AuthService } from './services/auth.service';
import { CommentService } from './services/comment.service';
import { UpdateService } from './services/update.service';
import { UpdateCreateComponent } from './update-create/update-create.component';
import { EditComponent } from './user/edit/edit.component';
import { ResourceService } from './services/resource.service';
import { ImageViewUploadComponent } from './common/components/image-view-upload/image-view-upload.component';
import { SearchComponent } from './search/search.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UpdatesComponent } from './updates/updates.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotificationService } from './services/notification.service';
import { NotificationInfoComponent } from './notification-info/notification-info.component';
import { NotificationListingComponent } from './notification-listing/notification-listing.component';
import { FollowService } from './services/follow.service';
import { TimeAgoPipe } from './time-ago.pipe';
import { ContentPanelComponent } from './content-panel/content-panel.component';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { PopularUsersComponent } from './popular-users/popular-users.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    CommentsComponent,
    CommentComponent,
    HomeComponent,
    LoginComponent,
    UpdateCreateComponent,
    EditComponent,
    ImageViewUploadComponent,
    SearchComponent,
    UserViewComponent,
    UserInfoComponent,
    UpdatesComponent,
    RegisterComponent,
    NotificationInfoComponent,
    NotificationListingComponent,
    TimeAgoPipe,
    ContentPanelComponent,
    PopularTagsComponent,
    PopularUsersComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    routing
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    LoggedInGuard,
    AuthService,
    CommentService,
    UpdateService,
    ResourceService,
    UserService,
    ImageService,
    ScrollService,
    NotificationService,
    FollowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
