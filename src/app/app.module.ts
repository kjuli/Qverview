import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SdksTableComponent } from './sdk/sdks-table/sdks-table.component';
import { OrchestratorsTableComponent } from './orchestrator/orchestrators-table/orchestrators-table.component';
import { QuantumCloudServicesTableComponent } from './quantum-cloud-service/qcs-table/quantum-cloud-services-table.component';
import { QuantumExecutionResourcesTableComponent } from './quantum-execution-resource/quantum-execution-resources-table/quantum-execution-resources-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgrammingLanguageTableComponent } from './programming-language/programming-language-table/programming-language-table.component';
import { CompilerTableComponent } from './compiler/compiler-table/compiler-table.component';
import { FilterComponent } from './filter/filter.component';
import { SyncSdkQcsButtonComponent } from './filter/sync-sdk-qcs-button/sync-sdk-qcs-button.component';
import { SyncQcsQerButtonComponent } from './filter/sync-qcs-qer-button/sync-qcs-qer-button.component';
import { IndexComponent } from './index/index.component';
import { LanguageGraphComponent } from './language-graph/language-graph.component';
import {TableComponent} from './generictable/table.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { RepositoryDialogComponent } from './repository-dialog/repository-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { SplashComponent } from './splash/splash.component';
import { CellComponent } from './generictable/cell/cell.component';
import {AppConfig} from './config/app-config.model';
import {AppConfigService} from './config/app-config.service';
import { DetailedViewComponent } from './generictable/detailed-view/detailed-view.component';
import { ItemBadgeComponent } from './generictable/item-badge/item-badge.component';
import { FilterPanelComponent } from './filter/filter-panel/filter-panel.component';
import {ReferencesService} from './references/references.service';

export function initializeApp(appConfig: AppConfigService): () => Promise<void> {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SdksTableComponent,
    OrchestratorsTableComponent,
    QuantumCloudServicesTableComponent,
    QuantumExecutionResourcesTableComponent,
    ProgrammingLanguageTableComponent,
    CompilerTableComponent,
    FilterComponent,
    SyncSdkQcsButtonComponent,
    SyncQcsQerButtonComponent,
    IndexComponent,
    LanguageGraphComponent,
    TableComponent,
    RepositoryDialogComponent,
    SplashComponent,
    CellComponent,
    DetailedViewComponent,
    ItemBadgeComponent,
    FilterPanelComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
      AppConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfigService],
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
