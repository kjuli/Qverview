import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LanguageGraphComponent } from './language-graph/language-graph.component';
import {DataResolver} from './index/DataResolver';


const routes: Routes = [
  { path: 'conversion', component: LanguageGraphComponent },
  { path: 'data', component: IndexComponent, resolve: { apiState: DataResolver } },
  { path: '', redirectTo: 'data', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

