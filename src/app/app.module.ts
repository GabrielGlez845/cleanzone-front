import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//components
import { PagarModalComponent } from './views/pages/modals/pagar-modal/pagar-modal.component';
import { AgregarPrendaModalComponent } from './views/pages/modals/agregar-prenda-modal/agregar-prenda-modal.component';
import { AgregarClienteModalComponent } from './views/pages/modals/agregar-cliente-modal/agregar-cliente-modal.component';
import { AgregarObservacionModalComponent } from './views/pages/modals/agregar-observacion-modal/agregar-observacion-modal.component';
import { AgregarColorModalComponent } from './views/pages/modals/agregar-color-modal/agregar-color-modal.component';
import { PendienteModalComponent } from './views/pages/modals/pendiente-modal/pendiente-modal.component';
import { AgregarCategoriaModalComponent } from './views/pages/modals/agregar-categoria-modal/agregar-categoria-modal.component';
import { AgregarEmpleadoModalComponent } from './views/pages/modals/agregar-empleado-modal/agregar-empleado-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    PagarModalComponent,
    AgregarPrendaModalComponent,
    AgregarClienteModalComponent,
    AgregarObservacionModalComponent,
    AgregarColorModalComponent,
    PendienteModalComponent,
    AgregarCategoriaModalComponent,
    AgregarEmpleadoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
