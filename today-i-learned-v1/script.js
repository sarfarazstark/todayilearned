const formToggle = document.querySelector('.form-toggle');
const form = document.querySelector('.fact-form');
const factList = document.querySelector('.fact-list');
let bool = false;

const CATEGORIES = [
	{ name: 'technology', color: '#3b82f6' },
	{ name: 'science', color: '#16a34a' },
	{ name: 'finance', color: '#ef4444' },
	{ name: 'society', color: '#eab308' },
	{ name: 'entertainment', color: '#db2777' },
	{ name: 'health', color: '#14b8a6' },
	{ name: 'history', color: '#f97316' },
	{ name: 'news', color: '#8b5cf6' },
];

const factHtml = (fact) => {
	return `
        <li class="fact">
            <p>
              ${fact.text}
              <a class="source" href="${
								fact.source
							}" target="_blank">(Source)</a>
            </p>
            <span class="tag" style="background-color: ${
							CATEGORIES.find((category) => category.name === fact.category)
								.color
						}">${fact.category}</span>
            <div class="vote-buttons">
              <label>
                <input type="checkbox" name="" id="" style="display: none;">
                <p>👍 ${fact.votesInteresting}</p>
              </label>
              <label>
                <input type="checkbox" name="" id="" style="display: none;">
                <p>🤯 ${fact.votesMindblowing}</p>
              </label>
              <label>
                <input type="checkbox" name="" id="" style="display: none;">
                <p>⛔️ ${fact.votesFalse}</p>
              </label>
            </div>
        </li>`;
};

// Clear list
factList.innerHTML = '';

const loadFacts = async () => {
	const res = await fetch(
		'https://cqxwiqukvidbwkzxxomc.supabase.co/rest/v1/facts',
		{
			headers: {
				apiKey:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxeHdpcXVrdmlkYndrenh4b21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMjI4NTYsImV4cCI6MjA0MDc5ODg1Nn0.dKOxTSnNNTX-CAFagKERX6dgH38KiAoOo7ATw76XZk4',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxeHdpcXVrdmlkYndrenh4b21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMjI4NTYsImV4cCI6MjA0MDc5ODg1Nn0.dKOxTSnNNTX-CAFagKERX6dgH38KiAoOo7ATw76XZk4',
			},
		}
	);
	const data = await res.json();

	const html = data.map(factHtml).join('');

	factList.insertAdjacentHTML('beforeend', html);
};

loadFacts();

// initialFacts.forEach((fact) => {
// 	factList.insertAdjacentHTML('afterbegin', html(fact));
// });

// Render facts
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
