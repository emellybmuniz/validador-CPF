const cpfInput = document.querySelector(".cpf-input");
const buttonCpf = document.querySelector(".button");
const result = document.querySelector(".resultCPF");


// Formatação do input
cpfInput.addEventListener('input', (e) => {
    let value = e.target.value;
    value = value
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');

    e.target.value = value;
})


// Validar funcionalidade
buttonCpf.addEventListener('click', (e) => {
    e.preventDefault(); 
    const cleanedCpf = cleanCpf(cpfInput.value);
    validatingCPF(cleanedCpf);
    
});

// Limpeza do CPF
const cleanCpf = (cpfValue) => {
    return cpfValue.replace(/\D+/g, ''); 
};

// Lógica de validação
const validatingCPF = (cpfValue) => {

    if (cpfValue.length !== 11) {
        result.style.color = "#962626";
        return result.textContent += 'CPF INVÁLIDO! CERTIFIQUE-SE DE DIGITAR 11 NÚMEROS.';      
    }

    const cpfArray = Array.from(cpfValue);
    const nineDigits = cpfArray.slice(0, 9);

    // Calc Primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number(nineDigits[i]) * (10 - i);
    }
    let firstVerificador = (sum * 10) % 11;
    firstVerificador = firstVerificador === 10 ? 0 : firstVerificador;

    // Calc segundo dígito verificador
    sum = 0;
    const cpfWithFirstDigit = [...nineDigits, firstVerificador];
    for (let i = 0; i < 10; i++) {
        sum += Number(cpfWithFirstDigit[i]) * (11 - i);
    }
    let secondVerificador = (sum * 10) % 11;
    secondVerificador = secondVerificador === 10 ? 0 : secondVerificador;

    if (Number(cpfArray[9]) === firstVerificador && Number(cpfArray[10]) === secondVerificador) {
        result.textContent = `CPF VÁLIDO`;
        result.style.color = "#17691C";
    } else {
        result.innerHTML = 'CPF INVÁLIDO';
        result.style.color = "#962626";
    }
};



 

