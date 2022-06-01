import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import {DockModule} from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';
import { SpeedDialModule } from 'primeng/speeddial';
import { PanelModule } from 'primeng/panel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { SmallscreenNavComponent } from './shared/smallscreen-nav/smallscreen-nav.component';
import { StartComponent } from './start/start.component';
import {CardModule} from 'primeng/card';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';
import { SaveBookmarkComponent } from './shared/save-bookmark/save-bookmark.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    ToolbarComponent,
    SmallscreenNavComponent,
    StartComponent,
    BookmarksComponent,
    SaveBookmarkComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    DockModule,
    MenuModule,
    ToolbarModule,
    MenubarModule,
    TooltipModule,
    ImageModule,
    SpeedDialModule,
    PanelModule,
    FlexLayoutModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    TableModule,
    ProgressSpinnerModule,
    DialogModule,
    
    
  ],
  providers: [MessageService, SaveBookmarkComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
