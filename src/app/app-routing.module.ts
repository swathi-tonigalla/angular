import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { InstrumentConfigurationComponent } from './components/instrument-configuration/instrument-configuration.component';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import{InstrumentDestinationComponent} from './components/instrument-destination/instrument-destination.component'
 
import { UserpermisionsComponent } from './components/userpermisions/userpermisions.component';
// import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AuditReportComponent } from './components/audit-report/audit-report.component';
import { ProjectContentComponent } from './components/instrument-configuration/instrument-mapping-project/project-content/project-content.component';
import { InstrumentMappingProjectComponent } from './components/instrument-configuration/instrument-mapping-project/instrument-mapping-project.component';
import { SchemaMigrationComponent } from './components/schema-migration/schema-migration.component'
import { ConfirmpasswordComponent } from './components/confirmpassword/confirmpassword.component';
import { AuthGuard } from './services/auth.guard';
import { LoginAuthGuard } from './services/login.auth.guard';
// import { Auth2Guard } from './services/auth2.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'signin', component: SigninComponent,canActivate: [LoginAuthGuard] },
  { path: 'homeMain', component: HomeMainComponent },
  { path: 'homeIndex', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: 'instrumentConfiguration', component: InstrumentConfigurationComponent ,
  children:[
    {path:'instrumentmapping', component:InstrumentMappingProjectComponent,
  children:[
    {path:'projectcontent', component:ProjectContentComponent}
  ]
  }
  ]
},
 
  { path: 'userpermissions', component: UserpermisionsComponent,canActivate: [AuthGuard] },
  { path: 'usermanagement', component: UsermanagementComponent,canActivate: [AuthGuard] },
  { path: 'clientmanagement', component: ClientManagementComponent, canActivate: [AuthGuard] },
  { path: 'forgetpassword', component: ForgetPasswordComponent},
  { path: 'auditreport', component:AuditReportComponent,canActivate: [AuthGuard]},
  { path: 'instrumentDestination', component: InstrumentDestinationComponent,canActivate: [AuthGuard] },
  { path: 'schemaMigration', component: SchemaMigrationComponent},
  { path: 'confirmPassword', component: ConfirmpasswordComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }