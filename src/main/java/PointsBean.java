import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Named
@ApplicationScoped
public class PointsBean {
    private DatabaseManager dataBaseManager;
    private List<Point> entries;
    private HitInspector hitInspector;
    private Point point;

    @PostConstruct
    public void init() {
        entries = Collections.synchronizedList(new ArrayList<>());
        hitInspector = new HitInspector();
        point = new Point();
        point.setR(1);
        dataBaseManager = new DatabaseManager();
        entries = dataBaseManager.loadEntries();
    }

    public List<Point> getEntries() {
        return entries;
    }

    public void setEntries(List<Point> entries) {
        this.entries = entries;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public void addPoint() {
        try {
            double x, y, r;
            x = point.getX();
            y = point.getY();
            r = point.getR();
            if (hitInspector.isValid(x, y, r)) {
                point.setResult(hitInspector.isHit(x, y, r));
                dataBaseManager.addEntryToDB(getPoint());
                entries.add(this.point);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        point = new Point();
        point.setR(1);
    }

    public void clearEntries() {
        try {
            dataBaseManager.clearDB();
        } catch (Exception e) {
            e.printStackTrace();
        }
        entries.clear();
    }
}
