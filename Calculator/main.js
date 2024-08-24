let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let equals = document.getElementById('equals').addEventListener('click', result)

numbers.forEach(number =>{
    number.addEventListener('click', display)
});

operators.forEach(operator =>{
    operator.addEventListener('click',display)
})


function display(event){
    let number = event.target.innerText;
    document.getElementById('result').innerText += number;
}
function equals()

function remove(array, index) {
    return array.slice(0, index)
      .concat(array.slice(index + 1));
  }
  console.log(remove(["a", "b", "c", "d", "e"], 2));
