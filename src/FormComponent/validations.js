import * as yup from 'yup';



const  allValidator =  yup.object().shape({
    name: yup.string(),
    label: yup.string().required(),
    type: yup.string().required(),
    required: yup.boolean(),
    requiredError: yup.string()

});


const imageOnlyValidator = yup.object().shape({
    name:yup.string(),
    type:yup.string().required(),
    required: yup.boolean(),
    requiredError: yup.string()
});


const keywords = yup.object().shape({
    label:yup.string().required(),
    keyword: yup.string().required(),
    
})

const fields = yup.object().shape({
    name:yup.string(),
    type:yup.string().required(),
    placeholder:yup.string()

})

const optionOnlyValidator = yup.object().shape({
    type:yup.string().required(),
    keywords:yup.array().of(keywords).required(),
    required: yup.boolean(),
    requiredError: yup.string()
})

const fieldOnlyValidator = yup.object().shape({
    type:yup.string(),
    name:yup.string(),
    label:yup.string().required(),
    fields:yup.array().of(fields).required(),
})
const layoutValidator = yup.object().shape({
    labelSpan:yup.number(),
    inputSpan:yup.number()
})


export const validateFields = (fields,formLayout) => {
      return new Promise ((resolve,reject) => {
          let validations = [];
          let errors = [];
           fields.map(field => {
               if(field.type === 'image'){
                  return validations.push(imageOnlyValidator.validate(field).catch(err=> {return errors.push(err); }));
               }
               if(field.type === "option"){
                   return validations.push(optionOnlyValidator.validate(field).catch(err => {return errors.push(err)}))
               }
               if(field.type === 'form-group'){
                   return validations.push(fieldOnlyValidator.validate(field).catch(err => {return errors.push(err)}));
               }
               if(formLayout.labelSpan){
                   return validations.push(layoutValidator.validate(formLayout).catch( err => {return errors.push(err)}))
               }
            return validations.push(allValidator.validate(field).catch(err=> {return errors.push(err); }));
        })

        Promise.all(validations).then(result=>{
            if(errors){
                reject(errors);
            }
            resolve(result);
        });
        
      })
     
}
