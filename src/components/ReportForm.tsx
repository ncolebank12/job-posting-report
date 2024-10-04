import { Field, Form, Formik } from "formik";
import { MessageTypes } from "../types";

const ReportForm = ({ disabled }: { disabled: boolean }) => {


    return (
        <Formik initialValues ={{
            picked: "",
            comment: ""
        }}
        onSubmit={async (values) => {
            const isFakeListing = values.picked === "fakeListing";
            chrome.runtime.sendMessage({ type: MessageTypes.SubmitPost, notes: values.comment, isFakeListing: isFakeListing })
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
                    <button type="submit" disabled={disabled} >Submit</button>
                </Form>
            )}
        </Formik>
    )

}

export default ReportForm;