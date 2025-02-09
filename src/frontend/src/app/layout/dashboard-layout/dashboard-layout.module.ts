import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { DashboardLayoutRouting } from './dashboard-layout.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RunsComponent } from './pages/runs/runs.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CommonLayoutModule } from '../common-layout/common-layout.module';
import { CollectionComponent } from './pages/collections/collection-components.component';
import { ListPiecesResolver } from './resolvers/list-pieces-resolver.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimeagoModule } from 'ngx-timeago';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EmptyCollectionsTableComponent } from './pages/collections/empty-collections-table/empty-collections-table.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TrialStatusComponent } from './pages/trial-status/trial-status.component';

@NgModule({
	declarations: [
		DashboardLayoutComponent,
		SidebarComponent,
		RunsComponent,
		CollectionComponent,
		EmptyCollectionsTableComponent,
		UserAvatarComponent,
		TrialStatusComponent,
	],
	imports: [
		CommonModule,
		CommonLayoutModule,
		RouterModule.forChild(DashboardLayoutRouting),
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		ProgressbarModule,
		MatProgressBarModule,
		FontAwesomeModule,
		TimeagoModule.forChild(),
		NgxSkeletonLoaderModule,
	],
	exports: [],
	providers: [ListPiecesResolver],
})
export class DashboardLayoutModule {}
