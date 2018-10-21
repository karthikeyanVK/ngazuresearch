import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExploreSearchComponent } from './explore-search/explore-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ngMaterialLocalModule} from './material-module';
const appRoutes: Routes = [
  { path: '', component: ExploreSearchComponent },
  { path: 'search', component: ExploreSearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ExploreSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    ngMaterialLocalModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
