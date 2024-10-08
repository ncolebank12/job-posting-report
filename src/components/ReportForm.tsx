import { Field, Form, Formik } from "formik";
import { MessageTypes } from "../types";
import common from "../styles/Common.module.css"
import styles from "../styles/ReportForm.module.css"

const ReportForm = () => {
    return (
        <Formik initialValues={{
            picked: "",
            comment: ""
        }}
            onSubmit={async (values) => {
                const isFakeListing = values.picked === "fakeListing";
                chrome.runtime.sendMessage({ type: MessageTypes.SubmitPost, notes: values.comment, isFakeListing: isFakeListing })
            }}>
            {() => (
                <Form className={styles.container}>
                    <div className={styles.radioGroup}>
                        <label>
                            <Field type="radio" name="picked" value="fakeListing" />
                            Fake Listing
                        </label>
                        <label>
                            <Field type="radio" name="picked" value="shadyCompany" />
                            Shady Company
                        </label>
                    </div>
                    <Field className={styles.commentArea} name="comment" placeholder="Add your comment (optional)..." />
                    <button type="submit" className={common.button}>Submit</button>
                </Form>
            )}
        </Formik>
    )

}

export default ReportForm;