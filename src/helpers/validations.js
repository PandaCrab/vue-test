import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
    name: yup.string().required('Name field is required'),
    price: yup.number().required('Price field is required'),
    imgUrl: yup.string().url('The field must be an url').required('Image path is required'),
    color: yup.string().notRequired(),
    quantity: yup.number().required('Quantity field is required'),
    category: yup.string().required('Choose category'),
    subcategory: yup.string().notRequired(),
});
