import {Field, Form, Formik, FormikHelpers} from 'formik';
import React from 'react'
import s from './Search.module.css';
import {FilterType} from "../../redux/search-reducer";
import classnames from 'classnames';

interface IProps {
    filter: FilterType
    onFilterChanged: (filter: FilterType) => void
}

interface ISearchForm {
    term: string,
    friend: 'null' | 'true' | 'false'
}


const usersSearchFormValidate = (values: ISearchForm) => {
    const errors: { term?: string } = {};
    return errors
}

const UsersSearchForm: React.FC<IProps> = ({onFilterChanged, filter}) => {

    const onSubmit = (values: ISearchForm, {setSubmitting}: FormikHelpers<ISearchForm>) => {
        const filter: FilterType = {
            term: values.term,
            friend: (values.friend === 'null' || values.friend === null) ? null : (values.friend === 'true') ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <h3 className={s.search_label}>Find user:</h3>
        <Formik
            initialValues={{term: filter.term, friend: 'null'}}
            validate={usersSearchFormValidate}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form className={s.form_control}>
                    <Field className={s.search_input} type="text" name="term" placeholder='User...'/>
                    <Field className={classnames(s.search_input, s.ml_2)}  as="select" name="friend">
                        <option value='null'>All</option>
                        <option value='true'>Only followed</option>
                        <option value='false'>Only unfollowed</option>
                    </Field>
                    <button className={s.btn} type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default React.memo(UsersSearchForm)