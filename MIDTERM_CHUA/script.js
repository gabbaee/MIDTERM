const screen = document.getElementById('main-screen');
let currentTheme = localStorage.getItem('uiTheme') || 'light';

function updateView() {
    screen.value = screen.value || '0';
    document.body.className = currentTheme === 'dark' ? 'dark-theme' : '';
}

function addDigit(n) {
    screen.value = screen.value === '0' ? n.toString() : screen.value + n;
}

function addDecimal() {
    if (!screen.value.includes('.')) screen.value += '.';
}

function addOperation(op) {
    const lastChar = screen.value.slice(-1);
    const ops = ['+', '-', '*', '/'];
    screen.value = ops.includes(lastChar) ? screen.value.slice(0, -1) + op : screen.value + op;
}

function execute() {
    compute();
}

function compute() {
    try {
        const expr = screen.value.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expr);
        screen.value = isFinite(result) ? result : 'ERR';
    } catch {
        screen.value = 'ERR';
    }
}

function reset() {
    screen.value = '0';
}

function undo() {
    screen.value = screen.value.slice(0, -1) || '0';
}

function computeRoot() {
    const val = parseFloat(screen.value);
    screen.value = val >= 0 ? Math.sqrt(val) : 'ERR';
}

function switchTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('uiTheme', currentTheme);
    updateView();
}

document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') addDigit(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) addOperation(e.key);
    if (e.key === 'Enter') execute();
    if (e.key === 'Backspace') undo();
    if (e.key === 'Escape') reset();
});

updateView();
