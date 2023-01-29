import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserpermisionsComponent } from './components/userpermisions/userpermisions.component';
import { SidenavcontentComponent } from './components/sidenav/sidenavcontent/sidenavcontent.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavlinksComponent } from './components/sidenav/sidenavcontent/sidenavlinks/sidenavlinks.component';
import { PermisionSearchFilterComponent } from './components/userpermisions/permision-search-filter/permision-search-filter.component';
import { UserpermisiontableComponent } from './components/userpermisions/userpermisiontable/userpermisiontable.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { UserpermissionService } from './services/userpermission.service';
import { MatCardModule } from '@angular/material/card';
import { SigninComponent } from './components/signin/signin.component';
import { DialogModule } from 'primeng/dialog';
import { PickListModule } from 'primeng/picklist';
import { ClientListAddComponent } from './components/userpermisions/userpermisiontable/client-list-add/client-list-add.component';
import { UsersClientService } from './services/users-client.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CustomDateFormatPipe } from './shared/custom-date-format.pipe';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { SerachUserPermissionPipe } from './shared/serach-user-permission.pipe';
import { InstrumentConfigurationComponent } from './components/instrument-configuration/instrument-configuration.component';
import { InstrumentMappingProjectComponent } from './components/instrument-configuration/instrument-mapping-project/instrument-mapping-project.component';
import { ProjectHeaderComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/project-header/project-header.component';
import { ProjectContentComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/project-content.component';
import { DestinationPanelComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/destination-panel/destination-panel.component';
import { InstrumentsExpandablePanelComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/destination-panel/instruments-expandable-panel/instruments-expandable-panel.component';
import { PanelModule } from 'primeng/panel';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AuditReportComponent } from './components/audit-report/audit-report.component';
import { AuditReportSearchComponent } from './components/audit-report/audit-report-search/audit-report-search.component';
import { AuditTableComponent } from './components/audit-report/audit-table/audit-table.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { RecentActivityTableComponent } from './components/dashboard/recent-activity-table/recent-activity-table.component';
import { MappingTableComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/mapping-table/mapping-table.component';
import { InstrumentDestinationComponent } from './components/instrument-destination/instrument-destination.component'
import { BadgeModule } from 'primeng/badge';
import { MpExpandablePanelComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/mp-expandable-panel.component';
import { SourceLegacyPanelComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/source-legacy-panel/source-legacy-panel.component';
import { SourceLegacyExpandablePanelComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/source-legacy-panel/source-legacy-expandable-panel/source-legacy-expandable-panel.component';
import { MappingPanelComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mapping-panel.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SchemaMigrationComponent } from './components/schema-migration/schema-migration.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileupComponent } from './components/schema-migration/fileup/fileup.component';
import { MappedResultComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/mapped-result/mapped-result.component';
import { TooltipModule } from 'primeng/tooltip';
import { ResultComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/result/result.component';
import { DestinationFileupComponent } from './components/instrument-destination/destination-fileup/destination-fileup.component';
import { TabViewModule } from 'primeng/tabview';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MultiMappingComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/multi-mapping/multi-mapping.component';
import { MatRadioModule } from '@angular/material/radio';
import { ConcatenateComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/concatenate/concatenate.component';
import { ChipsModule } from 'primeng/chips';
import { UidGenrationComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/uid-genration/uid-genration.component';
import { HardcodedComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/hardcoded/hardcoded.component';
import { CriteriaComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/criteria/criteria.component';
import { MatSelectModule } from '@angular/material/select';
import { IfConditionComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/if-condition/if-condition.component';
import { IfOnlyComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/if-condition/if-only/if-only.component';
import { IfConcatComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/if-condition/if-concat/if-concat.component';
import { IfConcatCriteriaComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/mapping-panel/mp-expandable-panel/if-condition/if-concat-criteria/if-concat-criteria.component';
import { AuthGuard } from './services/auth.guard';
import {SkeletonModule} from 'primeng/skeleton';
import { DatePipe } from '@angular/common';

import { SearchuserpermissiontableComponent } from './components/userpermisions/searchuserpermissiontable/searchuserpermissiontable.component';
import { SortPipePipe } from './shared/sort-pipe.pipe';
import { UidNameFilterPipe } from './shared/uid-name-filter.pipe';
import { CustomInterceptor } from './services/custom-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    UserpermisionsComponent,
    SidenavcontentComponent,
    HeaderComponent,
    SidenavlinksComponent,
    PermisionSearchFilterComponent,
    UserpermisiontableComponent,
    ClientListAddComponent,
    DashboardComponent,
    SigninComponent,
    HomeMainComponent,
    UsermanagementComponent,
    ClientManagementComponent,
    CustomDateFormatPipe,
    UsermanagementComponent,
    SerachUserPermissionPipe,
    InstrumentConfigurationComponent,
    InstrumentMappingProjectComponent,
    ProjectHeaderComponent,
    ProjectContentComponent,
    DestinationPanelComponent,
    InstrumentsExpandablePanelComponent,
    ForgetPasswordComponent,
    AuditReportComponent,
    AuditReportSearchComponent,
    AuditTableComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    RecentActivityTableComponent,
    MappingTableComponent,
    InstrumentDestinationComponent,
    MpExpandablePanelComponent,
    SourceLegacyPanelComponent,
    SourceLegacyExpandablePanelComponent,
    MappingTableComponent,
    InstrumentDestinationComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    RecentActivityTableComponent,
    MappingPanelComponent,
    SchemaMigrationComponent,
    FileupComponent,
    MappedResultComponent,
    ResultComponent,
    DestinationFileupComponent,
    MultiMappingComponent,
    ConcatenateComponent,
    UidGenrationComponent,
    HardcodedComponent,
    CriteriaComponent,
    IfConditionComponent,
    IfOnlyComponent,
    IfConcatComponent,
    IfConcatCriteriaComponent,
    SearchuserpermissiontableComponent,
    SortPipePipe,
    UidNameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    TableModule,
    ButtonModule,
    MatCardModule,
    ButtonModule,
    DialogModule,
    PickListModule,
    RouterModule,
    ToggleButtonModule,
    ToastModule,
    RippleModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    PaginatorModule,
    PanelModule,
    SplitButtonModule,
    CheckboxModule,
    FileUploadModule,
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    ScrollPanelModule,
    ProgressSpinnerModule,
    TooltipModule,
    TagModule,
    TabViewModule,
    MatProgressBarModule,
    MatRadioModule,
    ChipsModule,
    MatSelectModule,
    SkeletonModule
  ],

  providers: [UserpermissionService, UsersClientService, MessageService, ConfirmationService,
    AuthGuard,DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }