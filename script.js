const formToggle = document.querySelector('.form-toggle');
const form = document.querySelector('.fact-form');
const factList = document.querySelector('.fact-list');
let bool = false;

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
							CATEGORIES[fact.category]
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

const CATEGORIES = {
	technology: '#3b82f6',
	science: '#16a34a',
	finance: '#ef4444',
	society: '#eab308',
	entertainment: '#db2777',
	health: '#14b8a6',
	history: '#f97316',
	news: '#8b5cf6',
};
const initialFacts = [
	{
		id: 1,
		text: 'React is being developed by Meta (formerly facebook)',
		source: 'https://opensource.fb.com/',
		category: 'technology',
		votesInteresting: 24,
		votesMindblowing: 9,
		votesFalse: 4,
		createdIn: 2021,
	},
	{
		id: 2,
		text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
		source:
			'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
		category: 'society',
		votesInteresting: 11,
		votesMindblowing: 2,
		votesFalse: 0,
		createdIn: 2019,
	},
	{
		id: 3,
		text: 'Lisbon is the capital of Portugal',
		source: 'https://en.wikipedia.org/wiki/Lisbon',
		category: 'society',
		votesInteresting: 8,
		votesMindblowing: 3,
		votesFalse: 1,
		createdIn: 2015,
	},
];

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
