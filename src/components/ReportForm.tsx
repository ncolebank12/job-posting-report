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
            {() => (
                <Form>
                    <div>
                        <label>
                            <Field type="radio" name="picked" value="fakeListing" />
                            Fake Listing
                        </label>
                        <label>
                            <Field type="radio" name="picked" value="shadyCompany" />
                            Shady Company
                        </label>
                    </div>
                    <Field name="comment"/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    )

}

export default ReportForm;