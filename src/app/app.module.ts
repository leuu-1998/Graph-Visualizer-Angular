import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { NodeComponent } from './node/node.component';
import { EdgeComponent } from './edge/edge.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    NodeComponent,
    EdgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
