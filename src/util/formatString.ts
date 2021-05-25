/**
 * Formats a credit card number
 * @param {strong} value A string of credit card numbers
 * @returns A formatted string example 5555 5555 5555 5555
 */
function creditCard(value: string): string {
  if(value){
    return value.replace(/\s+/g, '').match(/.{1,4}/g).join(' ');
  }
  return '';
}

export default { creditCard };
