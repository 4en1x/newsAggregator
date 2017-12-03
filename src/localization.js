import settings from '../settings.json';
export default function l10n(value, lan = 'en'){
	const patchs = value.split('.');
	let local = settings[lan];

	patchs.forEach((path) => {
		local = local[path];
	});
	return local;
}