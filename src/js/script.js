const cpfInput = document.querySelector(".cpf-input");
const cpfButton = document.querySelector(".button");
const result = document.querySelector(".resultCPF");
 
/**
 * Cleans the CPF, removing all non-numeric characters.
 * @param {string} cpf - The CPF string to clean.
 * @returns {string} - The cleaned CPF string containing only digits.
 */

const cleanCPF = (cpf) => cpf.replace(/\D+/g, '');
 
/**
 * Checks if a CPF is composed of 11 identical digits.
 * @param {string} cpf - The CPF string to check.
 * @returns {boolean} - Returns true if the CPF is a sequence of identical digits, false otherwise.
 */

const isSequence = (cpf) => {
    return cpf[0].repeat(cpf.length) === cpf;
};
 
/**
 * Calculates a CPF check digit.
 * @param {string} partialCpf - The partial CPF string (first 9 digits).
 * @returns {number} - The calculated check digit (0-9).
 */

const calculateCheckDigit = (partialCpf) => {
    const cpfArray = Array.from(partialCpf);
    const sum = cpfArray.reduce((acc, num, index) => {
        return acc + (Number(num) * (cpfArray.length + 1 - index));
    }, 0);
 
    const digit = 11 - (sum % 11);
    return digit > 9 ? 0 : digit;
};
 
/**
 * Validates a clean CPF.
 * @param {string} cleanCpf - The cleaned CPF string to validate.
 * @returns {boolean} - Returns true if the CPF is valid, false otherwise.
 */

const validateCPF = (cleanCpf) => {
    if (cleanCpf.length !== 11 || isSequence(cleanCpf)) {
        return false;
    }
 
    const nineDigits = cleanCpf.substring(0, 9);
    const digit1 = calculateCheckDigit(nineDigits);
 
    const tenDigits = nineDigits + digit1;
    const digit2 = calculateCheckDigit(tenDigits);
 
    return `${digit1}${digit2}` === cleanCpf.substring(9);
};
 
/**
 * Formats the input value with the CPF mask (XXX.XXX.XXX-XX).
 * @param {string} value - The input value to format.
 * @returns {string} - The formatted CPF string.
 */

const formatCPFInput = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})([-\d]{1,2})$/, '$1-$2')
        .substring(0, 14);
};
 
/**
 * Displays the validation result on the screen.
 * @param {boolean} isValid - The validation result.
 */

const displayResult = (isValid) => {
    result.textContent = isValid ? 'CPF Válido' : 'CPF Inválido';
    result.style.color = isValid ? '#17691C' : '#962626';
};
 
 
cpfInput.addEventListener('input', (e) => {
    e.target.value = formatCPFInput(e.target.value);
});
 
cpfButton.addEventListener('click', (e) => {
    e.preventDefault();
    const cleanCpf = cleanCPF(cpfInput.value);
    const isValid = validateCPF(cleanCpf);
    displayResult(isValid);
});
 
