import {NgModule} from '@angular/core';

import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatRadioModule, MatTabsModule, MatToolbarModule,
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
        MatFormFieldModule,
        MatInputModule,
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
        MatFormFieldModule,
        MatInputModule,
    ]
})
export class MaterialModule {}