import { IFormDataObject } from './types';

export function createFormData(obj: Array<IFormDataObject>) {
	const formData = new FormData();
	obj.map((item) => {
		formData.append(item.key, item.value);
	});
	return formData;
}
