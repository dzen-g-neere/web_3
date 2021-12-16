import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("fieldValidator")
public class FieldValidator implements Validator {

    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        try {
            String s = value.toString();
            System.out.println(value);
            if (s.length() > 6)
                s = s.substring(0, 5);
            double y = Double.parseDouble(s);
            if (y >= 5 || y <= -3) {
                throw new ValidatorException(new FacesMessage("Введите число в диапазоне (-3, 5)"));
            }
        } catch (Exception e){
            e.printStackTrace();
            throw new ValidatorException(new FacesMessage("Введите число в диапазоне (-3, 5)"));
        }
    }
}