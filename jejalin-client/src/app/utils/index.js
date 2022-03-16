export function formatRupiah(number){
    return new Intl.NumberFormat('id-ID', {maximumSignificantDigits: 2}).format(number)
}