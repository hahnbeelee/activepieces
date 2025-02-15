import { Component, Input } from '@angular/core';
import {
	ControlValueAccessor,
	FormBuilder,
	FormControl,
	FormGroup,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	Validators,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { fadeInUp400ms } from 'src/app/layout/common-layout/animation/fade-in-up.animation';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-o-auth2-config-settings',
	templateUrl: './o-auth2-config-settings.component.html',
	styleUrls: ['./o-auth2-config-settings.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: OAuth2ConfigSettingsComponent,
		},
		{
			provide: NG_VALIDATORS,
			multi: true,
			useExisting: OAuth2ConfigSettingsComponent,
		},
	],
	animations: [fadeInUp400ms],
})
export class OAuth2ConfigSettingsComponent implements ControlValueAccessor {
	settingsForm: FormGroup;
	settingsFormValueChanged$: Observable<void>;
	@Input() submitted: boolean = false;
	onChange = val => {};
	constructor(private formBuilder: FormBuilder) {
		this.settingsForm = this.formBuilder.group({
			redirectUrl: new FormControl({ value: environment.redirectUrl, disabled: true }),
			clientSecret: new FormControl('', Validators.required),
			clientId: new FormControl('', Validators.required),
			authUrl: new FormControl('', Validators.required),
			refreshUrl: new FormControl(''),
			tokenUrl: new FormControl('', Validators.required),
			responseType: new FormControl('code', Validators.required),
			scope: ['', [Validators.required]],
		});
		this.settingsFormValueChanged$ = this.settingsForm.valueChanges.pipe(
			tap(() => this.onChange(this.settingsForm.getRawValue()))
		);
	}
	writeValue(obj: any): void {
		this.settingsForm.patchValue(obj);
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {}
	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.settingsForm.disable();
		}
	}
	validate() {
		if (this.settingsForm.invalid) {
			return { invalid: true };
		}
		return null;
	}
}
