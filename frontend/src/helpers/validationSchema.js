import * as Yup from 'yup';

const BeachSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please add the name of the beach'),
    location: Yup.string()
        .required('Please add the location of the beach'),
    description: Yup.string(),
    imageUrl: Yup.string()
        .matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
        .required('Please provide a valid image url')
});

export { BeachSchema }
