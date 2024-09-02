const formToggle = document.querySelector('.form-toggle');
const form = document.querySelector('.fact-form');
const fact = document.querySelector('.fact');
const factList = document.querySelector('.fact-list');
let bool = false;

formToggle.addEventListener('click', () => {
	form.classList.toggle('hidden');
	if (bool) {
		formToggle.textContent = 'Share a fact';
		bool = false;
	} else {
		formToggle.textContent = 'Close';
		bool = true;
	}
});

fact.addEventListener('click', (e) => {
	const btn = e.target.closest('button');
	if (!btn) return;
	console.log('clicked');
});
