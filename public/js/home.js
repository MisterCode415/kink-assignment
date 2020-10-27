/** 
 * Form Validator
 * This is a barebones validation script I whipped up for the challenge.
 * It could be improved in many ways with regards to data integrity
 * 
 * @author Brian Kenny <papaviking@gmail.com>
 * @version 1.0
 * @return {boolean} - triggers a form post or prevents submission based on passing validation criteria
 * @todo write regex that checks for data legnth and cleans from injection attack
 * */
function validate() {

	// basic input validation (down and dirty)
	const errors = [];
	
	// fields to check
	const fields = [
		['username', /[^\s\\]/, 'username is required'], 
		['comment', /[^\s\\]/, 'comment is required'], 
	];

	// get current input values  
	fields.forEach(field=>{
		const nextField = document.getElementsByName(field[0])[0];
		// reset fields
		nextField.classList.remove('errorState');

		if (!nextField.value.match(field[1])) {
			errors.push(field);
			nextField.classList.add('errorState');
		}
	});

	return errors.length ? false : true;
}

/**
 * Binds form post dom load to validate on submission
 * 
 * @author Brian Kenny <papaviking@gmail.com>
 * @version 1.0
 */
function bindForm() {
	document.getElementById('commentForm').onsubmit = validate;
}

/**
 * Onload binding: down and dirty, french vanilla.
 * 
 * @author Brian Kenny <papaviking@gmail.com>
 * @version 1.0
 */
window.onload = function () {
	bindForm();
};