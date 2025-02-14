import { AbstractControl } from '@angular/forms';

import { map, Observable } from 'rxjs';
import { Config } from 'src/app/layout/common-layout/model/fields/variable/config';

export class ConfigKeyValidator {
	static createValidator(allConfigs$: Observable<Config[]>, configToUpdateKey: string | undefined) {
		return (control: AbstractControl) => {
			const currentKey = control.value;
			return allConfigs$.pipe(
				map(configs => {
					const configKeyUsed = !!configs.find(c => c.key === currentKey && configToUpdateKey !== c.key);
					if (configKeyUsed) {
						return { keyUsed: true };
					}
					return null;
				})
			);
		};
	}
}
