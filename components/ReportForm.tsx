import { Field, Form, Formik } from "formik";

const ReportForm = () => {
    return (
        <Formik initialValues ={{
            picked: '',
            comment: ''
        }}
        onSubmit={async (values) => {
            const isFakeListing = values.picked === 'fakeListing';
        }}>
            {({ values }) => (
                <Form>
                    <div>
                        <label>
                            <Field type="radio" name="picked" value="fakeListing" />
                
                        </label>
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default ReportForm;