export const ordenAlphab = (a, b) => {
    if(a.name < b.name) return -1;
    if(b.name < a.name) return 1
    return 0
}

export const ordenPopulation = (a, b) => {
    return b.population - a.population
}