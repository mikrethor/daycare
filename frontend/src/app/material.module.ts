import {NgModule} from '@angular/core';

import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatListModule, MatMenuModule, MatRadioModule,
    MatTabsModule, MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
  ]
})
export class MaterialModule {}