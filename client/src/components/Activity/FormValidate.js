export const validateName = name => {
    if(!name) {
        return 'Name is required';
    }
    if(!/^[a-zA-Z\s]+$/.test(name)) {
        return 'Name cannot contain numbers or signs'
    }
    return '';
} 

export const validateDifficulty = difficulty => {
    if(!difficulty) {
        return 'Difficulty is required'
    }
    if(difficulty < 1 || difficulty > 5) {
        return 'Difficulty must be a number between 1 and 5'
    }
    return '';
}

export const validateDuration = duration => {
    if(!duration) {
        return 'Duration is required'
    }
    if(duration < 1 || duration > 24) {
        return 'Duration must be a number between 1 and 24'
    }
    return '';
}

export const validateSeason = season => {
    if(!season) {
        return 'Season is required'
    }
    return '';
}

export const validateCountries = countries => {
    if(!Array.isArray(countries) || countries.length === 0) {
        return 'Please select at least one country'
    }
    return '';
}