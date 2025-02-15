import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from '../../../../../../common-layout/service/theme.service';
import { Config } from '../../../../../../common-layout/model/fields/variable/config';

@Component({
	selector: 'app-variable-content',
	templateUrl: './config-card.component.html',
	styleUrls: ['./config-card.component.scss'],
})
export class ConfigCardComponent {
	@Output() deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() variable: Config;
	@Input() viewMode: boolean;

	constructor(public themeService: ThemeService) {}
}
