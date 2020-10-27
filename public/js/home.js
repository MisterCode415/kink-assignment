function dismiss() {
  // remove overlay 
  const nodes = document.getElementsByClassName('overlay-modal')
  Object.keys(nodes).forEach(nodeIndex=>{
    nodes[nodeIndex].style.display = 'none';
  })
}

/** 
 * This is a barebones validation script I whipped up for the exercise.
 * It could be improved in many ways with regards to data integrity
 * */
function validate(formNode) {

  // basic input validation (down and dirty)
  let errors = [];
  
  // fields to check
  const fields = [
    ['first', /[^\s\\]/, 'please enter your first name'], 
    ['last', /[^\s\\]/, 'please enter your last name'], 
    ['email',/[^\s\\]/,'email is required'], 
    ['email',/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ig,'email is incorrectly formatted'], 
    ['password', /[^\s\\]/, 'password is required']
  ]

  // get current input values  
  fields.forEach(field=>{
    nextField = document.getElementsByName(field[0])[0]
    // reset fields
    nextField.classList.remove('errorState')

    if(!nextField.value.match(field[1])) {
      errors.push(field)
      nextField.classList.add('errorState')
    }
  })

  return errors.length? false : true;
}
