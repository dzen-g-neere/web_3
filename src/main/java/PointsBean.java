import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Named
@ApplicationScoped
public class PointsBean {
    List<Point> points = Collections.synchronizedList(new ArrayList<>());
    Point point = new Point();

    PointsBean(){
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public void addPoint(){
        points.add(this.point);
        point = new Point();
    }

    public Object getEntries() {
        System.out.println(points);
        return points;
    }
}
