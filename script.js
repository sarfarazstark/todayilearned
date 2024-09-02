const formToggle = document.querySelector('.form-toggle');
const form = document.querySelector('.fact-form');
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
