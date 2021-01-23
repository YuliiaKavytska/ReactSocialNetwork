export const isRequired = value => {
    if (value) return undefined;

    return 'Field is required';
}
export const maxLength = textLength => value => {
    if (value && value.length < textLength) return undefined;

    return `Max length is ${textLength}`;
}