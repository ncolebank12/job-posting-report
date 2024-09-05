import { Field, Form, Formik } from "formik";
import { reportFraudulent } from "../utils/scripts";

const ReportForm = () => {
    return (
        <Formik initialValues ={{
            picked: '',
            comment: ''
        }}
        onSubmit={async (values) => {
            const isFakeListing = values.picked === 'fakeListing';
            reportFraudulent(isFakeListing, values.comment);
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