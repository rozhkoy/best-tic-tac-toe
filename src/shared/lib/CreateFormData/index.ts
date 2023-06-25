import { ICreateFormData } from './types';

export function createFormData(obj: Array<ICreateFormData>) {
	const formData = new FormData();
	obj.map((item) => {
		formData.append(item.key, item.value);
	});
	return formData;
}
