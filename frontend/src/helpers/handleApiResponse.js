const handleApiResponse = (response, successFn, errorFn) => {
    switch (response.result) {
        case 'success':
            console.log('SUCCESS', response);
            successFn();
            break;
        case 'error':
            console.log('ERROR', response);
            errorFn();
            break;
        default:
            console.log('RESPONSE', response);
            break;
    }
}
export { handleApiResponse };