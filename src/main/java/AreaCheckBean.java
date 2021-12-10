import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;

@Named("areaCheckBean")
@ApplicationScoped
public class AreaCheckBean {
    public AreaCheckBean(){
        System.out.println("AreaCheckBean started.");
    }
    public String getMessage(){
        return "Hello Couckabouras!";
    }
}
