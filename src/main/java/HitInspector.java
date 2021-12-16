public class HitInspector {

    public boolean isValid(double x, double y, double r) {
        return x >= -3 && x <= 3 && y > -3 && y < 5 && r >= 1 && r <= 3;
    }

    public String isHit(double x, double y, double r) {
        if (checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkCircle(x, y, r))
            return "true";
        else return "false";
    }

    private boolean checkRectangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y >= -r / 2 && x <= r;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return y <= (r / 2 + x / 2) && x <= 0 && y >= 0;
    }

    private boolean checkCircle(double x, double y, double r) {
        return (x * x + y * y) <= r * r && x <= 0 && y <= 0;
    }
}
