export function isPrice(value){
  const pattern = /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/
  return pattern.test(value)

}