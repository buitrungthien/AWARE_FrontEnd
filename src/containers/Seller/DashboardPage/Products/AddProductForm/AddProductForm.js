import React from 'react';
import InputAddProd from '../../../../../components/UI/InputAddProd';
import FlatButton from '../../../../../components/UI/FlatButton';

const addProductForm = (props) => {
    const formElementsArray = [];
    for (let key in props.addProductForm) {
        formElementsArray.push({
            id: key,
            config: props.addProductForm[key]
        });
    }
    return (
        <form onSubmit={props.addProductHandler}>
            {formElementsArray.map(formElement => (
                <InputAddProd
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    label={formElement.config.label}
                    value={formElement.config.value}
                    selectOptions={formElement.config.selectOptions}
                    changed={(event) => props.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <div style={{ width: '85%', marginLeft: '10px', marginBottom: '20px' }} className="d-flex justify-content-end">
                <div style={{ width: '180px' }}>
                    <FlatButton clicked={props.closeFormHandler} type="button" backgroundColor="white">Cancel</FlatButton>
                </div>
                <div style={{ width: '180px' }}>
                    <FlatButton backgroundColor="#ffa15f">Complete</FlatButton>
                </div>
            </div>
        </form>
    );
}

export default addProductForm;