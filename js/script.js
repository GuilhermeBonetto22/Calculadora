const valor = document.getElementById('visor');
let current = '0', prev='', op='null';

function atualizaVisor(){
    let numero = '0';
    visor.textContent = current;
};  

function appendNumber(num){ // Add Número ao Visor
    if(current === '' || current === '0') current = num;
    else current += num; // current = current + num
};

function deleteLast(){
    current = current.toString().slice(0,-1) || '0';
}

function clearAll(){
    current = '0';
    prev = '';
    op = null;
}

function chooseOperation(operation){ // Escolher Operador
    if(current === '') return; // Se a var current estiver vazia, nenhuma coisa acontece
    if(prev !== '') calculate();
    op = operation; // Var op recebe o operador escolhido
    prev = current;
    current = '';
};

function calculate(){
    let result;
    const a = parseFloat(prev), b = parseFloat(current);
    if(isNaN(a) || isNaN(b)) return; // isNaN = IsNotANumber "NÃO é um número"
    switch(op){
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        // b !== 0 ? a / b verifica se b é diferente de 0
        case '/': result = b!== 0 ? a / b : 'Erro'; break;
        case '%': result = (a % b); break;
        default: return;
    }
    current = result.toString();
    op = null; prev = '';
};

// querySelectorAll está pesquisando todos os elementos da classe .botoes button
document.querySelectorAll('.botoes button').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const val = btn.textContent;

        console.log('action', action);
        console.log('val', val);

        // ! nega a expressão
        if(!action) appendNumber(val);
        else if(action === 'delete') deleteLast();
        else if(action === 'equals'){
            calculate();
        }else{
            chooseOperation({ '+': '+', '-': '-', 'X': '*', '/': '/'}[val] || val);
        }

        atualizaVisor();
    });
});