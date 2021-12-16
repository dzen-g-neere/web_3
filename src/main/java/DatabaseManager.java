import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.UserTransaction;
import java.util.List;

public class DatabaseManager {
    private static final String PERSISTENCE_UNIT_NAME = "hibernate";

    @PersistenceContext(unitName = PERSISTENCE_UNIT_NAME)
    private EntityManager entityManager;

    @Resource
    private UserTransaction userTransaction;

    public List<Point> loadEntries() {
        return entityManager.createQuery("SELECT e FROM Point e").getResultList();
    }

    public synchronized void addEntryToDB(Point point) throws Exception {
        userTransaction.begin();
        entityManager.persist(point);
        userTransaction.commit();
    }

    public synchronized void clearDB() throws Exception {
        userTransaction.begin();
        entityManager.createQuery("DELETE FROM Point");
        userTransaction.commit();
    }
}
