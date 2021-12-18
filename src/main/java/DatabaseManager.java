import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.transaction.UserTransaction;
import java.util.List;

public class DatabaseManager {
    private static final String PERSISTENCE_UNIT_NAME = "hibernate";
    private EntityManager entityManager;
    private EntityManagerFactory entityManagerFactory;
    @Resource
    private UserTransaction userTransaction;

    @PostConstruct
    public void init() {
        entityManagerFactory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        entityManager = entityManagerFactory.createEntityManager();
    }

    @PreDestroy
    public void destroy() {
        entityManager.close();
        entityManagerFactory.close();
    }

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
        entityManager.createQuery("DELETE FROM Point").executeUpdate();
        userTransaction.commit();
    }
}
