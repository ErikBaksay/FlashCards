import { SetCreatorComponent } from './components/set-creator/set-creator.component';
import { CurrentComponent } from './components/current/current.component';
import { LibraryComponent } from './components/library/library.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : '', component : LandingPageComponent},
  {path : 'library', component : LibraryComponent},
  {path : 'library/:set', component : CurrentComponent},
  {path : 'set-creator', component : SetCreatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
