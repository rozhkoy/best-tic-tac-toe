import { Form } from 'formik';
import { PropsWithChildren } from 'react';
import './styles.scss';

export const FormWrap: React.FC<PropsWithChildren> = ({ children }) => {
	return <Form className="form-wrap">{children}</Form>;
};
