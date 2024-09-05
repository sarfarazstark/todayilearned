import './style.css';
import { useEffect, useState } from 'react';
import supabase from './supabase';

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

/*
function Counter() {
	const [counter, setCounter] = useState(0);

	console.log('Rendering Counter');
	return (
		<div>
			{counter}
			<button
				className="btn btn-large"
				onClick={() => setCounter((c) => c + 1)}
			>
				+1
			</button>
		</div>
	);
}
*/

function App() {
	//1. Defining a state variable
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState('all');

	useEffect(
		function () {
			async function fetchData() {
				setLoading(true);

				let query = supabase.from('facts').select('*');

				if (currentCategory !== 'all') {
					query = query.eq('category', currentCategory);
				}

				const { data: facts, error } = await query
					.order('votesInteresting', { ascending: false })
					.limit(100);

				setLoading(false);
				if (!error) setFacts(facts);
				else alert('An error occurred. Please try again later.');
			}
			fetchData();
		},
		[currentCategory]
	);

	return (
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />

			{/*2. Use state variable */}
			<NewFactForm
				showForm={showForm}
				setShowForm={setShowForm}
				setFacts={setFacts}
			/>

			<main className="main">
				<CategoryFilter setCurrentCategory={setCurrentCategory} />
				{loading ? <Loader /> : <FactList facts={facts} />}
			</main>
		</>
	);
}

function Loader() {
	return <p className="message">Loading...</p>;
}

function Header({ setShowForm, showForm }) {
	const appTitle = 'Today I Learned';

	return (
		<header className="header">
			<div className="logo">
				<img src="logo.png" height="68" width="68" alt={appTitle + 'logo'} />
				<h1>{appTitle}</h1>
			</div>

			<button
				className="btn btn-large form-toggle"
				// 3. Update state variable
				onClick={() => setShowForm((show) => !show)}
			>
				{showForm ? 'Close' : 'Share a fact'}
			</button>
		</header>
	);
}

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

function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm({ showForm, setShowForm, setFacts }) {
	const formHide = showForm ? '' : ' hidden';
	const [text, setText] = useState('');
	const [source, setSource] = useState('https://example.com');
	const [category, setCategory] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const textLength = text.length;

	const handleSubmit = async function (e) {
		e.preventDefault();

		// Check if data is valid. if so, create a new fact
		if (text && isValidHttpUrl(source) && category) {
			// Create a new fact object
			// const newFact = {
			// 	id: Date.now(),
			// 	text,
			// 	source,
			// 	category,
			// 	votesInteresting: 0,
			// 	votesMindblowing: 0,
			// 	votesFalse: 0,
			// 	createdIn: new Date().getFullYear(),
			// };
			setIsUploading(true);
			// 3. Upload the fact to supabase and receive the new fact
			const { data: newFact, error } = await supabase
				.from('facts')
				.insert([{ text, source, category }])
				.select();

			// Add the new fact to the facts state
			setFacts((facts) => [newFact[0], ...facts]);
			setIsUploading(false);

			// Clear the form

			setText('');
			setSource('');
			setCategory('');

			// Close the form

			setShowForm(false);
		}
	};

	return (
		<form className={'fact-form' + formHide} onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Share a fact with the world..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				maxLength={200}
				disabled={isUploading}
			/>

			<span>{200 - textLength}</span>

			<input
				type="text"
				className="source"
				placeholder="Trustworthy source..."
				value={source}
				onChange={(e) => setSource(e.target.value)}
				disabled={isUploading}
			/>

			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				disabled={isUploading}
			>
				<option value="">Choose category:</option>

				{CATEGORIES.map((category) => (
					<option key={category.name} value={category.name}>
						{category.name.toUpperCase()}
					</option>
				))}
			</select>

			<button className="btn btn-large" disabled={isUploading}>
				Post
			</button>
		</form>
	);
}

function CategoryFilter({ setCurrentCategory }) {
	return (
		<aside>
			<ul>
				<li className="category">
					<button
						className="btn btn-all-categories"
						onClick={() => setCurrentCategory('all')}
					>
						All
					</button>
				</li>
				{CATEGORIES.map((category) => (
					<li key={category.name} className="category">
						<button
							className="btn btn-category"
							style={{ backgroundColor: category.color }}
							onClick={() => setCurrentCategory(category.name)}
						>
							{category.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

function FactList({ facts }) {
	if (facts.length === 0) {
		return (
			<p className="message">
				No facts for this category yet! Create the first one
			</p>
		);
	}

	return (
		<section>
			<ul className="facts-list">
				{facts.map((fact) => (
					<Fact key={fact.id} fact={fact} />
				))}
			</ul>
			<p>There are {facts.length} facts in the database. Add your own!</p>
		</section>
	);
}

function Fact({ fact }) {
	function handleVote() {
		console.log('Voting for fact', fact.id, fact.text);
	}

	return (
		<li className="fact">
			<p>
				{fact.text}
				<a
					className="source"
					href={fact.source}
					target="_blank"
					rel="noreferrer"
				>
					(Source)
				</a>
			</p>
			<span
				className="tag"
				style={{
					backgroundColor: CATEGORIES.find(
						(category) => category.name === fact.category
					).color,
				}}
			>
				{fact.category}
			</span>
			<div className="vote-buttons">
				<VotesInteresting
					vote={fact.votesInteresting}
					handleVote={handleVote}
				/>
				<VotesMindblowing
					vote={fact.votesMindblowing}
					handleVote={handleVote}
				/>
				<VotesFalse vote={fact.votesFalse} handleVote={handleVote} />
			</div>
		</li>
	);
}

function VotesInteresting({ vote, handleVote }) {
	return (
		<label onClick={handleVote}>
			<input type="checkbox" name="" id="" style={{ display: 'none' }} />
			<p>👍 {vote}</p>
		</label>
	);
}

function VotesMindblowing({ vote, handleVote }) {
	return (
		<label onClick={handleVote}>
			<input type="checkbox" name="" id="" style={{ display: 'none' }} />
			<p>🤯 {vote}</p>
		</label>
	);
}

function VotesFalse({ vote, handleVote }) {
	return (
		<label onClick={handleVote}>
			<input type="checkbox" name="" id="" style={{ display: 'none' }} />
			<p>⛔ {vote}</p>
		</label>
	);
}

export default App;

// The  App  component is a simple header with a logo and a button. The button is used to toggle the form that allows users to share a fact.
